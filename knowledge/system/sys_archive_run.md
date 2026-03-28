# ServiceNow Table: Archive Run (sys_archive_run)

**Category:** SYSTEM
**SysID:** 466b6ec2183232108bb255f46a373a57

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `related_total` | Related total | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `message` | Message | string | - | - |
| `archive` | Archive | reference | sys_archive | - |
| `end` | End | glide_date_time | - | - |
| `start` | Start | glide_date_time | - | - |
| `total` | Primary total | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `duration` | Duration | glide_duration | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `state` | State | string | - | - |
| `comments` | Comments | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.723Z*