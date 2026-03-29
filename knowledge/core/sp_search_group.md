# ServiceNow Table: Search Group (sp_search_group)

**Category:** CORE
**SysID:** 94a0764a18b632108bb255f46a373aa1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `label` | Optional label | translated_field | - | - |
| `active` | Active | boolean | - | - |
| `name` | Table | table_name | - | ✅ |
| `sp_page` | Page | reference | sp_page | - |
| `condition` | Conditions | conditions | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sp_portal` | Portal | reference | sp_portal | - |
| `order` | Order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.858Z*