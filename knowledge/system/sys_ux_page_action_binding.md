# ServiceNow Table: Action Binding (sys_ux_page_action_binding)

**Category:** SYSTEM
**SysID:** 2b7ba286183232108bb255f46a373a2f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `publisher` | Action source | reference | sys_ux_page_element | - |
| `subscriber` | Subscriber | reference | sys_ux_page_element | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `action` | Action | reference | sys_ux_page_action | ✅ |
| `target_prop` | Payload target | reference | sys_ux_lib_component_prop | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.639Z*