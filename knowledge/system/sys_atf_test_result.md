# ServiceNow Table: Test Results (sys_atf_test_result)

**Category:** SYSTEM
**SysID:** ca707a8618b632108bb255f46a373a71

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `end_time_millis` | End time (ms) | counter | - | - |
| `rollback_context` | Rollback context | reference | sys_rollback_context | - |
| `pin` | Retain indefinitely | boolean | - | - |
| `is_test_generation` | Is test generation | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `parent` | Test suite result | reference | sys_atf_test_suite_result | - |
| `test_result_json` | Test result JSON | string | - | - |
| `execution_tracker` | Execution tracker | reference | sys_execution_tracker | - |
| `root_tracker_id` | Root tracker | reference | sys_execution_tracker | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `test` | Test | reference | sys_atf_test | - |
| `pending_time` | Pending time | glide_duration | - | - |
| `first_failing_step` | Failing step | reference | sys_atf_test_result_step | - |
| `previous_test_result` | Previous test result | reference | sys_atf_test_result | - |
| `sys_class_name` | Test result type | sys_class_name | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `start_time_millis` | Start time (ms) | counter | - | - |
| `test_name` | Test name | string | - | - |
| `first_failing_client_error` | First failing client error | reference | sys_atf_test_result_item | - |
| `continue_test` | Continue test | boolean | - | - |
| `start_time` | Start time | glide_date_time | - | - |
| `run_time` | Duration | glide_duration | - | - |
| `first_failing_step_screenshot` | Failing step screenshot | reference | sys_attachment | - |
| `step_over` | Step over | boolean | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `end_time` | End time | glide_date_time | - | - |
| `test_description` | Test description | string | - | - |
| `output` | Output | string | - | - |
| `pause_time_left` | Pause time left | integer | - | - |
| `status` | Status | string | - | - |
| `test_case_json` | Test case JSON | string | - | - |
| `user_agents` | Browsers involved | string | - | - |
| `is_test_generation_waiting_for_cloud_runner` | Is test generation waiting for browser | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `started_pending_time` | Started pending at | glide_date_time | - | - |
| `message_reference` | Message reference | string | - | - |
| `session_id` | Session ID | string | - | - |
| `abort_on_failure` | Abort on failure | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `parameter_set_run` | Parameter set run | reference | sys_atf_parameter_run | ✅ |
| `parameter_test_result` | Parameterized test result | reference | sys_atf_parameter_result | ✅ |
| `parameters` | Parameters | string | - | - |
| `retrieved_components` | Retrieved components | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:36.078Z*