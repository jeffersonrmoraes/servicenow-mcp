# ServiceNow Table: New Record Menu Item (sys_aw_new_menu_item)

**Category:** SYSTEM
**SysID:** 21e0b2ce18b632108bb255f46a373a71

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `table` | Table | table_name | - | ✅ |
| `sys_overrides` | Overrides | reference | sys_aw_new_menu_item | - |
| `workspace_config` | Workspace settings | reference | sys_aw_master_config | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `active` | Active | boolean | - | - |
| `order` | Order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.229Z*