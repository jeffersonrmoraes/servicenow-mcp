// ─────────────────────────────────────────────
//  Rate Limiter — Sliding Window por Ambiente
// ─────────────────────────────────────────────

const windows = new Map(); // envKey → [timestamp, ...]

const WINDOW_MS  = 1_000; // janela de 1 segundo
const MAX_DEFAULT = 10;    // máximo de chamadas por janela

/**
 * Verifica se o ambiente `env` excedeu o limite de chamadas por segundo.
 * Lança erro se exceder. Deve ser chamado antes de cada fetch.
 *
 * @param {string|null} env   - Prefixo do ambiente (ou null para default)
 * @param {number} max        - Máximo de chamadas por segundo (default: 10)
 */
export function checkRateLimit(env, max = MAX_DEFAULT) {
  const key = env || "default";
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  // Obtém ou cria a janela deslizante para este ambiente
  let timestamps = windows.get(key) || [];

  // Remove timestamps fora da janela
  timestamps = timestamps.filter(t => t > cutoff);

  if (timestamps.length >= max) {
    throw new Error(
      `Rate limit excedido para o ambiente '${key}': máximo ${max} chamadas/segundo. Aguarde um momento.`
    );
  }

  timestamps.push(now);
  windows.set(key, timestamps);
}
