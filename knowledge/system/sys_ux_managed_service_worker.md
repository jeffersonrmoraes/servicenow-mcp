# ServiceNow Table: UX Managed Service Worker (sys_ux_managed_service_worker)

**Category:** SYSTEM
**SysID:** 0f7bee46183232108bb255f46a373aa6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `universal` | Universal | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `registered_scopes` | Registered Scopes | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order | integer | - | ✅ |
| `asset` | Asset | reference | sys_ux_lib_asset | - |
| `content_meta` | Content metadata | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.903Z*