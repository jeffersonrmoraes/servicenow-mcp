# ServiceNow Table: UX Theme Asset (sys_ux_theme_asset)

**Category:** SYSTEM
**SysID:** 677ba286183232108bb255f46a373a73

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `name` | Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Override | reference | sys_ux_theme_asset | - |
| `sys_domain` | Domain | domain_id | - | - |
| `category` | Category | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.842Z*