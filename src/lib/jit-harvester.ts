import fsSync from "fs";
import path   from "path";
import { handleKnowledgeTool } from "../tools/knowledge.js";
import { logger } from "./logger.js";

// ─────────────────────────────────────────────
//  JIT Harvester (v7.0)
//  Fire-and-forget background sync for tables not yet in knowledge/
// ─────────────────────────────────────────────

const KNOWLEDGE_DIR = path.resolve(process.cwd(), "knowledge");
const CATEGORIES    = ["core", "custom", "system"] as const;

// In-flight guard: prevents duplicate concurrent syncs for the same table
const _inFlight = new Set<string>();

// Short-lived negative cache: avoids re-triggering for tables that don't exist in SN
// (cleared on process restart, which is intentional)
const _notFound = new Set<string>();

function detectCategory(tableName: string): "CORE" | "CUSTOM" | "SYSTEM" {
  if (tableName.startsWith("u_") || tableName.startsWith("x_")) return "CUSTOM";
  if (tableName.startsWith("sys_") || tableName.startsWith("sysapproval_")) return "SYSTEM";
  return "CORE";
}

/** Returns true if the table already has a knowledge file in any category. */
export function tableKnown(tableName: string): boolean {
  for (const cat of CATEGORIES) {
    if (fsSync.existsSync(path.join(KNOWLEDGE_DIR, cat, `${tableName}.md`))) return true;
  }
  return false;
}

/**
 * Triggers a background sync for a single table if it is not yet in knowledge/.
 * Zero latency impact: fire-and-forget, no await.
 */
export function triggerJITSync(tableName: string, env: string): void {
  if (!tableName || typeof tableName !== "string") return;
  if (_notFound.has(tableName)) return;

  const key = `${env}:${tableName}`;
  if (_inFlight.has(key)) return;
  if (tableKnown(tableName)) return;

  _inFlight.add(key);
  const category = detectCategory(tableName);

  handleKnowledgeTool("sn_sync_knowledge_base", {
    env:           env === "default" ? undefined : env,
    table_pattern: tableName,
    category,
    limit: 1,
    force: true,
  })
  .then((result: any) => {
    if (result?.processed_count === 0) {
      _notFound.add(tableName);
      logger.info(`JIT Harvester: tabela '${tableName}' não encontrada na instância.`);
    } else {
      logger.info(`JIT Harvester: sincronizado '${tableName}' (${category}) para o ambiente '${env}'.`);
    }
  })
  .catch((err: Error) => {
    logger.warn(`JIT Harvester: falha ao sincronizar '${tableName}': ${err.message}`);
  })
  .finally(() => {
    _inFlight.delete(key);
  });
}

/** Returns basic stats about the JIT Harvester state (for monitoring). */
export function jitHarvesterStats(): { in_flight: number; not_found_cache: number } {
  return { in_flight: _inFlight.size, not_found_cache: _notFound.size };
}
