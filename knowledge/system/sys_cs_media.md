# ServiceNow Table: Conversation Media (sys_cs_media)

**Category:** SYSTEM
**SysID:** 76f6f68a183e32108bb255f46a373a18

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_attachment_id` | Sys Attachment Id | reference | sys_attachment | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `media_id` | Media Id | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `sys_id` | Sys ID | GUID | - | - |
| `is_private` | Is private | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `api_version` | API Version | integer | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.295Z*