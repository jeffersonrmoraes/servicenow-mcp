# ServiceNow Table: UX Event (sys_ux_event)

**Category:** SYSTEM
**SysID:** 8f7b2286183232108bb255f46a373a00

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | translated_text | - | - |
| `props` | Properties | json | - | - |
| `explicit_api_name` | Explicit API Name | string | - | - |
| `required_translations` | Required translations | json_translations | - | - |
| `event_name` | Event Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `label` | Label | translated_field | - | ✅ |
| `interfaces` | UX Interfaces | glide_list | sys_ux_interface | - |
| `schema_version` | Schema version | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.146Z*