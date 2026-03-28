# ServiceNow Table: Conversation Server Daily Telemetry Trace (sys_cs_telemetry_trace_daily)

**Category:** SYSTEM
**SysID:** 25073e8a183e32108bb255f46a373a6a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `experience` | Experience | choice | - | - |
| `channel` | Channel | reference | sys_cs_channel | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sub_type` | Sub type | choice | - | - |
| `average_time` | Average time (ms) | longint | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `query_type` | Query type | choice | - | - |
| `model` | Model | reference | sys_generative_ai_model_config | - |
| `sys_id` | Sys ID | GUID | - | - |
| `capability` | Capability | reference | sys_one_extend_capability | - |
| `device_type` | Device type | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `type` | Type | choice | - | - |
| `date` | Date | glide_date | - | - |
| `sys_created_by` | Created by | string | - | - |
| `assistant` | Assistant | reference | sys_now_assist_deployment | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:16.614Z*