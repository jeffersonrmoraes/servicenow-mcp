# ServiceNow Table: Flow engine log entry (sys_flow_log)

**Category:** SYSTEM
**SysID:** 27a1b602183a32108bb255f46a373a5b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `level` | Level | string | - | - |
| `order` | Order | counter | - | - |
| `action` | Action | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `context` | Context | reference | sys_flow_context | - |
| `operation` | Operation | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `message` | Message | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.719Z*