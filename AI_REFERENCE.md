# Guia de Ferramentas - ServiceNow MCP Server (v3.1.0)

Este manual é destinado a Agentes de IA que consomem este servidor MCP. Ele descreve as ferramentas consolidadas e como utilizá-las de forma otimizada.

---

## 🏛️ Convenções Gerais

1. **Parâmetro `env`**: Opcional em todas as ferramentas. Use para rotear para instâncias específicas (PDI, DEV, TEST, PROD) se configuradas globalmente.
2. **Upsert Dinâmico**: A maioria das ferramentas (`sn_upsert_metadata_script`, `sn_manage_acl`, `sn_manage_widget`, `sn_manage_ui_action`) aceita o parâmetro opcional `sys_id`. 
   - Se `sys_id` estiver presente: Realiza **PATCH** (Atualização).
   - Se `sys_id` estiver ausente: Realiza **POST** (Criação).

---

## 🎨 Ferramentas de Front-end & UX (Novo v3.1)

### `sn_manage_widget`
Cria ou atualiza um Service Portal Widget (`sp_widget`).

**Dica para a IA**: Widgets são divididos em 4 áreas. Forneça o payload completo para manter a consistência.
- `template`: HTML puro.
- `css`: CSS ou SCSS.
- `script`: Lógica server-side (Rhino).
- `client_script`: Lógica client-side (AngularJS controller).

### `sn_manage_ui_action`
Cria ou atualiza botões e menus em formulários (`sys_ui_action`).

---

## 🧩 Ferramentas de Metadados (Desenvolvimento)

### `sn_upsert_metadata_script`
Cria ou atualiza recursos de script (BR, Script Include, Client Script, UI Policy, Jobs).

---

## 🛡️ Ferramentas de Segurança e Acesso

### `sn_manage_acl`
Consolida `create`, `update`, `delete`, `list` e gestão de roles de ACLs.

### `sn_manage_access`
Consolida gestão de usuários, grupos e roles técnicas.

---

## 💡 Melhores Práticas para a IA

1. **Query Inteligente**: Sempre verifique se o recurso existe via `sn_query_records` antes de um `upsert`.
2. **Front-end State**: Ao criar Widgets, lembre-se que o ServiceNow usa AngularJS. Use `c.data` para comunicação entre Server e Client.
3. **Escopo**: Se o app for escopado, lembre-se de prefixar nomes de Widgets e UI Actions com o escopo da aplicação.
