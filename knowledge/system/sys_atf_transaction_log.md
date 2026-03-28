# ServiceNow Table: ATF Transaction Log Entry (sys_atf_transaction_log)

**Category:** SYSTEM
**SysID:** df80f20a18b632108bb255f46a373a37

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `performance_run` | Performance run | reference | sys_atf_performance_run | - |
| `engine` | ATF Engine Transaction | boolean | - | - |
| `clotho_time` | Clotho time | integer | - | - |
| `output_length` | Output length | integer | - | - |
| `origin_scope` | Origin Application | reference | sys_scope | - |
| `total_wait_time` | Total wait time | integer | - | - |
| `client_script_time` | Client script time | integer | - | - |
| `largest_input_read` | Largest input read | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `additional_info` | Additional Info | string | - | - |
| `business_rule_time` | Business rule time | integer | - | - |
| `gzip` | GZipped | boolean | - | - |
| `cpu_usage` | CPU usage | double | - | - |
| `semaphore_wait_time` | Semaphore wait time | integer | - | - |
| `browser_time` | Browser time | integer | - | - |
| `has_call_chain` | Has a call chain | boolean | - | - |
| `response_time` | Response time | integer | - | - |
| `business_rule_count` | Business rule count | integer | - | - |
| `system_id` | System ID | string | - | - |
| `transaction_number` | Transaction Number | longint | - | - |
| `type` | Type | string | - | - |
| `view_id` | View | reference | sys_ui_view | - |
| `sql_time` | SQL time | integer | - | - |
| `user_agent` | User agent | string | - | - |
| `db_category` | Db category | string | - | - |
| `total_page_load_time` | Total page load time | integer | - | - |
| `client_response_time` | Client response time | integer | - | - |
| `largest_chunk_written` | Largest chunk written | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `step_result` | Step result | reference | sys_atf_test_result_step | - |
| `network_time` | Network time | integer | - | - |
| `remote_ip` | IP Address | string | - | - |
| `db_pool` | Db pool | string | - | - |
| `ajax_transaction_count` | Number of AJAX requests | integer | - | - |
| `client_transaction` | Client transaction | boolean | - | - |
| `phase1_form_length` | Phase 1 form length | integer | - | - |
| `sql_count` | SQL count | integer | - | - |
| `session` | Session | string | - | - |
| `app_scope` | App scope | string | - | - |
| `start_process_at` | Processing start time | glide_date_time | - | - |
| `client_network_time` | Client network time | integer | - | - |
| `request_param_size` | Request param size | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `url` | URL | string | - | - |
| `clotho_count` | Clotho count | integer | - | - |
| `render_size` | Render size | integer | - | - |
| `cpu_time` | CPU time | integer | - | - |
| `session_wait_time` | Session wait time | integer | - | - |
| `ui_policy_time` | UI policy time | integer | - | - |
| `transaction_pattern` | Transaction pattern | reference | sys_transaction_pattern | - |
| `additional_debug_info` | Additional Debug Info | string | - | - |
| `acl_time` | ACL Time | integer | - | - |
| `protocol` | Protocol | string | - | - |
| `potential_cpu_time` | Potential CPU time | integer | - | - |
| `transaction_processing_time` | Transaction processing time | integer | - | - |
| `table` | Table | table_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:37.576Z*