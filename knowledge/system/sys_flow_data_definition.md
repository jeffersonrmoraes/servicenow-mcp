# ServiceNow Table: Data Definition (sys_flow_data_definition)

**Category:** SYSTEM
**SysID:** b7a1b602183a32108bb255f46a373a98

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `process_snapshot` | Process snapshot | reference | sys_pd_snapshot | - |
| `process_definition` | Process definition | reference | sys_pd_process_definition | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.285Z*