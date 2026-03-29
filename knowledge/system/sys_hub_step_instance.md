# ServiceNow Table: Step Instance (sys_hub_step_instance)

**Category:** SYSTEM
**SysID:** e3c17e42183a32108bb255f46a373afe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `cid` | Client ID | string | - | - |
| `extended_outputs` | Extended outputs | glide_var | sys_hub_step_ext_output | - |
| `sys_id` | Sys ID | GUID | - | - |
| `icon` | Icon | string | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `step_type` | Step Type | reference | sys_flow_step_definition | - |
| `error_handling_type` | Error Handling Type | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `outputs` | Outputs | glide_var | sys_flow_step_definition_output | - |
| `inputs` | Inputs | glide_var | sys_flow_step_definition_input | - |
| `sys_mod_count` | Updates | integer | - | - |
| `extended_inputs` | Extended inputs | glide_var | sys_hub_step_ext_input | - |
| `label` | Label | translated_text | - | - |
| `order` | Order | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `action` | Action | reference | sys_hub_action_type_base | - |
| `section` | Section | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.157Z*