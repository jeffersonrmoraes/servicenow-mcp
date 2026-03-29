# ServiceNow Table: Page Route Map (sp_page_route_map)

**Category:** CORE
**SysID:** 8f90f24a18b632108bb255f46a373a83

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `route_from_page` | Route from | reference | sp_page | ✅ |
| `active` | Active | boolean | - | - |
| `portals` | Service Portal(s) | glide_list | sp_portal | - |
| `sys_id` | Sys ID | GUID | - | - |
| `roles` | Roles | user_roles | - | - |
| `short_description` | Short description | string | - | - |
| `route_to_page` | Route to | reference | sp_page | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.171Z*