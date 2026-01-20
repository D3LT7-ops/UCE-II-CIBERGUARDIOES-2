// FASE 1: FORTALEZA DAS SENHAS - VERSÃO COM FORTALEZA E GUARDAS

const phase1Data = {
    title: '🏰 FORTALEZA DAS SENHAS 🔐',
    subtitle: 'Proteja a fortaleza com senhas super fortes!',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    // FORTALEZA PRINCIPAL
    fortress: {
        x: 400, y: 200, width: 200, height: 250,
        walls: [
            { x: 400, y: 200, width: 200, height: 20 }, // topo
            { x: 400, y: 430, width: 200, height: 20 }, // base
            { x: 400, y: 200, width: 20, height: 250 }, // esquerda
            { x: 580, y: 200, width: 20, height: 250 }  // direita
        ],
        towers: [
            { x: 390, y: 180, width: 40, height: 60 }, // torre esquerda superior
            { x: 570, y: 180, width: 40, height: 60 }, // torre direita superior
            { x: 390, y: 410, width: 40, height: 60 }, // torre esquerda inferior
            { x: 570, y: 410, width: 40, height: 60 }  // torre direita inferior
        ],
        gate: { x: 475, y: 430, width: 50, height: 25 },
        flags: [
            { x: 410, y: 180 }, { x: 590, y: 180 },
            { x: 410, y: 410 }, { x: 590, y: 410 }
        ]
    },
    
    // GUARDAS DA FORTALEZA
    guards: [
        {
            x: 200, y: 250, width: 40, height: 50,
            name: 'Guarda Letra Maiúscula',
            icon: '🛡️',
            emoji: 'A',
            color: '#3498db',
            patrol: { startX: 200, endX: 350, speed: 0.5, direction: 1 },
            hasDialogue: true,
            dialogue: [
                '🛡️ Eu sou o Guarda das Letras MAIÚSCULAS!',
                'Senhas fortes sempre usam letras grandes: A, B, C! 💪'
            ],
            talked: false
        },
        {
            x: 650, y: 250, width: 40, height: 50,
            name: 'Guarda Letra Minúscula',
            icon: '🛡️',
            emoji: 'a',
            color: '#2ecc71',
            patrol: { startX: 650, endX: 800, speed: 0.5, direction: 1 },
            hasDialogue: true,
            dialogue: [
                '🛡️ Eu protejo as letras minúsculas!',
                'Misture maiúsculas E minúsculas para senhas fortes! 🔒'
            ],
            talked: false
        },
        {
            x: 200, y: 500, width: 40, height: 50,
            name: 'Guarda dos Números',
            icon: '🛡️',
            emoji: '7',
            color: '#e67e22',
            patrol: { startX: 200, endX: 350, speed: 0.6, direction: 1 },
            hasDialogue: true,
            dialogue: [
                '🛡️ Eu defendo os NÚMEROS sagrados!',
                'Adicione números na sua senha: 1, 2, 3, 4, 5! 🔢'
            ],
            talked: false
        },
        {
            x: 650, y: 500, width: 40, height: 50,
            name: 'Guarda dos Símbolos',
            icon: '🛡️',
            emoji: '@',
            color: '#9b59b6',
            patrol: { startX: 650, endX: 800, speed: 0.6, direction: 1 },
            hasDialogue: true,
            dialogue: [
                '🛡️ Símbolos são minha especialidade!',
                'Use @, #, !, $ para deixar tudo mais seguro! ⚡'
            ],
            talked: false
        },
        {
            x: 300, y: 150, width: 40, height: 50,
            name: 'Guarda da Torre Norte',
            icon: '🗡️',
            emoji: '🔐',
            color: '#e74c3c',
            patrol: { startX: 300, endX: 350, speed: 0.3, direction: 1 },
            hasDialogue: true,
            dialogue: [
                '🗡️ Vigia da Torre Norte aqui!',
                'NUNCA conte sua senha para estranhos! 🚫'
            ],
            talked: false
        },
        {
            x: 700, y: 150, width: 40, height: 50,
            name: 'Guarda da Torre Sul',
            icon: '🗡️',
            emoji: '🔑',
            color: '#f39c12',
            patrol: { startX: 700, endX: 750, speed: 0.3, direction: 1 },
            hasDialogue: true,
            dialogue: [
                '🗡️ Vigia da Torre Sul reportando!',
                'Use senhas DIFERENTES para cada lugar! 🌟'
            ],
            talked: false
        }
    ],
    
    // NPC PRINCIPAL - Coruja Comandante
    npcs: [
        {
            x: 500, y: 300, width: 60, height: 60,
            type: 'owl',
            name: 'Coruja Comandante',
            hasDialogue: true,
            dialogue: [
                '🦉 Bem-vindo à FORTALEZA DAS SENHAS, ' + (typeof gameState !== 'undefined' ? gameState.playerName : 'herói') + '!',
                'Eu sou a Comandante Coruja Cyber! 👑',
                'Esta fortaleza protege todos os segredos da internet! 🏰',
                'Mas um VILÃO está tentando invadir com senhas fracas! 😱',
                'Fale com meus GUARDAS (escudos coloridos) para aprender sobre senhas! 🛡️',
                'Depois, resolva os 3 DESAFIOS (cristais brilhantes)! 💎',
                'Quando estiver pronto, enfrente o BOSS no portão! ⚔️'
            ],
            talked: false,
            animationFrame: 0
        }
    ],
    
    // CRISTAIS DE DESAFIO
    puzzles: [
        {
            x: 250, y: 350, width: 50, height: 50,
            completed: false,
            title: 'DESAFIO 1: Escolha a Senha Forte',
            icon: '🔐',
            question: 'Qual dessas senhas é IMPOSSÍVEL de hackear?',
            hint: '💡 Dica: Procure a que tem TUDO misturado!',
            options: [
                { 
                    text: 'A) 123456', 
                    correct: false, 
                    feedback: '❌ Essa é a PIOR senha do mundo! Hackers tentam ela primeiro! 😱'
                },
                { 
                    text: 'B) senha', 
                    correct: false, 
                    feedback: '❌ Muito óbvia! Os guardas não aprovam! 🚫'
                },
                { 
                    text: 'C) Fort3z@2025!', 
                    correct: true, 
                    feedback: '✅ PERFEITO! Tem Maiúsculas, minúsculas, números E símbolos! Os guardas estão orgulhosos! 🏆⭐'
                },
                { 
                    text: 'D) meunome', 
                    correct: false, 
                    feedback: '❌ Muito perigoso! Hackers descobrem nomes fácil! 👎'
                }
            ]
        },
        {
            x: 750, y: 350, width: 50, height: 50,
            completed: false,
            title: 'DESAFIO 2: Ingredientes Secretos',
            icon: '🧪',
            question: 'O que torna uma senha INDESTRUTÍVEL?',
            hint: '💡 Dica: Pense no que os guardas te ensinaram!',
            options: [
                { 
                    text: 'A) Ser bem curtinha (3 letras)', 
                    correct: false, 
                    feedback: '❌ Não! Senhas curtas caem rápido! A fortaleza precisa de muros ALTOS! 🏰'
                },
                { 
                    text: 'B) Só meu aniversário', 
                    correct: false, 
                    feedback: '❌ Vilões procuram aniversários online! Os guardas dizem NÃO! 📅❌'
                },
                { 
                    text: 'C) Maiúsculas + minúsculas + números + símbolos!', 
                    correct: true, 
                    feedback: '✅ ISSO! Você ouviu TODOS os guardas! Essa é a receita da senha PERFEITA! 🌟🎉'
                },
                { 
                    text: 'D) Mesma senha em todos os lugares', 
                    correct: false, 
                    feedback: '❌ PÉSSIMA ideia! Se caiu uma fortaleza, caíram TODAS! Use senhas únicas! 🔒'
                }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            title: 'DESAFIO 3: Lei da Fortaleza',
            icon: '⚖️',
            question: 'Quando você PODE compartilhar sua senha?',
            hint: '💡 Dica: Pense em quem PROTEGE você!',
            options: [
                { 
                    text: 'A) Com meus amigos da escola', 
                    correct: false, 
                    feedback: '❌ NEGATIVO! Amigos podem contar sem querer! Senha é ultra-secreto! 🤐'
                },
                { 
                    text: 'B) Só com pais/responsáveis', 
                    correct: true, 
                    feedback: '✅ CORRETO! Apenas adultos que cuidam de você! A Comandante aprova! 👨‍👩‍👧✅'
                },
                { 
                    text: 'C) Se pedirem com educação', 
                    correct: false, 
                    feedback: '❌ ALERTA! Pessoas honestas NUNCA pedem senhas! Isso é ARMADILHA! 🚨'
                },
                { 
                    text: 'D) Por mensagem ou email', 
                    correct: false, 
                    feedback: '❌ PERIGO MÁXIMO! Hackers leem mensagens! NUNCA faça isso! 📱⛔'
                }
            ]
        }
    ],
    
    // BOSS - VILÃO NO PORTÃO
    boss: {
        x: 480, y: 470, width: 80, height: 80,
        name: '👹 LORD SENHA FRACA',
        active: false, 
        defeated: false, 
        hp: 3, 
        maxHp: 3,
        attackMessages: [
            '💥 PRIMEIRO GOLPE! O vilão está tremendo!',
            '⚡ SEGUNDO ATAQUE! Ele está quase derrotado!',
            '🔥 GOLPE FINAL! A fortaleza está SALVA!'
        ],
        defeatMessage: '🎊 VITÓRIA ÉPICA! Lord Senha Fraca foi expulso da fortaleza! Você é o HERÓI! 🏆👑'
    }
};

// ============================================
// DESENHO DA FORTALEZA
// ============================================

function drawFortress() {
    const fort = phase1Data.fortress;
    
    // Sombra da fortaleza
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    
    // Paredes principais - pedra cinza
    ctx.fillStyle = '#7f8c8d';
    fort.walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
    
    // Torres com gradiente
    const towerGradient = ctx.createLinearGradient(0, 180, 0, 250);
    towerGradient.addColorStop(0, '#95a5a6');
    towerGradient.addColorStop(1, '#7f8c8d');
    
    ctx.fillStyle = towerGradient;
    fort.towers.forEach(tower => {
        ctx.fillRect(tower.x, tower.y, tower.width, tower.height);
        
        // Ameias no topo das torres
        ctx.fillStyle = '#5d6d7e';
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(tower.x + i * 15, tower.y - 8, 10, 8);
        }
        ctx.fillStyle = towerGradient;
    });
    
    ctx.shadowBlur = 0;
    
    // Bandeiras nas torres (animadas)
    const flagWave = Math.sin(Date.now() / 300) * 3;
    fort.flags.forEach(flag => {
        // Mastro
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(flag.x, flag.y);
        ctx.lineTo(flag.x, flag.y - 30);
        ctx.stroke();
        
        // Bandeira ondulando
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(flag.x, flag.y - 30);
        ctx.lineTo(flag.x + 20 + flagWave, flag.y - 25);
        ctx.lineTo(flag.x + 20 + flagWave, flag.y - 15);
        ctx.lineTo(flag.x, flag.y - 20);
        ctx.closePath();
        ctx.fill();
        
        // Símbolo na bandeira
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px Arial';
        ctx.fillText('🔐', flag.x + 8, flag.y - 20);
    });
    
    // Portão da fortaleza
    const gate = fort.gate;
    const gateGradient = ctx.createLinearGradient(gate.x, gate.y, gate.x, gate.y + gate.height);
    gateGradient.addColorStop(0, '#8b4513');
    gateGradient.addColorStop(1, '#654321');
    
    ctx.fillStyle = gateGradient;
    ctx.fillRect(gate.x, gate.y, gate.width, gate.height);
    
    // Detalhes do portão
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(gate.x + 10 + i * 15, gate.y);
        ctx.lineTo(gate.x + 10 + i * 15, gate.y + gate.height);
        ctx.stroke();
    }
    
    // Detalhes de pedra nas paredes
    ctx.fillStyle = 'rgba(52, 73, 94, 0.3)';
    for (let i = 0; i < 15; i++) {
        const x = 410 + (i % 5) * 35;
        const y = 210 + Math.floor(i / 5) * 40;
        ctx.fillRect(x, y, 30, 30);
    }
    
    // Janelas nas torres
    ctx.fillStyle = '#34495e';
    fort.towers.forEach(tower => {
        ctx.fillRect(tower.x + 12, tower.y + 15, 16, 20);
        // Cruz na janela
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tower.x + 20, tower.y + 15);
        ctx.lineTo(tower.x + 20, tower.y + 35);
        ctx.moveTo(tower.x + 12, tower.y + 25);
        ctx.lineTo(tower.x + 28, tower.y + 25);
        ctx.stroke();
    });
    
    // Nome da fortaleza no topo
    ctx.fillStyle = '#ecf0f1';
    ctx.font = 'bold 20px Orbitron';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 3;
    ctx.strokeText('⚔️ FORTALEZA DAS SENHAS ⚔️', 500, 170);
    ctx.fillText('⚔️ FORTALEZA DAS SENHAS ⚔️', 500, 170);
}

// ============================================
// DESENHO DOS GUARDAS
// ============================================

function drawGuards() {
    phase1Data.guards.forEach(guard => {
        // Patrulha automática
        if (guard.patrol) {
            guard.x += guard.patrol.speed * guard.patrol.direction;
            if (guard.x >= guard.patrol.endX || guard.x <= guard.patrol.startX) {
                guard.patrol.direction *= -1;
            }
        }
        
        const pulse = Math.sin(Date.now() / 400) * 2;
        
        // Brilho do guarda
        ctx.shadowColor = guard.color;
        ctx.shadowBlur = 15 + pulse;
        
        // Corpo do guarda (retângulo com gradiente)
        const bodyGradient = ctx.createLinearGradient(
            guard.x, guard.y,
            guard.x, guard.y + guard.height
        );
        bodyGradient.addColorStop(0, guard.color);
        bodyGradient.addColorStop(1, darkenColor(guard.color, 0.3));
        
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(guard.x, guard.y, guard.width, guard.height);
        
        // Capacete
        ctx.fillStyle = '#34495e';
        ctx.beginPath();
        ctx.arc(guard.x + 20, guard.y + 10, 12, Math.PI, 0);
        ctx.fill();
        
        // Visor do capacete
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
        ctx.strokeStyle = darkenColor(guard.color, 0.4);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Símbolo no escudo
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(guard.emoji, guard.x + 20, guard.y + 38);
        
        ctx.shadowBlur = 0;
        
        // Ícone flutuante acima
        const bounce = Math.abs(Math.sin(Date.now() / 500)) * 4;
        ctx.font = 'bold 18px Arial';
        ctx.fillText(guard.icon, guard.x + 20, guard.y - 10 - bounce);
        
        // Indicador de interação
        if (!guard.talked && isNear(player, guard, 70)) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.font = 'bold 11px Rajdhani';
            ctx.fillText('ESPAÇO', guard.x + 20, guard.y - 25);
        }
        
        // Mostrar nome quando perto
        if (isNear(player, guard, 100)) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(guard.x - 20, guard.y + 55, 80, 20);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 9px Rajdhani';
            ctx.fillText(guard.name.substring(0, 20), guard.x + 20, guard.y + 68);
        }
    });
}

// ============================================
// DESENHO DO NPC PRINCIPAL (CORUJA)
// ============================================

function drawPhase1NPCs() {
    phase1Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#f39c12';
        ctx.shadowBlur = 20;
        
        // Corpo da coruja maior
        const gradient = ctx.createRadialGradient(
            npc.x + 30, npc.y + 25, 5,
            npc.x + 30, npc.y + 30, 30
        );
        gradient.addColorStop(0, '#f9ca79');
        gradient.addColorStop(1, '#f39c12');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(npc.x + 30, npc.y + 30, 25 + pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Coroa de comandante
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.moveTo(npc.x + 15, npc.y + 10);
        ctx.lineTo(npc.x + 20, npc.y + 5);
        ctx.lineTo(npc.x + 25, npc.y + 10);
        ctx.lineTo(npc.x + 30, npc.y + 5);
        ctx.lineTo(npc.x + 35, npc.y + 10);
        ctx.lineTo(npc.x + 40, npc.y + 5);
        ctx.lineTo(npc.x + 45, npc.y + 10);
        ctx.lineTo(npc.x + 30, npc.y + 15);
        ctx.closePath();
        ctx.fill();
        
        // Joia na coroa
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(npc.x + 30, npc.y + 8, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Olhos grandes
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

// ============================================
// DESENHO DOS PUZZLES
// ============================================

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
        
        // Cristal diamante
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(25, 0);
        ctx.lineTo(0, 25);
        ctx.lineTo(-25, 0);
        ctx.closePath();
        ctx.fill();
        
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
        ctx.fillStyle = puzzle.completed ? '#fff' : '#2c3e50';
        ctx.fillText(puzzle.completed ? '✓' : puzzle.icon, puzzle.x + 25, puzzle.y + 25);
        
        // Indicador
        if (!puzzle.completed && isNear(player, puzzle, 100)) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText('⌨️ ESPAÇO', puzzle.x + 25, puzzle.y - 20);
        }
    });
}

// ============================================
// DESENHO DO BOSS
// ============================================

function drawPhase1Boss() {
    if (!phase1Data.boss.active || phase1Data.boss.defeated) return;
    
    const boss = phase1Data.boss;
    const shake = boss.hp < 2 ? Math.sin(Date.now() / 50) * 4 : 0;
    const breathe = Math.sin(Date.now() / 500) * 3;
    
    ctx.shadowColor = '#8b0000';
    ctx.shadowBlur = 40;
    
    // Corpo do vilão
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
    
    // Olhos malignos
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(boss.x + 20 + shake, boss.y + 25 + breathe, 15, 15);
    ctx.fillRect(boss.x + 45 + shake, boss.y + 25 + breathe, 15, 15);
    
    // Pupilas
    ctx.fillStyle = '#000';
    ctx.fillRect(boss.x + 25 + shake, boss.y + 30 + breathe, 5, 5);
    ctx.fillRect(boss.x + 50 + shake, boss.y + 30 + breathe, 5, 5);
    
    // Boca maligna
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(boss.x + 40 + shake, boss.y + 55 + breathe, 20, 0, Math.PI);
    ctx.stroke();
    
    // Barra de HP
    ctx.shadowBlur = 0;
    const hpBarWidth = 100;
    const hpBarHeight = 12;
    const hpBarX = boss.x - 10 + shake;
    const hpBarY = boss.y - 25;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    
    ctx.fillStyle = boss.hp > 1 ? '#ff0000' : '#ff6b6b';
    const hpWidth = (hpBarWidth * boss.hp) / boss.maxHp;
    ctx.fillRect(hpBarX, hpBarY, hpWidth, hpBarHeight);
    
    ctx.strokeStyle = '#8b0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText(`${boss.hp}/${boss.maxHp} HP`, boss.x + 40 + shake, hpBarY + 9);
    
    // Nome do boss
    ctx.font = 'bold 12px Rajdhani';
    ctx.fillStyle = '#ff6b6b';
    ctx.fillText(boss.name, boss.x + 40 + shake, hpBarY - 8);
    
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
        if (isNear(player, npc, 70) && npc.hasDialogue && !npc.talked) {
            if (typeof audioManager !== 'undefined') audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 4000);
            });
            npc.talked = true;
        }
    });
    
    // Guardas
    phase1Data.guards.forEach(guard => {
        if (isNear(player, guard, 60) && guard.hasDialogue && !guard.talked) {
            if (typeof audioManager !== 'undefined') audioManager.playInteract();
            guard.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3000);
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
    if (phase1Data.boss.active && !phase1Data.boss.defeated && isNear(player, phase1Data.boss, 90)) {
        phase1Data.boss.hp--;
        
        if (typeof audioManager !== 'undefined') audioManager.playBossHit();
        createExplosion(phase1Data.boss.x + 40, phase1Data.boss.y + 40, '#ff0000');
        
        if (phase1Data.boss.hp <= 0) {
            phase1Data.boss.defeated = true;
            phase1Data.bossDefeated = true;
            
            if (typeof audioManager !== 'undefined') audioManager.playBossDefeat();
            if (typeof updateScore === 'function') updateScore(500);
            
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createExplosion(
                        phase1Data.boss.x + 40 + (Math.random() - 0.5) * 40,
                        phase1Data.boss.y + 40 + (Math.random() - 0.5) * 40,
                        i % 2 === 0 ? '#00ff41' : '#ffd700'
                    );
                }, i * 150);
            }
            
            showDialogue(phase1Data.boss.defeatMessage);
            setTimeout(() => {
                if (typeof completePhase === 'function') completePhase(1);
            }, 3000);
            
        } else {
            const messageIndex = phase1Data.boss.maxHp - phase1Data.boss.hp - 1;
            showDialogue(phase1Data.boss.attackMessages[messageIndex]);
        }
    }
    
    // Ativar boss quando completar puzzles
    const allPuzzlesCompleted = phase1Data.puzzles.every(p => p.completed);
    if (allPuzzlesCompleted && !phase1Data.boss.active && !phase1Data.boss.defeated) {
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

// Função auxiliar para escurecer cores
function darkenColor(color, factor) {
    const hex = color.replace('#', '');
    const r = Math.floor(parseInt(hex.substr(0, 2), 16) * (1 - factor));
    const g = Math.floor(parseInt(hex.substr(2, 2), 16) * (1 - factor));
    const b = Math.floor(parseInt(hex.substr(4, 2), 16) * (1 - factor));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Função auxiliar para verificar proximidade
function isNear(obj1, obj2, distance = 50) {
    if (!obj1 || !obj2) return false;
    const dx = (obj1.x || 0) - (obj2.x || 0);
    const dy = (obj1.y || 0) - (obj2.y || 0);
    return Math.sqrt(dx * dx + dy * dy) < distance;
}