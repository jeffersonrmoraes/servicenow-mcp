# ServiceNow Table: Concurrent processes On Message (sys_cs_concurrent_process)

**Category:** SYSTEM
**SysID:** d9f6368a183e32108bb255f46a373a62

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `service_name` | Service Name | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `conversation_id` | Conversation | reference | sys_cs_conversation | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `invocation_sys_id` | FDIH Invocation | reference | sys_cs_fdih_invocation | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `message_id` | Message | reference | sys_cs_message | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `state` | State | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.054Z*