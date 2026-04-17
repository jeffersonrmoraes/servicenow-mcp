import fs   from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// ─────────────────────────────────────────────
//  Activity Logger — v6.0 (Dashboard Bridge)
//
//  Append-only JSONL file shared between the MCP server (stdio)
//  and the Dashboard server (HTTP). Each tool call is logged as
//  one JSON line. Dashboard tails the file via byte-offset polling.
//
//  Performance decisions:
//  • Fire-and-forget: callers never await this (zero MCP latency impact)
//  • Rotate check every 50 appends (not every write)
//  • Rotate: truncate oldest lines, keep MAX_LINES (no archive files)
// ─────────────────────────────────────────────

export interface ActivityEntry {
  ts:       string;
  tool:     string;
  env:      string;
  duration: number;
  status:   "ok" | "error";
  error?:   string;
}

const MAX_LINES = 1000;
const ROTATE_EVERY = 50;

export const ACTIVITY_PATH: string = process.env.SN_ACTIVITY_LOG_PATH
  ? path.resolve(process.env.SN_ACTIVITY_LOG_PATH)
  : path.resolve(process.cwd(), ".sn-activity.jsonl");

// ─────────────────────────────────────────────
//  Internal state
// ─────────────────────────────────────────────

let _writeQueue: Promise<void> = Promise.resolve();
let _appendCount = 0;

// ─────────────────────────────────────────────
//  Rotate: keep only the last MAX_LINES entries
// ─────────────────────────────────────────────

async function maybeRotate(): Promise<void> {
  try {
    const content = await fs.readFile(ACTIVITY_PATH, "utf8");
    const lines   = content.split("\n").filter(l => l.trim());
    if (lines.length > MAX_LINES) {
      const trimmed = lines.slice(lines.length - MAX_LINES).join("\n") + "\n";
      await fs.writeFile(ACTIVITY_PATH, trimmed, "utf8");
    }
  } catch {
    // Non-fatal — file may not exist yet or concurrent write
  }
}

// ─────────────────────────────────────────────
//  Public API
// ─────────────────────────────────────────────

/**
 * Log a tool invocation. Fully async and non-blocking for callers.
 * Use: logActivity({...}).catch(() => {});
 */
export function logActivity(entry: ActivityEntry): Promise<void> {
  _writeQueue = _writeQueue.then(async () => {
    try {
      await fs.appendFile(ACTIVITY_PATH, JSON.stringify(entry) + "\n", "utf8");
      _appendCount++;
      if (_appendCount >= ROTATE_EVERY) {
        _appendCount = 0;
        await maybeRotate();
      }
    } catch {
      // Non-fatal
    }
  });
  return _writeQueue;
}

/**
 * Read the last `limit` entries from the activity log.
 * Used by the dashboard's /api/activity endpoint.
 */
export async function readActivity(limit = 100): Promise<ActivityEntry[]> {
  if (!existsSync(ACTIVITY_PATH)) return [];
  try {
    const content = await fs.readFile(ACTIVITY_PATH, "utf8");
    const lines   = content.split("\n").filter(l => l.trim());
    return lines
      .slice(-limit)
      .map(l => { try { return JSON.parse(l) as ActivityEntry; } catch { return null; } })
      .filter((e): e is ActivityEntry => e !== null);
  } catch {
    return [];
  }
}

/**
 * Read new content from a known byte offset. Used by the SSE tail watcher.
 * Returns the new entries and the new file size (next offset).
 */
export async function readActivityFrom(
  offsetBytes: number,
): Promise<{ entries: ActivityEntry[]; newOffset: number }> {
  try {
    const stat = await fs.stat(ACTIVITY_PATH);
    if (stat.size <= offsetBytes) return { entries: [], newOffset: offsetBytes };

    const fh      = await fs.open(ACTIVITY_PATH, "r");
    const newSize = stat.size - offsetBytes;
    const buf     = Buffer.alloc(newSize);
    await fh.read(buf, 0, newSize, offsetBytes);
    await fh.close();

    const entries = buf
      .toString("utf8")
      .split("\n")
      .filter(l => l.trim())
      .map(l => { try { return JSON.parse(l) as ActivityEntry; } catch { return null; } })
      .filter((e): e is ActivityEntry => e !== null);

    return { entries, newOffset: stat.size };
  } catch {
    return { entries: [], newOffset: offsetBytes };
  }
}
