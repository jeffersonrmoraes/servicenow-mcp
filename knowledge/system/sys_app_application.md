# ServiceNow Table: Application Menu (sys_app_application)

**Category:** SYSTEM
**SysID:** 3c3b2e02183232108bb255f46a373a64

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | string | - | - |
| `name` | Name | string | - | - |
| `category` | Category | reference | sys_app_category | - |
| `view_name` | View name | string | - | - |
| `device_type` | Device type | string | - | - |
| `hint` | Hint | translated_field | - | - |
| `active` | Active | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_app_application | - |
| `order` | Order | decimal | - | - |
| `title` | Title | translated_field | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `roles` | Roles | user_roles | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:26.594Z*