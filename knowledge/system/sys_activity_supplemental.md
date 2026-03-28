# ServiceNow Table: Sys Activity Supplemental (sys_activity_supplemental)

**Category:** SYSTEM
**SysID:** a35f22c6187632108bb255f46a373abe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `event_id` | Event ID | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `payload` | Payload | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user_sys_id` | User sys ID | reference | sys_user | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `document_id` | Document ID | GUID | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:16.971Z*