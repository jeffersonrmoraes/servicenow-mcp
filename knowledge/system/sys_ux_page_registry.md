# ServiceNow Table: UX Application (sys_ux_page_registry)

**Category:** SYSTEM
**SysID:** 327bae46183232108bb255f46a373a1c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `title` | Title | translated_field | - | - |
| `admin_panel` | Admin panel | document_id | - | - |
| `root_macroponent` | App Shell UI | reference | sys_ux_macroponent | - |
| `admin_panel_table` | Admin panel table | table_list | - | - |
| `page` | Page | reference | sys_ux_page | - |
| `path` | URL path | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `parent_app` | Parent App | reference | sys_ux_app | - |
| `sys_id` | Sys ID | GUID | - | - |
| `auth_routes` | Auth Routes | json | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:41.363Z*