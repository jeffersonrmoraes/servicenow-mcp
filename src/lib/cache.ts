import fs   from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// ─────────────────────────────────────────────
//  LRU Cache with TTL + Optional Persistent Layer — v6.0
//
//  Persistent layer: enabled via SN_CACHE_PERSIST=true
//  Storage path:     SN_CACHE_PERSIST_PATH (default: .sn-cache.json in cwd)
//  Purpose:          Survive server restarts (common in Claude Desktop),
//                    keeping table metadata warm across sessions.
// ─────────────────────────────────────────────

interface CacheEntry {
  value:   any;
  expires: number;
}

const cache = new Map<string, CacheEntry>();

const DEFAULT_TTL_MS = parseInt(process.env.SN_CACHE_TTL_MS || String(60 * 1000), 10);
const MAX_ENTRIES    = parseInt(process.env.SN_CACHE_MAX_ENTRIES || "500", 10);
const PERSIST        = process.env.SN_CACHE_PERSIST === "true";
const PERSIST_PATH   = process.env.SN_CACHE_PERSIST_PATH
  ? path.resolve(process.env.SN_CACHE_PERSIST_PATH)
  : path.resolve(process.cwd(), ".sn-cache.json");

// ─────────────────────────────────────────────
//  Persistent Layer I/O
// ─────────────────────────────────────────────

let _persistDirty  = false;
let _persistTimer: ReturnType<typeof setTimeout> | null = null;

async function persistFlush(): Promise<void> {
  if (!PERSIST || !_persistDirty) return;
  _persistDirty = false;

  const now     = Date.now();
  const payload: Record<string, CacheEntry> = {};
  for (const [k, v] of cache) {
    if (now < v.expires) payload[k] = v; // only persist non-expired
  }

  try {
    await fs.writeFile(PERSIST_PATH, JSON.stringify(payload), "utf8");
  } catch {
    // Non-fatal: log would create circular dep with logger
  }
}

function schedulePersist(): void {
  if (!PERSIST) return;
  _persistDirty = true;
  if (_persistTimer) return;
  // Debounce: flush after 2 seconds of inactivity
  _persistTimer = setTimeout(async () => {
    _persistTimer = null;
    await persistFlush();
  }, 2000);
}

export async function persistLoad(): Promise<void> {
  if (!PERSIST || !existsSync(PERSIST_PATH)) return;
  try {
    const raw  = await fs.readFile(PERSIST_PATH, "utf8");
    const data = JSON.parse(raw) as Record<string, CacheEntry>;
    const now  = Date.now();
    let loaded = 0;

    for (const [k, v] of Object.entries(data)) {
      if (now < v.expires) {
        cache.set(k, v);
        loaded++;
      }
    }

    if (loaded > 0) {
      // Non-circular: use process.stdout to avoid importing logger
      process.stderr.write(`[cache] Persistent layer loaded: ${loaded} entries from ${PERSIST_PATH}\n`);
    }
  } catch {
    // Corrupted or missing — start fresh
  }
}

// ─────────────────────────────────────────────
//  LRU helpers
// ─────────────────────────────────────────────

function evictOldest(): void {
  if (cache.size <= 0) return;
  const oldestKey = cache.keys().next().value;
  if (oldestKey !== undefined) cache.delete(oldestKey);
}

// ─────────────────────────────────────────────
//  Public API
// ─────────────────────────────────────────────

export function cacheGet(key: string): any | undefined {
  if (DEFAULT_TTL_MS === 0) return undefined;
  const entry = cache.get(key);
  if (!entry) return undefined;

  if (Date.now() > entry.expires) {
    cache.delete(key);
    return undefined;
  }

  // LRU: move to end
  cache.delete(key);
  cache.set(key, entry);

  return entry.value;
}

export function cacheSet(key: string, value: any, ttlMs: number = DEFAULT_TTL_MS) {
  if (ttlMs === 0) return;

  if (cache.size >= MAX_ENTRIES) {
    const now = Date.now();
    for (const [k, v] of cache) {
      if (now > v.expires) cache.delete(k);
      if (cache.size < MAX_ENTRIES) break;
    }
  }

  while (cache.size >= MAX_ENTRIES) {
    evictOldest();
  }

  cache.set(key, { value, expires: Date.now() + ttlMs });
  schedulePersist();
}

export function cacheInvalidate(pattern: string) {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
  schedulePersist();
}

export function cacheClear() {
  cache.clear();
  schedulePersist();
}

export function cacheStats() {
  const now = Date.now();
  let expired = 0;
  for (const entry of cache.values()) {
    if (now > entry.expires) expired++;
  }
  return {
    size:             cache.size,
    max:              MAX_ENTRIES,
    ttl_ms:           DEFAULT_TTL_MS,
    expired_pending:  expired,
    persist_enabled:  PERSIST,
    persist_path:     PERSIST ? PERSIST_PATH : null,
  };
}

/**
 * Persists a specific key with a long TTL — intended for stable metadata
 * (table schemas, sys_dictionary entries) that should survive restarts.
 * TTL default: 24h.
 */
export function cachePersistMeta(key: string, value: any, ttlMs = 24 * 60 * 60 * 1000) {
  cacheSet(key, value, ttlMs);
}
