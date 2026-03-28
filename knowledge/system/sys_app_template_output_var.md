# ServiceNow Table: Template Output Variable (sys_app_template_output_var)

**Category:** SYSTEM
**SysID:** e602f2c6183a32108bb255f46a373aad

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `label` | Label | string | - | - |
| `flow_output_variable` | Flow Output | reference | sys_hub_flow_output | - |
| `default` | Default value | string | - | - |
| `description` | Description | string | - | - |
| `template` | Template | reference | sys_app_template | ✅ |
| `type` | Type | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:28.779Z*