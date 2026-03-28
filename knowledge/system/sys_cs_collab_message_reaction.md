# ServiceNow Table: Collaboration Chat Message Reaction (sys_cs_collab_message_reaction)

**Category:** SYSTEM
**SysID:** 1f17b6ca183e32108bb255f46a373a23

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `message` | Message | reference | sys_cs_collab_message | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `reaction` | Reaction | string_full_utf8 | - | - |
| `sys_created_by` | Created by | string | - | - |
| `reaction_time` | Send Time | glide_date_time | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `member` | Sent by member | reference | sys_cs_collab_member | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.587Z*