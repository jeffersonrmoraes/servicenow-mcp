# ServiceNow Table: User Experience Analytics Settings (sys_analytics_bucket)

**Category:** SYSTEM
**SysID:** f37ca68e187232108bb255f46a373a94

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `internal_name_for_index` | Internal name | string | - | - |
| `bucket_table_name` | Application Table Name | table_name | - | ✅ |
| `bucket_document_id` | Application SysId | document_id | - | ✅ |
| `application_name` | Name | string | - | ✅ |
| `bucket_metadata_customer_override` | Customer Configuration | simple_name_values | - | - |
| `bucket_metadata` | Configuration | simple_name_values | - | - |
| `analytics_channel` | Analytics Channel | reference | sys_analytics_channel | ✅ |
| `enable_unauthenticated_user_tracking` | Enable Unauthenticated User Tracking | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `bucket_type` | Bucket Type | string | - | ✅ |
| `enabled` | Enabled | boolean | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:18.704Z*