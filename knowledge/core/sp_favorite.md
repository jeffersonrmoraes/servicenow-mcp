# ServiceNow Table: Portal Favorite (sp_favorite)

**Category:** CORE
**SysID:** f4b0ba8a18b632108bb255f46a373a58

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `user` | User | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `reference_table` | Reference table | table_name | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `last_viewed` | Last Viewed | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `reference_document` | Reference document | document_id | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:12.673Z*