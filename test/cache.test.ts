import { test } from "node:test";
import assert from "node:assert/strict";
import { cacheGet, cacheSet, cacheInvalidate, cacheClear, cacheStats } from "../src/lib/cache.js";

test("cache: retorna undefined para chave inexistente", () => {
  assert.equal(cacheGet("chave-inexistente"), undefined);
});

test("cache: armazena e recupera valor", () => {
  cacheSet("k1", { data: 42 });
  assert.deepEqual(cacheGet("k1"), { data: 42 });
  cacheClear();
});

test("cache: expira após TTL", async () => {
  cacheSet("k-ttl", "expira", 50); // 50ms
  assert.equal(cacheGet("k-ttl"), "expira");
  await new Promise(r => setTimeout(r, 80));
  assert.equal(cacheGet("k-ttl"), undefined);
  cacheClear();
});

test("cache: invalida por padrão de chave", () => {
  cacheSet("/api/now/table/incident?q=1", "resultado1");
  cacheSet("/api/now/table/incident?q=2", "resultado2");
  cacheSet("/api/now/table/sys_user?q=1", "outro");

  cacheInvalidate("/api/now/table/incident");

  assert.equal(cacheGet("/api/now/table/incident?q=1"), undefined);
  assert.equal(cacheGet("/api/now/table/incident?q=2"), undefined);
  assert.equal(cacheGet("/api/now/table/sys_user?q=1"), "outro");
  cacheClear();
});

test("cacheClear: limpa tudo", () => {
  cacheSet("a", 1);
  cacheSet("b", 2);
  cacheClear();
  assert.equal(cacheGet("a"), undefined);
  assert.equal(cacheGet("b"), undefined);
});

test("cache: LRU eviction quando atinge limite", () => {
  cacheClear();
  // Insere mais entradas do que o max (default 500)
  // Usamos TTL longo para evitar expiração
  for (let i = 0; i < 505; i++) {
    cacheSet(`lru-key-${i}`, `value-${i}`, 60000);
  }

  const stats = cacheStats();
  // Deve ter evictado entradas para caber no limite
  assert.ok(stats.size <= stats.max, `Cache size (${stats.size}) deve ser <= max (${stats.max})`);
  cacheClear();
});

test("cache: cacheStats retorna métricas corretas", () => {
  cacheClear();
  cacheSet("stat-1", "a");
  cacheSet("stat-2", "b");

  const stats = cacheStats();
  assert.equal(stats.size, 2);
  assert.equal(typeof stats.max, "number");
  assert.equal(typeof stats.ttl_ms, "number");
  assert.equal(stats.expired_pending, 0);
  cacheClear();
});
