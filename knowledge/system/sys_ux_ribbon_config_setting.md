# ServiceNow Table: Ribbon Configuration Setting (sys_ux_ribbon_config_setting)

**Category:** SYSTEM
**SysID:** 467b2a46183232108bb255f46a373aee

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `table` | Table | table_name | - | ✅ |
| `active` | Active | boolean | - | - |
| `configuration` | Configuration | reference | sys_ux_ribbon_config | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `specificity` | Specificity | integer | - | - |
| `width` | Width | integer | - | ✅ |
| `ribbon` | Ribbon | reference | sys_aw_ribbon_setting | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:41.399Z*