# ServiceNow Table: Children Slot (sys_ux_children_slot)

**Category:** SYSTEM
**SysID:** b77ba286183232108bb255f46a373abe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Slot name | string | - | ✅ |
| `host` | Host | reference | sys_ux_children | ✅ |
| `description` | Description | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.250Z*