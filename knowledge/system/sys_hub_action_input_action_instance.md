# ServiceNow Table: Variable Action Instance (sys_hub_action_input_action_instance)

**Category:** SYSTEM
**SysID:** c6c1fa42183a32108bb255f46a373a22

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `action_type` | Action type | reference | sys_hub_action_type_base | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `action_input` | Variable | reference | var_dictionary | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `action_inputs` | Inputs | glide_var | sys_hub_action_input | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:20.464Z*