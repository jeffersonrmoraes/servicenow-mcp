# ServiceNow Table: Send To Self Notification Usage (sn_ex_sp_send_to_self_notification_usage)

**Category:** CORE
**SysID:** 9cc6ba86183e32108bb255f46a373a21

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `schedule_email_count` | Schedule Email Count | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `kb_email_count` | Kb Email Count | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `date` | Date | glide_date | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user` | User | reference | sys_user | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `portal` | Portal | reference | sp_portal | ✅ |
| `schedule_sms_count` | Schedule SMS Count | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `kb_sms_count` | Kb SMS Count | integer | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.824Z*