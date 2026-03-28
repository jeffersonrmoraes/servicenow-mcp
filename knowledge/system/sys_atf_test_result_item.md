# ServiceNow Table: Test Result Item (sys_atf_test_result_item)

**Category:** SYSTEM
**SysID:** e1703a8618b632108bb255f46a373abb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `test_result` | Test Result | reference | sys_atf_test_result | ✅ |
| `end_time` | End time | glide_date_time | - | - |
| `sys_class_name` | Step result type | sys_class_name | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `test_case_json` | Test case JSON | string | - | - |
| `start_time_millis` | Start time (ms) | glide_precise_time | - | - |
| `summary` | Summary | string | - | - |
| `run_time_millis` | Duration(ms) | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `status` | Status | string | - | - |
| `step` | Step | reference | sys_atf_step | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `performance_run` | Performance run | reference | sys_atf_performance_run | - |
| `whitelisted_client_error` | Allowed error | reference | sys_atf_whitelist | - |
| `type` | Type | string | - | - |
| `recorded_at` | Recorded at | counter | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `start_time` | Start time | glide_date_time | - | - |
| `parent_step_result` | Parent step result | reference | sys_atf_test_result_step_callable | - |
| `sys_created_by` | Created by | string | - | - |
| `description` | Description | string | - | - |
| `run_time` | Duration | glide_duration | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `output` | Output | compressed | - | - |
| `end_time_millis` | End time (ms) | glide_precise_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:36.113Z*