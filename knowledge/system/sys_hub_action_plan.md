# ServiceNow Table: Action Plan (sys_hub_action_plan)

**Category:** SYSTEM
**SysID:** 26b1be02183a32108bb255f46a373a14

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `plan` | Plan | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `action_id` | Action Id | reference | sys_hub_action_type_definition | - |
| `snapshot` | Snapshot | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_overrides` | Sys overrides | reference | sys_hub_action_plan | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:20.509Z*