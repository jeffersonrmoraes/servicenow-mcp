# ServiceNow Table: Payload (sys_app_scan_payload)

**Category:** SYSTEM
**SysID:** d202f2c6183a32108bb255f46a373a18

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `scan_source` | Scan Source | choice | - | - |
| `source_id` | Source ID | document_id | - | ✅ |
| `source_name` | Source Name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `payload_hash` | Serialized Record Hash | string | - | - |
| `serialized_record` | Serialized Record XML | string | - | - |
| `source_class` | Source Class | table_name | - | - |
| `scan_instance` | Scan Instance | string | - | - |
| `version` | Version | integer | - | - |
| `referenced_table` | Referenced Table | table_name | - | ✅ |
| `source_sys_id` | Source Sys ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.939Z*