# ServiceNow Table: My UX List (sys_ux_my_list)

**Category:** SYSTEM
**SysID:** 7001328218f632108bb255f46a373a1e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `title` | Title | translated_field | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `shared_groups` | Shared groups | glide_list | sys_user_group | - |
| `sys_created_by` | Created by | string | - | - |
| `fixed_query` | Fixed query | conditions | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `condition` | Conditions | conditions | - | - |
| `max_columns` | Max columns | decimal | - | - |
| `order` | Order | decimal | - | ✅ |
| `tiny_id` | Tiny ID | reference | sys_tiny_url | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `active` | Active | boolean | - | - |
| `run_highlighted_values_query` | Run highlighted values query | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `columns` | Columns | field_list | - | ✅ |
| `shared_users` | Shared users | glide_list | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `view` | View | reference | sys_ui_view | - |
| `opened_by_link` | Opened by link | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `table` | Table | table_name | - | ✅ |
| `limit` | Limit | decimal | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.648Z*