# ServiceNow Table: Action Instance (sys_hub_action_instance)

**Category:** SYSTEM
**SysID:** f7c1be42183a32108bb255f46a373ad2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `action_inputs` | Inputs | glide_var | sys_hub_action_input | - |
| `action_type` | Action type | reference | sys_hub_action_type_base | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `compiled_snapshot` | Compiled snapshot | string | - | - |
| `action_type_parent` | Action type parent | reference | sys_hub_action_type_definition | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:20.527Z*