# ServiceNow Table: Flow Data (sys_flow_data)

**Category:** SYSTEM
**SysID:** c0b1b602183a32108bb255f46a373ae7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `definition` | Definition | reference | sys_flow_data_definition | - |
| `assignment_group` | Assignment group | reference | sys_user_group | - |
| `sys_updated_by` | Updated by | string | - | - |
| `state` | State | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `vars` | Vars | glide_var | sys_flow_data_var | - |
| `sys_id` | Sys ID | GUID | - | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.190Z*