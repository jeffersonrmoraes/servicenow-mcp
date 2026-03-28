# ServiceNow Table: Channel User Profile (sys_cs_channel_user_profile)

**Category:** SYSTEM
**SysID:** e3f63a8a183e32108bb255f46a373a40

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `display_name` | Display Name | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `channel_user_id` | Channel user ID | string | - | ✅ |
| `expired_on` | Expired on | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `user_table` | User table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `user_document` | User document | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `timezone` | Timezone | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `channel` | Channel | reference | sys_cs_channel | ✅ |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.777Z*