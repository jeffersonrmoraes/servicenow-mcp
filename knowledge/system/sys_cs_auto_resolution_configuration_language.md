# ServiceNow Table: Configuration Languages (sys_cs_auto_resolution_configuration_language)

**Category:** SYSTEM
**SysID:** 9e873e42187e32108bb255f46a373a5a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `ml_training_progress` | Training progress | percent_complete | - | - |
| `latest_trained_version` | Latest trained version | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `configuration` | Auto-Resolution configuration | reference | sys_cs_auto_resolution_configuration | ✅ |
| `tuned` | Tuned | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `ml_solution_name` | Solution name | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `training_language` | Training language | string | - | - |
| `last_tuned` | Last tuned | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `ml_training_state` | Training state | string | - | - |
| `ml_status_last_updated` | Training status last updated | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `capability` | Solution capability | choice | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.825Z*