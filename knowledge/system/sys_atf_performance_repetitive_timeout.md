# ServiceNow Table: Repetitive Timeout (sys_atf_performance_repetitive_timeout)

**Category:** SYSTEM
**SysID:** 9780b20a18b632108bb255f46a373af0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `ignored` | Ignored | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `test` | Test | reference | sys_atf_test | - |
| `sys_mod_count` | Updates | integer | - | - |
| `stack_trace` | Stack trace | string | - | - |
| `step` | Test step | reference | sys_atf_step | - |
| `sys_updated_by` | Updated by | string | - | - |
| `delay` | Delay | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `timeout_hash` | Timeout hash | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `test_result` | Origin test result | reference | sys_atf_test_result_performance | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `path_name` | Path Name | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.569Z*