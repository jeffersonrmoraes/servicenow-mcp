import { snGet, snDelete, snPostBinary, snGetBinary } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Attachment API
// ─────────────────────────────────────────────

export const attachmentTools = [
  {
    name: "sn_upload_attachment",
    description: "Faz upload de um arquivo (em Base64) como anexo em qualquer registro do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:            { type: "string",  description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table_name:     { type: "string",  description: "Tabela do registro (ex: incident)" },
        table_sys_id:   { type: "string",  description: "sys_id do registro que receberá o anexo" },
        file_name:      { type: "string",  description: "Nome do arquivo com extensão (ex: relatorio.pdf)" },
        content_base64: { type: "string",  description: "Conteúdo do arquivo codificado em Base64" },
        content_type:   { type: "string",  description: "MIME type (ex: application/pdf, image/png, text/plain)" },
      },
      required: ["table_name", "table_sys_id", "file_name", "content_base64", "content_type"],
    },
  },
  {
    name: "sn_list_attachments",
    description: "Lista todos os anexos de um registro específico do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:          { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table_name:   { type: "string", description: "Tabela do registro (ex: incident)" },
        table_sys_id: { type: "string", description: "sys_id do registro" },
      },
      required: ["table_name", "table_sys_id"],
    },
  },
  {
    name: "sn_download_attachment",
    description: "Baixa o conteúdo de um anexo do ServiceNow e retorna em Base64.",
    inputSchema: {
      type: "object",
      properties: {
        env:               { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        attachment_sys_id: { type: "string", description: "sys_id do registro na tabela sys_attachment" },
      },
      required: ["attachment_sys_id"],
    },
  },
  {
    name: "sn_delete_attachment",
    description: "Remove um anexo do ServiceNow pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:               { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        attachment_sys_id: { type: "string", description: "sys_id do anexo a ser removido" },
      },
      required: ["attachment_sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLER
// ─────────────────────────────────────────────

import { ServiceNowEnv } from "../types.js";

export async function handleAttachmentTool(name: string, args: any) {
  const env = args.env || null;

  // ── Upload ───────────────────────────────────
  if (name === "sn_upload_attachment") {
    const { table_name, table_sys_id, file_name, content_base64, content_type } = args;

    // Decodifica Base64 → Buffer binário para envio
    const binaryBuffer = Buffer.from(content_base64, "base64");

    const path =
      `/api/now/attachment/file` +
      `?table_name=${encodeURIComponent(table_name)}` +
      `&table_sys_id=${encodeURIComponent(table_sys_id)}` +
      `&file_name=${encodeURIComponent(file_name)}`;

    const { result } = await snPostBinary(path, binaryBuffer, content_type, env);
    return {
      sys_id:       result.sys_id,
      file_name:    result.file_name,
      content_type: result.content_type,
      size_bytes:   result.size_bytes,
      download_link: result.download_link,
    };
  }

  // ── Listar anexos ────────────────────────────
  if (name === "sn_list_attachments") {
    const { table_name, table_sys_id } = args;
    const { result } = await snGet(
      `/api/now/attachment`,
      {
        sysparm_query:  `table_name=${table_name}^table_sys_id=${table_sys_id}`,
        sysparm_fields: "sys_id,file_name,content_type,size_bytes,sys_created_on,download_link",
        sysparm_limit:  "50",
      },
      env
    );
    return result;
  }

  // ── Download ─────────────────────────────────
  if (name === "sn_download_attachment") {
    const { attachment_sys_id } = args;

    // Primeiro busca os metadados para obter file_name e content_type
    const metaRes = await snGet(`/api/now/attachment/${attachment_sys_id}`, {}, env);
    const meta = metaRes.result;

    // Baixa o conteúdo binário
    const base64Content = await snGetBinary(
      `/api/now/attachment/${attachment_sys_id}/file`,
      env
    );

    return {
      sys_id:         meta.sys_id,
      file_name:      meta.file_name,
      content_type:   meta.content_type,
      size_bytes:     meta.size_bytes,
      content_base64: base64Content,
    };
  }

  // ── Delete ───────────────────────────────────
  if (name === "sn_delete_attachment") {
    return snDelete(`/api/now/attachment/${args.attachment_sys_id}`, env);
  }

  return null;
}
