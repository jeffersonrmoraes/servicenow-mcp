# ServiceNow Table: Batch Install Item (sys_batch_install_item)

**Category:** SYSTEM
**SysID:** 630c2e06187232108bb255f46a373aec

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `type` | Type | choice | - | - |
| `customization_version` | Customization version | version | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `id` | Plugin ID | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | choice | - | - |
| `notes` | Notes | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `status_message` | Status Message | string | - | - |
| `batch_install_plan` | Batch Installation Plan | reference | sys_batch_install_plan | - |
| `reason` | Reason | choice | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `version` | Version | version | - | - |
| `demo_data` | Demo Data | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `name` | Name | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.612Z*