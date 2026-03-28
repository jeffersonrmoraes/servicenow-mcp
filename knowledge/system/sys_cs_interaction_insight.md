# ServiceNow Table: Interaction Insight (sys_cs_interaction_insight)

**Category:** SYSTEM
**SysID:** 9cf6b28a183e32108bb255f46a373a1f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user` | User | reference | sys_user | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sentiment_normalized` | Sentiment Normalized | decimal | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `user_type` | User Type | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `type` | Type | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `interaction` | Interaction | reference | interaction | ✅ |
| `sentiment` | Sentiment | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.918Z*