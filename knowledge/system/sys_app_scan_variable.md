# ServiceNow Table: Variable (sys_app_scan_variable)

**Category:** SYSTEM
**SysID:** f202f2c6183a32108bb255f46a373ad9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `variable_hash` | Variable Hash | string | - | - |
| `template_execution_script` | Template Execution Script | script_plain | - | - |
| `name` | Variable name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `scan_source` | Scan Source | choice | - | - |
| `run_script` | Run script on template execution? | boolean | - | - |
| `type` | Variable type | reference | sys_app_scan_variable_type | - |
| `scan_instance` | Scan Instance | string | - | - |
| `referenced_table` | Referenced Table | table_name | - | ✅ |
| `source_id` | Source ID | document_id | - | ✅ |
| `original_value` | Original value | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.298Z*