# ServiceNow Table: UX Client Script Include (sys_ux_client_script_include)

**Category:** SYSTEM
**SysID:** 177b6286183232108bb255f46a373a6c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `access` | Accessible from | string | - | ✅ |
| `script` | Script | script_client | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `required_translations` | Required translations | json_translations | - | - |
| `script_api_version` | API version | string | - | ✅ |
| `api_name` | API Name | string | - | - |
| `includes` | Client Script Include Dependencies | glide_list | sys_ux_client_script_include | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.203Z*