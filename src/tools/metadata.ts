import { snGet, snPost, snPatch } from "../lib/client.js";
import { logger } from "../lib/logger.js";

// ─────────────────────────────────────────────
//  TOOLS — Metadata & Script Management (v5.0)
// ─────────────────────────────────────────────

// Script sanitization: operações bloqueadas por segurança
const BLOCKED_PATTERNS = [
  /GlideRecord\s*\(\s*['"]sys_user['"]\s*\)\s*\.deleteMultiple/i,
  /Packages\.java/i,
  /GlideSystem\.exit/i,
  /gs\.exit/i,
  /java\.lang\.Runtime/i,
  /java\.io\.File/i,
  /Packages\.com\.glide/i,
  /GlideRecord\s*\(\s*['"]sys_db_object['"]\s*\)\s*\.deleteRecord/i,
  /GlideRecord\s*\(\s*['"]sys_dictionary['"]\s*\)\s*\.deleteRecord/i,
];

const MAX_SCRIPT_SIZE = 50 * 1024; // 50KB

function sanitizeScript(script: string): void {
  if (script.length > MAX_SCRIPT_SIZE) {
    throw new Error(`Script excede o tamanho máximo permitido (${MAX_SCRIPT_SIZE / 1024}KB).`);
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(script)) {
      throw new Error(
        `Script contém operação bloqueada por segurança: ${pattern.source}. ` +
        "Essa operação é destrutiva e não pode ser executada via MCP."
      );
    }
  }
}

export const metadataTools = [
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
];

// ─────────────────────────────────────────────
//  Interfaces
// ─────────────────────────────────────────────

interface MetadataPayload {
  active: boolean;
  name?: string;
  collection?: string;
  when?: string;
  script?: string;
  action_insert?: boolean;
  action_update?: boolean;
  action_delete?: boolean;
  action_query?: boolean;
  condition?: string;
  api_name?: string;
  client_callable?: boolean;
  table?: string;
  type?: string;
  field_name?: string;
  short_description?: string;
  conditions?: string;
  run_type?: string;
}

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleMetadataTool(name: string, args: any) {
  const env = args.env || null;

  switch (name) {
    case "sn_upsert_metadata_script": {
      const { type, sys_id, ...data } = args;
      let finalTable = "";
      let payload: MetadataPayload = {
        active: data.active !== false
      };

      // Sanitize scripts before sending
      if (data.script) {
        sanitizeScript(data.script);
      }

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
      // Sanitize before execution
      sanitizeScript(args.script);
      logger.info("Executing remote script", { env: env || "default", scope: args.scope || "global", size: args.script.length });

      try {
        const { result } = await snPost("/api/x_dev_agent/script_runner/execute", {
          script: args.script,
          scope:  args.scope || "global",
        }, env);
        return result;
      } catch (err: any) {
        if (err.message && (err.message.includes("404") || err.message.includes("400"))) {
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

    default: return null;
  }
}
