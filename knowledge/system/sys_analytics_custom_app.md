# ServiceNow Table: User Experience Analytics Custom App (sys_analytics_custom_app)

**Category:** SYSTEM
**SysID:** 2f7c668e187232108bb255f46a373a38

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `application_name` | Name | string | - | ✅ |
| `analytics_channel` | Application Analytics Channel | reference | sys_analytics_channel | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:20.114Z*