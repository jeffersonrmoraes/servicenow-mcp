# ServiceNow Table: Deflection Log (sys_cs_deflection_log)

**Category:** SYSTEM
**SysID:** 0af6768a183e32108bb255f46a373a3f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `channel` | Channel | reference | sys_cs_channel | - |
| `device_type` | Device Type | choice | - | - |
| `conversation_id` | Conversation | reference | sys_cs_conversation | ✅ |
| `response_code` | Response code | choice | - | - |
| `output_type` | Output Type | choice | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `deflection_type` | Deflection type | choice | - | - |
| `context_profile` | Context profile | reference | sys_cs_context_profile | - |
| `message_id` | Message | reference | sys_cs_message | - |
| `sys_created_by` | Created by | string | - | - |
| `resource_id` | Resource | document_id | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `resource_table` | Resource table | table_name | - | - |
| `requestor` | Requestor | reference | sys_user | - |
| `fallback` | Fallback | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `num_of_turns` | Number of turns | integer | - | - |
| `assistant` | Assistant | reference | sys_now_assist_deployment | - |
| `portal` | Portal | reference | sp_portal | - |
| `experience` | Experience | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `mode` | Mode | choice | - | - |
| `state` | State | choice | - | - |
| `fdih_invocation_id` | FDIH Invocation | reference | sys_cs_fdih_invocation | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.412Z*