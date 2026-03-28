# ServiceNow Table: Test Step Config (sys_atf_step_config)

**Category:** SYSTEM
**SysID:** aa70ba8618b632108bb255f46a373a7f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `html_description` | HTML description | translated_html | - | ✅ |
| `step_execution_generator` | Step execution script | script_plain | - | - |
| `wizard_redirect` | Wizard Redirect | string | - | - |
| `icon` | Icon | string | - | - |
| `step_env` | Step environment | reference | sys_atf_step_env | ✅ |
| `performance_include` | Include for Performance Comparison | boolean | - | - |
| `deprecated` | Deprecated | boolean | - | - |
| `outputs` | Output variables | glide_var | atf_output_variable | - |
| `template_reminder` | Template reminder | translated_text | - | ✅ |
| `type` | Type | reference | sys_db_object | ✅ |
| `batch_order_constraint` | Batch order constraint | choice | - | - |
| `description_generator` | Description generation script | script_plain | - | - |
| `inputs` | Input variables | glide_var | atf_input_variable | - |
| `class_type` | Class type | string | - | - |
| `active` | Active | boolean | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `category` | Category | reference | sys_atf_step_config_category | - |
| `name` | Name | translated_field | - | ✅ |
| `can_mutate_page` | Can mutate page | boolean | - | - |
| `class_name` | Class Name | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:36.063Z*