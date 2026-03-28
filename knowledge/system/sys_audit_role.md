# ServiceNow Table: Audit Roles (sys_audit_role)

**Category:** SYSTEM
**SysID:** 524b2a42183232108bb255f46a373a3c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_created_by` | Created by | string | - | - |
| `changed_by` | Changed by | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `granted_by_group` | Granted by group | reference | sys_user_group | - |
| `sys_updated_by` | Updated by | string | - | - |
| `count_after_change` | Count after change | integer | - | - |
| `user` | User | reference | sys_user | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `operation` | Operation | string | - | - |
| `role` | Role | reference | sys_user_role | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.459Z*