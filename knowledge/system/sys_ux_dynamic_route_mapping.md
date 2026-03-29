# ServiceNow Table: Route Mapping (sys_ux_dynamic_route_mapping)

**Category:** SYSTEM
**SysID:** 43717e0e18f632108bb255f46a373a40

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `source_component` | Source component | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `route_config` | Route configuration | reference | sys_ux_dynamic_route_config | - |
| `param_payload` | Parameter payload | json | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.106Z*