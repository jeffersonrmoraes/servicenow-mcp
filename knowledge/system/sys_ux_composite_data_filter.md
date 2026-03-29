# ServiceNow Table: EVAM Data Filter (sys_ux_composite_data_filter)

**Category:** SYSTEM
**SysID:** a56f66c6187632108bb255f46a373a80

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `label` | Label | translated_field | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `dataset` | EVAM Definition | reference | sys_ux_composite_data | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.916Z*