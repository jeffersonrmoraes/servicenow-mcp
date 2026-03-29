# ServiceNow Table: Get Support (sn_ex_sp_get_support)

**Category:** CORE
**SysID:** 9cc6ba86183e32108bb255f46a373a6a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `content` | Content | document_id | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `portal` | Portal | glide_list | sp_portal | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `table` | Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:17.405Z*