import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit } from "../lib/ratelimit.js";

test("ratelimit: permite chamadas dentro do limite", () => {
  // Usa um ambiente único por teste para evitar contaminação de estado
  for (let i = 0; i < 10; i++) {
    assert.doesNotThrow(() => checkRateLimit("test-allow", 10));
  }
});

test("ratelimit: bloqueia ao exceder o limite", () => {
  // Esgota o limite
  for (let i = 0; i < 5; i++) {
    checkRateLimit("test-block", 5);
  }
  assert.throws(() => checkRateLimit("test-block", 5), /rate limit/i);
});

test("ratelimit: ambientes distintos são isolados", () => {
  // Esgota apenas o ambiente A
  for (let i = 0; i < 3; i++) checkRateLimit("env-a-isolated", 3);
  assert.throws(() => checkRateLimit("env-a-isolated", 3), /rate limit/i);

  // Ambiente B não deve ser afetado
  assert.doesNotThrow(() => checkRateLimit("env-b-isolated", 3));
});

test("ratelimit: janela deslizante libera após 1s", async () => {
  for (let i = 0; i < 2; i++) checkRateLimit("test-window", 2);
  assert.throws(() => checkRateLimit("test-window", 2), /rate limit/i);

  await new Promise(r => setTimeout(r, 1100)); // espera a janela virar
  assert.doesNotThrow(() => checkRateLimit("test-window", 2));
});
