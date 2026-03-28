# ServiceNow Table: Instance with Table (sp_instance_table)

**Category:** CORE
**SysID:** 2790364a18b632108bb255f46a373a4c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | - |
| `order_direction` | Order direction | string | - | - |
| `order_by` | Order by | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `display_field` | Display field | field_name | - | - |
| `field_list` | Fields | field_list | - | - |
| `maximum_entries` | Maximum entries | integer | - | - |
| `sp_page` | Link to this page | reference | sp_page | - |
| `filter` | Filter | conditions | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:42.034Z*