# ServiceNow Table: Service Portal Log Entry (sp_log)

**Category:** CORE
**SysID:** 6ca0b64a18b632108bb255f46a373a3d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `id` | ID | document_id | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `text` | Text | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `page` | Page | reference | sp_page | - |
| `sys_mod_count` | Updates | integer | - | - |
| `type` | Type | string | - | - |
| `portal` | Portal | reference | sp_portal | - |
| `table` | Table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `count` | Count | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `user` | User | reference | sys_user | - |
| `session_id` | Session ID | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:13.403Z*