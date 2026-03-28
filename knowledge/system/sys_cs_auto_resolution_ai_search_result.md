# ServiceNow Table: Auto-Resolution AI Search Result (sys_cs_auto_resolution_ai_search_result)

**Category:** SYSTEM
**SysID:** 3d87fa42187e32108bb255f46a373a18

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `search_term` | Search term | string | - | - |
| `feedback_payload` | Feedback payload | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `execution_time` | AI Search execution time | long | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `search_profile` | AI Search search profile | reference | ais_search_profile | - |
| `status` | Status | choice | - | - |
| `task_table` | Task table | table_name | - | - |
| `feedback_submitted` | AI search feedback submitted | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `search_app_config` | Search application config | reference | sys_search_context_config | - |
| `message` | Message | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `task_id` | Task Id | document_id | - | - |
| `feedback_type` | Feedback type | choice | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `result_payload` | Result payload | json | - | - |
| `session_id` | Session Id | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `ar_context` | Auto-Resolution context | reference | sys_cs_auto_resolution_context | - |
| `search_metadata` | Search metadata | json | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.829Z*