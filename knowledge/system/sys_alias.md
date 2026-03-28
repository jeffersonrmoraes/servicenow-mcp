# ServiceNow Table: Connection & Credential Aliases (sys_alias)

**Category:** SYSTEM
**SysID:** 43ff2ece187632108bb255f46a373a52

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `multiple_connections` | Support Multiple Active Connections | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `parent` | Parent Alias | reference | sys_alias | - |
| `configuration_template` | Configuration Template | reference | sys_alias_templates | - |
| `connection_type` | Connection type | string | - | - |
| `retry_policy` | Default Retry Policy | reference | sys_retry_policy | - |
| `type` | Type | string | - | ✅ |
| `is_internal` | Is internal | boolean | - | - |
| `id` | ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:16.984Z*