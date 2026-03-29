# ServiceNow Table: UX Layout Bounds (sys_ux_layout_bounds)

**Category:** SYSTEM
**SysID:** c37bee46183232108bb255f46a373a33

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `macroponent_last_mod_count` | Macroponent Modification Count | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `macroponent` | Page Definition | reference | sys_ux_macroponent | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `bounds` | Layout Bounds | json | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.722Z*