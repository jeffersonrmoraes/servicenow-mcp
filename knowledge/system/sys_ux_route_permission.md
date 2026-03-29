# ServiceNow Table: UX Dashboard Route Permission (sys_ux_route_permission)

**Category:** SYSTEM
**SysID:** c77bae46183232108bb255f46a373af0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `route` | Route | reference | sys_ux_app_route | - |
| `roles` | Roles | glide_list | sys_user_role | - |
| `groups` | Groups | glide_list | sys_user_group | - |
| `active` | Active | boolean | - | - |
| `type` | Type | choice | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `users` | Users | glide_list | sys_user | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:41.405Z*