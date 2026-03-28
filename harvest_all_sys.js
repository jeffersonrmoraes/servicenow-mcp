import { handleKnowledgeTool } from './tools/knowledge.js';
import { snGet } from './lib/client.js';
import 'dotenv/config';

async function run() {
    const env = "PDI";
    console.log("=== Iniciando Super Colheita: SYSTEM TABLES ===");

    // 1. Buscar todas as tabelas sys_ (limitando a 500 por enquanto para segurança)
    const { result: allSys } = await snGet("/api/now/table/sys_db_object", {
        sysparm_query: "nameSTARTSWITHsys_^ORDERBYname",
        sysparm_fields: "name",
        sysparm_limit: 500 
    }, env);

    // 2. Filtrar shards (tabelas que terminam em 4 números)
    const filtered = allSys.filter(t => !/\d{4}$/.test(t.name));
    
    console.log(`Tabelas encontradas: ${allSys.length}`);
    console.log(`Após filtrar shards: ${filtered.length}`);

    // 3. Processar em blocos de 10
    const chunkSize = 10;
    for (let i = 0; i < filtered.length; i += chunkSize) {
        const chunk = filtered.slice(i, i + chunkSize);
        console.log(`\n--- Processando Bloco ${Math.floor(i/chunkSize) + 1} de ${Math.ceil(filtered.length/chunkSize)} ---`);
        
        await Promise.all(chunk.map(async (t) => {
            console.log(`  [+] Harvesting: ${t.name}`);
            try {
                await handleKnowledgeTool("sn_sync_knowledge_base", {
                    env,
                    category: "SYSTEM",
                    table_pattern: t.name,
                    limit: 1
                });
            } catch (e) {
                console.error(`  [!] Erro em ${t.name}: ${e.message}`);
            }
        }));

        // Pequena pausa entre blocos para não sobrecarregar
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log("\n=== Super Colheita Finalizada! ===");
}

run().catch(console.error);
