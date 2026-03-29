# ServiceNow Table: Email (sys_email)

**Category:** CORE
**SysID:** 912ba602183232108bb255f46a373a22

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `body` | Body | string_full_utf8 | - | - |
| `reply_to` | Reply to | string | - | - |
| `receive_type` | Receive type | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `user_id` | User ID | reference | sys_user | - |
| `deleted` | Deleted | boolean | - | - |
| `checkpoint` | Checkpoint | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `uid` | UID | string | - | - |
| `copied` | Copied | string | - | - |
| `message_id` | Message ID | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `recipients` | Recipients | string | - | - |
| `error_string` | Error string | string | - | - |
| `status` | Status | string | - | - |
| `notification_type` | Notification type | string | - | - |
| `mailbox` | Mailbox | reference | sys_mailbox | - |
| `subject` | Subject | string_full_utf8 | - | - |
| `headers` | Headers | string | - | - |
| `weight` | Weight | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user` | User | string | - | - |
| `blind_copied` | Blind copied | string | - | - |
| `instance` | Target | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `type` | Type | string | - | - |
| `direct` | To | string | - | - |
| `importance` | Importance | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `body_text` | Body text | string_full_utf8 | - | - |
| `content_type` | Content type | string | - | - |
| `target_table` | Target table | short_table_name | - | - |
| `state` | State | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:08.300Z*