# ServiceNow Table: Dashboard Placement (sys_dashboard_detail)

**Category:** SYSTEM
**SysID:** 626ba206183232108bb255f46a373a1b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `board_row` | Board row | integer | - | - |
| `board_id` | Board ID | reference | sys_dashboard | - |
| `column_span` | Column span | integer | - | - |
| `gauge_id` | Gauge ID | reference | sys_gauge | - |
| `sys_id` | Sys ID | GUID | - | - |
| `row_span` | Row span | integer | - | - |
| `board_column` | Board column | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:19.472Z*