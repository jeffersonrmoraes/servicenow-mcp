# ServiceNow Table: Record Trigger (sys_flow_record_trigger)

**Category:** SYSTEM
**SysID:** 3ab1be02183a32108bb255f46a373aac

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `on_delete` | Delete | boolean | - | - |
| `run_flow_in` | Run flow in | choice | - | - |
| `run_when_user_list` | Run When User Setting | glide_list | sys_user | - |
| `on_update` | Update | boolean | - | - |
| `table` | Table | table_name | - | - |
| `run_when_user_setting` | Run When User Setting | choice | - | - |
| `on_insert` | Insert | boolean | - | - |
| `run_on_extended` | Run for records in extended tables | choice | - | - |
| `run_when_setting` | Run When Session Setting | choice | - | - |
| `condition` | Condition | conditions | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.721Z*