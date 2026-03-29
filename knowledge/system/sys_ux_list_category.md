# ServiceNow Table: UX List Category (sys_ux_list_category)

**Category:** SYSTEM
**SysID:** 6801fe4218f632108bb255f46a373a66

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `title` | Title | translated_field | - | ✅ |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `configuration` | Configuration | reference | sys_ux_list_menu_config | ✅ |
| `order` | Order | decimal | - | ✅ |
| `active` | Active | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_ux_list_category | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.242Z*