# ServiceNow Table: AIA Step Log (sys_cs_aia_step_log)

**Category:** SYSTEM
**SysID:** 42f6768a183e32108bb255f46a373a87

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `response` | Response | string | - | - |
| `conversation_id` | Conversation | reference | sys_cs_conversation | ✅ |
| `status` | Execution Status | choice | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `execution_id` | Execution Id | string | - | ✅ |
| `bundle_name` | Bundle Name | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `message_id` | Message | reference | sys_cs_message | ✅ |
| `use_case_id` | Use Case Id | reference | sn_aia_usecase | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | choice | - | ✅ |
| `execution_plan_id` | Execution Plan Id | reference | sn_aia_execution_plan | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `parent_step` | Parent Step | reference | sys_cs_aia_step_log | - |
| `step_name` | Step Name | string | - | ✅ |
| `additional_args` | Additional Args | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.790Z*