# ServiceNow Table: Email Reply Flows (sys_flow_wait_for_email_reply_action)

**Category:** SYSTEM
**SysID:** 90b1f602183a32108bb255f46a373a6d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `target_table` | Target Table | table_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `wait_token` | Wait Token | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sent_email` | Sent Email | reference | sys_email | - |
| `flow_context` | Flow Context | reference | sys_flow_context | - |
| `watermark` | Watermark | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `target` | Target | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `cursor_label` | Cursor Label | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.865Z*