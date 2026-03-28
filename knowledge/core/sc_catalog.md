# ServiceNow Table: Catalog (sc_catalog)

**Category:** CORE
**SysID:** ce7fa60a187632108bb255f46a373a02

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `enable_wish_list` | Enable Wish List | boolean | - | - |
| `desktop_continue_shopping` | 'Continue Shopping' page | string | - | - |
| `desktop_image` | Desktop image | user_image | - | - |
| `title` | Title | translated_field | - | ✅ |
| `editors` | Editors | glide_list | sys_user | - |
| `manager` | Manager | reference | sys_user | - |
| `active` | Active | boolean | - | - |
| `desktop_home_page` | 'Catalog Home' Page | string | - | - |
| `description` | Description | translated_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:35.319Z*