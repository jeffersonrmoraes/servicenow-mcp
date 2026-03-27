import { snGet, snPost, snPatch, snDelete } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — ACLs e Segurança
// ─────────────────────────────────────────────

export const aclTools = [
  {
    name: "sn_create_acl",
    description: "Cria uma ACL (Access Control Rule) no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:      { type: "string", description: "Nome da ACL (ex: incident.caller_id)" },
        type:      { type: "string", enum: ["record", "client_callable_script_include", "soap", "rest"] },
        operation: { type: "string", enum: ["read", "write", "create", "delete", "execute"] },
        role:      { type: "string", description: "Role necessária (ex: itil, admin)" },
        script:    { type: "string", description: "Script de validação adicional (opcional)" },
        condition: { type: "string" },
        table:     { type: "string", description: "Tabela alvo (para type=record)" },
        field:     { type: "string", description: "Campo específico (opcional)" },
        active:    { type: "boolean" },
      },
      required: ["name", "type", "operation"],
    },
  },
  {
    name: "sn_update_acl",
    description: "Atualiza uma ACL existente.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:    { type: "string" },
        role:      { type: "string" },
        script:    { type: "string" },
        condition: { type: "string" },
        active:    { type: "boolean" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_delete_acl",
    description: "Remove uma ACL pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id: { type: "string" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_list_acls",
    description: "Lista ACLs de uma tabela ou campo específico.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:     { type: "string" },
        field:     { type: "string" },
        operation: { type: "string", enum: ["read", "write", "create", "delete", "execute"] },
        limit:     { type: "number" },
      },
      required: ["table"],
    },
  },
  {
    name: "sn_add_role_to_acl",
    description: "Adiciona uma role a uma ACL existente.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        acl_sys_id: { type: "string" },
        role_name:  { type: "string" },
      },
      required: ["acl_sys_id", "role_name"],
    },
  },
  {
    name: "sn_remove_role_from_acl",
    description: "Remove uma role de uma ACL existente.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        acl_sys_id: { type: "string" },
        role_name:  { type: "string" },
      },
      required: ["acl_sys_id", "role_name"],
    },
  },
];

// ─────────────────────────────────────────────
//  TOOLS — Notifications (NOVO)
// ─────────────────────────────────────────────

export const notificationTools = [
  {
    name: "sn_create_notification",
    description: "Cria uma notificação de email no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:           { type: "string" },
        table:          { type: "string", description: "Tabela que dispara a notificação (ex: incident)" },
        subject:        { type: "string", description: "Assunto do email" },
        body_html:      { type: "string", description: "Corpo do email em HTML" },
        event_name:     { type: "string", description: "Nome do evento que dispara (opcional)" },
        condition:      { type: "string", description: "Condição encoded (opcional)" },
        recipients:     { type: "string", description: "sys_id de usuários/grupos (separados por vírgula)" },
        send_to_event:  { type: "boolean", description: "Enviar para o criador do evento" },
        active:         { type: "boolean" },
      },
      required: ["name", "table", "subject", "body_html"],
    },
  },
  {
    name: "sn_update_notification",
    description: "Atualiza uma notificação existente.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:    { type: "string" },
        subject:   { type: "string" },
        body_html: { type: "string" },
        condition: { type: "string" },
        active:    { type: "boolean" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_list_notifications",
    description: "Lista notificações de uma tabela.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string" },
        limit: { type: "number" },
      },
      required: ["table"],
    },
  },
];

// ─────────────────────────────────────────────
//  TOOLS — Roles e Grupos (NOVO)
// ─────────────────────────────────────────────

export const roleTools = [
  {
    name: "sn_create_role",
    description: "Cria uma nova role no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:        { type: "string", description: "Nome técnico da role (ex: x_app.manager)" },
        description: { type: "string" },
        suffix:      { type: "string", description: "Sufixo da role (para scoped apps)" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_add_user_to_group",
    description: "Adiciona um usuário a um grupo.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        group_name: { type: "string", description: "Nome do grupo (ex: Service Desk)" },
        user_name:  { type: "string", description: "Username do usuário" },
      },
      required: ["group_name", "user_name"],
    },
  },
  {
    name: "sn_remove_user_from_group",
    description: "Remove um usuário de um grupo.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        group_name: { type: "string" },
        user_name:  { type: "string" },
      },
      required: ["group_name", "user_name"],
    },
  },
  {
    name: "sn_assign_role_to_user",
    description: "Atribui uma role a um usuário.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        user_name: { type: "string" },
        role_name: { type: "string" },
      },
      required: ["user_name", "role_name"],
    },
  },
  {
    name: "sn_list_group_members",
    description: "Lista os membros de um grupo.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        group_name: { type: "string" },
      },
      required: ["group_name"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — ACLs
// ─────────────────────────────────────────────

export async function handleAclTool(name, args) {
  switch (name) {

    case "sn_create_acl": {
      const data = await snPost("/api/now/table/sys_security_acl", {
        name:      args.name,
        type:      args.type,
        operation: args.operation,
        role:      args.role || "",
        script:    args.script || "",
        condition: args.condition || "",
        object:    args.table || "",
        field:     args.field || "",
        active:    args.active !== false,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_update_acl": {
      const payload = {};
      if (args.role      !== undefined) payload.role      = args.role;
      if (args.script    !== undefined) payload.script    = args.script;
      if (args.condition !== undefined) payload.condition = args.condition;
      if (args.active    !== undefined) payload.active    = args.active;
      const data = await snPatch(`/api/now/table/sys_security_acl/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
    }

    case "sn_delete_acl": {
      const result = await snDelete(`/api/now/table/sys_security_acl/${args.sys_id}`, args.env);
      return { ...result, sys_id: args.sys_id };
    }

    case "sn_list_acls": {
      let query = `object=${args.table}`;
      if (args.field)     query += `^field=${args.field}`;
      if (args.operation) query += `^operation=${args.operation}`;
      const data = await snGet("/api/now/table/sys_security_acl", {
        sysparm_query:  query,
        sysparm_fields: "sys_id,name,type,operation,role,active,object,field",
        sysparm_limit:  args.limit || 50,
      }, args.env);
      return data.result;
    }

    case "sn_add_role_to_acl": {
      const roleData = await snGet("/api/now/table/sys_user_role", {
        sysparm_query:  `name=${args.role_name}`,
        sysparm_fields: "sys_id,name",
        sysparm_limit:  1,
      }, args.env);
      if (!roleData.result?.length) throw new Error(`Role '${args.role_name}' não encontrada`);
      const data = await snPost("/api/now/table/sys_security_acl_role", {
        sys_security_acl: args.acl_sys_id,
        sys_user_role:    roleData.result[0].sys_id,
      }, args.env);
      return { sys_id: data.result.sys_id, role: args.role_name, acl: args.acl_sys_id };
    }

    case "sn_remove_role_from_acl": {
      const roleData = await snGet("/api/now/table/sys_user_role", {
        sysparm_query:  `name=${args.role_name}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, args.env);
      if (!roleData.result?.length) throw new Error(`Role '${args.role_name}' não encontrada`);
      const relData = await snGet("/api/now/table/sys_security_acl_role", {
        sysparm_query: `sys_security_acl=${args.acl_sys_id}^sys_user_role=${roleData.result[0].sys_id}`,
        sysparm_limit: 1,
      }, args.env);
      if (!relData.result?.length) throw new Error(`Role '${args.role_name}' não está associada a esta ACL`);
      const result = await snDelete(`/api/now/table/sys_security_acl_role/${relData.result[0].sys_id}`, args.env);
      return { ...result, role: args.role_name, acl: args.acl_sys_id };
    }

    default: return null;
  }
}

// ─────────────────────────────────────────────
//  HANDLERS — Notifications
// ─────────────────────────────────────────────

export async function handleNotificationTool(name, args) {
  switch (name) {

    case "sn_create_notification": {
      const data = await snPost("/api/now/table/sysevent_email_action", {
        name:                  args.name,
        collection:            args.table,
        subject:               args.subject,
        message_html:          args.body_html,
        event_name:            args.event_name || "",
        condition:             args.condition || "",
        recipient_users:       args.recipients || "",
        send_self:             args.send_to_event || false,
        active:                args.active !== false,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_update_notification": {
      const payload = {};
      if (args.subject   !== undefined) payload.subject      = args.subject;
      if (args.body_html !== undefined) payload.message_html = args.body_html;
      if (args.condition !== undefined) payload.condition    = args.condition;
      if (args.active    !== undefined) payload.active       = args.active;
      const data = await snPatch(`/api/now/table/sysevent_email_action/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
    }

    case "sn_list_notifications": {
      const data = await snGet("/api/now/table/sysevent_email_action", {
        sysparm_query:  `collection=${args.table}`,
        sysparm_fields: "sys_id,name,subject,active,event_name",
        sysparm_limit:  args.limit || 20,
      }, args.env);
      return data.result;
    }

    default: return null;
  }
}

// ─────────────────────────────────────────────
//  HANDLERS — Roles e Grupos
// ─────────────────────────────────────────────

export async function handleRoleTool(name, args) {
  switch (name) {

    case "sn_create_role": {
      const data = await snPost("/api/now/table/sys_user_role", {
        name:        args.name,
        description: args.description || "",
        suffix:      args.suffix || args.name,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_add_user_to_group": {
      const groupData = await snGet("/api/now/table/sys_user_group", {
        sysparm_query:  `name=${args.group_name}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, args.env);
      if (!groupData.result?.length) throw new Error(`Grupo '${args.group_name}' não encontrado`);
      const userData = await snGet("/api/now/table/sys_user", {
        sysparm_query:  `user_name=${args.user_name}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, args.env);
      if (!userData.result?.length) throw new Error(`Usuário '${args.user_name}' não encontrado`);
      const data = await snPost("/api/now/table/sys_user_grmember", {
        group: groupData.result[0].sys_id,
        user:  userData.result[0].sys_id,
      }, args.env);
      return { sys_id: data.result.sys_id, user: args.user_name, group: args.group_name };
    }

    case "sn_remove_user_from_group": {
      const groupData = await snGet("/api/now/table/sys_user_group", {
        sysparm_query: `name=${args.group_name}`, sysparm_fields: "sys_id", sysparm_limit: 1,
      }, args.env);
      if (!groupData.result?.length) throw new Error(`Grupo '${args.group_name}' não encontrado`);
      const userData = await snGet("/api/now/table/sys_user", {
        sysparm_query: `user_name=${args.user_name}`, sysparm_fields: "sys_id", sysparm_limit: 1,
      }, args.env);
      if (!userData.result?.length) throw new Error(`Usuário '${args.user_name}' não encontrado`);
      const relData = await snGet("/api/now/table/sys_user_grmember", {
        sysparm_query: `group=${groupData.result[0].sys_id}^user=${userData.result[0].sys_id}`,
        sysparm_limit: 1,
      }, args.env);
      if (!relData.result?.length) throw new Error(`Usuário não é membro do grupo`);
      const result = await snDelete(`/api/now/table/sys_user_grmember/${relData.result[0].sys_id}`, args.env);
      return { ...result, user: args.user_name, group: args.group_name };
    }

    case "sn_assign_role_to_user": {
      const userData = await snGet("/api/now/table/sys_user", {
        sysparm_query: `user_name=${args.user_name}`, sysparm_fields: "sys_id", sysparm_limit: 1,
      }, args.env);
      if (!userData.result?.length) throw new Error(`Usuário '${args.user_name}' não encontrado`);
      const roleData = await snGet("/api/now/table/sys_user_role", {
        sysparm_query: `name=${args.role_name}`, sysparm_fields: "sys_id", sysparm_limit: 1,
      }, args.env);
      if (!roleData.result?.length) throw new Error(`Role '${args.role_name}' não encontrada`);
      const data = await snPost("/api/now/table/sys_user_has_role", {
        user: userData.result[0].sys_id,
        role: roleData.result[0].sys_id,
      }, args.env);
      return { sys_id: data.result.sys_id, user: args.user_name, role: args.role_name };
    }

    case "sn_list_group_members": {
      const groupData = await snGet("/api/now/table/sys_user_group", {
        sysparm_query: `name=${args.group_name}`, sysparm_fields: "sys_id", sysparm_limit: 1,
      }, args.env);
      if (!groupData.result?.length) throw new Error(`Grupo '${args.group_name}' não encontrado`);
      const data = await snGet("/api/now/table/sys_user_grmember", {
        sysparm_query:  `group=${groupData.result[0].sys_id}`,
        sysparm_fields: "user.user_name,user.name,user.email,sys_id",
        sysparm_limit:  100,
      }, args.env);
      return data.result;
    }

    default: return null;
  }
}
