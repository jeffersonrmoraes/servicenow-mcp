# ServiceNow Table: Plan Context Binding (sys_flow_plan_context_binding)

**Category:** SYSTEM
**SysID:** 8ab13e02183a32108bb255f46a373ac3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_flow_context` | Sys flow context | reference | sys_flow_context | - |
| `sys_flow_trigger` | Sys flow trigger | reference | sys_flow_trigger | - |
| `sys_id` | Sys ID | GUID | - | - |
| `plan_id` | Plan ID | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `hash_code` | Hash code | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.722Z*