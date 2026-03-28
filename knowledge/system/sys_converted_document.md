# ServiceNow Table: Converted Document (sys_converted_document)

**Category:** SYSTEM
**SysID:** 26137e0e187a32108bb255f46a373a58

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `doc_conversion_request` | Document Conversion Request | reference | sys_document_conversion_request | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `attachment` | Attachment | reference | sys_attachment | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.916Z*