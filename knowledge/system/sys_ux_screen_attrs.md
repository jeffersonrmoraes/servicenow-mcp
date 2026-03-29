# ServiceNow Table: UX Screen Attributes (sys_ux_screen_attrs)

**Category:** SYSTEM
**SysID:** ef7ba286183232108bb255f46a373a4a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `required_translations` | Required translations | json_translations | - | - |
| `advanced_performance_settings` | Advanced performance settings | json | - | - |
| `screen` | Screen | reference | sys_ux_screen | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.119Z*