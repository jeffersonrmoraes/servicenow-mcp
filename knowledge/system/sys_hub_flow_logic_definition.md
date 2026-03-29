# ServiceNow Table: Logic Definition (sys_hub_flow_logic_definition)

**Category:** SYSTEM
**SysID:** 73c1be42183a32108bb255f46a373a7c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `connected_to` | Connected to | glide_list | sys_hub_flow_logic_definition | - |
| `type` | Type | string | - | ✅ |
| `attributes` | Attributes | string | - | - |
| `order` | Order | int | - | - |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `quiescence` | Quiescence | choice | - | ✅ |
| `category` | Category | string | - | - |
| `visible` | Visible | boolean | - | - |
| `name` | Name | translated_text | - | ✅ |
| `compilation_class` | Compilation class | string | - | - |
| `variables` | Variable | glide_var | sys_hub_flow_logic_variable | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:21.980Z*