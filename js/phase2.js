// FASE 2: LABIRINTO DOS LINKS
const phase2Data = {
    title: '◢ LABIRINTO DOS LINKS ◣',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    npcs: [
        {
            x: 500, y: 300, width: 50, height: 50,
            type: 'firewall',
            name: 'Firewall Guardian',
            hasDialogue: true,
            dialogue: [
                '🛡️ Bem-vindo ao Labirinto dos Links, ' + gameState.playerName + '.',
                'Aqui você enfrentará ameaças de phishing e links maliciosos.',
                'Golpistas usam URLs falsas para roubar dados. Aprenda a identificá-las!',
                'Examine os links cuidadosamente antes de clicar. Um erro pode comprometer todo o sistema.'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            x: 150, y: 500, width: 50, height: 50,
            completed: false,
            question: 'ANÁLISE DE URL: Qual desses links é SEGURO?',
            options: [
                { text: 'http://bancod0brasil.com.br', correct: false, feedback: 'PHISHING! Note o "0" (zero) no lugar da letra "o". URL falsa!' },
                { text: 'https://www.bb.com.br', correct: true, feedback: 'SEGURO! URL oficial com HTTPS e domínio correto.' },
                { text: 'www.bb-atualiza-dados.com', correct: false, feedback: 'SUSPEITO! Bancos não usam subdomínios para atualização de dados.' },
                { text: 'bit.ly/bancoseguro', correct: false, feedback: 'PERIGOSO! URLs encurtadas escondem o destino real. Nunca confie!' }
            ]
        },
        {
            x: 850, y: 500, width: 50, height: 50,
            completed: false,
            question: 'RECONHECIMENTO DE PHISHING: O que NÃO indica um email falso?',
            options: [
                { text: 'Urgência extrema: "Sua conta será bloqueada!"', correct: false, feedback: 'TÁTICA COMUM! Golpistas criam senso de urgência para você agir sem pensar.' },
                { text: 'Erros de português e gramática', correct: false, feedback: 'SINAL CLARO! Empresas sérias revisam suas comunicações.' },
                { text: 'Remetente com email oficial da empresa', correct: true, feedback: 'CORRETO! Mas sempre verifique o endereço completo, não apenas o nome exibido.' },
                { text: 'Pedido de senha ou dados bancários', correct: false, feedback: 'ALERTA MÁXIMO! Empresas NUNCA pedem senhas por email!' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            question: 'PROTOCOLO ANTI-PHISHING: O que fazer ao receber link suspeito?',
            options: [
                { text: 'Clicar para verificar se é real', correct: false, feedback: 'NUNCA! Clicar pode instalar malware ou roubar seus dados.' },
                { text: 'Encaminhar para amigos perguntando', correct: false, feedback: 'NÃO! Você pode estar espalhando a ameaça.' },
                { text: 'Deletar e reportar como spam/phishing', correct: true, feedback: 'PERFEITO! Delete, reporte e alerte pessoas próximas sobre o golpe.' },
                { text: 'Responder pedindo mais informações', correct: false, feedback: 'PÉSSIMA IDEIA! Você confirma que seu email está ativo para golpistas.' }
            ]
        }
    ],
    
    boss: {
        x: 900, y: 150, width: 60, height: 60,
        active: false, defeated: false, hp: 3, maxHp: 3
    },
    
    // Paredes do labirinto
    walls: [
        {x: 0, y: 200, width: 300, height: 20},
        {x: 400, y: 200, width: 300, height: 20},
        {x: 200, y: 400, width: 20, height: 200},
        {x: 700, y: 400, width: 20, height: 200}
    ]
};

function drawPhase2NPCs() {
    phase2Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#3498db';
        ctx.shadowBlur = 15;
        
        // Escudo do firewall
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.moveTo(npc.x + 25, npc.y);
        ctx.lineTo(npc.x + 50, npc.y + 15);
        ctx.lineTo(npc.x + 50, npc.y + 35);
        ctx.lineTo(npc.x + 25, npc.y + 50);
        ctx.lineTo(npc.x, npc.y + 35);
        ctx.lineTo(npc.x, npc.y + 15);
        ctx.closePath();
        ctx.fill();
        
        // Símbolo de proteção
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🛡️', npc.x + 25, npc.y + 25);
        
        // Efeito de energia
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 30 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
    });
}

function drawPhase2Puzzles() {
    phase2Data.puzzles.forEach(puzzle => {
        const pulse = Math.sin(Date.now() / 400) * 5;
        
        if (puzzle.completed) {
            ctx.shadowColor = '#00ff41';
            ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        } else {
            ctx.shadowColor = '#e74c3c';
            ctx.fillStyle = '#e74c3c';
        }
        
        ctx.shadowBlur = 20 + pulse;
        
        // Forma de hexágono
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = puzzle.x + 25 + Math.cos(angle) * 25;
            const y = puzzle.y + 25 + Math.sin(angle) * 25;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        // Símbolo
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(puzzle.completed ? '✓' : '🔗', puzzle.x + 25, puzzle.y + 25);
        
        // Partículas de alerta
        if (!puzzle.completed) {
            for (let i = 0; i < 4; i++) {
                const angle = (Date.now() / 800 + i * Math.PI / 2) % (Math.PI * 2);
                const px = puzzle.x + 25 + Math.cos(angle) * 40;
                const py = puzzle.y + 25 + Math.sin(angle) * 40;
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(px, py, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    });
}

function drawPhase2Walls() {
    ctx.fillStyle = '#2c3e50';
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    
    phase2Data.walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function checkPhase2Collisions() {
    phase2Data.walls.forEach(wall => {
        if (player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y) {
            
            // Corrigir posição do jogador
            const overlapLeft = (player.x + player.width) - wall.x;
            const overlapRight = (wall.x + wall.width) - player.x;
            const overlapTop = (player.y + player.height) - wall.y;
            const overlapBottom = (wall.y + wall.height) - player.y;
            
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            
            if (minOverlap === overlapLeft) player.x -= overlapLeft;
            else if (minOverlap === overlapRight) player.x += overlapRight;
            else if (minOverlap === overlapTop) player.y -= overlapTop;
            else player.y += overlapBottom;
        }
    });
}

function drawPhase2Boss() {
    if (!phase2Data.boss.active || phase2Data.boss.defeated) return;
    
    const shake = phase2Data.boss.hp < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
    
    ctx.shadowColor = '#e67e22';
    ctx.shadowBlur = 30;
    
    // Corpo do phisher
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(phase2Data.boss.x + shake, phase2Data.boss.y, phase2Data.boss.width, phase2Data.boss.height);
    
    // Links falsos flutuando
    ctx.fillStyle = '#d35400';
    for (let i = 0; i < 4; i++) {
        const offset = Math.sin(Date.now() / 200 + i) * 5;
        ctx.fillRect(phase2Data.boss.x + 5 + i * 13, phase2Data.boss.y + 10 + offset, 10, 3);
    }
    
    // Rosto enganador
    ctx.fillStyle = '#000';
    ctx.fillRect(phase2Data.boss.x + 15, phase2Data.boss.y + 25, 12, 12);
    ctx.fillRect(phase2Data.boss.x + 33, phase2Data.boss.y + 25, 12, 12);
    
    // Sorriso malicioso
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(phase2Data.boss.x + 30, phase2Data.boss.y + 45, 10, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
    
    // Barra de HP
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(phase2Data.boss.x - 5, phase2Data.boss.y - 15, phase2Data.boss.width + 10, 8);
    
    ctx.fillStyle = '#e67e22';
    const hpWidth = ((phase2Data.boss.width + 10) * phase2Data.boss.hp) / phase2Data.boss.maxHp;
    ctx.fillRect(phase2Data.boss.x - 5, phase2Data.boss.y - 15, hpWidth, 8);
    
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 1;
    ctx.strokeRect(phase2Data.boss.x - 5, phase2Data.boss.y - 15, phase2Data.boss.width + 10, 8);
}

function checkPhase2Interactions() {
    if (gameState.paused) return;
    
    // NPCs
    phase2Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3000);
            });
            npc.talked = true;
        }
    });

    // Puzzles
    phase2Data.puzzles.forEach((puzzle, index) => {
        if (isNear(player, puzzle) && !puzzle.completed) {
            audioManager.playInteract();
            showPuzzle(puzzle, index, 2);
        }
    });

    // Boss
    if (phase2Data.boss.active && !phase2Data.boss.defeated && isNear(player, phase2Data.boss)) {
        phase2Data.boss.hp--;
        audioManager.playBossHit();
        createExplosion(phase2Data.boss.x + 30, phase2Data.boss.y + 30, '#e67e22');
        
        if (phase2Data.boss.hp <= 0) {
            phase2Data.boss.defeated = true;
            phase2Data.bossDefeated = true;
            audioManager.playBossDefeat();
            updateScore(500);
            createExplosion(phase2Data.boss.x + 30, phase2Data.boss.y + 30, '#00ff41');
            completePhase(2);
        }
    }
}

function activatePhase2Boss() {
    phase2Data.boss.active = true;
    showDialogue('⚠️ ALERTA! O hacker "Link Malicioso" está espalhando phishing! Derrote-o!');
}