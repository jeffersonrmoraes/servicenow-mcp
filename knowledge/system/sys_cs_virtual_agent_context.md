# ServiceNow Table: Context (sys_cs_virtual_agent_context)

**Category:** SYSTEM
**SysID:** f7e6728a183e32108bb255f46a373a95

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `table` | Table | reference | sys_db_object | - |
| `script_variable` | Script Variable Name | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `value` | Value | script | - | - |
| `name` | Name | string | - | ✅ |
| `live_agent_setup` | Chat Setup | reference | sys_cs_live_agent_setup | - |
| `record` | Record | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:18.049Z*