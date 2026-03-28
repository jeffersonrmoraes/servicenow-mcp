# ServiceNow Table: Auto-Resolution Simulation Run Block (sys_cs_auto_resolution_simulation_run_block)

**Category:** SYSTEM
**SysID:** ba877e42187e32108bb255f46a373a40

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `flow_context` | Flow context | reference | sys_flow_context | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `language_code` | Language code | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `state` | State | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `simulation_run` | Simulation run | reference | sys_cs_auto_resolution_simulation_run | - |
| `message` | Message | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.315Z*