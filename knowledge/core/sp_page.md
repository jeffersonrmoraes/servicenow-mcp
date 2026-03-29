# ServiceNow Table: Page (sp_page)

**Category:** CORE
**SysID:** 14a0764a18b632108bb255f46a373ad8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `category` | Category | string | - | - |
| `internal` | Internal | boolean | - | - |
| `short_description` | Short description | translated_text | - | - |
| `human_readable_url_structure` | Human readable url structure | string | - | - |
| `dynamic_title_structure` | Dynamic page title | translated_text | - | - |
| `roles` | Roles | user_roles | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `title` | Title | translated_text | - | - |
| `seo_script` | SEO script | reference | sys_script_include | - |
| `omit_watcher` | Omit watcher | boolean | - | - |
| `public` | Public | boolean | - | - |
| `css` | Page Specific CSS | css | - | - |
| `id` | ID | string | - | ✅ |
| `use_seo_script` | Use SEO script | boolean | - | - |
| `draft` | Draft | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.125Z*