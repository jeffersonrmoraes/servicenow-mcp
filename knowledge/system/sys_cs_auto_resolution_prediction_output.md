# ServiceNow Table: Auto-Resolution Prediction Output (sys_cs_auto_resolution_prediction_output)

**Category:** SYSTEM
**SysID:** 56873e42187e32108bb255f46a373aa3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `score` | Score | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `prediction` | Auto-Resolution prediction | reference | sys_cs_auto_resolution_prediction | - |
| `feedback_value` | Feedback value | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `service_model_used` | Service model used | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `service_model_solution_version` | Service model solution version | string | - | - |
| `service_model_solution_name` | Service model solution name | string | - | - |
| `output` | Output | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `details` | Details  | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `service` | Service | choice | - | - |
| `feedback_status` | Feedback status | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.270Z*