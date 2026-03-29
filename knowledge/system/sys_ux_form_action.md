# ServiceNow Table: UX Form Actions (sys_ux_form_action)

**Category:** SYSTEM
**SysID:** 757be646183232108bb255f46a373a7f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `declarative_action` | Declarative Action | reference | sys_declarative_action_assignment | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | translated_text | - | ✅ |
| `specificity` | Specificity | integer | - | - |
| `ui_action` | UI Action | reference | sys_ui_action | - |
| `active` | Active | boolean | - | - |
| `action_type` | Action Type | choice | - | - |
| `table` | Table | table_name | - | ✅ |
| `description` | Description | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.058Z*