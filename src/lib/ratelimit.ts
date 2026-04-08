// ─────────────────────────────────────────────
//  Simple Rate Limiter
// ─────────────────────────────────────────────

const history = new Map<string, number[]>();
const MAX_DEFAULT = 10;
const WINDOW_MS  = 1000;

/**
 * Garante que não excedemos o limite de requisições por segundo.
 * Implementação simplificada (Fixed Window).
 */
export async function checkRateLimit(env: string | null, max: number = MAX_DEFAULT, _waited: number = 0): Promise<void> {
  const key = env || "default";
  if (!history.has(key)) history.set(key, []);

  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  let timestamps = history.get(key)!;

  // Limpa registros antigos
  timestamps = timestamps.filter((t: number) => t > cutoff);
  history.set(key, timestamps);

  if (timestamps.length >= max) {
    if (_waited > 5000) {
      throw new Error(`Rate limit excedido para o ambiente '${key}' (5s timeout)`);
    }
    // Espera um pouco e tenta novamente
    await new Promise(resolve => setTimeout(resolve, 100));
    return checkRateLimit(env, max, _waited + 100);
  }

  timestamps.push(now);
}
