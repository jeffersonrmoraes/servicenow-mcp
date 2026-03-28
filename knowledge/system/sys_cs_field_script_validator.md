# ServiceNow Table: Conversation Server Field Script Validator (sys_cs_field_script_validator)

**Category:** SYSTEM
**SysID:** 9f0fa202187632108bb255f46a373a9e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `label` | Label | translated_text | - | ✅ |
| `active` | Active | boolean | - | - |
| `error_message` | Error Message | translated_text | - | ✅ |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_field_script_validator | - |
| `validator` | Validator | script_plain | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.893Z*