# ServiceNow Table: Knowledge Version (kb_version)

**Category:** CORE
**SysID:** 7fd232c6187a32108bb255f46a373a84

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `version` | Version | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `modified_on` | Modified On | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `snapshot` | Snapshot | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `knowledge` | Knowledge | reference | kb_knowledge | - |
| `modified_by` | Modified By | reference | sys_user | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:34.228Z*