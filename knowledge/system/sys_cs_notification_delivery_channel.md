# ServiceNow Table: Delivery Channel (sys_cs_notification_delivery_channel)

**Category:** SYSTEM
**SysID:** c2077e8a183e32108bb255f46a373a14

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `to_table` | Send To (Table) | table_name | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `connection` | Connection | reference | sys_cs_provider | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `notification_content` | Notification Content | reference | sys_notification_va_content_messaging | ✅ |
| `from_identity` | Send From | reference | sys_cs_provider_application | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `to_field` | Send To (Field) | field_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.756Z*