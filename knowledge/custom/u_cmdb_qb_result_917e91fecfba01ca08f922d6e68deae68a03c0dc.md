# ServiceNow Table: Insight - Cloud VM Instances-Query Results (u_cmdb_qb_result_917e91fecfba01ca08f922d6e68deae68a03c0dc)

**Category:** CUSTOM
**SysID:** 96367e4e18fa32108bb255f46a373aa8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `u_logical_datacenter_1` | Logical Datacenter | reference | cmdb_ci_logical_datacenter | - |
| `count` | Result Count | auto_increment | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `query` | Query | reference | qb_query_status | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_class_name` | Sys class name | sys_class_name | - | - |
| `u_cloud_service_account_1` | Cloud Service Account | reference | cmdb_ci_cloud_service_account | - |
| `u_rel_cloud_service_account_1_logical_datacenter_1` | Cloud Service Account_Logical Datacenter | reference | cmdb_rel_ci | - |
| `u_rel_logical_datacenter_1_virtual_machine_instance_1` | Logical Datacenter_Virtual Machine Instance | reference | cmdb_rel_ci | - |
| `u_virtual_machine_instance_1` | Virtual Machine Instance | reference | cmdb_ci_vm_instance | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:05:37.453Z*