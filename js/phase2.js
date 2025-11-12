// FASE 2: LABIRINTO DOS LINKS - VERSÃO SIMPLIFICADA PARA CRIANÇAS

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
                '🛡️ Oi, ' + gameState.playerName + '! Sou o Guardião do Firewall!',
                'Aqui temos links FALSOS e VERDADEIROS. Vamos aprender a diferença? 🔗',
                'Links falsos roubam suas informações! Mas não se preocupe, vou te ensinar! 😊',
                'Cuidado com as paredes do labirinto! Você não consegue passar por elas. 🧱'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            x: 150, y: 500, width: 50, height: 50,
            completed: false,
            question: '🔗 Qual desses links parece SEGURO?',
            options: [
                { text: 'bancod0brasil.com', correct: false, feedback: '❌ Olha bem! Tem um ZERO no lugar da letra O. É FALSO! Tente outra!' },
                { text: 'bb.com.br', correct: true, feedback: '✅ ISSO! Endereço curto e correto do banco! Você é esperto! 🌟' },
                { text: 'bb-dados.com', correct: false, feedback: '❌ Bancos de verdade não usam nomes assim! Escolha outra!' },
                { text: 'bit.ly/banco', correct: false, feedback: '❌ Links encurtados escondem o endereço real! Nunca confie! Tente de novo!' }
            ]
        },
        {
            x: 850, y: 500, width: 50, height: 50,
            completed: false,
            question: '📧 Você recebe um email estranho. O que fazer?',
            options: [
                { text: 'Clicar para ver', correct: false, feedback: '❌ NÃO CLIQUE! Pode ser armadilha de vilões! Tente outra!' },
                { text: 'Mandar para amigos', correct: false, feedback: '❌ Não! Você pode espalhar o perigo! Escolha outra opção!' },
                { text: 'APAGAR e contar para um adulto', correct: true, feedback: '✅ PERFEITO! Sempre avise um adulto de confiança! Muito bem! 👏' },
                { text: 'Responder', correct: false, feedback: '❌ Nunca responda! Os vilões ficam felizes quando você responde! Tente outra!' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            question: '⚠️ O que indica que um email é FALSO?',
            options: [
                { text: 'Diz "URGENTE! CLIQUE!"', correct: true, feedback: '✅ ISSO! Emails de verdade não apressam você! Você aprendeu! 🎉' },
                { text: 'Tem erros de escrita', correct: true, feedback: '✅ BOM! Empresas de verdade escrevem certinho! Muito bem! 🌟' },
                { text: 'Tem email oficial', correct: false, feedback: '❌ Cuidado! Vilões copiam emails. Sempre olhe bem! Tente outra!' },
                { text: 'Pede sua senha', correct: true, feedback: '✅ ALERTA MÁXIMO! NUNCA pedem senha por email! Você é demais! 🏆' }
            ]
        }
    ],
    
    boss: {
        x: 900, y: 150, width: 60, height: 60,
        active: false, defeated: false, hp: 3, maxHp: 3
    },
    
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
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🛡️', npc.x + 25, npc.y + 25);
        
        // Efeito de energia
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 30 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        // Emoji acima
        ctx.shadowBlur = 0;
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('💻', npc.x + 25, npc.y - 5);
        
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
        
        // Hexágono
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
        ctx.font = 'bold 24px Arial';
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
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Indicador
        if (!puzzle.completed && isNear(player, puzzle, 100)) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText('ESPAÇO', puzzle.x + 25, puzzle.y - 15);
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
        
        // Padrão de tijolos
        ctx.strokeStyle = '#1a252f';
        ctx.lineWidth = 1;
        for (let i = 0; i < wall.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(wall.x + i, wall.y);
            ctx.lineTo(wall.x + i, wall.y + wall.height);
            ctx.stroke();
        }
    });
}

function checkPhase2Collisions() {
    phase2Data.walls.forEach(wall => {
        if (player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y) {
            
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
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(phase2Data.boss.x + 30, phase2Data.boss.y + 45, 10, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
    
    // Barra de HP
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(phase2Data.boss.x - 5, phase2Data.boss.y - 20, phase2Data.boss.width + 10, 10);
    
    ctx.fillStyle = '#e67e22';
    const hpWidth = ((phase2Data.boss.width + 10) * phase2Data.boss.hp) / phase2Data.boss.maxHp;
    ctx.fillRect(phase2Data.boss.x - 5, phase2Data.boss.y - 20, hpWidth, 10);
    
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 2;
    ctx.strokeRect(phase2Data.boss.x - 5, phase2Data.boss.y - 20, phase2Data.boss.width + 10, 10);
    
    // Texto HP
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Rajdhani';
    ctx.textAlign = 'center';
    ctx.fillText(`${phase2Data.boss.hp}/${phase2Data.boss.maxHp}`, phase2Data.boss.x + 30, phase2Data.boss.y - 12);
    
    // Indicador
    if (isNear(player, phase2Data.boss, 150)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.font = 'bold 16px Rajdhani';
        ctx.fillText('CHEGUE PERTO!', phase2Data.boss.x + 30, phase2Data.boss.y - 30);
    }
}

function checkPhase2Interactions() {
    if (gameState.paused) return;
    
    // NPCs
    phase2Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3500);
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
            showDialogue('🎉 VOCÊ CONSEGUIU! O hacker "Link Malicioso" foi derrotado! Agora você sabe identificar links falsos! 🏆');
            setTimeout(() => completePhase(2), 2000);
        } else {
            showDialogue(`💥 Acertou! Faltam ${phase2Data.boss.hp} ataques! Você está quase lá!`);
        }
    }
}

function activatePhase2Boss() {
    phase2Data.boss.active = true;
    showDialogue('⚠️ ALERTA! O hacker "Link Malicioso" está criando links falsos! Chegue perto 3 vezes para derrotá-lo! 💪');
}