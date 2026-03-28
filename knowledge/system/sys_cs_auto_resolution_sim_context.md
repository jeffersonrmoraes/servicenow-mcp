# ServiceNow Table: Auto-Resolution Simulation Context (sys_cs_auto_resolution_sim_context)

**Category:** SYSTEM
**SysID:** ee877e42187e32108bb255f46a373a18

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `service_model_solution_version` | Service model solution version | string | - | - |
| `intent_match` | Intent match | boolean | - | - |
| `service_model_solution_name` | Service model solution name | string | - | - |
| `simulation_run_block` | Simulation run block | reference | sys_cs_auto_resolution_simulation_run_block | - |
| `service_model_used` | Service model used | string | - | - |
| `unsupported_matched_intent` | Unsupported matched intent | string | - | - |
| `prediction_confidence` | Prediction confidence(%) | decimal | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.765Z*