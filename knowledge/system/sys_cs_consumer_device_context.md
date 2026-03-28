# ServiceNow Table: Consumer Device Context (sys_cs_consumer_device_context)

**Category:** SYSTEM
**SysID:** d4f6b28a183e32108bb255f46a373a48

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `device_info` | Device info | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `consumer_account` | Consumer account | reference | sys_cs_consumer_account | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `device_type` | Device Type | string | - | - |
| `device_context_info` | Device context info | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `established` | Established | boolean | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `variables` | Variables | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `lock_version` | Lock Version | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `device_id` | Device ID | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.505Z*