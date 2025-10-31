// FASE 3: PRAÇA DA PRIVACIDADE
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
                '🔒 Parabéns por chegar aqui, ' + gameState.playerName + '!',
                'A Praça da Privacidade é o teste final. Aqui você aprenderá sobre dados pessoais.',
                'Nem tudo deve ser compartilhado online. Informações pessoais são valiosas!',
                'Complete os desafios finais e proteja sua privacidade digital para sempre.'
            ],
            talked: false
        }
    ],
    
    puzzles: [
        {
            x: 200, y: 550, width: 50, height: 50,
            completed: false,
            question: 'PROTEÇÃO DE DADOS: O que é SEGURO compartilhar nas redes sociais?',
            options: [
                { text: 'Endereço completo de casa', correct: false, feedback: 'PERIGOSO! Criminosos podem usar essa informação.' },
                { text: 'Número de telefone pessoal', correct: false, feedback: 'ARRISCADO! Você pode receber spam, golpes ou invasões.' },
                { text: 'Fotos de hobbies e interesses gerais', correct: true, feedback: 'CORRETO! Compartilhar interesses é seguro, mas evite detalhes pessoais.' },
                { text: 'Horários de quando não está em casa', correct: false, feedback: 'CRÍTICO! Você está avisando quando sua casa está vazia!' }
            ]
        },
        {
            x: 800, y: 550, width: 50, height: 50,
            completed: false,
            question: 'CONFIGURAÇÕES DE PRIVACIDADE: Qual é a melhor prática?',
            options: [
                { text: 'Deixar perfil público para todos', correct: false, feedback: 'INSEGURO! Qualquer pessoa pode ver suas informações.' },
                { text: 'Aceitar todos os pedidos de amizade', correct: false, feedback: 'PERIGOSO! Golpistas criam perfis falsos para coletar dados.' },
                { text: 'Perfil privado, apenas amigos conhecidos', correct: true, feedback: 'EXCELENTE! Controle quem vê suas informações pessoais.' },
                { text: 'Compartilhar localização em tempo real', correct: false, feedback: 'ALERTA MÁXIMO! Você está revelando onde está a todo momento!' }
            ]
        },
        {
            x: 500, y: 100, width: 50, height: 50,
            completed: false,
            question: 'CONSCIÊNCIA DIGITAL: Um app pede acesso a seus contatos. O que fazer?',
            options: [
                { text: 'Permitir sempre, é normal', correct: false, feedback: 'NÃO! Muitos apps pedem mais permissões do que precisam.' },
                { text: 'Perguntar: o app realmente precisa disso?', correct: true, feedback: 'PERFEITO! Sempre questione e permita apenas o necessário.' },
                { text: 'Negar todas as permissões', correct: false, feedback: 'EXTREMO! Alguns apps precisam de certas permissões para funcionar.' },
                { text: 'Não me importo com permissões', correct: false, feedback: 'PERIGOSO! Você pode estar dando acesso a dados sensíveis.' }
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
        
        // Forma de octógono
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
        ctx.font = 'bold 18px Orbitron';
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
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(phase3Data.boss.x - 5, phase3Data.boss.y - 15, phase3Data.boss.width + 10, 8);
    
    ctx.fillStyle = '#8e44ad';
    const hpWidth = ((phase3Data.boss.width + 10) * phase3Data.boss.hp) / phase3Data.boss.maxHp;
    ctx.fillRect(phase3Data.boss.x - 5, phase3Data.boss.y - 15, hpWidth, 8);
    
    ctx.strokeStyle = '#71368a';
    ctx.lineWidth = 1;
    ctx.strokeRect(phase3Data.boss.x - 5, phase3Data.boss.y - 15, phase3Data.boss.width + 10, 8);
}

function checkPhase3Interactions() {
    if (gameState.paused) return;
    
    // NPCs
    phase3Data.npcs.forEach(npc => {
        if (isNear(player, npc) && npc.hasDialogue && !npc.talked) {
            audioManager.playInteract();
            npc.dialogue.forEach((text, index) => {
                setTimeout(() => showDialogue(text), index * 3000);
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
            completePhase(3);
        }
    }
}

function activatePhase3Boss() {
    phase3Data.boss.active = true;
    showDialogue('⚠️ INVASÃO! O vilão "Ladrão de Dados" quer suas informações! Proteja-as!');
}