# ServiceNow Table: Connection & Credential Templates (sys_alias_templates)

**Category:** SYSTEM
**SysID:** 36ffeace187632108bb255f46a373adf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `test_action` | Test Action | reference | sys_hub_action_type_definition | - |
| `dynamic_data_schema` | Dynamic Data Schema | json | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `pre_edit_script` | Pre-Edit Script | script | - | - |
| `default_data_template` | Default Data Template | json | - | ✅ |
| `on_edit_script` | On Edit Script | script | - | - |
| `post_process_script` | On Create Script | script | - | - |
| `name` | Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:17.104Z*