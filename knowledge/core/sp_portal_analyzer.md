# ServiceNow Table: Service Portal Analyzer Entry (sp_portal_analyzer)

**Category:** CORE
**SysID:** 45a0f64a18b632108bb255f46a373a74

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `page` | Page | reference | sp_page | - |
| `sys_mod_count` | Updates | integer | - | - |
| `widget` | Widget | reference | sp_widget | - |
| `status` | Status | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `users` | User count | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `page_views` | Page views | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `last_analyzed` | Last analyzed | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `page_id` | Page ID | string | - | - |
| `widget_id` | Widget ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.169Z*