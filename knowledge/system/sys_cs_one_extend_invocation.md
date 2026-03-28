# ServiceNow Table: Virtual Agent One Extend Invocation (sys_cs_one_extend_invocation)

**Category:** SYSTEM
**SysID:** c1f6f28a183e32108bb255f46a373ac4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `service_plan` | Service plan | reference | one_api_service_plan | - |
| `error` | Error | string | - | - |
| `conversation` | Calling Conversation | reference | sys_cs_conversation | - |
| `inputs` | Inputs | string | - | - |
| `execution_mode` | Execution Mode | string | - | ✅ |
| `output_topic_vars` | Output Topic Vars | string | - | - |
| `sent_on` | Sent On | glide_date_time | - | ✅ |
| `user_id` | User Id | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `str_session_context` | One Api Glide Session Context | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Request Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `timed_out_on` | Timed Out On | glide_date_time | - | - |
| `response_state` | Response State | string | - | - |
| `errored_on` | Errored On | glide_date_time | - | - |
| `calling_cs_conversation_task` | Calling Conversation Task | reference | sys_cs_conversation_task | - |
| `cancelled_on` | Cancelled On | glide_date_time | - | - |
| `gen_ai_log` | Generative Ai Log | reference | sys_generative_ai_log | - |
| `outputs` | Outputs | string | - | - |
| `outputs_received_on` | Outputs Received On | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `transaction_id` | Transaction Id | string | - | - |
| `session_context` | Deprecated One Api Glide Session Context | simple_name_values | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `timeout` | Timeout (Seconds) | integer | - | ✅ |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.765Z*