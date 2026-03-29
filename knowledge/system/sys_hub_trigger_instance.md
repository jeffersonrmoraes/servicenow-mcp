# ServiceNow Table: Trigger Instance (sys_hub_trigger_instance)

**Category:** SYSTEM
**SysID:** f6b1be02183a32108bb255f46a373a39

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `remote_sys_id` | Remote Sys Id | string | - | ✅ |
| `trigger_definition` | Trigger definition | reference | sys_hub_trigger_definition | - |
| `comment` | Comment | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `trigger_outputs` | Variables | glide_var | sys_hub_trigger_output | - |
| `generation_source` | Generation source | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `name` | Name | string | - | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `flow` | Flow | reference | sys_hub_flow_base | ✅ |
| `updation_source` | Updation source | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `trigger_type` | Trigger type | string | - | ✅ |
| `display_text` | Display text | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `trigger_inputs` | Variables | glide_var | sys_hub_trigger_input | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.918Z*