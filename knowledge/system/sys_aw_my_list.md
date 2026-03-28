# ServiceNow Table: My Workspace List (sys_aw_my_list)

**Category:** SYSTEM
**SysID:** 2e927682187a32108bb255f46a373a76

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `condition` | Conditions | conditions | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order | decimal | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `title` | List name | translated_field | - | ✅ |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `table` | Table | table_name | - | ✅ |
| `active` | Active | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `columns` | Columns | field_list | - | ✅ |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.155Z*