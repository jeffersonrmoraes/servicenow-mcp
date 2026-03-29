# ServiceNow Table: UI Policy (sys_ui_policy)

**Category:** SYSTEM
**SysID:** 534bea42183232108bb255f46a373aae

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | string | - | - |
| `model_table` | Model table | table_name | - | - |
| `model_id` | Model ID | document_id | - | - |
| `short_description` | Short description | string | - | ✅ |
| `conditions` | Conditions | conditions | - | - |
| `on_load` | On load | boolean | - | - |
| `reverse_if_false` | Reverse if false | boolean | - | - |
| `run_scripts` | Run scripts | boolean | - | - |
| `order` | Order | integer | - | - |
| `script_true` | Execute if true | script_plain | - | - |
| `script_false` | Execute if false | script_plain | - | - |
| `set_values` | Set values | template_value | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_overrides` | Overrides | reference | sys_ui_policy | - |
| `inherit` | Inherit | boolean | - | - |
| `active` | Active | boolean | - | - |
| `view` | View | reference | sys_ui_view | - |
| `global` | Global | boolean | - | - |
| `isolate_script` | Isolate script | boolean | - | - |
| `table` | Table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `ui_type` | Run scripts in UI type | integer | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:24.476Z*