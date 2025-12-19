// FASE 2: LABIRINTO DOS LINKS - VERSÃO MELHORADA

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
                'O labirinto tem CAMINHOS SECRETOS! Explore tudo! 🗺️',
                'No final, você encontrará o vilão! Boa sorte! 💪',
                'DICA: Procure por passagens escondidas nas paredes! 👀'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            // Puzzle 1 - Área superior direita (mais difícil de achar)
            x: 780, y: 80, width: 50, height: 50,
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
            // Puzzle 2 - Área central (em um beco)
            x: 350, y: 480, width: 50, height: 50,
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
            // Puzzle 3 - Área secreta no canto inferior esquerdo
            x: 80, y: 600, width: 50, height: 50,
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
        x: 470, y: 320, width: 60, height: 60,
        active: false, 
        defeated: false, 
        hp: 3, 
        maxHp: 3,
        isMoving: false,
        speed: 2.5,
        direction: { x: 1, y: 0 },
        lastDirectionChange: Date.now(),
        movementStartTime: null
    },
    
    // LABIRINTO REDESENHADO - Mais complexo e interessante
    maze: [
        // ===== BORDAS EXTERNAS =====
        {x: 0, y: 0, width: 1000, height: 20},        // Topo
        {x: 0, y: 680, width: 1000, height: 20},      // Baixo
        {x: 0, y: 0, width: 20, height: 700},         // Esquerda
        {x: 980, y: 0, width: 20, height: 700},       // Direita
        
        // ===== SEÇÃO SUPERIOR (Área de entrada e primeiro puzzle) =====
        {x: 20, y: 180, width: 200, height: 20},      // Parede horizontal superior esquerda
        {x: 280, y: 120, width: 20, height: 180},     // Coluna divisória 1
        {x: 300, y: 120, width: 150, height: 20},     // Teto sala 1
        {x: 450, y: 20, width: 20, height: 200},      // Coluna divisória 2
        {x: 540, y: 180, width: 200, height: 20},     // Parede horizontal superior direita
        {x: 740, y: 20, width: 20, height: 180},      // Parede antes do puzzle 1
        {x: 880, y: 20, width: 20, height: 180},      // Parede lateral direita superior
        
        // ===== SEÇÃO CENTRAL (Corredores principais) =====
        {x: 150, y: 280, width: 20, height: 140},     // Pilar esquerdo 1
        {x: 20, y: 350, width: 130, height: 20},      // Parede horizontal esquerda
        {x: 220, y: 320, width: 150, height: 20},     // Parede horizontal central 1
        {x: 370, y: 250, width: 20, height: 90},      // Coluna vertical central
        {x: 470, y: 280, width: 20, height: 180},     // Grande pilar central
        {x: 550, y: 340, width: 150, height: 20},     // Parede horizontal central direita
        {x: 700, y: 240, width: 20, height: 120},     // Pilar direito central
        {x: 780, y: 280, width: 100, height: 20},     // Pequena parede superior direita
        {x: 820, y: 300, width: 20, height: 100},     // Coluna direita meio
        
        // ===== ÁREA DO LABIRINTO INFERIOR (Mais complexa) =====
        {x: 60, y: 480, width: 180, height: 20},      // Entrada área inferior esquerda
        {x: 240, y: 420, width: 20, height: 80},      // Divisória vertical esquerda
        {x: 260, y: 500, width: 120, height: 20},     // Corredor inferior 1
        {x: 380, y: 420, width: 20, height: 100},     // Parede vertical meio-esquerda
        {x: 300, y: 580, width: 100, height: 20},     // Parede horizontal inferior 1
        {x: 480, y: 480, width: 20, height: 120},     // Grande coluna inferior central
        {x: 500, y: 520, width: 140, height: 20},     // Corredor inferior central
        {x: 640, y: 440, width: 20, height: 100},     // Coluna inferior direita 1
        {x: 580, y: 600, width: 80, height: 20},      // Pequena parede inferior
        
        // ===== ÁREA DO BOSS (Canto inferior direito) =====
        {x: 720, y: 480, width: 20, height: 80},      // Entrada do boss (esquerda)
        {x: 740, y: 560, width: 80, height: 20},      // Entrada do boss (baixo)
        {x: 780, y: 420, width: 20, height: 60},      // Parede lateral boss
        {x: 900, y: 480, width: 20, height: 100},     // Parede direita área boss
        
        // ===== PASSAGENS SECRETAS (Caminhos alternativos) =====
        // Deixar espaços vazios intencionalmente para criar passagens secretas
        // Passagem secreta 1: entre x=220-240 na altura y=180
        {x: 180, y: 200, width: 40, height: 20},      // Falsa parede com passagem
        
        // Passagem secreta 2: acesso ao puzzle 3 (área inferior esquerda)
        {x: 20, y: 560, width: 40, height: 20},       // Abertura na parede esquerda
        
        // ===== OBSTÁCULOS DECORATIVOS (Pilares pequenos) =====
        {x: 550, y: 100, width: 30, height: 30},      // Pilar decorativo 1
        {x: 120, y: 540, width: 30, height: 30},      // Pilar decorativo 2
        {x: 850, y: 380, width: 30, height: 30},      // Pilar decorativo 3
    ],
    
    // Áreas especiais para efeitos visuais
    secretPaths: [
        {x: 180, y: 180, width: 60, height: 40},      // Caminho secreto 1
        {x: 20, y: 540, width: 60, height: 40}        // Caminho secreto 2
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
        
        // Hexágono do cristal
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
        
        // Partículas orbitando
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
        
        // Indicador de interação
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
    // Desenhar caminhos secretos com efeito especial
    phase2Data.secretPaths.forEach(path => {
        const glow = Math.sin(Date.now() / 500) * 10 + 10;
        ctx.fillStyle = `rgba(0, 255, 100, 0.1)`;
        ctx.fillRect(path.x, path.y, path.width, path.height);
        
        ctx.strokeStyle = `rgba(0, 255, 100, 0.3)`;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(path.x, path.y, path.width, path.height);
        ctx.setLineDash([]);
    });
    
    // Desenhar paredes do labirinto
    phase2Data.maze.forEach(wall => {
        // Gradiente 3D melhorado
        const gradient = ctx.createLinearGradient(wall.x, wall.y, wall.x + wall.width, wall.y + wall.height);
        gradient.addColorStop(0, '#445566');
        gradient.addColorStop(0.5, '#2c3e50');
        gradient.addColorStop(1, '#1a252f');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        
        // Highlights superiores
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(wall.x, wall.y, wall.width, 3);
        ctx.fillRect(wall.x, wall.y, 3, wall.height);
        
        // Sombras inferiores
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(wall.x, wall.y + wall.height - 3, wall.width, 3);
        ctx.fillRect(wall.x + wall.width - 3, wall.y, 3, wall.height);
        
        // Contorno definido
        ctx.strokeStyle = '#1a252f';
        ctx.lineWidth = 2;
        ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
        
        // Textura de circuito nas paredes
        if (wall.width > 50 || wall.height > 50) {
            ctx.strokeStyle = 'rgba(0, 255, 100, 0.1)';
            ctx.lineWidth = 1;
            const lines = Math.floor(Math.max(wall.width, wall.height) / 30);
            for (let i = 0; i < lines; i++) {
                const offset = (i * 30) + 10;
                if (wall.width > wall.height) {
                    ctx.beginPath();
                    ctx.moveTo(wall.x + offset, wall.y + 5);
                    ctx.lineTo(wall.x + offset, wall.y + wall.height - 5);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(wall.x + 5, wall.y + offset);
                    ctx.lineTo(wall.x + wall.width - 5, wall.y + offset);
                    ctx.stroke();
                }
            }
        }
    });
    
    // Grid sutil de ajuda
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 10]);
    
    for (let x = 100; x < 1000; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, 680);
        ctx.stroke();
    }
    
    for (let y = 100; y < 700; y += 100) {
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(980, y);
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

// IMPORTANTE: Esta função deve ser chamada no loop principal do jogo
// Adicione no seu gameLoop ou update principal: updatePhase2Boss();
function updatePhase2Boss() {
    if (!phase2Data.boss.active || phase2Data.boss.defeated || !phase2Data.boss.isMoving) return;
    
    const boss = phase2Data.boss;
    const now = Date.now();
    
    // Mudar direção a cada 2 segundos ou aleatoriamente
    if (now - boss.lastDirectionChange > 1500) {
        const directions = [
            {x: 1, y: 0},   // Direita
            {x: -1, y: 0},  // Esquerda
            {x: 0, y: 1},   // Baixo
            {x: 0, y: -1},  // Cima
            {x: 1, y: 1},   // Diagonal direita-baixo
            {x: -1, y: 1},  // Diagonal esquerda-baixo
            {x: 1, y: -1},  // Diagonal direita-cima
            {x: -1, y: -1}, // Diagonal esquerda-cima
        ];
        boss.direction = directions[Math.floor(Math.random() * directions.length)];
        boss.lastDirectionChange = now;
    }
    
    // Mover o boss
    const newX = boss.x + boss.direction.x * boss.speed;
    const newY = boss.y + boss.direction.y * boss.speed;
    
    // Verificar colisão com paredes antes de mover
    let canMove = true;
    phase2Data.maze.forEach(wall => {
        if (newX < wall.x + wall.width &&
            newX + boss.width > wall.x &&
            newY < wall.y + wall.height &&
            newY + boss.height > wall.y) {
            canMove = false;
        }
    });
    
    // Verificar limites da área do boss (pode se mover por toda a tela)
    if (newX < 20 || newX > 920 || newY < 20 || newY > 620) {
        canMove = false;
    }
    
    if (canMove) {
        boss.x = newX;
        boss.y = newY;
    } else {
        // Se colidir, mudar direção imediatamente
        boss.direction.x *= -1;
        boss.direction.y *= -1;
        boss.lastDirectionChange = now;
    }
}

function drawPhase2Boss() {
    if (!phase2Data.boss.active || phase2Data.boss.defeated) return;
    
    const boss = phase2Data.boss;
    const shake = boss.hp < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
    const moveGlow = boss.isMoving ? Math.sin(Date.now() / 200) * 10 + 30 : 30;
    
    // Rastro de movimento
    if (boss.isMoving) {
        ctx.shadowColor = '#e67e22';
        ctx.shadowBlur = moveGlow;
        ctx.fillStyle = 'rgba(230, 126, 34, 0.2)';
        ctx.beginPath();
        ctx.arc(boss.x + 30, boss.y + 30, 45, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.shadowColor = '#e67e22';
    ctx.shadowBlur = 40;
    
    // Corpo principal
    ctx.fillStyle = boss.isMoving ? '#e74c3c' : '#e67e22';
    ctx.fillRect(boss.x + shake, boss.y, boss.width, boss.height);
    
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 4;
    ctx.strokeRect(boss.x, boss.y, boss.width, boss.height);
    
    // Antenas/Cabelo malicioso
    ctx.fillStyle = '#d35400';
    for (let i = 0; i < 4; i++) {
        const offset = Math.sin(Date.now() / 200 + i) * 5;
        ctx.fillRect(boss.x + 5 + i * 13, boss.y + 10 + offset, 10, 4);
    }
    
    // Olhos malignos
    ctx.fillStyle = boss.isMoving ? '#ff0000' : '#000';
    ctx.fillRect(boss.x + 15, boss.y + 28, 14, 14);
    ctx.fillRect(boss.x + 31, boss.y + 28, 14, 14);
    
    // Boca sorrindo (vilão)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(boss.x + 30, boss.y + 48, 12, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Barra de HP
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(boss.x - 5, boss.y - 25, boss.width + 10, 12);
    
    ctx.fillStyle = boss.hp === 3 ? '#00ff41' : boss.hp === 2 ? '#f39c12' : '#e74c3c';
    const hpWidth = ((boss.width + 10) * boss.hp) / boss.maxHp;
    ctx.fillRect(boss.x - 5, boss.y - 25, hpWidth, 12);
    
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 2;
    ctx.strokeRect(boss.x - 5, boss.y - 25, boss.width + 10, 12);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Rajdhani';
    ctx.textAlign = 'center';
    ctx.fillText(`HP: ${boss.hp}/${boss.maxHp}`, boss.x + 30, boss.y - 16);
    
    // Status de movimento
    if (boss.isMoving) {
        ctx.fillStyle = '#ff3333';
        ctx.font = 'bold 12px Rajdhani';
        ctx.fillText('⚡ ALERTA ⚡', boss.x + 30, boss.y - 38);
    }
    
    // Indicador de interação
    if (isNear(player, boss, 150)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
        ctx.font = 'bold 18px Rajdhani';
        ctx.fillText('PRESSIONE ESPAÇO!', boss.x + 30, boss.isMoving ? boss.y - 50 : boss.y - 35);
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
        
        // ATIVAR MOVIMENTO APÓS O PRIMEIRO HIT
        if (phase2Data.boss.hp === 2 && !phase2Data.boss.isMoving) {
            phase2Data.boss.isMoving = true;
            phase2Data.boss.movementStartTime = Date.now();
            phase2Data.boss.speed = 2.5;
            showDialogue('⚠️ O hacker está FUGINDO! Persiga-o! 🏃‍♂️💨');
        }
        
        // Aumentar velocidade no último HP
        if (phase2Data.boss.hp === 1) {
            phase2Data.boss.speed = 3.5;
            showDialogue('🚨 CUIDADO! Ele está mais RÁPIDO agora! 💥');
        }
        
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