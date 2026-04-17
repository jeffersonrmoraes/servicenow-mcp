import { snGet } from "../lib/client.js";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// ─────────────────────────────────────────────
//  TOOLS — AI Context Generator (v5.0)
// ─────────────────────────────────────────────

export const contextTools = [
  {
    name: "sn_generate_ai_context",
    description: "Gera uma explicação em Markdown otimizada para o Context Window da IA a partir de um registro. Cruza com o schema local do knowledge/ se disponível.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        table:  { type: "string" },
        sys_id: { type: "string" },
      },
      required: ["table", "sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleContextTool(name: string, args: any) {
  const env = args.env || null;

  switch (name) {
    case "sn_generate_ai_context": {
      const { table, sys_id } = args;
      const { result: record } = await snGet(`/api/now/table/${table}/${sys_id}`, {}, env);

      let context = `# AI Context: ${record.name || record.short_description || record.number || sys_id}\n`;
      context += `**Table:** ${table}\n`;
      context += `**SysID:** ${sys_id}\n`;
      if (record.sys_created_on) context += `**Created:** ${record.sys_created_on}\n`;
      if (record.sys_updated_on) context += `**Updated:** ${record.sys_updated_on}\n`;
      context += "\n";

      // Tenta enriquecer com o schema local do knowledge/ (async I/O)
      const categories = ["core", "custom", "system"];
      for (const cat of categories) {
        const knowledgePath = path.resolve(process.cwd(), `knowledge/${cat}/${table}.md`);
        if (existsSync(knowledgePath)) {
          const schema = await fs.readFile(knowledgePath, "utf8");
          const schemaMatch = schema.match(/## Schema Definition[\s\S]+?(?=\n##|$)/);
          if (schemaMatch) {
            context += `## Schema (from local knowledge)\n${schemaMatch[0]}\n`;
          }
          break;
        }
      }

      if (record.script || record.template || record.client_script) {
        context += `## Script Content\n\`\`\`javascript\n${record.script || record.template || record.client_script}\n\`\`\`\n`;
      }

      if (record.description || record.short_description) {
        context += `## Purpose\n${record.description || record.short_description}\n`;
      }

      // Campos relevantes (exclui sys_ internos volumosos)
      const ignoredFields = new Set(["sys_id", "sys_meta", "sys_package", "sys_update_name",
        "sys_scope", "sys_class_name", "sys_created_by", "sys_updated_by"]);
      const relevantFields = Object.entries(record)
        .filter(([k]) => !k.startsWith("sys_") || !ignoredFields.has(k))
        .filter(([, v]) => v && typeof v !== "object")
        .slice(0, 20);

      if (relevantFields.length > 0) {
        context += "\n## Key Fields\n";
        relevantFields.forEach(([k, v]) => {
          context += `- **${k}**: ${v}\n`;
        });
      }

      return { markdown: context, summary: "Contexto gerado com sucesso." };
    }

    default: return null;
  }
}
