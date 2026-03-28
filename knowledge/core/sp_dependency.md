# ServiceNow Table: Widget Dependency (sp_dependency)

**Category:** CORE
**SysID:** 9790f24a18b632108bb255f46a373aa0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `module` | Angular module name | string | - | - |
| `name` | Name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sp_portals` | Portals for page load (optional) | glide_list | sp_portal | - |
| `page_load` | Include on page load | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:44.196Z*