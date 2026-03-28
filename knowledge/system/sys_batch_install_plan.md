# ServiceNow Table: Batch Install Plan (sys_batch_install_plan)

**Category:** SYSTEM
**SysID:** 6f0c6e06187232108bb255f46a373a26

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `state` | State | choice | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `notes` | Notes | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `rollback_context` | Rollback Context | reference | sys_rollback_context | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.608Z*