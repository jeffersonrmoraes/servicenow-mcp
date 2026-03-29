# ServiceNow Table: Flow Context Inputs Chunk (sys_flow_context_inputs_chunk)

**Category:** SYSTEM
**SysID:** 0cb1f602183a32108bb255f46a373a05

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `field` | Field | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `length` | Length | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `original_inputs` | Original inputs | boolean | - | - |
| `data` | Data | string | - | - |
| `document_id` | Document ID | reference | sys_flow_context | - |
| `position` | Position | integer | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.203Z*