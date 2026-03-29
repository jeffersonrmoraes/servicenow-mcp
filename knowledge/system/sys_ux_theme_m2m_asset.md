# ServiceNow Table: UX Theme Assets (sys_ux_theme_m2m_asset)

**Category:** SYSTEM
**SysID:** 937b2286183232108bb255f46a373ac4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `theme` | Theme | reference | sys_ux_theme | ✅ |
| `sys_overrides` | Override | reference | sys_ux_theme_m2m_asset | - |
| `sys_id` | Sys ID | GUID | - | - |
| `properties` | Asset Properties | json | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `asset` | Asset | reference | sys_ux_theme_asset | ✅ |
| `sys_domain_path` | Domain Path | domain_path | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.845Z*