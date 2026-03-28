import { snGet } from "../lib/client.js";
import fs from 'fs';
import path from 'path';

// ─────────────────────────────────────────────
//  TOOLS — Knowledge Harvester (v3.8.0)
// ─────────────────────────────────────────────

export const knowledgeTools = [
  {
    name: "sn_sync_knowledge_base",
    description: "Sincroniza metadados da instância (tabelas, campos e relacionamentos) em arquivos Markdown locais.",
    inputSchema: {
      type: "object",
      properties: {
        env:           { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table_pattern: { type: "string", description: "Nome exato ou pattern (ex: incident, u_*, *)", default: "*" },
        category:      { type: "string", enum: ["CORE", "CUSTOM", "SYSTEM"], default: "CUSTOM" },
        limit:         { type: "number", description: "Máximo de tabelas a processar nesta rodada", default: 10 },
        offset:        { type: "number", description: "Offset para paginação do crawl", default: 0 },
      },
      required: ["category"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleKnowledgeTool(name, args) {
  const env = args.env || null;

  switch (name) {
    case "sn_sync_knowledge_base": {
      const table_pattern = args.table_pattern || "*";
      const category = args.category || "CUSTOM";
      const limit = args.limit || 10;
      const offset = args.offset || 0;
      
      // 1. Determinar filtros por categoria
      let query = "nameISNOTEMPTY";
      if (category === "CUSTOM") query += "^nameSTARTSWITHu_^ORnameSTARTSWITHx_";
      if (category === "SYSTEM") query += "^nameSTARTSWITHsys_";
      if (category === "CORE")   query += "^nameDOESNOTSTARTWITHu_^nameDOESNOTSTARTWITHx_^nameDOESNOTSTARTWITHsys_";
      
      if (table_pattern && table_pattern !== "*") {
        if (table_pattern.includes("*")) {
          query += `^nameLIKE${table_pattern.replace("*", "")}`;
        } else {
          query += `^name=${table_pattern}`;
        }
      }

      // 2. Buscar lista de tabelas (sys_db_object)
      const { result: tables } = await snGet("/api/now/table/sys_db_object", {
        sysparm_query: query + "^ORDERBYname",
        sysparm_limit: limit,
        sysparm_offset: offset,
        sysparm_fields: "name,label,sys_id,super_class"
      }, env);

      if (!tables || tables.length === 0) {
        return { message: `Nenhuma tabela encontrada para o critério: ${query}`, count: 0 };
      }

      const results = [];
      const knowledgeDir = path.resolve(process.cwd(), `knowledge/${category.toLowerCase()}`);
      
      if (!fs.existsSync(knowledgeDir)) {
          fs.mkdirSync(knowledgeDir, { recursive: true });
      }

      for (const table of tables) {
        // 3. Buscar colunas (sys_dictionary)
        const { result: columns } = await snGet("/api/now/table/sys_dictionary", {
            sysparm_query: `name=${table.name}^ORname=${table.super_class.value || "nothing"}^active=true`,
            sysparm_fields: "element,column_label,internal_type,reference,mandatory,default_value,max_length"
        }, env);

        // 4. Gerar Markdown
        let md = `# ServiceNow Table: ${table.label} (${table.name})\n\n`;
        md += `**Category:** ${category}\n`;
        md += `**SysID:** ${table.sys_id}\n`;
        if (table.super_class.display_value) {
            md += `**Extends:** ${table.super_class.display_value}\n`;
        }
        md += `\n## Schema Definition\n\n`;
        md += `| Field | Label | Type | Reference | Mandatory |\n`;
        md += `|---|---|---|---|---|\n`;

        columns.forEach(col => {
            if (!col.element) return; // Skip base entry
            
            // Handle display values for internal_type and reference
            const typeValue = typeof col.internal_type === 'object' ? (col.internal_type.display_value || col.internal_type.value) : col.internal_type;
            const refValue = typeof col.reference === 'object' ? (col.reference.display_value || col.reference.value || "-") : (col.reference || "-");
            const mandatoryIcon = col.mandatory === "true" || col.mandatory === true ? "✅" : "-";

            md += `| \`${col.element}\` | ${col.column_label} | ${typeValue} | ${refValue} | ${mandatoryIcon} |\n`;
        });

        md += `\n\n---\n*Knowledge harvested by ServiceNow MCP v3.8.0 on ${new Date().toISOString()}*`;

        const filePath = path.join(knowledgeDir, `${table.name}.md`);
        fs.writeFileSync(filePath, md, 'utf8');
        results.push(table.name);
      }

      // 5. Atualizar ou Criar INDEX.md
      await updateIndex(process.cwd());

      return { 
        status: "success", 
        processed_count: results.length, 
        tables: results,
        path: `knowledge/${category.toLowerCase()}/`
      };
    }
    default: return null;
  }
}

async function updateIndex(baseDir) {
    const knowledgeRoot = path.join(baseDir, 'knowledge');
    if (!fs.existsSync(knowledgeRoot)) return;

    let indexMd = `# ServiceNow Knowledge Base Index\n\n`;
    indexMd += `Este diretório contém a documentação técnica da instância sincronizada via MCP Harvester.\n\n`;

    const categories = ['core', 'custom', 'system'];
    for (const cat of categories) {
        const catDir = path.join(knowledgeRoot, cat);
        if (fs.existsSync(catDir)) {
            indexMd += `## ${cat.toUpperCase()} Tables\n`;
            const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
            files.forEach(f => {
                const tableName = f.replace('.md', '');
                indexMd += `- [${tableName}](./${cat}/${f})\n`;
            });
            indexMd += `\n`;
        }
    }

    fs.writeFileSync(path.join(knowledgeRoot, 'INDEX.md'), indexMd, 'utf8');
}
