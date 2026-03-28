import { handleKnowledgeTool } from './tools/knowledge.js';
import 'dotenv/config';

async function run() {
    const portalTables = [
        'sp_portal', 'sp_page', 'sp_widget', 'sp_instance', 'sp_theme', 
        'sp_container', 'sp_row', 'sp_column', 'sp_instance_ais', 'sp_instance_table',
        'sp_instance_menu', 'sp_rectangle_menu_item', 'sp_ng_template', 'sp_css',
        'sp_js_include', 'sp_dependency', 'sp_angular_provider', 'sp_search_source',
        'sp_search_group', 'sp_css_include', 'sp_js_include', 'sp_header_footer',
        'sn_ex_sp_portal', 'sn_ex_sp_quick_link', 'sn_ex_sp_external_link',
        'sn_ex_sp_static_content', 'sn_ex_sp_topic_metric', 'sn_ex_sp_footer',
        'sn_ex_sp_footer_menu', 'sn_ex_sp_todo_config_detail'
    ];
    
    console.log(`Iniciando colheita de ${portalTables.length} tabelas de Portal/EC...`);
    
    for (const t of portalTables) {
        console.log(`Processando: ${t}...`);
        await handleKnowledgeTool("sn_sync_knowledge_base", {
            env: "PDI",
            category: "CORE", // Tabelas core de sistema
            table_pattern: t,
            limit: 1
        });
    }
    console.log("\nColheita de Portal e Employee Center finalizada!");
}

run().catch(console.error);
