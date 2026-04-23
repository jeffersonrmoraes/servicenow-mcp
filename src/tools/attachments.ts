import { snGet, snPostBinary, snGetBinary } from "../lib/client.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Attachment API
// ─────────────────────────────────────────────

export const attachmentTools = [
  {
    name: "sn_manage_attachment",
    description:
      "Gerencia anexos de registros ServiceNow. " +
      "action=upload: envia arquivo (Base64) como anexo. " +
      "action=list: lista anexos de um registro. " +
      "action=download: baixa conteúdo de um anexo em Base64.",
    inputSchema: {
      type: "object",
      properties: {
        env:               { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        action:            { type: "string", enum: ["upload", "list", "download"], description: "Operação a executar" },
        table_name:        { type: "string", description: "Tabela do registro — obrigatório para upload/list" },
        table_sys_id:      { type: "string", description: "sys_id do registro — obrigatório para upload/list" },
        file_name:         { type: "string", description: "Nome do arquivo com extensão — obrigatório para upload" },
        content_base64:    { type: "string", description: "Conteúdo em Base64 — obrigatório para upload" },
        content_type:      { type: "string", description: "MIME type (ex: application/pdf) — obrigatório para upload" },
        attachment_sys_id: { type: "string", description: "sys_id do anexo em sys_attachment — obrigatório para download" },
      },
      required: ["action"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLER
// ─────────────────────────────────────────────

export async function handleAttachmentTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  if (name !== "sn_manage_attachment") return null;

  switch (args.action) {
    case "upload": {
      const { table_name, table_sys_id, file_name, content_base64, content_type } = args;
      if (!table_name || !table_sys_id || !file_name || !content_base64 || !content_type) {
        throw new Error("upload requer: table_name, table_sys_id, file_name, content_base64, content_type.");
      }
      const buffer = Buffer.from(content_base64, "base64");
      const path =
        `/api/now/attachment/file` +
        `?table_name=${encodeURIComponent(table_name)}` +
        `&table_sys_id=${encodeURIComponent(table_sys_id)}` +
        `&file_name=${encodeURIComponent(file_name)}`;
      const { result } = await snPostBinary(path, buffer, content_type, env);
      return { sys_id: result.sys_id, file_name: result.file_name, content_type: result.content_type, size_bytes: result.size_bytes, download_link: result.download_link };
    }

    case "list": {
      const { table_name, table_sys_id } = args;
      if (!table_name || !table_sys_id) throw new Error("list requer: table_name, table_sys_id.");
      const { result } = await snGet("/api/now/attachment", {
        sysparm_query:  `table_name=${table_name}^table_sys_id=${table_sys_id}`,
        sysparm_fields: "sys_id,file_name,content_type,size_bytes,sys_created_on,download_link",
        sysparm_limit:  "50",
      }, env);
      return result;
    }

    case "download": {
      if (!args.attachment_sys_id) throw new Error("download requer: attachment_sys_id.");
      const metaRes = await snGet(`/api/now/attachment/${args.attachment_sys_id}`, {}, env);
      const meta = metaRes.result;
      const base64Content = await snGetBinary(`/api/now/attachment/${args.attachment_sys_id}/file`, env);
      return { sys_id: meta.sys_id, file_name: meta.file_name, content_type: meta.content_type, size_bytes: meta.size_bytes, content_base64: base64Content };
    }

    default:
      throw new Error(`action inválida: '${args.action}'. Use: upload, list, download.`);
  }
}
