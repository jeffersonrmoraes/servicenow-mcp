# ServiceNow Table: Search Source (sp_search_source)

**Category:** CORE
**SysID:** b4a0f64a18b632108bb255f46a373a08

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_text | - | ✅ |
| `advanced_typeahead_config` | Advanced typeahead config | boolean | - | - |
| `condition` | Conditions | conditions | - | - |
| `is_scripted_source` | Is scripted source | boolean | - | - |
| `roles` | Roles | user_roles | - | - |
| `typeahead_template` | Typeahead template | html_template | - | - |
| `enable_typeahead` | Enable typeahead | boolean | - | - |
| `source_table` | Table | table_name | - | - |
| `search_page_template` | Search page template | html_template | - | - |
| `id` | ID | string | - | ✅ |
| `page` | Page | reference | sp_page | - |
| `display_fields` | Display fields | field_list | - | - |
| `facet_generation_script` | Facet generation script | script | - | - |
| `data_fetch_script` | Data fetch script | script | - | - |
| `pagination_supported` | Paginate results | boolean | - | - |
| `typeahead_glyph` | Typeahead glyph | glyphicon | - | - |
| `primary_display_field` | Primary display field | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:44.898Z*