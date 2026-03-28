# ServiceNow Table: Client Interaction Details (sys_client_interaction_details)

**Category:** SYSTEM
**SysID:** d27bea46183232108bb255f46a373a2a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `interaction_id` | Interaction ID | reference | sys_client_interaction | - |
| `definition_id` | Definition ID | document_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Name | string | - | - |
| `seismic_id` | Seismic ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `component_name` | Component Name | string | - | - |
| `type` | Type | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `time` | Time | decimal | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `id` | ID | string | - | - |
| `definition_id_table` | Definition ID Table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `meta` | Meta | json | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `order` | Order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:53.465Z*