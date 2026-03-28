# ServiceNow Table: Custom Control Execution Plan (sys_cs_custom_control_execution_plan)

**Category:** SYSTEM
**SysID:** c507fa8a183e32108bb255f46a373a7a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `skippable_expression` | Skippable Expression | script_server | - | - |
| `generate_data_expression` | Generate Data Expression | script_server | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `input_response_transcript_expression` | Input Response Transcript Expression | script_server | - | - |
| `topic_node_id` | Topic Node Id | string_full_utf8 | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `secured_fdih_binding` | Secured FDIH Binding | json | - | - |
| `input_response_handler_expression` | Input Response Handler Expression | script_server | - | - |
| `topic` | Topic | reference | sys_cs_topic | ✅ |
| `custom_control` | Custom control | reference | sys_cs_custom_control | ✅ |
| `unsupported_device_message` | Unsupported Device Message | string_full_utf8 | - | - |
| `message_transcript_expression` | Message Transcript Expression | script_server | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.475Z*