# ServiceNow Table: Tab Configuration (sn_ex_sp_task_tab_configuration)

**Category:** CORE
**SysID:** 20c6ba86183e32108bb255f46a373ab8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `widget_parameters` | Widget parameters | simple_name_values | - | - |
| `type` | Type | choice | - | ✅ |
| `order` | Order | integer | - | - |
| `task_configuration` | Task configuration | reference | sn_ex_sp_task_configuration | ✅ |
| `multiline_script` | Multiline script | script | - | - |
| `visibility_script` | Visible script | script | - | - |
| `advanced` | Advanced | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Display name | translated_text | - | ✅ |
| `script` | Script | boolean | - | - |
| `fields` | Fields | field_list | - | - |
| `visibility` | Visible | conditions | - | - |
| `table` | Table | table_name | - | - |
| `active` | Active | boolean | - | - |
| `widget` | Widget | reference | sp_widget | - |
| `child_table` | Child table | table_name | - | - |
| `source` | Source | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.859Z*