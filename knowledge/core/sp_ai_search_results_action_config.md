# ServiceNow Table: AI Search Results Action Configuration (sp_ai_search_results_action_config)

**Category:** CORE
**SysID:** 37a0768a18b632108bb255f46a373ac1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `portal_page` | Portal page | reference | sp_page | ✅ |
| `additional_query_parameters` | Additional query parameters | simple_name_values | - | - |
| `payload_query_parameters` | Payload query parameters | template_value | - | - |
| `ai_search_source` | AI Search Source | reference | ais_search_source | ✅ |
| `order` | Order | integer | - | - |
| `payload_field_table` | Payload Field Table | string | - | - |
| `portals` | Service Portal(s) | glide_list | sp_portal | - |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `action_name` | Action name | reference | sys_declarative_action_assignment | ✅ |
| `short_description` | Short description | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:11.805Z*