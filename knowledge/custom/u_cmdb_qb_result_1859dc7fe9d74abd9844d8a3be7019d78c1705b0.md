# ServiceNow Table: Insight - Cloud Applications-Query Results (u_cmdb_qb_result_1859dc7fe9d74abd9844d8a3be7019d78c1705b0)

**Category:** CUSTOM
**SysID:** a536fa4e18fa32108bb255f46a373ae0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `u_cloud_service_account_1` | Cloud Service Account | reference | cmdb_ci_cloud_service_account | - |
| `sys_id` | Sys ID | GUID | - | - |
| `u_rel_server_1_application_1` | Server_Application 1 | reference | cmdb_rel_ci | - |
| `u_rel_virtual_machine_instance_1_server_1` | Virtual Machine Instance_Server | reference | cmdb_rel_ci | - |
| `u_rel_cloud_service_account_1_logical_datacenter_1` | Cloud Service Account_Logical Datacenter | reference | cmdb_rel_ci | - |
| `u_rel_logical_datacenter_1_virtual_machine_instance_1` | Logical Datacenter_Virtual Machine Instance | reference | cmdb_rel_ci | - |
| `u_application_1` | Application 1 | reference | cmdb_ci_appl | - |
| `u_application_2` | Application 2 | reference | cmdb_ci_appl | - |
| `u_coalesce_app_id` | Application Sys ID | string | - | - |
| `u_coalesce_app_name` | Name | string | - | - |
| `u_rel_logical_datacenter_1_application_2` | Logical Datacenter_Application 2 | reference | cmdb_rel_ci | - |
| `u_virtual_machine_instance_1` | Virtual Machine Instance | reference | cmdb_ci_vm_instance | - |
| `u_server_1` | Server | reference | cmdb_ci_server | - |
| `u_logical_datacenter_1` | Logical Datacenter | reference | cmdb_ci_logical_datacenter | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `query` | Query | reference | qb_query_status | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_class_name` | Sys class name | sys_class_name | - | - |
| `count` | Result Count | auto_increment | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:32.218Z*