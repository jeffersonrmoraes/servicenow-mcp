# ServiceNow Table: Authenticator Metadata (sys_authenticator_metadata)

**Category:** SYSTEM
**SysID:** feacae4218b232108bb255f46a373ac6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `protocol_family` | Protocol Family | string | - | - |
| `is_second_factor_only` | Second Factor Only | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `assertion_scheme` | Assertion Scheme | string | - | - |
| `public_key_alg_and_encoding` | Public Key Algorithm And Encoding | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `aaguid` | AAGUID | string | - | ✅ |
| `user_verification_details` | User Verification Details | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `attestation_types` | Attestation Types | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `description` | Description | string | - | - |
| `icon` | Image | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `upv` | User Presence Verification | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `authentication_algorithm` | Authentication Algorithm | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:41.857Z*