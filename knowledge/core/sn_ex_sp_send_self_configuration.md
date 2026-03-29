# ServiceNow Table: Send to self configuration (sn_ex_sp_send_self_configuration)

**Category:** CORE
**SysID:** 20c6ba86183e32108bb255f46a373a95

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `send_channel` | Send to self channels | choice | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `portal` | Portal | reference | sp_portal | ✅ |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.821Z*