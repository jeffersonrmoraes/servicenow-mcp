# ServiceNow Table: Context Profile Preferred Skill (sys_cs_context_profile_preferred_skill)

**Category:** SYSTEM
**SysID:** c507fa8a183e32108bb255f46a373a60

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `skill_provider` | Skill Provider | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `skill_document` | Skill Document | document_id | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `order` | Order | integer | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.549Z*