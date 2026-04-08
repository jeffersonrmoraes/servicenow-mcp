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
