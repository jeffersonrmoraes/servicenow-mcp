# ServiceNow Table: Template (sys_app_template)

**Category:** SYSTEM
**SysID:** 9202f2c6183a32108bb255f46a373a34

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `progress_worker` | Progress Worker | reference | sys_progress_worker | - |
| `create_app` | Application template? | boolean | - | - |
| `snapshot` | Snapshot | boolean | - | - |
| `flow` | Flow | reference | sys_hub_flow | - |
| `type` | Type | reference | sys_app_template_type | - |
| `sys_id` | Sys ID | GUID | - | - |
| `referenced_table` | Referenced Table | table_name | - | - |
| `ux_framework_component` | UX Framework Component | reference | sys_ux_lib_component | - |
| `name` | Name | translated_text | - | ✅ |
| `source_id` | Source ID | document_id | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.337Z*