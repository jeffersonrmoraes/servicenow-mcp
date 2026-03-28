# ServiceNow Table: Group (sys_user_group)

**Category:** SYSTEM
**SysID:** 283bea02183232108bb255f46a373a8a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `source` | Source | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `default_assignee` | Default assignee | reference | sys_user | - |
| `include_members` | Include members | boolean | - | - |
| `parent` | Parent | reference | sys_user_group | - |
| `sys_mod_count` | Updates | integer | - | - |
| `email` | Group email | email | - | - |
| `type` | Type | glide_list | sys_user_group_type | - |
| `sys_created_by` | Created by | string | - | - |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `exclude_manager` | Exclude manager | boolean | - | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `manager` | Manager | reference | sys_user | - |
| `active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Name | string | - | - |
| `roles` | Roles | user_roles | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:08:16.365Z*