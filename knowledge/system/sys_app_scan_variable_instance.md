# ServiceNow Table: Scan Variable Instance (sys_app_scan_variable_instance)

**Category:** SYSTEM
**SysID:** 4202b2c6183a32108bb255f46a373ae0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `error` | Error | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `scan_variable` | Scan Variable | reference | sys_app_scan_variable | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `template_instance` | Template Instance | reference | sys_app_template_instance | - |
| `sys_updated_by` | Updated by | string | - | - |
| `value` | Value | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.291Z*