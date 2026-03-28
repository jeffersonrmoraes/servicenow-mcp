# ServiceNow Table: Auth Policy Context (sys_auth_policy_context)

**Category:** SYSTEM
**SysID:** a9723ace183a32108bb255f46a373a48

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `internal_name` | Internal name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | choice | - | - |
| `deny_policy` | Deny Policy | reference | sys_authentication_policy | - |
| `description` | Description | string | - | - |
| `name` | Name | string | - | ✅ |
| `allow_policy` | Allow Policy | reference | sys_authentication_policy | - |
| `default_policy` | Default Policy | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:41.895Z*