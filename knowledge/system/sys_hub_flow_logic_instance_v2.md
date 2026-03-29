# ServiceNow Table: Flow Logic Instance V2 (sys_hub_flow_logic_instance_v2)

**Category:** SYSTEM
**SysID:** 9ac1fa42183a32108bb255f46a373ace

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `logic_definition` | Logic definition | reference | sys_hub_flow_logic_definition | - |
| `values` | Values | string | - | - |
| `outputs_assigned` | Outputs assigned | string | - | - |
| `decision_table` | Decision table | reference | sys_decision | - |
| `flow_variables_assigned` | Flow variables assigned | string | - | - |
| `block` | Block | reference | sys_hub_flow_block | - |
| `workflow_reference` | Workflow reference | reference | wf_workflow | - |
| `connected_to` | Connected To | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:22.727Z*