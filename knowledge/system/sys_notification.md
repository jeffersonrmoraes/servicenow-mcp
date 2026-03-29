# ServiceNow Table: Notification (sys_notification)

**Category:** SYSTEM
**SysID:** 407b2e06183232108bb255f46a373a55

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `category` | Category | reference | sys_notification_category | ✅ |
| `advanced_event_condition` | Advanced event condition | boolean | - | - |
| `event_parm_1` | Recipient(s) listed in event parm1 (Learn more) | boolean | - | - |
| `advanced_condition` | Advanced condition | script | - | - |
| `action_insert` | Inserted | boolean | - | - |
| `event` | Event | reference | sysevent_register | - |
| `active` | Active | boolean | - | - |
| `event_parm_2_table` | Table containing recipients from event parm2 | table_name | - | - |
| `include_originator` | Include the person whose action triggered the notification | boolean | - | - |
| `condition` | Conditions | conditions | - | - |
| `notification_classifier` | Notification Classifier | glide_list | sys_notification_classification | - |
| `table` | Table | table_name | - | - |
| `action_delete` | Deleted | boolean | - | - |
| `triggered_by` | Trigger | string | - | ✅ |
| `event_parm_2` | Recipient(s) listed in event parm2 | boolean | - | - |
| `recipient_fields` | Recipients listed in fields | field_list | - | - |
| `recipient_users` | Users | glide_list | sys_user | - |
| `sys_id` | Sys ID | GUID | - | - |
| `action_update` | Updated | boolean | - | - |
| `mandatory` | Mandatory | boolean | - | - |
| `script` | Script | script | - | - |
| `event_parm_1_table` | Table containing recipients from event parm1 | table_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:30.826Z*