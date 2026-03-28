# ServiceNow Table: Workspace List (sys_aw_list)

**Category:** SYSTEM
**SysID:** 72927682187a32108bb255f46a373ac6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user` | User | reference | sys_user | - |
| `sys_domain` | Domain | domain_id | - | - |
| `order` | Order | decimal | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `category` | Category | reference | sys_aw_list_category | ✅ |
| `list_attributes` | List Attributes | string | - | - |
| `title` | List name | translated_field | - | ✅ |
| `columns` | Columns | field_list | - | ✅ |
| `active` | Active | boolean | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `condition` | Conditions | conditions | - | - |
| `sys_overrides` | Overrides | reference | sys_aw_list | - |
| `groups` | Groups | glide_list | sys_user_group | - |
| `roles` | Roles | user_roles | - | - |
| `table` | Table | table_name | - | ✅ |
| `workspace` | Workspace | reference | sys_aw_master_config | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.781Z*