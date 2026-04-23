#!/usr/bin/env npx tsx
/// <reference types="node" />
/**
 * Story: Solicitar Acesso a Sistema
 * Uso:
 *   npx tsx scripts/build-access-request.ts          → exibe plano, aguarda confirmação
 *   npx tsx scripts/build-access-request.ts --execute → executa sem pausa após plano
 *
 * Cria no PDI:
 *  - Update Set (rastreabilidade) — definido como current antes de qualquer artefato
 *  - Catalog Item + 3 variáveis + choices via sn_manage_catalog_choice (sc_choice)
 *  - 3 Business Rules (gestor, admin, sc_task)
 *  - 2 Notificações (rejeição + conclusão)
 */
import "dotenv/config";
import { createInterface } from "node:readline";

import { handleCatalogTool }    from "../src/tools/catalog.js";
import { handleMetadataTool }   from "../src/tools/metadata.js";
import { handleSecurityTool }   from "../src/tools/security.js";
import { handleDeployTool }     from "../src/tools/deploy.js";
import { handleGovernanceTool } from "../src/tools/governance.js";

const ENV     = "PDI";
const EXECUTE = process.argv.includes("--execute");

// ─────────────────────────────────────
//  Helpers de log
// ─────────────────────────────────────
function ok(msg: string)   { console.log(`   ✓ ${msg}`); }
function step(msg: string) { console.log(`\n${msg}`); }
function err(msg: string)  { console.error(`   ✗ ${msg}`); }

async function confirm(question: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question + " [s/N] ", (ans: string) => {
      rl.close();
      resolve(ans.toLowerCase() === "s" || ans.toLowerCase() === "sim");
    });
  });
}

// ─────────────────────────────────────
//  Main
// ─────────────────────────────────────
async function main() {
  console.log("=".repeat(55));
  console.log("  Story: Solicitar Acesso a Sistema");
  console.log("  Ambiente: PDI");
  console.log("=".repeat(55));

  // ── 0. Plano de execução — OBRIGATÓRIO antes de qualquer mutação ──
  step("0. Gerando plano de execução...");
  const plan = await handleGovernanceTool("sn_generate_execution_plan", {
    env:            ENV,
    operation_type: "create_script",
    description:    "Story: Solicitar Acesso a Sistema — Catalog Item + 3 variáveis + choices + 3 Business Rules + 2 Notificações no PDI",
    target_table:   "sc_cat_item",
    target_name:    "Solicitar Acesso a Sistema",
  }) as any;

  console.log("\n" + plan.report_markdown);

  if (!EXECUTE) {
    console.log("\n⚠️  Execute com --execute para prosseguir após revisar o plano acima.");
    const approved = await confirm("\nDeseja prosseguir com a implementação?");
    if (!approved) {
      console.log("   Operação cancelada pelo usuário.");
      process.exit(0);
    }
  }

  // ── 1. Update Set ─────────────────────────────
  step("1. Criando Update Set...");
  const us = await handleDeployTool("sn_create_update_set", {
    env:         ENV,
    name:        "Story - Solicitar Acesso a Sistema v1.0",
    description: "Catalog Item + Variaveis + Business Rules + Notificacoes para solicitacao de acesso a sistemas internos",
  });
  ok(`Update Set: ${us.name} (${us.sys_id})`);

  await handleDeployTool("sn_set_current_update_set", { env: ENV, sys_id: us.sys_id });
  ok("Update Set definido como atual");

  // ── 2. Catalog Item ───────────────────────────
  step("2. Criando Catalog Item...");
  const item = await handleCatalogTool("sn_manage_catalog_item", {
    env:               ENV,
    name:              "Solicitar Acesso a Sistema",
    short_description: "Solicite acesso a sistemas internos de forma rapida e rastreavel.",
    description:
      "<p>Use este formulario para solicitar acesso a sistemas internos da empresa.</p>" +
      "<p>Sua solicitacao sera encaminhada para aprovacao do seu gestor direto.</p>" +
      "<ul>" +
      "<li>Para acesso <strong>Admin</strong>, e necessaria aprovacao adicional da equipe de TI.</li>" +
      "<li>Preencha a justificativa com detalhes — solicitacoes sem justificativa serao rejeitadas.</li>" +
      "</ul>",
    active: true,
    order:  100,
  });
  ok(`Catalog Item criado: ${item.sys_id}`);

  // ── 3. Variáveis ──────────────────────────────
  step("3. Criando variaveis do formulario...");

  const varSistema = await handleCatalogTool("sn_manage_catalog_variable", {
    env:                 ENV,
    catalog_item_sys_id: item.sys_id,
    name:                "u_sistema_acesso",
    question_text:       "Sistema",
    type:                "6",   // Single Line Text
    mandatory:           true,
    order:               100,
    help_text:           "Informe o nome completo do sistema ao qual precisa de acesso.",
  });
  ok(`Variavel 'sistema' criada: ${varSistema.sys_id}`);

  const varTipo = await handleCatalogTool("sn_manage_catalog_variable", {
    env:                 ENV,
    catalog_item_sys_id: item.sys_id,
    name:                "u_tipo_acesso",
    question_text:       "Tipo de Acesso",
    type:                "5",   // Select Box
    mandatory:           true,
    order:               200,
    help_text:           "Atencao: acesso Admin requer aprovacao adicional da TI.",
  });
  ok(`Variavel 'tipo_acesso' criada: ${varTipo.sys_id}`);

  const varJustificativa = await handleCatalogTool("sn_manage_catalog_variable", {
    env:                 ENV,
    catalog_item_sys_id: item.sys_id,
    name:                "u_justificativa_acesso",
    question_text:       "Justificativa",
    type:                "2",   // Multi Line Text
    mandatory:           true,
    order:               300,
    help_text:           "Explique detalhadamente por que voce precisa deste acesso e como sera utilizado.",
  });
  ok(`Variavel 'justificativa' criada: ${varJustificativa.sys_id}`);

  // ── 4. Choices via question_choice ───────────────────────────────
  step("4. Criando choices para 'Tipo de Acesso'...");
  for (const c of [
    { label: "Leitura", value: "leitura", sequence: 100 },
    { label: "Escrita", value: "escrita", sequence: 200 },
    { label: "Admin",   value: "admin",   sequence: 300 },
  ]) {
    const ch = await handleCatalogTool("sn_manage_catalog_choice", {
      env:             ENV,
      action:          "add",
      variable_sys_id: varTipo.sys_id,
      label:           c.label,
      value:           c.value,
      sequence:        c.sequence,
    }) as any;
    ok(`Choice '${c.label}': ${ch.sys_id} (${ch.action})`);
  }

  // ── 5. BR: Gestor como aprovador ──────────────
  step("5. Business Rule: Rotear aprovacao para gestor...");
  const brGestor = await handleMetadataTool("sn_upsert_metadata_script", {
    env:    ENV,
    type:   "business_rule",
    name:   "Acesso Sistema - Definir Aprovador Gestor",
    table:  "sc_request",
    when:   "async",
    action: "insert",
    active: true,
    script: [
      "(function executeRule(current, previous) {",
      "  try {",
      "    var requester = new GlideRecord('sys_user');",
      "    if (!requester.get(current.requested_for)) {",
      "      gs.log('AcessoSistema: usuario solicitante nao encontrado', 'AcessoSistema');",
      "      return;",
      "    }",
      "    var managerId = requester.getValue('manager');",
      "    if (!managerId) {",
      "      gs.log('AcessoSistema: gestor nao configurado para ' + requester.user_name, 'AcessoSistema');",
      "      return;",
      "    }",
      "    // Localiza RITM deste catalog item",
      "    var ritm = new GlideRecord('sc_req_item');",
      "    ritm.addQuery('request', current.sys_id);",
      "    ritm.addQuery('cat_item.name', 'Solicitar Acesso a Sistema');",
      "    ritm.query();",
      "    while (ritm.next()) {",
      "      var appr = new GlideRecord('sysapproval_approver');",
      "      appr.initialize();",
      "      appr.document_id  = ritm.getUniqueValue();",
      "      appr.document     = 'sc_req_item';",
      "      appr.approver     = managerId;",
      "      appr.state        = 'requested';",
      "      appr.insert();",
      "      gs.log('AcessoSistema: aprovacao enviada ao gestor ' + managerId + ' para RITM ' + ritm.number, 'AcessoSistema');",
      "    }",
      "  } catch(e) {",
      "    gs.logError('AcessoSistema - BR Gestor: ' + e.message, 'AcessoSistema');",
      "  }",
      "})(current, previous);",
    ].join("\n"),
  });
  ok(`BR Gestor: ${brGestor.sys_id}`);

  // ── 6. BR: Aprovação adicional Admin ──────────
  step("6. Business Rule: Aprovacao adicional para acesso Admin...");
  const brAdmin = await handleMetadataTool("sn_upsert_metadata_script", {
    env:    ENV,
    type:   "business_rule",
    name:   "Acesso Sistema - Aprovacao Adicional Admin TI",
    table:  "sc_request",
    when:   "async",
    action: "insert",
    active: true,
    script: [
      "(function executeRule(current, previous) {",
      "  try {",
      "    var ritm = new GlideRecord('sc_req_item');",
      "    ritm.addQuery('request', current.sys_id);",
      "    ritm.addQuery('cat_item.name', 'Solicitar Acesso a Sistema');",
      "    ritm.query();",
      "    while (ritm.next()) {",
      "      var tipoAcesso = '' + ritm.variables.u_tipo_acesso;",
      "      if (tipoAcesso !== 'admin') continue;",
      "      // Busca grupo IT para aprovacao adicional",
      "      var grp = new GlideRecord('sys_user_group');",
      "      grp.addQuery('name', 'CONTAINS', 'IT');",
      "      grp.setLimit(1);",
      "      grp.query();",
      "      if (!grp.next()) {",
      "        gs.log('AcessoSistema Admin: grupo IT nao encontrado', 'AcessoSistema');",
      "        continue;",
      "      }",
      "      var aprovadorTI = grp.getValue('manager');",
      "      if (!aprovadorTI) {",
      "        gs.log('AcessoSistema Admin: grupo IT sem manager, usando membro', 'AcessoSistema');",
      "        continue;",
      "      }",
      "      var appr = new GlideRecord('sysapproval_approver');",
      "      appr.initialize();",
      "      appr.document_id  = ritm.getUniqueValue();",
      "      appr.document     = 'sc_req_item';",
      "      appr.approver     = aprovadorTI;",
      "      appr.state        = 'requested';",
      "      appr.insert();",
      "      gs.log('AcessoSistema Admin: aprovacao adicional enviada para TI ' + aprovadorTI, 'AcessoSistema');",
      "    }",
      "  } catch(e) {",
      "    gs.logError('AcessoSistema - BR Admin: ' + e.message, 'AcessoSistema');",
      "  }",
      "})(current, previous);",
    ].join("\n"),
  });
  ok(`BR Admin: ${brAdmin.sys_id}`);

  // ── 7. BR: Criar SC Task após aprovação ───────
  step("7. Business Rule: Criar SC Task apos aprovacao...");
  const brTask = await handleMetadataTool("sn_upsert_metadata_script", {
    env:    ENV,
    type:   "business_rule",
    name:   "Acesso Sistema - Criar Tarefa TI Apos Aprovacao",
    table:  "sc_req_item",
    when:   "after",
    action: "update",
    active: true,
    script: [
      "(function executeRule(current, previous) {",
      "  // Executa somente quando o RITM deste catalog item e aprovado",
      "  if (current.cat_item.name + '' !== 'Solicitar Acesso a Sistema') return;",
      "  if (current.approval_state + '' !== 'approved') return;",
      "  if (previous.approval_state + '' === 'approved') return;",
      "  try {",
      "    var task = new GlideRecord('sc_task');",
      "    task.initialize();",
      "    task.request_item      = current.getUniqueValue();",
      "    task.short_description = 'Provisionar acesso: ' +",
      "      current.variables.u_sistema_acesso + ' (' + current.variables.u_tipo_acesso + ')';",
      "    task.description       =",
      "      'Solicitante: ' + current.request.requested_for.getDisplayValue() + '\\n' +",
      "      'Sistema: '     + current.variables.u_sistema_acesso + '\\n' +",
      "      'Tipo de Acesso: ' + current.variables.u_tipo_acesso + '\\n' +",
      "      'Justificativa: '  + current.variables.u_justificativa_acesso;",
      "    task.assignment_group  = current.assignment_group;",
      "    task.state             = 1; // Open",
      "    var taskId = task.insert();",
      "    gs.log('AcessoSistema: SC Task criada ' + taskId + ' para RITM ' + current.number, 'AcessoSistema');",
      "  } catch(e) {",
      "    gs.logError('AcessoSistema - BR SCTask: ' + e.message, 'AcessoSistema');",
      "  }",
      "})(current, previous);",
    ].join("\n"),
  });
  ok(`BR SC Task: ${brTask.sys_id}`);

  // ── 8. Notificações ───────────────────────────
  step("8. Criando notificacoes de email...");

  // Rejection — sc_request state=4
  const notifRej = await handleSecurityTool("sn_manage_notification", {
    env:    ENV,
    action: "upsert",
    name:   "Acesso Sistema - Solicitacao Rejeitada",
    table:  "sc_request",
    condition: "current.state == 4",
    subject: "[ServiceNow] Solicitacao de Acesso Rejeitada - ${request_item.variables.u_sistema_acesso}",
    body_html:
      "<p>Prezado(a),</p>" +
      "<p>Sua solicitacao de acesso ao sistema foi <strong>REJEITADA</strong>.</p>" +
      "<table border='0' cellpadding='5'>" +
      "<tr><td><b>Numero:</b></td><td>${number}</td></tr>" +
      "<tr><td><b>Sistema:</b></td><td>${request_item.variables.u_sistema_acesso}</td></tr>" +
      "<tr><td><b>Tipo de Acesso:</b></td><td>${request_item.variables.u_tipo_acesso}</td></tr>" +
      "<tr><td><b>Estado:</b></td><td>Rejeitada</td></tr>" +
      "</table>" +
      "<p>Para questionar a decisao, entre em contato com seu gestor direto ou abra um incidente no Portal de TI.</p>" +
      "<p>Atenciosamente,<br/>Equipe de TI</p>",
    active: true,
  });
  ok(`Notificacao 'Rejeitada': ${notifRej.sys_id}`);

  // Completion — sc_request state=3
  const notifOk = await handleSecurityTool("sn_manage_notification", {
    env:    ENV,
    action: "upsert",
    name:   "Acesso Sistema - Acesso Provisionado",
    table:  "sc_request",
    condition: "current.state == 3",
    subject: "[ServiceNow] Acesso Provisionado com Sucesso - ${request_item.variables.u_sistema_acesso}",
    body_html:
      "<p>Prezado(a),</p>" +
      "<p>Sua solicitacao de acesso foi <strong>APROVADA E CONCLUIDA</strong>.</p>" +
      "<table border='0' cellpadding='5'>" +
      "<tr><td><b>Numero:</b></td><td>${number}</td></tr>" +
      "<tr><td><b>Sistema:</b></td><td>${request_item.variables.u_sistema_acesso}</td></tr>" +
      "<tr><td><b>Tipo de Acesso:</b></td><td>${request_item.variables.u_tipo_acesso}</td></tr>" +
      "</table>" +
      "<p>Seu acesso foi provisionado. Caso nao consiga acessar o sistema, abra um incidente no Portal de TI informando o numero desta solicitacao.</p>" +
      "<p>Atenciosamente,<br/>Equipe de TI</p>",
    active: true,
  });
  ok(`Notificacao 'Provisionado': ${notifOk.sys_id}`);

  // ── Resumo ────────────────────────────────────
  console.log("\n" + "=".repeat(55));
  console.log("  STORY IMPLEMENTADA COM SUCESSO");
  console.log("=".repeat(55));
  console.log("\nArtefatos criados no PDI:\n");
  console.log(`  Update Set:          ${us.sys_id}`);
  console.log(`  Catalog Item:        ${item.sys_id}`);
  console.log(`  Var sistema:         ${varSistema.sys_id}`);
  console.log(`  Var tipo_acesso:     ${varTipo.sys_id}`);
  console.log(`  Var justificativa:   ${varJustificativa.sys_id}`);
  console.log(`  BR Gestor:           ${brGestor.sys_id}`);
  console.log(`  BR Admin TI:         ${brAdmin.sys_id}`);
  console.log(`  BR SC Task:          ${brTask.sys_id}`);
  console.log(`  Notif Rejeitada:     ${notifRej.sys_id}`);
  console.log(`  Notif Provisionado:  ${notifOk.sys_id}`);
  console.log("\nProximos passos no PDI:");
  console.log("  1. Service Catalog > Solicitar Acesso a Sistema");
  console.log("     Verificar formulario com 3 campos e choices do tipo_acesso");
  console.log("  2. Testar submit de solicitacao como usuario com gestor configurado");
  console.log("  3. Aprovar como gestor e validar criacao da SC Task");
  console.log("  4. Rejeitar e validar email de notificacao");
  console.log("  5. Fechar como concluido e validar email de confirmacao");
  console.log(`  6. Update Set: dev384019.service-now.com/sys_update_set.do?sys_id=${us.sys_id}\n`);
}

main().catch(e => {
  err(`Falha na execucao: ${e.message}`);
  if (e.stack) console.error(e.stack);
  process.exit(1);
});
