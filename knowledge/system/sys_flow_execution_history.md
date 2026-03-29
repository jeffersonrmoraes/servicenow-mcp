# ServiceNow Table: Flow execution history (sys_flow_execution_history)

**Category:** SYSTEM
**SysID:** bfb1b242183a32108bb255f46a373a61

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `type` | Type | string | - | - |
| `parent_loops` | Parent loops | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `step_alias` | Step alias | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `context` | Context | reference | sys_flow_context | - |
| `sys_mod_count` | Updates | integer | - | - |
| `data` | Data | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `execution_sequence` | Execution sequence | integer | - | - |
| `flow_structure_type` | Flow structure type | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `component_alias` | Component alias | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.013Z*