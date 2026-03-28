# ServiceNow Table: Performance Statistic (sys_atf_performance_stat)

**Category:** SYSTEM
**SysID:** 4f80b20a18b632108bb255f46a373a0a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `percent_change_mean` | Percent Change (Mean) | float | - | - |
| `outlier_1` | First Run Outlier Removed | boolean | - | - |
| `comparison` | Comparison | reference | sys_atf_performance_compare | - |
| `classification` | Classification | choice | - | - |
| `min_2` | Second Run Min | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `engine` | Engine | boolean | - | - |
| `min_1` | First Run Min | integer | - | - |
| `count_2` | Second Run Count | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `second_run_time` | Second Run Total Time | integer | - | - |
| `count_1` | First Run Count | integer | - | - |
| `outlier_2` | Second Run Outlier Removed | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `first_run_time` | First Run Total Time | integer | - | - |
| `max_1` | First Run Max | integer | - | - |
| `stddev_2` | Second Run Standard Deviation | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `change_mean` | Change (Mean) | integer | - | - |
| `stddev_1` | First Run Standard Deviation | integer | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `label` | Activity | string | - | - |
| `parameters` | Parameters | string | - | - |
| `mean_2` | Second Run Mean | integer | - | - |
| `step` | Step | reference | sys_atf_step | - |
| `mean_1` | First Run Mean | integer | - | - |
| `max_2` | Second Run Max | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.603Z*