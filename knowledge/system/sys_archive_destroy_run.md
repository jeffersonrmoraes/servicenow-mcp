# ServiceNow Table: Archive Destroy Run (sys_archive_destroy_run)

**Category:** SYSTEM
**SysID:** 0e6b6ec2183232108bb255f46a373a0f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `message` | Message | string | - | - |
| `state` | State | string | - | - |
| `start` | Start | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `destroy_total` | Destroy total | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `end` | End | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `duration` | Duration | glide_duration | - | - |
| `archive_destroy` | Archive destroy | reference | sys_archive_destroy | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.679Z*