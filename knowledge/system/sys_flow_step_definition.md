# ServiceNow Table: Action Step Definition (sys_flow_step_definition)

**Category:** SYSTEM
**SysID:** c4c1f242183a32108bb255f46a373ac9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `plugin_id` | Plugin ID | string | - | - |
| `step_icon` | Step Icon | user_image | - | - |
| `visible` | Visible | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `category` | Category | string | - | ✅ |
| `step_status` | Step Status | string | - | - |
| `allow_extended_outputs` | Allow extended outputs | boolean | - | - |
| `op_class` | Operation Class | string | - | - |
| `allow_extended_inputs` | Allow extended inputs | boolean | - | - |
| `availability` | Availability | glide_list | - | - |
| `quiescence` | Quiescence | choice | - | ✅ |
| `type` | Type | string | - | - |
| `short_description` | Short Description | string | - | - |
| `extension_point_name` | Extension point name | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.115Z*