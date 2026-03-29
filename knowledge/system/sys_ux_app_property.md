# ServiceNow Table: UX App Property (sys_ux_app_property)

**Category:** SYSTEM
**SysID:** 637ba286183232108bb255f46a373a3e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `parent_app` | Parent App | reference | sys_ux_app | ✅ |
| `value` | Value | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:32.467Z*