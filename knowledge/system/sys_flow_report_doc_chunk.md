# ServiceNow Table: Flow Report Chunk (Running) (sys_flow_report_doc_chunk)

**Category:** SYSTEM
**SysID:** bfa1b602183a32108bb255f46a373a72

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `position` | Position | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `data` | Data | string | - | - |
| `document_id` | Document ID | reference | sys_flow_report_doc | - |
| `sys_id` | Sys ID | GUID | - | - |
| `field` | Field | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `length` | Length | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.716Z*