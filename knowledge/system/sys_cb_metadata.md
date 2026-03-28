# ServiceNow Table: Component Builder Metadata (sys_cb_metadata)

**Category:** SYSTEM
**SysID:** 8838b6ca187e32108bb255f46a373a84

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `usage_guidelines` | Usage Guidelines | translated_text | - | - |
| `component` | Component | reference | sys_uib_toolbox_component | ✅ |
| `macroponent` | Macroponent | reference | sys_ux_macroponent | ✅ |
| `preview_image` | Preview Image | image | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.532Z*