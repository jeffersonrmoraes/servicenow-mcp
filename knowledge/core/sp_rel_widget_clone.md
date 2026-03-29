# ServiceNow Table: Widget Clone (sp_rel_widget_clone)

**Category:** CORE
**SysID:** 59a0f64a18b632108bb255f46a373ac6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent` | Parent | reference | sp_widget | - |
| `last_validated` | Last validated | glide_date_time | - | - |
| `cloned` | Cloned | glide_date_time | - | - |
| `child` | Child | reference | sp_widget | - |
| `payload` | Original payload | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.890Z*