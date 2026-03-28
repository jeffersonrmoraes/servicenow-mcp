# ServiceNow Table: Command (sys_cs_contextual_action)

**Category:** SYSTEM
**SysID:** 2607be8a183e32108bb255f46a373a4e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `applicability` | Applicability | choice | - | ✅ |
| `keywords` | Commands | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `scope` | Application | reference | sys_scope | - |
| `description` | Description | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.547Z*