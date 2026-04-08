# ServiceNow Table: Form Section (sys_ui_section)

**Category:** system
**SysID:** 3e2be602183232108bb255f46a373a69

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Table | table_name | - | - |
| `view_name` | View name | string | - | - |
| `header` | Header | boolean | - | - |
| `view` | View | reference | sys_ui_view | - |
| `title` | Title | boolean | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_ui_section | - |
| `roles` | Roles | string | - | - |
| `sys_user` | Sys user | reference | sys_user | - |
| `sys_domain` | Domain | domain_id | - | - |
| `caption` | Caption | translated_field | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-30T13:18:17.262Z*