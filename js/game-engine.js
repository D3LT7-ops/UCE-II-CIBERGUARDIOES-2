// Motor Principal do Jogo - COM PERSONAGENS ALEX E LUNA
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Estado Global do Jogo
const gameState = {
    currentPhase: 1,
    score: 0,
    playerName: localStorage.getItem('playerName') || 'Guardião',
    selectedCharacter: localStorage.getItem('selectedCharacter') || 'link', // alex ou luna
    paused: false,
    phase1Complete: false,
    phase2Complete: false,
    phase3Complete: false
};

// Jogador
const player = {
    x: 100,
    y: 350,
    width: 40,
    height: 40,
    speed: 4,
    direction: 'right',
    animFrame: 0,
    animCounter: 0,
    moving: false
};

// Controles do Teclado
const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
    Space: false, Escape: false
};

// Partículas e Efeitos
let particles = [];
let gridParticles = [];

// Inicializar partículas do grid
for (let i = 0; i < 50; i++) {
    gridParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
    });
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
        e.preventDefault();
    }
    if (e.key === ' ' || e.key === 'Space') {
        keys.Space = true;
        e.preventDefault();
    }
    if (e.key === 'Escape') {
        togglePause();
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
    if (e.key === ' ' || e.key === 'Space') keys.Space = false;
});

// Funções Principais
function updatePlayer() {
    if (gameState.paused) return;
    
    player.moving = false;
    let prevX = player.x;
    let prevY = player.y;
    
    if (keys.w || keys.ArrowUp) {
        player.y -= player.speed;
        player.direction = 'up';
        player.moving = true;
    }
    if (keys.s || keys.ArrowDown) {
        player.y += player.speed;
        player.direction = 'down';
        player.moving = true;
    }
    if (keys.a || keys.ArrowLeft) {
        player.x -= player.speed;
        player.direction = 'left';
        player.moving = true;
    }
    if (keys.d || keys.ArrowRight) {
        player.x += player.speed;
        player.direction = 'right';
        player.moving = true;
    }

    if (player.moving && (prevX !== player.x || prevY !== player.y)) {
        player.animCounter++;
        if (player.animCounter > 10) {
            player.animFrame = (player.animFrame + 1) % 4;
            player.animCounter = 0;
            if (player.animFrame % 2 === 0) {
                audioManager.playWalk();
            }
        }
    }

    // Limites do canvas
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function drawPlayer() {
    const glowIntensity = Math.sin(Date.now() / 200) * 5 + 10;
    
    ctx.shadowColor = gameState.selectedCharacter === 'link' ? '#00ff41' : '#9b59b6';
    ctx.shadowBlur = glowIntensity;
    
    // Verificar qual personagem desenhar
    if (gameState.selectedCharacter === 'link') {
        drawAlex();
    } else {
        drawLuna();
    }
    
    ctx.shadowBlur = 0;
}

// DESENHAR ALEX (Link - Masculino)
function drawAlex() {
    const px = player.x;
    const py = player.y;
    const legOffset = player.moving && player.animFrame % 2 === 0 ? 2 : -2;
    
    // Corpo (roupa verde)
    ctx.fillStyle = '#00cc33';
    ctx.fillRect(px + 8, py + 15, 24, 20);
    
    // Cabeça (pele)
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.arc(px + 20, py + 12, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Cabelo (marrom)
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(px + 20, py + 8, 11, Math.PI, 0, true);
    ctx.fill();
    
    // Pontas do cabelo
    ctx.fillRect(px + 10, py + 8, 4, 6);
    ctx.fillRect(px + 26, py + 8, 4, 6);
    
    // Olhos (direção)
    ctx.fillStyle = '#000';
    if (player.direction === 'right') {
        ctx.fillRect(px + 24, py + 11, 3, 3);
    } else if (player.direction === 'left') {
        ctx.fillRect(px + 13, py + 11, 3, 3);
    } else {
        ctx.fillRect(px + 16, py + 11, 3, 3);
        ctx.fillRect(px + 21, py + 11, 3, 3);
    }
    
    // Boca (sorriso)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(px + 20, py + 15, 3, 0, Math.PI);
    ctx.stroke();
    
    // Braços
    ctx.fillStyle = '#00cc33';
    ctx.fillRect(px + 3, py + 18, 5, 12);
    ctx.fillRect(px + 32, py + 18, 5, 12);
    
    // Mãos (pele)
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(px + 3, py + 28, 5, 4);
    ctx.fillRect(px + 32, py + 28, 5, 4);
    
    // Espada (no braço direito)
    if (player.direction === 'right') {
        ctx.fillStyle = '#silver';
        ctx.fillRect(px + 34, py + 20, 3, 15);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(px + 33, py + 32, 5, 4);
    }
    
    // Escudo (no braço esquerdo quando olha para esquerda)
    if (player.direction === 'left') {
        ctx.fillStyle = '#4169E1';
        ctx.fillRect(px, py + 20, 6, 10);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py + 20, 6, 10);
    }
    
    // Pernas (calça marrom)
    ctx.fillStyle = '#654321';
    if (player.moving) {
        ctx.fillRect(px + 10 + legOffset, py + 35, 7, 5);
        ctx.fillRect(px + 23 - legOffset, py + 35, 7, 5);
    } else {
        ctx.fillRect(px + 10, py + 35, 7, 5);
        ctx.fillRect(px + 23, py + 35, 7, 5);
    }
    
    // Botas (marrom escuro)
    ctx.fillStyle = '#3d2817';
    ctx.fillRect(px + 10, py + 37, 7, 3);
    ctx.fillRect(px + 23, py + 37, 7, 3);
    
    // Cinto (dourado)
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(px + 8, py + 27, 24, 2);
    
    // Fivela do cinto
    ctx.fillRect(px + 18, py + 26, 4, 4);
}

// DESENHAR LUNA (Zelda - Feminino)
function drawLuna() {
    const px = player.x;
    const py = player.y;
    const legOffset = player.moving && player.animFrame % 2 === 0 ? 2 : -2;
    
    // Corpo (vestido roxo)
    ctx.fillStyle = '#9b59b6';
    ctx.fillRect(px + 8, py + 15, 24, 22);
    
    // Saia (mais larga)
    ctx.fillRect(px + 5, py + 30, 30, 7);
    
    // Cabeça (pele)
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.arc(px + 20, py + 12, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Cabelo longo (loiro)
    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.arc(px + 20, py + 8, 11, Math.PI, 0, true);
    ctx.fill();
    
    // Cabelo dos lados (cascata)
    ctx.fillRect(px + 8, py + 12, 4, 15);
    ctx.fillRect(px + 28, py + 12, 4, 15);
    
    // Coroa (dourada)
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(px + 14, py + 3, 12, 3);
    // Pontas da coroa
    ctx.fillRect(px + 15, py + 1, 2, 2);
    ctx.fillRect(px + 19, py + 0, 2, 3);
    ctx.fillRect(px + 23, py + 1, 2, 2);
    
    // Olhos (azuis - mais expressivos)
    ctx.fillStyle = '#1E90FF';
    if (player.direction === 'right') {
        ctx.fillRect(px + 24, py + 11, 3, 4);
    } else if (player.direction === 'left') {
        ctx.fillRect(px + 13, py + 11, 3, 4);
    } else {
        ctx.fillRect(px + 16, py + 11, 3, 4);
        ctx.fillRect(px + 21, py + 11, 3, 4);
    }
    
    // Cílios
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    if (player.direction === 'right') {
        ctx.beginPath();
        ctx.moveTo(px + 27, py + 10);
        ctx.lineTo(px + 28, py + 9);
        ctx.stroke();
    } else if (player.direction === 'left') {
        ctx.beginPath();
        ctx.moveTo(px + 13, py + 10);
        ctx.lineTo(px + 12, py + 9);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(px + 16, py + 10);
        ctx.lineTo(px + 15, py + 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + 24, py + 10);
        ctx.lineTo(px + 25, py + 9);
        ctx.stroke();
    }
    
    // Boca (sorriso)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(px + 20, py + 16, 3, 0, Math.PI);
    ctx.stroke();
    
    // Braços
    ctx.fillStyle = '#9b59b6';
    ctx.fillRect(px + 3, py + 18, 5, 12);
    ctx.fillRect(px + 32, py + 18, 5, 12);
    
    // Mãos (pele)
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(px + 3, py + 28, 5, 4);
    ctx.fillRect(px + 32, py + 28, 5, 4);
    
    // Magia (brilho na mão direita)
    if (player.direction === 'right' || player.direction === 'down') {
        const magicPulse = Math.sin(Date.now() / 300) * 2;
        ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
        ctx.beginPath();
        ctx.arc(px + 37, py + 30, 4 + magicPulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Partículas mágicas
        ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.fillRect(px + 39, py + 26, 2, 2);
        ctx.fillRect(px + 36, py + 33, 2, 2);
        ctx.fillRect(px + 40, py + 32, 2, 2);
    }
    
    // Pernas (roxo mais escuro)
    ctx.fillStyle = '#8e44ad';
    if (player.moving) {
        ctx.fillRect(px + 12 + legOffset, py + 37, 6, 3);
        ctx.fillRect(px + 22 - legOffset, py + 37, 6, 3);
    } else {
        ctx.fillRect(px + 12, py + 37, 6, 3);
        ctx.fillRect(px + 22, py + 37, 6, 3);
    }
    
    // Sapatos (dourados)
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(px + 12, py + 38, 6, 2);
    ctx.fillRect(px + 22, py + 38, 6, 2);
    
    // Detalhes do vestido (faixa dourada)
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(px + 8, py + 27, 24, 2);
    
    // Joia no vestido
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.arc(px + 20, py + 21, 2, 0, Math.PI * 2);
    ctx.fill();
}

function updateParticles() {
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life--;
        return p.life > 0;
    });
    
    gridParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 60;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1;
}

function drawBackground(phaseTitle) {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Partículas flutuantes
    gridParticles.forEach(p => {
        ctx.fillStyle = '#00ff41';
        ctx.globalAlpha = 0.5;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1;
    
    // Título da fase
    ctx.fillStyle = 'rgba(0, 255, 65, 0.05)';
    ctx.font = 'bold 36px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText(phaseTitle, canvas.width/2, 50);
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 60,
            color: color,
            size: Math.random() * 4 + 2
        });
    }
}

function isNear(obj1, obj2, distance = 70) {
    const dx = (obj1.x + obj1.width/2) - (obj2.x + obj2.width/2);
    const dy = (obj1.y + obj1.height/2) - (obj2.y + obj2.height/2);
    return Math.sqrt(dx*dx + dy*dy) < distance;
}

function showDialogue(text) {
    document.getElementById('dialogueText').textContent = text;
    document.getElementById('dialogue').classList.add('show');
}

function hideDialogue() {
    document.getElementById('dialogue').classList.remove('show');
}

function updateScore(points) {
    gameState.score += points;
    document.getElementById('scoreValue').textContent = gameState.score;
}

function togglePause() {
    gameState.paused = !gameState.paused;
    const pauseScreen = document.getElementById('pauseScreen');
    if (gameState.paused) {
        pauseScreen.classList.add('show');
    } else {
        pauseScreen.classList.remove('show');
    }
}

// Botão de resumir
document.getElementById('resumeBtn').addEventListener('click', togglePause);

// Botão de continuar diálogo
document.getElementById('dialogueButton').addEventListener('click', hideDialogue);

// Exibir nome do jogador e personagem escolhido
document.getElementById('playerNameDisplay').textContent = gameState.playerName;

// Mostrar qual personagem está jogando
const characterName = gameState.selectedCharacter === 'link' ? 'Alex' : 'Luna';
console.log(`🎮 Jogando com: ${characterName}`);