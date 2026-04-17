import { upsertRecord } from "../lib/helpers.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Frontend & User Experience (v3.1)
// ─────────────────────────────────────────────

export const frontendTools = [
  {
    name: "sn_manage_widget",
    description: "Cria ou atualiza um Service Portal Widget.",
    inputSchema: {
      type: "object",
      properties: {
        env:           { type: "string" },
        sys_id:        { type: "string", description: "Obrigatório para atualização" },
        name:          { type: "string", description: "Nome legível do Widget" },
        id:            { type: "string", description: "ID único do widget (ex: my_cool_widget)" },
        template:      { type: "string", description: "HTML Template" },
        css:           { type: "string", description: "CSS / SCSS" },
        script:        { type: "string", description: "Server-side script" },
        client_script: { type: "string", description: "Client-side controller" },
        public:        { type: "boolean", default: false },
        data_table:    { type: "string", description: "Tabela de dados associada (opcional)" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_manage_ui_action",
    description: "Cria ou atualiza um botão (UI Action) em formulários ou listas.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string" },
        sys_id:    { type: "string", description: "Obrigatório para atualização" },
        name:      { type: "string", description: "Label do botão" },
        table:     { type: "string", description: "Tabela alvo (ex: incident)" },
        action_name: { type: "string", description: "Nome técnico da ação" },
        client:    { type: "boolean", default: false },
        onclick:   { type: "string", description: "Função client-side (se client=true)" },
        condition: { type: "string", description: "Condição de visibilidade" },
        script:    { type: "string", description: "Script server-side" },
        form_button:        { type: "boolean", default: true },
        form_context_menu:  { type: "boolean", default: false },
        list_banner_button: { type: "boolean", default: false },
        active:    { type: "boolean", default: true },
      },
      required: ["name", "table"],
    },
  },
  {
    name: "sn_manage_ui_page",
    description: "Cria ou atualiza uma UI Page customizada.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        sys_id: { type: "string", description: "Obrigatório para atualização" },
        name:   { type: "string", description: "Nome da página (ex: my_custom_page.do)" },
        html:   { type: "string", description: "XHTML / HTML" },
        client_script:     { type: "string" },
        processing_script: { type: "string" },
        description:       { type: "string" },
      },
      required: ["name"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleFrontendTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  if (name === "sn_manage_widget") {
    const { sys_id, ...data } = args;
    return upsertRecord("sp_widget", sys_id, {
      name:          data.name,
      id:            data.id || data.name.toLowerCase().replace(/\s+/g, "_"),
      template:      data.template || "<div>New Widget Content</div>",
      css:           data.css || "",
      script:        data.script || "(function() { \n\n })();",
      client_script: data.client_script || "api.controller=function() { \n var c = this; \n };",
      public:        !!data.public,
      data_table:    data.data_table || "",
    }, env, ["name", "id"]);
  }

  if (name === "sn_manage_ui_action") {
    const { sys_id, ...data } = args;
    return upsertRecord("sys_ui_action", sys_id, {
      name:               data.name,
      table:              data.table,
      action_name:        data.action_name || data.name.toLowerCase().replace(/\s+/g, "_"),
      client:             !!data.client,
      onclick:            data.onclick || "",
      condition:          data.condition || "",
      script:             data.script || "current.update();",
      form_button:        data.form_button !== false,
      form_context_menu:  !!data.form_context_menu,
      list_banner_button: !!data.list_banner_button,
      active:             data.active !== false,
    }, env, ["name"]);
  }

  if (name === "sn_manage_ui_page") {
    const { sys_id, ...data } = args;
    return upsertRecord("sys_ui_page", sys_id, {
      name:              data.name,
      html:              data.html || "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<j:jelly ... />",
      client_script:     data.client_script || "",
      processing_script: data.processing_script || "",
      description:       data.description || "",
    }, env, ["name"]);
  }

  return null;
}
