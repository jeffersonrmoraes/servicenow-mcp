// ─────────────────────────────────────────────
//  Cache em Memória com TTL
// ─────────────────────────────────────────────

const DEFAULT_TTL_MS = 60_000; // 60 segundos

const store = new Map(); // key → { value, expiresAt }

/**
 * Retorna o valor em cache ou undefined se não existir / expirado.
 */
export function cacheGet(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

/**
 * Armazena um valor no cache com TTL opcional (default 60s).
 */
export function cacheSet(key, value, ttlMs = DEFAULT_TTL_MS) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

/**
 * Remove todas as entradas cujas chaves contenham o padrão informado.
 * Útil para invalidar o cache de um path após POST/PATCH/DELETE.
 */
export function cacheInvalidate(pattern) {
  for (const key of store.keys()) {
    if (key.includes(pattern)) {
      store.delete(key);
    }
  }
}

/**
 * Limpa todo o cache (útil para testes).
 */
export function cacheClear() {
  store.clear();
}
