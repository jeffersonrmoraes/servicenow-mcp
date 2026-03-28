# ServiceNow Table: Auto-Resolution AI Search Result Line Item (sys_cs_auto_resolution_ai_search_result_line_item)

**Category:** SYSTEM
**SysID:** 8a87fa42187e32108bb255f46a373ad8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `feedback_type` | Feedback | choice | - | - |
| `negative_feedback_value` | Negative user feedback value | choice | - | - |
| `ai_search_result` | AI Search result | reference | sys_cs_auto_resolution_ai_search_result | - |
| `feedback_submitted` | AI search feedback submitted | boolean | - | - |
| `click_url` | Click URL | url | - | - |
| `request_id` | Request Id | document_id | - | - |
| `resource_id` | Resource Id | document_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `kb_article` | KB article | reference | kb_knowledge | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `result_payload` | Result payload | string | - | - |
| `feedback_provider_persona` | Feedback provider persona | choice | - | - |
| `item_index` | Item index | number | - | - |
| `feedback_payload` | Feedback payload | string | - | - |
| `result_type` | Result type | choice | - | - |
| `positive_feedback_value` | Positive user feedback value | choice | - | - |
| `result_status` | Result status | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `feedback_provider` | Feedback provider | reference | sys_user | - |
| `sys_mod_count` | Updates | integer | - | - |
| `request_table` | Request table | table_name | - | - |
| `resource_table` | Resource table | table_name | - | - |
| `description` | Description | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.794Z*