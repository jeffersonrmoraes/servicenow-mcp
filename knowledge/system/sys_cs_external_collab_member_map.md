# ServiceNow Table: External Collaboration Member Map (sys_cs_external_collab_member_map)

**Category:** SYSTEM
**SysID:** d217f2ca183e32108bb255f46a373ace

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `context_id` | Context ID | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `provider` | Provider | reference | sys_cs_collab_provider | - |
| `sys_updated_by` | Updated by | string | - | - |
| `external_member_id` | External Member ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `member` | Member | reference | sys_cs_collab_member | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `status` | Status | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.890Z*