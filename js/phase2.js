// FASE 2: LABIRINTO DOS LINKS - CORRIGIDO E FUNCIONAL

const phase2Data = {
    title: '◢ LABIRINTO DOS LINKS ◣',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    npcs: [
        {
            x: 100, y: 100, width: 50, height: 50,
            type: 'firewall',
            name: 'Firewall Guardian',
            hasDialogue: true,
            dialogue: [
                '🛡️ Oi, ' + gameState.playerName + '! Sou o Guardião do Firewall!',
                'Siga pelo caminho e encontre os 3 cristais! 🔍',
                'No final, você encontrará o vilão! Boa sorte! 💪',
                'Dica: Explore todo o labirinto! 🗺️'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            // Puzzle 1 - Área superior direita
            x: 700, y: 120, width: 50, height: 50,
            completed: false,
            question: '🔗 Qual desses links parece SEGURO?',
            options: [
                { text: 'bancod0brasil.com', correct: false, feedback: '❌ Olha bem! Tem um ZERO no lugar da letra O. É FALSO!' },
                { text: 'bb.com.br', correct: true, feedback: '✅ ISSO! Endereço correto do banco! 🌟' },
                { text: 'bb-dados.com', correct: false, feedback: '❌ Bancos não usam nomes assim!' },
                { text: 'bit.ly/banco', correct: false, feedback: '❌ Links encurtados escondem o endereço real!' }
            ]
        },
        {
            // Puzzle 2 - Área central
            x: 450, y: 350, width: 50, height: 50,
            completed: false,
            question: '📧 Você recebe um email estranho. O que fazer?',
            options: [
                { text: 'Clicar para ver', correct: false, feedback: '❌ NÃO CLIQUE! Pode ser armadilha!' },
                { text: 'Mandar para amigos', correct: false, feedback: '❌ Não espalhe o perigo!' },
                { text: 'APAGAR e contar para um adulto', correct: true, feedback: '✅ PERFEITO! Sempre avise um adulto! 👏' },
                { text: 'Responder', correct: false, feedback: '❌ Nunca responda emails estranhos!' }
            ]
        },
        {
            // Puzzle 3 - Área inferior direita (antes do boss)
            x: 800, y: 550, width: 50, height: 50,
            completed: false,
            question: '⚠️ O que indica que um email é FALSO?',
            options: [
                { text: 'Diz "URGENTE! CLIQUE!"', correct: true, feedback: '✅ ISSO! Emails de verdade não apressam você! 🎉' },
                { text: 'Tem erros de escrita', correct: true, feedback: '✅ BOM! Empresas escrevem certinho! 🌟' },
                { text: 'Tem email oficial', correct: false, feedback: '❌ Vilões copiam emails. Olhe bem!' },
                { text: 'Pede sua senha', correct: true, feedback: '✅ NUNCA pedem senha por email! 🏆' }
            ]
        }
    ],
    
    boss: {
        // Boss no canto inferior direito
        x: 880, y: 580, width: 60, height: 60,
        active: false, defeated: false, hp: 3, maxHp: 3
    },
    
    // LABIRINTO REDESENHADO - Caminhos claros e navegáveis
    maze: [
        // ===== BORDAS EXTERNAS =====
        {x: 0, y: 0, width: 1000, height: 20},        // Topo
        {x: 0, y: 680, width: 1000, height: 20},      // Baixo
        {x: 0, y: 0, width: 20, height: 700},         // Esquerda
        {x: 980, y: 0, width: 20, height: 700},       // Direita
        
        // ===== DIVISÓRIAS HORIZONTAIS =====
        // Linha superior (y=200)
        {x: 20, y: 200, width: 350, height: 20},      // Esquerda
        {x: 480, y: 200, width: 300, height: 20},     // Centro-direita
        
        // Linha central (y=400)
        {x: 250, y: 400, width: 300, height: 20},     // Centro
        {x: 650, y: 400, width: 150, height: 20},     // Direita
        
        // ===== DIVISÓRIAS VERTICAIS =====
        // Coluna 1 (x=250)
        {x: 250, y: 20, width: 20, height: 180},      // Superior
        {x: 250, y: 420, width: 20, height: 180},     // Inferior
        
        // Coluna 2 (x=480)
        {x: 480, y: 220, width: 20, height: 180},     // Superior-meio
        
        // Coluna 3 (x=650)
        {x: 650, y: 20, width: 20, height: 180},      // Superior
        {x: 650, y: 420, width: 20, height: 120},     // Inferior
        
        // ===== OBSTÁCULOS ADICIONAIS (para criar caminhos interessantes) =====
        {x: 120, y: 80, width: 20, height: 100},      // Obstáculo esquerdo superior
        {x: 380, y: 280, width: 80, height: 20},      // Obstáculo horizontal meio
        {x: 550, y: 280, width: 20, height: 100},     // Obstáculo vertical meio
        {x: 800, y: 220, width: 20, height: 160},     // Obstáculo direito meio
        {x: 120, y: 500, width: 100, height: 20},     // Obstáculo esquerdo inferior
        
        // ===== PAREDES PARA CRIAR O CAMINHO ATÉ O BOSS =====
        {x: 820, y: 500, width: 20, height: 80},      // Parede antes do boss (esquerda)
        {x: 750, y: 640, width: 100, height: 20},     // Parede embaixo
    ]
};

function drawPhase2NPCs() {
    phase2Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#3498db';
        ctx.shadowBlur = 20;
        
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
        
        ctx.strokeStyle = '#5dade2';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🛡️', npc.x + 25, npc.y + 25);
        
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 35 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
    });
}

function drawPhase2Puzzles() {
    phase2Data.puzzles.forEach((puzzle, index) => {
        const pulse = Math.sin(Date.now() / 400) * 5;
        
        if (puzzle.completed) {
            ctx.shadowColor = '#00ff41';
            ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        } else {
            ctx.shadowColor = '#e74c3c';
            ctx.fillStyle = '#e74c3c';
        }
        
        ctx.shadowBlur = 25 + pulse;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = puzzle.x + 25 + Math.cos(angle) * 28;
            const y = puzzle.y + 25 + Math.sin(angle) * 28;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = puzzle.completed ? '#00ff41' : '#c0392b';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(puzzle.completed ? '✓' : '🔗', puzzle.x + 25, puzzle.y + 25);
        
        if (!puzzle.completed) {
            for (let i = 0; i < 6; i++) {
                const angle = (Date.now() / 600 + i * Math.PI / 3) % (Math.PI * 2);
                const px = puzzle.x + 25 + Math.cos(angle) * 45;
                const py = puzzle.y + 25 + Math.sin(angle) * 45;
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        if (!puzzle.completed) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
            ctx.font = 'bold 16px Rajdhani';
            ctx.fillText('ESPAÇO', puzzle.x + 25, puzzle.y - 20);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText(`${index + 1}/3`, puzzle.x + 25, puzzle.y + 65);
        }
    });
}

function drawPhase2Maze() {
    phase2Data.maze.forEach(wall => {
        // Gradiente 3D
        const gradient = ctx.createLinearGradient(wall.x, wall.y, wall.x + wall.width, wall.y + wall.height);
        gradient.addColorStop(0, '#34495e');
        gradient.addColorStop(0.5, '#2c3e50');
        gradient.addColorStop(1, '#1a252f');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        
        // Luzes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(wall.x, wall.y, wall.width, 2);
        ctx.fillRect(wall.x, wall.y, 2, wall.height);
        
        // Sombras
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(wall.x, wall.y + wall.height - 2, wall.width, 2);
        ctx.fillRect(wall.x + wall.width - 2, wall.y, 2, wall.height);
        
        // Contorno
        ctx.strokeStyle = '#1a252f';
        ctx.lineWidth = 3;
        ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
    });
    
    // Desenhar grid de ajuda (linha pontilhada sutil)
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 15]);
    
    // Linhas verticais
    for (let x = 100; x < 1000; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 700);
        ctx.stroke();
    }
    
    // Linhas horizontais
    for (let y = 100; y < 700; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1000, y);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);
}

function checkPhase2Collisions() {
    phase2Data.maze.forEach(wall => {
        if (player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y) {
            
            const overlapLeft = (player.x + player.width) - wall.x;
            const overlapRight = (wall.x + wall.width) - player.x;
            const overlapTop = (player.y + player.height) - wall.y;
            const overlapBottom = (wall.y + wall.height) - player.y;
            
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            
            if (minOverlap === overlapLeft) player.x -= overlapLeft + 1;
            else if (minOverlap === overlapRight) player.x += overlapRight + 1;
            else if (minOverlap === overlapTop) player.y -= overlapTop + 1;
            else player.y += overlapBottom + 1;
        }
    });
}

function drawPhase2Boss() {
    if (!phase2Data.boss.active || phase2Data.boss.defeated) return;
    
    const shake = phase2Data.boss.hp < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
    
    ctx.shadowColor = '#e67e22';
    ctx.shadowBlur = 40;
    
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(phase2Data.boss.x + shake, phase2Data.boss.y, phase2Data.boss.width, phase2Data.boss.height);
    
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 4;
    ctx.strokeRect(phase2Data.boss.x, phase2Data.boss.y, phase2Data.boss.width, phase2Data.boss.height);
    
    ctx.fillStyle = '#d35400';
    for (let i = 0; i < 4; i++) {
        const offset = Math.sin(Date.now() / 200 + i) * 5;
        ctx.fillRect(phase2Data.boss.x + 5 + i * 13, phase2Data.boss.y + 10 + offset, 10, 4);
    }
    
    ctx.fillStyle = '#000';
    ctx.fillRect(phase2Data.boss.x + 15, phase2Data.boss.y + 28, 14, 14);
    ctx.fillRect(phase2Data.boss.x + 31, phase2Data.boss.y + 28, 14, 14);
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(phase2Data.boss.x + 30, phase2Data.boss.y + 48, 12, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(phase2Data.boss.x - 5, phase2Data.boss.y - 25, phase2Data.boss.width + 10, 12);
    
    ctx.fillStyle = '#e67e22';
    const hpWidth = ((phase2Data.boss.width + 10) * phase2Data.boss.hp) / phase2Data.boss.maxHp;
    ctx.fillRect(phase2Data.boss.x - 5, phase2Data.boss.y - 25, hpWidth, 12);
    
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 2;
    ctx.strokeRect(phase2Data.boss.x - 5, phase2Data.boss.y - 25, phase2Data.boss.width + 10, 12);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Rajdhani';
    ctx.textAlign = 'center';
    ctx.fillText(`HP: ${phase2Data.boss.hp}/${phase2Data.boss.maxHp}`, phase2Data.boss.x + 30, phase2Data.boss.y - 16);
    
    if (isNear(player, phase2Data.boss, 150)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
        ctx.font = 'bold 18px Rajdhani';
        ctx.fillText('PRESSIONE ESPAÇO!', phase2Data.boss.x + 30, phase2Data.boss.y - 35);
    }
}

function checkPhase2Interactions() {
    if (gameState.paused) return;
    
    phase2Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3500);
            });
            npc.talked = true;
        }
    });

    phase2Data.puzzles.forEach((puzzle, index) => {
        if (isNear(player, puzzle, 80) && !puzzle.completed) {
            audioManager.playInteract();
            showPuzzle(puzzle, index, 2);
        }
    });

    if (phase2Data.boss.active && !phase2Data.boss.defeated && isNear(player, phase2Data.boss, 80)) {
        phase2Data.boss.hp--;
        audioManager.playBossHit();
        createExplosion(phase2Data.boss.x + 30, phase2Data.boss.y + 30, '#e67e22');
        
        if (phase2Data.boss.hp <= 0) {
            phase2Data.boss.defeated = true;
            phase2Data.bossDefeated = true;
            audioManager.playBossDefeat();
            updateScore(500);
            createExplosion(phase2Data.boss.x + 30, phase2Data.boss.y + 30, '#00ff41');
            showDialogue('🎉 VOCÊ CONSEGUIU! O hacker "Link Malicioso" foi derrotado! 🏆');
            setTimeout(() => completePhase(2), 2000);
        } else {
            showDialogue(`💥 Acertou! Faltam ${phase2Data.boss.hp} ataques!`);
        }
    }
}

function activatePhase2Boss() {
    phase2Data.boss.active = true;
    showDialogue('⚠️ ALERTA! O hacker "Link Malicioso" apareceu no fim do caminho! Derrote-o! 💪');
}