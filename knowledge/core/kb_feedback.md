# ServiceNow Table: Knowledge Feedback (kb_feedback)

**Category:** CORE
**SysID:** 0f4f6646187632108bb255f46a373a40

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `query` | Query | string | - | - |
| `search_id` | Search Id | reference | ts_query_kb | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `article_summary` | Article Summary | reference | kb_knowledge_summary | - |
| `user` | User | reference | sys_user | - |
| `work_notes` | Work notes | journal | - | - |
| `parent_comment` | Parent Comment | reference | kb_feedback | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `flagged` | Flagged | boolean | - | - |
| `live_message` | Live message | reference | live_message | - |
| `view_id` | View ID | string | - | - |
| `parent_feedback` | Parent feedback | reference | live_message | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `resolved` | Resolved | boolean | - | - |
| `root_feedback` | Root feedback | reference | live_message | - |
| `rating` | Rating | integer | - | - |
| `session_id` | Session Id | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `article` | Article | reference | kb_knowledge | - |
| `useful` | Useful | string | - | - |
| `reason` | Reason | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `comments` | Comments | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:33.843Z*