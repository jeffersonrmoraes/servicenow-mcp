# ServiceNow Table: Payload Rule (sys_app_payload_unloader_rule)

**Category:** SYSTEM
**SysID:** 0b0236c6183a32108bb255f46a373a58

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `script` | Script | script_plain | - | - |
| `advanced` | Advanced | boolean | - | - |
| `applies_to_field` | Applies to field | reference | sys_glide_object | - |
| `sys_id` | Sys ID | GUID | - | - |
| `applies_to_table` | Applies to table | table_name | - | - |
| `when` | When to run | string | - | - |
| `active` | Active | boolean | - | - |
| `script_condition` | Condition | condition_string | - | - |
| `type` | Rule type | choice | - | ✅ |
| `order` | Order | integer | - | - |
| `filter_condition` | Filter Conditions | conditions | - | - |
| `name` | Name | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.937Z*