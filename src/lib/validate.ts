// ─────────────────────────────────────────────
//  Input Validation Helpers
// ─────────────────────────────────────────────

/**
 * Valida o nome da tabela (segurança básica).
 */
export function validateTableName(table: any): string {
  if (typeof table !== "string" || !table) {
    throw new Error("Nome da tabela é obrigatório.");
  }
  if (table.length > 80) {
    throw new Error("Nome da tabela é muito longo.");
  }
  // Regex para permitir nomes nativos e customizados (u_, x_)
  if (!/^[a-z0-9_]+$/i.test(table)) {
    throw new Error(`Nome da tabela contém caracteres inválidos: '${table}'`);
  }
  return table;
}

/**
 * Valida o SysID (32 chars hex ou 36 chars GUID com hifens).
 */
export function validateSysId(sys_id: any): string {
  if (typeof sys_id !== "string" || !sys_id) {
    throw new Error("SysID é obrigatório.");
  }
  // Suporta 32 (nativo SN) ou 36 (GUID com hifens, as vezes usado em externa)
  if (sys_id.length !== 32 && sys_id.length !== 36) {
    throw new Error(`SysID inválido: '${sys_id}'. Deve possuir 32 caracteres hexadecimais.`);
  }
  return sys_id;
}

/**
 * Valida o payload de criação/atualização.
 * Garante que seja um objeto não-vazio sem chaves suspeitas.
 */
export function validateDataPayload(data: any, context = "data"): Record<string, any> {
  if (data === null || data === undefined || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`O campo '${context}' deve ser um objeto JSON (ex: { "state": "1", "priority": "2" }).`);
  }
  const keys = Object.keys(data);
  if (keys.length === 0) {
    throw new Error(`O campo '${context}' não pode ser um objeto vazio.`);
  }
  // Bloqueia chaves de sistema protegidas que o ServiceNow ignora silenciosamente
  const blockedKeys = ["sys_id", "sys_created_on", "sys_created_by", "sys_updated_on", "sys_updated_by"];
  const blocked = keys.filter(k => blockedKeys.includes(k));
  if (blocked.length > 0) {
    throw new Error(`Os campos '${blocked.join(", ")}' são somente leitura e não podem ser enviados no payload.`);
  }
  return data as Record<string, any>;
}

/**
 * Valida uma encoded query fornecida pelo usuário.
 * Bloqueia null bytes e padrões claramente maliciosos.
 * NÃO valida sintaxe completa — o ServiceNow retornará erro se a query for inválida.
 */
export function validateEncodedQuery(query: any, fieldName = "query"): string {
  if (query === null || query === undefined || query === "") return "";
  if (typeof query !== "string") {
    throw new Error(`O campo '${fieldName}' deve ser uma string (encoded query do ServiceNow).`);
  }
  if (query.length > 4000) {
    throw new Error(`O campo '${fieldName}' excede o tamanho máximo permitido (4000 caracteres).`);
  }
  // Bloqueia null bytes
  if (query.includes("\0")) {
    throw new Error(`O campo '${fieldName}' contém caracteres inválidos (null byte).`);
  }
  return query;
}

/**
 * Valida e converte o limite de registros.
 */
export function validateLimit(limit: any): number {
  if (limit === null || limit === undefined) {
    throw new Error("Limite inválido.");
  }

  // Rejeita não-inteiros (como 1.5)
  if (typeof limit === "number" && !Number.isInteger(limit)) {
    throw new Error("Limite inválido.");
  }
  
  const parsed = parseInt(limit, 10);
  if (isNaN(parsed) || parsed < 1) {
    throw new Error("Limite inválido.");
  }
  if (parsed > 1000) {
    throw new Error("Limite excede o máximo permitido (1000).");
  }
  return parsed;
}
