# ServiceNow Table: UX Cross-experience route (sys_ux_interoperable_route)

**Category:** SYSTEM
**SysID:** 0f7bee46183232108bb255f46a373a60

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `interoperable_order` | Evaluation order | integer | - | - |
| `target_experience` | Target experience | reference | sys_ux_app_config | ✅ |
| `interoperable_name` | Name | string | - | - |
| `interoperable_condition` | Usage condition | string | - | - |
| `active` | Active | boolean | - | - |
| `alias_route` | Alias route | string | - | - |
| `description` | Description | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `screens` | Screens | glide_list | sys_ux_screen | - |
| `source_route` | Source route | reference | sys_ux_app_route | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.728Z*