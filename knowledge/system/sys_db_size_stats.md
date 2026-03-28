# ServiceNow Table: DB Size Stats (sys_db_size_stats)

**Category:** SYSTEM
**SysID:** 5773fac218ba32108bb255f46a373a83

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sample_period_start` | Last collection start time | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `storage_type` | Type | reference | sys_storage_type | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `name` | Name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `db_size_in_gb` | DB size in GB | float | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sample_period_type` | Sample period type | choice | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:20.938Z*