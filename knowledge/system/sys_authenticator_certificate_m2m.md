# ServiceNow Table: Authenticator Certificates M2M (sys_authenticator_certificate_m2m)

**Category:** SYSTEM
**SysID:** b6acee4218b232108bb255f46a373a9f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `authenticator` | Authenticator | reference | sys_authenticator_metadata | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `certificate` | Certificate | reference | sys_authenticator_certificate | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:41.853Z*