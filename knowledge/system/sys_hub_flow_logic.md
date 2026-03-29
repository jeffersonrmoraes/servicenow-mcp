# ServiceNow Table: Flow Logic Instance (sys_hub_flow_logic)

**Category:** SYSTEM
**SysID:** 3fc1be42183a32108bb255f46a373ab4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `connected_to` | Connected To | string | - | - |
| `workflow_inputs` | Workflow inputs | glide_var | var_dictionary | - |
| `sys_id` | Sys ID | GUID | - | - |
| `flow_variables_assigned` | Flow variables assigned | string | - | - |
| `logic_definition` | Logic definition | reference | sys_hub_flow_logic_definition | - |
| `flow_variable` | Flow variable | glide_var | sys_hub_flow_variable | - |
| `outputs_assigned` | Outputs assigned | string | - | - |
| `workflow_reference` | Workflow reference | reference | wf_workflow | - |
| `extended_inputs` | Extended inputs | glide_var | sys_hub_flow_logic_ext_input | - |
| `decision_table_inputs` | Decision table inputs | glide_var | sys_decision_input | - |
| `outputs_to_assign` | Outputs to assign | glide_var | sys_hub_flow_output | - |
| `inputs` | Inputs | glide_var | sys_hub_flow_logic_input | - |
| `block` | Block | reference | sys_hub_flow_block | - |
| `decision_table` | Decision table | reference | sys_decision | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:22.003Z*