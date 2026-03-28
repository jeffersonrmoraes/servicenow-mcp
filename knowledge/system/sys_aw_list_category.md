# ServiceNow Table: Workspace List Category (sys_aw_list_category)

**Category:** SYSTEM
**SysID:** 26927682187a32108bb255f46a373aa1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `title` | Title | translated_field | - | ✅ |
| `description` | Description | string | - | - |
| `workspace` | Workspace | reference | sys_aw_master_config | ✅ |
| `order` | Order | decimal | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_aw_list_category | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.708Z*