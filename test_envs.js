import 'dotenv/config';
import { handleEnvTool } from './src/tools/envs.js';

async function test() {
  const result = await handleEnvTool('sn_list_envs', {});
  console.log(JSON.stringify(result, null, 2));
}

test();
