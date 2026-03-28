# ServiceNow Table: User Experience Analytics Data Points Error (sys_analytics_data_points_error)

**Category:** SYSTEM
**SysID:** ff7ca68e187232108bb255f46a373a3f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `req_timestamp` | Request Timestamp | long | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `properties` | Event Properties | json | - | ✅ |
| `type_properties` | Event Type Properties | json | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `type` | Event Type | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `api_key` | API Key | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sdk_timestamp` | SDK Timestamp | long | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Event Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:20.109Z*