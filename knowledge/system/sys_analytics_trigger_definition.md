# ServiceNow Table: Proactive Analytics Trigger Definition (sys_analytics_trigger_definition)

**Category:** SYSTEM
**SysID:** 3e31b60a18f632108bb255f46a373ad6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `category` | Category | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | translated_text | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `event_table` | Event table | reference | sys_db_object | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `encoded_query` | Encoded query | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:21.505Z*