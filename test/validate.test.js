import { test } from "node:test";
import assert from "node:assert/strict";
import { validateTableName, validateSysId, validateLimit, validateDataPayload, validateEncodedQuery } from "../src/lib/validate.js";

// ── validateTableName ─────────────────────────

test("validateTableName: aceita nomes válidos", () => {
  assert.doesNotThrow(() => validateTableName("incident"));
  assert.doesNotThrow(() => validateTableName("sys_user"));
  assert.doesNotThrow(() => validateTableName("u_minha_tabela_123"));
  assert.doesNotThrow(() => validateTableName("x_custom_app_table"));
});

test("validateTableName: rejeita path traversal", () => {
  assert.throws(() => validateTableName("incident/../sys_user"), /inválido/i);
  assert.throws(() => validateTableName("incident;DROP"), /inválido/i);
  assert.throws(() => validateTableName("incident table"), /inválido/i);
});

test("validateTableName: rejeita valor ausente", () => {
  assert.throws(() => validateTableName(""), /obrigatório/i);
  assert.throws(() => validateTableName(null), /obrigatório/i);
  assert.throws(() => validateTableName(undefined), /obrigatório/i);
});

test("validateTableName: rejeita nome muito longo", () => {
  assert.throws(() => validateTableName("a".repeat(81)), /longo/i);
});

// ── validateSysId ─────────────────────────────

test("validateSysId: aceita sys_ids válidos", () => {
  assert.doesNotThrow(() => validateSysId("1234567890abcdef1234567890abcdef"));
  assert.doesNotThrow(() => validateSysId("ABCDEF1234567890ABCDEF1234567890"));
  assert.doesNotThrow(() => validateSysId("12345678-90ab-cdef-1234-567890abcdef"));
});

test("validateSysId: rejeita sys_ids inválidos", () => {
  assert.throws(() => validateSysId("abc123"), /inválido/i);
  assert.throws(() => validateSysId(""), /obrigatório/i);
  assert.throws(() => validateSysId(null), /obrigatório/i);
});

// ── validateLimit ─────────────────────────────

test("validateLimit: retorna o número normalizado", () => {
  assert.equal(validateLimit(10), 10);
  assert.equal(validateLimit(1), 1);
  assert.equal(validateLimit(1000), 1000);
});

test("validateLimit: rejeita valores inválidos", () => {
  assert.throws(() => validateLimit(0), /inválido/i);
  assert.throws(() => validateLimit(-5), /inválido/i);
  assert.throws(() => validateLimit(1.5), /inválido/i);
  assert.throws(() => validateLimit("abc"), /inválido/i);
});

test("validateLimit: rejeita acima do máximo", () => {
  assert.throws(() => validateLimit(1001), /máximo/i);
});

// ── validateDataPayload ───────────────────────

test("validateDataPayload: aceita objetos válidos", () => {
  assert.doesNotThrow(() => validateDataPayload({ state: "1", priority: "2" }));
  assert.doesNotThrow(() => validateDataPayload({ name: "test", active: true }));
});

test("validateDataPayload: rejeita valores não-objeto", () => {
  assert.throws(() => validateDataPayload(null), /objeto JSON/i);
  assert.throws(() => validateDataPayload("string"), /objeto JSON/i);
  assert.throws(() => validateDataPayload([1, 2, 3]), /objeto JSON/i);
  assert.throws(() => validateDataPayload(42), /objeto JSON/i);
});

test("validateDataPayload: rejeita objeto vazio", () => {
  assert.throws(() => validateDataPayload({}), /vazio/i);
});

test("validateDataPayload: rejeita campos somente-leitura", () => {
  assert.throws(() => validateDataPayload({ sys_id: "abc", name: "test" }), /somente leitura/i);
  assert.throws(() => validateDataPayload({ sys_created_on: "2024-01-01" }), /somente leitura/i);
  assert.throws(() => validateDataPayload({ sys_updated_by: "admin" }), /somente leitura/i);
});

// ── validateEncodedQuery ──────────────────────

test("validateEncodedQuery: aceita queries válidas", () => {
  assert.equal(validateEncodedQuery("active=true^priority=1"), "active=true^priority=1");
  assert.equal(validateEncodedQuery(""), "");
  assert.equal(validateEncodedQuery(null), "");
  assert.equal(validateEncodedQuery(undefined), "");
});

test("validateEncodedQuery: rejeita tipo não-string", () => {
  assert.throws(() => validateEncodedQuery(123), /string/i);
  assert.throws(() => validateEncodedQuery({ q: 1 }), /string/i);
});

test("validateEncodedQuery: rejeita query muito longa", () => {
  assert.throws(() => validateEncodedQuery("a".repeat(4001)), /tamanho máximo/i);
});

test("validateEncodedQuery: rejeita null bytes", () => {
  assert.throws(() => validateEncodedQuery("active=true\0^priority=1"), /null byte/i);
});
