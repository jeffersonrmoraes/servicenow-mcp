import { snGet, snPost, snPatch, snDelete } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Security Consolidated (v3.0)
// ─────────────────────────────────────────────

export const securityTools = [
  {
    name: "sn_manage_acl",
    description: "Gestão completa de ACLs (Access Control Rules) e suas roles associadas.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        action: { type: "string", enum: ["upsert", "delete", "list", "add_role", "remove_role"] },
        sys_id: { type: "string", description: "Obrigatório para action=delete, add_role, remove_role ou atualização em upsert" },
        name:      { type: "string", description: "Nome da ACL (ex: incident.caller_id)" },
        type:      { type: "string", enum: ["record", "client_callable_script_include", "soap", "rest"] },
        operation: { type: "string", enum: ["read", "write", "create", "delete", "execute"] },
        role:      { type: "string", description: "Role técnica (ex: itil)" },
        script:    { type: "string" },
        condition: { type: "string" },
        table:     { type: "string" },
        field:     { type: "string" },
        active:    { type: "boolean" },
        limit:     { type: "number" },
      },
      required: ["action"],
    },
  },
  {
    name: "sn_manage_notification",
    description: "Gestão de notificações de email.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        action: { type: "string", enum: ["upsert", "list"] },
        sys_id: { type: "string", description: "Para atualização" },
        name:           { type: "string" },
        table:          { type: "string" },
        subject:        { type: "string" },
        body_html:      { type: "string" },
        event_name:     { type: "string" },
        condition:      { type: "string" },
        recipients:     { type: "string", description: "sys_ids de usuários/grupos" },
        send_to_event:  { type: "boolean" },
        active:         { type: "boolean" },
        limit:          { type: "number" },
      },
      required: ["action"],
    },
  },
  {
    name: "sn_manage_access",
    description: "Gestão de Roles, Grupos e Acessos de Usuários.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string" },
        type:   { type: "string", enum: ["role", "group_member", "user_role"] },
        action: { type: "string", enum: ["create", "add", "remove", "list"] },
        name:        { type: "string", description: "Nome da Role ou do Grupo" },
        user_name:   { type: "string", description: "ID do usuário (username)" },
        role_name:   { type: "string", description: "Nome técnico da Role" },
        group_name:  { type: "string", description: "Nome amigável do Grupo" },
        description: { type: "string" },
      },
      required: ["type", "action"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleSecurityTool(name, args) {
  const env = args.env || null;

  if (name === "sn_manage_acl") {
    const { action, sys_id, ...data } = args;

    switch (action) {
      case "upsert": {
        const payload = {
          name:      data.name,
          type:      data.type || "record",
          operation: data.operation || "read",
          object:    data.table || "",
          field:     data.field || "",
          active:    data.active !== false,
          script:    data.script || "",
          condition: data.condition || "",
        };
        // Se tem sys_id, é PATCH, senão é POST
        if (sys_id) {
          const { result } = await snPatch(`/api/now/table/sys_security_acl/${sys_id}`, payload, env);
          return { action: "updated", sys_id: result.sys_id, name: result.name };
        } else {
          const { result } = await snPost("/api/now/table/sys_security_acl", payload, env);
          return { action: "created", sys_id: result.sys_id, name: result.name };
        }
      }

      case "delete":
        await snDelete(`/api/now/table/sys_security_acl/${sys_id}`, env);
        return { action: "deleted", sys_id };

      case "list": {
        let query = `object=${data.table}`;
        if (data.field)     query += `^field=${data.field}`;
        const { result } = await snGet("/api/now/table/sys_security_acl", {
          sysparm_query: query,
          sysparm_limit: data.limit || 20,
        }, env);
        return result;
      }

      case "add_role": {
        const roleData = await snGet("/api/now/table/sys_user_role", { sysparm_query: `name=${data.role}`, sysparm_limit: 1 }, env);
        if (!roleData.result?.length) throw new Error(`Role '${data.role}' não encontrada`);
        const { result } = await snPost("/api/now/table/sys_security_acl_role", {
          sys_security_acl: sys_id,
          sys_user_role:    roleData.result[0].sys_id,
        }, env);
        return { action: "role_added", sys_id: result.sys_id };
      }

      case "remove_role": {
        const roleData = await snGet("/api/now/table/sys_user_role", { sysparm_query: `name=${data.role}`, sysparm_limit: 1 }, env);
        if (!roleData.result?.length) throw new Error(`Role '${data.role}' não encontrada`);
        const relData = await snGet("/api/now/table/sys_security_acl_role", {
          sysparm_query: `sys_security_acl=${sys_id}^sys_user_role=${roleData.result[0].sys_id}`,
          sysparm_limit: 1
        }, env);
        if (!relData.result?.length) throw new Error(`Relação não encontrada`);
        await snDelete(`/api/now/table/sys_security_acl_role/${relData.result[0].sys_id}`, env);
        return { action: "role_removed", acl_sys_id: sys_id };
      }
    }
  }

  if (name === "sn_manage_notification") {
    const { action, sys_id, ...data } = args;
    if (action === "upsert") {
      const payload = {
        name:            data.name,
        collection:      data.table,
        subject:         data.subject,
        message_html:    data.body_html,
        event_name:      data.event_name || "",
        condition:       data.condition || "",
        active:          data.active !== false,
      };
      if (sys_id) {
        const { result } = await snPatch(`/api/now/table/sysevent_email_action/${sys_id}`, payload, env);
        return { action: "updated", sys_id: result.sys_id, name: result.name };
      } else {
        const { result } = await snPost("/api/now/table/sysevent_email_action", payload, env);
        return { action: "created", sys_id: result.sys_id, name: result.name };
      }
    } else if (action === "list") {
      const { result } = await snGet("/api/now/table/sysevent_email_action", {
        sysparm_query: `collection=${data.table}`,
        sysparm_limit: data.limit || 20,
      }, env);
      return result;
    }
  }

  if (name === "sn_manage_access") {
    const { type, action, ...data } = args;

    if (type === "role" && action === "create") {
      const { result } = await snPost("/api/now/table/sys_user_role", { name: data.name, description: data.description || "" }, env);
      return result;
    }

    if (type === "group_member") {
      const group = await snGet("/api/now/table/sys_user_group", { sysparm_query: `name=${data.group_name}`, sysparm_limit: 1 }, env);
      if (!group.result?.length) throw new Error(`Grupo '${data.group_name}' não encontrado`);
      const user  = await snGet("/api/now/table/sys_user", { sysparm_query: `user_name=${data.user_name}`, sysparm_limit: 1 }, env);
      if (!user.result?.length) throw new Error(`Usuário '${data.user_name}' não encontrado`);

      if (action === "add") {
        const { result } = await snPost("/api/now/table/sys_user_grmember", { group: group.result[0].sys_id, user: user.result[0].sys_id }, env);
        return result;
      } else if (action === "remove") {
        const rel = await snGet("/api/now/table/sys_user_grmember", { sysparm_query: `group=${group.result[0].sys_id}^user=${user.result[0].sys_id}`, sysparm_limit: 1 }, env);
        if (!rel.result?.length) throw new Error(`Membro '${data.user_name}' não pertence ao grupo '${data.group_name}'`);
        await snDelete(`/api/now/table/sys_user_grmember/${rel.result[0].sys_id}`, env);
        return { action: "removed", user: data.user_name, group: data.group_name };
      } else if (action === "list") {
        const { result } = await snGet("/api/now/table/sys_user_grmember", { sysparm_query: `group=${group.result[0].sys_id}`, sysparm_fields: "user.user_name,user.name" }, env);
        return result;
      }
    }

    if (type === "user_role" && action === "add") {
      const user = await snGet("/api/now/table/sys_user", { sysparm_query: `user_name=${data.user_name}`, sysparm_limit: 1 }, env);
      if (!user.result?.length) throw new Error(`Usuário '${data.user_name}' não encontrado`);
      const role = await snGet("/api/now/table/sys_user_role", { sysparm_query: `name=${data.role_name}`, sysparm_fields: "sys_id", sysparm_limit: 1 }, env);
      if (!role.result?.length) throw new Error(`Role '${data.role_name}' não encontrada`);
      const { result } = await snPost("/api/now/table/sys_user_has_role", { user: user.result[0].sys_id, role: role.result[0].sys_id }, env);
      return result;
    }
  }

  return null;
}
