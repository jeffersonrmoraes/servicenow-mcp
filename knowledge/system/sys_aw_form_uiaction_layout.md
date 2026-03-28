# ServiceNow Table: UI Action Layout (sys_aw_form_uiaction_layout)

**Category:** SYSTEM
**SysID:** b0a2be82187a32108bb255f46a373a35

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_overrides` | Overrides | reference | sys_aw_form_uiaction_layout | - |
| `view` | View | reference | sys_ui_view | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `table` | Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `layout_name` | Layout name | translated_field | - | ✅ |
| `fixed_button_number` | Fixed button number | integer | - | - |
| `active` | Active | boolean | - | - |
| `workspace` | Workspace | reference | sys_aw_master_config | - |
| `specificity` | Specificity | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.744Z*