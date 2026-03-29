# ServiceNow Table: UX Metrics Applications (sys_ux_metrics_app)

**Category:** SYSTEM
**SysID:** 9a7bea46183232108bb255f46a373a51

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `app_type` | Application Type | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `app_name` | Application Name | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `channel` | Analytics Channel | choice | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.645Z*