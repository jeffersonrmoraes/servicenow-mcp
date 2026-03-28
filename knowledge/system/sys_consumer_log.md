# ServiceNow Table: Stream Connect Log (sys_consumer_log)

**Category:** SYSTEM
**SysID:** 593ce20a187232108bb255f46a373a79

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `subscription` | Subscription | reference | sys_kafka_subscription | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sc_alert` | Alert | reference | sys_sc_alerts | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.878Z*