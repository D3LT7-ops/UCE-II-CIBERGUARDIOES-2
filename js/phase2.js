// FASE 2: LABIRINTO DOS LINKS - LABIRINTO MELHORADO E ORGANIZADO

const phase2Data = {
    title: '◢ LABIRINTO DOS LINKS ◣',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    npcs: [
        {
            x: 80, y: 80, width: 50, height: 50,
            type: 'firewall',
            name: 'Firewall Guardian',
            hasDialogue: true,
            dialogue: [
                '🛡️ Oi, ' + gameState.playerName + '! Sou o Guardião do Firewall!',
                'Este é um LABIRINTO de verdade! Você precisa encontrar o caminho! 🧩',
                'Os cristais roxos estão nas salas do labirinto! 🔍',
                'No final, você encontrará o vilão! Boa sorte! 💪'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            // Puzzle 1 - Sala direita superior
            x: 750, y: 180, width: 50, height: 50,
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
            // Puzzle 2 - Sala centro
            x: 450, y: 350, width: 50, height: 50,
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
            // Puzzle 3 - Sala inferior esquerda
            x: 200, y: 580, width: 50, height: 50,
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
        // Boss na sala final (canto inferior direito) - BEM SEPARADO
        x: 870, y: 580, width: 60, height: 60,
        active: false, defeated: false, hp: 3, maxHp: 3
    },
    
    // LABIRINTO OTIMIZADO - Corredores largos e salas definidas
    maze: [
        // ========== BORDAS DO MAPA ==========
        {x: 0, y: 0, width: 1000, height: 30}, // topo
        {x: 0, y: 670, width: 1000, height: 30}, // baixo
        {x: 0, y: 0, width: 30, height: 700}, // esquerda
        {x: 970, y: 0, width: 30, height: 700}, // direita
        
        // ========== PAREDES PRINCIPAIS (criam as salas) ==========
        
        // Parede vertical central principal
        {x: 350, y: 30, width: 30, height: 280},
        {x: 350, y: 420, width: 30, height: 250},
        
        // Parede horizontal superior
        {x: 30, y: 250, width: 320, height: 30},
        {x: 380, y: 250, width: 290, height: 30},
        {x: 770, y: 250, width: 200, height: 30},
        
        // Parede horizontal centro
        {x: 30, y: 420, width: 320, height: 30},
        {x: 480, y: 420, width: 190, height: 30},
        {x: 770, y: 420, width: 200, height: 30},
        
        // ========== DIVISÓRIAS DAS SALAS ==========
        
        // Sala superior esquerda (onde está o NPC)
        {x: 180, y: 30, width: 30, height: 100},
        {x: 30, y: 130, width: 150, height: 30},
        
        // Sala superior direita (Puzzle 1)
        {x: 670, y: 30, width: 30, height: 220},
        {x: 770, y: 130, width: 200, height: 30},
        
        // Sala centro esquerda
        {x: 180, y: 280, width: 30, height: 140},
        {x: 30, y: 350, width: 150, height: 30},
        
        // Sala centro direita (Puzzle 2)
        {x: 540, y: 280, width: 30, height: 140},
        {x: 670, y: 350, width: 100, height: 30},
        {x: 850, y: 280, width: 30, height: 140},
        
        // Sala inferior esquerda (Puzzle 3)
        {x: 30, y: 530, width: 150, height: 30},
        {x: 280, y: 450, width: 30, height: 220},
        
        // Sala inferior direita (BOSS) - BEM SEPARADA
        {x: 770, y: 530, width: 100, height: 30},
        {x: 670, y: 450, width: 30, height: 220},
        
        // ========== OBSTÁCULOS INTERNOS ==========
        
        // Corredores com curvas
        {x: 480, y: 30, width: 30, height: 100},
        {x: 480, y: 180, width: 100, height: 30},
        
        {x: 120, y: 180, width: 100, height: 30},
        {x: 120, y: 210, width: 30, height: 80},
        
        {x: 420, y: 310, width: 100, height: 30},
        
        {x: 80, y: 480, width: 80, height: 30},
        {x: 80, y: 510, width: 30, height: 90},
        
        {x: 420, y: 480, width: 100, height: 30},
        {x: 420, y: 510, width: 30, height: 90},
        
        {x: 730, y: 480, width: 80, height: 30},
        
        {x: 580, y: 560, width: 30, height: 80}
    ]
};

function drawPhase2NPCs() {
    phase2Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#3498db';
        ctx.shadowBlur = 20;
        
        // Escudo maior e mais visível
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
        
        // Brilho extra
        ctx.strokeStyle = '#5dade2';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🛡️', npc.x + 25, npc.y + 25);
        
        // Círculo de energia
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 35 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Nome do NPC
        ctx.fillStyle = '#00ff41';
        ctx.font = 'bold 12px Rajdhani';
        ctx.fillText('Guardião', npc.x + 25, npc.y - 10);
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
        
        // Hexágono maior
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
        
        // Borda extra
        ctx.strokeStyle = puzzle.completed ? '#00ff41' : '#c0392b';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(puzzle.completed ? '✓' : '🔗', puzzle.x + 25, puzzle.y + 25);
        
        // Partículas mais visíveis
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
        
        // Indicador sempre visível
        if (!puzzle.completed) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
            ctx.font = 'bold 16px Rajdhani';
            ctx.fillText('ESPAÇO', puzzle.x + 25, puzzle.y - 20);
            
            // Número do puzzle
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText(`Puzzle ${index + 1}`, puzzle.x + 25, puzzle.y + 65);
        }
    });
}

// Desenhar o labirinto com visual melhorado
function drawPhase2Maze() {
    phase2Data.maze.forEach((wall, index) => {
        // Gradiente para profundidade
        const gradient = ctx.createLinearGradient(wall.x, wall.y, wall.x + wall.width, wall.y + wall.height);
        gradient.addColorStop(0, '#34495e');
        gradient.addColorStop(0.5, '#2c3e50');
        gradient.addColorStop(1, '#1a252f');
        
        // Parede principal
        ctx.fillStyle = gradient;
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        
        // Borda clara no topo/esquerda (luz)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(wall.x, wall.y, wall.width, 2);
        ctx.fillRect(wall.x, wall.y, 2, wall.height);
        
        // Borda escura embaixo/direita (sombra)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(wall.x, wall.y + wall.height - 2, wall.width, 2);
        ctx.fillRect(wall.x + wall.width - 2, wall.y, 2, wall.height);
        
        // Contorno forte
        ctx.strokeStyle = '#1a252f';
        ctx.lineWidth = 3;
        ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
        
        // Textura de tijolos
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        
        if (wall.height > wall.width) {
            // Parede vertical
            for (let i = 0; i < wall.height; i += 20) {
                ctx.beginPath();
                ctx.moveTo(wall.x, wall.y + i);
                ctx.lineTo(wall.x + wall.width, wall.y + i);
                ctx.stroke();
            }
        } else {
            // Parede horizontal
            for (let i = 0; i < wall.width; i += 25) {
                ctx.beginPath();
                ctx.moveTo(wall.x + i, wall.y);
                ctx.lineTo(wall.x + i, wall.y + wall.height);
                ctx.stroke();
            }
        }
    });
    
    // Desenhar mini-mapa no canto superior direito
    drawMiniMap();
}

// Mini-mapa para ajudar na navegação
function drawMiniMap() {
    const mmX = 820;
    const mmY = 50;
    const mmScale = 0.15;
    
    // Fundo do mini-mapa
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(mmX - 5, mmY - 5, 160, 110);
    
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    ctx.strokeRect(mmX - 5, mmY - 5, 160, 110);
    
    // Paredes no mini-mapa
    ctx.fillStyle = '#34495e';
    phase2Data.maze.forEach(wall => {
        ctx.fillRect(
            mmX + wall.x * mmScale,
            mmY + wall.y * mmScale,
            wall.width * mmScale,
            wall.height * mmScale
        );
    });
    
    // Player no mini-mapa
    ctx.fillStyle = '#00ff41';
    ctx.beginPath();
    ctx.arc(
        mmX + player.x * mmScale,
        mmY + player.y * mmScale,
        3, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Puzzles no mini-mapa
    phase2Data.puzzles.forEach(puzzle => {
        ctx.fillStyle = puzzle.completed ? '#00ff41' : '#e74c3c';
        ctx.fillRect(
            mmX + puzzle.x * mmScale - 2,
            mmY + puzzle.y * mmScale - 2,
            4, 4
        );
    });
    
    // Boss no mini-mapa
    if (phase2Data.boss.active) {
        ctx.fillStyle = phase2Data.boss.defeated ? '#00ff41' : '#ff0000';
        ctx.fillRect(
            mmX + phase2Data.boss.x * mmScale - 2,
            mmY + phase2Data.boss.y * mmScale - 2,
            5, 5
        );
    }
    
    // Título do mini-mapa
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 10px Rajdhani';
    ctx.textAlign = 'center';
    ctx.fillText('MAPA', mmX + 75, mmY - 10);
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
    
    // Corpo maior
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(phase2Data.boss.x + shake, phase2Data.boss.y, phase2Data.boss.width, phase2Data.boss.height);
    
    // Borda
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 4;
    ctx.strokeRect(phase2Data.boss.x, phase2Data.boss.y, phase2Data.boss.width, phase2Data.boss.height);
    
    // Links falsos
    ctx.fillStyle = '#d35400';
    for (let i = 0; i < 4; i++) {
        const offset = Math.sin(Date.now() / 200 + i) * 5;
        ctx.fillRect(phase2Data.boss.x + 5 + i * 13, phase2Data.boss.y + 10 + offset, 10, 4);
    }
    
    // Rosto
    ctx.fillStyle = '#000';
    ctx.fillRect(phase2Data.boss.x + 15, phase2Data.boss.y + 28, 14, 14);
    ctx.fillRect(phase2Data.boss.x + 31, phase2Data.boss.y + 28, 14, 14);
    
    // Sorriso
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(phase2Data.boss.x + 30, phase2Data.boss.y + 48, 12, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    
    // Barra de HP
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
    ctx.fillText(`BOSS: ${phase2Data.boss.hp}/${phase2Data.boss.maxHp}`, phase2Data.boss.x + 30, phase2Data.boss.y - 16);
    
    // Indicador
    if (isNear(player, phase2Data.boss, 150)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
        ctx.font = 'bold 18px Rajdhani';
        ctx.fillText('CHEGUE PERTO!', phase2Data.boss.x + 30, phase2Data.boss.y - 35);
    }
    
    // Nome do boss
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 14px Rajdhani';
    ctx.fillText('Link Malicioso', phase2Data.boss.x + 30, phase2Data.boss.y + 75);
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
            showDialogue('🎉 VOCÊ CONSEGUIU! O hacker "Link Malicioso" foi derrotado! Agora você sabe identificar links falsos! 🏆');
            setTimeout(() => completePhase(2), 2000);
        } else {
            showDialogue(`💥 Acertou! Faltam ${phase2Data.boss.hp} ataques! Você está quase lá!`);
        }
    }
}

function activatePhase2Boss() {
    phase2Data.boss.active = true;
    showDialogue('⚠️ ALERTA! O hacker "Link Malicioso" está na sala final do labirinto! Encontre-o e derrote-o! 💪');
}