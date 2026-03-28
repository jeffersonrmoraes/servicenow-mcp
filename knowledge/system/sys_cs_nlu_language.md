# ServiceNow Table: VA NLU Language (sys_cs_nlu_language)

**Category:** SYSTEM
**SysID:** 1d073e8a183e32108bb255f46a373a0e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `language` | Language | reference | open_nlu_driver_language | ✅ |
| `enabled` | Enabled | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.787Z*