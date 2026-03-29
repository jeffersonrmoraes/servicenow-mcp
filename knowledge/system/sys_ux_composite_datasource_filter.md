# ServiceNow Table: EVAM Data Source Filter (sys_ux_composite_datasource_filter)

**Category:** SYSTEM
**SysID:** 616f66c6187632108bb255f46a373ac4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `datasource_table` | Table | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `datasource` | Data Source | reference | sys_ux_composite_datasource | ✅ |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `condition` | Filter Condition | conditions | - | - |
| `base_condition` | Base Condition | string | - | - |
| `filter` | Data Filter | reference | sys_ux_composite_data_filter | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.932Z*