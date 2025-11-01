/* ═══════════════════════════════════════════════════════════════════
   ARQUIVO 10: js/audio-manager.js
   ═══════════════════════════════════════════════════════════════════ */

// Sistema de Áudio do Jogo
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.music = null;
        this.volume = 0.5;
        this.muted = false;
        
        this.initAudio();
        this.setupControls();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API não suportada');
        }
    }

    setupControls() {
        const muteBtn = document.getElementById('muteBtn');
        const volumeSlider = document.getElementById('volumeSlider');

        muteBtn.addEventListener('click', () => {
            this.toggleMute();
        });

        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
    }

    // Gerar tons sintetizados
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext || this.muted) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Sons do jogo
    playWalk() {
        this.playTone(200, 0.05, 'square');
    }

    playInteract() {
        this.playTone(600, 0.1, 'sine');
    }

    playSuccess() {
        this.playTone(523.25, 0.1, 'sine');
        setTimeout(() => this.playTone(659.25, 0.1, 'sine'), 100);
        setTimeout(() => this.playTone(783.99, 0.2, 'sine'), 200);
    }

    playError() {
        this.playTone(200, 0.15, 'sawtooth');
        setTimeout(() => this.playTone(150, 0.15, 'sawtooth'), 150);
    }

    playPuzzleComplete() {
        this.playTone(523.25, 0.1);
        setTimeout(() => this.playTone(659.25, 0.1), 100);
        setTimeout(() => this.playTone(783.99, 0.1), 200);
        setTimeout(() => this.playTone(1046.50, 0.3), 300);
    }

    playPhaseComplete() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playTone(400 + i * 100, 0.15, 'sine');
            }, i * 100);
        }
    }

    playBossHit() {
        this.playTone(150, 0.2, 'sawtooth');
    }

    playBossDefeat() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.playTone(800 - i * 100, 0.1, 'square');
            }, i * 80);
        }
    }

    // Música de fundo
    startBackgroundMusic() {
        if (this.music) return;
        
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33];
        let currentNote = 0;

        this.music = setInterval(() => {
            if (!this.muted) {
                this.playTone(notes[currentNote], 0.3, 'sine');
            }
            currentNote = (currentNote + 1) % notes.length;
        }, 500);
    }

    stopBackgroundMusic() {
        if (this.music) {
            clearInterval(this.music);
            this.music = null;
        }
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        document.getElementById('volumeSlider').value = this.volume * 100;
    }

    toggleMute() {
        this.muted = !this.muted;
        const muteBtn = document.getElementById('muteBtn');
        muteBtn.textContent = this.muted ? '🔇' : '🔊';
    }
}

// Instância global do gerenciador de áudio
const audioManager = new AudioManager();


/* ═══════════════════════════════════════════════════════════════════
   ARQUIVO 11: js/game-engine.js
   ═══════════════════════════════════════════════════════════════════ */

// Motor Principal do Jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Estado Global do Jogo
const gameState = {
    currentPhase: 1,
    score: 0,
    playerName: localStorage.getItem('playerName') || 'Guardião',
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
    
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = glowIntensity;
    
    // Corpo
    ctx.fillStyle = '#00ff41';
    ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, player.height - 10);
    
    // Cabeça
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(player.x + 10, player.y + 8, player.width - 20, 15);
    
    // Olhos com direção
    ctx.fillStyle = '#00ff41';
    if (player.direction === 'right') {
        ctx.fillRect(player.x + 22, player.y + 12, 6, 6);
    } else if (player.direction === 'left') {
        ctx.fillRect(player.x + 12, player.y + 12, 6, 6);
    } else {
        ctx.fillRect(player.x + 14, player.y + 12, 4, 6);
        ctx.fillRect(player.x + 22, player.y + 12, 4, 6);
    }
    
    // Visor
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(player.x + 8, player.y + 16);
    ctx.lineTo(player.x + 32, player.y + 16);
    ctx.stroke();
    
    // Braços
    ctx.fillStyle = '#00ff41';
    ctx.fillRect(player.x + 2, player.y + 24, 4, 10);
    ctx.fillRect(player.x + 34, player.y + 24, 4, 10);
    
    // Pernas com animação
    const legOffset = player.animFrame % 2 === 0 ? 2 : -2;
    if (player.moving) {
        ctx.fillRect(player.x + 12 + legOffset, player.y + 35, 5, 5);
        ctx.fillRect(player.x + 23 - legOffset, player.y + 35, 5, 5);
    } else {
        ctx.fillRect(player.x + 12, player.y + 35, 5, 5);
        ctx.fillRect(player.x + 23, player.y + 35, 5, 5);
    }
    
    ctx.shadowBlur = 0;
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

// Exibir nome do jogador
document.getElementById('playerNameDisplay').textContent = gameSt