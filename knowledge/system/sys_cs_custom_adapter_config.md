# ServiceNow Table: Custom Adapter Configuration (sys_cs_custom_adapter_config)

**Category:** SYSTEM
**SysID:** 7207be8a183e32108bb255f46a373a8e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `provider` | Provider | reference | sys_cs_provider | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `outbound_transformer_action` | Outbound transformer action | string | - | - |
| `inbound_transformer_action` | Inbound transformer action | string | - | - |
| `sub_type` | Sub type | reference | sys_cs_custom_control | - |
| `control_type` | Control type | reference | sys_cs_control | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:08.033Z*