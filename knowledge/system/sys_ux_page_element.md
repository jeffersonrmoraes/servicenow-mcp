# ServiceNow Table: UX Page Element (sys_ux_page_element)

**Category:** SYSTEM
**SysID:** 367b6e46183232108bb255f46a373ae2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `order` | Order | integer | - | - |
| `macroponent_config` | Macroponent Config | string | - | - |
| `tree_root` | Tree root | reference | sys_ux_page_element | - |
| `parent` | Parent element | reference | sys_ux_page_element | - |
| `picker_condition` | Picker Condition | glide_var | sys_ux_lib_picker_slot_var | - |
| `layout` | Layout | reference | sys_ux_children_layout | - |
| `macroponent` | Macroponent | reference | sys_ux_macroponent | - |
| `sys_id` | Sys ID | GUID | - | - |
| `component` | Component | reference | sys_ux_lib_component | - |
| `page` | Page | reference | sys_ux_page | - |
| `picker` | Picker | reference | sys_ux_content_picker | - |
| `parent_slot` | Slot | reference | sys_ux_children_slot | - |
| `children` | Available Child Slots | reference | sys_ux_children | - |
| `is_root` | Is a root element | boolean | - | - |
| `attrs` | Attributes | glide_var | sys_ux_lib_component_attr | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:40.671Z*