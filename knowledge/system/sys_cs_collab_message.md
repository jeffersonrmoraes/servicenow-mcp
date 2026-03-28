# ServiceNow Table: Collaboration Chat Message (sys_cs_collab_message)

**Category:** SYSTEM
**SysID:** 4b1776ca183e32108bb255f46a373a31

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent_message` | Parent Message | reference | sys_cs_collab_message | - |
| `sequence` | Sequence | counter | - | - |
| `search_string` | Search String | string_full_utf8 | - | - |
| `generative_ai_log_id` | Generative AI Log ID | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `edited` | Message Edited | boolean | - | - |
| `sent_by_member` | Sent by member | reference | sys_cs_collab_member | - |
| `editable` | Message Editable | boolean | - | - |
| `payload` | Payload | string_full_utf8 | - | ✅ |
| `collab_chat_id` | Collab chat id | GUID | - | - |
| `user_specific` | User Specific | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `message_size` | Message Size | integer | - | - |
| `deleted` | Deleted | boolean | - | - |
| `dismissed` | Dismissed | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `status` | Status | string | - | ✅ |
| `posted` | Posted | boolean | - | - |
| `message_audience` | Message Audience | glide_list | sys_cs_collab_member | - |
| `sys_updated_by` | Updated by | string | - | - |
| `collab_chat` | Collaboration Chat | reference | sys_cs_collab_chat | ✅ |
| `message_type` | Message Type | string | - | ✅ |
| `deleted_on` | Deleted On | glide_date_time | - | - |
| `feedback` | Feedback | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `pinned` | Message is Pinned | boolean | - | - |
| `sender` | Sender | string | - | - |
| `external_message_id` | External Message ID | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `edited_on` | The time of this message's most recent edit | glide_date_time | - | - |
| `pinned_by` | Pinned by | reference | sys_user | - |
| `failed_delivery_providers` | Failed Delivery Providers | glide_list | sys_cs_collab_provider | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.601Z*