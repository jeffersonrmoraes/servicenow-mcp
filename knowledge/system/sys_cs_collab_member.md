# ServiceNow Table: Collaboration Chat Member (sys_cs_collab_member)

**Category:** SYSTEM
**SysID:** d617f2ca183e32108bb255f46a373ae9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `member_type` | Member Type | string | - | ✅ |
| `collab_chat` | Collaboration Chat | reference | sys_cs_collab_chat | ✅ |
| `frame_state` | Frame state | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `member_group` | Member Group | reference | sys_cs_collab_member_group | ✅ |
| `dismissed` | Dismissed | boolean | - | - |
| `table` | Table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `provider_application` | Provider Application | reference | sys_cs_provider_application | - |
| `document` | Document ID | document_id | - | - |
| `collab_user` | Collab User | reference | sys_cs_collab_user | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `last_read_message` | Last Read Message ID | reference | sys_cs_collab_message | - |
| `favorite` | Favorite | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `member` | Member | reference | sys_cs_channel_user_profile | ✅ |
| `frame_order` | Frame order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.184Z*