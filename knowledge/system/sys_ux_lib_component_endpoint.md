# ServiceNow Table: UX Component Endpoint Definition (sys_ux_lib_component_endpoint)

**Category:** SYSTEM
**SysID:** 5b7b6286183232108bb255f46a373a44

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `http_method` | Http Method | string | - | - |
| `path` | Endpoint path | string | - | ✅ |
| `component` | Component | reference | sys_ux_lib_component | ✅ |
| `endpoint_name` | Endpoint name | string | - | ✅ |
| `type` | Endpoint type | choice | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:38.441Z*