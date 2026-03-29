import { handleKnowledgeTool } from './tools/knowledge.js';
import { snGet } from './lib/client.js';
import 'dotenv/config';

const env = "PDI";

async function harvestList(label, tables, category) {
    console.log(`\n=== ${label} (${tables.length} tabelas) ===`);
    for (const t of tables) {
        process.stdout.write(`  [+] ${t}... `);
        try {
            await handleKnowledgeTool("sn_sync_knowledge_base", { env, category, table_pattern: t, limit: 1 });
            console.log("OK");
        } catch (e) {
            console.log(`ERRO: ${e.message}`);
        }
    }
}

async function harvestCustomDynamic() {
    console.log(`\n=== CUSTOM: Descoberta dinâmica de tabelas u_* ===`);
    const { result: tables } = await snGet("/api/now/table/sys_db_object", {
        sysparm_query: "nameSTARTSWITHu_^ORDERBYname",
        sysparm_fields: "name",
        sysparm_limit: 200
    }, env);

    const filtered = tables.filter(t => !/\d{4}$/.test(t.name));
    console.log(`  Encontradas ${filtered.length} tabelas customizadas u_*`);

    const chunkSize = 5;
    for (let i = 0; i < filtered.length; i += chunkSize) {
        const chunk = filtered.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (t) => {
            process.stdout.write(`  [+] ${t.name}... `);
            try {
                await handleKnowledgeTool("sn_sync_knowledge_base", {
                    env, category: "CUSTOM", table_pattern: t.name, limit: 1
                });
                console.log("OK");
            } catch (e) {
                console.log(`ERRO: ${e.message}`);
            }
        }));
        await new Promise(r => setTimeout(r, 500));
    }
}

async function run() {
    console.log("=== ServiceNow MCP Knowledge Enrichment ===\n");

    // ITSM - Aprovações, Journais, Tarefas
    await harvestList("ITSM Extended", [
        'sc_request',           // Service Request (pai do sc_req_item)
        'sysapproval_approver', // Aprovações individuais
        'sysapproval_group',    // Aprovações de grupo
        'sys_journal',          // Notas/Work notes
        'sys_journal_field',    // Campos de journal
        'sys_attachment',       // Anexos
        'sys_email',            // E-mails
        'sysevent',             // Eventos
        'sys_trigger',          // Triggers
        'wf_workflow',          // Workflows
        'wf_workflow_version',  // Versões de workflow
        'wf_activity',          // Atividades de workflow
        'wf_executing',         // Execuções de workflow
    ], "CORE");

    // CMDB - Configuration Management
    await harvestList("CMDB Core", [
        'cmdb',                 // Base CMDB
        'cmdb_ci',              // Configuration Item
        'cmdb_rel_ci',          // CI Relationships
        'cmdb_rel_type',        // Tipos de relacionamento
        'cmdb_ci_computer',     // Computadores
        'cmdb_ci_server',       // Servidores
        'cmdb_ci_app_server',   // App Servers
        'cmdb_ci_database',     // Bancos de dados
        'cmdb_ci_service',      // Serviços de negócio
        'cmdb_ci_business_app', // Aplicações de negócio
        'cmdb_ci_network_adapter', // Adaptadores de rede
        'cmdb_ci_ip_address',   // Endereços IP
        'cmdb_health_log',      // Saúde do CMDB
    ], "CORE");

    // HR Service Delivery
    await harvestList("HR Service Delivery", [
        'sn_hr_core_case',          // Casos HR
        'sn_hr_core_task',          // Tarefas HR
        'sn_hr_core_document',      // Documentos HR
        'sn_hr_core_service',       // Serviços HR
        'sn_hr_core_service_category', // Categorias de serviço HR
        'sn_hr_core_profile',       // Perfis HR
        'sn_hr_le_case',            // Life Events
    ], "CORE");

    // Customer Service Management
    await harvestList("Customer Service (CSM)", [
        'sn_customerservice_case',      // Casos CSM
        'sn_customerservice_task',      // Tarefas CSM
        'sn_customerservice_account',   // Contas
        'sn_customerservice_contact',   // Contatos
        'sn_customerservice_product',   // Produtos
        'customer_account',             // Customer Account
        'customer_contact',             // Customer Contact
    ], "CORE");

    // Field Service Management
    await harvestList("Field Service Management (FSM)", [
        'fsm_work_order',           // Ordens de trabalho
        'fsm_work_order_task',      // Tarefas de ordem
        'fsm_agent',                // Agentes de campo
        'fsm_agent_availability',   // Disponibilidade
        'fsm_agent_location',       // Localização de agentes
        'fsm_skill',                // Habilidades
        'fsm_territory',            // Territórios
    ], "CORE");

    // IT Operations Management (ITOM)
    await harvestList("IT Operations (ITOM)", [
        'em_event',                 // Events
        'em_alert',                 // Alertas
        'em_alert_rule',            // Regras de alerta
        'sn_em_connector_event',    // Eventos de connector
        'discovery_log',            // Discovery logs
        'discovery_device',         // Dispositivos descobertos
        'discovery_scan_range',     // Scan ranges
    ], "CORE");

    // GRC - Governance, Risk and Compliance
    await harvestList("GRC / Risk / Compliance", [
        'sn_risk_risk',             // Riscos
        'sn_compliance_policy',     // Políticas
        'sn_compliance_control',    // Controles
        'sn_audit_audit',           // Auditorias
        'sn_audit_finding',         // Achados de auditoria
    ], "CORE");

    // Safe (Agile / Planning)
    await harvestList("Agile / SPM", [
        'rm_story',             // User Stories
        'rm_epic',              // Epics
        'rm_sprint',            // Sprints
        'rm_release',           // Releases
        'rm_program',           // Programs
        'rm_portfolio',         // Portfolios
        'pm_project',           // Projetos
        'pm_project_task',      // Tarefas de projeto
    ], "CORE");

    // Scripting Metadata (importante para desenvolvimento)
    await harvestList("Scripting / Development Metadata", [
        'sys_script',               // Business Rules
        'sys_script_include',       // Script Includes
        'sys_client_script',        // Client Scripts
        'sys_ui_action',            // UI Actions
        'sys_ui_policy',            // UI Policies
        'sys_ui_script',            // UI Scripts
        'sys_ui_page',              // UI Pages
        'sys_update_set',           // Update Sets
        'sys_update_xml',           // Update XML
        'sys_remote_update_set',    // Remote Update Sets
        'sys_app_application',      // Applications (Studio)
        'sys_scope',                // Scopes
        'sys_metadata',             // Metadados gerais
        'sys_dictionary_override',  // Dictionary overrides
        'sys_documentation',        // Documentação de campo
    ], "SYSTEM");

    // Flow Designer
    await harvestList("Flow Designer", [
        'sys_hub_flow',             // Flows
        'sys_hub_subflow',          // Subflows
        'sys_hub_action_type_definition', // Action types
        'sys_hub_step',             // Steps
        'sys_hub_trigger_type',     // Trigger types
        'sys_flow_context',         // Execuções de flow
        'sys_flow_log',             // Logs de execução
    ], "SYSTEM");

    // Notification / Communication
    await harvestList("Notifications / Communication", [
        'sysevent_email_action',    // Email notifications
        'sys_notification',         // Notificações
        'sys_notification_filter',  // Filtros de notificação
        'sysrule_notification',     // Regras de notificação
        'sys_sms_log',              // SMS log
        'sys_email_log',            // Email log
    ], "SYSTEM");

    // Agora harvesta todas as tabelas customizadas u_* dinamicamente
    await harvestCustomDynamic();

    console.log("\n=== Enriquecimento Finalizado! ===");
    console.log("Execute 'ls knowledge/core/ | wc -l' e 'ls knowledge/custom/ | wc -l' para ver os resultados.");
}

run().catch(console.error);
