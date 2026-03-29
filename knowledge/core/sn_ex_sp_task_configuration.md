# ServiceNow Table: Task Configuration (sn_ex_sp_task_configuration)

**Category:** CORE
**SysID:** 7cc6fa86183e32108bb255f46a373a5c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `internal_link` | Page | reference | sp_page | - |
| `to_do_configuration` | To-do configuration | reference | sn_hr_sp_todos_config | ✅ |
| `external` | External | boolean | - | - |
| `reference_column` | Reference column | field_name | - | - |
| `common_info_fields` | Common info fields | field_list | - | ✅ |
| `title` | Title | field_name | - | - |
| `fields_reference` | Fields (Reference table) | field_list | - | - |
| `fields` | Fields | field_list | - | - |
| `url_custom` | Url | url | - | - |
| `link_to_task` | Link to task | boolean | - | - |
| `active` | Active | boolean | - | - |
| `additional_conditions` | Additional conditions | conditions | - | - |
| `table` | Table | table_name | - | ✅ |
| `widget` | Use widget | boolean | - | - |
| `reference_table` | Reference table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | translated_text | - | ✅ |
| `url` | Url | field_name | - | - |
| `action_group_record` | Action group | reference | sn_ex_sp_action_group | - |
| `info_custom_fields` | Common info fields | string | - | - |
| `title_type` | Title type | choice | - | - |
| `info_fields_type` | Common info fields type | choice | - | - |
| `title_custom` | Title | translated_text | - | - |
| `widget_record` | Widget | reference | sp_widget | - |
| `reference_conditions` | Reference conditions | conditions | - | - |
| `page_parameters` | Page parameters | simple_name_values | - | - |
| `url_source` | Url source | choice | - | - |
| `widget_parameters` | Widget parameters | simple_name_values | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.876Z*