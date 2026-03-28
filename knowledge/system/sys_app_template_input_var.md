# ServiceNow Table: Template Input Variable (sys_app_template_input_var)

**Category:** SYSTEM
**SysID:** 6202f2c6183a32108bb255f46a373a6a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `template` | Template | reference | sys_app_template | ✅ |
| `type` | Type | string | - | ✅ |
| `flow_input_variable` | Flow input | reference | sys_hub_flow_input | - |
| `name` | Name | string | - | ✅ |
| `mandatory` | Mandatory | boolean | - | - |
| `label` | Label | string | - | - |
| `default` | Default value | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:28.742Z*