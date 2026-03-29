# ServiceNow Table: Process Flow Trigger Plan (sys_flow_trigger_plan)

**Category:** SYSTEM
**SysID:** 22b17e02183a32108bb255f46a373af6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `plan_id` | Plan Id | string | - | - |
| `snapshot` | Snapshot Id | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `plan` | Plan | json | - | - |
| `binding_strategy` | Binding strategy | choice | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_overrides` | Sys overrides | reference | sys_flow_trigger_plan | - |
| `sys_created_by` | Created by | string | - | - |
| `trigger` | Trigger | reference | sys_flow_trigger | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.833Z*