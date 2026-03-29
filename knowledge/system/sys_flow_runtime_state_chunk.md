# ServiceNow Table: Flow Runtime State Chunk (sys_flow_runtime_state_chunk)

**Category:** SYSTEM
**SysID:** 78b13a02183a32108bb255f46a373aae

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `field` | Field | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `length` | Length | integer | - | - |
| `document_id` | Document ID | reference | sys_flow_context | - |
| `sys_id` | Sys ID | GUID | - | - |
| `position` | Position | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `data` | Data | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:29.417Z*