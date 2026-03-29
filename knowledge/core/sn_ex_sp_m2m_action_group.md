# ServiceNow Table: Action group M2M (sn_ex_sp_m2m_action_group)

**Category:** CORE
**SysID:** 9bb63a86183e32108bb255f46a373aa4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user_criteria` | Available for | reference | user_criteria | - |
| `action` | Action | reference | sn_ex_sp_action | ✅ |
| `group` | Group | reference | sn_ex_sp_action_group | ✅ |
| `sys_overrides` | Overrides | reference | sn_ex_sp_m2m_action_group | - |
| `action_visibility` | Action visibility | choice | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `primary` | Primary | boolean | - | - |
| `script` | Script | script_plain | - | - |
| `order` | Order | integer | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:17.381Z*