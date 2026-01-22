import React, { useState, useEffect, useRef } from 'react';
import { Lock, Shield, Award, Star } from 'lucide-react';

const PrivacyPlazaGame = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    playerName: 'Jogador',
    playerX: 100,
    playerY: 500,
    score: 0,
    dialogueVisible: false,
    dialogueText: '',
    puzzleVisible: false,
    currentPuzzle: null,
    puzzlesCompleted: 0,
    bossActive: false,
    bossHP: 3,
    bossDefeated: false,
    gameCompleted: false
  });

  const [keys, setKeys] = useState({});
  const [particles, setParticles] = useState([]);

  const puzzles = [
    {
      id: 1, x: 150, y: 450,
      question: '📱 O que é SEGURO postar nas redes sociais?',
      options: [
        { text: 'Meu endereço completo', correct: false },
        { text: 'Meu telefone', correct: false },
        { text: 'Fotos de coisas que gosto', correct: true },
        { text: 'Quando não estou em casa', correct: false }
      ],
      completed: false
    },
    {
      id: 2, x: 650, y: 450,
      question: '🔐 Como deixar seu perfil mais SEGURO?',
      options: [
        { text: 'Deixar PÚBLICO', correct: false },
        { text: 'Aceitar TODOS', correct: false },
        { text: 'Deixar PRIVADO só para amigos', correct: true },
        { text: 'Mostrar onde estou', correct: false }
      ],
      completed: false
    },
    {
      id: 3, x: 400, y: 250,
      question: '📲 Um app pede acesso aos seus contatos. O que fazer?',
      options: [
        { text: 'Deixar sempre', correct: false },
        { text: 'Perguntar: "Ele PRECISA?"', correct: true },
        { text: 'Negar tudo', correct: false },
        { text: 'Não me importo', correct: false }
      ],
      completed: false
    }
  ];

  const [puzzleStates, setPuzzleStates] = useState(puzzles);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: true }));
      if (e.key === ' ' && !gameState.puzzleVisible) {
        checkInteractions();
      }
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, puzzleStates]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setGameState(prev => {
        let newX = prev.playerX;
        let newY = prev.playerY;
        if (keys['ArrowLeft'] || keys['a']) newX -= 5;
        if (keys['ArrowRight'] || keys['d']) newX += 5;
        if (keys['ArrowUp'] || keys['w']) newY -= 5;
        if (keys['ArrowDown'] || keys['s']) newY += 5;
        newX = Math.max(20, Math.min(780, newX));
        newY = Math.max(20, Math.min(580, newY));
        return { ...prev, playerX: newX, playerY: newY };
      });
    }, 30);
    return () => clearInterval(moveInterval);
  }, [keys]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 800, 600);

    const skyGradient = ctx.createLinearGradient(0, 0, 0, 300);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#B0E0E6');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, 800, 300);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(100, 50, 30, 0, Math.PI * 2);
    ctx.arc(130, 50, 35, 0, Math.PI * 2);
    ctx.arc(160, 50, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(500, 80, 35, 0, Math.PI * 2);
    ctx.arc(540, 80, 40, 0, Math.PI * 2);
    ctx.arc(580, 80, 35, 0, Math.PI * 2);
    ctx.fill();

    const grassGradient = ctx.createLinearGradient(0, 300, 0, 600);
    grassGradient.addColorStop(0, '#7CBF7C');
    grassGradient.addColorStop(1, '#5FA55F');
    ctx.fillStyle = grassGradient;
    ctx.fillRect(0, 300, 800, 300);

    ctx.fillStyle = '#6AB06A';
    for (let i = 0; i < 800; i += 20) {
      for (let j = 300; j < 600; j += 20) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i + Math.random() * 10, j + Math.random() * 10, 2, 4);
        }
      }
    }

    ctx.fillStyle = '#D4A76A';
    ctx.beginPath();
    ctx.moveTo(350, 300);
    ctx.lineTo(450, 300);
    ctx.lineTo(480, 600);
    ctx.lineTo(320, 600);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#C4976A';
    for (let i = 320; i < 480; i += 15) {
      for (let j = 300; j < 600; j += 15) {
        ctx.fillRect(i + Math.random() * 5, j + Math.random() * 5, 8, 8);
      }
    }

    const fountainX = 400;
    const fountainY = 180;
    ctx.fillStyle = '#8B8B8B';
    ctx.fillRect(fountainX - 40, fountainY + 20, 80, 15);
    ctx.fillStyle = '#A0A0A0';
    ctx.beginPath();
    ctx.ellipse(fountainX, fountainY + 10, 35, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4DA6FF';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.ellipse(fountainX, fountainY + 10, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#4DA6FF';
    const waterHeight = Math.sin(Date.now() / 300) * 5;
    ctx.fillRect(fountainX - 3, fountainY - 20 - waterHeight, 6, 30 + waterHeight);
    for (let i = 0; i < 5; i++) {
      const angle = (Date.now() / 500 + i * Math.PI / 2.5) % (Math.PI * 2);
      const dropX = fountainX + Math.cos(angle) * 20;
      const dropY = fountainY - 10 + Math.sin(angle) * 10;
      ctx.fillStyle = '#4DA6FF';
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(dropX, dropY, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    const drawTree = (x, y, size = 1) => {
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x - 8 * size, y, 16 * size, 40 * size);
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(x, y - 10 * size, 25 * size, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - 15 * size, y + 5 * size, 20 * size, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 15 * size, y + 5 * size, 20 * size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a6b1a';
      ctx.beginPath();
      ctx.arc(x - 8 * size, y - 5 * size, 10 * size, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 8 * size, y - 5 * size, 10 * size, 0, Math.PI * 2);
      ctx.fill();
    };

    drawTree(100, 350, 0.8);
    drawTree(700, 350, 0.8);
    drawTree(150, 500, 0.7);
    drawTree(650, 500, 0.7);

    const drawBench = (x, y) => {
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x, y, 60, 8);
      ctx.fillRect(x, y - 15, 60, 8);
      ctx.fillRect(x + 5, y, 8, 15);
      ctx.fillRect(x + 47, y, 8, 15);
      ctx.fillRect(x + 5, y - 30, 8, 25);
      ctx.fillRect(x + 47, y - 30, 8, 25);
    };

    drawBench(120, 420);
    drawBench(620, 420);

    const drawFlower = (x, y, color) => {
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(x, y, 2, 12);
      ctx.fillStyle = color;
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const petalX = x + Math.cos(angle) * 6;
        const petalY = y - 6 + Math.sin(angle) * 6;
        ctx.beginPath();
        ctx.arc(petalX, petalY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(x, y - 6, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    for (let i = 0; i < 8; i++) {
      drawFlower(80 + i * 15, 380, ['#FF69B4', '#FF1493', '#FFC0CB'][i % 3]);
      drawFlower(650 + i * 15, 380, ['#FF69B4', '#FF1493', '#FFC0CB'][i % 3]);
    }

    const drawLamp = (x, y) => {
      ctx.fillStyle = '#404040';
      ctx.fillRect(x - 4, y, 8, 60);
      ctx.fillStyle = '#606060';
      ctx.beginPath();
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x + 15, y);
      ctx.lineTo(x + 12, y - 10);
      ctx.lineTo(x - 12, y - 10);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFFF99';
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x, y - 5, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    drawLamp(250, 340);
    drawLamp(550, 340);

    puzzleStates.forEach(puzzle => {
      const pulse = Math.sin(Date.now() / 400) * 3;
      ctx.fillStyle = '#654321';
      ctx.fillRect(puzzle.x - 3, puzzle.y + 15, 6, 30);
      if (puzzle.completed) {
        ctx.fillStyle = '#00ff41';
        ctx.shadowColor = '#00ff41';
      } else {
        ctx.fillStyle = '#1abc9c';
        ctx.shadowColor = '#1abc9c';
      }
      ctx.shadowBlur = 15 + pulse;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const x = puzzle.x + Math.cos(angle) * 22;
        const y = puzzle.y + Math.sin(angle) * 22;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#0a7a5a';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(puzzle.completed ? '✓' : '🔐', puzzle.x, puzzle.y);
      const dist = Math.hypot(gameState.playerX - puzzle.x, gameState.playerY - puzzle.y);
      if (dist < 80 && !puzzle.completed) {
        ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
        ctx.font = 'bold 14px Arial';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText('ESPAÇO', puzzle.x, puzzle.y - 40);
        ctx.fillText('ESPAÇO', puzzle.x, puzzle.y - 40);
      }
    });

    if (gameState.bossActive && !gameState.bossDefeated) {
      const bossX = 400;
      const bossY = 100;
      const shake = gameState.bossHP < 2 ? Math.sin(Date.now() / 50) * 2 : 0;
      ctx.shadowColor = '#8e44ad';
      ctx.shadowBlur = 30;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.ellipse(bossX, bossY + 70, 40, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#8e44ad';
      ctx.fillRect(bossX - 30 + shake, bossY, 60, 60);
      ctx.fillStyle = '#5a2d6f';
      ctx.beginPath();
      ctx.moveTo(bossX - 35 + shake, bossY);
      ctx.lineTo(bossX + shake, bossY - 20);
      ctx.lineTo(bossX + 35 + shake, bossY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#71368a';
      for (let i = 0; i < 6; i++) {
        const offset = Math.sin(Date.now() / 150 + i) * 4;
        ctx.fillRect(bossX - 25 + i * 8 + shake, bossY + 5 + offset, 6, 6);
      }
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(bossX - 18 + shake, bossY + 25, 14, 14);
      ctx.fillRect(bossX + 4 + shake, bossY + 25, 14, 14);
      ctx.fillStyle = '#000';
      ctx.fillRect(bossX - 14 + shake, bossY + 29, 6, 6);
      ctx.fillRect(bossX + 8 + shake, bossY + 29, 6, 6);
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(bossX - 35, bossY - 35, 70, 15);
      ctx.fillStyle = '#e74c3c';
      const hpWidth = (70 * gameState.bossHP) / 3;
      ctx.fillRect(bossX - 35, bossY - 35, hpWidth, 15);
      ctx.strokeStyle = '#c0392b';
      ctx.lineWidth = 2;
      ctx.strokeRect(bossX - 35, bossY - 35, 70, 15);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`HP: ${gameState.bossHP}/3`, bossX, bossY - 25);
      const distBoss = Math.hypot(gameState.playerX - bossX, gameState.playerY - bossY);
      if (distBoss < 100) {
        ctx.fillStyle = 'rgba(255, 100, 100, 0.9)';
        ctx.font = 'bold 16px Arial';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText('ESPAÇO = ATACAR!', bossX, bossY - 50);
        ctx.fillText('ESPAÇO = ATACAR!', bossX, bossY - 50);
      }
    }

    ctx.shadowColor = '#3498db';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#3498db';
    ctx.fillRect(gameState.playerX - 12, gameState.playerY - 12, 24, 28);
    ctx.fillStyle = '#f4a460';
    ctx.fillRect(gameState.playerX - 10, gameState.playerY - 20, 20, 12);
    ctx.fillStyle = '#000';
    ctx.fillRect(gameState.playerX - 7, gameState.playerY - 16, 3, 3);
    ctx.fillRect(gameState.playerX + 4, gameState.playerY - 16, 3, 3);
    ctx.fillRect(gameState.playerX - 5, gameState.playerY - 11, 10, 2);
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(gameState.playerX - 16, gameState.playerY - 8, 4, 12);
    ctx.fillRect(gameState.playerX + 12, gameState.playerY - 8, 4, 12);
    ctx.fillRect(gameState.playerX - 8, gameState.playerY + 16, 6, 12);
    ctx.fillRect(gameState.playerX + 2, gameState.playerY + 16, 6, 12);
    ctx.shadowBlur = 0;

    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fillRect(p.x, p.y, 4, 4);
      ctx.globalAlpha = 1;
    });

  }, [gameState, puzzleStates, particles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, alpha: p.alpha - 0.02 }))
            .filter(p => p.alpha > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const createParticles = (x, y, color) => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        x, y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        alpha: 1,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const checkInteractions = () => {
    puzzleStates.forEach((puzzle, index) => {
      const dist = Math.hypot(gameState.playerX - puzzle.x, gameState.playerY - puzzle.y);
      if (dist < 80 && !puzzle.completed) {
        setGameState(prev => ({ ...prev, puzzleVisible: true, currentPuzzle: index }));
      }
    });

    if (gameState.bossActive && !gameState.bossDefeated) {
      const bossX = 400, bossY = 100;
      const dist = Math.hypot(gameState.playerX - bossX, gameState.playerY - bossY);
      if (dist < 100) {
        attackBoss();
      }
    }
  };

  const attackBoss = () => {
    if (gameState.bossHP > 1) {
      createParticles(400, 100, '#8e44ad');
      setGameState(prev => ({
        ...prev,
        bossHP: prev.bossHP - 1,
        dialogueVisible: true,
        dialogueText: `💥 Mandou bem! Faltam ${prev.bossHP - 1} ataques!`
      }));
      setTimeout(() => setGameState(prev => ({ ...prev, dialogueVisible: false })), 2000);
    } else {
      createParticles(400, 100, '#00ff41');
      setGameState(prev => ({
        ...prev,
        bossHP: 0,
        bossDefeated: true,
        gameCompleted: true,
        score: prev.score + 500,
        dialogueVisible: true,
        dialogueText: '🎉 INCRÍVEL! Você derrotou o Ladrão de Dados! Você é um MESTRE DA PRIVACIDADE! 🏆✨'
      }));
    }
  };

  const answerPuzzle = (optionIndex) => {
    const puzzle = puzzleStates[gameState.currentPuzzle];
    const option = puzzle.options[optionIndex];

    if (option.correct) {
      createParticles(puzzle.x, puzzle.y, '#00ff41');
      const newPuzzles = [...puzzleStates];
      newPuzzles[gameState.currentPuzzle].completed = true;
      setPuzzleStates(newPuzzles);
      const completed = newPuzzles.filter(p => p.completed).length;
      setGameState(prev => ({
        ...prev,
        puzzleVisible: false,
        puzzlesCompleted: completed,
        score: prev.score + 100,
        dialogueVisible: true,
        dialogueText: '✅ CORRETO! Muito bem! 🌟'
      }));

      if (completed === 3) {
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            bossActive: true,
            dialogueVisible: true,
            dialogueText: '⚠️ INVASÃO! O Ladrão de Dados apareceu na praça! Chegue perto 3 vezes para derrotá-lo! 💪🔒'
          }));
        }, 2000);
      }
      setTimeout(() => setGameState(prev => ({ ...prev, dialogueVisible: false })), 2000);
    } else {
      setGameState(prev => ({ ...prev, dialogueVisible: true, dialogueText: '❌ Ops! Tente outra resposta!' }));
      setTimeout(() => setGameState(prev => ({ ...prev, dialogueVisible: false })), 1500);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-green-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 rounded-xl p-6 max-w-4xl w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-purple-900 flex items-center gap-2">
            <Lock className="text-purple-600" />
            🏞️ PRAÇA DA PRIVACIDADE
          </h1>
          <div className="flex items-center gap-4 text-gray-800">
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="text-yellow-500" />
              <span className="font-bold">{gameState.score}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <Shield className="text-green-600" />
              <span>{gameState.puzzlesCompleted}/3</span>
            </div>
          </div>
        </div>

        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600}
          className="border-4 border-green-600 rounded-lg w-full shadow-lg"
        />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-3 rounded-lg border-2 border-purple-300">
            <p className="text-purple-900 text-sm font-bold mb-2">🎮 CONTROLES:</p>
            <p className="text-purple-700 text-xs">WASD ou Setas = Mover</p>
            <p className="text-purple-700 text-xs">ESPAÇO = Interagir</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg border-2 border-green-300">
            <p className="text-green-900 text-sm font-bold mb-2">🎯 OBJETIVO:</p>
            <p className="text-green-700 text-xs">Complete 3 desafios de privacidade</p>
            <p className="text-green-700 text-xs">Derrote o Ladrão de Dados!</p>
          </div>
        </div>

        {gameState.dialogueVisible && (
          <div className="mt-4 bg-indigo-600 border-2 border-indigo-800 rounded-lg p-4 animate-pulse shadow-lg">
            <p className="text-white text-center font-bold">{gameState.dialogueText}</p>
          </div>
        )}

        {gameState.puzzleVisible && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-xl max-w-lg w-full border-4 border-purple-300 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                {puzzleStates[gameState.currentPuzzle].question}
              </h3>
              <div className="space-y-3">
                {puzzleStates[gameState.currentPuzzle].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerPuzzle(index)}
                    className="w-full bg-purple-700 hover:bg-purple-600 text-white p-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setGameState(prev => ({ ...prev, puzzleVisible: false }))}
                className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {gameState.gameCompleted && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 rounded-xl max-w-md w-full text-center border-4 border-yellow-300 animate-pulse">
              <Award className="w-24 h-24 mx-auto mb-4 text-white" />
              <h2 className="text-4xl font-bold text-white mb-4">PARABÉNS!</h2>
              <p className="text-xl text-white mb-6">Você completou a Praça da Privacidade!</p>
              <div className="bg-white/20 p-4 rounded-lg mb-4">
                <p className="text-2xl font-bold text-white">Pontuação: {gameState.score}</p>
              </div>
              <p className="text-white font-bold">🏆 Você é um MESTRE DA PRIVACIDADE! 🏆</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPlazaGame;