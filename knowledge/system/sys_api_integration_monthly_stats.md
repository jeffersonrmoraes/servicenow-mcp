# ServiceNow Table: API Integration Monthly Statistic (sys_api_integration_monthly_stats)

**Category:** SYSTEM
**SysID:** a422f24a183a32108bb255f46a373a1c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `registered_application` | Registered application | reference | oauth_entity | - |
| `sys_id` | Sys ID | GUID | - | - |
| `resource` | Resource | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `count` | Count | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `hash` | Hash | integer | - | - |
| `requestor` | Requestor | reference | sys_user | - |
| `sys_updated_by` | Updated by | string | - | - |
| `start_period` | Start period | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:23.010Z*