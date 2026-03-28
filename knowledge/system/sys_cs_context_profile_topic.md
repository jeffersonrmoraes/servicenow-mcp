# ServiceNow Table: Setup Topics (sys_cs_context_profile_topic)

**Category:** SYSTEM
**SysID:** dd07fa8a183e32108bb255f46a373ad5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `topic` | Setup topic | reference | sys_cs_topic | - |
| `sys_id` | Sys ID | GUID | - | - |
| `topic_type` | Setup topic type | string | - | ✅ |
| `sys_overrides` | Overrides | reference | sys_cs_context_profile_topic | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:07.941Z*