# ServiceNow Table: Application (sys_scope)

**Category:** SYSTEM
**SysID:** 761b6202183232108bb255f46a373a82

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `restrict_table_access` | Restrict Table Choices | boolean | - | - |
| `guided_setup_guid` | Guided Setup | reference | gsw_content | - |
| `template` | Template | string | - | - |
| `vendor_prefix` | Vendor prefix | string | - | - |
| `can_edit_in_studio` | Can Edit Application in Studio | boolean | - | - |
| `private` | Private | boolean | - | - |
| `vendor` | Vendor | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `runtime_access_tracking` | Restrict Runtime Access | string | - | - |
| `subscription_entitlement` | Subscription | reference | subscription_entitlement | - |
| `scoped_administration` | Application administration | boolean | - | - |
| `logo` | Logo | user_image | - | - |
| `license` | Subscription | reference | license_details | - |
| `scope` | Scope | string | - | - |
| `js_level` | JavaScript Mode | string | - | - |
| `short_description` | Short description | translated_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:26.942Z*