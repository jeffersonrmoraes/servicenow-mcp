document.addEventListener('DOMContentLoaded', () => {
    const envEditor = document.getElementById('env-editor');
    const instanceList = document.getElementById('instance-list');
    const saveBtn = document.getElementById('save-env-btn');
    const toolsGrid = document.getElementById('tools-list');

    // ─────────────────────────────────────────────
    //  API FETCHERS
    // ─────────────────────────────────────────────

    async function loadConfig() {
        const res = await fetch('/api/env');
        const data = await res.json();
        
        let editorText = '';
        const instances = [];

        // Parse simples para lista visual
        Object.entries(data).forEach(([key, value]) => {
            editorText += `${key}=${value}\n`;
            if (key.endsWith('_SN_INSTANCE')) {
                const prefix = key.replace('_SN_INSTANCE', '');
                instances.push({
                    prefix,
                    instance: value,
                    user: data[`${prefix}_SN_USER`] || 'Não configurado'
                });
            }
        });

        envEditor.value = editorText.trim();
        renderInstances(instances);
    }

    function renderInstances(instances) {
        if (instances.length === 0) {
            instanceList.innerHTML = '<p class="text-muted">Nenhuma instância PDI/DEV configurada.</p>';
            return;
        }

        instanceList.innerHTML = instances.map(inst => `
            <div class="instance-card">
                <div>
                    <div class="instance-name">${inst.prefix} Instance</div>
                    <div class="instance-url">https://${inst.instance}.service-now.com</div>
                    <div class="instance-user">User: ${inst.user}</div>
                </div>
                <button class="btn-hex" onclick="testConnection('${inst.prefix}')">Testar</button>
            </div>
        `).join('');
    }

    async function saveConfig() {
        const text = envEditor.value;
        const lines = text.split('\n');
        const data = {};
        lines.forEach(line => {
            const [k, v] = line.split('=');
            if (k && v) data[k.trim()] = v.trim();
        });

        saveBtn.innerText = 'Salvando...';
        await fetch('/api/env', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        setTimeout(() => {
            saveBtn.innerText = 'Salvo com Sucesso!';
            setTimeout(() => saveBtn.innerText = 'Salvar Alterações', 2000);
            loadConfig();
        }, 800);
    }

    // ─────────────────────────────────────────────
    //  EVENTOS
    // ─────────────────────────────────────────────

    saveBtn.addEventListener('click', saveConfig);

    // Inicialização
    loadConfig();
});

// Tornar Global para o botão
window.testConnection = async (prefix) => {
    // Pegar dados atuais do editor (simulado para o teste)
    const lines = document.getElementById('env-editor').value.split('\n');
    const data = {};
    lines.forEach(line => {
        const [k, v] = line.split('=');
        if (k && v) data[k.trim()] = v.trim();
    });

    const body = {
        instance: data[`${prefix}_SN_INSTANCE`],
        user:     data[`${prefix}_SN_USER`],
        password: data[`${prefix}_SN_PASSWORD`]
    };

    const btn = event.target;
    const oldText = btn.innerText;
    btn.innerText = '...';

    const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const result = await res.json();

    if (result.status === 'connected') {
        btn.innerHTML = '✅ OK';
        btn.style.borderColor = '#25ef25';
        btn.style.color = '#25ef25';
    } else {
        btn.innerHTML = '❌ Erro';
        btn.style.borderColor = '#ff4d4d';
        btn.style.color = '#ff4d4d';
    }

    setTimeout(() => {
        btn.innerText = oldText;
        btn.style.borderColor = '';
        btn.style.color = '';
    }, 3000);
};
