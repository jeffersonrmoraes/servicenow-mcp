# ServiceNow Table: UX Macroponent Definition (sys_ux_macroponent)

**Category:** SYSTEM
**SysID:** b77be286183232108bb255f46a373a50

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `interfaces` | Interfaces | glide_list | sys_ux_interface | - |
| `da_relay_models` | Action relay models | glide_list | sys_declarative_action_model_definition | - |
| `interactions` | Interactions | json | - | - |
| `macroponent_dependencies` | Macroponent dependencies | glide_list | sys_ux_macroponent | - |
| `extends` | Extends | reference | sys_ux_macroponent | - |
| `associated_types` | Associated types | glide_list | sys_ux_macroponent_type | - |
| `internal_event_mappings` | Internal Event Mappings | json | - | - |
| `extension_point` | Extension Point | reference | sys_ux_extension_point | - |
| `state_persistence_config` | State Persistence Config | json | - | - |
| `description` | Description | translated_text | - | - |
| `props` | Properties | json | - | - |
| `required_translations` | Required translations | json_translations | - | - |
| `data` | Data | json | - | - |
| `disable_auto_reflow` | Disable Auto Reflow | boolean | - | - |
| `root_component_definition` | Root element metadata | string | - | - |
| `root_component_config` | Root element configuration | string | - | - |
| `name` | Name | string | - | ✅ |
| `handled_events` | Handled Events | glide_list | sys_ux_event | - |
| `ext_controller_dep` | External Controller Dependencies | json | - | - |
| `style_config` | Style | json | - | - |
| `state_properties` | State | json | - | - |
| `composition` | Composition | json | - | - |
| `component_dependencies` | Component dependencies | glide_list | sys_ux_lib_component | - |
| `schema_version` | Schema version | string | - | ✅ |
| `form_factors` | Form Factors | json | - | - |
| `root_component` | Root element definition | reference | sys_ux_lib_component | - |
| `bundles` | Bundles | json | - | - |
| `dispatched_events` | Dispatched Events | glide_list | sys_ux_event | - |
| `output_prop_mapping` | Output Prop Mapping | json | - | - |
| `layout` | Layout model | json | - | - |
| `category` | Category | choice | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.929Z*