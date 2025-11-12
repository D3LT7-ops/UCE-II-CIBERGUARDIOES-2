// FASE 1: FORTALEZA DAS SENHAS - VERSÃO SIMPLIFICADA PARA CRIANÇAS

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
                '🦉 Oi, ' + gameState.playerName + '! Eu sou a Coruja Cyber, sua amiga!',
                'Vamos aprender sobre SENHAS FORTES juntos? 🔐',
                'Senhas fracas são fáceis de descobrir. Os vilões adoram isso! 😈',
                'Vê aqueles cristais roxos brilhando? Vá até eles e pressione ESPAÇO! ✨'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            x: 200, y: 550, width: 50, height: 50,
            completed: false,
            question: '🔐 Qual dessas senhas é mais DIFÍCIL de descobrir?',
            options: [
                { text: '123456', correct: false, feedback: '❌ Muito fácil! Todo mundo tenta essa primeiro. Tente de novo!' },
                { text: 'senha', correct: false, feedback: '❌ Os vilões sabem essa palavra! Escolha outra!' },
                { text: 'C1b3r@2025!', correct: true, feedback: '✅ ISSO! Tem letras, números e símbolos. Super difícil de descobrir! 🌟' },
                { text: 'meunome', correct: false, feedback: '❌ Seu nome é fácil de descobrir! Tente outra opção!' }
            ]
        },
        {
            x: 800, y: 550, width: 50, height: 50,
            completed: false,
            question: '🤔 O que faz uma senha ser FORTE?',
            options: [
                { text: 'Ser curtinha', correct: false, feedback: '❌ Não! Senhas curtas são fáceis de adivinhar. Pense de novo!' },
                { text: 'Usar meu aniversário', correct: false, feedback: '❌ Vilões podem descobrir isso na internet! Tente outra!' },
                { text: 'Ter MUITOS caracteres diferentes', correct: true, feedback: '✅ PERFEITO! Quanto mais misturado, melhor! Você é um gênio! 🎉' },
                { text: 'Ser igual em tudo', correct: false, feedback: '❌ Perigo! Se descobrirem uma, descobrem todas! Escolha outra!' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            question: '🤐 Você deve contar sua senha para alguém?',
            options: [
                { text: 'Para meus amigos', correct: false, feedback: '❌ Não! Nem para os melhores amigos. Senha é segredo!' },
                { text: 'Para meus pais', correct: true, feedback: '✅ CERTO! Só para adultos que cuidam de você. Muito bem! 👏' },
                { text: 'Se alguém pedir', correct: false, feedback: '❌ NUNCA! Pessoas boas não pedem senhas. Tente outra!' },
                { text: 'Por mensagem', correct: false, feedback: '❌ Perigoso! Mensagens podem ser lidas por vilões! Escolha outra!' }
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
        
        // Corpo da coruja
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 20 + pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Olhos grandes e amigáveis
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(npc.x + 18, npc.y + 20, 7, 0, Math.PI * 2);
        ctx.arc(npc.x + 32, npc.y + 20, 7, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupilas
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(npc.x + 18, npc.y + 20, 3, 0, Math.PI * 2);
        ctx.arc(npc.x + 32, npc.y + 20, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Bico
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.moveTo(npc.x + 25, npc.y + 26);
        ctx.lineTo(npc.x + 20, npc.y + 32);
        ctx.lineTo(npc.x + 30, npc.y + 32);
        ctx.fill();
        
        // Efeito de brilho amigável
        ctx.strokeStyle = 'rgba(243, 156, 18, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 28, 0, Math.PI * 2);
        ctx.stroke();
        
        // Emoji acima da coruja
        ctx.shadowBlur = 0;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('💡', npc.x + 25, npc.y - 5);
        
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
        
        // Diamante maior e mais visível
        ctx.beginPath();
        ctx.moveTo(puzzle.x + 25, puzzle.y);
        ctx.lineTo(puzzle.x + 50, puzzle.y + 25);
        ctx.lineTo(puzzle.x + 25, puzzle.y + 50);
        ctx.lineTo(puzzle.x, puzzle.y + 25);
        ctx.closePath();
        ctx.fill();
        
        // Brilho interno
        ctx.fillStyle = puzzle.completed ? '#00ff41' : '#c39bd3';
        ctx.beginPath();
        ctx.moveTo(puzzle.x + 25, puzzle.y + 10);
        ctx.lineTo(puzzle.x + 40, puzzle.y + 25);
        ctx.lineTo(puzzle.x + 25, puzzle.y + 40);
        ctx.lineTo(puzzle.x + 10, puzzle.y + 25);
        ctx.closePath();
        ctx.fill();
        
        // Símbolo maior
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 24px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(puzzle.completed ? '✓' : '?', puzzle.x + 25, puzzle.y + 25);
        
        // Partículas mais visíveis
        if (!puzzle.completed) {
            for (let i = 0; i < 4; i++) {
                const angle = (Date.now() / 1000 + i * 1.5) % (Math.PI * 2);
                const px = puzzle.x + 25 + Math.cos(angle) * 40;
                const py = puzzle.y + 25 + Math.sin(angle) * 40;
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Indicador visual "PRESSIONE ESPAÇO"
        if (!puzzle.completed && isNear(player, puzzle, 100)) {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
            ctx.font = 'bold 14px Rajdhani';
            ctx.fillText('ESPAÇO', puzzle.x + 25, puzzle.y - 15);
        }
    });
}

function drawPhase1Boss() {
    if (!phase1Data.boss.active || phase1Data.boss.defeated) return;
    
    const shake = phase1Data.boss.hp < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
    
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 30;
    
    // Corpo do boss maior
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(phase1Data.boss.x + shake, phase1Data.boss.y, phase1Data.boss.width, phase1Data.boss.height);
    
    // Dados corrompidos
    ctx.fillStyle = '#c0392b';
    for (let i = 0; i < 5; i++) {
        const offset = Math.sin(Date.now() / 200 + i) * 3;
        ctx.fillRect(phase1Data.boss.x + 10 + i * 8 + offset, phase1Data.boss.y + 10, 6, 40);
    }
    
    // Rosto maligno mais visível
    ctx.fillStyle = '#000';
    ctx.fillRect(phase1Data.boss.x + 15, phase1Data.boss.y + 18, 12, 12);
    ctx.fillRect(phase1Data.boss.x + 35, phase1Data.boss.y + 18, 12, 12);
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(phase1Data.boss.x + 18, phase1Data.boss.y + 21, 6, 6);
    ctx.fillRect(phase1Data.boss.x + 38, phase1Data.boss.y + 21, 6, 6);
    
    // Sorriso maligno
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(phase1Data.boss.x + 30, phase1Data.boss.y + 38, 14, 0, Math.PI);
    ctx.stroke();
    
    // Barra de HP mais visível
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(phase1Data.boss.x - 5, phase1Data.boss.y - 20, phase1Data.boss.width + 10, 10);
    
    ctx.fillStyle = '#e74c3c';
    const hpWidth = ((phase1Data.boss.width + 10) * phase1Data.boss.hp) / phase1Data.boss.maxHp;
    ctx.fillRect(phase1Data.boss.x - 5, phase1Data.boss.y - 20, hpWidth, 10);
    
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(phase1Data.boss.x - 5, phase1Data.boss.y - 20, phase1Data.boss.width + 10, 10);
    
    // Texto HP
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Rajdhani';
    ctx.textAlign = 'center';
    ctx.fillText(`${phase1Data.boss.hp}/${phase1Data.boss.maxHp}`, phase1Data.boss.x + 30, phase1Data.boss.y - 12);
    
    // Indicador "CHEGUE PERTO"
    if (isNear(player, phase1Data.boss, 150)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.font = 'bold 16px Rajdhani';
        ctx.fillText('CHEGUE PERTO!', phase1Data.boss.x + 30, phase1Data.boss.y - 30);
    }
}

function checkPhase1Interactions() {
    if (gameState.paused) return;
    
    // NPCs
    phase1Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3500);
            });
            npc.talked = true;
        }
    });

    // Puzzles
    phase1Data.puzzles.forEach((puzzle, index) => {
        if (isNear(player, puzzle) && !puzzle.completed) {
            audioManager.playInteract();
            showPuzzle(puzzle, index, 1);
        }
    });

    // Boss
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
            showDialogue('🎉 VOCÊ VENCEU! O vilão "Senha Fraca" fugiu! Você protegeu a fortaleza! 🏆');
            setTimeout(() => completePhase(1), 2000);
        } else {
            showDialogue(`💥 Acertou! Ainda faltam ${phase1Data.boss.hp} ataques! Continue!`);
        }
    }
}

function activatePhase1Boss() {
    phase1Data.boss.active = true;
    showDialogue('⚠️ CUIDADO! O vilão "Senha Fraca" apareceu! Chegue perto dele 3 vezes para derrotá-lo! 💪');
}