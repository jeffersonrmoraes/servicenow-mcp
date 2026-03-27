# Guia de Ferramentas - ServiceNow MCP Server (v3.0.0)

Este manual é destinado a Agentes de IA que consomem este servidor MCP. Ele descreve as ferramentas consolidadas e como utilizá-las de forma otimizada.

---

## 🏛️ Convenções Gerais

1. **Parâmetro `env`**: Opcional em todas as ferramentas. Use para rotear para instâncias específicas (PDI, DEV, TEST, PROD) se configuradas globalmente.
2. **Upsert Dinâmico**: Muitas ferramentas (`sn_upsert_metadata_script`, `sn_manage_acl`) aceitam o parâmetro opcional `sys_id`. 
   - Se `sys_id` estiver presente: Realiza **PATCH** (Atualização).
   - Se `sys_id` estiver ausente: Realiza **POST** (Criação).

---

## 🧩 Ferramentas de Metadados (Desenvolvimento)

### `sn_upsert_metadata_script`
Cria ou atualiza recursos de script. Substitui 10 ferramentas individuais.

**Mapeamento de `type`:**
- `business_rule`: Business Rules (`sys_script`). Requer `table`, `when`, `action`, `script`.
- `script_include`: Script Includes (`sys_script_include`). Requer `name`, `script`.
- `client_script`: Client Scripts (`sys_script_client`). Requer `table`, `cs_type` (onLoad, onChange, onSubmit), `script`.
- `ui_policy`: UI Policies (`sys_ui_policy`). Requer `table`, `condition`, `script`.
- `scheduled_job`: Scheduled Jobs (`sysauto_script`). Requer `name`, `script`, `run_type`.

**Exemplo:**
```json
{
  "type": "business_rule",
  "name": "Auto Calcule Priority",
  "table": "incident",
  "when": "before",
  "action": "insert,update",
  "script": "(function executeRule(...) { ... })(current, previous);",
  "condition": "current.impact.changes() || current.urgency.changes()"
}
```

---

## 🛡️ Ferramentas de Segurança e Acesso

### `sn_manage_acl`
Consolida `create`, `update`, `delete`, `list` e gestão de roles de ACLs.

**Ações (`action`):**
- `upsert`: Cria ou atualiza uma ACL. Requer `name`, `type`, `operation`, `table`.
- `delete`: Remove uma ACL pelo `sys_id`.
- `list`: Lista ACLs de uma `table`.
- `add_role` / `remove_role`: Gerencia as roles associadas à ACL via `sys_id` e `role` (nome técnico).

---

### `sn_manage_access`
Consolida gestão de usuários, grupos e roles.

**Tipos (`type`) e Ações (`action`):**
- `role` / `create`: Cria uma nova Role técnica.
- `group_member` / `add`, `remove`, `list`: Gere membros de um grupo pelo `group_name` e `user_name`.
- `user_role` / `add`: Atribui uma Role diretamente a um usuário pelo `user_name` e `role_name`.

---

## 📎 Outras Ferramentas Relevantes

### `sn_manage_catalog_item`
Cria ou atualiza itens de catálogo. Substitui `sn_create_catalog_item` e `sn_update_catalog_item`.

### `sn_manage_catalog_variable`
Cria ou atualiza variáveis de catálogo associadas a um item.

---

## 💡 Melhores Práticas para a IA

1. **Query Inteligente**: Sempre que possível, use `sn_query_records` para validar se um registro já existe antes de tentar um `upsert` cego.
2. **Campos Nativos**: Quando usar o CRUD genérico (`sn_create_record`, `sn_update_record`), utilize os nomes das colunas nativas do ServiceNow (como `caller_id` em vez de `Caller`).
3. **Escopo**: Se estiver trabalhando em um App Escopado, lembre-se de passar o prefixo do escopo nos nomes (ex: `x_cust_myapp_my_script`).
