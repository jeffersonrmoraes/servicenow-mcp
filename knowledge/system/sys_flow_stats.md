# ServiceNow Table: Flow statistic (sys_flow_stats)

**Category:** SYSTEM
**SysID:** 6fa1b602183a32108bb255f46a373a24

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `value` | Value | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `key` | Key | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `context` | Context | reference | sys_flow_context | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.116Z*