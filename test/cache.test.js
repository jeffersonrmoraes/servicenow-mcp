import { test } from "node:test";
import assert from "node:assert/strict";
import { cacheGet, cacheSet, cacheInvalidate, cacheClear } from "../src/lib/cache.js";

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
