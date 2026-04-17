// ─────────────────────────────────────────────
//  TOOLS — Environment Discovery (v5.0)
// ─────────────────────────────────────────────

export const envTools = [
  {
    name: "sn_list_envs",
    description: "Lista todos os ambientes ServiceNow configurados no .env (com prefixo como DEV_, PROD_, etc). Útil para descobrir quais instâncias estão disponíveis.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleEnvTool(name: string, _args: any) {
  switch (name) {
    case "sn_list_envs": {
      const envs = [];
      const envVars = Object.keys(process.env);

      // Ambiente default (sem prefixo)
      if (process.env.SN_INSTANCE) {
        envs.push({
          prefix:   "default",
          instance: process.env.SN_INSTANCE,
          user:     process.env.SN_USER || "(OAuth)",
          auth:     process.env.SN_OAUTH_ACCESS_TOKEN ? "OAuth" : "Basic",
        });
      }

      // Ambientes com prefixo (ex: DEV_SN_INSTANCE → prefix "DEV")
      const prefixes = new Set(
        envVars
          .filter(k => k.endsWith("_SN_INSTANCE"))
          .map(k => k.replace("_SN_INSTANCE", ""))
      );

      for (const prefix of prefixes) {
        const instance = process.env[`${prefix}_SN_INSTANCE`];
        const user     = process.env[`${prefix}_SN_USER`];
        const hasOAuth = !!process.env[`${prefix}_SN_OAUTH_ACCESS_TOKEN`];
        envs.push({
          prefix,
          instance,
          user:  user || "(OAuth)",
          auth:  hasOAuth ? "OAuth" : "Basic",
        });
      }

      return {
        count: envs.length,
        environments: envs,
        cwd: process.cwd(),
        tip: envs.length === 0
          ? "Nenhum ambiente configurado. Copie .env.example para .env e preencha as variáveis."
          : "Use o campo 'prefix' como argumento 'env' nas ferramentas."
      };
    }

    default: return null;
  }
}
