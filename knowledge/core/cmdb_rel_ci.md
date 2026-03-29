# ServiceNow Table: CI Relationship (cmdb_rel_ci)

**Category:** CORE
**SysID:** 026d664218f232108bb255f46a373ac0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `port` | Port | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `child` | Child | reference | cmdb_ci | - |
| `sys_id` | Sys ID | GUID | - | - |
| `connection_strength` | Connection strength | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `type` | Type | reference | cmdb_rel_type | - |
| `sys_updated_by` | Updated by | string | - | - |
| `percent_outage` | Percent outage | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `parent` | Parent | reference | cmdb_ci | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:11.639Z*