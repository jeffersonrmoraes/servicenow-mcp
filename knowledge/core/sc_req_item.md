# ServiceNow Table: Requested Item (sc_req_item)

**Category:** CORE
**SysID:** 877fe60a187632108bb255f46a373ac7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `quantity` | Quantity | integer | - | - |
| `configuration_item` | Configuration item | reference | cmdb_ci | - |
| `backordered` | Backordered | boolean | - | - |
| `estimated_delivery` | Estimated delivery | glide_date_time | - | - |
| `cat_item` | Item | reference | sc_cat_item | - |
| `price` | Price | currency | - | - |
| `recurring_price` | Recurring Price | price | - | - |
| `billable` | Billable | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `recurring_frequency` | Recurring Price Frequency | choice | - | - |
| `order_guide` | Order Guide | reference | sc_cat_item_guide | - |
| `flow_context` | Flow Context | reference | sys_flow_context | - |
| `request` | Request | reference | sc_request | - |
| `stage` | Stage | workflow | - | - |
| `context` | Context | reference | wf_context | - |
| `sc_catalog` | Catalog | reference | sc_catalog | - |
| `requested_for` | Requested for | reference | sys_user | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:24:36.726Z*