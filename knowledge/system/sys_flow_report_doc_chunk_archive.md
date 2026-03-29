# ServiceNow Table: Flow Report Chunk (Finished) (sys_flow_report_doc_chunk_archive)

**Category:** SYSTEM
**SysID:** f7a1b602183a32108bb255f46a373aa5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `field` | Field | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `length` | Length | integer | - | - |
| `document_id` | Document ID | reference | sys_flow_report_doc | - |
| `sys_id` | Sys ID | GUID | - | - |
| `position` | Position | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `data` | Data | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.664Z*