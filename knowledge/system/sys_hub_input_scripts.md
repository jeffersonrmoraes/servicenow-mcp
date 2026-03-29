# ServiceNow Table: Input Scripts (sys_hub_input_scripts)

**Category:** SYSTEM
**SysID:** d3c17e42183a32108bb255f46a373a8e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `instance` | Instance | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `script` | Script | json | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `input_name` | Input Name | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `referenced_table` | Referenced Table | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:23.446Z*