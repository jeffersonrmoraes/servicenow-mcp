import { handleKnowledgeTool } from './tools/knowledge.js';
import 'dotenv/config';

async function run() {
    const tables = ['task', 'change_request', 'problem', 'sys_user', 'sys_user_group'];
    
    for (const t of tables) {
        console.log(`Colhendo metadados da tabela: ${t}...`);
        const cat = t.startsWith('sys_') ? 'SYSTEM' : 'CORE';
        await handleKnowledgeTool("sn_sync_knowledge_base", {
            env: "PDI",
            category: cat,
            table_pattern: t,
            limit: 1
        });
    }
    console.log("Colheita de tabelas principais finalizada!");
}

run().catch(console.error);
