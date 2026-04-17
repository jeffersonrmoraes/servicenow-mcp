import { snGet, getContext } from "../lib/client.js";
import { validateLimit, validateEncodedQuery } from "../lib/validate.js";
import { encodeQueryParam } from "../lib/helpers.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Observability / Log Access (v6.0)
// ─────────────────────────────────────────────

export const logTools = [
  {
    name: "sn_stream_syslog",
    description:
      "Recupera entradas recentes do System Log (syslog) com filtros por nível, source e usuário. " +
      "Requer role 'admin' no usuário configurado no ambiente.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        level:  { type: "string", enum: ["error", "warning", "info", "debug", "all"], description: "Nível mínimo de log (default: all)" },
        source: { type: "string", description: "Filtrar por source/logger (ex: BusinessRule, ScriptInclude)" },
        user:   { type: "string", description: "Filtrar por user_name" },
        since:  { type: "string", description: "Data/hora ISO ou relativa (ex: 2024-01-01, -1h). Default: última hora" },
        limit:  { type: "number", description: "Número máximo de entradas (default: 50, máx: 500)" },
      },
    },
  },
  {
    name: "sn_get_node_log",
    description:
      "Recupera logs do nodo do servidor via API de diagnóstico do ServiceNow (sys_node_log). " +
      "Útil para investigar erros de infraestrutura. Requer role 'admin'.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        node:  { type: "string", description: "Filtrar por nodo específico (ex: SN_node01)" },
        level: { type: "string", enum: ["error", "warning", "info", "debug", "all"], description: "Nível de log (default: error)" },
        limit: { type: "number", description: "Número máximo de entradas (default: 50, máx: 200)" },
      },
    },
  },
];

// ─────────────────────────────────────────────
//  Admin Role Guard
// ─────────────────────────────────────────────

async function requireAdminRole(env: ServiceNowEnv): Promise<void> {
  const ctx = getContext(env);

  const { result: users } = await snGet("/api/now/table/sys_user", {
    sysparm_query:  `user_name=${encodeQueryParam(ctx.user)}`,
    sysparm_fields: "sys_id,user_name",
    sysparm_limit:  1,
  }, env);

  if (!users?.length) {
    throw new Error(`Usuário '${ctx.user}' não encontrado na instância.`);
  }

  const { result: roles } = await snGet("/api/now/table/sys_user_has_role", {
    sysparm_query:  `user=${users[0].sys_id}^role.name=admin^state=active`,
    sysparm_fields: "sys_id",
    sysparm_limit:  1,
  }, env);

  if (!roles?.length) {
    throw new Error(
      `Acesso negado: sn_stream_syslog e sn_get_node_log requerem role 'admin'. ` +
      `O usuário '${ctx.user}' não possui esta role ativa.`
    );
  }
}

// ─────────────────────────────────────────────
//  Level → Syslog value mapping
// ─────────────────────────────────────────────

const LEVEL_MAP: Record<string, string> = {
  error:   "error",
  warning: "warning",
  info:    "info",
  debug:   "debug",
};

function buildLevelClause(level: string | undefined): string {
  if (!level || level === "all") return "";
  const mapped = LEVEL_MAP[level.toLowerCase()];
  if (!mapped) return "";
  // syslog uses severity hierarchy: error < warning < info < debug
  const hierarchy = ["error", "warning", "info", "debug"];
  const idx = hierarchy.indexOf(mapped);
  if (idx < 0) return `^level=${encodeQueryParam(mapped)}`;
  // Include current level and all more-severe levels
  const levels = hierarchy.slice(0, idx + 1).map(l => `level=${l}`).join("^OR");
  return `^${levels}`;
}

// ─────────────────────────────────────────────
//  Since → encoded query timestamp helper
// ─────────────────────────────────────────────

function buildSinceClause(since: string | undefined): string {
  if (!since) {
    // Default: last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return `^sys_created_on>javascript:gs.dateGenerate('${oneHourAgo.toISOString().slice(0, 10)}','${oneHourAgo.toTimeString().slice(0, 8)}')`;
  }
  // Relative: -1h, -30m, -2d
  const relativeMatch = since.match(/^-(\d+)(h|m|d)$/i);
  if (relativeMatch) {
    const [, amount, unit] = relativeMatch;
    const ms = parseInt(amount) * (unit === "h" ? 3600000 : unit === "m" ? 60000 : 86400000);
    const dt = new Date(Date.now() - ms);
    return `^sys_created_on>javascript:gs.dateGenerate('${dt.toISOString().slice(0, 10)}','${dt.toTimeString().slice(0, 8)}')`;
  }
  // Absolute ISO date or datetime
  const safeSince = since.replace(/['";<>]/g, "");
  return `^sys_created_on>=${safeSince}`;
}

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleLogTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  switch (name) {
    case "sn_stream_syslog": {
      await requireAdminRole(env);

      const limit = args.limit ? Math.min(validateLimit(args.limit), 500) : 50;

      let query = "sys_idISNOTEMPTY";
      if (args.source) query += `^source=${encodeQueryParam(args.source)}`;
      if (args.user)   query += `^u_syslog_created_by=${encodeQueryParam(args.user)}`;
      query += buildLevelClause(args.level);
      query += buildSinceClause(args.since);
      query += "^ORDERBYDESCsys_created_on";

      const { result } = await snGet("/api/now/table/syslog", {
        sysparm_query:  query,
        sysparm_fields: "sys_created_on,level,source,message,sys_created_by",
        sysparm_limit:  limit,
      }, env);

      return {
        count: result.length,
        filters: {
          level:  args.level  || "all",
          source: args.source || null,
          user:   args.user   || null,
          since:  args.since  || "-1h",
        },
        entries: result.map((r: any) => ({
          timestamp: r.sys_created_on,
          level:     r.level,
          source:    r.source,
          user:      r.sys_created_by,
          message:   r.message,
        })),
      };
    }

    case "sn_get_node_log": {
      await requireAdminRole(env);

      const limit = args.limit ? Math.min(validateLimit(args.limit), 200) : 50;
      const level = args.level || "error";

      let query = "sys_idISNOTEMPTY";
      if (args.node) query += `^node=${encodeQueryParam(args.node)}`;
      query += buildLevelClause(level);
      query += "^ORDERBYDESCsys_created_on";

      const { result } = await snGet("/api/now/table/syslog_transaction", {
        sysparm_query:  query,
        sysparm_fields: "sys_created_on,level,url,response_time,error_count,business_rule_count,client_transaction",
        sysparm_limit:  limit,
      }, env);

      return {
        count: result.length,
        filters: {
          node:  args.node  || "all",
          level: level,
        },
        entries: result.map((r: any) => ({
          timestamp:      r.sys_created_on,
          level:          r.level,
          url:            r.url,
          response_time:  r.response_time,
          error_count:    r.error_count,
          br_count:       r.business_rule_count,
          client_tx:      r.client_transaction,
        })),
      };
    }

    default: return null;
  }
}
