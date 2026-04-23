/* =============================================================
   MCP Dashboard v3.0 — Vanilla ES6 SPA
   Sections: TabManager | EnvironmentsTab | ToolsTab |
             ActivityTab | StatsTab | GovernanceTab | GraphTab | Modal
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
        case "graph":        GraphTab.init();        break;
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

  // ─── Schema Search (Knowledge) ───────────────
  const SchemaSearch = {
    _timer: null,

    bind() {
      const input   = document.getElementById("schema-search-input");
      const results = document.getElementById("schema-search-results");
      if (!input) return;
      input.addEventListener("input", () => {
        clearTimeout(this._timer);
        const q = input.value.trim();
        if (q.length < 2) { results.innerHTML = ""; return; }
        results.innerHTML = '<p class="dim" style="padding:8px;">Buscando...</p>';
        this._timer = setTimeout(() => this._search(q, results), 350);
      });
    },

    async _search(q, container) {
      try {
        const data = await apiFetch(`/api/knowledge/search?q=${encodeURIComponent(q)}`);
        if (!data.results.length) {
          container.innerHTML = '<p class="dim" style="padding:8px;">Nenhum resultado.</p>';
          return;
        }
        container.innerHTML = data.results.slice(0, 20).map(r => `
          <div class="schema-result">
            <div class="schema-result-title">
              <span class="mono">${escapeHtml(r.table)}</span>
              <span class="module-chip" style="font-size:0.65rem;padding:2px 6px;">${r.category}</span>
            </div>
            <div class="dim" style="font-size:0.75rem;">${escapeHtml(r.label)}</div>
            ${r.matches.map(m => `<div class="schema-match mono">${escapeHtml(m)}</div>`).join("")}
          </div>
        `).join("");
      } catch (err) {
        container.innerHTML = `<p class="error-text">Erro: ${escapeHtml(err.message)}</p>`;
      }
    },
  };
  SchemaSearch.bind();

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
        const [data, heatmap] = await Promise.all([
          apiFetch("/api/stats"),
          apiFetch("/api/activity/heatmap").catch(() => null),
        ]);
        this._renderServer(data.server);
        this._renderCache(data.cache);
        this._renderKnowledge(data.knowledge);
        this._renderActivity(data.server);
        if (heatmap) this._renderHeatmap(heatmap);
        document.getElementById("stats-updated").textContent =
          `Atualizado: ${new Date().toLocaleTimeString("pt-BR")}`;
      } catch (err) {
        document.getElementById("stats-updated").textContent = `Erro: ${err.message}`;
      }
    },

    _renderHeatmap(data) {
      const el = document.getElementById("stats-heatmap");
      if (!el || !data.rows.length) return;
      const maxAvg = Math.max(...data.rows.map(r => r.avg_ms), 1);
      el.innerHTML = data.rows.slice(0, 20).map(r => {
        const pct   = Math.min(100, Math.round((r.avg_ms / maxAvg) * 100));
        const cls   = r.avg_ms > 3000 ? "heat-hot" : r.avg_ms > 1000 ? "heat-warm" : "heat-cool";
        const errCls = r.error_rate > 20 ? "error-text" : r.error_rate > 0 ? "warn-text" : "";
        return `
          <div class="heat-row">
            <span class="heat-name mono">${escapeHtml(r.tool)}</span>
            <div class="heat-bar-wrap">
              <div class="heat-bar ${cls}" style="width:${pct}%"></div>
            </div>
            <span class="heat-val">${formatMs(r.avg_ms)}</span>
            <span class="heat-calls dim">${r.calls}x</span>
            ${r.errors ? `<span class="heat-err ${errCls}">${r.errors}✗</span>` : ""}
          </div>
        `;
      }).join("");
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
  //  Graph Tab — D3.js Table Dependency Explorer
  // ─────────────────────────────────────────────
  const GraphTab = {
    _simulation: null,
    _catFilter:  null,

    async init() {
      const empty = document.getElementById("graph-empty");
      try {
        const data = await apiFetch("/api/knowledge/graph");
        if (!data.nodes.length) {
          empty.textContent = "Nenhum schema no knowledge/ ainda. Execute sn_sync_knowledge_base primeiro.";
          return;
        }
        empty.style.display = "none";
        this._setupFilters(data.nodes);
        this._render(data);
      } catch (err) {
        empty.textContent = `Erro: ${err.message}`;
      }
    },

    _catColors: { CORE: "#00e5ff", CUSTOM: "#69f0ae", SYSTEM: "#ffab40" },

    _setupFilters(nodes) {
      const cats = [...new Set(nodes.map(n => n.category))].sort();
      const bar  = document.getElementById("graph-filter-bar");
      bar.innerHTML = cats.map(c =>
        `<button class="module-chip active" data-cat="${c}" style="border-color:${this._catColors[c] || '#666'}">${c}</button>`
      ).join("");
      bar.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          btn.classList.toggle("active");
          const active = [...bar.querySelectorAll("button.active")].map(b => b.dataset.cat);
          this._applyFilter(active);
        });
      });
    },

    _applyFilter(activeCats) {
      if (!this._svg) return;
      this._svg.selectAll("circle").style("opacity", d => activeCats.includes(d.category) ? 1 : 0.08);
      this._svg.selectAll("text.node-label").style("opacity", d => activeCats.includes(d.category) ? 1 : 0);
    },

    _render(data) {
      if (typeof d3 === "undefined") {
        document.getElementById("graph-empty").textContent = "D3.js não disponível. Verifique a conexão com a internet.";
        document.getElementById("graph-empty").style.display = "";
        return;
      }

      const container = document.getElementById("graph-canvas");
      container.innerHTML = "";

      const W = container.clientWidth  || 900;
      const H = container.clientHeight || 560;

      const svg = d3.select(container).append("svg")
        .attr("width", "100%").attr("height", H)
        .call(d3.zoom().scaleExtent([0.2, 4]).on("zoom", ev => g.attr("transform", ev.transform)));

      const g = svg.append("g");

      // Arrow marker
      svg.append("defs").append("marker")
        .attr("id", "arrow").attr("viewBox", "0 -5 10 10")
        .attr("refX", 20).attr("refY", 0)
        .attr("markerWidth", 6).attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path").attr("d", "M0,-5L10,0L0,5").attr("fill", "#333");

      const link = g.append("g").selectAll("line")
        .data(data.edges).join("line")
        .attr("stroke", "#2a2a2a").attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow)");

      const catColors = this._catColors;
      const rScale = n => Math.max(7, Math.min(22, Math.sqrt(n.field_count) * 2.5));

      const node = g.append("g").selectAll("circle")
        .data(data.nodes).join("circle")
        .attr("r", rScale)
        .attr("fill", d => catColors[d.category] || "#888")
        .attr("fill-opacity", 0.85)
        .attr("stroke", "#000").attr("stroke-width", 1)
        .attr("cursor", "pointer")
        .call(d3.drag()
          .on("start", (ev, d) => { if (!ev.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on("drag",  (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
          .on("end",   (ev, d) => { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

      const label = g.append("g").selectAll("text")
        .data(data.nodes.filter(n => n.field_count >= 8)).join("text")
        .attr("class", "node-label")
        .attr("font-size", "8px").attr("fill", "#9e9e9e")
        .attr("text-anchor", "middle").attr("pointer-events", "none")
        .attr("dy", d => rScale(d) + 10)
        .text(d => d.id);

      // Tooltip
      const tip = d3.select(container).append("div").attr("class", "graph-tooltip");
      node.on("mousemove", (ev, d) => {
        tip.style("display", "block")
          .style("left", `${ev.offsetX + 14}px`).style("top", `${ev.offsetY - 8}px`)
          .html(`<strong>${d.id}</strong><br><span style="color:#888">${d.label}</span><br>${d.category} • ${d.field_count} campos`);
      }).on("mouseleave", () => tip.style("display", "none"))
        .on("click", (_, d) => this._sidebar(d));

      const sim = d3.forceSimulation(data.nodes)
        .force("link",      d3.forceLink(data.edges).id(d => d.id).distance(90))
        .force("charge",    d3.forceManyBody().strength(-250))
        .force("center",    d3.forceCenter(W / 2, H / 2))
        .force("collision", d3.forceCollide().radius(d => rScale(d) + 4))
        .on("tick", () => {
          link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
          node.attr("cx", d => d.x).attr("cy", d => d.y);
          label.attr("x", d => d.x).attr("y", d => d.y);
        });

      this._simulation = sim;
      this._svg = svg;
    },

    _sidebar(d) {
      document.getElementById("graph-sidebar-title").textContent = d.id;
      document.getElementById("graph-sidebar-info").innerHTML = `
        <div class="dim" style="margin-bottom:8px;">${escapeHtml(d.label)}</div>
        <span class="module-chip active" style="border-color:${this._catColors[d.category] || '#666'}">${d.category}</span>
        <span class="dim" style="margin-left:8px;">${d.field_count} campos</span>
        <div style="margin-top:12px;">
          <button class="btn-tech small" onclick="ToolsTab.openDrawer('sn_query_records')">↗ Query via MCP</button>
        </div>
      `;
      document.getElementById("graph-sidebar").classList.add("open");
    },
  };

  document.getElementById("close-graph-sidebar")?.addEventListener("click", () => {
    document.getElementById("graph-sidebar").classList.remove("open");
  });

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
