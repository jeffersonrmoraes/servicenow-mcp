# ServiceNow Table: User Experience Analytics Data Points Queue (sys_analytics_data_points_queue)

**Category:** SYSTEM
**SysID:** 848ca68e187232108bb255f46a373ad7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sdk_timestamp` | SDK Timestamp | long | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Event Name | string | - | ✅ |
| `type` | Event Type | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `api_key` | API Key | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `type_properties` | Event Type Properties | json | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `req_timestamp` | Request Timestamp | long | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `properties` | Event Properties | json | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:20.148Z*