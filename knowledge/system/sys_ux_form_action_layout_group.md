# ServiceNow Table: UX Form Actions Layout Group (sys_ux_form_action_layout_group)

**Category:** SYSTEM
**SysID:** f97be646183232108bb255f46a373a4d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `actions` | Actions | glide_list | sys_ux_form_action | - |
| `type` | Type | integer | - | - |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `table` | Table | table_name | - | ✅ |
| `name` | Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.827Z*