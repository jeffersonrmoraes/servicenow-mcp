# ServiceNow Table: Quick Link (sn_ex_sp_quick_link)

**Category:** CORE
**SysID:** 80c67a86183e32108bb255f46a373aa3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `page` | Page | reference | sp_page | - |
| `additional_query_params` | Page query parameters | simple_name_values | - | - |
| `sys_created_by` | Created by | string | - | - |
| `icon` | Icon | user_image | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `override_title` | Title | translated_text | - | - |
| `background_image` | Background image | user_image | - | - |
| `external_link` | External link | reference | sn_ex_sp_external_link | - |
| `content_type` | Content type | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `override_short_desc` | Short description | translated_text | - | - |
| `background_image_url` | Background image URL | url | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `knowledge` | Knowledge article | reference | kb_knowledge | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `catalog_item` | Catalog item | reference | sc_cat_item | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Quick link name | string | - | ✅ |
| `icon_url` | Icon URL | url | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:46.839Z*