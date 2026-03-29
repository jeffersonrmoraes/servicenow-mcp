# ServiceNow Table: UX Theme (sys_ux_theme)

**Category:** SYSTEM
**SysID:** b27bae46183232108bb255f46a373aa1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `description` | Description | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `theme` | Theme | json | - | - |
| `name` | Name | string | - | ✅ |
| `parent` | Extends | reference | sys_ux_theme | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Override | reference | sys_ux_theme | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.847Z*