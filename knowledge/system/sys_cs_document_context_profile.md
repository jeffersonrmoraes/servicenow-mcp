# ServiceNow Table: Profile and Document Mapping (sys_cs_document_context_profile)

**Category:** SYSTEM
**SysID:** 5af6768a183e32108bb255f46a373ae2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `document_table` | Document Table | table_name | - | ✅ |
| `sys_overrides` | Overrides | reference | sys_cs_document_context_profile | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `document` | Document | document_id | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.400Z*