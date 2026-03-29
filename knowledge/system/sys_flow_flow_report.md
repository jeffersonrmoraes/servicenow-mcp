# ServiceNow Table: Flow engine context flow report (sys_flow_flow_report)

**Category:** SYSTEM
**SysID:** 3fb1b242183a32108bb255f46a373a18

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `subflow` | Subflow | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `parent_report` | Parent Report | reference | sys_flow_flow_report | - |
| `flow` | Flow | string | - | - |
| `execution_domain` | Execution Domain | domain_id | - | - |
| `wait_time` | Wait Time(ms) | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.955Z*