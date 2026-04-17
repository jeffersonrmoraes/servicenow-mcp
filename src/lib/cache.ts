// ─────────────────────────────────────────────
//  LRU Cache with TTL — v5.0
//  Max entries configurable via SN_CACHE_MAX_ENTRIES (default: 500)
// ─────────────────────────────────────────────

interface CacheEntry {
  value: any;
  expires: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * TTL configurável via SN_CACHE_TTL_MS (padrão: 60 000 ms = 1 minuto).
 * Defina 0 para desabilitar o cache completamente.
 */
const DEFAULT_TTL_MS = parseInt(process.env.SN_CACHE_TTL_MS || String(60 * 1000), 10);

/**
 * Limite máximo de entradas no cache para prevenir memory leaks em sessões longas.
 */
const MAX_ENTRIES = parseInt(process.env.SN_CACHE_MAX_ENTRIES || "500", 10);

/**
 * Evict: remove a entrada mais antiga quando o cache atinge o limite.
 * O Map do JS mantém ordem de inserção, então a primeira chave é a mais antiga.
 */
function evictOldest(): void {
  if (cache.size <= 0) return;
  const oldestKey = cache.keys().next().value;
  if (oldestKey !== undefined) cache.delete(oldestKey);
}

/**
 * Recupera um valor do cache se não estiver expirado.
 */
export function cacheGet(key: string): any | undefined {
  if (DEFAULT_TTL_MS === 0) return undefined; // cache desabilitado
  const entry = cache.get(key);
  if (!entry) return undefined;

  if (Date.now() > entry.expires) {
    cache.delete(key);
    return undefined;
  }

  // Move para o final (refresh de LRU position)
  cache.delete(key);
  cache.set(key, entry);

  return entry.value;
}

/**
 * Armazena um valor no cache com TTL e eviction LRU.
 */
export function cacheSet(key: string, value: any, ttlMs: number = DEFAULT_TTL_MS) {
  if (ttlMs === 0) return; // cache desabilitado

  // Evict entradas expiradas primeiro (housekeeping leve)
  if (cache.size >= MAX_ENTRIES) {
    // Limpa expirados antes de forçar eviction
    const now = Date.now();
    for (const [k, v] of cache) {
      if (now > v.expires) cache.delete(k);
      if (cache.size < MAX_ENTRIES) break;
    }
  }

  // Se ainda está cheio, remove o mais antigo (LRU)
  while (cache.size >= MAX_ENTRIES) {
    evictOldest();
  }

  cache.set(key, {
    value,
    expires: Date.now() + ttlMs,
  });
}

/**
 * Invalida chaves que casam com um padrão (parcial).
 */
export function cacheInvalidate(pattern: string) {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

/**
 * Limpa todo o cache (reset total).
 */
export function cacheClear() {
  cache.clear();
}

/**
 * Retorna métricas do cache para diagnóstico.
 */
export function cacheStats() {
  const now = Date.now();
  let expired = 0;
  for (const entry of cache.values()) {
    if (now > entry.expires) expired++;
  }
  return {
    size: cache.size,
    max: MAX_ENTRIES,
    ttl_ms: DEFAULT_TTL_MS,
    expired_pending: expired,
  };
}
