# ServiceNow Table: Archive Rule (sys_archive)

**Category:** SYSTEM
**SysID:** 426b6ec2183232108bb255f46a373a71

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `next_run_date` | Next run date | glide_date_time | - | - |
| `condition` | Conditions | conditions | - | - |
| `active_api_only` | Active api only | boolean | - | - |
| `auto_rearchive_duration` | Duration before auto rearchive of restored records | glide_duration | - | - |
| `name` | Name | string | - | ✅ |
| `auto_rearchive` | Auto rearchive | boolean | - | - |
| `last_run_date` | Last run date | glide_date_time | - | - |
| `description` | Description | string | - | - |
| `create_chunk_complete_event` | Create Chunk Complete Event | boolean | - | - |
| `api_only` | API Only (resets table) | boolean | - | - |
| `parent` | Parent | reference | sys_archive | - |
| `estimate_date` | Estimate date | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `table` | Table | table_name | - | ✅ |
| `destroy_rule` | Destroy rule | reference | sys_archive_destroy | - |
| `retain_references` | Retain references | boolean | - | - |
| `total` | Total | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `record_estimate` | Record estimate | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:30.226Z*