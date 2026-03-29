# ServiceNow Table: Flow Stages (sys_hub_flow_stage)

**Category:** SYSTEM
**SysID:** fec13e42183a32108bb255f46a373ab2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `label` | Label | string | - | - |
| `always_show` | Always show | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |
| `flow` | Flow | reference | sys_hub_flow_base | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `ancestor_stage_id` | Ancestor stage ID | string | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `stage_id` | Stage ID | string | - | - |
| `ancestral_if_else_logic` | Ancestral if else logic | string | - | - |
| `ancestor_array_position` | Ancestor array position | integer | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `component_indexes` | Component indexes | string | - | - |
| `ancestor_component_id` | Ancestor component ID | string | - | - |
| `value` | Value | string | - | - |
| `states` | States | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `duration` | Duration | glide_date_time | - | - |
| `order` | Order | integer | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:22.743Z*