# ServiceNow Table: Application Version (sys_app_version)

**Category:** SYSTEM
**SysID:** c4ab664a183232108bb255f46a373a4b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | - |
| `vendor_key` | Vendor key | string | - | - |
| `is_store_app` | Is Store App | boolean | - | - |
| `sys_code` | Code | string | - | - |
| `store_latest_updated_time` | Store latest updated time | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `store_application` | Store Application | reference | sys_store_app | - |
| `auto_update` | Auto-update | boolean | - | - |
| `demo_data` | Has demo data | choice | - | - |
| `upload_info` | Upload info | string | - | - |
| `logo` | Logo | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `source_app_id` | Source App Id | string | - | - |
| `title` | Title | string | - | - |
| `lob` | LOBs | string | - | - |
| `hide_on_ui` | Hidden on ui | boolean | - | - |
| `build_version` | Build version | version | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `scope` | Scope | string | - | - |
| `block_install` | Block Install | boolean | - | - |
| `display_message` | Display message | string | - | - |
| `custom_table_count` | Custom table count | integer | - | - |
| `number` | Number | string | - | - |
| `dependencies` | Dependencies | glide_list | - | - |
| `indicators` | Application indicators | string | - | - |
| `installed_as_dependency` | Installed via Dependency | boolean | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `vendor` | Vendor | string | - | - |
| `block_message` | Block Message | string | - | - |
| `manifest` | Manifest | string | - | - |
| `needs_app_engine_licensing` | Needs app engine licensing | boolean | - | - |
| `version` | Version | version | - | - |
| `publish_date` | Published | glide_date_time | - | - |
| `compatibilities` | Compatibilities | string | - | - |
| `delivery_source` | Delivery Source | choice | - | - |
| `repo_latest_updated_time` | Repo latest updated time | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `remote_application` | Remote Application | reference | sys_remote_app | - |
| `short_description` | Short description | string | - | - |
| `price_type` | Price type | choice | - | - |
| `uninstall_blocked` | Uninstall blocked | boolean | - | - |
| `contains_plugins` | Contains Plugins | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:30.234Z*