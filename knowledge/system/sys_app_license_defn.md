# ServiceNow Table: Application License Definition (sys_app_license_defn)

**Category:** SYSTEM
**SysID:** d61c2e46187232108bb255f46a373abe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `number` | Number | string | - | - |
| `aggregation` | Aggregation | choice | - | - |
| `state` | Definition State | choice | - | - |
| `metric_type` | Metric Type | choice | - | ✅ |
| `name` | Name | string | - | ✅ |
| `frequency` | Frequency | choice | - | ✅ |
| `group_by` | Group By | string | - | - |
| `performance_validated` | Performance Validated | boolean | - | - |
| `metric_key` | Metric Key | string | - | - |
| `agg_col` | Aggregation Column | field_name | - | - |
| `query` | Query | conditions | - | - |
| `description` | Description | translated_text | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.874Z*