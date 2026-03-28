# ServiceNow Table: Static Content (sn_ex_sp_static_content)

**Category:** CORE
**SysID:** a8c6ba86183e32108bb255f46a373af4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `title` | Title | translated_text | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `rich_text` | Rich text | translated_html | - | ✅ |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:47.570Z*