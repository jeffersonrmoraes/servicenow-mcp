# ServiceNow Table: Adapter Card (sys_cs_adapter_card)

**Category:** SYSTEM
**SysID:** 9107fa8a183e32108bb255f46a373aec

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `type` | Card Type | string | - | - |
| `name` | Card Name | translated_text | - | ✅ |
| `available_to_topic_author` | Available to Topic Author | boolean | - | - |
| `thumbnail` | Thumbnail | reference | db_image | - |
| `fields` | Fields | string_full_utf8 | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:56.332Z*