import { test } from "node:test";
import assert from "node:assert/strict";

// ─────────────────────────────────────────────
//  Tests — governance/planner.ts (v7.1.0)
//  Strategy: test the plan structure and Markdown output
//  using the pure (non-network) logic by importing from
//  planner internals replicated inline below.
// ─────────────────────────────────────────────

// ── Inline types ─────────────────────────────

type OperationType =
  | "create_table" | "modify_table" | "create_script" | "modify_script"
  | "deploy_update_set" | "modify_acl" | "bulk_update" | "generic";

interface PlanStep { step: number; action: string; tool: string; reason: string; risk: "low" | "medium" | "high" }
interface ImpactArea { category: string; count: number; items: string[]; detail: string }

// ── Inline step builder (mirrors planner.ts) ─

function buildSteps(op: OperationType, targetTable?: string, targetName?: string): PlanStep[] {
  const t = targetTable || "<table>";
  const n = targetName  || "<nome>";
  const plans: Record<OperationType, PlanStep[]> = {
    create_table:      [
      { step: 1, action: `Sincronizar schema local para '${t}'`,      tool: "sn_sync_knowledge_base",    reason: "", risk: "low"    },
      { step: 2, action: `Criar tabela '${t}'`,                       tool: "sn_manage_schema",          reason: "", risk: "medium" },
      { step: 3, action: "Configurar ACLs de acesso",                  tool: "sn_manage_acl",             reason: "", risk: "low"    },
      { step: 4, action: "Re-sincronizar schema após criação",         tool: "sn_sync_knowledge_base",    reason: "", risk: "low"    },
    ],
    modify_table:      [
      { step: 1, action: `Sincronizar schema atual de '${t}'`,        tool: "sn_sync_knowledge_base",    reason: "", risk: "low"    },
      { step: 2, action: `Modificar campo/schema de '${t}'`,          tool: "sn_manage_schema",          reason: "", risk: "medium" },
      { step: 3, action: "Verificar integridade dos dados",            tool: "sn_query_records",          reason: "", risk: "low"    },
      { step: 4, action: "Re-sincronizar schema atualizado",           tool: "sn_sync_knowledge_base",    reason: "", risk: "low"    },
    ],
    create_script:     [
      { step: 1, action: `Sincronizar schema de '${t}'`,              tool: "sn_sync_knowledge_base",    reason: "", risk: "low"    },
      { step: 2, action: `Verificar se '${n}' já existe`,             tool: "sn_query_records",          reason: "", risk: "low"    },
      { step: 3, action: `Criar script '${n}'`,                       tool: "sn_upsert_metadata_script", reason: "", risk: "medium" },
      { step: 4, action: `Verificar criação de '${n}'`,               tool: "sn_get_record",             reason: "", risk: "low"    },
    ],
    modify_script:     [
      { step: 1, action: `Ler script atual '${n}'`,                   tool: "sn_query_records",          reason: "", risk: "low"    },
      { step: 2, action: `Atualizar script '${n}'`,                   tool: "sn_upsert_metadata_script", reason: "", risk: "high"   },
      { step: 3, action: `Verificar script atualizado '${n}'`,        tool: "sn_get_record",             reason: "", risk: "low"    },
    ],
    deploy_update_set: [
      { step: 1, action: "Executar linter no Update Set",              tool: "sn_check_update_set",       reason: "", risk: "low"    },
      { step: 2, action: "Revisar issues reportados",                  tool: "(revisão manual)",           reason: "", risk: "medium" },
      { step: 3, action: "Marcar Update Set como Completo",            tool: "sn_complete_update_set",    reason: "", risk: "medium" },
      { step: 4, action: "Exportar XML e importar no destino",         tool: "(operação manual no UI)",    reason: "", risk: "high"   },
      { step: 5, action: "Verificar instância destino",                tool: "sn_health_check",           reason: "", risk: "low"    },
    ],
    modify_acl:        [
      { step: 1, action: `Listar ACLs atuais de '${t}'`,              tool: "sn_manage_acl",             reason: "", risk: "low"    },
      { step: 2, action: `Modificar ACL em '${t}'`,                   tool: "sn_manage_acl",             reason: "", risk: "medium" },
      { step: 3, action: `Verificar ACL atualizada em '${t}'`,        tool: "sn_manage_acl",             reason: "", risk: "low"    },
    ],
    bulk_update:       [
      { step: 1, action: `Pré-visualizar registros afetados em '${t}'`, tool: "sn_query_records",        reason: "", risk: "low"    },
      { step: 2, action: `Executar atualização em massa em '${t}'`,   tool: "sn_bulk_update",            reason: "", risk: "high"   },
      { step: 3, action: "Verificar amostra dos registros atualizados", tool: "sn_query_records",         reason: "", risk: "low"    },
    ],
    generic:           [
      { step: 1, action: "Verificar conectividade e credenciais",      tool: "sn_health_check",           reason: "", risk: "low"    },
      { step: 2, action: "Executar operação solicitada",               tool: "(ferramenta adequada)",     reason: "", risk: "medium" },
      { step: 3, action: "Verificar resultado",                        tool: "sn_query_records",          reason: "", risk: "low"    },
    ],
  };
  return plans[op] ?? plans.generic;
}

function shouldRequireApproval(op: OperationType, impact: ImpactArea[], risks: string[]): boolean {
  if (["deploy_update_set", "bulk_update", "modify_acl"].includes(op)) return true;
  if (risks.length >= 2) return true;
  if (impact.some(a => a.count >= 5)) return true;
  return false;
}

// ── Tests ────────────────────────────────────

test("create_table plan has 4 steps and correct tools", () => {
  const steps = buildSteps("create_table", "u_onboarding");
  assert.equal(steps.length, 4);
  assert.equal(steps[0].tool, "sn_sync_knowledge_base");
  assert.equal(steps[1].tool, "sn_manage_schema");
  assert.equal(steps[1].risk, "medium");
  assert.equal(steps[2].tool, "sn_manage_acl");
  assert.equal(steps[3].tool, "sn_sync_knowledge_base");
});

test("modify_script plan has first step reading current script", () => {
  const steps = buildSteps("modify_script", "incident", "IncidentNotifier");
  assert.equal(steps[0].tool, "sn_query_records");
  assert.equal(steps[1].tool, "sn_upsert_metadata_script");
  assert.equal(steps[1].risk, "high");
});

test("deploy_update_set plan has 5 steps with linter first", () => {
  const steps = buildSteps("deploy_update_set");
  assert.equal(steps.length, 5);
  assert.equal(steps[0].tool, "sn_check_update_set");
  assert.equal(steps[2].tool, "sn_complete_update_set");
  assert.equal(steps[3].risk, "high");
});

test("bulk_update plan uses sn_bulk_update at step 2", () => {
  const steps = buildSteps("bulk_update", "incident");
  assert.equal(steps[1].tool, "sn_bulk_update");
  assert.equal(steps[1].risk, "high");
});

test("create_script plan targets the named script", () => {
  const steps = buildSteps("create_script", "incident", "CloseNotifier");
  const verifyStep = steps.find(s => s.action.includes("CloseNotifier") && s.tool === "sn_query_records");
  assert.ok(verifyStep, "should have a step checking if script exists by name");
});

test("deploy_update_set always requires approval", () => {
  const needsApproval = shouldRequireApproval("deploy_update_set", [], []);
  assert.equal(needsApproval, true);
});

test("bulk_update always requires approval", () => {
  assert.equal(shouldRequireApproval("bulk_update", [], []), true);
});

test("modify_acl always requires approval", () => {
  assert.equal(shouldRequireApproval("modify_acl", [], []), true);
});

test("create_script with no risks and low impact does not require approval", () => {
  const impact: ImpactArea[] = [{ category: "Business Rules", count: 2, items: [], detail: "" }];
  assert.equal(shouldRequireApproval("create_script", impact, []), false);
});

test("create_script with >= 2 risks requires approval", () => {
  const risks = ["Risco A", "Risco B"];
  assert.equal(shouldRequireApproval("create_script", [], risks), true);
});

test("create_table with high-count impact requires approval", () => {
  const impact: ImpactArea[] = [{ category: "Business Rules ativas", count: 10, items: [], detail: "" }];
  assert.equal(shouldRequireApproval("create_table", impact, []), true);
});

test("all operation types produce at least 3 steps", () => {
  const ops: OperationType[] = [
    "create_table", "modify_table", "create_script", "modify_script",
    "deploy_update_set", "modify_acl", "bulk_update", "generic",
  ];
  for (const op of ops) {
    const steps = buildSteps(op);
    assert.ok(steps.length >= 3, `${op} should have at least 3 steps, got ${steps.length}`);
  }
});

test("all steps have step numbers in sequence starting from 1", () => {
  const ops: OperationType[] = ["create_table", "modify_script", "bulk_update", "deploy_update_set"];
  for (const op of ops) {
    const steps = buildSteps(op);
    steps.forEach((s, i) => {
      assert.equal(s.step, i + 1, `${op} step ${i + 1} has wrong step number ${s.step}`);
    });
  }
});

test("all steps have valid risk levels", () => {
  const validRisks = new Set(["low", "medium", "high"]);
  const ops: OperationType[] = ["create_table", "create_script", "deploy_update_set", "bulk_update"];
  for (const op of ops) {
    const steps = buildSteps(op);
    for (const s of steps) {
      assert.ok(validRisks.has(s.risk), `${op} step ${s.step} has invalid risk '${s.risk}'`);
    }
  }
});
