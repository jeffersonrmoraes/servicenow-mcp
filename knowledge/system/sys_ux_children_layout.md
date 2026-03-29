# ServiceNow Table: UX Children Layout (sys_ux_children_layout)

**Category:** SYSTEM
**SysID:** eb7ba286183232108bb255f46a373a82

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `model` | Model | string | - | - |
| `description` | Description | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | choice | - | - |
| `host` | Host | reference | sys_ux_children | - |
| `name` | Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.252Z*