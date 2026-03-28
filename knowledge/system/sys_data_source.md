# ServiceNow Table: Data Source (sys_data_source)

**Category:** SYSTEM
**SysID:** d89beec6183232108bb255f46a373a6e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `import_set_table_name` | Import set table name | string | - | ✅ |
| `data_in_single_column` | Data in single column | boolean | - | - |
| `ssh_keyfile_path` | Ssh keyfile path | string | - | - |
| `last_run_datetime` | Last run datetime | string | - | - |
| `xpath_root_node` | XPath for each row | string | - | - |
| `scp_user_name` | Username | string | - | - |
| `database_port` | Database port | string | - | - |
| `data_loader` | Data Loader | script | - | - |
| `file_path` | File path | string | - | - |
| `jdbc_password` | Password | password2 | - | - |
| `connection_url` | Connection URL | string | - | - |
| `table_name` | Table name | string | - | - |
| `enable_parallel_loading` | Enable parallel loading | boolean | - | - |
| `offset` | Offset | integer | - | - |
| `query_timeout` | Query timeout | integer | - | - |
| `import_set_table_label` | Import set table label | string | - | - |
| `category` | Category | string | - | - |
| `mid_server` | Use MID Server | reference | ecc_agent | - |
| `sheet_name` | Sheet name | integer | - | - |
| `properties` | Properties | string | - | - |
| `expand_node_children` | Expand node children | boolean | - | - |
| `scp_port` | Port | string | - | - |
| `use_last_run_datetime` | Use last run datetime | boolean | - | - |
| `csv_delimiter` | CSV delimiter | string | - | - |
| `scp_authentication` | Scp authentication | string | - | - |
| `database_name` | Database name | string | - | - |
| `type` | Type | string | - | ✅ |
| `connection_url_parameters` | Connection URL properties | string | - | - |
| `jdbc_user_name` | Username | string | - | - |
| `last_run_database_field` | Last run database field | string | - | - |
| `batch_size` | Batch Size | integer | - | - |
| `limit` | Limit | integer | - | - |
| `maximum_rows` | Maximum rows | integer | - | - |
| `use_integrated_authentication` | Use integrated authentication | boolean | - | - |
| `header_row` | Header row | integer | - | - |
| `query` | Query | radio | - | - |
| `discard_arrays` | Discard Arrays | boolean | - | - |
| `scp_server` | Server | string | - | - |
| `oracle_port` | Oracle port | string | - | - |
| `format` | Format | string | - | - |
| `file_retrieval_method` | File retrieval method | string | - | - |
| `instance_name` | Instance name | string | - | - |
| `support_pagination` | Support pagination | boolean | - | - |
| `connection_override_last_success_time` | Connection override last success time | simple_name_values | - | - |
| `use_batch_import` | Use Batch Import | boolean | - | - |
| `parsing_script` | Parsing script | script | - | - |
| `zipped` | Zipped | boolean | - | - |
| `jdbc_server` | Server | string | - | - |
| `connection_timeout` | Connection timeout | integer | - | - |
| `sql_statement` | SQL statement | string | - | - |
| `name` | Name | string | - | ✅ |
| `sheet_number` | Sheet number | integer | - | - |
| `glide_keystore` | System keystore | boolean | - | - |
| `last_success_import_time` | Last success import time | glide_date_time | - | - |
| `jpath_root_node` | Path for each row | string | - | ✅ |
| `scp_password` | Password | password2 | - | - |
| `oracle_sid` | Oracle sid | string | - | - |
| `ldapprobe_result_set_rows` | LDAPProbe result set rows | integer | - | - |
| `request_action` | Request action | reference | sys_hub_action_type_definition | - |
| `sys_id` | Sys ID | GUID | - | - |
| `parallel_loading_script` | Parallel loading script | script | - | - |
| `ldap_target` | LDAP target | reference | ldap_ou_config | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:19.581Z*