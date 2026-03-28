# ServiceNow Table: Archive Destroy Job Execution Chunk (sys_archive_destroy_chunk)

**Category:** SYSTEM
**SysID:** 066b6ec2183232108bb255f46a373acd

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `system_id` | System ID | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `keys` | Keys | string | - | - |
| `state` | State | choice | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `job_execution` | Job execution | reference | sys_archive_destroy_run | - |
| `start` | Start | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `message` | Message | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `claimed_by` | Claimed by | string | - | - |
| `archive_duration` | Archive Duration | glide_duration | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `key_count` | Key count | integer | - | - |
| `destroy_rule_id` | Destroy rule ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.652Z*