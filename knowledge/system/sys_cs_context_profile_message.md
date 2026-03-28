# ServiceNow Table: Custom Greetings and Setup Messages (sys_cs_context_profile_message)

**Category:** SYSTEM
**SysID:** c2f6768a183e32108bb255f46a373ab1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `message` | Message | translated_text | - | ✅ |
| `type` | Type | choice | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `sys_overrides` | Overrides | reference | sys_cs_context_profile_message | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.583Z*