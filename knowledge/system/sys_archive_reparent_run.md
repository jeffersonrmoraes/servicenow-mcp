# ServiceNow Table: Archive Reparent Run (sys_archive_reparent_run)

**Category:** SYSTEM
**SysID:** 4a6b6ec2183232108bb255f46a373a26

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `end` | End | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `retry_count` | Retry count | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `state` | State | choice | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `archive_run` | Archive run | reference | sys_archive_run | - |
| `start` | Start | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `duration` | Duration | glide_duration | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.720Z*