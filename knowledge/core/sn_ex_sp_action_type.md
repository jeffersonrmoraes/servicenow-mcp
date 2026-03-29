# ServiceNow Table: Action Type (sn_ex_sp_action_type)

**Category:** CORE
**SysID:** 49c6fa86183e32108bb255f46a373ab7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Action type name | string | - | ✅ |
| `sys_overrides` | Overrides | reference | sn_ex_sp_action_type | - |
| `server_parameters` | Server parameters | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `server_script` | Server script | script | - | - |
| `client_parameters` | Client parameters | string | - | - |
| `reverse_execution` | Execute client script before server script? | boolean | - | - |
| `active` | Active | boolean | - | - |
| `client_script` | Client script | script | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.627Z*