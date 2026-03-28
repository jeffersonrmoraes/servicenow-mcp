# ServiceNow Table: User Experience Analytics User Property Configuration (sys_analytics_user_property_config)

**Category:** SYSTEM
**SysID:** 337ca68e187232108bb255f46a373a0a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `field_name` | Field | reference | sys_dictionary | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `is_configurable` | Is field configurable | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `is_synchronized` | Is synchronized | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `table_name` | Table | reference | sys_db_object | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:21.581Z*