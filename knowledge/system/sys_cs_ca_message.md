# ServiceNow Table: Custom Adapter Message (sys_cs_ca_message)

**Category:** SYSTEM
**SysID:** ee07be8a183e32108bb255f46a373a2d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sequence` | Sequence | counter | - | - |
| `payload` | Payload | string_full_utf8 | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `status` | Status | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `provider_identity` | Provider identity | reference | sys_cs_provider_application | ✅ |
| `is_llm` | Is LLM Conversation | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `execution_context` | Execution Context | reference | sys_flow_context | - |
| `sys_created_by` | Created by | string | - | - |
| `channel_user_id` | Channel user ID | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `message` | Message | string_full_utf8 | - | - |
| `additional_attributes` | Additional Attributes | string_full_utf8 | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.684Z*