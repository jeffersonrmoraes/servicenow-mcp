# ServiceNow Table: UX Page Property (sys_ux_page_property)

**Category:** SYSTEM
**SysID:** 3a7bae46183232108bb255f46a373ad1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |
| `name` | Name | string | - | - |
| `required_translations` | Required Translations | json_translations | - | - |
| `page` | Page | reference | sys_ux_page_registry | ✅ |
| `value` | Value | string | - | - |
| `suffix` | Suffix | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `choices` | Choices | string | - | - |
| `unique_name` | Unique name | string | - | - |
| `route` | Route | reference | sys_ux_app_route | - |
| `description` | Description | translated_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.677Z*