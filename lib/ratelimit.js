// ─────────────────────────────────────────────
//  Rate Limiter — Sliding Window por Ambiente (com Backoff)
// ─────────────────────────────────────────────

const windows = new Map(); // envKey → [timestamp, ...]

const WINDOW_MS   = 1_000; // janela de 1 segundo
const MAX_DEFAULT = 10;    // máximo de chamadas por janela
const MAX_WAIT_MS = 5_000; // timeout máximo de backoff (5s)

/**
 * Verifica se o ambiente `env` excedeu o limite de chamadas por segundo.
 * Se exceder, aguarda automaticamente (backoff) até liberar — em vez de lançar erro.
 * Lança erro apenas se o tempo total de espera exceder MAX_WAIT_MS.
 *
 * @param {string|null} env   - Prefixo do ambiente (ou null para default)
 * @param {number}      max   - Máximo de chamadas por segundo (default: 10)
 * @param {number}      _waited - Tempo já aguardado (interno, para recursão)
 */
export async function checkRateLimit(env, max = MAX_DEFAULT, _waited = 0) {
  const key    = env || "default";
  const now    = Date.now();
  const cutoff = now - WINDOW_MS;

  // Obtém ou cria a janela deslizante para este ambiente
  let timestamps = windows.get(key) || [];

  // Remove timestamps fora da janela
  timestamps = timestamps.filter(t => t > cutoff);

  if (timestamps.length >= max) {
    // Calcula quanto tempo falta para o timestamp mais antigo sair da janela
    const oldestTs = Math.min(...timestamps);
    const waitMs   = WINDOW_MS - (now - oldestTs) + 10;

    if (_waited + waitMs > MAX_WAIT_MS) {
      throw new Error(
        `Rate limit excedido para o ambiente '${key}': máximo ${max} chamadas/segundo. ` +
        `Timeout de backoff atingido (${MAX_WAIT_MS}ms). Reduza a concorrência.`
      );
    }

    await new Promise(r => setTimeout(r, waitMs));
    return checkRateLimit(env, max, _waited + waitMs);
  }

  timestamps.push(now);
  windows.set(key, timestamps);
}
