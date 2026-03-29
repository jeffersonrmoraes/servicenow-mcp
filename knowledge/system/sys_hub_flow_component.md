# ServiceNow Table: Component (sys_hub_flow_component)

**Category:** SYSTEM
**SysID:** 1ec1fa42183a32108bb255f46a373a93

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent_ui_id` | Parent UI ID | string | - | - |
| `order` | Order | int | - | ✅ |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_id` | Sys ID | GUID | - | - |
| `attributes` | Attributes | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `display_text` | Display text | string | - | - |
| `updation_source` | Updation source | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `generation_source` | Generation source | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `ui_id` | UI Identifier | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `flow` | Flow | reference | sys_hub_flow_base | ✅ |
| `comment` | Comment | string | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:21.985Z*