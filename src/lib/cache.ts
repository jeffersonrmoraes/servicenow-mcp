// ─────────────────────────────────────────────
//  Simple TTL Cache
// ─────────────────────────────────────────────

const cache = new Map<string, { value: any; expires: number }>();

/**
 * TTL configurável via SN_CACHE_TTL_MS (padrão: 60 000 ms = 1 minuto).
 * Defina 0 para desabilitar o cache completamente.
 */
const DEFAULT_TTL_MS = parseInt(process.env.SN_CACHE_TTL_MS || String(60 * 1000), 10);

/**
 * Recupera um valor do cache se não estiver expirado.
 */
export function cacheGet(key: string): any | undefined {
  if (DEFAULT_TTL_MS === 0) return undefined; // cache desabilitado
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
  if (ttlMs === 0) return; // cache desabilitado
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
