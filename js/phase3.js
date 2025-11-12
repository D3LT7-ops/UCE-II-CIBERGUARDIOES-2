// FASE 3: PRAÇA DA PRIVACIDADE - VERSÃO SIMPLIFICADA PARA CRIANÇAS

const phase3Data = {
    title: '◢ PRAÇA DA PRIVACIDADE ◣',
    puzzlesCompleted: 0,
    bossDefeated: false,
    
    npcs: [
        {
            x: 500, y: 300, width: 50, height: 50,
            type: 'lock',
            name: 'Privacy Keeper',
            hasDialogue: true,
            dialogue: [
                '🔒 Parabéns, ' + gameState.playerName + '! Você chegou na última fase!',
                'Aqui vamos aprender sobre PRIVACIDADE! 🎉',
                'Privacidade significa: o que é SEU, fica com VOCÊ! 🤫',
                'Complete estes últimos desafios e você será um Mestre da Segurança! 🏆'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            x: 200, y: 550, width: 50, height: 50,
            completed: false,
            question: '📱 O que é SEGURO postar nas redes sociais?',
            options: [
                { text: 'Meu endereço completo', correct: false, feedback: '❌ PERIGOSO! Pessoas ruins podem te achar! Não faça isso! Tente outra!' },
                { text: 'Meu telefone', correct: false, feedback: '❌ Não compartilhe! Você pode receber ligações de estranhos! Escolha outra!' },
                { text: 'Fotos de coisas que gosto', correct: true, feedback: '✅ ISSO! Compartilhar seus gostos é legal e seguro! Muito bem! 🌟' },
                { text: 'Quando não estou em casa', correct: false, feedback: '❌ MUITO PERIGOSO! Você está dizendo que sua casa está vazia! Tente outra!' }
            ]
        },
        {
            x: 800, y: 550, width: 50, height: 50,
            completed: false,
            question: '🔐 Como deixar seu perfil mais SEGURO?',
            options: [
                { text: 'Deixar PÚBLICO', correct: false, feedback: '❌ Não! Qualquer pessoa pode ver suas coisas! Escolha outra!' },
                { text: 'Aceitar TODOS', correct: false, feedback: '❌ Perigo! Tem pessoas más fingindo ser legais! Tente de novo!' },
                { text: 'Deixar PRIVADO só para amigos', correct: true, feedback: '✅ PERFEITO! Só quem você conhece vê suas coisas! Você é demais! 👏' },
                { text: 'Mostrar onde estou', correct: false, feedback: '❌ MUITO PERIGOSO! Nunca revele onde você está! Escolha outra!' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            question: '📲 Um app pede acesso aos seus contatos. O que fazer?',
            options: [
                { text: 'Deixar sempre', correct: false, feedback: '❌ Não! Nem todos os apps precisam disso! Pense melhor!' },
                { text: 'Perguntar: "Ele PRECISA?"', correct: true, feedback: '✅ ÓTIMO! Sempre questione antes! Você é muito esperto! 🎉' },
                { text: 'Negar tudo', correct: false, feedback: '❌ Alguns apps precisam de permissões para funcionar. Escolha outra!' },
                { text: 'Não me importo', correct: false, feedback: '❌ Suas informações são importantes! Cuide delas! Tente outra!' }
            ]
        }
    ],
    
    boss: {
        x: 900, y: 150, width: 60, height: 60,
        active: false, defeated: false, hp: 3, maxHp: 3
    }
};

function drawPhase3NPCs() {
    phase3Data.npcs.forEach(npc => {
        const pulse = Math.sin(Date.now() / 300) * 3;
        
        ctx.shadowColor = '#9b59b6';
        ctx.shadowBlur = 15;
        
        // Cadeado
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(npc.x + 12, npc.y + 20, 26, 25);
        
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 20, 12, Math.PI, 0, true);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#9b59b6';
        ctx.stroke();
        
        // Buraco da fechadura
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 30, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillRect(npc.x + 23, npc.y + 33, 4, 8);
        
        // Brilho de proteção
        ctx.strokeStyle = 'rgba(155, 89, 182, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(npc.x + 25, npc.y + 25, 28 + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        // Emoji acima
        ctx.shadowBlur = 0;
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('🔐', npc.x + 25, npc.y - 5);
        
        ctx.shadowBlur = 0;
    });
}

function drawPhase3Puzzles() {
    phase3Data.puzzles.forEach(puzzle => {
        const pulse = Math.sin(Date.now() / 400) * 5;
        
        if (puzzle.completed) {
            ctx.shadowColor = '#00ff41';
            ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        } else {
            ctx.shadowColor = '#1abc9c';
            ctx.fillStyle = '#1abc9c';
        }
        
        ctx.shadowBlur = 20 + pulse;
        
        // Octógono
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i;
            const x = puzzle.x + 25 + Math.cos(angle) * 23;
            const y = puzzle.y + 25 + Math.sin(angle) * 23;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        // Símbolo
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(puzzle.completed ? '✓' : '🔐', puzzle.x + 25, puzzle.y + 25);
        
        // Partículas de dados
        if (!puzzle.completed) {
            for (let i = 0; i < 5; i++) {
                const angle = (Date.now() / 1000 + i * (Math.PI * 2 / 5)) % (Math.PI * 2);
                const px = puzzle.x + 25 + Math.cos(angle) * 38;
                const py = puzzle.y + 25 + Math.sin(angle) * 38;
                ctx.fillStyle = '#1abc9c';
                ctx.fillRect(px - 2, py - 2, 4, 4);
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

function drawPhase3Boss() {
    if (!phase3Data.boss.active || phase3Data.boss.defeated) return;
    
    const shake = phase3Data.boss.hp < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
    
    ctx.shadowColor = '#8e44ad';
    ctx.shadowBlur = 30;
    
    // Corpo do Data Thief
    ctx.fillStyle = '#8e44ad';
    ctx.fillRect(phase3Data.boss.x + shake, phase3Data.boss.y, phase3Data.boss.width, phase3Data.boss.height);
    
    // Dados roubados
    ctx.fillStyle = '#71368a';
    for (let i = 0; i < 6; i++) {
        const offset = Math.sin(Date.now() / 150 + i) * 4;
        ctx.fillRect(phase3Data.boss.x + 5 + i * 8, phase3Data.boss.y + 5 + offset, 6, 6);
    }
    
    // Olhos ladrões
    ctx.fillStyle = '#fff';
    ctx.fillRect(phase3Data.boss.x + 12, phase3Data.boss.y + 25, 14, 14);
    ctx.fillRect(phase3Data.boss.x + 34, phase3Data.boss.y + 25, 14, 14);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(phase3Data.boss.x + 16, phase3Data.boss.y + 29, 6, 6);
    ctx.fillRect(phase3Data.boss.x + 38, phase3Data.boss.y + 29, 6, 6);
    
    // Barra de HP
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(phase3Data.boss.x - 5, phase3Data.boss.y - 20, phase3Data.boss.width + 10, 10);
    
    ctx.fillStyle = '#8e44ad';
    const hpWidth = ((phase3Data.boss.width + 10) * phase3Data.boss.hp) / phase3Data.boss.maxHp;
    ctx.fillRect(phase3Data.boss.x - 5, phase3Data.boss.y - 20, hpWidth, 10);
    
    ctx.strokeStyle = '#71368a';
    ctx.lineWidth = 2;
    ctx.strokeRect(phase3Data.boss.x - 5, phase3Data.boss.y - 20, phase3Data.boss.width + 10, 10);
    
    // Texto HP
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Rajdhani';
    ctx.textAlign = 'center';
    ctx.fillText(`${phase3Data.boss.hp}/${phase3Data.boss.maxHp}`, phase3Data.boss.x + 30, phase3Data.boss.y - 12);
    
    // Indicador
    if (isNear(player, phase3Data.boss, 150)) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.font = 'bold 16px Rajdhani';
        ctx.fillText('CHEGUE PERTO!', phase3Data.boss.x + 30, phase3Data.boss.y - 30);
    }
}

function checkPhase3Interactions() {
    if (gameState.paused) return;
    
    // NPCs
    phase3Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3500);
            });
            npc.talked = true;
        }
    });

    // Puzzles
    phase3Data.puzzles.forEach((puzzle, index) => {
        if (isNear(player, puzzle) && !puzzle.completed) {
            audioManager.playInteract();
            showPuzzle(puzzle, index, 3);
        }
    });

    // Boss
    if (phase3Data.boss.active && !phase3Data.boss.defeated && isNear(player, phase3Data.boss)) {
        phase3Data.boss.hp--;
        audioManager.playBossHit();
        createExplosion(phase3Data.boss.x + 30, phase3Data.boss.y + 30, '#8e44ad');
        
        if (phase3Data.boss.hp <= 0) {
            phase3Data.boss.defeated = true;
            phase3Data.bossDefeated = true;
            audioManager.playBossDefeat();
            updateScore(500);
            createExplosion(phase3Data.boss.x + 30, phase3Data.boss.y + 30, '#00ff41');
            showDialogue('🎉 INCRÍVEL! Você derrotou o "Ladrão de Dados"! Agora você é um MESTRE DA PRIVACIDADE! 🏆✨');
            setTimeout(() => completePhase(3), 2000);
        } else {
            showDialogue(`💥 Mandou bem! Faltam ${phase3Data.boss.hp} ataques! Quase lá!`);
        }
    }
}

function activatePhase3Boss() {
    phase3Data.boss.active = true;
    showDialogue('⚠️ INVASÃO! O vilão "Ladrão de Dados" quer roubar suas informações! Chegue perto 3 vezes e proteja seus dados! 💪🔒');
}