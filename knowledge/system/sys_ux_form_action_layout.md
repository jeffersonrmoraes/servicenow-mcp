# ServiceNow Table: UX Form Actions Layout (sys_ux_form_action_layout)

**Category:** SYSTEM
**SysID:** b97ba646183232108bb255f46a373a05

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `specificity` | Specificity | integer | - | - |
| `description` | Description | string | - | - |
| `table` | Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |
| `use_layout_items_only` | Use layout items only | boolean | - | - |
| `active` | Active | boolean | - | - |
| `action_config` | Action Config | reference | sys_ux_action_config | - |
| `order` | Order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.055Z*