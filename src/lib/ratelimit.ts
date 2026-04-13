// ─────────────────────────────────────────────
//  Rate Limiter — iterativo, janela deslizante
// ─────────────────────────────────────────────

const history = new Map<string, number[]>();

const WINDOW_MS   = 1000;
const MAX_READ    = parseInt(process.env.SN_RATE_LIMIT_READ  || "10", 10); // GET
const MAX_WRITE   = parseInt(process.env.SN_RATE_LIMIT_WRITE || "5",  10); // POST / PATCH / DELETE
const TIMEOUT_MS  = 5000;
const BACKOFF_MS  = 100;

/**
 * Garante que não excedemos o limite de requisições por segundo.
 * Implementação iterativa com janela deslizante — sem risco de stack overflow.
 *
 * @param env    - prefixo do ambiente (ou null para default)
 * @param method - método HTTP (GET usa limite maior que writes)
 */
export async function checkRateLimit(
  env: string | null,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT" = "GET",
): Promise<void> {
  const key = env || "default";
  const max = method === "GET" ? MAX_READ : MAX_WRITE;

  if (!history.has(key)) history.set(key, []);

  const deadline = Date.now() + TIMEOUT_MS;

  while (true) {
    const now    = Date.now();
    const cutoff = now - WINDOW_MS;

    // Limpa registros fora da janela
    const timestamps = history.get(key)!.filter(t => t > cutoff);
    history.set(key, timestamps);

    if (timestamps.length < max) {
      timestamps.push(now);
      return;
    }

    if (Date.now() >= deadline) {
      throw new Error(
        `Rate limit excedido para o ambiente '${key}' — timeout de ${TIMEOUT_MS / 1000}s atingido.`
      );
    }

    await new Promise<void>(resolve => setTimeout(resolve, BACKOFF_MS));
  }
}
