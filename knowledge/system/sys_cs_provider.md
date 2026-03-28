# ServiceNow Table: Provider Channel (sys_cs_provider)

**Category:** SYSTEM
**SysID:** aa07be8a183e32108bb255f46a373a03

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `contextual_action` | Contextual action | string | - | - |
| `channel` | Channel | reference | sys_cs_channel | ✅ |
| `trusted_media_domains` | Trusted media domains | string | - | - |
| `version` | Version | choice | - | ✅ |
| `link_account_enabled` | Allow account linking | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |
| `link_account_action` | Link account action | string | - | - |
| `sender_subflow` | Sender subflow | string | - | - |
| `automatic_link_enabled` | Auto link users' ServiceNow profiles | boolean | - | - |
| `account_link_type` | Account linking type | choice | - | - |
| `response_processor_action` | Response processor action | string | - | - |
| `message_order` | Maintain message ordering | boolean | - | - |
| `sender_action` | Sender action | string | - | - |
| `automatic_link_action` | Automatic link action | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `html_with_image_link` | HTML to Image conversion required | boolean | - | - |
| `support_external_wrap_up` | Support external wrap up | boolean | - | - |
| `provider_attributes_action` | Provider attributes action | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.218Z*