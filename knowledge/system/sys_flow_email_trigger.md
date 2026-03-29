# ServiceNow Table: Email Trigger (sys_flow_email_trigger)

**Category:** SYSTEM
**SysID:** c7b1be02183a32108bb255f46a373ae4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Execution order | integer | - | - |
| `event_name` | Event name | sysevent_name | - | - |
| `target_table` | Target table | table_name | - | - |
| `email_conditions` | Email record conditions | conditions | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `stop_condition_evaluation` | Stop condition evaluation | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.007Z*