# ServiceNow Table: VA NLU Dispatch (sys_cs_nlu_dispatch)

**Category:** SYSTEM
**SysID:** 7ff63a8a183e32108bb255f46a373a86

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `nlu_model_id` | NLU Model ID | string | - | - |
| `language` | Language | reference | open_nlu_driver_language | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `active` | Active | boolean | - | - |
| `nlu_intent_id` | NLU Intent ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.717Z*