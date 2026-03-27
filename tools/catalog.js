import { snGet, snPost, snPatch } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Service Catalog Consolidated (v3.0)
// ─────────────────────────────────────────────

export const catalogTools = [
  {
    name: "sn_manage_catalog_item",
    description: "Cria ou atualiza um item de catálogo no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:               { type: "string" },
        sys_id:            { type: "string", description: "Obrigatório para atualização" },
        name:              { type: "string" },
        short_description: { type: "string" },
        description:       { type: "string", description: "HTML suportado" },
        category:          { type: "string", description: "sys_id da categoria" },
        workflow:          { type: "string", description: "sys_id do workflow" },
        active:            { type: "boolean" },
        order:             { type: "number" },
        fulfillment_group: { type: "string", description: "sys_id do grupo" },
        delivery_time:     { type: "string", description: "Ex: 1 4 0" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_manage_catalog_variable",
    description: "Cria ou atualiza uma variável em um item de catálogo.",
    inputSchema: {
      type: "object",
      properties: {
        env:                 { type: "string" },
        sys_id:              { type: "string", description: "Obrigatório para atualização" },
        catalog_item_sys_id: { type: "string", description: "Obrigatório para criação" },
        name:                { type: "string" },
        question_text:       { type: "string" },
        type:                { type: "string", description: "1=Text, 2=Select, 3=MultiLine, 4=Reference, 5=CheckBox, 6=Date" },
        mandatory:           { type: "boolean" },
        active:              { type: "boolean" },
        order:               { type: "number" },
        default_value:       { type: "string" },
        help_text:           { type: "string" },
        reference_table:     { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_manage_catalog_category",
    description: "Cria ou atualiza uma categoria no Service Catalog.",
    inputSchema: {
      type: "object",
      properties: {
        env:         { type: "string" },
        sys_id:      { type: "string", description: "Para atualização" },
        title:       { type: "string" },
        description: { type: "string" },
        catalog:     { type: "string", description: "sys_id do catálogo pai" },
        active:      { type: "boolean" },
        order:       { type: "number" },
      },
      required: ["title"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleCatalogTool(name, args) {
  const env = args.env || null;

  if (name === "sn_manage_catalog_item") {
    const { sys_id, ...data } = args;
    const payload = {
      name:              data.name,
      short_description: data.short_description,
      description:       data.description || "",
      category:          data.category || "",
      workflow:          data.workflow || "",
      active:            data.active !== false,
      order:             data.order || 100,
      group:             data.fulfillment_group || "",
      delivery_time:     data.delivery_time || "",
    };

    if (sys_id) {
      const { result } = await snPatch(`/api/now/table/sc_cat_item/${sys_id}`, payload, env);
      return { action: "updated", sys_id: result.sys_id, name: result.name };
    } else {
      const { result } = await snPost("/api/now/table/sc_cat_item", payload, env);
      return { action: "created", sys_id: result.sys_id, name: result.name };
    }
  }

  if (name === "sn_manage_catalog_variable") {
    const { sys_id, ...data } = args;
    const payload = {
      cat_item:      data.catalog_item_sys_id,
      name:          data.name,
      question_text: data.question_text,
      type:          data.type,
      mandatory:     !!data.mandatory,
      active:        data.active !== false,
      order:         data.order || 100,
      default_value: data.default_value || "",
      help_text:     data.help_text || "",
      reference:     data.reference_table || "",
    };

    if (sys_id) {
      delete payload.cat_item; // Não se move variável de item via update simples
      const { result } = await snPatch(`/api/now/table/item_option_new/${sys_id}`, payload, env);
      return { action: "updated", sys_id: result.sys_id, name: result.name };
    } else {
      const { result } = await snPost("/api/now/table/item_option_new", payload, env);
      return { action: "created", sys_id: result.sys_id, name: result.name };
    }
  }

  if (name === "sn_manage_catalog_category") {
    const { sys_id, ...data } = args;
    const payload = {
      title:       data.title,
      description: data.description || "",
      sc_catalog:  data.catalog || "",
      active:      data.active !== false,
      order:       data.order || 100,
    };

    if (sys_id) {
      const { result } = await snPatch(`/api/now/table/sc_category/${sys_id}`, payload, env);
      return { action: "updated", sys_id: result.sys_id, title: result.title };
    } else {
      const { result } = await snPost("/api/now/table/sc_category", payload, env);
      return { action: "created", sys_id: result.sys_id, title: result.title };
    }
  }

  return null;
}
