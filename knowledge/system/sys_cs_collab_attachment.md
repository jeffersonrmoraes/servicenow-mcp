# ServiceNow Table: Collaboration Chat Attachment (sys_cs_collab_attachment)

**Category:** SYSTEM
**SysID:** db1776ca183e32108bb255f46a373ae8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `file_name` | File name | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `document` | Document ID | document_id | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `attachment_sys_id` | Attachment sys id | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `table` | Table | table_name | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.129Z*