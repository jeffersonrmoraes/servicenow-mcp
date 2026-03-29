# ServiceNow Table: Instance with Search (sp_instance_ais)

**Category:** CORE
**SysID:** 1f90364a18b632108bb255f46a373a31

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `placeholder` | Placeholder | string | - | - |
| `result_count_font_size` | Result Count Font Size | string | - | - |
| `disable_all_suggestions` | Disable All Suggestions | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `spell_check_font_size` | Spell Check Font Size | string | - | - |
| `search_results_configuration` | Search Results Configuration | reference | sys_ux_composite_data | - |
| `search_application` | Search Application | reference | sys_search_context_config | - |
| `ai_search_source_filter` | AI Search Source Filter | reference | ais_search_source | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:12.690Z*