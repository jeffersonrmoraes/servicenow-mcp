# ServiceNow Table: Conversation Task FDIH Invocation (sys_cs_fdih_invocation)

**Category:** SYSTEM
**SysID:** 6c07ba8a183e32108bb255f46a373a27

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sent_on` | Sent On | glide_date_time | - | ✅ |
| `outputs_received_on` | Outputs Received On | glide_date_time | - | - |
| `async_caller` | Async Caller | string | - | - |
| `wait_timeout` | Wait timeout | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Name | string | - | ✅ |
| `error` | Error | string | - | - |
| `api` | Api | document_id | - | - |
| `sys_domain` | Request Domain | domain_id | - | - |
| `type` | Type | string | - | ✅ |
| `cancelled_reason` | Cancelled Reason | string | - | - |
| `context_id` | Context ID | string | - | - |
| `callback_mode` | Callback Mode | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `response_state` | Response State | string | - | - |
| `outputs` | Outputs | json | - | - |
| `dynamic_output_topic_var` | Dynamic Output Topic Car | string | - | - |
| `run_as_system` | Run as system | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `execution_mode` | Execution Mode | string | - | ✅ |
| `inputs` | Inputs | json | - | - |
| `dynamic` | Dynamic | boolean | - | - |
| `callback_time_taken` | Callback Time Taken | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `quick_execute_caller_token` | Quick Execution Caller Token | string | - | - |
| `output_topic_vars` | Output Topic Vars | json | - | - |
| `dynamic_output_types` | Dynamic Output Types | json | - | - |
| `continue_on_error` | Continue on error | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `calling_cs_conversation_task` | Calling Conversation Task | reference | sys_cs_conversation_task | - |
| `errored_on` | Errored On | glide_date_time | - | - |
| `timed_out_on` | Timed Out On | glide_date_time | - | - |
| `trace_id` | Trace ID | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `execution_context` | Execution Context | reference | sys_flow_context | - |
| `cancelled_on` | Cancelled On | glide_date_time | - | - |
| `api_source` | Api source | table_name | - | - |
| `callback_id` | Callback ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.854Z*