# ServiceNow Table: CB Topic Language (sys_cb_topic_language)

**Category:** SYSTEM
**SysID:** f7f63a8a183e32108bb255f46a373a6e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `nlu_intent_label` | NLU Intent Label | string | - | - |
| `nlu_provider` | NLU Provider | string | - | - |
| `language_code` | Language | string | - | ✅ |
| `nlu_intent` | NLU Intent ID | string | - | - |
| `nlu_model_label` | NLU Model Label | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `cb_topic_id` | CB Topic Id | reference | sys_cb_topic | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `nlu_entities` | NLU Entities | string_full_utf8 | - | - |
| `nlu_model` | NLU Model ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.548Z*