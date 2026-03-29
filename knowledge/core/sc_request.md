# ServiceNow Table: Request (sc_request)

**Category:** CORE
**SysID:** b64f2646187632108bb255f46a373afa

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `calendar_stc` | Resolve Time | integer | - | - |
| `request_state` | Request state | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `parent_interaction` | Parent interaction | reference | interaction | - |
| `special_instructions` | Special instructions | string | - | - |
| `price` | Price | currency | - | - |
| `requested_for` | Requested for | reference | sys_user | - |
| `delivery_address` | Delivery address | string | - | - |
| `requested_date` | Requested for date | glide_date | - | - |
| `stage` | Stage | workflow | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:06.306Z*