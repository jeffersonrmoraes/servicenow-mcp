# ServiceNow Table: Virtual Agent AI Search Results Action Configuration (sys_cs_ai_search_results_action_config)

**Category:** SYSTEM
**SysID:** 1ef6768a183e32108bb255f46a373af2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `url_id` | URL ID | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `short_description` | Short description | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `action_name` | Action name | reference | sys_declarative_action_assignment | ✅ |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.733Z*