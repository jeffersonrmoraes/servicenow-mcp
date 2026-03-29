# ServiceNow Table: UX Screen Collection Condition Script (sys_ux_screen_type_condition_script)

**Category:** SYSTEM
**SysID:** 5f7b2286183232108bb255f46a373a5b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `object_keys` | Object Keys | string | - | ✅ |
| `description` | Description | translated_text | - | - |
| `name` | Name | translated_field | - | ✅ |
| `script` | Script | script | - | ✅ |
| `active` | Active | boolean | - | - |
| `namespace_key` | Namespace Key | string | - | ✅ |
| `screen_type` | Screen Collection | reference | sys_ux_screen_type | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.165Z*