# ServiceNow Table: User Experience Analytics User Consent Decision (sys_analytics_user_consent_decision)

**Category:** SYSTEM
**SysID:** 448ca68e187232108bb255f46a373aad

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `date` | Date | glide_date_time | - | ✅ |
| `analytics_consent_policy` | Policy | reference | sys_analytics_consent_policy | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `provider` | Provider | reference | sys_analytics_detection_policy_provider | - |
| `sys_created_by` | Created by | string | - | - |
| `decision` | Decision | boolean | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `migrated_consent_date` | Migrated Consent Date | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user` | User | reference | sys_user | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:21.544Z*