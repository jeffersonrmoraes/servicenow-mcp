# ServiceNow Table: Ribbon Component (sys_aw_ribbon_component)

**Category:** SYSTEM
**SysID:** 58a23e82187a32108bb255f46a373a78

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | translated_text | - | - |
| `name` | Name | translated_field | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `tag` | Tag name | string | - | ✅ |
| `component` | UX Component | reference | sys_ux_lib_component | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.188Z*