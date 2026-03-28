# ServiceNow Table: CSRF Public APIs Violation (sys_csrf_public_apis_violation)

**Category:** SYSTEM
**SysID:** f87b6246183232108bb255f46a373a05

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `api_path` | API PATH | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `request_processor` | Request Processor | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `request_event` | Request Event | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sample_request_detail` | Sample Request Detail | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `request_referer` | Request Referer | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:56.306Z*