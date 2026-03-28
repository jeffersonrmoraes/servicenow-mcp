# ServiceNow Table: Conversation Session (sys_cs_session)

**Category:** SYSTEM
**SysID:** a4077a8a183e32108bb255f46a373afc

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `consumer_account` | Consumer Account | reference | sys_cs_consumer_account | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `device_type` | Device Type | string | - | - |
| `end_time` | End Time | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `vendor` | Vendor | reference | sys_cs_vendor | - |
| `number_of_messages` | Number Of Messages | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `consumer` | Consumer | reference | sys_cs_consumer | - |
| `duration` | Session Duration | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `direction` | Direction | string | - | - |
| `interaction` | Interaction | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `device_id` | Device Identifier | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `start_time` | Start Time | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.154Z*