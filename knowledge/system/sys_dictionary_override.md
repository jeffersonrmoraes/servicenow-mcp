# ServiceNow Table: Dictionary Entry Override (sys_dictionary_override)

**Category:** SYSTEM
**SysID:** 621b6202183232108bb255f46a373a42

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `base_table` | Base table | table_name | - | ✅ |
| `name` | Table | table_name | - | ✅ |
| `read_only_override` | Override read only | boolean | - | - |
| `display_override` | Override display value | boolean | - | - |
| `mandatory_override` | Override mandatory | boolean | - | - |
| `dependent_override` | Override dependent | boolean | - | - |
| `default_value_override` | Override default value | boolean | - | - |
| `attributes_override` | Override attributes | boolean | - | - |
| `reference_qual_override` | Override reference qualifier | boolean | - | - |
| `calculation_override` | Override calculation | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `mandatory` | Mandatory | boolean | - | - |
| `dependent` | Dependent | string | - | - |
| `default_value` | Default value | string | - | - |
| `attributes` | Attributes | string | - | - |
| `reference_qual` | Reference qualifier | string | - | - |
| `calculation` | Calculation | string | - | - |
| `element` | Column name | string | - | - |
| `read_only` | Read only | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:27.670Z*