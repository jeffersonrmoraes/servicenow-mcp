# ServiceNow Table: Trigger Type (sys_hub_trigger_type)

**Category:** SYSTEM
**SysID:** b6b1be02183a32108bb255f46a373a5c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | translated_text | - | - |
| `base_trigger` | Base Trigger | reference | sys_hub_trigger_definition | - |
| `sys_updated_by` | Updated by | string | - | - |
| `source_table` | Trigger table | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `type` | Type | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `order` | Display order | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `category` | Category | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:25.593Z*