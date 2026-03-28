# ServiceNow Table: Live Agent Connection (sys_cs_live_agent_connection)

**Category:** SYSTEM
**SysID:** 7007ba8a183e32108bb255f46a373ae2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `condition_script` | Script | script | - | - |
| `active` | Active | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `condition` | Matching Condition | conditions | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | translated_field | - | ✅ |
| `credential_alias` | Credential Alias | reference | sys_alias | - |
| `condition_table` | Condition Table | table_name | - | - |
| `subflow` | Subflow | reference | sys_hub_flow | ✅ |
| `advanced` | Advanced | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.292Z*