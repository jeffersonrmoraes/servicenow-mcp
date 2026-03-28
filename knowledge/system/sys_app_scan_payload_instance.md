# ServiceNow Table: Scan Payload Instance (sys_app_scan_payload_instance)

**Category:** SYSTEM
**SysID:** b60236c6183a32108bb255f46a373a0a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template_instance` | Template Instance | reference | sys_app_template_instance | - |
| `sys_id` | Sys ID | GUID | - | - |
| `hydrated_payload` | Hydrated Payload XML | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `error` | Error | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `loader_result` | Result | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `scan_payload` | Scan Payload | reference | sys_app_scan_payload | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.300Z*