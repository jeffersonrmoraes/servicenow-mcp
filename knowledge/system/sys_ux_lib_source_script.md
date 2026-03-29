# ServiceNow Table: UX Source Code (sys_ux_lib_source_script)

**Category:** SYSTEM
**SysID:** b77be286183232108bb255f46a373a12

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `externals` | External libraries | string | - | - |
| `type` | Source type | string | - | ✅ |
| `config_option` | Config Option | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |
| `engine` | UXF engine version | integer | - | ✅ |
| `script_link` | Script link | url | - | - |
| `script` | Script | script_plain | - | - |
| `inner_components` | Inner components | glide_list | sys_ux_lib_component | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.180Z*