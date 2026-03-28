# ServiceNow Table: Step Performance Metrics (sys_atf_step_performance_metrics)

**Category:** SYSTEM
**SysID:** 9780b20a18b632108bb255f46a373ac9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `type` | Pattern Type | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `execution_count` | Execution Count | integer | - | - |
| `table` | Table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `label` | Label | compressed | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `total_time` | Total Time | integer | - | - |
| `step_result` | Step Result | reference | sys_atf_test_result_step | - |
| `transaction` | Transaction | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `performance_run` | Performance Run | reference | sys_atf_performance_run | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `hash` | Hash | integer | - | - |
| `record` | Record | document_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:36.029Z*