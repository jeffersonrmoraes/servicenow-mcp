# ServiceNow Table: UX Page Element Permissions (sys_ux_page_element_m2m_role)

**Category:** SYSTEM
**SysID:** 877bee46183232108bb255f46a373aba

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `role` | Role | reference | sys_user_role | - |
| `element` | Element | reference | sys_ux_page_element | - |
| `group` | Group | reference | sys_user_group | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.683Z*