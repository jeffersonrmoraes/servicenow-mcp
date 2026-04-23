import { snGet } from "../../lib/client.js";
import { encodeQueryParam } from "../../lib/helpers.js";
import { ServiceNowEnv } from "../../types.js";

// ─────────────────────────────────────────────
//  Interfaces & Shared Types
// ─────────────────────────────────────────────

export interface LintIssue {
  severity: "error" | "warning" | "info";
  check:    string;
  record:   string;
  table:    string;
  message:  string;
  detail?:  string;
}

// ─────────────────────────────────────────────
//  Script-bearing tables in Update Sets
// ─────────────────────────────────────────────

export const SCRIPT_TABLES: Record<string, { field: string; label: string }> = {
  sys_script:          { field: "script",        label: "Business Rule" },
  sys_script_include:  { field: "script",        label: "Script Include" },
  sys_script_client:   { field: "script",        label: "Client Script" },
  sys_ui_action:       { field: "script",        label: "UI Action" },
  sys_transform_map:   { field: "script",        label: "Transform Map Script" },
  sys_rest_message_fn: { field: "rest_endpoint", label: "REST Message Function" },
  sys_processor:       { field: "script",        label: "Processor" },
  scheduled_job:       { field: "script",        label: "Scheduled Job" },
};

export const ALL_CHECKS = [
  "try_catch", "comments", "hardcoded_sysids", "missing_deps", "duplicate_methods",
  "gr_in_loop", "current_update", "eval_usage", "client_server_api",
  "no_limit_query", "rest_no_timeout", "encoded_query_concat",
  "hardcoded_urls", "hardcoded_secrets", "missing_description",
];

// ─────────────────────────────────────────────
//  Regex constants
// ─────────────────────────────────────────────

const SYSID_REGEX      = /['"][0-9a-f]{32}['"]/gi;
const DUPLICATE_FN_RE  = /function\s+(\w+)\s*\(/g;
const URL_REGEX        = /['"`](https?:\/\/[^'"`\s]{8,})['"`]/g;
const SECRET_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /password\s*[:=]\s*['"][^'"]{3,}['"]/gi,       label: "password" },
  { re: /api[_-]?key\s*[:=]\s*['"][^'"]{6,}['"]/gi,    label: "api_key" },
  { re: /secret\s*[:=]\s*['"][^'"]{6,}['"]/gi,         label: "secret" },
  { re: /\btoken\s*[:=]\s*['"][^'"]{8,}['"]/gi,        label: "token" },
  { re: /bearer\s+['"][^'"]{8,}['"]/gi,                 label: "bearer_token" },
];

// Server-only APIs that should never appear in client scripts
const SERVER_ONLY_PATTERNS: Array<{ re: RegExp; api: string }> = [
  { re: /new\s+GlideRecord\s*\(/,         api: "GlideRecord" },
  { re: /new\s+GlideAggregate\s*\(/,      api: "GlideAggregate" },
  { re: /\bgs\.getProperty\s*\(/,         api: "gs.getProperty()" },
  { re: /\bgs\.log\s*\(/,                 api: "gs.log()" },
  { re: /\bgs\.info\s*\(/,                api: "gs.info()" },
  { re: /\bgs\.warn\s*\(/,                api: "gs.warn()" },
  { re: /\bgs\.error\s*\(/,               api: "gs.error()" },
  { re: /\bgs\.eventQueue\s*\(/,          api: "gs.eventQueue()" },
  { re: /\bgs\.sleep\s*\(/,              api: "gs.sleep()" },
  { re: /new\s+GlideQuery\s*\(/,          api: "GlideQuery" },
  { re: /\bGlideTableHierarchy\s*\(/,     api: "GlideTableHierarchy" },
];

// ─────────────────────────────────────────────
//  Original checks (v6.0)
// ─────────────────────────────────────────────

export function checkTryCatch(script: string, label: string, table: string): LintIssue[] {
  if (!script || script.trim().length < 30) return [];
  if (!/GlideRecord|GlideAggregate|GlideSystem|gs\./i.test(script)) return [];
  if (/try\s*\{/i.test(script)) return [];
  return [{
    severity: "warning", check: "try_catch", record: label, table,
    message:  "Script sem bloco try/catch — exceções podem crashar a transação.",
  }];
}

export function checkComments(script: string, label: string, table: string): LintIssue[] {
  if (!script || script.trim().length < 50) return [];
  if (/\/\/|\/\*|\*\//.test(script)) return [];
  const lineCount = script.split("\n").length;
  if (lineCount <= 5) return [];
  return [{
    severity: "info", check: "comments", record: label, table,
    message:  `Script de ${lineCount} linhas sem comentários — dificulta manutenção.`,
  }];
}

export function checkHardcodedSysIds(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  const matches = [...script.matchAll(SYSID_REGEX)];
  if (!matches.length) return [];
  return [{
    severity: "error", check: "hardcoded_sysids", record: label, table,
    message:  `${matches.length} sys_id(s) hardcoded encontrado(s) — use propriedades de sistema ou referências dinâmicas.`,
    detail:   matches.slice(0, 5).map(m => m[0]).join(", "),
  }];
}

export function checkDuplicateMethods(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  const seen = new Map<string, number>();
  let match;
  DUPLICATE_FN_RE.lastIndex = 0;
  while ((match = DUPLICATE_FN_RE.exec(script)) !== null) {
    const fn = match[1];
    seen.set(fn, (seen.get(fn) || 0) + 1);
  }
  const dups = [...seen.entries()].filter(([, c]) => c > 1);
  if (!dups.length) return [];
  return [{
    severity: "error", check: "duplicate_methods", record: label, table,
    message:  `Métodos duplicados: ${dups.map(([n, c]) => `${n} (x${c})`).join(", ")}.`,
  }];
}

export function checkGrInLoop(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  const loopRe = /(?:while\s*\([^)]*\)|for\s*\([^)]*\))\s*\{/g;
  let match;
  while ((match = loopRe.exec(script)) !== null) {
    const start = match.index + match[0].length;
    let depth = 1, i = start;
    while (i < script.length && depth > 0) {
      if (script[i] === "{") depth++;
      else if (script[i] === "}") depth--;
      i++;
    }
    const body = script.slice(start, i - 1);
    if (/new\s+(?:GlideRecord|GlideAggregate)\s*\(/.test(body)) {
      return [{
        severity: "error", check: "gr_in_loop", record: label, table,
        message:  "GlideRecord/GlideAggregate instanciado dentro de um loop — padrão N+1 queries. Pré-carregue os dados fora do loop.",
      }];
    }
  }
  return [];
}

export function checkCurrentUpdate(script: string, label: string, table: string): LintIssue[] {
  if (table !== "sys_script" || !script) return [];
  if (!/current\.update\s*\(/.test(script)) return [];
  return [{
    severity: "error", check: "current_update", record: label, table,
    message:  "current.update() detectado em Business Rule — pode causar loop infinito. Use current.setWorkflow(false) ou reestruture a lógica.",
  }];
}

export function checkEvalUsage(script: string, label: string, table: string): LintIssue[] {
  if (!script || !/\beval\s*\(/.test(script)) return [];
  return [{
    severity: "error", check: "eval_usage", record: label, table,
    message:  "eval() detectado — risco de segurança (code injection) e dificulta análise estática. Substitua por JSON.parse() ou lógica explícita.",
  }];
}

export function checkClientServerApi(script: string, label: string, table: string): LintIssue[] {
  if (table !== "sys_script_client" || !script) return [];
  const found = SERVER_ONLY_PATTERNS.filter(({ re }) => re.test(script)).map(({ api }) => api);
  if (!found.length) return [];
  return [{
    severity: "error", check: "client_server_api", record: label, table,
    message:  `API(s) server-only detectada(s) em Client Script: ${found.join(", ")}. Use GlideAjax para chamar lógica server-side.`,
  }];
}

export function checkNoLimitQuery(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  if (
    /new\s+GlideRecord\s*\(/.test(script) &&
    (/\.query\s*\(/.test(script) || /\.queryNoDomain\s*\(/.test(script)) &&
    !/\.setLimit\s*\(/.test(script)
  ) {
    return [{
      severity: "warning", check: "no_limit_query", record: label, table,
      message:  "GlideRecord.query() sem setLimit() — pode retornar toda a tabela e impactar performance. Adicione gr.setLimit(n).",
    }];
  }
  return [];
}

export function checkRestNoTimeout(script: string, label: string, table: string): LintIssue[] {
  if (!script || !/\bRESTMessageV2\s*\(/.test(script)) return [];
  if (/\.setHttpTimeout\s*\(/.test(script)) return [];
  return [{
    severity: "warning", check: "rest_no_timeout", record: label, table,
    message:  "RESTMessageV2 sem setHttpTimeout() — chamadas externas sem timeout podem causar starvation de threads. Adicione rm.setHttpTimeout(ms).",
  }];
}

export function checkEncodedQueryConcat(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  if (!/\.addEncodedQuery\s*\(\s*(?:[^)]+\+[^)]+)\)/.test(script)) return [];
  return [{
    severity: "warning", check: "encoded_query_concat", record: label, table,
    message:  "Concatenação de string detectada em addEncodedQuery() — risco de query injection. Use addQuery(field, value) para parâmetros dinâmicos.",
  }];
}

// ─────────────────────────────────────────────
//  New checks (v7.0)
// ─────────────────────────────────────────────

/**
 * Detects hardcoded HTTP/HTTPS URLs — should live in System Properties.
 * Excludes localhost/127.x for test environments.
 */
export function checkHardcodedUrls(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  URL_REGEX.lastIndex = 0;
  const matches = [...script.matchAll(URL_REGEX)].map(m => m[1]);
  const external = matches.filter(u => !/localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0/.test(u));
  if (!external.length) return [];
  return [{
    severity: "warning", check: "hardcoded_urls", record: label, table,
    message:  `${external.length} URL(s) hardcoded detectada(s) — use System Properties para endereços externos, facilita mudanças entre ambientes.`,
    detail:   external.slice(0, 3).join(", "),
  }];
}

/**
 * Detects hardcoded credentials/secrets in scripts — security risk.
 */
export function checkHardcodedSecrets(script: string, label: string, table: string): LintIssue[] {
  if (!script) return [];
  const found: string[] = [];
  for (const { re, label: secretLabel } of SECRET_PATTERNS) {
    re.lastIndex = 0;
    if (re.test(script)) found.push(secretLabel);
  }
  if (!found.length) return [];
  return [{
    severity: "error", check: "hardcoded_secrets", record: label, table,
    message:  `Possíveis segredos hardcoded: ${found.join(", ")} — use System Properties criptografadas (private=true) ou Credentials.`,
  }];
}

/**
 * Checks if the description field is empty for Script Includes and Business Rules.
 * Parses the XML payload to extract the description field.
 */
export function checkMissingDescription(payload: string, label: string, table: string): LintIssue[] {
  if (!["sys_script_include", "sys_script"].includes(table) || !payload) return [];
  const m = payload.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
  const description = m ? m[1].trim() : "";
  if (description) return [];
  const type = table === "sys_script_include" ? "Script Include" : "Business Rule";
  return [{
    severity: "info", check: "missing_description", record: label, table,
    message:  `Campo 'description' vazio em ${type} — documentação ausente dificulta manutenção e code reviews.`,
  }];
}

// ─────────────────────────────────────────────
//  Async check: Missing Dependencies
// ─────────────────────────────────────────────

export async function checkMissingDeps(
  script: string, label: string, table: string, env: ServiceNowEnv,
): Promise<LintIssue[]> {
  if (!script) return [];
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
    if (!knownBuiltins.has(m[1])) candidates.add(m[1]);
  }
  if (!candidates.size) return [];

  const names = [...candidates].slice(0, 20);
  const query = names.map(n => `name=${encodeQueryParam(n)}`).join("^OR");

  try {
    const { result } = await snGet("/api/now/table/sys_script_include", {
      sysparm_query: query, sysparm_fields: "name,active", sysparm_limit: 50,
    }, env);

    const found    = new Set(result.filter((r: any) => r.active !== "false").map((r: any) => r.name));
    const inactive = new Set(result.filter((r: any) => r.active === "false").map((r: any) => r.name));
    const missing  = names.filter(n => !found.has(n) && !inactive.has(n));
    const inact    = names.filter(n => inactive.has(n));
    const issues: LintIssue[] = [];
    if (missing.length) issues.push({
      severity: "warning", check: "missing_deps", record: label, table,
      message:  `Possíveis Script Includes referenciados mas não encontrados: ${missing.join(", ")}.`,
      detail:   "Pode ser falso-positivo para classes locais ou variáveis de mesmo nome.",
    });
    if (inact.length) issues.push({
      severity: "error", check: "missing_deps", record: label, table,
      message:  `Script Includes referenciados mas INATIVAS: ${inact.join(", ")}.`,
    });
    return issues;
  } catch {
    return [];
  }
}
