# ServiceNow Table: Attachment Attributes (sys_attachment_attribute)

**Category:** SYSTEM
**SysID:** 182b2602183232108bb255f46a373a65

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `key` | Key | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `value` | Value | translated_text | - | - |
| `sys_attachment` | Sys Attachment | reference | sys_attachment | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:38.977Z*