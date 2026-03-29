# ServiceNow Table: Ux Theme Customization (sys_ux_theme_customization)

**Category:** SYSTEM
**SysID:** 0c8b2686183232108bb255f46a373a08

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `name` | Name | string | - | ✅ |
| `theme` | Theme | reference | sys_ux_theme | ✅ |
| `customization` | Customization | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Override | reference | sys_ux_theme_customization | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.887Z*