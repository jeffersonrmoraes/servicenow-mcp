# ServiceNow Table: UX Screen Condition (sys_ux_screen_condition)

**Category:** SYSTEM
**SysID:** 077bee46183232108bb255f46a373ac7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `screen` | Screen | reference | sys_ux_screen | - |
| `script` | Script | script | - | - |
| `scripted_condition` | Scripted Condition | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `is_result_memoizable` | Cache Result | boolean | - | - |
| `conditions_params_mapping` | Parameter Mapping | json | - | - |
| `screen_condition` | Screen Condition | string | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.162Z*