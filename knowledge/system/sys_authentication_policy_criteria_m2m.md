# ServiceNow Table: List of filter criteria (sys_authentication_policy_criteria_m2m)

**Category:** SYSTEM
**SysID:** 99723ace183a32108bb255f46a373a1f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `sys_auth_filter_criteria` | Filter Criteria | reference | sys_auth_filter_criteria | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `policy` | Policy | reference | sys_authentication_policy | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `used` | Used | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.493Z*