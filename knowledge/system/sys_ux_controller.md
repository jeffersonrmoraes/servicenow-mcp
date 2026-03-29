# ServiceNow Table: UX Controller (sys_ux_controller)

**Category:** SYSTEM
**SysID:** 448be286183232108bb255f46a373aed

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `controller_config_guidance` | Controller config guidance | json | - | - |
| `controller_macroponent` | Definition | reference | sys_ux_macroponent | ✅ |
| `description` | Description | translated_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:34.626Z*