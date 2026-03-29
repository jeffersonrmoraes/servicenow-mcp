# ServiceNow Table: Navigation menu item M2M Quick link (sn_ex_sp_m2m_portal_navigation_item_quicklink)

**Category:** CORE
**SysID:** 08c67a86183e32108bb255f46a373a8e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `quick_link` | Quick link | reference | sn_ex_sp_quick_link | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `navigation_menu_item` | Menu item | reference | sn_ex_sp_portal_extensible_navigation_item | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.152Z*