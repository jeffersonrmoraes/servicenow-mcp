# ServiceNow Table: UX Auto Reflow Rule (sys_ux_auto_reflow_rule)

**Category:** SYSTEM
**SysID:** 237b6286183232108bb255f46a373aa4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | - |
| `active` | Active | boolean | - | - |
| `component` | Component | reference | sys_ux_macroponent | ✅ |
| `property_values` | Property Values | json | - | - |
| `type` | Type | choice | - | - |
| `description` | Description | translated_text | - | - |
| `css` | CSS | json | - | - |
| `max_width` | Maximum Width | integer | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `reflow_engine` | Auto Reflow Engine | reference | sys_ux_auto_reflow_engine | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:32.496Z*