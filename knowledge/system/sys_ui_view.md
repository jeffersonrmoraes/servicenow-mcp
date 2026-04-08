# ServiceNow Table: UI View (sys_ui_view)

**Category:** system
**SysID:** f62be602183232108bb255f46a373a7d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `roles` | Roles | user_roles | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `hidden` | Hidden | boolean | - | - |
| `title` | Title | translated_field | - | - |
| `group` | Group | reference | sys_user_group | - |
| `name` | Name | string | - | - |
| `user` | User | reference | sys_user | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-30T13:18:18.828Z*