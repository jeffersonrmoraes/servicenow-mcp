# ServiceNow Table: Flow engine context report (sys_flow_report)

**Category:** SYSTEM
**SysID:** afb17242183a32108bb255f46a373aef

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `state` | State | string | - | - |
| `output` | Outputs | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `run_time` | Run Time (ms) | integer | - | - |
| `dependents` | Dependents | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `start_time` | Start Time | glide_date_time | - | - |
| `order` | Order | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `mid_time` | Mid Time (ms) | integer | - | - |
| `dependent_on` | Dependent On | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `end_time` | End Time | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `input` | Inputs | json | - | - |
| `context` | Context | reference | sys_flow_context | - |
| `error` | Error | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.686Z*