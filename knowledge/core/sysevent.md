# ServiceNow Table: Event (sysevent)

**Category:** CORE
**SysID:** 8d3b6e02183232108bb255f46a373a24

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `derived_priority` | Derived priority | float | - | - |
| `instance` | Instance | string | - | - |
| `user_id` | User ID | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `name` | Name | string | - | - |
| `descriptive_name` | Descriptive name | string | - | - |
| `process_on` | Process on | glide_date_time | - | - |
| `queue` | Queue | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `parm2` | Parm2 | string | - | - |
| `processing_duration` | Processing duration | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `partition` | Partition | integer | - | - |
| `table` | Table | short_table_name | - | - |
| `uri` | URI | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `state` | State | string | - | - |
| `rollback_context_id` | Rollback context ID | reference | sys_rollback_context | - |
| `processed` | Processed | glide_date_time | - | - |
| `claimed_by` | Claimed by | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `parm1` | Parm1 | string | - | - |
| `user_name` | User name | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:08.668Z*