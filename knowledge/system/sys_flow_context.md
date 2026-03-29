# ServiceNow Table: Flow engine context (sys_flow_context)

**Category:** SYSTEM
**SysID:** 2cb1f602183a32108bb255f46a373afc

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `is_test_run` | Is test run | boolean | - | - |
| `calling_source` | Calling Source | string | - | - |
| `transaction` | Transaction | string | - | - |
| `plan` | Plan | json | - | - |
| `application` | Application | string | - | - |
| `reporting` | Reporting | string | - | - |
| `sys_lock_owner` | Conversation Lock Owner | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `attributes` | Attributes | json | - | - |
| `flow` | Flow | string | - | - |
| `engine_version` | Last Executed Release | integer | - | - |
| `sys_lock_touched` | Conversation Lock Touched | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | choice | - | - |
| `source_table` | Source Table | table_name | - | - |
| `snapshot` | Snapshot | string | - | - |
| `error_state` | Error State | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `stages` | Stages | reference | stage_state | - |
| `flow_catalog_model` | Flow catalog model | reference | sys_flow_cat_variable_model | - |
| `sys_domain` | Domain | domain_id | - | - |
| `error_message` | Error message | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `run_time` | Runtime | integer | - | - |
| `source_record` | Source Record | document_id | - | - |
| `claimed_by` | Claimed by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | string | - | - |
| `origins` | Origins | json | - | - |
| `skip_schedule_cleanup` | Skip Schedule Cleanup | boolean | - | - |
| `design_source` | Design Time Source | string | - | - |
| `signatures` | Signatures | json | - | - |
| `execution_id` | Execution ID | string | - | - |
| `engine_major_version` | Engine Major Version | integer | - | - |
| `sys_lock_acquired` | Conversation Lock Acquired | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.287Z*