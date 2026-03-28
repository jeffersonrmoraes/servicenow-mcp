# ServiceNow Table: Agent Session Tab Detail (sys_cs_message_tab_detail)

**Category:** SYSTEM
**SysID:** 20f6b28a183e32108bb255f46a373a98

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `receiver` | Receiver | reference | sys_user | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `last_read_message_id` | Last Read Message Id | reference | sys_cs_message | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `interaction` | Interaction | reference | interaction | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `is_active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.294Z*