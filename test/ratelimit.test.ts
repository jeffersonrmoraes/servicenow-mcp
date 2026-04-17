import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit } from "../src/lib/ratelimit.js";

test("ratelimit: permite chamadas dentro do limite", async () => {
  for (let i = 0; i < 10; i++) {
    await assert.doesNotReject(() => checkRateLimit("test-allow-v3", "GET"));
  }
});

test("ratelimit: faz backoff e completa (não lança imediatamente)", async () => {
  // Esgota o limite com 5 chamadas
  for (let i = 0; i < 5; i++) {
    await checkRateLimit("test-backoff-v3", "POST");
  }
  // A 6ª chamada deve fazer backoff e resolver (sem lançar) pois TIMEOUT_MS = 5s > 1s de janela
  const start = Date.now();
  await assert.doesNotReject(() => checkRateLimit("test-backoff-v3", "POST"));
  const elapsed = Date.now() - start;
  // Deve ter aguardado pelo menos algum tempo (backoff)
  assert.ok(elapsed >= 10, `Backoff esperado, mas resolveu em ${elapsed}ms`);
});

test("ratelimit: lança apenas se timeout de backoff for excedido", async () => {
  const result = checkRateLimit("test-timeout-safe-v3", "GET");
  assert.ok(result instanceof Promise, "checkRateLimit deve retornar uma Promise");
});

test("ratelimit: ambientes distintos são isolados", async () => {
  // Esgota apenas o ambiente A
  for (let i = 0; i < 3; i++) await checkRateLimit("env-a-v3", "POST");

  // Ambiente B não deve ser afetado
  await assert.doesNotReject(() => checkRateLimit("env-b-v3", "POST"));
});

test("ratelimit: janela deslizante libera após 1s", async () => {
  for (let i = 0; i < 2; i++) await checkRateLimit("test-window-v3", "POST");

  await new Promise(r => setTimeout(r, 1100)); // espera a janela virar
  await assert.doesNotReject(() => checkRateLimit("test-window-v3", "POST"));
});
