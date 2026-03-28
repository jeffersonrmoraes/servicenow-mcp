# ServiceNow Table: API Transactions Requestor Stats (sys_api_stats_requestor)

**Category:** SYSTEM
**SysID:** 1e3feec2187632108bb255f46a373a3b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `api_name` | API Name | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `resource` | Resource | string | - | - |
| `count` | Request Count | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `start_period` | Start Period | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `requestor` | Requestor | reference | sys_user | - |
| `type` | API Type | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `aggregated_monthly` | Aggregated To Monthly | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `version` | Version | string | - | - |
| `method` | Method | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:22.950Z*