# ServiceNow Table: UX Page Action Registry (sys_ux_page_action)

**Category:** SYSTEM
**SysID:** 8f7bee46183232108bb255f46a373a53

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `page` | Page | reference | sys_ux_page | ✅ |
| `name` | Action name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `publishers` | Publishers | glide_list | sys_ux_page_element | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.643Z*