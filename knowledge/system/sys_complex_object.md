# ServiceNow Table: Complex Object (sys_complex_object)

**Category:** SYSTEM
**SysID:** 39b13e02183a32108bb255f46a373a99

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `name` | Name | string | - | ✅ |
| `namespace` | Namespace | string | - | - |
| `serialized_content` | Serialized Content | json | - | - |
| `label` | Label | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_overrides` | Override | reference | sys_complex_object | - |
| `scope_name` | Scope Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.851Z*