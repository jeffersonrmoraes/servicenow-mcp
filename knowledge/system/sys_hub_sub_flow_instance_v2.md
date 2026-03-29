# ServiceNow Table: Subflow Instance V2 (sys_hub_sub_flow_instance_v2)

**Category:** SYSTEM
**SysID:** 26c13e42183a32108bb255f46a373a6f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `show_stages` | Show stages | boolean | - | - |
| `subflow` | Subflow | reference | sys_hub_flow_base | - |
| `sys_id` | Sys ID | GUID | - | - |
| `wait_for_completion` | Wait for completion | boolean | - | - |
| `subflow_inputs` | Subflow inputs | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.176Z*