# ServiceNow Table: Pill Compound (sys_hub_pill_compound)

**Category:** SYSTEM
**SysID:** efc1be42183a32108bb255f46a373a23

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `extra_info` | Extra Info | string | - | - |
| `prescription` | Pill Prescription | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `transform_definition_id` | Transform Definition | reference | sys_transform_definition | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `ui_id` | UI Unique Id | string | - | ✅ |
| `attached_to` | Attached To | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `transform_compositions` | Transform Compositions | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `source_ui_id` | Source UI Id | string | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:23.454Z*