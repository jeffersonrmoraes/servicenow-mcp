# ServiceNow Table: EVAM View Config (sys_ux_composite_data_template_predicate)

**Category:** SYSTEM
**SysID:** fd6f66c6187632108bb255f46a373ae1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `predicate_bundle` | View Config Bundle | reference | sys_ux_composite_data_template_predicate_bundle | - |
| `field_list` | Table Fields | field_list | - | - |
| `custom_condition` | Custom Condition | string | - | - |
| `active` | Active | boolean | - | - |
| `required_roles` | Required Roles | user_roles | - | - |
| `ux_template` | View Template | reference | sys_ux_composite_data_template | - |
| `condition` | Condition | conditions | - | - |
| `name` | Name | string | - | ✅ |
| `custom_field_list` | Custom Fields | string | - | - |
| `table` | Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.948Z*