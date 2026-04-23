import { snGet } from "../../lib/client.js";
import { ServiceNowEnv } from "../../types.js";
import { encodeQueryParam } from "../../lib/helpers.js";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

export type OperationType =
  | "create_table"
  | "modify_table"
  | "create_script"
  | "modify_script"
  | "deploy_update_set"
  | "modify_acl"
  | "bulk_update"
  | "generic";

export interface PlanStep {
  step:   number;
  action: string;
  tool:   string;
  reason: string;
  risk:   "low" | "medium" | "high";
}

export interface ImpactArea {
  category: string;
  count:    number;
  items:    string[];
  detail:   string;
}

export interface ExecutionPlan {
  operation_type:    OperationType;
  target_table?:     string;
  target_name?:      string;
  description:       string;
  steps:             PlanStep[];
  impact:            ImpactArea[];
  risks:             string[];
  rollback_steps:    string[];
  requires_approval: boolean;
  approval_reason?:  string;
  report_markdown:   string;
}

// ─────────────────────────────────────────────
//  Main entry point
// ─────────────────────────────────────────────

export async function generateExecutionPlan(
  operationType: OperationType,
  description: string,
  env: ServiceNowEnv,
  targetTable?: string,
  targetName?: string,
  updateSetId?: string,
  previewQuery?: string,
): Promise<ExecutionPlan> {
  const impact: ImpactArea[] = [];
  const risks: string[]      = [];

  await discoverImpact(operationType, env, impact, risks, targetTable, targetName, previewQuery);

  const steps       = buildSteps(operationType, targetTable, targetName, updateSetId);
  const rollback    = buildRollback(operationType, targetTable, targetName);
  const needsApproval = shouldRequireApproval(operationType, impact, risks);
  const approvalReason = needsApproval ? getApprovalReason(operationType, impact, risks) : undefined;

  const report = buildMarkdownReport(
    operationType, description, env, targetTable, targetName,
    steps, impact, risks, rollback, needsApproval, approvalReason,
  );

  return {
    operation_type:    operationType,
    target_table:      targetTable,
    target_name:       targetName,
    description,
    steps,
    impact,
    risks,
    rollback_steps:    rollback,
    requires_approval: needsApproval,
    approval_reason:   approvalReason,
    report_markdown:   report,
  };
}

// ─────────────────────────────────────────────
//  Discovery — query ServiceNow for real context
// ─────────────────────────────────────────────

async function discoverImpact(
  op: OperationType,
  env: ServiceNowEnv,
  impact: ImpactArea[],
  risks: string[],
  targetTable?: string,
  targetName?: string,
  previewQuery?: string,
): Promise<void> {
  const queries: Promise<void>[] = [];

  if (targetTable) {
    queries.push(discoverTableContext(targetTable, op, env, impact, risks));
  }

  if (targetName && (op === "create_script" || op === "modify_script")) {
    queries.push(discoverScriptContext(targetName, op, env, impact, risks));
  }

  if (op === "bulk_update" && targetTable && previewQuery) {
    queries.push(discoverBulkImpact(targetTable, previewQuery, env, impact, risks));
  }

  await Promise.allSettled(queries);
}

async function discoverTableContext(
  table: string,
  op: OperationType,
  env: ServiceNowEnv,
  impact: ImpactArea[],
  risks: string[],
): Promise<void> {
  try {
    // Table existence
    const { result: tableInfo } = await snGet("/api/now/table/sys_db_object", {
      sysparm_query:  `name=${encodeQueryParam(table)}`,
      sysparm_fields: "name,label,super_class",
      sysparm_limit:  1,
    }, env);

    const tableExists = Array.isArray(tableInfo) && tableInfo.length > 0;

    if (op === "create_table" && tableExists) {
      risks.push(`Tabela '${table}' já existe na instância — a operação de criação pode retornar erro ou sobrescrever configurações existentes.`);
    }
    if (op !== "create_table" && !tableExists) {
      risks.push(`Tabela '${table}' não encontrada na instância — verifique o nome antes de prosseguir.`);
      return;
    }

    // Business Rules
    const { result: brs } = await snGet("/api/now/table/sys_script", {
      sysparm_query:  `collection=${encodeQueryParam(table)}^active=true`,
      sysparm_fields: "name,when",
      sysparm_limit:  25,
    }, env);

    if (Array.isArray(brs) && brs.length > 0) {
      impact.push({
        category: "Business Rules ativas",
        count:    brs.length,
        items:    brs.slice(0, 5).map((r: any) => r.name),
        detail:   `${brs.length} Business Rule(s) ativas detectadas — verifique conflitos com a mudança proposta.`,
      });
      if (brs.length >= 8) risks.push(`Alta concentração de Business Rules na tabela '${table}' (${brs.length}) — risco elevado de efeitos colaterais.`);
    }

    // Client Scripts
    const { result: css } = await snGet("/api/now/table/sys_script_client", {
      sysparm_query:  `table=${encodeQueryParam(table)}^active=true`,
      sysparm_fields: "name,type",
      sysparm_limit:  20,
    }, env);

    if (Array.isArray(css) && css.length > 0) {
      impact.push({
        category: "Client Scripts ativos",
        count:    css.length,
        items:    css.slice(0, 5).map((r: any) => r.name),
        detail:   `${css.length} Client Script(s) ativos na tabela — campos renomeados ou removidos podem quebrar o frontend.`,
      });
    }

    // ACLs
    const { result: acls } = await snGet("/api/now/table/sys_security_acl", {
      sysparm_query:  `nameLIKE${encodeQueryParam(table)}`,
      sysparm_fields: "name,operation,type",
      sysparm_limit:  20,
    }, env);

    if (Array.isArray(acls) && acls.length > 0) {
      impact.push({
        category: "ACLs configuradas",
        count:    acls.length,
        items:    acls.slice(0, 5).map((r: any) => `${r.name} (${r.operation})`),
        detail:   `${acls.length} ACL(s) configurada(s) — alterações de schema podem impactar controles de acesso.`,
      });
      if (op === "modify_acl") risks.push("Modificação de ACLs pode remover acesso a usuários existentes imediatamente.");
    }
  } catch {
    // Non-blocking — continue without this context
  }
}

async function discoverScriptContext(
  scriptName: string,
  op: OperationType,
  env: ServiceNowEnv,
  impact: ImpactArea[],
  risks: string[],
): Promise<void> {
  try {
    // Check all script-bearing tables for existing script with this name
    const tables = [
      { t: "sys_script_include", label: "Script Include" },
      { t: "sys_script",         label: "Business Rule"  },
    ];

    for (const { t, label } of tables) {
      const { result } = await snGet(`/api/now/table/${t}`, {
        sysparm_query:  `name=${encodeQueryParam(scriptName)}`,
        sysparm_fields: "name,active,sys_id",
        sysparm_limit:  1,
      }, env);

      if (Array.isArray(result) && result.length > 0) {
        const existing = result[0];
        if (op === "create_script") {
          risks.push(`${label} '${scriptName}' já existe (sys_id: ${existing.sys_id}, ativo: ${existing.active}) — a criação substituirá o registro existente.`);
        }
        impact.push({
          category: `${label} existente`,
          count:    1,
          items:    [scriptName],
          detail:   `Registro encontrado em ${t} — será ${op === "create_script" ? "sobrescrito" : "atualizado"}.`,
        });
      }
    }
  } catch {
    // Non-blocking
  }
}

async function discoverBulkImpact(
  table: string,
  query: string,
  env: ServiceNowEnv,
  impact: ImpactArea[],
  risks: string[],
): Promise<void> {
  try {
    const { result } = await snGet(`/api/now/table/${encodeQueryParam(table)}`, {
      sysparm_query:  query,
      sysparm_fields: "sys_id",
      sysparm_limit:  1000,
    }, env);

    const count = Array.isArray(result) ? result.length : 0;
    impact.push({
      category: "Registros afetados (amostra)",
      count,
      items:    [],
      detail:   `Consulta retornou ${count >= 1000 ? "≥1000" : count} registro(s) — todos serão atualizados sem possibilidade de rollback automático.`,
    });
    if (count >= 500) risks.push(`Bulk update em ${count >= 1000 ? "≥1000" : count} registros — operação irreversível de grande escopo.`);
    if (count === 0)  risks.push("A query não retornou nenhum registro — verifique o filtro antes de executar.");
  } catch {
    // Non-blocking
  }
}

// ─────────────────────────────────────────────
//  Step builder
// ─────────────────────────────────────────────

function buildSteps(
  op: OperationType,
  targetTable?: string,
  targetName?: string,
  updateSetId?: string,
): PlanStep[] {
  const t = targetTable || "<table>";
  const n = targetName  || "<nome>";

  const plans: Record<OperationType, PlanStep[]> = {
    create_table: [
      { step: 1, action: `Sincronizar schema local para '${t}'`,          tool: "sn_sync_knowledge_base",   reason: "Garantir contexto atualizado antes da criação",            risk: "low"    },
      { step: 2, action: `Criar tabela '${t}' com campos iniciais`,       tool: "sn_manage_schema",         reason: "Criação da tabela e campos obrigatórios",                  risk: "medium" },
      { step: 3, action: "Configurar ACLs de acesso",                      tool: "sn_manage_acl",            reason: "Garantir controle de acesso desde o início",               risk: "low"    },
      { step: 4, action: "Re-sincronizar schema após criação",             tool: "sn_sync_knowledge_base",   reason: "Atualizar conhecimento local com a nova tabela",            risk: "low"    },
      ...(updateSetId ? [{ step: 5, action: "Validar Update Set",          tool: "sn_check_update_set",      reason: "Garantir qualidade antes de promover",                      risk: "low" } as PlanStep] : []),
    ],

    modify_table: [
      { step: 1, action: `Sincronizar schema atual de '${t}'`,            tool: "sn_sync_knowledge_base",   reason: "Confirmar estrutura atual antes de modificar",             risk: "low"    },
      { step: 2, action: `Modificar campo/schema de '${t}'`,              tool: "sn_manage_schema",         reason: "Aplicar alteração estrutural na tabela",                   risk: "medium" },
      { step: 3, action: `Verificar integridade dos dados em '${t}'`,     tool: "sn_query_records",         reason: "Confirmar que dados existentes não foram corrompidos",      risk: "low"    },
      { step: 4, action: "Re-sincronizar schema atualizado",               tool: "sn_sync_knowledge_base",   reason: "Atualizar conhecimento local com a mudança",                risk: "low"    },
    ],

    create_script: [
      { step: 1, action: `Sincronizar schema de '${t}' (contexto)`,       tool: "sn_sync_knowledge_base",   reason: "Confirmar campos disponíveis antes de escrever o script",  risk: "low"    },
      { step: 2, action: `Verificar se '${n}' já existe`,                 tool: "sn_query_records",         reason: "Detectar conflito antes de criar",                         risk: "low"    },
      { step: 3, action: `Criar script '${n}'`,                           tool: "sn_upsert_metadata_script", reason: "Criar o artefato de desenvolvimento",                     risk: "medium" },
      { step: 4, action: `Verificar criação de '${n}'`,                   tool: "sn_get_record",            reason: "Confirmar que o script foi criado corretamente",           risk: "low"    },
    ],

    modify_script: [
      { step: 1, action: `Ler script atual '${n}' (backup lógico)`,       tool: "sn_query_records",         reason: "Registrar estado anterior para rollback manual",           risk: "low"    },
      { step: 2, action: `Atualizar script '${n}'`,                       tool: "sn_upsert_metadata_script", reason: "Aplicar as modificações no script",                       risk: "high"   },
      { step: 3, action: `Verificar script atualizado '${n}'`,            tool: "sn_get_record",            reason: "Confirmar que a modificação foi aplicada corretamente",    risk: "low"    },
      ...(updateSetId ? [{ step: 4, action: "Executar linter no Update Set", tool: "sn_check_update_set",   reason: "Garantir qualidade após a modificação",                    risk: "low" } as PlanStep] : []),
    ],

    deploy_update_set: [
      { step: 1, action: "Executar linter no Update Set (15 checks)",      tool: "sn_check_update_set",      reason: "Detectar problemas antes de promover",                     risk: "low"    },
      { step: 2, action: "Revisar issues reportados pelo linter",          tool: "(revisão manual)",          reason: "Corrigir qualquer erro antes de fechar",                   risk: "medium" },
      { step: 3, action: "Marcar Update Set como Completo",                tool: "sn_complete_update_set",   reason: "Fechar o Update Set para exportação",                      risk: "medium" },
      { step: 4, action: "Exportar XML e importar no ambiente destino",    tool: "(operação manual no UI)",   reason: "ServiceNow não permite deploy via REST diretamente",       risk: "high"   },
      { step: 5, action: "Verificar instância destino pós-deploy",         tool: "sn_health_check",          reason: "Confirmar estabilidade após a promoção",                   risk: "low"    },
    ],

    modify_acl: [
      { step: 1, action: `Listar ACLs atuais de '${t}' (backup)`,        tool: "sn_manage_acl",            reason: "Registrar configuração atual antes de alterar",            risk: "low"    },
      { step: 2, action: `Modificar ACL em '${t}'`,                       tool: "sn_manage_acl",            reason: "Aplicar nova configuração de acesso",                      risk: "medium" },
      { step: 3, action: `Verificar ACL atualizada em '${t}'`,            tool: "sn_manage_acl",            reason: "Confirmar que o acesso está conforme esperado",            risk: "low"    },
    ],

    bulk_update: [
      { step: 1, action: `Pré-visualizar registros afetados em '${t}'`,   tool: "sn_query_records",         reason: "Confirmar escopo antes de executar — sem rollback automático", risk: "low"  },
      { step: 2, action: `Executar atualização em massa em '${t}'`,       tool: "sn_bulk_update",           reason: "Aplicar alteração em todos os registros do filtro",        risk: "high"   },
      { step: 3, action: `Verificar amostra dos registros atualizados`,   tool: "sn_query_records",         reason: "Confirmar que os dados foram atualizados corretamente",    risk: "low"    },
    ],

    generic: [
      { step: 1, action: "Verificar conectividade e credenciais",          tool: "sn_health_check",          reason: "Confirmar que a instância está acessível",                 risk: "low"    },
      { step: 2, action: "Executar operação solicitada",                   tool: "(ferramenta adequada)",    reason: "Aplicar a mudança conforme descrita",                      risk: "medium" },
      { step: 3, action: "Verificar resultado",                            tool: "sn_query_records",         reason: "Confirmar que a operação foi bem-sucedida",                risk: "low"    },
    ],
  };

  return plans[op] ?? plans.generic;
}

// ─────────────────────────────────────────────
//  Rollback builder
// ─────────────────────────────────────────────

function buildRollback(op: OperationType, targetTable?: string, targetName?: string): string[] {
  const t = targetTable || "<table>";
  const n = targetName  || "<nome>";

  const rollbacks: Record<OperationType, string[]> = {
    create_table:      [
      `Desativar tabela '${t}' via sn_update_record (active=false) se suportado.`,
      `Remoção completa exige acesso direto ao Studio ou menu de Tabelas no UI — não há ferramenta REST para DELETE de tabelas.`,
    ],
    modify_table:      [
      `Reverter campo via sn_manage_schema com as especificações originais.`,
      `Para remoção de campo criado: acesse sys_dictionary via sn_query_records e delete via UI.`,
    ],
    create_script:     [
      `Desativar o script via sn_update_record (active=false, table=<tipo_script>, sys_id=<id_criado>).`,
    ],
    modify_script:     [
      `Restaurar versão anterior: copie o script salvo no Passo 1 e aplique via sn_upsert_metadata_script.`,
      `Se o script estava em Update Set, reverta o Update Set para In Progress e remova a entrada.`,
    ],
    deploy_update_set: [
      `Não realizar o merge/commit do Update Set no ambiente destino.`,
      `Se já importado, identificar as entradas individualmente e reverter via Studio ou revert no Update Set.`,
    ],
    modify_acl:        [
      `Restaurar configuração anterior via sn_manage_acl com os valores registrados no Passo 1.`,
    ],
    bulk_update:       [
      `Não há rollback automático para bulk_update. ANTES de executar, exporte os dados com sn_export_records.`,
      `Se necessário reverter: re-importe os dados exportados campo a campo via sn_bulk_update com os valores originais.`,
    ],
    generic:           [
      `Registre o estado anterior da entidade antes de executar qualquer operação mutante.`,
      `Utilize sn_export_records ou sn_get_record para backup lógico antes do Passo 2.`,
    ],
  };

  return rollbacks[op] ?? rollbacks.generic;
}

// ─────────────────────────────────────────────
//  Approval logic
// ─────────────────────────────────────────────

function shouldRequireApproval(op: OperationType, impact: ImpactArea[], risks: string[]): boolean {
  if (["deploy_update_set", "bulk_update", "modify_acl"].includes(op)) return true;
  if (risks.length >= 2) return true;
  const hasHighImpact = impact.some(a => a.count >= 5);
  if (hasHighImpact) return true;
  return false;
}

function getApprovalReason(op: OperationType, impact: ImpactArea[], risks: string[]): string {
  const reasons: string[] = [];

  if (op === "deploy_update_set") reasons.push("deploy para ambiente compartilhado é irreversível sem rollback manual");
  if (op === "bulk_update")       reasons.push("atualização em massa não tem desfazer automático");
  if (op === "modify_acl")        reasons.push("mudança de ACL afeta acesso imediato de usuários");
  if (risks.length >= 2)          reasons.push(`${risks.length} riscos identificados na análise`);

  const highImpact = impact.filter(a => a.count >= 5);
  if (highImpact.length)          reasons.push(`impacto em ${highImpact.map(a => a.category.toLowerCase()).join(", ")}`);

  return reasons.join("; ") || "operação com potencial de impacto significativo";
}

// ─────────────────────────────────────────────
//  Markdown report
// ─────────────────────────────────────────────

const RISK_EMOJI: Record<string, string> = { low: "🟢", medium: "🟡", high: "🔴" };
const OP_LABELS: Record<OperationType, string> = {
  create_table:      "Criação de Tabela",
  modify_table:      "Modificação de Schema",
  create_script:     "Criação de Script",
  modify_script:     "Modificação de Script",
  deploy_update_set: "Deploy de Update Set",
  modify_acl:        "Modificação de ACL",
  bulk_update:       "Atualização em Massa",
  generic:           "Operação Genérica",
};

function buildMarkdownReport(
  op: OperationType,
  description: string,
  env: ServiceNowEnv,
  targetTable: string | undefined,
  targetName: string | undefined,
  steps: PlanStep[],
  impact: ImpactArea[],
  risks: string[],
  rollback: string[],
  needsApproval: boolean,
  approvalReason: string | undefined,
): string {
  const envLabel = env ? String(env).toUpperCase() : "default";
  const target   = [targetTable, targetName].filter(Boolean).join(" / ") || "—";

  const lines: string[] = [
    `# Plano de Execução — ${OP_LABELS[op]}`,
    "",
    `**Ambiente:** ${envLabel} | **Alvo:** \`${target}\` | **Aprovação:** ${needsApproval ? "⚠️ Necessária" : "✅ Não obrigatória"}`,
    "",
    "## Descrição",
    description,
    "",
    "## Passos de Execução",
    "",
    "| # | Ação | Ferramenta | Risco |",
    "|---|------|------------|-------|",
    ...steps.map(s =>
      `| ${s.step} | ${s.action} | \`${s.tool}\` | ${RISK_EMOJI[s.risk]} ${s.risk === "low" ? "Baixo" : s.risk === "medium" ? "Médio" : "Alto"} |`
    ),
    "",
  ];

  if (impact.length > 0) {
    lines.push("## Análise de Impacto", "");
    for (const area of impact) {
      lines.push(`### ${area.category} (${area.count})`);
      if (area.items.length > 0) lines.push(...area.items.map(i => `- ${i}`));
      lines.push("", `> ${area.detail}`, "");
    }
  } else {
    lines.push("## Análise de Impacto", "", "> Nenhum impacto direto detectado na instância.", "");
  }

  if (risks.length > 0) {
    lines.push("## Riscos Identificados", "");
    risks.forEach((r, i) => lines.push(`${i + 1}. ⚠️ ${r}`));
    lines.push("");
  }

  lines.push("## Plano de Rollback", "");
  rollback.forEach((r, i) => lines.push(`${i + 1}. ${r}`));
  lines.push("");

  if (needsApproval) {
    lines.push(
      "---",
      "",
      `> **⚠️ APROVAÇÃO NECESSÁRIA** — ${approvalReason}.`,
      ">",
      "> Confirme explicitamente com **\"aprovado\"** ou **\"pode executar\"** para prosseguir.",
      "> Caso contrário, nenhuma operação mutante será realizada.",
    );
  } else {
    lines.push(
      "---",
      "",
      "> ✅ Nenhuma aprovação explícita obrigatória para este plano.",
      "> Prosseguindo com os passos acima após confirmação de contexto.",
    );
  }

  return lines.join("\n");
}
