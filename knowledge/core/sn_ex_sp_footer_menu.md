# ServiceNow Table: Employee Center Footer Menu (sn_ex_sp_footer_menu)

**Category:** CORE
**SysID:** a7b63a86183e32108bb255f46a373ac2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `footer` | Footer | reference | sn_ex_sp_footer | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `link_type` | Link Type | string | - | - |
| `order` | Order | integer | - | ✅ |
| `menu` | Menu | reference | sp_instance_menu | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:17.339Z*