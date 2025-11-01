// FASE 1: FORTALEZA DAS SENHAS
const phase1Data = {
    title: '◢ FORTALEZA DAS SENHAS ◣',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    npcs: [
        {
            x: 500, y: 300, width: 50, height: 50,
            type: 'owl',
            name: 'Cyber Owl',
            hasDialogue: true,
            dialogue: [
                '🦉 Saudações, ' + gameState.playerName + '. Eu sou Cyber Owl, sua IA mentora.',
                'A Fortaleza das Senhas é o primeiro teste. Aqui você aprenderá a criar defesas impenetráveis.',
                'Senhas fracas são vulnerabilidades no sistema. Hackers exploram essas falhas.',
                'Localize os nódulos de dados (cristais roxos) e resolva os desafios para fortalecer suas habilidades.'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            x: 200, y: 550, width: 50, height: 50,
            completed: false,
            question: 'ANÁLISE DE SENHA: Qual destas é a mais SEGURA?',
            options: [
                { text: '123456', correct: false, feedback: 'FALHA DE SEGURANÇA! Esta senha é crackeada em menos de 1 segundo.' },
                { text: 'senha123', correct: false, feedback: 'VULNERÁVEL! Palavras comuns são encontradas em dicionários de ataque.' },
                { text: 'C1b3r@Grd#2025!Sx', correct: true, feedback: 'ACESSO CONCEDIDO! Senha forte: 16 caracteres, maiúsculas, minúsculas, números e símbolos.' },
                { text: 'maria2010', correct: false, feedback: 'RISCO ALTO! Informações pessoais são facilmente descobertas em redes sociais.' }
            ]
        },
        {
            x: 800, y: 550, width: 50, height: 50,
            completed: false,
            question: 'PROTOCOLO DE SEGURANÇA: O que torna uma senha FORTE?',
            options: [
                { text: 'Curta e memorável', correct: false, feedback: 'NEGATIVO! Senhas curtas têm menos combinações possíveis.' },
                { text: 'Usar nome + data de nascimento', correct: false, feedback: 'CRÍTICO! Dados públicos são o primeiro alvo dos hackers.' },
                { text: 'Mínimo 12 caracteres: letras, números, símbolos', correct: true, feedback: 'CORRETO! Complexidade = Segurança exponencial.' },
                { text: 'Mesma senha em todos os sites', correct: false, feedback: 'CATASTRÓFICO! Um vazamento compromete todas as contas.' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            question: 'POLÍTICA DE ACESSO: Quando compartilhar sua senha?',
            options: [
                { text: 'Com amigos próximos', correct: false, feedback: 'NEGADO! Confiança não é criptografia.' },
                { text: 'Apenas com pais/responsáveis', correct: true, feedback: 'AUTORIZADO! Menores devem ter supervisão adulta responsável.' },
                { text: 'Se pedirem educadamente online', correct: false, feedback: 'ALERTA VERMELHO! Isto é uma tática de engenharia social!' },
                { text: 'Por mensagem privada', correct: false, feedback: 'FALHA! Mensagens podem ser interceptadas ou hackeadas.' }
            ]
        }
    ],
    
    boss: {
        x: 900, y: 150, width: 60, height: 60,
        active: false, defeated: false, hp: 3, maxHp: 3
    }
};

function drawPhase1NPCs() {
    phase1Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#f39c12';
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 20 + pulse, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(npc.x + 18, npc.y + 20, 7, 0, Math.PI * 2);
        ctx.arc(npc.x + 32, npc.y + 20, 7, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(npc.x + 18, npc.y + 20, 3, 0, Math.PI * 2);
        ctx.arc(npc.x + 32, npc.y + 20, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.moveTo(npc.x + 25, npc.y + 26);
        ctx.lineTo(npc.x + 20, npc.y + 32);
        ctx.lineTo(npc.x + 30, npc.y + 32);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(243, 156, 18, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 28, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
    });
}

function drawPhase1Puzzles() {
    phase1Data.puzzles.forEach(puzzle => {
        const pulse = Math.sin(Date.now() / 400) * 5;
        
        if (puzzle.completed) {
            ctx.shadowColor = '#00ff41';
            ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        } else {
            ctx.shadowColor = '#9b59b6';
            ctx.fillStyle = '#9b59b6';
        }
        
        ctx.shadowBlur = 20 + pulse;
        
        ctx.beginPath();
        ctx.moveTo(puzzle.x + 25, puzzle.y);
        ctx.lineTo(puzzle.x + 50, puzzle.y + 25);
        ctx.lineTo(puzzle.x + 25, puzzle.y + 50);
        ctx.lineTo(puzzle.x, puzzle.y + 25);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = puzzle.completed ? '#00ff41' : '#c39bd3';
        ctx.beginPath();
        ctx.moveTo(puzzle.x + 25, puzzle.y + 10);
        ctx.lineTo(puzzle.x + 40, puzzle.y + 25);
        ctx.lineTo(puzzle.x + 25, puzzle.y + 40);
        ctx.lineTo(puzzle.x + 10, puzzle.y + 25);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(puzzle.completed ? '✓' : '?', puzzle.x + 25, puzzle.y + 25);
        
        if (!puzzle.completed) {
            for (let i = 0; i < 3; i++) {
                const angle = (Date.now() / 1000 + i * 2) % (Math.PI * 2);
                const px = puzzle.x + 25 + Math.cos(angle) * 35;
                const py = puzzle.y + 25 + Math.sin(angle) * 35;
                ctx.fillStyle = '#9b59b6';
                ctx.fillRect(px, py, 3, 3);
            }
        }
    });
}

function drawPhase1Boss() {
    if (!phase1Data.boss.active || phase1Data.boss.defeated) return;
    
    const shake = phase1Data.boss.hp < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
    
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 30;
    
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(phase1Data.boss.x + shake, phase1Data.boss.y, phase1Data.boss.width, phase1Data.boss.height);
    
    ctx.fillStyle = '#c0392b';
    for (let i = 0; i < 5; i++) {
        const offset = Math.sin(Date.now() / 200 + i) * 3;
        ctx.fillRect(phase1Data.boss.x + 10 + i * 8 + offset, phase1Data.boss.y + 10, 6, 40);
    }
    
    ctx.fillStyle = '#000';
    ctx.fillRect(phase1Data.boss.x + 15, phase1Data.boss.y + 18, 10, 10);
    ctx.fillRect(phase1Data.boss.x + 35, phase1Data.boss.y + 18, 10, 10);
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(phase1Data.boss.x + 18, phase1Data.boss.y + 21, 4, 4);
    ctx.fillRect(phase1Data.boss.x + 38, phase1Data.boss.y + 21, 4, 4);
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(phase1Data.boss.x + 30, phase1Data.boss.y + 35, 12, 0, Math.PI);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(phase1Data.boss.x - 5, phase1Data.boss.y - 15, phase1Data.boss.width + 10, 8);
    
    ctx.fillStyle = '#e74c3c';
    const hpWidth = ((phase1Data.boss.width + 10) * phase1Data.boss.hp) / phase1Data.boss.maxHp;
    ctx.fillRect(phase1Data.boss.x - 5, phase1Data.boss.y - 15, hpWidth, 8);
    
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 1;
    ctx.strokeRect(phase1Data.boss.x - 5, phase1Data.boss.y - 15, phase1Data.boss.width + 10, 8);
}

function checkPhase1Interactions() {
    if (gameState.paused) return;
    
    phase1Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3000);
            });
            npc.talked = true;
        }
    });

    phase1Data.puzzles.forEach((puzzle, index) => {
        if (isNear(player, puzzle) && !puzzle.completed) {
            audioManager.playInteract();
            showPuzzle(puzzle, index, 1);
        }
    });

    if (phase1Data.boss.active && !phase1Data.boss.defeated && isNear(player, phase1Data.boss)) {
        phase1Data.boss.hp--;
        audioManager.playBossHit();
        createExplosion(phase1Data.boss.x + 30, phase1Data.boss.y + 30, '#ff0000');
        
        if (phase1Data.boss.hp <= 0) {
            phase1Data.boss.defeated = true;
            phase1Data.bossDefeated = true;
            audioManager.playBossDefeat();
            updateScore(500);
            createExplosion(phase1Data.boss.x + 30, phase1Data.boss.y + 30, '#00ff41');
            completePhase(1);
        }
    }
}

function activatePhase1Boss() {
    phase1Data.boss.active = true;
    showDialogue('⚠️ AMEAÇA DETECTADA! O vírus "Senha Fraca" invadiu o sistema! Neutralize-o!');
}