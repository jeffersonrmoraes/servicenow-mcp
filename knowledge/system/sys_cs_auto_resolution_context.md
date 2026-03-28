# ServiceNow Table: Your recent request (sys_cs_auto_resolution_context)

**Category:** SYSTEM
**SysID:** 0a87fa42187e32108bb255f46a373a45

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `configuration` | Configuration | reference | sys_cs_auto_resolution_configuration | - |
| `matched_topic` | Matched topic | reference | sys_cs_topic | - |
| `task_processing_state` | Task processing state | choice | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `ml_solution_version` | Solution version | string | - | - |
| `sla_state` | SLA state | choice | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `notification_user` | Notification user | reference | sys_user | - |
| `response_channels` | Response channels | glide_list | - | - |
| `task_sla` | Task SLA | reference | task_sla | - |
| `sys_created_by` | Created by | string | - | - |
| `intent_topic_state` | Intent topic state | choice | - | - |
| `prediction` | Prediction | reference | sys_cs_auto_resolution_prediction | - |
| `sys_mod_count` | Updates | integer | - | - |
| `task_creation_language_code` | Task creation language code | string | - | - |
| `catalog_submitted` | Catalog submitted | boolean | - | - |
| `task_resolved` | Task resolved | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `nlu_intent` | Intent | string | - | - |
| `ais_result` | AI Search result | reference | sys_cs_auto_resolution_ai_search_result | - |
| `interaction` | Interaction | reference | interaction | - |
| `ml_solution_name` | Solution name | string | - | - |
| `reason` | Task processing state reason | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `task` | Task | reference | task | - |
| `notification_state` | Notification state | choice | - | - |
| `reminder_count` | Reminder count | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.235Z*