import { handleKnowledgeTool } from './tools/knowledge.js';
import 'dotenv/config';

async function run() {
    const env = "PDI";
    const tables = [
        // Knowledge Management
        'kb_knowledge', 'kb_knowledge_base', 'kb_category', 'kb_article_template',
        'kb_article_template_definition', 'kb_feedback', 'kb_version',
        // Service Catalog
        'sc_cat_item', 'sc_category', 'sc_catalog', 'sc_req_item', 'sc_task', 
        'sc_cart', 'sc_cat_item_producer', 'sc_cat_item_guide', 'sc_cat_item_category',
        'sc_item_option_mtom', 'sc_multi_row_question_answer',
        // Employee Center Taxonomy
        'sn_ex_sp_topic', 'sn_ex_sp_topic_metric'
    ];
    
    console.log(`Iniciando colheita de ${tables.length} tabelas de Catalog/Knowledge...`);
    
    for (const t of tables) {
        console.log(`Processando: ${t}...`);
        await handleKnowledgeTool("sn_sync_knowledge_base", {
            env,
            category: "CORE",
            table_pattern: t,
            limit: 1
        });
    }
    console.log("\nColheita de Catalog e Knowledge finalizada!");
}

run().catch(console.error);
