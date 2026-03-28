# ServiceNow Table: User Experience Analytics App (sys_analytics_app)

**Category:** SYSTEM
**SysID:** ff7ca68e187232108bb255f46a373a26

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `enable_unauthenticated_user_tracking` | Enable Unauthenticated User Tracking | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `active` | Active | boolean | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `table_name` | Table Name | table_name | - | ✅ |
| `app_sys_id` | Application Sys Id | document_id | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `application_name` | Name | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `analytics_channel` | Analytics Channel | reference | sys_analytics_channel | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:18.667Z*