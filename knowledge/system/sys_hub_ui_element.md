# ServiceNow Table: Flow Designer UI Element (sys_hub_ui_element)

**Category:** SYSTEM
**SysID:** d0f17246183a32108bb255f46a373a48

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `designer_type` | Designer Type | string | - | - |
| `label` | Label | translated_text | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `section` | Section | reference | sys_hub_ui_section | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `attributes` | Attributes | simple_name_values | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | string | - | ✅ |
| `order` | Order | integer | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:25.599Z*