# ServiceNow Table: Test Suite Result (sys_atf_test_suite_result)

**Category:** SYSTEM
**SysID:** 6670ba8618b632108bb255f46a373aae

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `skip_count` | Skip count | integer | - | - |
| `start_time` | Start time | glide_date_time | - | - |
| `pin` | Retain indefinitely | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `rolled_up_test_error_count` | Rolled up test error count | integer | - | - |
| `success` | Success | boolean | - | - |
| `previous_suite_result` | Previous suite result | reference | sys_atf_test_suite_result | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `rolled_up_test_skip_count` | Rolled up test skip count | integer | - | - |
| `status` | Status | string | - | - |
| `agent_id` | Agent ID | reference | sys_atf_agent | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `error_count` | Error count | integer | - | - |
| `rolled_up_test_success_with_warnings_count` | Rolled up test success with warnings count | integer | - | - |
| `base_suite_result` | Base suite result | reference | sys_atf_test_suite_result | - |
| `number` | Number | string | - | - |
| `rolled_up_test_success_count` | Rolled up test success count | integer | - | - |
| `test_suite` | Test suite | reference | sys_atf_test_suite | - |
| `sys_mod_count` | Updates | integer | - | - |
| `failure_count` | Failure count | integer | - | - |
| `rolled_up_test_canceled_count` | Rolled up test canceled count | integer | - | - |
| `parent` | Parent | reference | sys_atf_test_suite_result | - |
| `success_count` | Success count | integer | - | - |
| `end_time` | End time | glide_date_time | - | - |
| `execution_tracker` | Execution tracker | reference | sys_execution_tracker | - |
| `sys_updated_by` | Updated by | string | - | - |
| `rolled_up_test_failure_count` | Rolled up test failure count | integer | - | - |
| `run_time` | Duration | glide_duration | - | - |
| `sys_class_name` | Suite result type | sys_class_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `schedule_run` | Schedule run | reference | sys_atf_schedule_run | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:37.530Z*