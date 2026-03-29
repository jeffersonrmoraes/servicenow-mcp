#!/usr/bin/env node
/**
 * harvest.js — ServiceNow MCP Knowledge Harvester (Consolidado)
 *
 * Uso: node harvest.js [modo] [--env ENV]
 *
 * Modos disponíveis:
 *   main     — Tabelas essenciais (task, incident, sys_user, ...)
 *   catalog  — Knowledge Management e Service Catalog
 *   portal   — Service Portal (sp_*) e Employee Center (sn_ex_sp_*)
 *   flow     — Flow Designer (sys_hub_*, sys_flow_*, sys_ux_*)
 *   sys      — Todas as tabelas sys_* (até 500)
 *   enrich   — Enriquecimento completo: ITSM, CMDB, HR, CSM, FSM, GRC, ...
 *   all      — Executa todos os modos em sequência
 *
 * Variáveis de ambiente:
 *   HARVEST_ENV — Prefixo do ambiente (padrão: "PDI")
 */
import { handleKnowledgeTool } from './tools/knowledge.js';
import { snGet } from './lib/client.js';
import 'dotenv/config';

// ─── Configuração ────────────────────────────────────────

const envFlag = process.argv.indexOf('--env');
const env = envFlag !== -1 ? process.argv[envFlag + 1] : (process.env.HARVEST_ENV || 'PDI');

const CHUNK_SIZE = 8;
const THROTTLE_MS = 500;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Funções utilitárias ─────────────────────────────────

async function harvestList(label, tables, category) {
  console.log(`\n=== ${label} (${tables.length} tabelas) ===`);
  for (const t of tables) {
    process.stdout.write(`  [+] ${t}... `);
    try {
      await handleKnowledgeTool('sn_sync_knowledge_base', { env, category, table_pattern: t, limit: 1 });
      console.log('OK');
    } catch (e) {
      console.log(`ERRO: ${e.message}`);
    }
  }
}

async function harvestByQuery(label, query, category) {
  console.log(`\n=== ${label} ===`);
  const { result: tables } = await snGet('/api/now/table/sys_db_object', {
    sysparm_query: `${query}^ORDERBYname`,
    sysparm_fields: 'name',
    sysparm_limit: 500,
  }, env);

  const filtered = tables.filter(t => !/\d{4}$/.test(t.name));
  console.log(`  ${filtered.length} tabelas encontradas`);

  for (let i = 0; i < filtered.length; i += CHUNK_SIZE) {
    const chunk = filtered.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(async (t) => {
      process.stdout.write(`  [+] ${t.name}... `);
      try {
        await handleKnowledgeTool('sn_sync_knowledge_base', { env, category, table_pattern: t.name, limit: 1 });
        console.log('OK');
      } catch (e) {
        console.log(`ERRO: ${e.message}`);
      }
    }));
    await sleep(THROTTLE_MS);
  }
}

// ─── Modos de harvest ────────────────────────────────────

async function runMain() {
  await harvestList('Tabelas Principais', [
    'task', 'incident', 'change_request', 'problem',
  ], 'CORE');
  await harvestList('Usuários e Grupos', [
    'sys_user', 'sys_user_group',
  ], 'SYSTEM');
}

async function runCatalog() {
  await harvestList('Knowledge Management', [
    'kb_knowledge', 'kb_knowledge_base', 'kb_category', 'kb_article_template',
    'kb_article_template_definition', 'kb_feedback', 'kb_version',
  ], 'CORE');
  await harvestList('Service Catalog', [
    'sc_cat_item', 'sc_category', 'sc_catalog', 'sc_req_item', 'sc_task',
    'sc_cart', 'sc_cat_item_producer', 'sc_cat_item_guide', 'sc_cat_item_category',
    'sc_item_option_mtom', 'sc_multi_row_question_answer',
    'sn_ex_sp_topic', 'sn_ex_sp_topic_metric',
  ], 'CORE');
}

async function runPortal() {
  await harvestByQuery('Service Portal (sp_*)', 'nameSTARTSWITHsp_', 'CORE');
  await harvestByQuery('Employee Center (sn_ex_sp_*)', 'nameSTARTSWITHsn_ex_sp_', 'CORE');
}

async function runFlow() {
  await harvestByQuery('Flow Designer - Hub (sys_hub_*)', 'nameSTARTSWITHsys_hub_', 'SYSTEM');
  await harvestByQuery('Flow Designer - Core (sys_flow_*)', 'nameSTARTSWITHsys_flow_', 'SYSTEM');
  await harvestByQuery('Now Experience / UI Builder (sys_ux_*)', 'nameSTARTSWITHsys_ux_', 'SYSTEM');
}

async function runSys() {
  await harvestByQuery('System Tables (sys_*)', 'nameSTARTSWITHsys_', 'SYSTEM');
}

async function runEnrich() {
  console.log('=== ServiceNow MCP Knowledge Enrichment ===\n');

  await harvestList('ITSM Extended', [
    'sc_request', 'sysapproval_approver', 'sysapproval_group', 'sys_journal',
    'sys_journal_field', 'sys_attachment', 'sys_email', 'sysevent',
    'sys_trigger', 'wf_workflow', 'wf_workflow_version', 'wf_activity', 'wf_executing',
  ], 'CORE');

  await harvestList('CMDB Core', [
    'cmdb', 'cmdb_ci', 'cmdb_rel_ci', 'cmdb_rel_type', 'cmdb_ci_computer',
    'cmdb_ci_server', 'cmdb_ci_app_server', 'cmdb_ci_database', 'cmdb_ci_service',
    'cmdb_ci_business_app', 'cmdb_ci_network_adapter', 'cmdb_ci_ip_address', 'cmdb_health_log',
  ], 'CORE');

  await harvestList('HR Service Delivery', [
    'sn_hr_core_case', 'sn_hr_core_task', 'sn_hr_core_document', 'sn_hr_core_service',
    'sn_hr_core_service_category', 'sn_hr_core_profile', 'sn_hr_le_case',
  ], 'CORE');

  await harvestList('Customer Service (CSM)', [
    'sn_customerservice_case', 'sn_customerservice_task', 'sn_customerservice_account',
    'sn_customerservice_contact', 'sn_customerservice_product',
    'customer_account', 'customer_contact',
  ], 'CORE');

  await harvestList('Field Service Management (FSM)', [
    'fsm_work_order', 'fsm_work_order_task', 'fsm_agent', 'fsm_agent_availability',
    'fsm_agent_location', 'fsm_skill', 'fsm_territory',
  ], 'CORE');

  await harvestList('IT Operations (ITOM)', [
    'em_event', 'em_alert', 'em_alert_rule', 'sn_em_connector_event',
    'discovery_log', 'discovery_device', 'discovery_scan_range',
  ], 'CORE');

  await harvestList('GRC / Risk / Compliance', [
    'sn_risk_risk', 'sn_compliance_policy', 'sn_compliance_control',
    'sn_audit_audit', 'sn_audit_finding',
  ], 'CORE');

  await harvestList('Agile / SPM', [
    'rm_story', 'rm_epic', 'rm_sprint', 'rm_release', 'rm_program',
    'rm_portfolio', 'pm_project', 'pm_project_task',
  ], 'CORE');

  await harvestList('Scripting / Development Metadata', [
    'sys_script', 'sys_script_include', 'sys_client_script', 'sys_ui_action',
    'sys_ui_policy', 'sys_ui_script', 'sys_ui_page', 'sys_update_set',
    'sys_update_xml', 'sys_remote_update_set', 'sys_app_application',
    'sys_scope', 'sys_metadata', 'sys_dictionary_override', 'sys_documentation',
  ], 'SYSTEM');

  await harvestList('Flow Designer', [
    'sys_hub_flow', 'sys_hub_subflow', 'sys_hub_action_type_definition',
    'sys_hub_step', 'sys_hub_trigger_type', 'sys_flow_context', 'sys_flow_log',
  ], 'SYSTEM');

  await harvestList('Notifications / Communication', [
    'sysevent_email_action', 'sys_notification', 'sys_notification_filter',
    'sysrule_notification', 'sys_sms_log', 'sys_email_log',
  ], 'SYSTEM');

  await harvestByQuery('CUSTOM: Tabelas u_*', 'nameSTARTSWITHu_', 'CUSTOM');

  console.log('\n=== Enriquecimento Finalizado! ===');
}

async function runAll() {
  await runMain();
  await runCatalog();
  await runPortal();
  await runFlow();
  await runSys();
  await runEnrich();
}

// ─── CLI dispatch ────────────────────────────────────────

const MODES = {
  main:    runMain,
  catalog: runCatalog,
  portal:  runPortal,
  flow:    runFlow,
  sys:     runSys,
  enrich:  runEnrich,
  all:     runAll,
};

const rawArgs = process.argv.slice(2).filter(a => !a.startsWith('--'));
const mode = rawArgs[0] || 'main';

if (!MODES[mode]) {
  console.error(`Modo inválido: "${mode}"\nModos disponíveis: ${Object.keys(MODES).join(', ')}`);
  process.exit(1);
}

console.log(`\n=== Harvest Mode: ${mode.toUpperCase()} | Env: ${env} ===`);
MODES[mode]().catch(console.error);
