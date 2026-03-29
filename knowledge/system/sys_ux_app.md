# ServiceNow Table: UX Parent Application (sys_ux_app)

**Category:** SYSTEM
**SysID:** 737ba286183232108bb255f46a373af1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `multiple_experiences` | Multiple Experiences | boolean | - | - |
| `name` | Name | translated_field | - | ✅ |
| `user_preference_namespace` | UX App namespace | string | - | - |
| `shell_root_config` | App Shell Root Config | json | - | - |
| `theme` | Base theme | reference | sys_ux_theme | - |
| `shell_root` | App Shell Root UI | reference | sys_ux_macroponent | - |
| `primary_experience` | Primary Experience | reference | sys_ux_page_registry | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:31.792Z*