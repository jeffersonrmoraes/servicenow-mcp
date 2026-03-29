# ServiceNow Table: Discovery Log (discovery_log)

**Category:** CORE
**SysID:** 7900360218b632108bb255f46a373ac9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `status` | Discovery status | reference | discovery_status | - |
| `created_on` | Precise created | glide_precise_time | - | - |
| `cmdb_ci` | CI | reference | cmdb_ci | - |
| `sys_id` | Sys ID | GUID | - | - |
| `result_code` | Result code | integer | - | - |
| `sensor` | ECC queue input | reference | ecc_queue | - |
| `device_history` | Device | reference | discovery_device_history | - |
| `short_message` | Short Message | string | - | - |
| `help` | Help | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:20.255Z*