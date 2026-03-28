# ServiceNow Table: Sys Cs Vendor Client Adapter Configuration (sys_cs_vendor_client_adapter_configuration)

**Category:** SYSTEM
**SysID:** f7f63a8a183e32108bb255f46a373aa5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `client_type` | Client type | choice | - | - |
| `provider_auth` | Provider auth | reference | provider_auth | ✅ |
| `vendor` | Vendor | reference | sys_cs_vendor | ✅ |
| `external_id` | Group Id | string | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `config` | Config | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:18.046Z*