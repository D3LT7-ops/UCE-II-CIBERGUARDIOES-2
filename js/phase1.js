// FASE 1: FORTALEZA DAS SENHAS - VERSÃO FUNCIONAL E OTIMIZADA

const phase1Data = {
    title: '🏰 FORTALEZA DAS SENHAS 🔐',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    // FORTALEZA
    fortress: {
        x: 400, y: 200, width: 200, height: 250,
        towers: [
            { x: 390, y: 180 },
            { x: 570, y: 180 },
            { x: 390, y: 410 },
            { x: 570, y: 410 }
        ]
    },
    
    // GUARDAS
    guards: [
        {
            x: 200, y: 250, width: 40, height: 50,
            name: 'Guarda Maiúscula',
            emoji: 'A',
            color: '#3498db',
            patrolStart: 200,
            patrolEnd: 350,
            patrolDir: 1,
            talked: false,
            dialogue: [
                '🛡️ Eu protejo as letras MAIÚSCULAS!',
                'Use A, B, C nas suas senhas! 💪'
            ]
        },
        {
            x: 650, y: 250, width: 40, height: 50,
            name: 'Guarda Minúscula',
            emoji: 'a',
            color: '#2ecc71',
            patrolStart: 650,
            patrolEnd: 800,
            patrolDir: 1,
            talked: false,
            dialogue: [
                '🛡️ Letras minúsculas também!',
                'Misture maiúsculas E minúsculas! 🔒'
            ]
        },
        {
            x: 200, y: 500, width: 40, height: 50,
            name: 'Guarda Números',
            emoji: '7',
            color: '#e67e22',
            patrolStart: 200,
            patrolEnd: 350,
            patrolDir: 1,
            talked: false,
            dialogue: [
                '🛡️ Números são importantes!',
                'Adicione 1, 2, 3, 4, 5! 🔢'
            ]
        },
        {
            x: 650, y: 500, width: 40, height: 50,
            name: 'Guarda Símbolos',
            emoji: '@',
            color: '#9b59b6',
            patrolStart: 650,
            patrolEnd: 800,
            patrolDir: 1,
            talked: false,
            dialogue: [
                '🛡️ Símbolos dão poder!',
                'Use @, #, !, $ para segurança! ⚡'
            ]
        },
        {
            x: 300, y: 150, width: 40, height: 50,
            name: 'Vigia Norte',
            emoji: '🔐',
            color: '#e74c3c',
            patrolStart: 300,
            patrolEnd: 350,
            patrolDir: 1,
            talked: false,
            dialogue: [
                '🗡️ Torre Norte vigiando!',
                'NUNCA conte sua senha! 🚫'
            ]
        },
        {
            x: 700, y: 150, width: 40, height: 50,
            name: 'Vigia Sul',
            emoji: '🔑',
            color: '#f39c12',
            patrolStart: 700,
            patrolEnd: 750,
            patrolDir: 1,
            talked: false,
            dialogue: [
                '🗡️ Torre Sul alerta!',
                'Senha diferente para cada lugar! 🌟'
            ]
        }
    ],
    
    // CORUJA COMANDANTE
    npcs: [
        {
            x: 500, y: 300, width: 60, height: 60,
            type: 'owl',
            name: 'Coruja Comandante',
            hasDialogue: true,
            talked: false,
            dialogue: [
                '🦉 Bem-vindo à FORTALEZA DAS SENHAS!',
                'Eu sou a Comandante Coruja! 👑',
                'Esta fortaleza protege os segredos da internet! 🏰',
                'Um VILÃO tenta invadir com senhas fracas! 😱',
                'Fale com os GUARDAS (escudos coloridos)! 🛡️',
                'Resolva os 3 DESAFIOS (cristais roxos)! 💎',
                'Depois enfrente o BOSS no portão! ⚔️'
            ]
        }
    ],
    
    // PUZZLES
    puzzles: [
        {
            x: 250, y: 350, width: 50, height: 50,
            completed: false,
            title: 'DESAFIO 1',
            icon: '🔐',
            question: 'Qual senha é IMPOSSÍVEL de hackear?',
            options: [
                { text: 'A) 123456', correct: false, feedback: '❌ Pior senha do mundo! Hackers tentam ela primeiro! 😱' },
                { text: 'B) senha', correct: false, feedback: '❌ Muito óbvia! 🚫' },
                { text: 'C) Fort3z@2025!', correct: true, feedback: '✅ PERFEITO! Maiúsculas, minúsculas, números E símbolos! 🏆⭐' },
                { text: 'D) meunome', correct: false, feedback: '❌ Hackers descobrem nomes fácil! 👎' }
            ]
        },
        {
            x: 750, y: 350, width: 50, height: 50,
            completed: false,
            title: 'DESAFIO 2',
            icon: '🧪',
            question: 'O que torna senha INDESTRUTÍVEL?',
            options: [
                { text: 'A) Ser curtinha', correct: false, feedback: '❌ Senhas curtas caem rápido! 🏰' },
                { text: 'B) Só aniversário', correct: false, feedback: '❌ Vilões descobrem online! 📅❌' },
                { text: 'C) Maiúsculas+minúsculas+números+símbolos', correct: true, feedback: '✅ Receita PERFEITA! 🌟🎉' },
                { text: 'D) Mesma em tudo', correct: false, feedback: '❌ Se cai uma, caem TODAS! 🔒' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            title: 'DESAFIO 3',
            icon: '⚖️',
            question: 'Quando PODE compartilhar senha?',
            options: [
                { text: 'A) Amigos da escola', correct: false, feedback: '❌ Podem contar sem querer! 🤐' },
                { text: 'B) Só pais/responsáveis', correct: true, feedback: '✅ CORRETO! Quem cuida de você! 👨‍👩‍👧✅' },
                { text: 'C) Se pedirem educado', correct: false, feedback: '❌ Honestos NUNCA pedem! ARMADILHA! 🚨' },
                { text: 'D) Por mensagem', correct: false, feedback: '❌ PERIGO! Hackers leem! 📱⛔' }
            ]
        }
    ],
    
    // BOSS
    boss: {
        x: 480, y: 470, width: 80, height: 80,
        name: 'LORD SENHA FRACA',
        active: false,
        defeated: false,
        hp: 3,
        maxHp: 3
    }
};

// ============================================
// FUNÇÕES DE DESENHO
// ============================================

function drawFortress() {
    const f = phase1Data.fortress;
    
    // Sombra da fortaleza
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    
    // Paredes principais
    ctx.fillStyle = '#7f8c8d';
    // Topo
    ctx.fillRect(f.x, f.y, f.width, 20);
    // Base
    ctx.fillRect(f.x, f.y + f.height - 20, f.width, 20);
    // Esquerda
    ctx.fillRect(f.x, f.y, 20, f.height);
    // Direita
    ctx.fillRect(f.x + f.width - 20, f.y, 20, f.height);
    
    // Torres
    ctx.fillStyle = '#95a5a6';
    f.towers.forEach(tower => {
        ctx.fillRect(tower.x, tower.y, 40, 60);
        
        // Ameias
        ctx.fillStyle = '#5d6d7e';
        ctx.fillRect(tower.x, tower.y - 8, 10, 8);
        ctx.fillRect(tower.x + 15, tower.y - 8, 10, 8);
        ctx.fillRect(tower.x + 30, tower.y - 8, 10, 8);
        ctx.fillStyle = '#95a5a6';
    });
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    
    // Bandeiras animadas
    const wave = Math.sin(Date.now() / 300) * 3;
    f.towers.forEach(tower => {
        const flagX = tower.x + 10;
        const flagY = tower.y;
        
        // Mastro
        ctx.fillStyle = '#34495e';
        ctx.fillRect(flagX, flagY - 30, 2, 30);
        
        // Bandeira
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(flagX, flagY - 30);
        ctx.lineTo(flagX + 20 + wave, flagY - 25);
        ctx.lineTo(flagX + 20 + wave, flagY - 15);
        ctx.lineTo(flagX, flagY - 20);
        ctx.closePath();
        ctx.fill();
    });
    
    // Portão
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(475, 430, 50, 25);
    
    // Detalhes do portão
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(485 + i * 15, 430);
        ctx.lineTo(485 + i * 15, 455);
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
    phase1Data.guards.forEach(guard => {
        // Patrulha
        guard.x += 0.5 * guard.patrolDir;
        if (guard.x >= guard.patrolEnd || guard.x <= guard.patrolStart) {
            guard.patrolDir *= -1;
        }
        
        const pulse = Math.sin(Date.now() / 400) * 2;
        
        // Brilho
        ctx.shadowColor = guard.color;
        ctx.shadowBlur = 15 + pulse;
        
        // Corpo
        ctx.fillStyle = guard.color;
        ctx.fillRect(guard.x, guard.y, guard.width, guard.height);
        
        // Capacete
        ctx.fillStyle = '#34495e';
        ctx.beginPath();
        ctx.arc(guard.x + 20, guard.y + 10, 12, Math.PI, 0);
        ctx.fill();
        
        // Visor
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(guard.x + 10, guard.y + 8, 20, 6);
        
        // Escudo
        ctx.fillStyle = guard.color;
        ctx.beginPath();
        ctx.moveTo(guard.x + 20, guard.y + 20);
        ctx.lineTo(guard.x + 8, guard.y + 28);
        ctx.lineTo(guard.x + 8, guard.y + 38);
        ctx.lineTo(guard.x + 20, guard.y + 46);
        ctx.lineTo(guard.x + 32, guard.y + 38);
        ctx.lineTo(guard.x + 32, guard.y + 28);
        ctx.closePath();
        ctx.fill();
        
        // Borda do escudo
        const darkerColor = darkenColor(guard.color);
        ctx.strokeStyle = darkerColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Emoji no escudo
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(guard.emoji, guard.x + 20, guard.y + 38);
        
        // Indicador de interação
        if (!guard.talked && isNear(player, guard, 70)) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.font = 'bold 11px Rajdhani';
            ctx.fillText('ESPAÇO', guard.x + 20, guard.y - 15);
        }
    });
}

function drawPhase1NPCs() {
    phase1Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#f39c12';
        ctx.shadowBlur = 20;
        
        // Corpo da coruja
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(npc.x + 30, npc.y + 30, 25 + pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Coroa
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.moveTo(npc.x + 15, npc.y + 10);
        ctx.lineTo(npc.x + 30, npc.y + 5);
        ctx.lineTo(npc.x + 45, npc.y + 10);
        ctx.lineTo(npc.x + 30, npc.y + 15);
        ctx.closePath();
        ctx.fill();
        
        // Joia da coroa
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(npc.x + 30, npc.y + 8, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Olhos
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(npc.x + 22, npc.y + 25, 9, 0, Math.PI * 2);
        ctx.arc(npc.x + 38, npc.y + 25, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupilas
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(npc.x + 22, npc.y + 25, 4, 0, Math.PI * 2);
        ctx.arc(npc.x + 38, npc.y + 25, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Brilho nos olhos
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(npc.x + 23, npc.y + 24, 2, 0, Math.PI * 2);
        ctx.arc(npc.x + 39, npc.y + 24, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Bico
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.moveTo(npc.x + 30, npc.y + 30);
        ctx.lineTo(npc.x + 25, npc.y + 36);
        ctx.lineTo(npc.x + 35, npc.y + 36);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        // Indicador
        if (!npc.talked && isNear(player, npc, 80)) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.font = 'bold 12px Rajdhani';
            ctx.textAlign = 'center';
            ctx.fillText('FALE COMIGO', npc.x + 30, npc.y + 75);
        }
    });
}

function drawPhase1Puzzles() {
    phase1Data.puzzles.forEach((puzzle, index) => {
        const pulse = Math.sin(Date.now() / 400 + index) * 6;
        const rotation = (Date.now() / 2000 + index) % (Math.PI * 2);
        
        ctx.save();
        ctx.translate(puzzle.x + 25, puzzle.y + 25);
        ctx.rotate(rotation * 0.3);
        
        if (puzzle.completed) {
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 25 + pulse;
            ctx.fillStyle = '#00ff41';
        } else {
            ctx.shadowColor = '#9b59b6';
            ctx.shadowBlur = 20 + pulse;
            ctx.fillStyle = '#9b59b6';
        }
        
        // Diamante
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(25, 0);
        ctx.lineTo(0, 25);
        ctx.lineTo(-25, 0);
        ctx.closePath();
        ctx.fill();
        
        // Brilho interno
        ctx.fillStyle = puzzle.completed ? 'rgba(0, 255, 65, 0.4)' : 'rgba(195, 155, 211, 0.5)';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(15, 0);
        ctx.lineTo(0, 15);
        ctx.lineTo(-15, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        // Ícone
        ctx.shadowBlur = 0;
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = puzzle.completed ? '#fff' : '#2c3e50';
        ctx.fillText(puzzle.completed ? '✓' : puzzle.icon, puzzle.x + 25, puzzle.y + 30);
        
        // Indicador
        if (!puzzle.completed && isNear(player, puzzle, 100)) {
            const bounce = Math.abs(Math.sin(Date.now() / 300)) * 3;
            ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText('⌨️ ESPAÇO', puzzle.x + 25, puzzle.y - 20 - bounce);
        }
    });
}

function drawPhase1Boss() {
    const boss = phase1Data.boss;
    if (!boss.active || boss.defeated) return;
    
    const shake = boss.hp < 2 ? Math.sin(Date.now() / 50) * 4 : 0;
    const breathe = Math.sin(Date.now() / 500) * 3;
    
    ctx.shadowColor = '#8b0000';
    ctx.shadowBlur = 40;
    
    // Corpo
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(boss.x + shake, boss.y + breathe, boss.width, boss.height);
    
    // Chifres
    ctx.fillStyle = '#4a0000';
    ctx.beginPath();
    ctx.moveTo(boss.x + 15 + shake, boss.y + 10 + breathe);
    ctx.lineTo(boss.x + 10 + shake, boss.y - 10 + breathe);
    ctx.lineTo(boss.x + 20 + shake, boss.y + 10 + breathe);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(boss.x + 65 + shake, boss.y + 10 + breathe);
    ctx.lineTo(boss.x + 70 + shake, boss.y - 10 + breathe);
    ctx.lineTo(boss.x + 60 + shake, boss.y + 10 + breathe);
    ctx.closePath();
    ctx.fill();
    
    // Olhos
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(boss.x + 20 + shake, boss.y + 25 + breathe, 15, 15);
    ctx.fillRect(boss.x + 45 + shake, boss.y + 25 + breathe, 15, 15);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(boss.x + 25 + shake, boss.y + 30 + breathe, 5, 5);
    ctx.fillRect(boss.x + 50 + shake, boss.y + 30 + breathe, 5, 5);
    
    // Boca
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(boss.x + 40 + shake, boss.y + 55 + breathe, 20, 0, Math.PI);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Barra de HP
    const hpBarWidth = 100;
    const hpBarHeight = 12;
    const hpBarX = boss.x - 10 + shake;
    const hpBarY = boss.y - 25;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    
    ctx.fillStyle = '#ff0000';
    const hpWidth = (hpBarWidth * boss.hp) / boss.maxHp;
    ctx.fillRect(hpBarX, hpBarY, hpWidth, hpBarHeight);
    
    ctx.strokeStyle = '#8b0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText(`${boss.hp}/${boss.maxHp} HP`, boss.x + 40 + shake, hpBarY + 9);
    
    // Nome
    ctx.font = 'bold 12px Rajdhani';
    ctx.fillStyle = '#ff6b6b';
    ctx.fillText('👹 ' + boss.name, boss.x + 40 + shake, hpBarY - 8);
    
    // Indicador de ataque
    if (isNear(player, boss, 100)) {
        const bounce = Math.abs(Math.sin(Date.now() / 250)) * 4;
        ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
        ctx.font = 'bold 16px Rajdhani';
        ctx.fillText('⚔️ ATAQUE!', boss.x + 40 + shake, boss.y - 45 - bounce);
    }
}

// ============================================
// INTERAÇÕES
// ============================================

function checkPhase1Interactions() {
    if (typeof gameState !== 'undefined' && gameState.paused) return;
    
    // Coruja Comandante
    phase1Data.npcs.forEach(npc => {
        if (isNear(player, npc, 70) && !npc.talked) {
            if (typeof audioManager !== 'undefined') audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3500);
            });
            npc.talked = true;
        }
    });
    
    // Guardas
    phase1Data.guards.forEach(guard => {
        if (isNear(player, guard, 60) && !guard.talked) {
            if (typeof audioManager !== 'undefined') audioManager.playInteract();
            guard.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 2500);
            });
            guard.talked = true;
        }
    });

    // Puzzles
    phase1Data.puzzles.forEach((puzzle, index) => {
        if (isNear(player, puzzle, 80) && !puzzle.completed) {
            if (typeof audioManager !== 'undefined') audioManager.playInteract();
            showPuzzle(puzzle, index, 1);
        }
    });

    // Boss
    const boss = phase1Data.boss;
    if (boss.active && !boss.defeated && isNear(player, boss, 90)) {
        boss.hp--;
        
        if (typeof audioManager !== 'undefined') audioManager.playBossHit();
        createExplosion(boss.x + 40, boss.y + 40, '#ff0000');
        
        if (boss.hp <= 0) {
            boss.defeated = true;
            phase1Data.bossDefeated = true;
            
            if (typeof audioManager !== 'undefined') audioManager.playBossDefeat();
            if (typeof updateScore === 'function') updateScore(500);
            
            // Explosões de vitória
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createExplosion(
                        boss.x + 40 + (Math.random() - 0.5) * 40,
                        boss.y + 40 + (Math.random() - 0.5) * 40,
                        i % 2 === 0 ? '#00ff41' : '#ffd700'
                    );
                }, i * 150);
            }
            
            showDialogue('🎊 VITÓRIA! Lord Senha Fraca foi expulso! Você é o HERÓI! 🏆👑');
            setTimeout(() => {
                if (typeof completePhase === 'function') completePhase(1);
            }, 3000);
            
        } else {
            const messages = [
                '💥 PRIMEIRO GOLPE! O vilão está tremendo!',
                '⚡ SEGUNDO ATAQUE! Mais um e você vence!',
                '🔥 GOLPE FINAL!'
            ];
            const msgIndex = boss.maxHp - boss.hp - 1;
            showDialogue(messages[msgIndex]);
        }
    }
    
    // Ativar boss quando completar todos os puzzles
    const allCompleted = phase1Data.puzzles.every(p => p.completed);
    if (allCompleted && !boss.active && !boss.defeated) {
        activatePhase1Boss();
    }
}

function activatePhase1Boss() {
    phase1Data.boss.active = true;
    showDialogue('🚨 ALERTA MÁXIMO! Lord Senha Fraca está atacando o portão da fortaleza! 🏰');
    setTimeout(() => {
        showDialogue('⚔️ Chegue perto dele 3 vezes para derrotá-lo e salvar a fortaleza! 💪');
    }, 2500);
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function isNear(obj1, obj2, distance = 50) {
    if (!obj1 || !obj2) return false;
    const dx = (obj1.x || 0) - (obj2.x || 0);
    const dy = (obj1.y || 0) - (obj2.y || 0);
    return Math.sqrt(dx * dx + dy * dy) < distance;
}

function darkenColor(color) {
    const hex = color.replace('#', '');
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * 0.7);
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * 0.7);
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * 0.7);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}