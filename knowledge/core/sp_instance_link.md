# ServiceNow Table: Instance with Link (sp_instance_link)

**Category:** CORE
**SysID:** af90364a18b632108bb255f46a373aa8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `kb_topic` | KB topic | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |
| `sp_page` | Page | reference | sp_page | - |
| `sc_cat_item` | Catalog item | reference | sc_cat_item | - |
| `sc_category` | Catalog category | reference | sc_category | - |
| `kb_category` | KB category | reference | kb_category | - |
| `kb_article` | KB article | reference | kb_knowledge | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:13.428Z*