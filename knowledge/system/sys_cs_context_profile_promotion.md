# ServiceNow Table: Promoted Topics (sys_cs_context_profile_promotion)

**Category:** SYSTEM
**SysID:** 67f63a8a183e32108bb255f46a373a5c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_context_profile_promotion | - |
| `topic_description` | Description | string | - | - |
| `topic` | Topic | reference | sys_cs_topic | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `order` | Order | integer | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.545Z*