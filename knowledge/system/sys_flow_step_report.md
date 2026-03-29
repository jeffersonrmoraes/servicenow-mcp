# ServiceNow Table: Flow engine context step report (sys_flow_step_report)

**Category:** SYSTEM
**SysID:** b7b1b242183a32108bb255f46a373a2a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `step` | Step | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `flow_report` | Flow report | reference | sys_flow_flow_report | - |
| `name` | Name | string | - | - |
| `action_report` | Action report | reference | sys_flow_action_report | - |
| `runtime_metadata` | Runtime Metadata | json | - | - |
| `id` | ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.112Z*