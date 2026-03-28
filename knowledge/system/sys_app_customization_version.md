# ServiceNow Table: App Customization Version (sys_app_customization_version)

**Category:** SYSTEM
**SysID:** 54aba64a183232108bb255f46a373a00

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `scope` | Scope | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `manifest` | Manifest | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `app_customization` | App Customization | reference | sys_app_customization | - |
| `war_version` | War Version | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `vendor_app_id` | Vendor Application | string | - | - |
| `vendor_version` | Vendor Version | version | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `number` | Number | string | - | - |
| `publish_date` | Published | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `version` | Version | version | - | - |
| `upload_info` | Upload Info | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:24.459Z*