# ServiceNow Table: Transaction Statistic (sys_atf_performance_stat_transaction)

**Category:** SYSTEM
**SysID:** 8b80b20a18b632108bb255f46a373a42

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `clotho_count_1` | First run clotho count | integer | - | - |
| `db_category` | Db category | string | - | - |
| `session_wait_time_2` | Second run session wait time | integer | - | - |
| `table` | Table | table_name | - | - |
| `sql_count_1` | First run sql count | integer | - | - |
| `gzip` | GZipped | boolean | - | - |
| `start_process_at` | Processing start time | glide_date_time | - | - |
| `client_script_time_2` | Second run client script time | integer | - | - |
| `network_time_1` | First run network time | integer | - | - |
| `remote_ip` | IP Address | string | - | - |
| `transaction_number` | Transaction Number | longint | - | - |
| `client_response_time_2` | Second run client response time | integer | - | - |
| `performance_stat_step` | Performance Step Statistic | reference | sys_atf_performance_stat | - |
| `acl_time_1` | First run ACL time | integer | - | - |
| `cpu_time_2` | Second run CPU time | integer | - | - |
| `transaction_processing_time_2` | Second run transaction processing time | integer | - | - |
| `request_param_size` | Request param size | integer | - | - |
| `business_rule_time_2` | Second run business rule time | integer | - | - |
| `cpu_time_1` | First run CPU time | integer | - | - |
| `transaction_processing_time_1` | First run transaction processing time | integer | - | - |
| `largest_chunk_written` | Largest chunk written | integer | - | - |
| `clotho_time_2` | Second run clotho time | integer | - | - |
| `db_pool` | Db pool | string | - | - |
| `session_wait_time_1` | First run session wait time | integer | - | - |
| `browser_time_2` | Second run browser time | integer | - | - |
| `sql_time_2` | Second run sql time | integer | - | - |
| `render_size` | Render size | integer | - | - |
| `total_page_load_time_2` | Second run total page load time | integer | - | - |
| `client_script_time_1` | First run client script time | integer | - | - |
| `response_time_2` | Second run response time | integer | - | - |
| `business_rule_count_2` | Second run business rule count | integer | - | - |
| `potential_cpu_time_2` | Second run potential CPU time | integer | - | - |
| `client_response_time_1` | First run client response time | integer | - | - |
| `has_call_chain` | Has a call chain | boolean | - | - |
| `response_time_1` | First run response time | integer | - | - |
| `business_rule_count_1` | First run business rule count | integer | - | - |
| `potential_cpu_time_1` | First run potential CPU time | integer | - | - |
| `client_transaction` | Client transaction | boolean | - | - |
| `transaction_pattern` | Transaction pattern | reference | sys_transaction_pattern | - |
| `business_rule_time_1` | First run business rule time | integer | - | - |
| `origin_scope` | Origin Application | reference | sys_scope | - |
| `semaphore_wait_time_2` | Second run semaphore wait time | integer | - | - |
| `phase1_form_length` | Phase 1 form length | integer | - | - |
| `clotho_time_1` | First run clotho time | integer | - | - |
| `system_id` | System ID | string | - | - |
| `total_wait_time_2` | Second run total wait time | integer | - | - |
| `browser_time_1` | First run browser time | integer | - | - |
| `sql_time_1` | First run sql time | integer | - | - |
| `output_length` | Output length | integer | - | - |
| `total_page_load_time_1` | First run total page load time | integer | - | - |
| `client_network_time_2` | Second run client network time | integer | - | - |
| `network_time_2` | Second run network time | integer | - | - |
| `user_agent` | User agent | string | - | - |
| `ajax_transaction_count` | Number of AJAX requests | integer | - | - |
| `client_network_time_1` | First run client network time | integer | - | - |
| `parent` | Parent | reference | sys_atf_performance_stat_transaction | - |
| `url` | URL | string | - | - |
| `acl_time_2` | Second run ACL time | integer | - | - |
| `cpu_usage` | CPU usage | double | - | - |
| `type` | Type | string | - | - |
| `largest_input_read` | Largest input read | integer | - | - |
| `clotho_count_2` | Second run clotho count | integer | - | - |
| `app_scope` | App scope | string | - | - |
| `semaphore_wait_time_1` | First run semaphore wait time | integer | - | - |
| `view_id` | View | reference | sys_ui_view | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sql_count_2` | Second run sql count | integer | - | - |
| `protocol` | Protocol | string | - | - |
| `total_wait_time_1` | First run total wait time | integer | - | - |
| `ui_policy_time` | UI policy time | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.582Z*