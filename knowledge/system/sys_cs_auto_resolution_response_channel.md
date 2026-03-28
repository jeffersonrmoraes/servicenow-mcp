# ServiceNow Table: Auto-Resolution Response Channel (sys_cs_auto_resolution_response_channel)

**Category:** SYSTEM
**SysID:** 4287fa42187e32108bb255f46a373a8a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `response_channel` | Response channel | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `status` | Status | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `configuration` | Auto-Resolution configuration | reference | sys_cs_auto_resolution_configuration | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.263Z*