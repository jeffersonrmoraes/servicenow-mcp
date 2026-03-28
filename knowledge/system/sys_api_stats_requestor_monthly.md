# ServiceNow Table: API Transactions Requestor Monthly Stats (sys_api_stats_requestor_monthly)

**Category:** SYSTEM
**SysID:** f6127e0a183a32108bb255f46a373a5c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `api_name` | API Name | string | - | - |
| `resource` | Resource | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `count` | Request Count | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `start_period` | Start Period | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `type` | API Type | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `requestor` | Requestor | reference | sys_user | - |
| `sys_mod_count` | Updates | integer | - | - |
| `version` | Version | string | - | - |
| `method` | Method | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:22.948Z*