import { snGet, snPost, snPatch, snDelete } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Core CRUD (Genérico)
// ─────────────────────────────────────────────

export const scriptTools = [
  {
    name: "sn_query_records",
    description: "Consulta registros de qualquer tabela do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        query:  { type: "string", description: "Encoded query (ex: active=true^priority=1)" },
        fields: { type: "string", description: "Campos separados por vírgula" },
        limit:  { type: "number" },
      },
      required: ["table"],
    },
  },
  {
    name: "sn_get_record",
    description: "Busca um registro específico pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
      },
      required: ["table", "sys_id"],
    },
  },
  {
    name: "sn_create_record",
    description: "Cria um registro genérico em qualquer tabela.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string" },
        data:  { type: "object", description: "Payload JSON com nomes nativos das colunas" },
      },
      required: ["table", "data"],
    },
  },
  {
    name: "sn_update_record",
    description: "Atualiza campos de qualquer registro pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
        data:   { type: "object", description: "Campos a serem atualizados" },
      },
      required: ["table", "sys_id", "data"],
    },
  },
  {
    name: "sn_delete_record",
    description: "Remove um registro de qualquer tabela pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
      },
      required: ["table", "sys_id"],
    },
  },

  // ─────────────────────────────────────────────
  //  TOOLS — Metadata Management (CONSOLIDADO v3.0)
  // ─────────────────────────────────────────────

  {
    name: "sn_upsert_metadata_script",
    description: "Cria ou atualiza (se sys_id fornecido) scripts de desenvolvimento e regras de negócio.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id: { type: "string", description: "Opcional. Se fornecido, realiza atualização (PATCH). Se ausente, cria (POST)." },
        type:   { 
          type: "string", 
          enum: ["business_rule", "script_include", "client_script", "ui_policy", "scheduled_job"],
          description: "Tipo do recurso de metadados"
        },
        name:      { type: "string", description: "Nome ou Short Description" },
        script:    { type: "string" },
        table:     { type: "string", description: "Tabela alvo (relevante para business_rule, client_script, ui_policy)" },
        active:    { type: "boolean" },
        // Campos específicos que são mapeados internamente
        condition: { type: "string", description: "Condição de execução (BR, UI Policy)" },
        when:      { type: "string", enum: ["before", "after", "async", "display"], description: "Para Business Rules" },
        action:    { type: "string", description: "Para BR: 'insert,update,delete,query'" },
        cs_type:   { type: "string", enum: ["onLoad", "onChange", "onSubmit"], description: "Para Client Scripts" },
        field:     { type: "string", description: "Campo para Client Script onChange" },
        run_type:  { type: "string", enum: ["daily", "weekly", "monthly", "periodically", "once"], description: "Para Scheduled Jobs" },
        client_callable: { type: "boolean", description: "Para Script Includes" },
      },
      required: ["type", "name"],
    },
  },
  {
    name: "sn_execute_script",
    description: "Executa um script arbitrário no Background Scripts (Server-Side).",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        script: { type: "string" },
        scope:  { type: "string", default: "global" },
      },
      required: ["script"],
    },
  },
  {
    name: "sn_manage_schema",
    description: "Consolida criação de tabelas e campos (Schema Management).",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        action: { type: "string", enum: ["create_table", "create_field"] },
        table:  { type: "string", description: "Nome da tabela (ex: u_minha_tabela)" },
        label:  { type: "string", description: "Label amigável" },
        name:   { type: "string", description: "Nome técnico do campo (se action=create_field)" },
        type:   { type: "string", description: "Tipo do campo (string, integer, boolean, etc.)" },
        extends_table: { type: "string", description: "Para tabelas: tabela pai" },
        max_length:    { type: "number", default: 255 },
        mandatory:     { type: "boolean" },
      },
      required: ["action", "table", "label"],
    },
  },
  {
    name: "sn_generate_ai_context",
    description: "Gera uma explicação em Markdown otimizada para o Context Window da IA a partir de um registro.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string" },
        table: { type: "string" },
        sys_id: { type: "string" },
      },
      required: ["table", "sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleScriptTool(name, args) {
  const env = args.env || null;

  switch (name) {
    case "sn_query_records": {
      const { result } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_limit: args.limit || 10,
        ...(args.query  && { sysparm_query: args.query }),
        ...(args.fields && { sysparm_fields: args.fields }),
      }, env);
      return result;
    }

    case "sn_get_record": {
      const { result } = await snGet(`/api/now/table/${args.table}/${args.sys_id}`, {}, env);
      return result;
    }

    case "sn_create_record": {
      const { result } = await snPost(`/api/now/table/${args.table}`, args.data, env);
      return result;
    }

    case "sn_update_record": {
      const { result } = await snPatch(`/api/now/table/${args.table}/${args.sys_id}`, args.data, env);
      return result;
    }

    case "sn_delete_record": {
      await snDelete(`/api/now/table/${args.table}/${args.sys_id}`, env);
      return { deleted: true, table: args.table, sys_id: args.sys_id };
    }

    case "sn_upsert_metadata_script": {
      const { type, sys_id, ...data } = args;
      let finalTable = "";
      let payload = {
        active: data.active !== false
      };

      // Mapeamento por tipo
      switch (type) {
        case "business_rule":
          finalTable = "sys_script";
          payload.name = data.name;
          payload.collection = data.table;
          payload.when = data.when || "before";
          payload.script = data.script;
          if (data.action) {
            payload.action_insert = data.action.includes("insert");
            payload.action_update = data.action.includes("update");
            payload.action_delete = data.action.includes("delete");
            payload.action_query  = data.action.includes("query");
          }
          if (data.condition) payload.condition = data.condition;
          break;

        case "script_include":
          finalTable = "sys_script_include";
          payload.name = data.name;
          payload.api_name = data.name;
          payload.script = data.script;
          payload.client_callable = !!data.client_callable;
          break;

        case "client_script":
          finalTable = "sys_script_client";
          payload.name = data.name;
          payload.table = data.table;
          payload.type = data.cs_type || "onLoad";
          payload.script = data.script;
          payload.field_name = data.field || "";
          break;

        case "ui_policy":
          finalTable = "sys_ui_policy";
          payload.short_description = data.name;
          payload.table = data.table;
          payload.conditions = data.condition || "";
          payload.script = data.script || "";
          break;

        case "scheduled_job":
          finalTable = "sysauto_script";
          payload.name = data.name;
          payload.script = data.script;
          payload.run_type = data.run_type || "daily";
          break;
      }

      if (sys_id) {
        const { result } = await snPatch(`/api/now/table/${finalTable}/${sys_id}`, payload, env);
        return { action: "updated", type, sys_id: result.sys_id, name: result.name || result.short_description };
      } else {
        const { result } = await snPost(`/api/now/table/${finalTable}`, payload, env);
        return { action: "created", type, sys_id: result.sys_id, name: result.name || result.short_description };
      }
    }

    case "sn_execute_script": {
      // Nota: Este endpoint costuma requerer um Scripted REST API customizado na instância
      // ou usamos o explorador de API nativo se disponível.
      const { result } = await snPost("/api/x_dev_agent/script_runner/execute", {
        script: args.script,
        scope:  args.scope || "global",
      }, env);
      return result;
    }

    case "sn_manage_schema": {
      const { action, table, label, name, type: fType, extends_table, max_length, mandatory } = args;
      
      if (action === "create_table") {
        const { result } = await snPost("/api/now/table/sys_db_object", {
          label,
          name: table,
          super_class: extends_table || "",
        }, env);
        return { action: "table_created", sys_id: result.sys_id, name: result.name };
      } else {
        const { result } = await snPost("/api/now/table/sys_dictionary", {
          name: table,
          column_label: label,
          element: name,
          internal_type: fType,
          max_length: max_length || 255,
          mandatory: !!mandatory,
        }, env);
        return { action: "field_created", sys_id: result.sys_id, element: result.element };
      }
    }

    case "sn_generate_ai_context": {
      const { table, sys_id } = args;
      const { result: record } = await snGet(`/api/now/table/${table}/${sys_id}`, {}, env);
      
      // Lógica de Geração de Contexto resumido
      let context = `# AI Context: ${record.name || record.short_description || record.sys_id}\n`;
      context += `**Table:** ${table}\n`;
      context += `**SysID:** ${sys_id}\n\n`;
      
      if (record.script || record.template || record.client_script) {
        context += `## Script Content\n\`\`\`javascript\n${record.script || record.template || record.client_script}\n\`\`\`\n`;
      }

      if (record.description || record.short_description) {
        context += `## Purpose\n${record.description || record.short_description}\n`;
      }

      return { markdown: context, summary: "Contexto gerado com sucesso para a IA." };
    }

    default: return null;
  }
}
