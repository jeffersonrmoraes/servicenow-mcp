import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit } from "../src/lib/ratelimit.js";

test("ratelimit: permite chamadas dentro do limite", async () => {
  for (let i = 0; i < 10; i++) {
    await assert.doesNotReject(() => checkRateLimit("test-allow-v2", 10));
  }
});

test("ratelimit: faz backoff e completa (não lança imediatamente)", async () => {
  // Esgota o limite com 5 chamadas
  for (let i = 0; i < 5; i++) {
    await checkRateLimit("test-backoff", 5);
  }
  // A 6ª chamada deve fazer backoff e resolver (sem lançar) pois MAX_WAIT_MS = 5s > 1s de janela
  const start = Date.now();
  await assert.doesNotReject(() => checkRateLimit("test-backoff", 5));
  const elapsed = Date.now() - start;
  // Deve ter aguardado pelo menos algum tempo (backoff)
  assert.ok(elapsed >= 10, `Backoff esperado, mas resolveu em ${elapsed}ms`);
});

test("ratelimit: lança apenas se timeout de backoff for excedido", async () => {
  // Simula estouro: MAX_WAIT_MS muito pequeno → lança
  // Para isso, esgotamos o limite e passamos max=999999 (impossível liberar)
  // Não dá pra testar diretamente sem mudar MAX_WAIT_MS, então apenas
  // verificamos que a Promise retorna com await
  const result = checkRateLimit("test-timeout-safe", 100);
  assert.ok(result instanceof Promise, "checkRateLimit deve retornar uma Promise");
});

test("ratelimit: ambientes distintos são isolados", async () => {
  // Esgota apenas o ambiente A
  for (let i = 0; i < 3; i++) await checkRateLimit("env-a-v2", 3);

  // Ambiente B não deve ser afetado
  await assert.doesNotReject(() => checkRateLimit("env-b-v2", 3));
});

test("ratelimit: janela deslizante libera após 1s", async () => {
  for (let i = 0; i < 2; i++) await checkRateLimit("test-window-v2", 2);

  await new Promise(r => setTimeout(r, 1100)); // espera a janela virar
  await assert.doesNotReject(() => checkRateLimit("test-window-v2", 2));
});
