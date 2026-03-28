# ServiceNow Table: Configuration Page (sys_cs_adapter_configuration_page)

**Category:** SYSTEM
**SysID:** 82077e8a183e32108bb255f46a373a41

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `client_type` | App Type | choice | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `name` | Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `state` | State | choice | - | - |
| `provider_auth` | Provider Auth | reference | provider_auth | ✅ |
| `icon` | Icon | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:56.372Z*