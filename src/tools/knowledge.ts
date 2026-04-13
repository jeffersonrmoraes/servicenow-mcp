import { snGet } from "../lib/client.js";
import fs from 'fs';
import path from 'path';

// ─────────────────────────────────────────────
//  Interfaces (v4.0)
// ─────────────────────────────────────────────

interface SyncState {
  [env: string]: {
    [category: string]: string; // ISO Timestamp
  };
}

interface ServiceNowTable {
  name: string;
  label: string;
  sys_id: string;
  super_class: {
    display_value: string;
    value: string;
  };
}

interface ServiceNowColumn {
  element: string;
  column_label: string;
  internal_type: string | { display_value: string; value: string };
  reference: string | { display_value: string; value: string };
  mandatory: string | boolean;
}

// ─────────────────────────────────────────────
//  TOOLS — Knowledge Harvester (v4.0)
// ─────────────────────────────────────────────

export const knowledgeTools = [
  {
    name: "sn_sync_knowledge_base",
    description: "Sincroniza metadados da instância (tabelas, campos e relacionamentos). Suporte incremental (v4.0) e garbage collection de schemas obsoletos.",
    inputSchema: {
      type: "object",
      properties: {
        env:           { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table_pattern: { type: "string", description: "Nome exato ou pattern (ex: incident, u_*, *)", default: "*" },
        category:      { type: "string", enum: ["CORE", "CUSTOM", "SYSTEM"], default: "CUSTOM" },
        limit:         { type: "number", description: "Máximo de tabelas a processar nesta rodada", default: 10 },
        offset:        { type: "number", description: "Offset para paginação do crawl", default: 0 },
        force:         { type: "boolean", description: "Ignorar modo incremental e forçar sync completo", default: false },
        cleanup:       { type: "boolean", description: "Remove schemas locais de tabelas que não existem mais na instância (requer force=true)", default: false },
      },
      required: ["category"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleKnowledgeTool(name: string, args: any) {
  const env = args.env || "default";

  switch (name) {
    case "sn_sync_knowledge_base": {
      const table_pattern = args.table_pattern || "*";
      const category = (args.category || "CUSTOM").toUpperCase();
      const limit = args.limit || 10;
      const offset = args.offset || 0;
      const force = !!args.force;
      const cleanup = !!args.cleanup;

      const knowledgeDir = path.resolve(process.cwd(), `knowledge`);
      const stateFile = path.join(knowledgeDir, "state.json");
      
      // 1. Carregar Estado Incremental
      let state: SyncState = {};
      try {
        if (fs.existsSync(stateFile)) {
          state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
        }
      } catch {}

      const lastSync = !force && state[env] && state[env][category] ? state[env][category] : null;

      // 2. Determinar filtros
      let query = "nameISNOTEMPTY";
      if (category === "CUSTOM") query += "^nameSTARTSWITHu_^ORnameSTARTSWITHx_";
      if (category === "SYSTEM") query += "^nameSTARTSWITHsys_";
      if (category === "CORE")   query += "^nameDOESNOTSTARTWITHu_^nameDOESNOTSTARTWITHx_^nameDOESNOTSTARTWITHsys_";

      if (table_pattern && table_pattern !== "*") {
        if (table_pattern.includes("*")) {
          query += `^nameLIKE${table_pattern.replace(/\*/g, "")}`;
        } else {
          query += `^name=${table_pattern}`;
        }
      }

      // Filtro Incremental (v4.0)
      if (lastSync) {
        query += `^sys_updated_on>=${lastSync.replace(".000Z", "").replace("T", " ")}`;
      }

      // 3. Buscar lista de tabelas
      const response = await snGet("/api/now/table/sys_db_object", {
        sysparm_query: query + "^ORDERBYname",
        sysparm_limit: limit,
        sysparm_offset: offset,
        sysparm_fields: "name,label,sys_id,super_class,sys_updated_on"
      }, env);
      
      const tables: ServiceNowTable[] = response.result || [];

      if (!tables || tables.length === 0) {
        return { message: `Tudo atualizado! Nenhuma mudança desde ${lastSync || "o início"}.`, count: 0 };
      }

      const results: string[] = [];
      const categoryDir = path.join(knowledgeDir, category.toLowerCase());
      const syncTimestamp = new Date().toISOString();

      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      for (const table of tables) {
        // 4. Buscar colunas
        const colResponse = await snGet("/api/now/table/sys_dictionary", {
            sysparm_query: `name=${table.name}^ORname=${table.super_class?.value || "nothing"}^active=true`,
            sysparm_fields: "element,column_label,internal_type,reference,mandatory,default_value,max_length"
        }, env);
        
        const columns: ServiceNowColumn[] = colResponse.result || [];

        // 5. Gerar Markdown
        let md = `# ServiceNow Table: ${table.label} (${table.name})\n\n`;
        md += `**Category:** ${category}\n`;
        md += `**SysID:** ${table.sys_id}\n`;
        md += `**Last Synced:** ${syncTimestamp}\n`;
        if (table.super_class?.display_value) {
            md += `**Extends:** ${table.super_class.display_value}\n`;
        }
        md += `\n## Schema Definition\n\n`;
        md += `| Field | Label | Type | Reference | Mandatory |\n`;
        md += `|---|---|---|---|---|\n`;

        columns.forEach(col => {
            if (!col.element) return;
            const typeValue = typeof col.internal_type === 'object' ? col.internal_type.display_value : col.internal_type;
            const refValue  = typeof col.reference === 'object'     ? (col.reference.display_value || col.reference.value || "-") : (col.reference || "-");
            const mandatory = col.mandatory === "true" || col.mandatory === true ? "✅" : "-";
            md += `| \`${col.element}\` | ${col.column_label} | ${typeValue} | ${refValue} | ${mandatory} |\n`;
        });

        md += `\n\n---\n*Synced by ServiceNow MCP v4.0.0 on ${syncTimestamp}*`;

        try {
          fs.writeFileSync(path.join(categoryDir, `${table.name}.md`), md, 'utf8');
          results.push(table.name);
        } catch (e: any) {
          results.push(`ERROR:${table.name}:${e.message}`);
        }
      }

      // 6. Garbage Collection — remove .md de tabelas que não existem mais
      let removed: string[] = [];
      if (cleanup && force) {
        const existingFiles = fs.readdirSync(categoryDir).filter(f => f.endsWith(".md"));
        const syncedNames = new Set(tables.map((t: ServiceNowTable) => `${t.name}.md`));

        // Para cleanup seguro, buscamos TODAS as tabelas da categoria (sem limit/offset)
        let allTableNames = new Set<string>();
        try {
          const allResp = await snGet("/api/now/table/sys_db_object", {
            sysparm_query: query.split("^sys_updated_on")[0] + "^ORDERBYname",
            sysparm_limit: 5000,
            sysparm_fields: "name",
          }, env);
          (allResp.result || []).forEach((t: any) => allTableNames.add(`${t.name}.md`));
        } catch {}

        for (const file of existingFiles) {
          if (allTableNames.size > 0 && !allTableNames.has(file)) {
            try {
              fs.unlinkSync(path.join(categoryDir, file));
              removed.push(file.replace(".md", ""));
            } catch {}
          }
        }
      }

      // 7. Atualizar Estado e Índice
      if (!state[env]) state[env] = {};
      state[env][category] = syncTimestamp;
      fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8");

      await updateIndex(process.cwd());

      return {
        status: "success",
        processed_count: results.length,
        incremental: !!lastSync,
        tables: results,
        ...(removed.length > 0 && { removed_obsolete: removed }),
        synced_at: syncTimestamp
      };
    }
    default: return null;
  }
}

async function updateIndex(baseDir: string) {
    const knowledgeRoot = path.join(baseDir, 'knowledge');
    if (!fs.existsSync(knowledgeRoot)) return;

    const generatedAt = new Date().toISOString();

    let indexMd = `# ServiceNow Knowledge Base Index\n\n`;
    indexMd += `Este diretório contém a documentação técnica da instância sincronizada via MCP Harvester.\n\n`;
    indexMd += `**Índice gerado em:** ${generatedAt}\n\n`;

    const categories = fs.readdirSync(knowledgeRoot).filter(
      f => fs.statSync(path.join(knowledgeRoot, f)).isDirectory()
    ).sort();

    for (const cat of categories) {
        const catDir = path.join(knowledgeRoot, cat);
        if (fs.existsSync(catDir)) {
            const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
            indexMd += `## ${cat.toUpperCase()} Tables (${files.length})\n`;

            files.sort().forEach(f => {
                const tableName = f.replace('.md', '');
                // Tenta extrair o timestamp de sincronização do arquivo
                let syncInfo = "";
                try {
                  const content = fs.readFileSync(path.join(catDir, f), 'utf8');
                  const match = content.match(/\*\*Last Synced:\*\* (.+)/);
                  if (match) syncInfo = ` _(${match[1].substring(0, 10)})_`;
                } catch {}
                indexMd += `- [${tableName}](./${cat}/${f})${syncInfo}\n`;
            });
            indexMd += `\n`;
        }
    }

    fs.writeFileSync(path.join(knowledgeRoot, 'INDEX.md'), indexMd, 'utf8');
}
