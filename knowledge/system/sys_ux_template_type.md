# ServiceNow Table: UX Template Type (sys_ux_template_type)

**Category:** SYSTEM
**SysID:** 537b6286183232108bb255f46a373a59

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `composition_restriction_type` | Composition Restriction Type | choice | - | - |
| `label` | Label | string | - | ✅ |
| `base_macroponent` | Base Macroponent | reference | sys_ux_macroponent | ✅ |
| `api_name` | API Name | string | - | - |
| `name` | Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `macroponent_type_restrictions` | Restricted Macroponent Types | glide_list | sys_ux_macroponent_type | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:42.849Z*