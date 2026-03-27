document.addEventListener('DOMContentLoaded', () => {
    const envEditor = document.getElementById('env-editor');
    const instanceList = document.getElementById('instance-list');
    const saveBtn = document.getElementById('save-env-btn');
    const addEnvBtn = document.getElementById('add-env-btn');
    const togglePassBtn = document.getElementById('toggle-visibility');
    
    // Modal Elements
    const modal = document.getElementById('mcp-modal');
    const closeModal = document.getElementById('close-modal');
    const instanceForm = document.getElementById('instance-form');
    const deleteInstBtn = document.getElementById('delete-inst-btn');
    
    // Form Inputs
    const instPrefix = document.getElementById('inst-prefix');
    const instName = document.getElementById('inst-name');
    const instUser = document.getElementById('inst-user');
    const instPass = document.getElementById('inst-password');

    let currentConfig = {};
    let isMasked = true; // Privacidade em primeiro lugar por padrão

    const MASK = '••••••••';

    // ─────────────────────────────────────────────
    //  API FETCHERS
    // ─────────────────────────────────────────────

    async function loadConfig() {
        const res = await fetch('/api/env');
        currentConfig = await res.json();
        renderLayout();
    }

    function renderLayout() {
        let editorText = '';
        const instances = [];

        Object.entries(currentConfig).forEach(([key, value]) => {
            const displayValue = (isMasked && key.includes('PASSWORD')) ? MASK : value;
            editorText += `${key}=${displayValue}\n`;
            
            if (key.endsWith('SN_INSTANCE')) {
                const prefix = key.replace('SN_INSTANCE', '').replace('_', '') || 'Main';
                instances.push({
                    prefix,
                    instance: value,
                    user: currentConfig[`${prefix === 'Main' ? '' : prefix + '_'}SN_USER`] || 'Não configurado'
                });
            }
        });

        envEditor.value = editorText.trim();
        renderInstances(instances);
    }

    function renderInstances(instances) {
        if (instances.length === 0) {
            instanceList.innerHTML = '<p style="color:var(--tech-text-dim)">Nenhuma instância configurada.</p>';
            return;
        }

        instanceList.innerHTML = instances.map(inst => `
            <div class="instance-card">
                <div class="instance-info">
                    <div class="name">${inst.prefix} Instance</div>
                    <div class="details">https://${inst.instance}.service-now.com — ${inst.user}</div>
                </div>
                <button class="btn-tech" onclick="testConnection('${inst.prefix}', this)">Testar</button>
                <div class="settings-icon-btn" onclick="editInstance('${inst.prefix}')" title="Configurações">⚙️</div>
            </div>
        `).join('');
    }

    async function pushConfig(updatedConfig) {
        await fetch('/api/env', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedConfig)
        });
        await loadConfig();
    }

    // ─────────────────────────────────────────────
    //  PRIVACY LOGIC (v3.4.3)
    // ─────────────────────────────────────────────

    togglePassBtn.addEventListener('click', () => {
        isMasked = !isMasked;
        togglePassBtn.innerText = isMasked ? '[👁️ REVELAR SENHAS]' : '[🔒 OCULTAR SENHAS]';
        renderLayout();
    });

    // ─────────────────────────────────────────────
    //  MODAL LOGIC
    // ─────────────────────────────────────────────

    window.editInstance = (prefix) => {
        const isMain = prefix === 'Main';
        const p = isMain ? '' : prefix + '_';
        
        instPrefix.value = prefix;
        instPrefix.disabled = true;
        instName.value = currentConfig[`${p}SN_INSTANCE`] || '';
        instUser.value = currentConfig[`${p}SN_USER`] || 'admin';
        instPass.value = currentConfig[`${p}SN_PASSWORD`] || '';
        
        deleteInstBtn.style.display = 'block';
        modal.classList.add('active');
    };

    addEnvBtn.addEventListener('click', () => {
        instanceForm.reset();
        instPrefix.disabled = false;
        deleteInstBtn.style.display = 'none';
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => modal.classList.remove('active'));

    instanceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prefix = instPrefix.value.toUpperCase().replace(/\s/g, '');
        const isMain = prefix === 'MAIN';
        const p = isMain ? '' : prefix + '_';

        currentConfig[`${p}SN_INSTANCE`] = instName.value;
        currentConfig[`${p}SN_USER`] = instUser.value;
        currentConfig[`${p}SN_PASSWORD`] = instPass.value;

        await pushConfig(currentConfig);
        modal.classList.remove('active');
    });

    deleteInstBtn.addEventListener('click', async () => {
        if (!confirm('Tem certeza que deseja remover esta instância?')) return;
        const prefix = instPrefix.value;
        const p = prefix === 'Main' ? '' : prefix + '_';
        delete currentConfig[`${p}SN_INSTANCE`];
        delete currentConfig[`${p}SN_USER`];
        delete currentConfig[`${p}SN_PASSWORD`];
        await pushConfig(currentConfig);
        modal.classList.remove('active');
    });

    // ─────────────────────────────────────────────
    //  SECURE MANUAL SAVE (v3.4.3)
    // ─────────────────────────────────────────────

    saveBtn.addEventListener('click', async () => {
        const text = envEditor.value;
        const lines = text.split('\n');
        const newData = { ...currentConfig }; // Iniciar com os dados reais em memória

        lines.forEach(line => {
            const idx = line.indexOf('=');
            if (idx === -1) return;
            const k = line.substring(0, idx);
            const v = line.substring(idx + 1);
            if (!k || !v) return;
            const key = k.trim();
            const val = v.trim();

            // SÓ ATUALIZAR se o valor NÃO FOR a máscara de privacidade
            if (val !== MASK) {
                newData[key] = val;
            }
        });

        saveBtn.innerText = 'PROTEC_SYNC...';
        await pushConfig(newData);
        
        setTimeout(() => {
            saveBtn.innerText = 'SYNC_COMPLETE!';
            setTimeout(() => saveBtn.innerText = 'SINCRONIZAR CONFIGURAÇÕES', 2000);
        }, 500);
    });

    loadConfig();
});

// TEST CONNECTION (GLOBAL)
window.testConnection = async (prefix, btnEl) => {
    // Pegar estado real atual da memória em vez do editor mascarado
    const resEnv = await fetch('/api/env');
    const envData = await resEnv.json();
    const p = prefix === 'Main' ? '' : prefix + '_';

    const body = {
        instance: envData[`${p}SN_INSTANCE`],
        user:     envData[`${p}SN_USER`],
        password: envData[`${p}SN_PASSWORD`]
    };

    const btn = btnEl || window.event?.target;
    if (btn) btn.innerText = '...';

    try {
        const res = await fetch('/api/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const result = await res.json();
        if (btn) {
            btn.innerHTML = result.status === 'connected' ? '✅ OK' : '❌ ERR';
            btn.style.color = result.status === 'connected' ? '#00FF41' : '#FF2B2B';
        }
    } catch {
        if (btn) btn.innerHTML = '❌ ERR';
    }

    setTimeout(() => {
        if (btn) {
            btn.innerText = 'Testar';
            btn.style.color = '';
        }
    }, 3000);
};
