/* =============================================================
   MCP Dashboard v2.0 — Vanilla ES6 SPA
   Sections: TabManager | EnvironmentsTab | ToolsTab |
             ActivityTab | StatsTab | GovernanceTab | Modal
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ─────────────────────────────────────────────
  //  Shared State
  // ─────────────────────────────────────────────
  let currentConfig = {};
  let isMasked      = true;
  const MASK        = "••••••••";

  // Session-level activity counters (for Stats tab)
  let sessionCount  = 0;
  let sessionErrors = 0;
  let sessionTotalMs = 0;

  // ─────────────────────────────────────────────
  //  Tab Manager
  // ─────────────────────────────────────────────
  const tabBtns     = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const tabInited   = new Set();

  function switchTab(name) {
    tabBtns.forEach(b => b.classList.toggle("active", b.dataset.tab === name));
    tabContents.forEach(c => c.classList.toggle("active", c.id === `tab-${name}`));
    if (!tabInited.has(name)) {
      tabInited.add(name);
      switch (name) {
        case "environments": EnvironmentsTab.init(); break;
        case "tools":        ToolsTab.init();        break;
        case "activity":     ActivityTab.init();     break;
        case "stats":        StatsTab.init();        break;
        case "governance":   GovernanceTab.init();   break;
      }
    }
  }

  tabBtns.forEach(b => b.addEventListener("click", () => switchTab(b.dataset.tab)));

  // ─────────────────────────────────────────────
  //  Helpers
  // ─────────────────────────────────────────────
  async function apiFetch(url, opts = {}) {
    const r = await fetch(url, opts);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  function formatMs(ms) {
    return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
  }

  function timeAgo(isoStr) {
    const s = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000);
    if (s < 60)   return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    return `${Math.floor(s/3600)}h ago`;
  }

  function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    })[c]);
  }

  // ─────────────────────────────────────────────
  //  Environments Tab
  // ─────────────────────────────────────────────
  const EnvironmentsTab = {
    _healthCache: {},

    async init() {
      await this.loadConfig();
    },

    async loadConfig() {
      currentConfig = await apiFetch("/api/env");
      this.renderLayout();
    },

    renderLayout() {
      const instances = [];
      let editorText  = "";

      Object.entries(currentConfig).forEach(([key, value]) => {
        const displayValue = (isMasked && (key.includes("PASSWORD") || key.includes("SECRET") || key.includes("TOKEN")))
          ? MASK : value;
        editorText += `${key}=${displayValue}\n`;

        if (key.endsWith("SN_INSTANCE")) {
          const prefix = key.replace("SN_INSTANCE", "").replace(/_$/, "") || "Main";
          const p      = prefix === "Main" ? "" : prefix + "_";
          instances.push({
            prefix,
            instance: value,
            isOAuth: !!(currentConfig[`${p}SN_OAUTH_ACCESS_TOKEN`]),
            user: currentConfig[`${p}SN_USER`] || "OAuth",
          });
        }
      });

      document.getElementById("env-editor").value = editorText.trim();
      this.renderInstances(instances);
    },

    renderInstances(instances) {
      const el = document.getElementById("instance-list");
      if (!instances.length) {
        el.innerHTML = '<p class="dim">Nenhuma instância configurada.</p>';
        return;
      }
      el.innerHTML = instances.map(inst => `
        <div class="instance-card" id="card-${inst.prefix}">
          <div class="instance-info">
            <div class="name">${inst.prefix} Instance</div>
            <div class="details mono">${inst.instance.startsWith("http") ? inst.instance : "https://" + inst.instance + (inst.instance.includes(".service-now.com") ? "" : ".service-now.com")}</div>
            <div class="details">User: ${inst.isOAuth ? "🔐 OAuth 2.0" : inst.user}</div>
          </div>
          <div class="instance-badges">
            <span class="health-badge checking" id="badge-${inst.prefix}">◌ CHECKING</span>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn-tech small" onclick="EnvironmentsTab.healthCheck('${inst.prefix}', true)">↻</button>
            <div class="settings-icon-btn" onclick="Modal.edit('${inst.prefix}')" title="Configurar">⚙</div>
          </div>
        </div>
      `).join("");

      // Auto health-check all instances in parallel (lazy — only when tab opens)
      instances.forEach(i => this.healthCheck(i.prefix));
    },

    async healthCheck(prefix, force = false) {
      if (this._healthCache[prefix] && !force) return;
      const badge = document.getElementById(`badge-${prefix}`);
      if (badge) { badge.className = "health-badge checking"; badge.textContent = "◌ CHECKING"; }

      try {
        const data = await apiFetch(`/api/health/${prefix === "Main" ? "DEFAULT" : prefix}`);
        this._healthCache[prefix] = data;

        if (!badge) return;
        if (data.status === "connected") {
          badge.className = "health-badge ok";
          badge.innerHTML = `✓ ${(data.version || "").toUpperCase()} &bull; ${data.latency}ms`;
        } else if (data.status === "unconfigured" || data.status === "no_auth") {
          badge.className = "health-badge warn";
          badge.textContent = "⚠ SEM AUTH";
        } else {
          badge.className = "health-badge error";
          badge.textContent = `✗ ${data.http || "ERR"}`;
        }
      } catch {
        if (badge) { badge.className = "health-badge error"; badge.textContent = "✗ OFFLINE"; }
      }
    },

    async pushConfig(data) {
      await fetch("/api/env", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      await this.loadConfig();
    },
  };
  window.EnvironmentsTab = EnvironmentsTab;

  // Toggle password visibility
  document.getElementById("toggle-visibility").addEventListener("click", function() {
    isMasked = !isMasked;
    this.textContent = isMasked ? "[👁 REVELAR SENHAS]" : "[🔒 OCULTAR SENHAS]";
    EnvironmentsTab.renderLayout();
  });

  // Save .env
  const saveBtn = document.getElementById("save-env-btn");
  saveBtn.addEventListener("click", async () => {
    const text    = document.getElementById("env-editor").value;
    const newData = { ...currentConfig };
    text.split("\n").forEach(line => {
      const idx = line.indexOf("=");
      if (idx === -1) return;
      const k = line.substring(0, idx).trim();
      const v = line.substring(idx + 1).trim();
      if (k && v && v !== MASK) newData[k] = v;
    });
    saveBtn.textContent = "SALVANDO...";
    await EnvironmentsTab.pushConfig(newData);
    saveBtn.textContent = "✓ SALVO!";
    setTimeout(() => { saveBtn.textContent = "SINCRONIZAR"; }, 2000);
  });

  document.getElementById("add-env-btn").addEventListener("click", () => Modal.open());

  // ─────────────────────────────────────────────
  //  Tools Tab
  // ─────────────────────────────────────────────
  const ToolsTab = {
    _tools: [],
    _activeModule: null,

    async init() {
      const data = await apiFetch("/api/tools");
      this._tools = data.tools;
      document.getElementById("tab-badge-tools").textContent = data.count;
      this.renderFilters();
      this.render();
    },

    renderFilters() {
      const modules = [...new Set(this._tools.map(t => t.module))].sort();
      const container = document.getElementById("module-filters");
      container.innerHTML = modules.map(m => `
        <button class="module-chip" data-module="${m}">${m}</button>
      `).join("");
      container.querySelectorAll(".module-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          const m = btn.dataset.module;
          this._activeModule = this._activeModule === m ? null : m;
          container.querySelectorAll(".module-chip").forEach(b => b.classList.toggle("active", b.dataset.module === this._activeModule));
          this.render();
        });
      });
    },

    render() {
      const q      = (document.getElementById("tools-search").value || "").toLowerCase();
      const module = this._activeModule;
      const filtered = this._tools.filter(t => {
        const matchQ = !q || t.name.includes(q) || t.description.toLowerCase().includes(q);
        const matchM = !module || t.module === module;
        return matchQ && matchM;
      });

      document.getElementById("tools-count").textContent =
        `${filtered.length} de ${this._tools.length} ferramentas`;

      document.getElementById("tools-grid").innerHTML = filtered.map(t => `
        <div class="tool-card" onclick="ToolsTab.openDrawer('${escapeHtml(t.name)}')">
          <div class="tool-module">${t.module}</div>
          <div class="tool-name">${t.name}</div>
          <div class="tool-desc">${escapeHtml(t.description.slice(0, 100))}${t.description.length > 100 ? "…" : ""}</div>
          <div class="tool-params">
            ${t.required.length ? `<span class="param required">${t.required.join(", ")}</span>` : ""}
          </div>
        </div>
      `).join("");
    },

    openDrawer(name) {
      const tool = this._tools.find(t => t.name === name);
      if (!tool) return;
      document.getElementById("drawer-title").textContent = tool.name;
      document.getElementById("drawer-desc").textContent  = tool.description;
      document.getElementById("drawer-meta").innerHTML = `
        <span class="module-chip active">${tool.module}</span>
        ${tool.required.length ? `<span style="margin-left:8px;font-size:0.75rem;color:var(--tech-accent)">Required: ${tool.required.join(", ")}</span>` : ""}
      `;
      document.getElementById("drawer-schema").textContent = JSON.stringify(tool.schema, null, 2);
      document.getElementById("tool-drawer").classList.add("active");
    },
  };
  window.ToolsTab = ToolsTab;

  document.getElementById("tools-search").addEventListener("input", () => ToolsTab.render());
  document.getElementById("close-drawer").addEventListener("click", () => {
    document.getElementById("tool-drawer").classList.remove("active");
  });
  document.getElementById("tool-drawer").addEventListener("click", (e) => {
    if (e.target === document.getElementById("tool-drawer")) {
      document.getElementById("tool-drawer").classList.remove("active");
    }
  });

  // ─────────────────────────────────────────────
  //  Activity Tab — SSE + history
  // ─────────────────────────────────────────────
  const ActivityTab = {
    _entries: [],
    _source:  null,
    _retryDelay: 2000,
    _filterTool: "",

    async init() {
      // Load history
      try {
        const history = await apiFetch("/api/activity?limit=100");
        history.forEach(e => this._addEntry(e, false));
      } catch {}
      this.connect();

      document.getElementById("auto-scroll").addEventListener("change", () => {
        if (document.getElementById("auto-scroll").checked) this._scrollToBottom();
      });
      document.getElementById("clear-activity").addEventListener("click", () => {
        this._entries = [];
        document.getElementById("activity-feed").innerHTML = '<p class="dim" id="activity-empty">Feed limpo. Aguardando novas chamadas...</p>';
        this._updateCount();
      });
      document.getElementById("activity-filter").addEventListener("change", (e) => {
        this._filterTool = e.target.value;
        this._rerenderAll();
      });
    },

    connect() {
      if (this._source) this._source.close();
      const source = new EventSource("/api/activity/stream");

      source.onopen = () => {
        this._retryDelay = 2000;
        this._setStatus("connected");
      };

      source.onmessage = (e) => {
        try {
          const entry = JSON.parse(e.data);
          if (entry.type === "connected") return; // initial handshake
          this._addEntry(entry, true);
        } catch {}
      };

      source.onerror = () => {
        source.close();
        this._setStatus("disconnected");
        setTimeout(() => this.connect(), this._retryDelay);
        this._retryDelay = Math.min(this._retryDelay * 2, 30_000);
      };

      this._source = source;
    },

    _setStatus(state) {
      const bar  = document.getElementById("sse-status-bar");
      const text = document.getElementById("sse-status-text");
      const dot  = document.getElementById("sse-dot");
      bar.className  = `sse-status-bar ${state}`;
      dot.className  = `sse-dot ${state}`;
      text.textContent = state === "connected" ? "● LIVE" : "○ RECONNECTING...";
    },

    _addEntry(entry, isNew) {
      this._entries.push(entry);

      // Session stats
      if (isNew) {
        sessionCount++;
        sessionTotalMs += entry.duration || 0;
        if (entry.status === "error") sessionErrors++;
        this._updateSessionStats();
      }

      // Add filter option
      const filter = document.getElementById("activity-filter");
      if (![...filter.options].some(o => o.value === entry.tool)) {
        const opt = document.createElement("option");
        opt.value = opt.textContent = entry.tool;
        filter.appendChild(opt);
      }

      if (this._filterTool && entry.tool !== this._filterTool) return;
      this._renderLine(entry);
    },

    _renderLine(entry) {
      const feed  = document.getElementById("activity-feed");
      const empty = document.getElementById("activity-empty");
      if (empty) empty.remove();

      const slow  = entry.duration > 3000;
      const cls   = entry.status === "error" ? "error" : slow ? "slow" : "ok";
      const icon  = entry.status === "error" ? "✗" : slow ? "▲" : "✓";
      const ts    = new Date(entry.ts).toLocaleTimeString("pt-BR");

      const line  = document.createElement("div");
      line.className = `activity-line ${cls}`;
      line.dataset.tool = entry.tool;
      line.innerHTML = `
        <span class="al-ts mono">${ts}</span>
        <span class="al-icon">${icon}</span>
        <span class="al-tool">${entry.tool}</span>
        <span class="al-env mono dim">[${entry.env}]</span>
        <span class="al-dur mono">${formatMs(entry.duration)}</span>
        ${entry.error ? `<span class="al-err" title="${escapeHtml(entry.error)}">⚠ ${escapeHtml(entry.error.slice(0, 60))}</span>` : ""}
      `;
      if (entry.error) {
        line.style.cursor = "pointer";
        line.addEventListener("click", () => {
          alert(`Erro completo:\n${entry.error}`);
        });
      }
      feed.appendChild(line);

      if (document.getElementById("auto-scroll")?.checked) {
        this._scrollToBottom();
      }
      this._updateCount();
    },

    _rerenderAll() {
      const feed = document.getElementById("activity-feed");
      feed.innerHTML = "";
      const filtered = this._filterTool
        ? this._entries.filter(e => e.tool === this._filterTool)
        : this._entries;
      if (!filtered.length) {
        feed.innerHTML = '<p class="dim" id="activity-empty">Nenhuma entrada para exibir.</p>';
        return;
      }
      filtered.forEach(e => this._renderLine(e));
    },

    _scrollToBottom() {
      const feed = document.getElementById("activity-feed");
      feed.scrollTop = feed.scrollHeight;
    },

    _updateCount() {
      const n = document.getElementById("activity-count");
      if (n) n.textContent = `${this._entries.length} entradas`;
    },

    _updateSessionStats() {
      const el = id => document.getElementById(id);
      if (el("stat-session-count"))  el("stat-session-count").textContent  = sessionCount;
      if (el("stat-session-errors")) el("stat-session-errors").textContent = sessionErrors;
      if (el("stat-avg-latency"))    el("stat-avg-latency").textContent    =
        sessionCount ? formatMs(Math.round(sessionTotalMs / sessionCount)) : "—";
    },
  };

  // ─────────────────────────────────────────────
  //  Stats Tab
  // ─────────────────────────────────────────────
  const StatsTab = {
    _timer: null,

    async init() {
      await this.refresh();
      this._timer = setInterval(() => this.refresh(), 30_000);
    },

    async refresh() {
      try {
        const data = await apiFetch("/api/stats");
        this._renderServer(data.server);
        this._renderCache(data.cache);
        this._renderKnowledge(data.knowledge);
        this._renderActivity(data.server);
        document.getElementById("stats-updated").textContent =
          `Atualizado: ${new Date().toLocaleTimeString("pt-BR")}`;
      } catch (err) {
        document.getElementById("stats-updated").textContent = `Erro: ${err.message}`;
      }
    },

    _row(label, value) {
      return `<div class="stats-row"><span>${label}</span><span class="val">${value}</span></div>`;
    },

    _renderServer(s) {
      const uptime = s.uptime_s < 60 ? `${s.uptime_s}s` : s.uptime_s < 3600
        ? `${Math.floor(s.uptime_s/60)}m` : `${Math.floor(s.uptime_s/3600)}h`;
      document.getElementById("stats-server").innerHTML =
        this._row("Versão MCP", s.version) +
        this._row("Ferramentas", s.tools) +
        this._row("Uptime", uptime) +
        this._row("Node.js", s.node);
    },

    _renderCache(c) {
      document.getElementById("stats-cache").innerHTML =
        this._row("Entradas", `${c.size} / ${c.max}`) +
        this._row("TTL", formatMs(c.ttl_ms)) +
        this._row("Persistência", c.persist_enabled ? "✓ Ativo" : "✗ Desabilitado") +
        (c.persist_path
          ? `<div class="stats-row"><span>Arquivo</span><span class="val mono small">${c.persist_path.split(/[\\/]/).pop()}</span></div>`
          : "");
    },

    _renderKnowledge(k) {
      const cats = k.categories || {};
      document.getElementById("stats-knowledge").innerHTML =
        this._row("Total Tabelas", k.total) +
        this._row("CORE",   cats.CORE   ?? "—") +
        this._row("CUSTOM", cats.CUSTOM ?? "—") +
        this._row("SYSTEM", cats.SYSTEM ?? "—");
    },

    _renderActivity(s) {
      document.getElementById("stats-activity").innerHTML =
        `<div class="stats-row"><span>Arquivo</span><span class="val mono small">${(s.activity_path || "").split(/[\\/]/).pop()}</span></div>` +
        this._row("Chamadas (sessão)", sessionCount) +
        this._row("Erros (sessão)",   sessionErrors) +
        this._row("Latência média",   sessionCount ? formatMs(Math.round(sessionTotalMs / sessionCount)) : "—");
    },
  };

  document.getElementById("refresh-stats").addEventListener("click", () => StatsTab.refresh());

  // ─────────────────────────────────────────────
  //  Governance Tab
  // ─────────────────────────────────────────────
  const GovernanceTab = {
    _envPrefixes: [],

    async init() {
      // Populate env selector from config
      const data = await apiFetch("/api/env").catch(() => ({}));
      const prefixes = new Set(["DEFAULT"]);
      Object.keys(data).forEach(k => {
        if (k.endsWith("SN_INSTANCE")) {
          const p = k.replace("SN_INSTANCE", "").replace(/_$/, "");
          prefixes.add(p || "DEFAULT");
        }
      });

      const govEnv = document.getElementById("gov-env");
      govEnv.innerHTML = [...prefixes].map(p => `<option value="${p}">${p}</option>`).join("");
      govEnv.addEventListener("change", () => this.loadUpdateSets(govEnv.value));

      document.getElementById("run-lint-btn").addEventListener("click", () => this.runLint());

      // Load update sets for initial env
      if (prefixes.size > 0) this.loadUpdateSets([...prefixes][0]);
    },

    async loadUpdateSets(env) {
      const sel = document.getElementById("gov-update-set");
      sel.innerHTML = '<option value="">Carregando...</option>';
      try {
        const sets = await apiFetch(`/api/governance/update-sets?env=${encodeURIComponent(env)}`);
        if (!sets.length) {
          sel.innerHTML = '<option value="">Nenhum Update Set encontrado</option>';
          return;
        }
        sel.innerHTML = sets.map(s =>
          `<option value="${s.sys_id}">${s.name} [${s.state}]</option>`
        ).join("");
      } catch {
        sel.innerHTML = '<option value="">Erro ao carregar</option>';
      }
    },

    async runLint() {
      const btn          = document.getElementById("run-lint-btn");
      const updateSetId  = document.getElementById("gov-update-set").value;
      const env          = document.getElementById("gov-env").value;
      const checks       = [...document.querySelectorAll("#checks-grid input:checked")].map(i => i.value);
      const resultEl     = document.getElementById("lint-result");

      if (!updateSetId) {
        resultEl.innerHTML = '<p class="dim error-text">Selecione um Update Set antes de executar.</p>';
        return;
      }

      btn.textContent = "▶ ANALISANDO...";
      btn.disabled    = true;
      resultEl.innerHTML = '<p class="dim">Executando análise...</p>';

      try {
        const res = await fetch("/api/governance/lint", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ update_set_id: updateSetId, env, checks }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        resultEl.innerHTML = this._renderResult(data);
      } catch (err) {
        resultEl.innerHTML = `<p class="error-text">Erro: ${escapeHtml(err.message)}</p>`;
      } finally {
        btn.textContent = "▶ EXECUTAR LINTER";
        btn.disabled    = false;
      }
    },

    _renderResult(data) {
      const statusCls = data.status === "fail" ? "badge-error" : data.status === "warn" ? "badge-warn" : "badge-ok";
      const statusTxt = data.status === "fail" ? "✗ FAIL" : data.status === "warn" ? "⚠ WARN" : "✓ CLEAN";

      let html = `
        <div class="lint-summary">
          <span class="badge ${statusCls}">${statusTxt}</span>
          <span class="dim">${data.update_set} &bull; ${data.script_records_analyzed} scripts analisados</span>
          <div class="lint-counts">
            <span class="lint-count error">${data.summary.errors} erros</span>
            <span class="lint-count warn">${data.summary.warnings} avisos</span>
            <span class="lint-count info">${data.summary.info} info</span>
          </div>
        </div>
      `;

      if (!data.issues.length) {
        html += '<p class="dim" style="margin-top:16px;">Nenhum issue encontrado. Código limpo!</p>';
        return html;
      }

      const bySeverity = (s) => data.issues.filter(i => i.severity === s);

      ["error","warning","info"].forEach(sev => {
        const issues = bySeverity(sev);
        if (!issues.length) return;
        const icon = sev === "error" ? "✗" : sev === "warning" ? "⚠" : "ℹ";
        html += issues.map(i => `
          <div class="lint-issue ${sev}">
            <span class="lint-icon">${icon}</span>
            <div>
              <div class="lint-record mono">${escapeHtml(i.record)} <span class="dim">(${i.table})</span></div>
              <div>${escapeHtml(i.message)}</div>
              ${i.detail ? `<div class="dim mono small" style="margin-top:4px;">${escapeHtml(i.detail)}</div>` : ""}
            </div>
          </div>
        `).join("");
      });

      return html;
    },
  };

  // ─────────────────────────────────────────────
  //  Modal — Instance Manager
  // ─────────────────────────────────────────────
  const Modal = {
    el:         document.getElementById("mcp-modal"),
    form:       document.getElementById("instance-form"),
    deleteBtn:  document.getElementById("delete-inst-btn"),

    open(prefill = {}) {
      document.getElementById("inst-prefix").disabled = false;
      document.getElementById("inst-prefix").value    = prefill.prefix || "";
      document.getElementById("inst-name").value      = prefill.instance || "";
      document.getElementById("inst-user").value      = prefill.user || "admin";
      document.getElementById("inst-password").value  = "";
      document.getElementById("inst-client-id").value     = prefill.clientId || "";
      document.getElementById("inst-client-secret").value = "";
      document.getElementById("oauth-status").textContent = "Aguardando...";
      this.deleteBtn.style.display = "none";
      this._switchTab("basic");
      this.el.classList.add("active");
    },

    edit(prefix) {
      const p = prefix === "Main" ? "" : prefix + "_";
      document.getElementById("inst-prefix").value    = prefix;
      document.getElementById("inst-prefix").disabled = true;
      document.getElementById("inst-name").value      = currentConfig[`${p}SN_INSTANCE`] || "";
      document.getElementById("inst-user").value      = currentConfig[`${p}SN_USER`] || "admin";
      document.getElementById("inst-password").value  = currentConfig[`${p}SN_PASSWORD`] || "";
      document.getElementById("inst-client-id").value     = currentConfig[`${p}SN_CLIENT_ID`] || "";
      document.getElementById("inst-client-secret").value = "";

      const hasOAuth = !!(currentConfig[`${p}SN_OAUTH_ACCESS_TOKEN`] || currentConfig[`${p}SN_CLIENT_ID`]);
      this._switchTab(hasOAuth ? "oauth" : "basic");
      this.deleteBtn.style.display = "block";
      this.el.classList.add("active");
    },

    close() { this.el.classList.remove("active"); },

    _switchTab(method) {
      document.getElementById("auth-method").value = method;
      document.querySelectorAll(".auth-tab").forEach(t =>
        t.classList.toggle("active", t.dataset.method === method));
      document.getElementById("section-basic").style.display = method === "basic" ? "block" : "none";
      document.getElementById("section-oauth").style.display = method === "oauth" ? "block" : "none";
    },
  };
  window.Modal = Modal;

  document.getElementById("close-modal").addEventListener("click", () => Modal.close());
  document.getElementById("mcp-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("mcp-modal")) Modal.close();
  });

  document.querySelectorAll(".auth-tab").forEach(tab =>
    tab.addEventListener("click", () => Modal._switchTab(tab.dataset.method)));

  document.getElementById("authorize-btn").addEventListener("click", () => {
    const prefix       = document.getElementById("inst-prefix").value || "Main";
    const instance     = document.getElementById("inst-name").value;
    const clientId     = document.getElementById("inst-client-id").value;
    const clientSecret = document.getElementById("inst-client-secret").value;
    if (!instance || !clientId || !clientSecret) {
      alert("Preencha Instância, Client ID e Client Secret antes de autorizar.");
      return;
    }
    const p = prefix === "Main" ? "" : prefix.toUpperCase() + "_";
    currentConfig[`${p}SN_INSTANCE`]      = instance;
    currentConfig[`${p}SN_CLIENT_ID`]     = clientId;
    currentConfig[`${p}SN_CLIENT_SECRET`] = clientSecret;
    EnvironmentsTab.pushConfig(currentConfig).then(() => {
      const authUrl = `/api/auth/${prefix === "Main" ? "DEFAULT" : prefix}`;
      window.open(authUrl, "SN_Auth", "width=600,height=700");
      document.getElementById("oauth-status").innerHTML =
        '<span style="color:#FFD700">Aguardando confirmação do browser...</span>';
    });
  });

  document.getElementById("instance-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const prefix  = document.getElementById("inst-prefix").value.toUpperCase().replace(/\s/g, "");
    const isMain  = prefix === "MAIN" || prefix === "DEFAULT" || prefix === "";
    const p       = isMain ? "" : prefix + "_";
    const method  = document.getElementById("auth-method").value;

    currentConfig[`${p}SN_INSTANCE`] = document.getElementById("inst-name").value;
    if (method === "basic") {
      currentConfig[`${p}SN_USER`]     = document.getElementById("inst-user").value;
      currentConfig[`${p}SN_PASSWORD`] = document.getElementById("inst-password").value;
      delete currentConfig[`${p}SN_OAUTH_ACCESS_TOKEN`];
      delete currentConfig[`${p}SN_OAUTH_REFRESH_TOKEN`];
    } else {
      currentConfig[`${p}SN_CLIENT_ID`]     = document.getElementById("inst-client-id").value;
      currentConfig[`${p}SN_CLIENT_SECRET`] = document.getElementById("inst-client-secret").value;
      delete currentConfig[`${p}SN_USER`];
      delete currentConfig[`${p}SN_PASSWORD`];
    }
    await EnvironmentsTab.pushConfig(currentConfig);
    Modal.close();
  });

  document.getElementById("delete-inst-btn").addEventListener("click", async () => {
    if (!confirm("Remover esta instância?")) return;
    const prefix = document.getElementById("inst-prefix").value;
    const p      = prefix === "Main" ? "" : prefix + "_";
    ["SN_INSTANCE","SN_USER","SN_PASSWORD","SN_OAUTH_ACCESS_TOKEN","SN_OAUTH_REFRESH_TOKEN","SN_CLIENT_ID","SN_CLIENT_SECRET"]
      .forEach(k => delete currentConfig[`${p}${k}`]);
    await EnvironmentsTab.pushConfig(currentConfig);
    Modal.close();
  });

  // ── Init default tab AFTER all const declarations are resolved ──
  switchTab("environments");

});
