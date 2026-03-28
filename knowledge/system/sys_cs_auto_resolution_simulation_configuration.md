# ServiceNow Table: Simulation Configuration (sys_cs_auto_resolution_simulation_configuration)

**Category:** SYSTEM
**SysID:** 62873e42187e32108bb255f46a373ace

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `record_set` | Record set | conditions | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `message` | Message | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `scheduled_job` | Scheduled job | reference | sysauto_script | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `target_table` | Target table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `auto_res_config` | Auto-Resolution configuration | reference | sys_cs_auto_resolution_configuration | ✅ |
| `state` | State | choice | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.308Z*