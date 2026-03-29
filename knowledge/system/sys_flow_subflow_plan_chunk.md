# ServiceNow Table: Subflow Plan Chunk (sys_flow_subflow_plan_chunk)

**Category:** SYSTEM
**SysID:** d3a17602183a32108bb255f46a373a8c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `field` | Field | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `length` | Length | integer | - | - |
| `data` | Data | string | - | - |
| `document_id` | Document ID | reference | sys_flow_subflow_plan | - |
| `sys_id` | Sys ID | GUID | - | - |
| `position` | Position | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.153Z*