# ServiceNow Table: Embeddables Endpoint (sys_ux_libuxf_endpoint)

**Category:** SYSTEM
**SysID:** 0f7bee46183232108bb255f46a373a77

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `http_method` | Http Method | string | - | - |
| `endpoint_name` | Endpoint name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Endpoint type | choice | - | ✅ |
| `path` | Endpoint path | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.704Z*