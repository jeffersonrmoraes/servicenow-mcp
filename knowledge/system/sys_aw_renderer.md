# ServiceNow Table: Workspace Renderer (sys_aw_renderer)

**Category:** SYSTEM
**SysID:** 75e0b2ce18b632108bb255f46a373ab3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `custom_renderer_tag` | Custom Renderer Tag | string | - | ✅ |
| `workspace_config` | Workspace Settings | reference | sys_aw_master_config | ✅ |
| `renderer_type` | Renderer Type | choice | - | - |
| `custom_renderer` | Custom Renderer | reference | sys_ux_lib_component | - |
| `table` | Table | table_name | - | - |
| `macroponent` | Macroponent | reference | sys_ux_macroponent | - |
| `workspace_module` | Workspace Module | reference | sys_aw_module | - |
| `type_ext` | Renderer Type Extension | reference | sys_aw_renderer_type | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `module_flag` | Module flag | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.153Z*