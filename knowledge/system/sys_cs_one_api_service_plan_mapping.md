# ServiceNow Table: One Api Mapping (sys_cs_one_api_service_plan_mapping)

**Category:** SYSTEM
**SysID:** cdf6f28a183e32108bb255f46a373a9e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `output_processor` | VA Output processor | reference | sys_script_include | - |
| `active` | Active | boolean | - | - |
| `service_plan` | Service plan | reference | one_api_service_plan | - |
| `hook` | Hook | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.750Z*