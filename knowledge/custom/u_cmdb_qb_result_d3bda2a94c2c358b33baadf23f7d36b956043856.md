# ServiceNow Table: Insight - Cloud DB Instances-Query Results (u_cmdb_qb_result_d3bda2a94c2c358b33baadf23f7d36b956043856)

**Category:** CUSTOM
**SysID:** 7636be4e18fa32108bb255f46a373a83

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `u_cloud_service_account_1` | Cloud Service Account | reference | cmdb_ci_cloud_service_account | - |
| `u_coalesce_db_instance_id` | Database Instance Sys ID | string | - | - |
| `u_coalesce_db_instance_name` | Name | string | - | - |
| `count` | Result Count | auto_increment | - | - |
| `u_rel_cloud_service_account_1_logical_datacenter_1` | Cloud Service Account_Logical Datacenter | reference | cmdb_rel_ci | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `query` | Query | reference | qb_query_status | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `u_rel_logical_datacenter_1_database_instance_2` | Logical Datacenter_Database Instance 2 | reference | cmdb_rel_ci | - |
| `u_rel_virtual_machine_instance_1_server_1` | Virtual Machine Instance_Server | reference | cmdb_rel_ci | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_class_name` | Sys class name | sys_class_name | - | - |
| `u_database_instance_2` | Database Instance 2 | reference | cmdb_ci_db_instance | - |
| `u_database_instance_1` | Database Instance 1 | reference | cmdb_ci_db_instance | - |
| `u_rel_server_1_database_instance_1` | Server_Database Instance 1 | reference | cmdb_rel_ci | - |
| `u_virtual_machine_instance_1` | Virtual Machine Instance | reference | cmdb_ci_vm_instance | - |
| `u_logical_datacenter_1` | Logical Datacenter | reference | cmdb_ci_logical_datacenter | - |
| `u_rel_logical_datacenter_1_virtual_machine_instance_1` | Logical Datacenter_Virtual Machine Instance | reference | cmdb_rel_ci | - |
| `u_server_1` | Server | reference | cmdb_ci_server | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:05:38.022Z*