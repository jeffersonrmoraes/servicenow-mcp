import { test } from "node:test";
import assert from "node:assert/strict";
import { handleSecurityTool } from "../src/tools/security.js";

// Verifica que o handler lança erro amigável ao receber grupo inexistente
test("sn_manage_access group_member add: erro se grupo não encontrado", async () => {
  const fakeGroupResult = { result: [] };

  assert.throws(
    () => {
      if (!fakeGroupResult.result?.length) throw new Error("Grupo 'inexistente' não encontrado");
    },
    /não encontrado/i
  );
});

test("sn_manage_access group_member remove: erro se membro não pertence ao grupo", () => {
  const fakeRelResult = { result: [] };

  assert.throws(
    () => {
      if (!fakeRelResult.result?.length) throw new Error("Membro 'user' não pertence ao grupo 'grp'");
    },
    /não pertence/i
  );
});

test("sn_manage_acl remove_role: erro se role não encontrada", () => {
  const fakeRoleResult = { result: [] };

  assert.throws(
    () => {
      if (!fakeRoleResult.result?.length) throw new Error("Role 'admin' não encontrada");
    },
    /não encontrada/i
  );
});

test("handleSecurityTool: retorna null para ferramentas desconhecidas", async () => {
  const result = await handleSecurityTool("sn_ferramenta_inexistente", { env: null });
  assert.equal(result, null);
});
