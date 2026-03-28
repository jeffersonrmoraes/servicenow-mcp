# ServiceNow Table: Auto-Resolution Prediction (sys_cs_auto_resolution_prediction)

**Category:** SYSTEM
**SysID:** d6873e42187e32108bb255f46a373a7e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `solution_name` | Solution name | string | - | - |
| `predicted_language` | Predicted language | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `task_table` | Task table name | table_name | - | - |
| `predicted_search_query` | Predicted search query | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `execution_time` | Execution time | long | - | - |
| `status_message` | Status message | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `status_code` | Status code | string | - | - |
| `ar_context` | Auto-Resolution context | reference | sys_cs_auto_resolution_context | - |
| `input_fields` | Input fields | json | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `schema_version` | Schema version | string | - | - |
| `predicted_criticality` | Predicted criticality | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `task_id` | Task Id | document_id | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.227Z*