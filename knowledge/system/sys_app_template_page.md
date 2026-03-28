# ServiceNow Table: Template Page (sys_app_template_page)

**Category:** SYSTEM
**SysID:** 6a02f2c6183a32108bb255f46a373a83

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template_wizard` | Template Wizard | reference | sys_app_template_wizard | ✅ |
| `order` | Order | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sub_header` | Sub Header | translated_text | - | - |
| `page_type` | Page Type | reference | sys_app_template_page_type | ✅ |
| `page_name` | Page Name | string | - | - |
| `header` | Header | translated_text | - | - |
| `title` | Title | translated_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:28.810Z*