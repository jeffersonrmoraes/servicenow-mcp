# ServiceNow Table: Cs Consumer Account (sys_cs_consumer_account)

**Category:** SYSTEM
**SysID:** f1f6368a183e32108bb255f46a373ae6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `consumer` | Consumer | reference | sys_cs_consumer | ✅ |
| `j_session_id` | JSESSIONID | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `vendor_user_id` | Vendor User Id | string | - | - |
| `provider_application` | Provider application | reference | sys_cs_provider_application | - |
| `channel_user_profile` | Channel user profile | reference | sys_cs_channel_user_profile | - |
| `sys_id` | Sys ID | GUID | - | - |
| `portal` | Portal | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `consumer_account_context` | Consumer Account Context | reference | sys_cs_consumer_account_context | - |
| `sys_updated_by` | Updated by | string | - | - |
| `model_type` | Model Type | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `vendor` | Vendor | reference | sys_cs_vendor | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.135Z*