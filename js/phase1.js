// FASE 1: FORTALEZA DAS SENHAS - OTIMIZADA

const phase1Data = {
    title: '🏰 FORTALEZA DAS SENHAS 🔐',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    // FORTALEZA - Estrutura simplificada
    fortress: {
        main: { x: 400, y: 200, w: 200, h: 250 },
        towers: [
            { x: 390, y: 180, s: 40 }, // tamanho fixo para torres
            { x: 570, y: 180, s: 40 },
            { x: 390, y: 410, s: 40 },
            { x: 570, y: 410, s: 40 }
        ],
        gate: { x: 475, y: 430, w: 50, h: 25 }
    },
    
    // GUARDAS - Dados essenciais
    guards: [
        { x: 200, y: 250, name: 'Guarda Maiúscula', emoji: 'A', color: '#3498db', patrol: [200, 350], msg: ['🛡️ Eu protejo as letras MAIÚSCULAS!', 'Use A, B, C nas suas senhas! 💪'], talked: false },
        { x: 650, y: 250, name: 'Guarda Minúscula', emoji: 'a', color: '#2ecc71', patrol: [650, 800], msg: ['🛡️ Letras minúsculas também!', 'Misture maiúsculas E minúsculas! 🔒'], talked: false },
        { x: 200, y: 500, name: 'Guarda Números', emoji: '7', color: '#e67e22', patrol: [200, 350], msg: ['🛡️ Números são importantes!', 'Adicione 1, 2, 3, 4, 5! 🔢'], talked: false },
        { x: 650, y: 500, name: 'Guarda Símbolos', emoji: '@', color: '#9b59b6', patrol: [650, 800], msg: ['🛡️ Símbolos dão poder!', 'Use @, #, !, $ para segurança! ⚡'], talked: false },
        { x: 300, y: 150, name: 'Vigia Norte', emoji: '🔐', color: '#e74c3c', patrol: [300, 350], msg: ['🗡️ Torre Norte vigiando!', 'NUNCA conte sua senha! 🚫'], talked: false },
        { x: 700, y: 150, name: 'Vigia Sul', emoji: '🔑', color: '#f39c12', patrol: [700, 750], msg: ['🗡️ Torre Sul alerta!', 'Senha diferente para cada lugar! 🌟'], talked: false }
    ],
    
    // NPC PRINCIPAL
    owl: { x: 500, y: 300, talked: false },
    
    // PUZZLES
    puzzles: [
        {
            x: 250, y: 350, icon: '🔐', done: false,
            q: 'Qual senha é IMPOSSÍVEL de hackear?',
            opts: [
                { t: 'A) 123456', ok: false, fb: '❌ Pior senha do mundo! Hackers tentam ela primeiro! 😱' },
                { t: 'B) senha', ok: false, fb: '❌ Muito óbvia! 🚫' },
                { t: 'C) Fort3z@2025!', ok: true, fb: '✅ PERFEITO! Maiúsculas, minúsculas, números E símbolos! 🏆⭐' },
                { t: 'D) meunome', ok: false, fb: '❌ Hackers descobrem nomes fácil! 👎' }
            ]
        },
        {
            x: 750, y: 350, icon: '🧪', done: false,
            q: 'O que torna senha INDESTRUTÍVEL?',
            opts: [
                { t: 'A) Ser curtinha', ok: false, fb: '❌ Senhas curtas caem rápido! 🏰' },
                { t: 'B) Só aniversário', ok: false, fb: '❌ Vilões descobrem online! 📅❌' },
                { t: 'C) Maiúsculas+minúsculas+números+símbolos!', ok: true, fb: '✅ Receita PERFEITA! 🌟🎉' },
                { t: 'D) Mesma em tudo', ok: false, fb: '❌ Se cai uma, caem TODAS! 🔒' }
            ]
        },
        {
            x: 500, y: 100, icon: '⚖️', done: false,
            q: 'Quando PODE compartilhar senha?',
            opts: [
                { t: 'A) Amigos da escola', ok: false, fb: '❌ Podem contar sem querer! 🤐' },
                { t: 'B) Só pais/responsáveis', ok: true, fb: '✅ CORRETO! Quem cuida de você! 👨‍👩‍👧✅' },
                { t: 'C) Se pedirem educado', ok: false, fb: '❌ Honestos NUNCA pedem! ARMADILHA! 🚨' },
                { t: 'D) Por mensagem', ok: false, fb: '❌ PERIGO! Hackers leem! 📱⛔' }
            ]
        }
    ],
    
    // BOSS
    boss: { x: 480, y: 470, w: 80, h: 80, active: false, defeated: false, hp: 3, maxHp: 3 }
};

// Cache de paths para otimização
const pathCache = {
    shield: new Path2D(),
    diamond: new Path2D()
};

// Inicializar paths uma vez
function initPaths() {
    // Shield path
    pathCache.shield.moveTo(20, 0);
    pathCache.shield.lineTo(8, 8);
    pathCache.shield.lineTo(8, 18);
    pathCache.shield.lineTo(20, 26);
    pathCache.shield.lineTo(32, 18);
    pathCache.shield.lineTo(32, 8);
    pathCache.shield.closePath();
    
    // Diamond path
    pathCache.diamond.moveTo(0, -25);
    pathCache.diamond.lineTo(25, 0);
    pathCache.diamond.lineTo(0, 25);
    pathCache.diamond.lineTo(-25, 0);
    pathCache.diamond.closePath();
}

// ============================================
// DESENHO OTIMIZADO
// ============================================

function drawFortress() {
    const f = phase1Data.fortress;
    
    // Sombra única para toda fortaleza
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    
    // Paredes - um único fillRect para cada
    ctx.fillStyle = '#7f8c8d';
    ctx.fillRect(f.main.x, f.main.y, f.main.w, 20); // topo
    ctx.fillRect(f.main.x, f.main.y + f.main.h - 20, f.main.w, 20); // base
    ctx.fillRect(f.main.x, f.main.y, 20, f.main.h); // esquerda
    ctx.fillRect(f.main.x + f.main.w - 20, f.main.y, 20, f.main.h); // direita
    
    // Torres compactas
    ctx.fillStyle = '#95a5a6';
    f.towers.forEach(t => {
        ctx.fillRect(t.x, t.y, t.s, 60);
        // Ameias simples
        ctx.fillStyle = '#5d6d7e';
        ctx.fillRect(t.x, t.y - 8, 10, 8);
        ctx.fillRect(t.x + 15, t.y - 8, 10, 8);
        ctx.fillRect(t.x + 30, t.y - 8, 10, 8);
        ctx.fillStyle = '#95a5a6';
    });
    
    ctx.shadowBlur = 0;
    
    // Bandeiras animadas simplificadas
    const wave = Math.sin(Date.now() / 300) * 3;
    ctx.fillStyle = '#e74c3c';
    f.towers.forEach(t => {
        const fx = t.x + 10, fy = t.y;
        ctx.fillRect(fx, fy - 30, 2, 30); // mastro
        ctx.beginPath();
        ctx.moveTo(fx, fy - 30);
        ctx.lineTo(fx + 20 + wave, fy - 25);
        ctx.lineTo(fx + 20 + wave, fy - 15);
        ctx.lineTo(fx, fy - 20);
        ctx.fill();
    });
    
    // Portão
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(f.gate.x, f.gate.y, f.gate.w, f.gate.h);
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        const x = f.gate.x + 10 + i * 15;
        ctx.beginPath();
        ctx.moveTo(x, f.gate.y);
        ctx.lineTo(x, f.gate.y + f.gate.h);
        ctx.stroke();
    }
    
    // Título
    ctx.fillStyle = '#ecf0f1';
    ctx.font = 'bold 20px Orbitron';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 3;
    ctx.strokeText('FORTALEZA DAS SENHAS', 500, 170);
    ctx.fillText('FORTALEZA DAS SENHAS', 500, 170);
}

function drawGuards() {
    const time = Date.now();
    
    phase1Data.guards.forEach((g, i) => {
        // Patrulha otimizada
        const patrolSpeed = 0.5;
        const range = g.patrol[1] - g.patrol[0];
        const progress = (time * patrolSpeed / 1000) % (range * 2);
        g.x = progress < range ? g.patrol[0] + progress : g.patrol[1] - (progress - range);
        
        const pulse = Math.sin(time / 400 + i) * 2;
        
        // Brilho
        ctx.shadowColor = g.color;
        ctx.shadowBlur = 15 + pulse;
        
        // Corpo (40x50)
        ctx.fillStyle = g.color;
        ctx.fillRect(g.x, g.y, 40, 50);
        
        // Capacete
        ctx.fillStyle = '#34495e';
        ctx.beginPath();
        ctx.arc(g.x + 20, g.y + 10, 12, Math.PI, 0);
        ctx.fill();
        
        // Visor
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(g.x + 10, g.y + 8, 20, 6);
        
        // Escudo usando path cache
        ctx.save();
        ctx.translate(g.x, g.y + 20);
        ctx.fillStyle = g.color;
        ctx.fill(pathCache.shield);
        ctx.strokeStyle = darken(g.color);
        ctx.lineWidth = 2;
        ctx.stroke(pathCache.shield);
        ctx.restore();
        
        // Emoji no escudo
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(g.emoji, g.x + 20, g.y + 38);
        
        // Indicador
        if (!g.talked && near(player, g, 70)) {
            ctx.fillStyle = 'rgba(255,215,0,0.9)';
            ctx.font = 'bold 11px Rajdhani';
            ctx.fillText('ESPAÇO', g.x + 20, g.y - 15);
        }
    });
    
    ctx.shadowBlur = 0;
}

function drawOwl() {
    const o = phase1Data.owl;
    const pulse = Math.sin(Date.now() / 300) * 3;
    
    ctx.shadowColor = '#f39c12';
    ctx.shadowBlur = 20;
    
    // Corpo
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(o.x + 30, o.y + 30, 25 + pulse, 0, Math.PI * 2);
    ctx.fill();
    
    // Coroa
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(o.x + 15, o.y + 10);
    ctx.lineTo(o.x + 30, o.y + 5);
    ctx.lineTo(o.x + 45, o.y + 10);
    ctx.lineTo(o.x + 30, o.y + 15);
    ctx.fill();
    
    // Olhos
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(o.x + 22, o.y + 25, 9, 0, Math.PI * 2);
    ctx.arc(o.x + 38, o.y + 25, 9, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(o.x + 22, o.y + 25, 4, 0, Math.PI * 2);
    ctx.arc(o.x + 38, o.y + 25, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Bico
    ctx.fillStyle = '#e67e22';
    ctx.beginPath();
    ctx.moveTo(o.x + 30, o.y + 30);
    ctx.lineTo(o.x + 25, o.y + 36);
    ctx.lineTo(o.x + 35, o.y + 36);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    if (!o.talked && near(player, o, 80)) {
        ctx.fillStyle = 'rgba(255,215,0,0.9)';
        ctx.font = 'bold 12px Rajdhani';
        ctx.textAlign = 'center';
        ctx.fillText('FALE COMIGO', o.x + 30, o.y + 75);
    }
}

function drawPuzzles() {
    const time = Date.now();
    
    phase1Data.puzzles.forEach((p, i) => {
        const pulse = Math.sin(time / 400 + i) * 6;
        
        ctx.save();
        ctx.translate(p.x + 25, p.y + 25);
        ctx.rotate((time / 2000 + i) * 0.3);
        
        ctx.shadowColor = p.done ? '#00ff41' : '#9b59b6';
        ctx.shadowBlur = 20 + pulse;
        ctx.fillStyle = p.done ? '#00ff41' : '#9b59b6';
        
        // Diamante usando path cache
        ctx.fill(pathCache.diamond);
        
        ctx.restore();
        
        // Ícone
        ctx.shadowBlur = 0;
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = p.done ? '#fff' : '#2c3e50';
        ctx.fillText(p.done ? '✓' : p.icon, p.x + 25, p.y + 30);
        
        if (!p.done && near(player, p, 100)) {
            ctx.fillStyle = 'rgba(255,215,0,0.95)';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText('⌨️ ESPAÇO', p.x + 25, p.y - 20);
        }
    });
}

function drawBoss() {
    const b = phase1Data.boss;
    if (!b.active || b.defeated) return;
    
    const shake = b.hp < 2 ? Math.sin(Date.now() / 50) * 4 : 0;
    const breathe = Math.sin(Date.now() / 500) * 3;
    
    ctx.shadowColor = '#8b0000';
    ctx.shadowBlur = 40;
    
    // Corpo
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(b.x + shake, b.y + breathe, b.w, b.h);
    
    // Chifres
    ctx.fillStyle = '#4a0000';
    ctx.beginPath();
    ctx.moveTo(b.x + 15 + shake, b.y + 10 + breathe);
    ctx.lineTo(b.x + 10 + shake, b.y - 10 + breathe);
    ctx.lineTo(b.x + 20 + shake, b.y + 10 + breathe);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(b.x + 65 + shake, b.y + 10 + breathe);
    ctx.lineTo(b.x + 70 + shake, b.y - 10 + breathe);
    ctx.lineTo(b.x + 60 + shake, b.y + 10 + breathe);
    ctx.fill();
    
    // Olhos
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(b.x + 20 + shake, b.y + 25 + breathe, 15, 15);
    ctx.fillRect(b.x + 45 + shake, b.y + 25 + breathe, 15, 15);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(b.x + 25 + shake, b.y + 30 + breathe, 5, 5);
    ctx.fillRect(b.x + 50 + shake, b.y + 30 + breathe, 5, 5);
    
    // Boca
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(b.x + 40 + shake, b.y + 55 + breathe, 20, 0, Math.PI);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // HP Bar
    const hpW = 100, hpH = 12;
    const hpX = b.x - 10 + shake, hpY = b.y - 25;
    
    ctx.fillStyle = 'rgba(0,0,0,0.9)';
    ctx.fillRect(hpX, hpY, hpW, hpH);
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(hpX, hpY, (hpW * b.hp) / b.maxHp, hpH);
    
    ctx.strokeStyle = '#8b0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(hpX, hpY, hpW, hpH);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText(`${b.hp}/${b.maxHp} HP`, b.x + 40 + shake, hpY + 9);
    
    if (near(player, b, 100)) {
        ctx.fillStyle = 'rgba(255,215,0,0.95)';
        ctx.font = 'bold 16px Rajdhani';
        ctx.fillText('⚔️ ATAQUE!', b.x + 40 + shake, b.y - 45);
    }
}

// ============================================
// INTERAÇÕES
// ============================================

function checkPhase1Interactions() {
    if (typeof gameState !== 'undefined' && gameState.paused) return;
    
    // Coruja
    const o = phase1Data.owl;
    if (near(player, o, 70) && !o.talked) {
        playSound('interact');
        const msgs = [
            '🦉 Bem-vindo à FORTALEZA DAS SENHAS, ' + (typeof gameState !== 'undefined' ? gameState.playerName : 'herói') + '!',
            'Eu sou a Comandante Coruja! 👑',
            'Esta fortaleza protege os segredos da internet! 🏰',
            'Um VILÃO tenta invadir com senhas fracas! 😱',
            'Fale com os GUARDAS (escudos coloridos)! 🛡️',
            'Resolva os 3 DESAFIOS (cristais)! 💎',
            'Depois enfrente o BOSS no portão! ⚔️'
        ];
        msgs.forEach((m, i) => setTimeout(() => showDialogue(m), i * 3500));
        o.talked = true;
    }
    
    // Guardas
    phase1Data.guards.forEach(g => {
        if (near(player, g, 60) && !g.talked) {
            playSound('interact');
            g.msg.forEach((m, i) => setTimeout(() => showDialogue(m), i * 2500));
            g.talked = true;
        }
    });

    // Puzzles
    phase1Data.puzzles.forEach((p, i) => {
        if (near(player, p, 80) && !p.done) {
            playSound('interact');
            showPuzzle(p, i, 1);
        }
    });

    // Boss
    const b = phase1Data.boss;
    if (b.active && !b.defeated && near(player, b, 90)) {
        b.hp--;
        playSound('bossHit');
        createExplosion(b.x + 40, b.y + 40, '#ff0000');
        
        if (b.hp <= 0) {
            b.defeated = true;
            phase1Data.bossDefeated = true;
            playSound('bossDefeat');
            if (typeof updateScore === 'function') updateScore(500);
            
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createExplosion(
                        b.x + 40 + (Math.random() - 0.5) * 40,
                        b.y + 40 + (Math.random() - 0.5) * 40,
                        i % 2 ? '#00ff41' : '#ffd700'
                    );
                }, i * 150);
            }
            
            showDialogue('🎊 VITÓRIA! Lord Senha Fraca expulso! Você é o HERÓI! 🏆👑');
            setTimeout(() => typeof completePhase === 'function' && completePhase(1), 3000);
        } else {
            const msgs = ['💥 PRIMEIRO GOLPE!', '⚡ SEGUNDO ATAQUE!', '🔥 GOLPE FINAL!'];
            showDialogue(msgs[b.maxHp - b.hp - 1]);
        }
    }
    
    // Ativar boss
    if (phase1Data.puzzles.every(p => p.done) && !b.active && !b.defeated) {
        b.active = true;
        showDialogue('🚨 Lord Senha Fraca ataca o portão! 🏰');
        setTimeout(() => showDialogue('⚔️ Chegue perto 3x para derrotá-lo! 💪'), 2500);
    }
}

// ============================================
// FUNÇÕES AUXILIARES OTIMIZADAS
// ============================================

function near(a, b, d = 50) {
    if (!a || !b) return false;
    const dx = (a.x || 0) - (b.x || 0);
    const dy = (a.y || 0) - (b.y || 0);
    return dx * dx + dy * dy < d * d;
}

function darken(color) {
    const hex = color.slice(1);
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * 0.7);
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * 0.7);
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * 0.7);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function playSound(type) {
    if (typeof audioManager !== 'undefined') {
        if (type === 'interact') audioManager.playInteract();
        else if (type === 'bossHit') audioManager.playBossHit();
        else if (type === 'bossDefeat') audioManager.playBossDefeat();
    }
}

// Inicializar paths ao carregar
initPaths();