# ServiceNow Table: Sidebar Member Query (sys_cs_collab_user_query)

**Category:** SYSTEM
**SysID:** ee1736ca183e32108bb255f46a373a77

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `condition` | Condition | conditions | - | - |
| `type` | Type | string | - | ✅ |
| `user_query_script` | User Query Script | script | - | - |
| `user_query_condition` | User Query Condition | conditions | - | - |
| `condition_mode` | Condition Mode | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_collab_user_query | - |
| `name` | Name | string | - | - |
| `user_query_mode` | User Query Mode | string | - | - |
| `condition_table` | Condition table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `condition_script` | Condition Script | script | - | - |
| `order` | Order | integer | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.058Z*