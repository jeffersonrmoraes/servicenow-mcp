# ServiceNow Table: Node State (sys_cluster_state)

**Category:** SYSTEM
**SysID:** 005b2282183232108bb255f46a373a04

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `schedulers` | Schedulers | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `most_recent_message` | Most recent message | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `heartbeat_timestamp` | Heartbeat timestamp | glide_date_time | - | - |
| `role` | Role | choice | - | ✅ |
| `allow_inbound` | Allow inbound connections | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `status` | Status | string | - | - |
| `build_name` | Build Name | string | - | - |
| `node_type` | Node Type | reference | sys_node_type | - |
| `ready_to_failover` | Ready to failover | boolean | - | - |
| `pause_count` | Pause count | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `node_id` | Node ID | string | - | - |
| `upgrades_after` | Upgrades After | reference | sys_cluster_state | - |
| `participation` | Participation | string | - | - |
| `most_recent_keys` | Most recent keys | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `system_id` | System ID | string | - | - |
| `n2n_socket_address` | N2n socket address | string | - | - |
| `fast_aha_readiness` | Fast AHA Readiness | string | - | - |
| `node_stats` | Node stats | reference | sys_cluster_node_stats | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:53.421Z*