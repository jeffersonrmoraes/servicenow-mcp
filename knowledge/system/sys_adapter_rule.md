# ServiceNow Table: Adapter Rule (sys_adapter_rule)

**Category:** SYSTEM
**SysID:** e68b6e86183232108bb255f46a373a7d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `type` | Type | choice | - | ✅ |
| `transformer_rule` | Record Transformer Rule | reference | sys_record_transformer_rule | - |
| `sys_id` | Sys ID | GUID | - | - |
| `replace` | Output Pattern | string | - | - |
| `description` | Description | string | - | - |
| `order` | Order | integer | - | - |
| `name` | Name | string | - | ✅ |
| `out_of_band_transformer_rule` | Out-Of-Band Record Transformer Rule | reference | sys_record_transformer_out_of_band_rule | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:16.987Z*