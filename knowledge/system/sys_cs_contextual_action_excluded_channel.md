# ServiceNow Table: Excluded channel (sys_cs_contextual_action_excluded_channel)

**Category:** SYSTEM
**SysID:** 9a077e8a183e32108bb255f46a373adc

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `channel` | Channel | reference | sys_cs_channel | ✅ |
| `contextual_action` | Command | reference | sys_cs_contextual_action | ✅ |
| `scope` | Application | reference | sys_scope | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.503Z*