# ServiceNow Table: Virtual Agent Variable (sys_cs_virtual_agent_variable)

**Category:** SYSTEM
**SysID:** a917b2ca183e32108bb255f46a373ac5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `script_variable` | Script Variable Name | string | - | - |
| `name` | Name | string | - | ✅ |
| `sys_overrides` | Overrides | reference | sys_cs_virtual_agent_variable | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `value` | Value | script | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:18.082Z*