# ServiceNow Table: Portal notification content (sn_ex_sp_notifs_portal_notification_content)

**Category:** CORE
**SysID:** c9c63e86183e32108bb255f46a373a08

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `events` | Events | glide_list | sysevent | - |
| `reminder` | Reminder | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `actors` | Actors | glide_list | sys_user | - |
| `notification` | Notification | reference | sys_notification | - |
| `sys_mod_count` | Updates | integer | - | - |
| `content_template` | Content template | string | - | - |
| `status` | Status | choice | - | - |
| `table` | Table | table_name | - | - |
| `notification_executions` | Notification executions | glide_list | sys_notification_execution | - |
| `sys_updated_by` | Updated by | string | - | - |
| `content_params` | Content params | string | - | - |
| `portals` | Portals | glide_list | sp_portal | - |
| `sys_id` | Sys ID | GUID | - | - |
| `record` | Record | document_id | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `user` | User | reference | sys_user | ✅ |
| `notification_content_config` | Portal notification content config | reference | sn_ex_sp_notifs_portal_notification_content_config | - |
| `order` | Order | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `action_url` | Action url | url | - | - |
| `critical` | Critical | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.110Z*