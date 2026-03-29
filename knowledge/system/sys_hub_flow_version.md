# ServiceNow Table: Flow Designer Versioning (sys_hub_flow_version)

**Category:** SYSTEM
**SysID:** aec13e42183a32108bb255f46a373a57

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `annotation` | Version Annotation | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `type` | Flow Type | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `payload` | Payload | compressed | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `flow` | Flow SysId | reference | sys_hub_flow | - |
| `sys_updated_by` | Updated by | string | - | - |
| `favorite` | Do Not Delete | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:23.425Z*