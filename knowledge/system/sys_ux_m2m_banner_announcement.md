# ServiceNow Table: Banner Announcement Mapping (sys_ux_m2m_banner_announcement)

**Category:** SYSTEM
**SysID:** 666feac6187632108bb255f46a373a0c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `announcement` | Announcement | reference | sys_ux_banner_announcement | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `announcement_config` | Announcement Config | reference | sys_ux_banner_announcement_config | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `order` | Order | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.214Z*