// ─────────────────────────────────────────────
//  Shared Helpers — evita duplicação entre tools
// ─────────────────────────────────────────────

import { snGet, snPost, snPatch } from "./client.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  Upsert genérico (POST ou PATCH conforme sys_id)
// ─────────────────────────────────────────────

export interface UpsertResult {
  action: "created" | "updated";
  sys_id: string;
  [key: string]: any;
}

/**
 * Cria (POST) ou atualiza (PATCH) um registro conforme a presença de sys_id.
 * @param table   - nome da tabela (ex: sc_cat_item)
 * @param sys_id  - sys_id existente → PATCH; undefined → POST
 * @param payload - campos a enviar
 * @param env     - prefixo do ambiente
 * @param pick    - campos extras a extrair do result para o retorno
 */
export async function upsertRecord(
  table: string,
  sys_id: string | undefined,
  payload: Record<string, any>,
  env: ServiceNowEnv,
  pick: string[] = [],
): Promise<UpsertResult> {
  if (sys_id) {
    const { result } = await snPatch(`/api/now/table/${table}/${sys_id}`, payload, env);
    const extra = Object.fromEntries(pick.map(k => [k, result[k]]));
    return { action: "updated", sys_id: result.sys_id, ...extra };
  } else {
    const { result } = await snPost(`/api/now/table/${table}`, payload, env);
    const extra = Object.fromEntries(pick.map(k => [k, result[k]]));
    return { action: "created", sys_id: result.sys_id, ...extra };
  }
}

// ─────────────────────────────────────────────
//  Lookup por campo único (com guard de "não encontrado")
// ─────────────────────────────────────────────

/**
 * Busca um único registro por campo/valor.
 * Lança erro amigável se não encontrado.
 */
export async function findByField(
  table: string,
  field: string,
  value: string,
  env: ServiceNowEnv,
  notFoundMsg?: string,
): Promise<any> {
  const { result } = await snGet(
    `/api/now/table/${table}`,
    { sysparm_query: `${field}=${encodeQueryParam(value)}`, sysparm_limit: 1, sysparm_fields: "sys_id,name" },
    env,
  );
  if (!result?.length) {
    throw new Error(notFoundMsg || `${table} com ${field}='${value}' não encontrado.`);
  }
  return result[0];
}

// ─────────────────────────────────────────────
//  Resolve campo ServiceNow {display_value, value} | string
// ─────────────────────────────────────────────

/**
 * ServiceNow às vezes retorna campos como `{ display_value: "...", value: "..." }`.
 * Este helper sempre retorna a string correta.
 */
export function resolveSnField(field: any): string {
  if (field === null || field === undefined) return "";
  if (typeof field === "object") {
    return field.display_value || field.value || "";
  }
  return String(field);
}

// ─────────────────────────────────────────────
//  Encode seguro de valores inline em encoded queries
// ─────────────────────────────────────────────

/**
 * Bloqueia caracteres que quebrariam queries encoded inline.
 * Uso: ao montar `^field=${encodeQueryParam(userValue)}`.
 */
export function encodeQueryParam(value: string): string {
  if (typeof value !== "string") return String(value);
  // Remove null bytes e caracteres de controle
  return value
    .replace(/\0/g, "")
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Escapa ^ (separador de cláusulas) e = (separador de valor) dentro de valores literais
    .replace(/\^/g, "\\^")
    .replace(/(?<!\\)=/g, "\\=");
}
