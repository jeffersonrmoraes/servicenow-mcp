# ServiceNow Table: Business Rule (sys_script)

**Category:** SYSTEM
**SysID:** b31ba202183232108bb255f46a373ada

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `role_conditions` | Role conditions | user_roles | - | - |
| `action_insert` | Insert | boolean | - | - |
| `abort_action` | Abort action | boolean | - | - |
| `is_rest` | Web Services | boolean | - | - |
| `rest_method` | REST Method | reference | sys_rest_message_fn | - |
| `access` | Accessible from | string | - | - |
| `rest_method_text` | REST Method Text | string | - | - |
| `rest_service` | REST Service | reference | sys_rest_message | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `rest_variables` | Variable Substitution | string | - | - |
| `rest_service_text` | REST Service Text | string | - | - |
| `name` | Name | string | - | - |
| `when` | When | string | - | - |
| `execute_function` | Execute function | boolean | - | - |
| `order` | Order | integer | - | - |
| `template` | Set field values | template_value | - | - |
| `client_callable` | Client callable | boolean | - | - |
| `advanced` | Advanced | boolean | - | - |
| `script` | Script | script | - | - |
| `action_query` | Query | boolean | - | - |
| `change_fields` | Update reference fields | boolean | - | - |
| `collection` | Table | table_name | - | - |
| `priority` | Priority | integer | - | - |
| `sys_overrides` | Overrides | reference | sys_script | - |
| `description` | Description | string | - | - |
| `action_delete` | Delete | boolean | - | - |
| `message` | Message | translated_html | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `filter_condition` | Filter Conditions | conditions | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `condition` | Condition | condition_string | - | - |
| `action_update` | Update | boolean | - | - |
| `add_message` | Add message | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:23.201Z*