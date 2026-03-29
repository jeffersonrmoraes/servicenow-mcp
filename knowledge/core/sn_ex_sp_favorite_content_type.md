# ServiceNow Table: Favorite Content Type (sn_ex_sp_favorite_content_type)

**Category:** CORE
**SysID:** 63b67a86183e32108bb255f46a373a08

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_text | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `badge_icon` | Badge icon | glyphicon | - | ✅ |
| `filter_title` | Filter title | translated_text | - | ✅ |
| `sys_overrides` | Overrides | reference | sn_ex_sp_favorite_content_type | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:17.402Z*