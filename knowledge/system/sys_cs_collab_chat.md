# ServiceNow Table: Collaboration Chat (sys_cs_collab_chat)

**Category:** SYSTEM
**SysID:** 6f17b6ca183e32108bb255f46a373a6b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `title` | Collab Chat Title | string | - | ✅ |
| `chat_completed` | Collaboration Chat Completed | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `is_chat_private` | Is Chat Private | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `last_sent_message` | Last sent message in the collab chat | reference | sys_cs_collab_message | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `has_document` | Has Document | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `state` | Collab Chat State | string | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.155Z*