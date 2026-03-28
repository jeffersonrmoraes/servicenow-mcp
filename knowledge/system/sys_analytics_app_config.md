# ServiceNow Table: User Experience Analytics App Configuration (sys_analytics_app_config)

**Category:** SYSTEM
**SysID:** 737c668e187232108bb255f46a373aaf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `platform` | Platform | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `customer_override_configuration` | Customer Configuration | simple_name_values | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `configuration` | Configuration | simple_name_values | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_analytics_app` | Analytics Application | reference | sys_analytics_app | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:18.696Z*