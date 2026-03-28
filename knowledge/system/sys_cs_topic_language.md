# ServiceNow Table: CS Topic Language (sys_cs_topic_language)

**Category:** SYSTEM
**SysID:** def6b68a183e32108bb255f46a373a24

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `nlu_intent_label` | NLU Intent Label | string | - | - |
| `nlu_provider` | NLU Provider | string | - | - |
| `nlu_intent` | NLU Intent ID | string | - | - |
| `language_code` | Language | string | - | ✅ |
| `cs_topic_id` | CS Topic Id | reference | sys_cs_topic | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `nlu_model_label` | NLU Model Label | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `nlu_entities` | NLU Entities | string_full_utf8 | - | - |
| `nlu_model` | NLU Model ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:16.652Z*