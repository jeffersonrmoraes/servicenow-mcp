# ServiceNow Table: Source to Target Alias Mapping (sys_hub_alias_mapping)

**Category:** SYSTEM
**SysID:** 8ec1fa42183a32108bb255f46a373a6b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `source_alias` | Source Alias | reference | sys_alias | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `source_table` | Source table | table_name | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `source_id` | Source ID | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `target_alias` | Target Alias | reference | sys_alias | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:21.288Z*