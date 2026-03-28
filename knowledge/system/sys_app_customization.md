# ServiceNow Table: App Customization (sys_app_customization)

**Category:** SYSTEM
**SysID:** 04ab664a183232108bb255f46a373a2d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `vendor_app_version` | Vendor App Version | version | - | - |
| `assigned_version` | Assigned Version | version | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `update_date` | Update Date | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `version` | Version | version | - | - |
| `war_version` | War Version | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `upload_info` | Upload info | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `vendor_app` | Vendor App | reference | sys_store_app | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `latest_version` | Latest Version | version | - | - |
| `install_date` | Install Date | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:24.494Z*