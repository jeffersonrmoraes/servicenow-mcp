# ServiceNow Table: List of Policy Factor (sys_auth_mfa_context_mfa_factor_m2m)

**Category:** SYSTEM
**SysID:** bc72b6ce183a32108bb255f46a373af7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `context` | Context | reference | sys_mfa_policy_context | ✅ |
| `order` | Order | integer | - | - |
| `policy` | Policy | reference | sys_authentication_policy | ✅ |
| `internal_name` | Internal name | string | - | - |
| `mfa_factor` | MFA Factor | reference | sys_mfa_factor | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:41.890Z*