# ServiceNow Table: Subflow Instance (sys_hub_sub_flow_instance)

**Category:** SYSTEM
**SysID:** 2bc1be42183a32108bb255f46a373a4c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `subflow` | Subflow | reference | sys_hub_flow_base | - |
| `sys_id` | Sys ID | GUID | - | - |
| `subflow_instance_inputs` | Subflow instance inputs | glide_var | sys_hub_sub_flow_instance_inputs | - |
| `inputs` | Inputs | glide_var | sys_hub_flow_input | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.178Z*