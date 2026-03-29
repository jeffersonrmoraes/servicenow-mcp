// ─────────────────────────────────────────────
//  Input Validation Helpers
// ─────────────────────────────────────────────

/**
 * Valida nome de tabela ServiceNow.
 * Permite letras, números e underscore. Rejeita path traversal e injeção.
 */
export function validateTableName(table) {
  if (!table || typeof table !== "string") {
    throw new Error("Nome da tabela é obrigatório e deve ser uma string.");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(table)) {
    throw new Error(`Nome de tabela inválido: '${table}'. Use apenas letras, números e underscore.`);
  }
  if (table.length > 80) {
    throw new Error(`Nome de tabela muito longo: '${table}'.`);
  }
}

/**
 * Valida sys_id do ServiceNow.
 * Aceita UUID com 32 caracteres hex (com ou sem hífens).
 */
export function validateSysId(sys_id) {
  if (!sys_id || typeof sys_id !== "string") {
    throw new Error("sys_id é obrigatório e deve ser uma string.");
  }
  const clean = sys_id.replace(/-/g, "");
  if (!/^[a-f0-9]{32}$/i.test(clean)) {
    throw new Error(`sys_id inválido: '${sys_id}'. Deve ter 32 caracteres hexadecimais.`);
  }
}

/**
 * Valida e normaliza o limite de resultados.
 * Retorna o limite como inteiro dentro do intervalo [1, 1000].
 */
export function validateLimit(limit) {
  const n = Number(limit);
  if (!Number.isInteger(n) || n < 1) {
    throw new Error(`Limite inválido: '${limit}'. Deve ser um número inteiro positivo.`);
  }
  if (n > 1000) {
    throw new Error(`Limite '${limit}' excede o máximo permitido de 1000.`);
  }
  return n;
}
