# ServiceNow Table: User Aggregate Preference (sys_aggregate_preference)

**Category:** SYSTEM
**SysID:** 69bbeaca183232108bb255f46a373a54

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `recipient` | Recipient | document_id | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `send` | Send | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `recipient_table` | Recipient Table | table_name | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `type` | Type | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:16.985Z*