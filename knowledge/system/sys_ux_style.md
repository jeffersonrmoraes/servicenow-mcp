# ServiceNow Table: UX Style (sys_ux_style)

**Category:** SYSTEM
**SysID:** 277ba286183232108bb255f46a373a62

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `name` | Name | translated_field | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `style` | Style | json | - | - |
| `type` | Type | choice | - | ✅ |
| `sys_overrides` | Override | reference | sys_ux_style | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.121Z*