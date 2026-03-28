# ServiceNow Table: Service Portal (sp_portal)

**Category:** CORE
**SysID:** 3ca0b64a18b632108bb255f46a373ab5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `enable_certificate_based_authentication` | Enable certificate based authentication | boolean | - | - |
| `enable_favorites` | Enable favorites | boolean | - | - |
| `homepage` | Homepage | reference | sp_page | - |
| `embeddable_macroponents` | Select components being embedded | glide_list | sys_ux_embeddable_macroponent | - |
| `dark_theme` | Dark theme | reference | sp_theme | - |
| `sp_rectangle_menu` | Main menu | reference | sp_instance_menu | - |
| `css_variables` | CSS variables | properties | - | - |
| `search_results_configuration` | Search Results Configuration | reference | sys_ux_composite_data | - |
| `url_suffix` | URL suffix | string | - | ✅ |
| `sc_category_page` | Catalog category home page | reference | sp_page | - |
| `theme` | Theme | reference | sp_theme | - |
| `sc_catalog_page` | Catalog home page | reference | sp_page | - |
| `default` | Default | boolean | - | - |
| `enable_embeddables` | Enable Web Embeddables | boolean | - | - |
| `alternate_portal` | Alternate portal | reference | sp_portal | - |
| `enable_ais` | Enable AI Search | boolean | - | - |
| `icon` | Icon | user_image | - | - |
| `quick_start_config` | Quick start config | json | - | - |
| `search_application` | Search Application | reference | sys_search_context_config | - |
| `logo_alt_text` | Logo Alt Text | translated_text | - | - |
| `sp_chat_queue` | Chat Queue | reference | chat_queue | - |
| `login_page` | Login page | reference | sp_page | - |
| `kb_knowledge_base` | Knowledge base | reference | kb_knowledge_base | - |
| `communication_channels` | Communication Channels | glide_list | - | - |
| `inactive` | Inactive | boolean | - | - |
| `title` | Title | translated_text | - | ✅ |
| `hide_portal_name` | Hide portal name | boolean | - | - |
| `ts_index_group` | Text Index Group | reference | ts_index_group | - |
| `logo` | Logo | user_image | - | - |
| `kb_knowledge_page` | KB home page | reference | sp_page | - |
| `notfound_page` | 404 page | reference | sp_page | - |
| `sc_catalog` | Catalog | reference | sc_catalog | - |
| `sys_id` | Sys ID | GUID | - | - |
| `rtl_enabled` | Support right-to-left languages | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:38.779Z*