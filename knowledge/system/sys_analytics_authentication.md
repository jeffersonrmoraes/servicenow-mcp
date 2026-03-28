# ServiceNow Table: User Experience Analytics Authentications (sys_analytics_authentication)

**Category:** SYSTEM
**SysID:** e37c668e187232108bb255f46a373a68

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `analytics_bucket` | Analytics Bucket | reference | sys_analytics_bucket | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `registration_instance_id` | Registration Instance ID | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `api_auth` | API Auth | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:18.666Z*