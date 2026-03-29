# ServiceNow Table: UX Sitemap Definition (sys_ux_sitemap_definition)

**Category:** SYSTEM
**SysID:** 2599fece18be32108bb255f46a373a37

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `type` | Type | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `script` | Script | script | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sitemap_config` | SEO Sitemap Config | reference | sys_ux_seo_sitemap_config | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `xml` | Static XML | xml | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.124Z*