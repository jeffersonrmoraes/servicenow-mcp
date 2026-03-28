# ServiceNow Table: CS One Api Call Log (sys_cs_one_api_call_log)

**Category:** SYSTEM
**SysID:** ecf6b28a183e32108bb255f46a373acf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `conversation_task` | Conversation task | reference | sys_cs_conversation_task | - |
| `sys_mod_count` | Updates | integer | - | - |
| `service_plan_invocation` | Service Plan Invocation | reference | one_api_service_plan_invocation | - |
| `call_context` | Call context | simple_name_values | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `hook` | Hook | string | - | - |
| `session_context` | Deprecated One Api Glide Session Context | simple_name_values | - | - |
| `sys_created_by` | Created by | string | - | - |
| `transaction_id` | Transaction Id | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `service_plan` | Service plan | reference | one_api_service_plan | - |
| `str_session_context` | One Api Glide Session Context | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `one_api_mapping` | One Api Mapping | reference | sys_cs_one_api_service_plan_mapping | - |
| `user_id` | User Id | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.754Z*