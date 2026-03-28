# ServiceNow Table: API Integration Daily Statistic (sys_api_integration_daily_stats)

**Category:** SYSTEM
**SysID:** 2422f24a183a32108bb255f46a373a35

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `hash` | Hash | integer | - | - |
| `requestor` | Requestor | reference | sys_user | - |
| `sys_updated_by` | Updated by | string | - | - |
| `start_period` | Start period | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `resource` | Resource | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `count` | Count | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `registered_application` | Registered application | reference | oauth_entity | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:22.944Z*