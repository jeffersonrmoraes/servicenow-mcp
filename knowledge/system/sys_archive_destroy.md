# ServiceNow Table: Archive Destroy Rule (sys_archive_destroy)

**Category:** SYSTEM
**SysID:** 796b2ec2183232108bb255f46a373aa5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `condition` | Conditions | conditions | - | - |
| `total` | Total | integer | - | - |
| `archive_duration` | Archive Duration | glide_duration | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | string | - | - |
| `name` | Name | string | - | ✅ |
| `archive` | Archive | reference | sys_archive | ✅ |
| `estimate_date` | Estimate date | glide_date_time | - | - |
| `record_estimate` | Record estimate | integer | - | - |
| `active` | Active | boolean | - | - |
| `active_api_only` | Active api only | boolean | - | - |
| `api_only` | API Only | boolean | - | - |
| `destroy_related` | Destroy Related Records | boolean | - | - |
| `table` | Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:30.218Z*