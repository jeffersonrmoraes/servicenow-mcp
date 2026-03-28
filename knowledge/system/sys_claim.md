# ServiceNow Table: Application File Claims (sys_claim)

**Category:** SYSTEM
**SysID:** 8cdba68e183232108bb255f46a373ab5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `claim_owner_scope` | Claim Owner Scope | reference | sys_scope | - |
| `sys_id` | Sys ID | GUID | - | - |
| `previous_claim_scope` | Claim From Scope | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `previous_claim_app_version` | Claimed From App Version | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `claim_timestamp` | Time Claimed | counter | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `metadata_update_name` | Update Name | string | - | - |
| `previous_claim_name` | Claim From Name | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:51.978Z*