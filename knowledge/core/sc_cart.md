# ServiceNow Table: Shopping Cart (sc_cart)

**Category:** CORE
**SysID:** 007f620a187632108bb255f46a373a19

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `special_instructions` | Special instructions | string | - | - |
| `current_guide_serial` | Current guide serial | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `source_id` | Source ID | document_id | - | - |
| `contact_type` | Contact type | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `requested_for` | Requested for | reference | sys_user | - |
| `current_guide_active` | Current guide active | reference | sc_cat_item | - |
| `hidden` | Hidden | boolean | - | - |
| `current_crumbs` | Current crumbs | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | - |
| `guides_added` | Guides added | string | - | - |
| `delivery_address` | Delivery address | string | - | - |
| `current_crumb_history` | Current crumb history | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `source_table` | Source table | table_name | - | - |
| `manual_address` | Manual address | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `user` | User | reference | sys_user | - |
| `current_guide` | Current guide | reference | sc_cat_item_guide | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:36.404Z*