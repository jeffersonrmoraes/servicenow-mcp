import { snGet, snPost, snPatch, getContext } from "../lib/client.js";
import { validateTableName, validateLimit, validateEncodedQuery } from "../lib/validate.js";
import { upsertRecord, encodeQueryParam } from "../lib/helpers.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Extras (v4.2)
// ─────────────────────────────────────────────

export const extraTools = [
  // ── Health Check ──────────────────────────────
  {
    name: "sn_health_check",
    description: "Testa a conectividade com a instância ServiceNow e retorna informações básicas do ambiente (versão, instância, usuário autenticado). Útil para diagnóstico de configuração.",
    inputSchema: {
      type: "object",
      properties: {
        env: { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
      },
    },
  },

  // ── Choice Lists (sys_choice) ─────────────────
  {
    name: "sn_manage_choice",
    description: "Gerencia opções de campos do tipo Choice (sys_choice). Permite listar, criar ou atualizar opções de um campo específico.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        action: { type: "string", enum: ["list", "upsert"], description: "list = listar opções; upsert = criar ou atualizar" },
        sys_id: { type: "string", description: "sys_id da choice para atualização" },
        table:  { type: "string", description: "Tabela que contém o campo (ex: incident)" },
        field:  { type: "string", description: "Nome do campo (ex: priority)" },
        value:  { type: "string", description: "Valor interno da opção (ex: 1)" },
        label:  { type: "string", description: "Label exibido ao usuário (ex: Critical)" },
        sequence: { type: "number", description: "Ordem de exibição" },
        inactive: { type: "boolean", description: "true = opção desabilitada" },
        language: { type: "string", description: "Idioma (default: pt_BR)" },
        limit:  { type: "number" },
      },
      required: ["action", "table", "field"],
    },
  },

  // ── Export Records ────────────────────────────
  {
    name: "sn_export_records",
    description: "Exporta registros de uma tabela em formato JSON ou CSV. Útil para migração de dados e backup.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        table:  { type: "string", description: "Tabela a exportar (ex: incident)" },
        query:  { type: "string", description: "Encoded query para filtrar registros" },
        fields: { type: "string", description: "Campos a incluir, separados por vírgula" },
        limit:  { type: "number", description: "Máximo de registros (default: 100, máx: 1000)" },
        format: { type: "string", enum: ["json", "csv"], description: "Formato de saída (default: json)" },
      },
      required: ["table"],
    },
  },

  // ── Email Templates ───────────────────────────
  {
    name: "sn_manage_email_template",
    description: "Gerencia templates de email reutilizáveis (sys_email_template). Permite criar, atualizar e listar templates.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        action: { type: "string", enum: ["upsert", "list", "get"] },
        sys_id: { type: "string", description: "Para atualização ou busca por sys_id" },
        name:   { type: "string", description: "Nome do template" },
        subject:    { type: "string", description: "Assunto do email (suporta variáveis ${field})" },
        body_html:  { type: "string", description: "Corpo HTML do email" },
        body_text:  { type: "string", description: "Corpo texto plano do email" },
        importance: { type: "string", enum: ["low", "normal", "high"], description: "Prioridade do email" },
        active:     { type: "boolean" },
        limit:      { type: "number" },
      },
      required: ["action"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleExtraTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  // ── sn_health_check ──────────────────────────
  if (name === "sn_health_check") {
    const ctx = getContext(env);
    const start = Date.now();

    // Testa com query mínima no sys_user para verificar conectividade
    const { result } = await snGet("/api/now/table/sys_user", {
      sysparm_query:  `user_name=${encodeQueryParam(ctx.user)}`,
      sysparm_fields: "user_name,name,email",
      sysparm_limit:  1,
    }, env);

    // Busca versão da instância
    let version = "unknown";
    try {
      const verResp = await snGet("/api/now/table/sys_properties", {
        sysparm_query:  "name=glide.war",
        sysparm_fields: "value",
        sysparm_limit:  1,
      }, env);
      version = verResp.result?.[0]?.value || "unknown";
    } catch {}

    return {
      status:        "connected",
      instance:      ctx.instance,
      user:          result?.[0]?.name || ctx.user,
      user_name:     result?.[0]?.user_name || ctx.user,
      email:         result?.[0]?.email || null,
      version,
      latency_ms:    Date.now() - start,
      env:           env || "default",
    };
  }

  // ── sn_manage_choice ─────────────────────────
  if (name === "sn_manage_choice") {
    const { action, sys_id, ...data } = args;
    validateTableName(data.table);

    if (action === "list") {
      const limit = data.limit ? validateLimit(data.limit) : 50;
      const query = `name=${encodeQueryParam(data.table)}^element=${encodeQueryParam(data.field)}` +
        (data.language ? `^language=${encodeQueryParam(data.language)}` : "^language=pt_BR^ORlanguage=en");
      const { result } = await snGet("/api/now/table/sys_choice", {
        sysparm_query:  query,
        sysparm_fields: "sys_id,value,label,sequence,inactive,language",
        sysparm_limit:  limit,
        sysparm_orderby: "sequence",
      }, env);
      return result;
    }

    if (action === "upsert") {
      return upsertRecord("sys_choice", sys_id, {
        name:     data.table,
        element:  data.field,
        value:    data.value,
        label:    data.label,
        sequence: data.sequence ?? 100,
        inactive: !!data.inactive,
        language: data.language || "pt_BR",
      }, env, ["value", "label"]);
    }
  }

  // ── sn_export_records ─────────────────────────
  if (name === "sn_export_records") {
    validateTableName(args.table);
    const query  = validateEncodedQuery(args.query);
    const limit  = args.limit ? validateLimit(args.limit) : 100;
    const format = args.format || "json";

    const { result } = await snGet(`/api/now/table/${args.table}`, {
      sysparm_limit:  limit,
      sysparm_offset: 0,
      ...(query       && { sysparm_query:  query       }),
      ...(args.fields && { sysparm_fields: args.fields }),
    }, env);

    if (format === "csv") {
      if (!result || result.length === 0) return { format: "csv", data: "", count: 0 };
      const headers = Object.keys(result[0]);
      const rows    = result.map((r: any) =>
        headers.map(h => {
          const v = String(r[h] ?? "").replace(/"/g, '""');
          return v.includes(",") || v.includes("\n") ? `"${v}"` : v;
        }).join(",")
      );
      return {
        format:  "csv",
        count:   result.length,
        data:    [headers.join(","), ...rows].join("\n"),
      };
    }

    return { format: "json", count: result.length, data: result };
  }

  // ── sn_manage_email_template ──────────────────
  if (name === "sn_manage_email_template") {
    const { action, sys_id, ...data } = args;

    if (action === "get") {
      if (sys_id) {
        const { result } = await snGet(`/api/now/table/sys_email_template/${sys_id}`, {}, env);
        return result;
      }
      if (data.name) {
        const { result } = await snGet("/api/now/table/sys_email_template", {
          sysparm_query: `name=${encodeQueryParam(data.name)}`,
          sysparm_limit: 1,
        }, env);
        if (!result?.length) throw new Error(`Template '${data.name}' não encontrado.`);
        return result[0];
      }
      throw new Error("Informe sys_id ou name para action=get.");
    }

    if (action === "list") {
      const limit = data.limit ? validateLimit(data.limit) : 20;
      const { result } = await snGet("/api/now/table/sys_email_template", {
        sysparm_query:  "nameISNOTEMPTY",
        sysparm_fields: "sys_id,name,subject,active,sys_updated_on",
        sysparm_limit:  limit,
        sysparm_orderby: "name",
      }, env);
      return result;
    }

    if (action === "upsert") {
      const importanceMap: Record<string, string> = { low: "3", normal: "2", high: "1" };
      return upsertRecord("sys_email_template", sys_id, {
        name:        data.name,
        subject:     data.subject || "",
        message_html: data.body_html || "",
        message:     data.body_text || "",
        importance:  importanceMap[data.importance || "normal"] || "2",
        active:      data.active ?? true,
      }, env, ["name", "subject"]);
    }
  }

  return null;
}
