import { snGet } from "../lib/client.js";
import { validateSysId } from "../lib/validate.js";
import { encodeQueryParam } from "../lib/helpers.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Governance & Quality (v6.0)
// ─────────────────────────────────────────────

export const governanceTools = [
  {
    name: "sn_check_update_set",
    description:
      "Linter de qualidade para Update Sets. Analisa os scripts contidos em busca de: " +
      "ausência de try/catch, falta de comentários, sys_ids hardcoded, " +
      "dependências faltantes, métodos duplicados, GlideRecord em loop (N+1), " +
      "current.update() em Business Rules, eval(), APIs server-only em Client Scripts, " +
      "queries sem setLimit(), RESTMessageV2 sem timeout, e concatenação em addEncodedQuery. " +
      "Retorna um relatório estruturado de issues.",
    inputSchema: {
      type: "object",
      properties: {
        env:           { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        update_set_id: { type: "string", description: "sys_id do Update Set a analisar" },
        name:          { type: "string", description: "Nome parcial do Update Set (alternativa ao sys_id)" },
        checks: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "try_catch", "comments", "hardcoded_sysids", "missing_deps", "duplicate_methods",
              "gr_in_loop", "current_update", "eval_usage", "client_server_api",
              "no_limit_query", "rest_no_timeout", "encoded_query_concat",
            ],
          },
          description: "Checks específicos a executar (default: todos)",
        },
      },
    },
  },
];

// ─────────────────────────────────────────────
//  Linter Rules
// ─────────────────────────────────────────────

interface LintIssue {
  severity: "error" | "warning" | "info";
  check:    string;
  record:   string;
  table:    string;
  message:  string;
  detail?:  string;
}

// Regex patterns for static analysis
const SYSID_REGEX     = /['"][0-9a-f]{32}['"]/gi;
const DUPLICATE_FN_RE = /function\s+(\w+)\s*\(/g;

function checkTryCatch(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script || script.trim().length < 30) return issues;

  // Skip pure condition scripts (very short, no logic blocks)
  const hasGlide = /GlideRecord|GlideAggregate|GlideSystem|gs\./i.test(script);
  if (!hasGlide) return issues;

  const hasTryCatch = /try\s*\{/i.test(script);
  if (!hasTryCatch) {
    issues.push({
      severity: "warning",
      check:    "try_catch",
      record:   label,
      table,
      message:  "Script sem bloco try/catch — exceções podem crashar a transação.",
    });
  }
  return issues;
}

function checkComments(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script || script.trim().length < 50) return issues;

  const hasComments = /\/\/|\/\*|\*\//.test(script);
  const lineCount   = script.split("\n").length;

  if (!hasComments && lineCount > 5) {
    issues.push({
      severity: "info",
      check:    "comments",
      record:   label,
      table,
      message:  `Script de ${lineCount} linhas sem comentários — dificulta manutenção.`,
    });
  }
  return issues;
}

function checkHardcodedSysIds(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  const matches = [...script.matchAll(SYSID_REGEX)];
  if (matches.length > 0) {
    issues.push({
      severity: "error",
      check:    "hardcoded_sysids",
      record:   label,
      table,
      message:  `${matches.length} sys_id(s) hardcoded encontrado(s) — use propriedades de sistema ou referências dinâmicas.`,
      detail:   matches.slice(0, 5).map(m => m[0]).join(", "),
    });
  }
  return issues;
}

function checkDuplicateMethods(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  const seen  = new Map<string, number>();
  let match;

  // Reset lastIndex for global regex
  DUPLICATE_FN_RE.lastIndex = 0;
  while ((match = DUPLICATE_FN_RE.exec(script)) !== null) {
    const fnName = match[1];
    seen.set(fnName, (seen.get(fnName) || 0) + 1);
  }

  const duplicates = [...seen.entries()].filter(([, count]) => count > 1);
  if (duplicates.length > 0) {
    issues.push({
      severity: "error",
      check:    "duplicate_methods",
      record:   label,
      table,
      message:  `Métodos duplicados detectados: ${duplicates.map(([n, c]) => `${n} (x${c})`).join(", ")}.`,
    });
  }
  return issues;
}

// ─────────────────────────────────────────────
//  New best-practice checks (v6.1)
// ─────────────────────────────────────────────

/**
 * Detects GlideRecord/GlideAggregate instantiation inside loop bodies (N+1 anti-pattern).
 * Heuristic: finds while/for blocks and checks if a new Glide query appears inside.
 */
function checkGrInLoop(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  // Match while(...){ ... } and for(...){ ... } blocks (simplified, handles nesting via depth)
  const loopRe = /(?:while\s*\([^)]*\)|for\s*\([^)]*\))\s*\{/g;
  let match;
  while ((match = loopRe.exec(script)) !== null) {
    const blockStart = match.index + match[0].length;
    // Walk forward to find matching brace
    let depth = 1, i = blockStart;
    while (i < script.length && depth > 0) {
      if (script[i] === "{") depth++;
      else if (script[i] === "}") depth--;
      i++;
    }
    const body = script.slice(blockStart, i - 1);
    if (/new\s+(?:GlideRecord|GlideAggregate)\s*\(/.test(body)) {
      issues.push({
        severity: "error",
        check:    "gr_in_loop",
        record:   label,
        table,
        message:  "GlideRecord/GlideAggregate instanciado dentro de um loop — padrão N+1 queries. Pré-carregue os dados fora do loop.",
      });
      break; // One issue per record is enough
    }
  }
  return issues;
}

/**
 * Detects current.update() in Business Rules — can trigger infinite loops.
 */
function checkCurrentUpdate(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (table !== "sys_script" || !script) return issues;

  if (/current\.update\s*\(/.test(script)) {
    issues.push({
      severity: "error",
      check:    "current_update",
      record:   label,
      table,
      message:  "current.update() detectado em Business Rule — pode causar loop infinito. Use current.setWorkflow(false) ou reestruture a lógica.",
    });
  }
  return issues;
}

/**
 * Detects eval() usage — security and maintainability risk.
 */
function checkEvalUsage(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  if (/\beval\s*\(/.test(script)) {
    issues.push({
      severity: "error",
      check:    "eval_usage",
      record:   label,
      table,
      message:  "eval() detectado — risco de segurança (code injection) e dificulta análise estática. Substitua por JSON.parse() ou lógica explícita.",
    });
  }
  return issues;
}

// Server-only APIs that should never appear in client scripts
const SERVER_ONLY_PATTERNS: Array<{ re: RegExp; api: string }> = [
  { re: /new\s+GlideRecord\s*\(/,          api: "GlideRecord" },
  { re: /new\s+GlideAggregate\s*\(/,       api: "GlideAggregate" },
  { re: /\bgs\.getProperty\s*\(/,          api: "gs.getProperty()" },
  { re: /\bgs\.log\s*\(/,                  api: "gs.log()" },
  { re: /\bgs\.info\s*\(/,                 api: "gs.info()" },
  { re: /\bgs\.warn\s*\(/,                 api: "gs.warn()" },
  { re: /\bgs\.error\s*\(/,                api: "gs.error()" },
  { re: /\bgs\.eventQueue\s*\(/,           api: "gs.eventQueue()" },
  { re: /\bgs\.sleep\s*\(/,               api: "gs.sleep()" },
  { re: /new\s+GlideQuery\s*\(/,           api: "GlideQuery" },
  { re: /\bGlideTableHierarchy\s*\(/,      api: "GlideTableHierarchy" },
];

/**
 * Detects server-only ServiceNow APIs used in client scripts (sys_script_client).
 */
function checkClientServerApi(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (table !== "sys_script_client" || !script) return issues;

  const found: string[] = [];
  for (const { re, api } of SERVER_ONLY_PATTERNS) {
    if (re.test(script)) found.push(api);
  }

  if (found.length > 0) {
    issues.push({
      severity: "error",
      check:    "client_server_api",
      record:   label,
      table,
      message:  `API(s) server-only detectada(s) em Client Script: ${found.join(", ")}. Use GlideAjax para chamar lógica server-side.`,
    });
  }
  return issues;
}

/**
 * Detects GlideRecord queries without setLimit() — full-table scan risk.
 */
function checkNoLimitQuery(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  const hasGlideRecord = /new\s+GlideRecord\s*\(/.test(script);
  const hasSetLimit    = /\.setLimit\s*\(/.test(script);
  const hasQuery       = /\.query\s*\(/.test(script) || /\.queryNoDomain\s*\(/.test(script);

  if (hasGlideRecord && hasQuery && !hasSetLimit) {
    issues.push({
      severity: "warning",
      check:    "no_limit_query",
      record:   label,
      table,
      message:  "GlideRecord.query() sem setLimit() — pode retornar toda a tabela e impactar performance. Adicione gr.setLimit(n).",
    });
  }
  return issues;
}

/**
 * Detects RESTMessageV2 usage without setHttpTimeout — thread starvation risk.
 */
function checkRestNoTimeout(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  const hasRest    = /\bRESTMessageV2\s*\(/.test(script);
  const hasTimeout = /\.setHttpTimeout\s*\(/.test(script);

  if (hasRest && !hasTimeout) {
    issues.push({
      severity: "warning",
      check:    "rest_no_timeout",
      record:   label,
      table,
      message:  "RESTMessageV2 sem setHttpTimeout() — chamadas externas sem timeout podem causar starvation de threads. Adicione rm.setHttpTimeout(ms).",
    });
  }
  return issues;
}

/**
 * Detects string concatenation inside addEncodedQuery() — encoded query injection risk.
 */
function checkEncodedQueryConcat(script: string, label: string, table: string): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  // Pattern: addEncodedQuery( followed by something with + before the closing )
  const re = /\.addEncodedQuery\s*\(\s*(?:[^)]+\+[^)]+)\)/g;
  if (re.test(script)) {
    issues.push({
      severity: "warning",
      check:    "encoded_query_concat",
      record:   label,
      table,
      message:  "Concatenação de string detectada em addEncodedQuery() — risco de query injection. Use addQuery(field, value) para parâmetros dinâmicos.",
    });
  }
  return issues;
}

// ─────────────────────────────────────────────
//  Script-bearing tables in Update Sets
// ─────────────────────────────────────────────

const SCRIPT_TABLES: Record<string, { field: string; label: string }> = {
  sys_script:               { field: "script",        label: "Business Rule" },
  sys_script_include:       { field: "script",        label: "Script Include" },
  sys_script_client:        { field: "script",        label: "Client Script" },
  sys_ui_action:            { field: "script",        label: "UI Action" },
  sys_transform_map:        { field: "script",        label: "Transform Map Script" },
  sys_rest_message_fn:      { field: "rest_endpoint", label: "REST Message Function" },
  sys_processor:            { field: "script",        label: "Processor" },
  scheduled_job:            { field: "script",        label: "Scheduled Job" },
};

// ─────────────────────────────────────────────
//  Missing dependency detection
// ─────────────────────────────────────────────

async function checkMissingDeps(
  script: string,
  label: string,
  table: string,
  env: ServiceNowEnv,
): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  if (!script) return issues;

  // Extract referenced Script Includes from new <Name>() or <Name>.method() patterns
  const siPattern = /\b([A-Z][a-zA-Z0-9]+)\s*\(/g;
  const knownBuiltins = new Set([
    "GlideRecord", "GlideAggregate", "GlideDateTime", "GlideDate", "GlideDuration",
    "GlideSystem", "GlideUser", "GlideElement", "GlideQuery", "GlideTableHierarchy",
    "Array", "Object", "String", "Number", "Boolean", "JSON", "Math", "Date", "RegExp",
    "Promise", "Map", "Set", "Error", "XMLDocument", "XMLNodeIterator",
  ]);

  const candidates = new Set<string>();
  let m;
  siPattern.lastIndex = 0;
  while ((m = siPattern.exec(script)) !== null) {
    const name = m[1];
    if (!knownBuiltins.has(name)) candidates.add(name);
  }

  if (candidates.size === 0) return issues;

  // Check which ones exist as Script Includes in the instance
  const names = [...candidates].slice(0, 20); // cap for API safety
  const query = names.map(n => `name=${encodeQueryParam(n)}`).join("^OR");

  try {
    const { result } = await snGet("/api/now/table/sys_script_include", {
      sysparm_query:  query,
      sysparm_fields: "name,active",
      sysparm_limit:  50,
    }, env);

    const found     = new Set(result.filter((r: any) => r.active !== "false").map((r: any) => r.name));
    const inactive  = new Set(result.filter((r: any) => r.active === "false").map((r: any) => r.name));
    const missing   = names.filter(n => !found.has(n) && !inactive.has(n));
    const inactiveFound = names.filter(n => inactive.has(n));

    if (missing.length > 0) {
      issues.push({
        severity: "warning",
        check:    "missing_deps",
        record:   label,
        table,
        message:  `Possíveis Script Includes referenciados mas não encontrados: ${missing.join(", ")}.`,
        detail:   "Pode ser falso-positivo para classes locais ou variáveis de mesmo nome.",
      });
    }
    if (inactiveFound.length > 0) {
      issues.push({
        severity: "error",
        check:    "missing_deps",
        record:   label,
        table,
        message:  `Script Includes referenciados mas INATIVAS: ${inactiveFound.join(", ")}.`,
      });
    }
  } catch {
    // Silently skip if API call fails (network, permissions)
  }

  return issues;
}

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleGovernanceTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  switch (name) {
    case "sn_check_update_set": {
      if (!args.update_set_id && !args.name) {
        throw new Error("Informe update_set_id (sys_id) ou name do Update Set.");
      }

      const ALL_CHECKS = [
        "try_catch", "comments", "hardcoded_sysids", "missing_deps", "duplicate_methods",
        "gr_in_loop", "current_update", "eval_usage", "client_server_api",
        "no_limit_query", "rest_no_timeout", "encoded_query_concat",
      ];
      const activeChecks: Set<string> = args.checks?.length
        ? new Set(args.checks)
        : new Set(ALL_CHECKS);

      // 1. Resolve Update Set
      let updateSetSysId: string;
      let updateSetName: string;

      if (args.update_set_id) {
        validateSysId(args.update_set_id);
        updateSetSysId = args.update_set_id;
        const { result: us } = await snGet(`/api/now/table/sys_update_set/${updateSetSysId}`, {
          sysparm_fields: "name,state,sys_id",
        }, env);
        updateSetName = us.name;
      } else {
        const { result: found } = await snGet("/api/now/table/sys_update_set", {
          sysparm_query:  `nameLIKE${encodeQueryParam(args.name)}`,
          sysparm_fields: "sys_id,name,state",
          sysparm_limit:  1,
        }, env);
        if (!found?.length) throw new Error(`Update Set '${args.name}' não encontrado.`);
        updateSetSysId = found[0].sys_id;
        updateSetName  = found[0].name;
      }

      // 2. Fetch Update XML entries
      const { result: xmlEntries } = await snGet("/api/now/table/sys_update_xml", {
        sysparm_query:  `update_set=${updateSetSysId}^targetISNOTEMPTY`,
        sysparm_fields: "sys_id,name,target_name,type,payload",
        sysparm_limit:  500,
      }, env);

      if (!xmlEntries?.length) {
        return {
          update_set: updateSetName,
          update_set_id: updateSetSysId,
          total_records: 0,
          issues: [],
          summary: { errors: 0, warnings: 0, info: 0 },
          status: "clean",
        };
      }

      // 3. For each script-bearing record, run checks
      const allIssues: LintIssue[] = [];
      let scriptCount = 0;

      for (const entry of xmlEntries) {
        const table = entry.type?.toLowerCase?.() || "";
        const meta  = SCRIPT_TABLES[table];
        if (!meta) continue;

        // Extract script from payload XML (simplified: look for the script field)
        const payload   = entry.payload || "";
        const fieldTag  = meta.field;
        const scriptMatch = payload.match(
          new RegExp(`<${fieldTag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${fieldTag}>`, "i")
        ) || payload.match(
          new RegExp(`<${fieldTag}[^>]*>([^<]*)</${fieldTag}>`, "i")
        );

        const script = scriptMatch ? scriptMatch[1] : "";
        const label  = entry.target_name || entry.name || entry.sys_id;

        if (!script) continue;
        scriptCount++;

        if (activeChecks.has("try_catch"))
          allIssues.push(...checkTryCatch(script, label, table));
        if (activeChecks.has("comments"))
          allIssues.push(...checkComments(script, label, table));
        if (activeChecks.has("hardcoded_sysids"))
          allIssues.push(...checkHardcodedSysIds(script, label, table));
        if (activeChecks.has("duplicate_methods"))
          allIssues.push(...checkDuplicateMethods(script, label, table));
        if (activeChecks.has("gr_in_loop"))
          allIssues.push(...checkGrInLoop(script, label, table));
        if (activeChecks.has("current_update"))
          allIssues.push(...checkCurrentUpdate(script, label, table));
        if (activeChecks.has("eval_usage"))
          allIssues.push(...checkEvalUsage(script, label, table));
        if (activeChecks.has("client_server_api"))
          allIssues.push(...checkClientServerApi(script, label, table));
        if (activeChecks.has("no_limit_query"))
          allIssues.push(...checkNoLimitQuery(script, label, table));
        if (activeChecks.has("rest_no_timeout"))
          allIssues.push(...checkRestNoTimeout(script, label, table));
        if (activeChecks.has("encoded_query_concat"))
          allIssues.push(...checkEncodedQueryConcat(script, label, table));
        if (activeChecks.has("missing_deps"))
          allIssues.push(...(await checkMissingDeps(script, label, table, env)));
      }

      const summary = {
        errors:   allIssues.filter(i => i.severity === "error").length,
        warnings: allIssues.filter(i => i.severity === "warning").length,
        info:     allIssues.filter(i => i.severity === "info").length,
      };

      return {
        update_set:    updateSetName,
        update_set_id: updateSetSysId,
        total_records: xmlEntries.length,
        script_records_analyzed: scriptCount,
        checks_run:   [...activeChecks],
        issues:       allIssues,
        summary,
        status: summary.errors > 0 ? "fail" : summary.warnings > 0 ? "warn" : "clean",
      };
    }

    default: return null;
  }
}
