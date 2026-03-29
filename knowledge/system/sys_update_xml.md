# ServiceNow Table: Customer Update (sys_update_xml)

**Category:** SYSTEM
**SysID:** fc2b6602183232108bb255f46a373a6d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `payload` | Payload | string | - | - |
| `sys_recorded_at` | Recorded at | counter | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `name` | Name | string | - | - |
| `update_domain` | Update domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `target_name` | Target name | string | - | - |
| `application` | Application | reference | sys_scope | - |
| `action` | Action | string | - | - |
| `update_guid` | Update guid | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `remote_update_set` | Remote update set | reference | sys_remote_update_set | - |
| `replace_on_upgrade` | Replace on upgrade | boolean | - | - |
| `category` | Category | string | - | - |
| `table` | Table | table_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `update_set` | Update set | reference | sys_update_set | - |
| `view` | View | string | - | - |
| `type` | Type | string | - | - |
| `update_guid_history` | Update guid history | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `comments` | Comments | string | - | - |
| `payload_hash` | Payload hash | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:25.870Z*