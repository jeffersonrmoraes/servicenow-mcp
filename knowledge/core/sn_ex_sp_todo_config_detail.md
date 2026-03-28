# ServiceNow Table: To-do Configuration Detail (sn_ex_sp_todo_config_detail)

**Category:** CORE
**SysID:** 2bb63a86183e32108bb255f46a373ae9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `conditions` | Conditions | conditions | - | ✅ |
| `active` | Active | boolean | - | - |
| `title` | Title | field_name | - | - |
| `image` | Image | field_name | - | - |
| `table` | Parent table | table_name | - | ✅ |
| `field_2` | Field 2 | field_name | - | - |
| `todo_config` | To-do configuration | reference | sn_hr_sp_todos_config | ✅ |
| `field_1` | Field 1 | field_name | - | - |
| `source_table` | Child table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `action_group_record` | Action group | reference | sn_ex_sp_action_group | - |
| `order` | Order | integer | - | - |
| `description` | Description | field_name | - | - |
| `todo_target` | Parent-child mapping column | field_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:49.035Z*