# ServiceNow Table: Custom Application (sys_app)

**Category:** SYSTEM
**SysID:** b6cb6e4e183232108bb255f46a373a4c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `store_url` | Store URL | string | - | - |
| `license_definition` | License Definition | reference | sys_app_license_defn | - |
| `installed_as_dependency` | Installed via Dependency | boolean | - | - |
| `store_correlation_id` | Store correlation ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `hide_on_ui` | Hidden on ui | boolean | - | - |
| `sys_code` | Code | string | - | - |
| `user_role` | User role | reference | sys_user_role | - |
| `menu` | Menu | reference | sys_app_application | - |
| `uninstall_blocked` | Uninstall Blocked | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:23.006Z*