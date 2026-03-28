# ServiceNow Table: Collaboration Chat Associated Record (sys_cs_collab_record)

**Category:** SYSTEM
**SysID:** 321776ca183e32108bb255f46a373a1e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `collab_chat` | Collaboration Chat | reference | sys_cs_collab_chat | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `document` | Document ID | document_id | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.667Z*