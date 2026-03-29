# ServiceNow Table: UX Add-on Event Mapping (sys_ux_addon_event_mapping)

**Category:** SYSTEM
**SysID:** 5b7b2286183232108bb255f46a373a9d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `target_payload_mapping` | Target Payload Mapping | json | - | - |
| `controller` | Controller | reference | sys_ux_controller | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `source_element_id` | Source element ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Event Mapping Name | string | - | ✅ |
| `sys_overrides` | Override | reference | sys_ux_addon_event_mapping | - |
| `target_event` | Target Event | reference | sys_ux_event | - |
| `source_da` | Source Declarative Action | reference | sys_declarative_action_assignment | - |
| `parent_macroponent` | Parent Macroponent | reference | sys_ux_macroponent | - |
| `sys_domain` | Domain | domain_id | - | - |
| `active` | Active | boolean | - | - |
| `source_component` | Source Component | reference | sys_ux_macroponent | - |
| `description` | Description | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:31.761Z*