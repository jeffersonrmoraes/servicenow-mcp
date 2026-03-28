# ServiceNow Table: Collaboration Chat Message Post (sys_cs_collab_message_post)

**Category:** SYSTEM
**SysID:** 0f1776ca183e32108bb255f46a373a97

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `message` | Message | reference | sys_cs_collab_message | - |
| `sys_id` | Sys ID | GUID | - | - |
| `collab_chat` | Collaboration Chat | reference | sys_cs_collab_chat | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `posted_by_member` | Posted by member | reference | sys_cs_collab_member | - |
| `sys_updated_by` | Updated by | string | - | - |
| `document` | Document ID | document_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.648Z*