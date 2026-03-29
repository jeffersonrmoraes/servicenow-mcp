# ServiceNow Table: Activity Access (sn_ex_sp_activity_user_criteria_mtom)

**Category:** CORE
**SysID:** f0c6fa86183e32108bb255f46a373a1d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `activity` | Activity | reference | sn_ex_sp_activity_configuration | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `user_criteria` | Available for | reference | user_criteria | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.669Z*