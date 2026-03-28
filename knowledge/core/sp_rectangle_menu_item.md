# ServiceNow Table: Menu Item (sp_rectangle_menu_item)

**Category:** CORE
**SysID:** 9390f24a18b632108bb255f46a373ab0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `short_description` | Short description | string | - | - |
| `active` | Active | boolean | - | - |
| `color` | Bootstrap color | bootstrap_color | - | - |
| `kb_category` | KB category | reference | kb_category | - |
| `display_1` | Display 1 | field_name | - | - |
| `kb_article` | KB article | reference | kb_knowledge | - |
| `filter` | Filter | conditions | - | - |
| `condition` | Condition | condition_string | - | - |
| `sc_category` | Catalog category | reference | sc_category | - |
| `type` | Type | string | - | - |
| `url_target` | URL target | string | - | - |
| `glyph` | Glyph | glyphicon | - | - |
| `url` | HREF / URL | string | - | - |
| `display_date` | Display date | field_name | - | - |
| `kb_topic` | KB topic | string | - | - |
| `table` | Table | table_name | - | - |
| `sp_rectangle_menu_item` | Parent Menu Item | reference | sp_rectangle_menu_item | - |
| `hint` | Hint | translated_text | - | - |
| `label` | Label | translated_text | - | - |
| `sp_page` | Page | reference | sp_page | - |
| `display_2` | Display 2 | field_name | - | - |
| `sc_cat_item` | Catalog item | reference | sc_cat_item | - |
| `record_script` | Server Script | script_server | - | - |
| `sp_rectangle_menu` | Parent Menu | reference | sp_instance_menu | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:42.758Z*