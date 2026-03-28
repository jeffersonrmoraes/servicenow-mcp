# ServiceNow Table: Application Quota (sys_app_quota)

**Category:** SYSTEM
**SysID:** a5cbe24e183232108bb255f46a373ab9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `jobs_count` | Jobs Count | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `node_id` | Node ID | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `events_count` | Events Count | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.897Z*