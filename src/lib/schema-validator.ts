import fs     from "fs/promises";
import fsSync from "fs";
import path   from "path";

// ─────────────────────────────────────────────
//  Schema-Aware Field Validator (v7.0)
//  Validates field names against locally cached knowledge MD files.
//  Non-blocking: returns [] when table is unknown (not yet harvested).
// ─────────────────────────────────────────────

const KNOWLEDGE_DIR = path.resolve(process.cwd(), "knowledge");
const CATEGORIES    = ["core", "custom", "system"] as const;

// In-memory cache: tableName → Set<fieldName>
// Populated lazily on first access. Invalidated on process restart.
const _cache = new Map<string, Set<string>>();

// Track tables confirmed absent from knowledge/ to avoid repeated I/O
const _absent = new Set<string>();

function findKnowledgePath(tableName: string): string | null {
  for (const cat of CATEGORIES) {
    const p = path.join(KNOWLEDGE_DIR, cat, `${tableName}.md`);
    if (fsSync.existsSync(p)) return p;
  }
  return null;
}

/**
 * Parses a knowledge MD file and extracts field names.
 * Format: `| \`field_name\` | Label | Type | Reference | Mandatory |`
 */
async function parseFields(filePath: string): Promise<Set<string>> {
  const content = await fs.readFile(filePath, "utf8");
  const fields  = new Set<string>();
  const re      = /^\|\s*`([^`]+)`\s*\|/gm;
  let m;
  while ((m = re.exec(content)) !== null) fields.add(m[1]);
  return fields;
}

/**
 * Returns the Set of known fields for a table, or null if not in knowledge/.
 * Result is cached in memory after the first call.
 */
export async function getTableFields(tableName: string): Promise<Set<string> | null> {
  if (_cache.has(tableName)) return _cache.get(tableName)!;
  if (_absent.has(tableName)) return null;

  const filePath = findKnowledgePath(tableName);
  if (!filePath) { _absent.add(tableName); return null; }

  try {
    const fields = await parseFields(filePath);
    _cache.set(tableName, fields);
    return fields;
  } catch {
    _absent.add(tableName);
    return null;
  }
}

/**
 * Validates a list of field names against the knowledge schema.
 * Returns the subset of fields that are NOT recognised.
 *
 * Returns an empty array when:
 * - The table is not yet harvested (non-blocking)
 * - All fields are valid
 */
export async function validateFields(tableName: string, fields: string[]): Promise<string[]> {
  if (!fields.length || !tableName) return [];
  const known = await getTableFields(tableName);
  if (!known) return []; // table not in knowledge — skip silently
  return fields.filter(f => f && f.trim() && !known.has(f.trim()));
}

/**
 * Invalidates the in-memory cache for a specific table (e.g. after a JIT sync).
 */
export function invalidateSchema(tableName: string): void {
  _cache.delete(tableName);
  _absent.delete(tableName);
}

/** Returns cache stats (for /api/stats endpoint). */
export function schemaValidatorStats(): { cached_schemas: number; absent_tables: number } {
  return { cached_schemas: _cache.size, absent_tables: _absent.size };
}
