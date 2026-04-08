import { snGet, snPost, snPatch, snDelete } from "../lib/client.js";
import { validateTableName, validateSysId, validateLimit } from "../lib/validate.js";
import fs from "fs";
import path from "path";

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
        offset: { type: "number", description: "Offset para paginação (default: 0)" },
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
    name: "sn_bulk_update",
    description: "Atualiza múltiplos registros de uma tabela por query encoded. Retorna a contagem de registros afetados.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string" },
        query: { type: "string", description: "Encoded query para selecionar os registros (ex: active=true^priority=1)" },
        data:  { type: "object", description: "Campos e valores a aplicar em todos os registros encontrados" },
        limit: { type: "number", description: "Máximo de registros a atualizar (default: 100, máx: 500)" },
      },
      required: ["table", "query", "data"],
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
  //  TOOLS — Ambiente e Configuração
  // ─────────────────────────────────────────────

  {
    name: "sn_list_envs",
    description: "Lista todos os ambientes ServiceNow configurados no .env (com prefixo como DEV_, PROD_, etc). Útil para descobrir quais instâncias estão disponíveis.",
    inputSchema: {
      type: "object",
      properties: {},
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
    description: "Executa um script arbitrário no servidor (Background Scripts). REQUER uma Scripted REST API customizada implantada na instância: crie um Scripted REST com namespace 'x_dev_agent', recurso 'script_runner', método POST que receba {script, scope} e execute via GlideSystem.evaluate(). Consulte README.md para o código completo.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        script: { type: "string", description: "Script server-side a executar" },
        scope:  { type: "string", default: "global", description: "Escopo de execução (global ou nome do app scope)" },
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
        type:   {
          type: "string",
          enum: ["string", "integer", "boolean", "reference", "date", "glide_date_time",
                 "choice", "list", "glide_duration", "decimal", "float", "phone_number",
                 "email", "url", "html", "script", "script_plain", "json"],
          description: "Tipo do campo"
        },
        extends_table: { type: "string", description: "Para tabelas: tabela pai" },
        max_length:    { type: "number", default: 255 },
        mandatory:     { type: "boolean" },
      },
      required: ["action", "table", "label"],
    },
  },
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

export async function handleScriptTool(name, args) {
  const env = args.env || null;

  switch (name) {
    case "sn_query_records": {
      validateTableName(args.table);
      const limit  = args.limit  ? validateLimit(args.limit)  : 10;
      const offset = args.offset ? Math.max(0, parseInt(args.offset, 10)) : 0;
      const { result } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_limit:  limit,
        sysparm_offset: offset,
        ...(args.query  && { sysparm_query:  args.query  }),
        ...(args.fields && { sysparm_fields: args.fields }),
      }, env);
      return { result, meta: { offset, limit, count: result.length } };
    }

    case "sn_get_record": {
      validateTableName(args.table);
      validateSysId(args.sys_id);
      const { result } = await snGet(`/api/now/table/${args.table}/${args.sys_id}`, {}, env);
      return result;
    }

    case "sn_create_record": {
      validateTableName(args.table);
      const { result } = await snPost(`/api/now/table/${args.table}`, args.data, env);
      return result;
    }

    case "sn_update_record": {
      validateTableName(args.table);
      validateSysId(args.sys_id);
      const { result } = await snPatch(`/api/now/table/${args.table}/${args.sys_id}`, args.data, env);
      return result;
    }

    case "sn_bulk_update": {
      validateTableName(args.table);
      const limit = Math.min(args.limit || 100, 500);

      // 1. Buscar registros que atendem a query
      const { result: records } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_query:  args.query,
        sysparm_fields: "sys_id",
        sysparm_limit:  limit,
      }, env);

      if (!records || records.length === 0) {
        return { updated: 0, message: "Nenhum registro encontrado para o filtro informado." };
      }

      // 2. Atualizar cada registro
      const results = await Promise.allSettled(
        records.map(r => snPatch(`/api/now/table/${args.table}/${r.sys_id}`, args.data, env))
      );

      const succeeded = results.filter(r => r.status === "fulfilled").length;
      const failed    = results.filter(r => r.status === "rejected").map(
        (r, i) => ({ sys_id: records[i].sys_id, reason: r.reason?.message })
      );

      return {
        updated: succeeded,
        failed_count: failed.length,
        ...(failed.length > 0 && { failures: failed }),
      };
    }

    case "sn_delete_record": {
      validateTableName(args.table);
      validateSysId(args.sys_id);
      await snDelete(`/api/now/table/${args.table}/${args.sys_id}`, env);
      return { deleted: true, table: args.table, sys_id: args.sys_id };
    }

    case "sn_list_envs": {
      const envs = [];
      const envVars = Object.keys(process.env);

      // Ambiente default (sem prefixo)
      if (process.env.SN_INSTANCE) {
        envs.push({
          prefix:   "default",
          instance: process.env.SN_INSTANCE,
          user:     process.env.SN_USER || "(OAuth)",
          auth:     process.env.SN_OAUTH_ACCESS_TOKEN ? "OAuth" : "Basic",
        });
      }

      // Ambientes com prefixo (ex: DEV_SN_INSTANCE → prefix "DEV")
      const prefixes = new Set(
        envVars
          .filter(k => k.endsWith("_SN_INSTANCE"))
          .map(k => k.replace("_SN_INSTANCE", ""))
      );

      for (const prefix of prefixes) {
        const instance = process.env[`${prefix}_SN_INSTANCE`];
        const user     = process.env[`${prefix}_SN_USER`];
        const hasOAuth = !!process.env[`${prefix}_SN_OAUTH_ACCESS_TOKEN`];
        envs.push({
          prefix,
          instance,
          user:  user || "(OAuth)",
          auth:  hasOAuth ? "OAuth" : "Basic",
        });
      }

      return {
        count: envs.length,
        environments: envs,
        tip: envs.length === 0
          ? "Nenhum ambiente configurado. Copie .env.example para .env e preencha as variáveis."
          : "Use o campo 'prefix' como argumento 'env' nas ferramentas."
      };
    }

    case "sn_upsert_metadata_script": {
      const { type, sys_id, ...data } = args;
      let finalTable = "";
      let payload = {
        active: data.active !== false
      };

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
      // Requer Scripted REST API customizada na instância.
      // Namespace: x_dev_agent | Resource: script_runner | Method: POST
      // Body: { script: string, scope: string }
      try {
        const { result } = await snPost("/api/x_dev_agent/script_runner/execute", {
          script: args.script,
          scope:  args.scope || "global",
        }, env);
        return result;
      } catch (err) {
        if (err.message.includes("404") || err.message.includes("400")) {
          throw new Error(
            "O endpoint de execução de scripts não está disponível nesta instância.\n\n" +
            "SETUP NECESSÁRIO: Crie uma Scripted REST API no ServiceNow:\n" +
            "  • Namespace (API ID): x_dev_agent\n" +
            "  • Resource path: /script_runner\n" +
            "  • Method: POST\n" +
            "  • Script do método:\n" +
            "    (function process(request, response) {\n" +
            "      var body = request.body.data;\n" +
            "      var result = GlideSystem.evaluateScript(body.script);\n" +
            "      response.setBody({ result: result });\n" +
            "    })(request, response);\n\n" +
            "Erro original: " + err.message
          );
        }
        throw err;
      }
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

      let context = `# AI Context: ${record.name || record.short_description || record.number || sys_id}\n`;
      context += `**Table:** ${table}\n`;
      context += `**SysID:** ${sys_id}\n`;
      if (record.sys_created_on) context += `**Created:** ${record.sys_created_on}\n`;
      if (record.sys_updated_on) context += `**Updated:** ${record.sys_updated_on}\n`;
      context += "\n";

      // Tenta enriquecer com o schema local do knowledge/
      const categories = ["core", "custom", "system"];
      for (const cat of categories) {
        const knowledgePath = path.resolve(process.cwd(), `knowledge/${cat}/${table}.md`);
        if (fs.existsSync(knowledgePath)) {
          const schema = fs.readFileSync(knowledgePath, "utf8");
          // Extrai apenas a seção de Schema Definition
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
        .slice(0, 20); // limita para não explodir o context window

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
