# ServiceNow Table: Activity Event Filter (sys_activity_event_filter)

**Category:** SYSTEM
**SysID:** a35f22c6187632108bb255f46a373ad4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `subtype` | Subtype | string | - | - |
| `classic_ui` | Classic UI | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `event_table` | Event Table | table_name | - | ✅ |
| `label` | Label | translated_text | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:17.045Z*