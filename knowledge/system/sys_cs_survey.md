# ServiceNow Table: Chat Surveys (sys_cs_survey)

**Category:** SYSTEM
**SysID:** 21073e8a183e32108bb255f46a373a49

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `survey` | Survey | reference | asmt_metric_type | ✅ |
| `show_summary` | Show Summary | boolean | - | - |
| `active` | Active | boolean | - | - |
| `condition_script` | Script | script | - | - |
| `order` | Order | integer | - | ✅ |
| `queue` | Queue | reference | awa_queue | - |
| `sys_overrides` | Overrides | reference | sys_cs_survey | - |
| `condition` | Condition | conditions | - | - |
| `type` | Type | string | - | ✅ |
| `req_ended` | Requester Ended | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `condition_mode` | Condition mode | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.252Z*