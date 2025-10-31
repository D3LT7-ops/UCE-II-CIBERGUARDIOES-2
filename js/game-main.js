// Controle Principal do Jogo
let currentPhaseData = phase1Data;
let checkInteractionsCooldown = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Redirecionar se não houver nome
    if (!gameState.playerName || gameState.playerName === 'Guardião') {
        window.location.href = 'index.html';
        return;
    }
    
    // Iniciar música de fundo
    audioManager.startBackgroundMusic();
    
    // Mostrar diálogo inicial
    setTimeout(() => {
        showDialogue('Bem-vindo, ' + gameState.playerName + '! Pressione ESPAÇO para interagir com NPCs e objetos.');
    }, 1000);
    
    // Iniciar game loop
    gameLoop();
});

// Mostrar Puzzle
function showPuzzle(puzzle, index, phase) {
    const overlay = document.getElementById('puzzleOverlay');
    const content = document.getElementById('puzzleContent');
    
    let html = `<h2>◢ DESAFIO DE SEGURANÇA ◣</h2><p>${puzzle.question}</p><div class="puzzle-options">`;
    
    puzzle.options.forEach((option, optIndex) => {
        html += `<button class="puzzle-option" onclick="checkPuzzleAnswer(${phase}, ${index}, ${optIndex})">▸ ${option.text}</button>`;
    });
    
    html += '</div>';
    content.innerHTML = html;
    overlay.classList.add('show');
    gameState.paused = true;
}

// Verificar Resposta do Puzzle
window.checkPuzzleAnswer = function(phase, puzzleIndex, optionIndex) {
    let phaseData;
    if (phase === 1) phaseData = phase1Data;
    else if (phase === 2) phaseData = phase2Data;
    else phaseData = phase3Data;
    
    const puzzle = phaseData.puzzles[puzzleIndex];
    const option = puzzle.options[optionIndex];
    const buttons = document.querySelectorAll('.puzzle-option');
    
    buttons[optionIndex].classList.add(option.correct ? 'correct' : 'wrong');
    
    if (option.correct) {
        audioManager.playSuccess();
    } else {
        audioManager.playError();
    }
    
    setTimeout(() => {
        if (option.correct) {
            puzzle.completed = true;
            phaseData.puzzlesCompleted++;
            updateScore(100);
            createExplosion(puzzle.x + 25, puzzle.y + 25, '#00ff41');
            audioManager.playPuzzleComplete();
            
            showDialogue(option.feedback);
            
            if (phaseData.puzzlesCompleted === phaseData.puzzles.length) {
                setTimeout(() => {
                    if (phase === 1) activatePhase1Boss();
                    else if (phase === 2) activatePhase2Boss();
                    else activatePhase3Boss();
                }, 2000);
            }
        } else {
            showDialogue(option.feedback + ' Tente novamente!');
        }
        document.getElementById('puzzleOverlay').classList.remove('show');
        gameState.paused = false;
    }, 1500);
};

// Completar Fase
function completePhase(phaseNum) {
    if (phaseNum === 1) gameState.phase1Complete = true;
    else if (phaseNum === 2) gameState.phase2Complete = true;
    else if (phaseNum === 3) gameState.phase3Complete = true;
    
    audioManager.playPhaseComplete();
    
    document.getElementById('phaseScore').textContent = gameState.score;
    
    if (phaseNum < 3) {
        document.getElementById('phaseMessage').textContent = 
            `Excelente trabalho! Você dominou a Fase ${phaseNum}. Prepare-se para novos desafios!`;
        document.getElementById('phaseVictoryScreen').classList.add('show');
        gameState.paused = true;
        
        document.getElementById('nextPhaseBtn').onclick = () => {
            loadPhase(phaseNum + 1);
        };
    } else {
        // Jogo completo!
        completeTodoJogo();
    }
}

// Completar todo o jogo
async function completeTodoJogo() {
    document.getElementById('finalPlayerName').textContent = gameState.playerName;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalVictoryScreen').classList.add('show');
    gameState.paused = true;
    
    // Salvar automaticamente no ranking
    await salvarNoRanking();
}

async function salvarNoRanking() {
    const playerData = {
        name: gameState.playerName,
        score: gameState.score,
        completedPhases: 3,
        timestamp: Date.now()
    };
    
    try {
        const key = `player:${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await window.storage.set(key, JSON.stringify(playerData), true);
        console.log('Pontuação salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
    }
}

// Carregar Fase
function loadPhase(phaseNum) {
    gameState.currentPhase = phaseNum;
    document.getElementById('currentPhase').textContent = phaseNum;
    
    // Resetar jogador
    player.x = 100;
    player.y = 350;
    
    // Esconder telas
    document.getElementById('phaseVictoryScreen').classList.remove('show');
    gameState.paused = false;
    
    if (phaseNum === 1) {
        currentPhaseData = phase1Data;
        document.getElementById('phaseName').textContent = 'FORTALEZA DAS SENHAS';
    } else if (phaseNum === 2) {
        currentPhaseData = phase2Data;
        document.getElementById('phaseName').textContent = 'LABIRINTO DOS LINKS';
    } else if (phaseNum === 3) {
        currentPhaseData = phase3Data;
        document.getElementById('phaseName').textContent = 'PRAÇA DA PRIVACIDADE';
    }
    
    showDialogue(`Fase ${phaseNum} iniciada! Boa sorte, ${gameState.playerName}!`);
}

// Game Loop Principal
function gameLoop() {
    if (!gameState.paused) {
        updatePlayer();
        updateParticles();
        
        // Cooldown para interações
        if (checkInteractionsCooldown > 0) {
            checkInteractionsCooldown--;
        }
        
        if (keys.Space && checkInteractionsCooldown === 0) {
            if (gameState.currentPhase === 1) checkPhase1Interactions();
            else if (gameState.currentPhase === 2) checkPhase2Interactions();
            else if (gameState.currentPhase === 3) checkPhase3Interactions();
            checkInteractionsCooldown = 30; // ~0.5 segundos
        }
    }
    
    // Desenhar tudo
    drawBackground(currentPhaseData.title);
    
    if (gameState.currentPhase === 2) {
        drawPhase2Walls();
        if (!gameState.paused) checkPhase2Collisions();
    }
    
    drawParticles();
    
    if (gameState.currentPhase === 1) {
        drawPhase1NPCs();
        drawPhase1Puzzles();
        drawPhase1Boss();
    } else if (gameState.currentPhase === 2) {
        drawPhase2NPCs();
        drawPhase2Puzzles();
        drawPhase2Boss();
    } else if (gameState.currentPhase === 3) {
        drawPhase3NPCs();
        drawPhase3Puzzles();
        drawPhase3Boss();
    }
    
    drawPlayer();
    
    requestAnimationFrame(gameLoop);
}

// Prevenir saída acidental
window.addEventListener('beforeunload', (e) => {
    if (!gameState.phase3Complete) {
        e.preventDefault();
        e.returnValue = 'Tem certeza? Seu progresso será perdido!';
        return e.returnValue;
    }
});