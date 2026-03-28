# ServiceNow Table: Conversation Member (sys_cs_conversation_member)

**Category:** SYSTEM
**SysID:** f7f63a8a183e32108bb255f46a373ae1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `handling_time` | Handling Time | glide_duration | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `member_type` | Member Type | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `member` | Member | reference | sys_cs_channel_user_profile | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:07.949Z*