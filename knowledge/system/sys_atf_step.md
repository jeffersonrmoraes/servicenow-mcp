# ServiceNow Table: Test Step (sys_atf_step)

**Category:** SYSTEM
**SysID:** ba70ba8618b632108bb255f46a373aff

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `copied_from` | Copied from | reference | sys_atf_step | - |
| `display_name` | Display name | translated_field | - | - |
| `order` | Execution order | integer | - | - |
| `callable_outputs` | Reusable output variables | glide_var | atf_output_variable_callable | - |
| `step_config` | Step config | reference | sys_atf_step_config | ✅ |
| `notes` | Notes | string | - | - |
| `description` | Description | string | - | - |
| `snapshot` | Snapshot | reference | sys_atf_snapshot | - |
| `inputs` | Input variables | glide_var | atf_input_variable | - |
| `test` | Test | reference | sys_atf_test | ✅ |
| `mugshots_cache_json` | Mugshots Cache JSON | json | - | - |
| `table` | Table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `warning_message` | Warning message | string | - | - |
| `timeout` | Timeout | glide_duration | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.600Z*