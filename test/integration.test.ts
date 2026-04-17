/**
 * Testes de Integração — ServiceNow MCP v4.2.0
 * Executa contra a instância real configurada no .env
 *
 * Uso:
 *   SN_TEST_ENV=DEV npx tsx --test test/integration.test.js
 *   SN_TEST_ENV=PDI npx tsx --test test/integration.test.js
 */

import "dotenv/config";
import { test } from "node:test";
import assert from "node:assert/strict";

// ── Handlers dos tools ────────────────────────
import { handleCrudTool }         from "../src/tools/crud.js";
import { handleFlowTool }         from "../src/tools/flow.js";
import { handleDeployTool }       from "../src/tools/deploy.js";
import { handleSecurityTool }     from "../src/tools/security.js";
import { handlePropertyTool }     from "../src/tools/properties.js";
import { handleAttachmentTool }   from "../src/tools/attachments.js";
import { handleKnowledgeTool }    from "../src/tools/knowledge.js";
import { handleRelationshipTool } from "../src/tools/relationships.js";
import { handleExtraTool }        from "../src/tools/extras.js";
import { handleEnvTool }          from "../src/tools/envs.js";

const ENV = process.env.SN_TEST_ENV || "DEV";
console.log(`\n🔌 Rodando integração contra ambiente: ${ENV}\n`);

// ─────────────────────────────────────────────
//  GRUPO 1 — Conectividade
// ─────────────────────────────────────────────

test("[conectividade] sn_health_check retorna status connected", async () => {
  const r = await handleExtraTool("sn_health_check", { env: ENV });
  assert.equal(r.status, "connected", `Status inesperado: ${JSON.stringify(r)}`);
  assert.ok(r.instance,    "instance deve estar preenchido");
  assert.ok(r.user,        "user deve estar preenchido");
  assert.ok(r.latency_ms >= 0, "latency_ms deve ser número positivo");
  console.log(`    ✓ instância: ${r.instance} | usuário: ${r.user} | versão: ${r.version} | latência: ${r.latency_ms}ms`);
});

test("[conectividade] sn_list_envs lista ambientes configurados", async () => {
  const r = await handleEnvTool("sn_list_envs", {});
  assert.ok(r.count >= 1,    "Deve haver ao menos 1 ambiente configurado");
  assert.ok(Array.isArray(r.environments), "environments deve ser array");
  const envNames = r.environments.map(e => e.prefix);
  console.log(`    ✓ ambientes: ${envNames.join(", ")}`);
});

// ─────────────────────────────────────────────
//  GRUPO 2 — Leitura de registros (Core CRUD)
// ─────────────────────────────────────────────

test("[crud] sn_query_records retorna lista de sys_user", async () => {
  const r = await handleCrudTool("sn_query_records", {
    env:    ENV,
    table:  "sys_user",
    query:  "active=true",
    fields: "user_name,name,email",
    limit:  5,
  });
  assert.ok(Array.isArray(r.result),  "result deve ser array");
  assert.ok(r.result.length > 0,       "Deve retornar ao menos 1 usuário");
  assert.ok(r.result[0].user_name,     "Registro deve ter user_name");
  console.log(`    ✓ ${r.result.length} usuários retornados`);
});

test("[crud] sn_query_records retorna lista de incidents", async () => {
  const r = await handleCrudTool("sn_query_records", {
    env:    ENV,
    table:  "incident",
    fields: "number,short_description,state",
    limit:  3,
  });
  assert.ok(Array.isArray(r.result), "result deve ser array");
  console.log(`    ✓ ${r.result.length} incidents encontrados`);
});

test("[crud] sn_get_record busca usuário admin pelo sys_id", async () => {
  // Primeiro busca o sys_id do admin
  const list = await handleCrudTool("sn_query_records", {
    env:    ENV,
    table:  "sys_user",
    query:  "user_name=admin",
    fields: "sys_id,user_name,name",
    limit:  1,
  });
  assert.ok(list.result.length > 0, "Usuário admin deve existir");
  const sys_id = list.result[0].sys_id;

  // Agora busca pelo sys_id
  const r = await handleCrudTool("sn_get_record", {
    env:    ENV,
    table:  "sys_user",
    sys_id,
  });
  assert.ok(r.user_name, "Record deve ter user_name");
  console.log(`    ✓ admin encontrado: ${r.name} (${sys_id})`);
});

test("[crud] sn_query_all pagina corretamente", async () => {
  const r = await handleCrudTool("sn_query_all", {
    env:       ENV,
    table:     "sys_user",
    query:     "active=true",
    fields:    "sys_id",
    page_size: 5,
    max_pages:  2,
  });
  assert.ok(r.meta.total_fetched > 0, "Deve buscar registros");
  assert.ok(r.meta.pages_read >= 1,   "Deve ler ao menos 1 página");
  console.log(`    ✓ ${r.meta.total_fetched} registros em ${r.meta.pages_read} página(s) | has_more: ${r.meta.has_more}`);
});

// ─────────────────────────────────────────────
//  GRUPO 3 — Validações (devem rejeitar inputs ruins)
// ─────────────────────────────────────────────

test("[validacao] sn_query_records rejeita tabela inválida", async () => {
  await assert.rejects(
    () => handleCrudTool("sn_query_records", { env: ENV, table: "../../etc/passwd" }),
    /inválido/i,
  );
});

test("[validacao] sn_get_record rejeita sys_id inválido", async () => {
  await assert.rejects(
    () => handleCrudTool("sn_get_record", { env: ENV, table: "incident", sys_id: "nao-e-um-sysid" }),
    /sysid|inválido/i,
  );
});

test("[validacao] sn_create_record rejeita payload vazio", async () => {
  await assert.rejects(
    () => handleCrudTool("sn_create_record", { env: ENV, table: "incident", data: {} }),
    /vazio/i,
  );
});

test("[validacao] sn_create_record rejeita campos somente-leitura", async () => {
  await assert.rejects(
    () => handleCrudTool("sn_create_record", { env: ENV, table: "incident", data: { sys_id: "abc" } }),
    /somente leitura/i,
  );
});

test("[validacao] sn_export_records rejeita query com null byte", async () => {
  await assert.rejects(
    () => handleExtraTool("sn_export_records", { env: ENV, table: "incident", query: "active=true\0^number=INC001" }),
    /null byte/i,
  );
});

// ─────────────────────────────────────────────
//  GRUPO 4 — System Properties
// ─────────────────────────────────────────────

test("[properties] sn_get_sys_property lê glide.instance.name", async () => {
  const r = await handlePropertyTool("sn_get_sys_property", { env: ENV, name: "glide.instance.name" });
  assert.ok(r || r === null, "Deve retornar valor ou null");
  console.log(`    ✓ glide.instance.name = ${r?.value || "(não encontrada)"}`);
});

test("[properties] sn_list_sys_properties lista propriedades glide.email", async () => {
  const r = await handlePropertyTool("sn_list_sys_properties", {
    env:    ENV,
    prefix: "glide.email",
    limit:  5,
  });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} properties com prefixo glide.email`);
});

// ─────────────────────────────────────────────
//  GRUPO 5 — Deploy (Update Sets)
// ─────────────────────────────────────────────

test("[deploy] sn_list_update_sets retorna lista", async () => {
  const r = await handleDeployTool("sn_list_update_sets", { env: ENV, limit: 5 });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} update sets encontrados`);
});

// ─────────────────────────────────────────────
//  GRUPO 6 — Security
// ─────────────────────────────────────────────

test("[security] sn_manage_acl list retorna ACLs da tabela incident", async () => {
  const r = await handleSecurityTool("sn_manage_acl", {
    env:    ENV,
    action: "list",
    table:  "incident",
    limit:  5,
  });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} ACLs encontradas para incident`);
});

test("[security] sn_manage_acl delete está desabilitado", async () => {
  await assert.rejects(
    () => handleSecurityTool("sn_manage_acl", { env: ENV, action: "delete", sys_id: "fake" }),
    /desabilitada|segurança/i,
  );
});

// ─────────────────────────────────────────────
//  GRUPO 7 — Flows
// ─────────────────────────────────────────────

test("[flow] sn_get_flow busca flows existentes", async () => {
  const r = await handleFlowTool("sn_get_flow", { env: ENV, name: "" });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} flows encontrados`);
});

// ─────────────────────────────────────────────
//  GRUPO 8 — Relacionamentos
// ─────────────────────────────────────────────

test("[relationships] sn_get_dependencies retorna dependências de incident", async () => {
  const r = await handleRelationshipTool("sn_get_dependencies", { env: ENV, table: "incident" });
  assert.equal(r.table, "incident");
  assert.ok(Array.isArray(r.outbound_dependencies), "Deve retornar array");
  console.log(`    ✓ ${r.outbound_dependencies.length} dependências outbound de incident`);
});

test("[relationships] sn_analyze_impact retorna impacto sobre sys_user", async () => {
  const r = await handleRelationshipTool("sn_analyze_impact", { env: ENV, table: "sys_user" });
  assert.equal(r.table, "sys_user");
  assert.ok(Array.isArray(r.inbound_references), "Deve retornar array");
  console.log(`    ✓ ${r.inbound_references.length} tabelas referenciam sys_user`);
});

// ─────────────────────────────────────────────
//  GRUPO 9 — Extras (novas ferramentas v4.2)
// ─────────────────────────────────────────────

test("[extras] sn_manage_choice list retorna opções de incident.state", async () => {
  const r = await handleExtraTool("sn_manage_choice", {
    env:    ENV,
    action: "list",
    table:  "incident",
    field:  "state",
  });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} opções para incident.state`);
});

test("[extras] sn_export_records exporta incidents em JSON", async () => {
  const r = await handleExtraTool("sn_export_records", {
    env:    ENV,
    table:  "incident",
    fields: "number,short_description,state",
    limit:  3,
    format: "json",
  });
  assert.equal(r.format, "json");
  assert.ok(r.count >= 0, "count deve ser número");
  assert.ok(Array.isArray(r.data), "data deve ser array");
  console.log(`    ✓ ${r.count} incidents exportados (JSON)`);
});

test("[extras] sn_export_records exporta incidents em CSV", async () => {
  const r = await handleExtraTool("sn_export_records", {
    env:    ENV,
    table:  "incident",
    fields: "number,state",
    limit:  3,
    format: "csv",
  });
  assert.equal(r.format, "csv");
  assert.ok(typeof r.data === "string", "data deve ser string");
  if (r.count > 0) {
    assert.ok(r.data.includes("number"), "CSV deve ter header 'number'");
  }
  console.log(`    ✓ ${r.count} incidents exportados (CSV)`);
});

test("[extras] sn_manage_email_template list retorna templates", async () => {
  const r = await handleExtraTool("sn_manage_email_template", {
    env:    ENV,
    action: "list",
    limit:  5,
  });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} email templates encontrados`);
});

// ─────────────────────────────────────────────
//  GRUPO 10 — Attachments
// ─────────────────────────────────────────────

test("[attachments] sn_list_attachments funciona para registro existente", async () => {
  // Busca primeiro um incident qualquer
  const list = await handleCrudTool("sn_query_records", {
    env:    ENV,
    table:  "incident",
    fields: "sys_id,number",
    limit:  1,
  });

  if (list.result.length === 0) {
    console.log("    ⚠ Nenhum incident encontrado, pulando teste de attachments");
    return;
  }

  const { sys_id, number } = list.result[0];
  const r = await handleAttachmentTool("sn_list_attachments", {
    env:          ENV,
    table_name:   "incident",
    table_sys_id: sys_id,
  });
  assert.ok(Array.isArray(r), "Deve retornar array");
  console.log(`    ✓ ${r.length} anexos no incident ${number}`);
});
