// ─────────────────────────────────────────────
//  Simple TTL Cache
// ─────────────────────────────────────────────

const cache = new Map<string, { value: any; expires: number }>();
const DEFAULT_TTL_MS = 60 * 1000; // 1 minuto

/**
 * Recupera um valor do cache se não estiver expirado.
 */
export function cacheGet(key: string): any | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;

  if (Date.now() > entry.expires) {
    cache.delete(key);
    return undefined;
  }
  return entry.value;
}

/**
 * Armazena um valor no cache com TTL.
 */
export function cacheSet(key: string, value: any, ttlMs: number = DEFAULT_TTL_MS) {
  cache.set(key, {
    value,
    expires: Date.now() + ttlMs,
  });
}

/**
 * Invalida chaves que casam com um padrão (parcial).
 */
export function cacheInvalidate(pattern: string) {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

/**
 * Limpa todo o cache (reset total).
 */
export function cacheClear() {
  cache.clear();
}
