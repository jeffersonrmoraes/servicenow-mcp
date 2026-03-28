# ServiceNow Table: Analytics Cache (sys_analytics_cache)

**Category:** SYSTEM
**SysID:** 69a3fa8618ba32108bb255f46a373af1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `key` | Key | compressed | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `response` | Response | compressed | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `prefetch_enabled` | Prefetch enabled | boolean | - | - |
| `prefetch_refresh_counter` | Prefetch refresh counter | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `is_queued` | Is queued? | boolean | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `key_hash` | Key hash | string | - | - |
| `expiration_time` | Expiration time | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `request` | Request | compressed | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:20.113Z*