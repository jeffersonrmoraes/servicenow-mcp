# ServiceNow Table: Collab Configuration (sys_cs_collab_config)

**Category:** SYSTEM
**SysID:** 1a1736ca183e32108bb255f46a373a38

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent_document` | Parent Document | document_id | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `channel` | Channel | reference | sys_cs_collab_channel | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `create_external_conversation` | Create External Conversation | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `parent_table` | Parent Table | table_name | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.183Z*