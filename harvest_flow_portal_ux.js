import { handleKnowledgeTool } from './tools/knowledge.js';
import { snGet } from './lib/client.js';
import 'dotenv/config';

const env = "PDI";

async function harvestAllFromQuery(label, query, category) {
    console.log(`\n=== ${label} ===`);
    const { result: tables } = await snGet('/api/now/table/sys_db_object', {
        sysparm_query: query + '^ORDERBYname',
        sysparm_fields: 'name',
        sysparm_limit: 300
    }, env);

    // Filtrar shards (terminam com 4 dígitos)
    const filtered = tables.filter(t => !/\d{4}$/.test(t.name));
    console.log(`  ${filtered.length} tabelas encontradas`);

    const chunkSize = 8;
    for (let i = 0; i < filtered.length; i += chunkSize) {
        const chunk = filtered.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (t) => {
            process.stdout.write(`  [+] ${t.name}... `);
            try {
                await handleKnowledgeTool("sn_sync_knowledge_base", {
                    env, category, table_pattern: t.name, limit: 1
                });
                console.log("OK");
            } catch (e) {
                console.log(`ERRO: ${e.message}`);
            }
        }));
        await new Promise(r => setTimeout(r, 300));
    }
}

async function run() {
    console.log("=== Harvest: Flow Designer, Portal, Employee Center, Now Experience ===\n");

    // Service Portal — todas as sp_*
    await harvestAllFromQuery(
        "Service Portal (sp_*)",
        "nameSTARTSWITHsp_",
        "CORE"
    );

    // Employee Center — todas as sn_ex_sp_*
    await harvestAllFromQuery(
        "Employee Center (sn_ex_sp_*)",
        "nameSTARTSWITHsn_ex_sp_",
        "CORE"
    );

    // Flow Designer — todas as sys_hub_*
    await harvestAllFromQuery(
        "Flow Designer - Hub (sys_hub_*)",
        "nameSTARTSWITHsys_hub_",
        "SYSTEM"
    );

    // Flow Core — todas as sys_flow_*
    await harvestAllFromQuery(
        "Flow Designer - Core (sys_flow_*)",
        "nameSTARTSWITHsys_flow_",
        "SYSTEM"
    );

    // Now Experience UX — todas as sys_ux_*
    await harvestAllFromQuery(
        "Now Experience / UI Builder (sys_ux_*)",
        "nameSTARTSWITHsys_ux_",
        "SYSTEM"
    );

    console.log("\n=== Colheita Finalizada! ===");

    // Resumo final
    const { default: fs } = await import('fs');
    const core = fs.readdirSync('./knowledge/core').length;
    const system = fs.readdirSync('./knowledge/system').length;
    console.log(`\nResumo: core=${core} | system=${system}`);
}

run().catch(console.error);
