# ServiceNow Table: SubFlow Plan (sys_flow_subflow_plan)

**Category:** SYSTEM
**SysID:** f6b1be02183a32108bb255f46a373a89

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `plan_id` | Plan Id | reference | sys_hub_flow | - |
| `snapshot` | Snapshot Id | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_overrides` | Sys overrides | reference | sys_flow_subflow_plan | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `plan` | Plan | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.144Z*