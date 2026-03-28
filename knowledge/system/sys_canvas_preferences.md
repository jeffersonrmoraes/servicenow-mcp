# ServiceNow Table: Canvas preferences (sys_canvas_preferences)

**Category:** SYSTEM
**SysID:** 2b81b68e18f632108bb255f46a373ac1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | - |
| `widget_id` | Widget ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |
| `value` | Value | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `description` | Description | string | - | - |
| `canvas_page` | Canvas | reference | sys_grid_canvas | - |
| `user` | User | reference | sys_user | - |
| `widget_type` | Widget type | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:49.100Z*