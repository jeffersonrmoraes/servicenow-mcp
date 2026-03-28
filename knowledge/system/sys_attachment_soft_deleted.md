# ServiceNow Table: Delete Marked Attachment (sys_attachment_soft_deleted)

**Category:** SYSTEM
**SysID:** 8fac628218b232108bb255f46a373a43

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `table_sys_id` | Table sys ID | char | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `attachment` | Attachment | reference | sys_attachment | - |
| `table_name` | Table Name | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `last_execution_time` | Last execution time | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:39.053Z*