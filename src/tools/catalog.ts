import { upsertRecord } from "../lib/helpers.js";
import { snGet, snPost, snPatch } from "../lib/client.js";
import { validateSysId } from "../lib/validate.js";
import { ServiceNowEnv } from "../types.js";

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
        type:                { type: "string", description: "Tipo da variável: 1=Yes/No, 2=Multi Line Text, 3=Multiple Choice, 4=Numeric Scale, 5=Select Box, 6=Single Line Text, 7=CheckBox, 8=Reference, 9=Date, 10=Date/Time, 16=Wide Single Line Text, 18=Lookup Select Box" },
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
    name: "sn_manage_catalog_choice",
    description: "Gerencia choices (opções de dropdown) de variáveis Select Box em catalog items. Tabela question_choice — use o sys_id da variável (item_option_new), não do catalog item.",
    inputSchema: {
      type: "object",
      properties: {
        env:             { type: "string" },
        action:          { type: "string", enum: ["add", "list", "deactivate"], description: "add=cria choice, list=lista choices, deactivate=desativa por value" },
        variable_sys_id: { type: "string", description: "sys_id da variável Select Box (item_option_new) — obrigatório para todas as actions" },
        label:           { type: "string", description: "Texto exibido ao usuário (campo 'text' na tabela)" },
        value:           { type: "string", description: "Valor armazenado" },
        sequence:        { type: "number", description: "Ordem de exibição (campo 'order', default 100)" },
      },
      required: ["action", "variable_sys_id"],
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

export async function handleCatalogTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  if (name === "sn_manage_catalog_item") {
    const { sys_id, ...data } = args;
    return upsertRecord("sc_cat_item", sys_id, {
      name:              data.name,
      short_description: data.short_description,
      description:       data.description || "",
      category:          data.category || "",
      workflow:          data.workflow || "",
      active:            data.active ?? true,
      order:             data.order || 100,
      group:             data.fulfillment_group || "",
      delivery_time:     data.delivery_time || "",
    }, env, ["name"], sys_id ? undefined : { name: data.name });
  }

  if (name === "sn_manage_catalog_variable") {
    const { sys_id, ...data } = args;
    const payload: Record<string, any> = {
      name:          data.name,
      question_text: data.question_text,
      type:          data.type,
      mandatory:     !!data.mandatory,
      active:        data.active ?? true,
      order:         data.order || 100,
      default_value: data.default_value || "",
      help_text:     data.help_text || "",
      reference:     data.reference_table || "",
    };
    // cat_item só vai no POST (criação) — não pode ser movido via update
    if (!sys_id) payload.cat_item = data.catalog_item_sys_id;
    // findBy inclui cat_item para isolar o lookup ao catalog item correto
    const findBy = (!sys_id && data.catalog_item_sys_id)
      ? { name: data.name, cat_item: data.catalog_item_sys_id }
      : undefined;
    return upsertRecord("item_option_new", sys_id, payload, env, ["name"], findBy);
  }

  if (name === "sn_manage_catalog_choice") {
    // question_choice é a tabela correta para choices de variáveis Select Box (item_option_new)
    // sc_choice é bloqueado via REST em muitas instâncias. question.value = sys_id do item_option_new.
    const { action, variable_sys_id, label, value, sequence } = args;

    if (action === "list") {
      if (!variable_sys_id) throw new Error("variable_sys_id é obrigatório para action=list.");
      const { result } = await snGet("/api/now/table/question_choice", {
        sysparm_query:   `question=${variable_sys_id}^inactive=false`,
        sysparm_fields:  "sys_id,text,value,order,inactive",
        sysparm_limit:   50,
        sysparm_orderby: "order",
      }, env);
      return result;
    }

    if (action === "add") {
      if (!variable_sys_id) throw new Error("variable_sys_id é obrigatório para action=add.");
      if (!label || !value) throw new Error("label e value são obrigatórios para action=add.");

      // Upsert: verifica se choice com mesmo value já existe para esta variável
      const { result: existing } = await snGet("/api/now/table/question_choice", {
        sysparm_query:  `question=${variable_sys_id}^value=${value}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, env);

      if (existing?.length) {
        const { result } = await snPatch(`/api/now/table/question_choice/${existing[0].sys_id}`, {
          text: label, order: sequence ?? 100, inactive: false,
        }, env);
        return { action: "updated", sys_id: result.sys_id, text: result.text, value: result.value };
      }

      const { result } = await snPost("/api/now/table/question_choice", {
        question: variable_sys_id,
        text:     label,
        value,
        order:    sequence ?? 100,
        inactive: false,
      }, env);
      return { action: "created", sys_id: result.sys_id, text: result.text, value: result.value };
    }

    if (action === "deactivate") {
      if (!value) throw new Error("value é obrigatório para action=deactivate.");
      if (!variable_sys_id) throw new Error("variable_sys_id é obrigatório para action=deactivate.");
      const { result: found } = await snGet("/api/now/table/question_choice", {
        sysparm_query:  `question=${variable_sys_id}^value=${value}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, env);
      if (!found?.length) throw new Error(`Choice value='${value}' não encontrada para esta variável.`);
      await snPatch(`/api/now/table/question_choice/${found[0].sys_id}`, { inactive: true }, env);
      return { action: "deactivated", value };
    }

    throw new Error(`action inválido: ${action}`);
  }

  if (name === "sn_manage_catalog_category") {
    const { sys_id, ...data } = args;
    return upsertRecord("sc_category", sys_id, {
      title:       data.title,
      description: data.description || "",
      sc_catalog:  data.catalog || "",
      active:      data.active ?? true,
      order:       data.order || 100,
    }, env, ["title"]);
  }

  return null;
}
