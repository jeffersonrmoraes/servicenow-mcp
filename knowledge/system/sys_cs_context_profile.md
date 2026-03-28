# ServiceNow Table: Custom Greetings and Setup (sys_cs_context_profile)

**Category:** SYSTEM
**SysID:** d0077a8a183e32108bb255f46a373aaa

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `condition_script` | Script | script | - | - |
| `active` | Active | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `condition` | Condition | conditions | - | - |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |
| `assistant_applicability_type` | Assistant Applicability Type | choice | - | ✅ |
| `condition_mode` | Condition Mode | string | - | ✅ |
| `order` | Order | integer | - | ✅ |
| `model_type` | Model Type | choice | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.508Z*