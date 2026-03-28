# ServiceNow Table: Context Topic (sys_cs_context_topic)

**Category:** SYSTEM
**SysID:** bd17f2ca183e32108bb255f46a373a45

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `condition_script` | Script | script | - | - |
| `order` | Order | integer | - | ✅ |
| `name` | Name | string | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_survey | - |
| `condition` | Condition | conditions | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `condition_mode` | Condition mode | string | - | - |
| `context` | Context | reference | sys_cs_virtual_agent_context | ✅ |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:07.981Z*