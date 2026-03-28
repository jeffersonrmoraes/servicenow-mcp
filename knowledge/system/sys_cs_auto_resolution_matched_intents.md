# ServiceNow Table: Auto-Resolution Matched Intents (sys_cs_auto_resolution_matched_intents)

**Category:** SYSTEM
**SysID:** ea873e42187e32108bb255f46a373aec

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `nlu_intent` | NLU intent | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `matched_topic` | Matched topic | reference | sys_cs_topic | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `context` | Context | reference | sys_cs_auto_resolution_context | - |
| `sys_updated_by` | Updated by | string | - | - |
| `confidence` | Predicted confidence (percentage) | decimal | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.224Z*