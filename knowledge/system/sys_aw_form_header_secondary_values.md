# ServiceNow Table: Secondary Values (sys_aw_form_header_secondary_values)

**Category:** SYSTEM
**SysID:** b8a2be82187a32108bb255f46a373a0f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `form_header` | Form Header | reference | sys_aw_form_header | - |
| `field` | Field | field_name | - | - |
| `conditions` | Conditions | conditions | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `roles` | Roles | glide_list | sys_user_role | - |
| `order` | Order | integer | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.704Z*