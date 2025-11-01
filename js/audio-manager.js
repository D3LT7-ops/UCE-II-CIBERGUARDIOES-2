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