// Menu Principal - Validação e Navegação
document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('playerName');
    const startBtn = document.getElementById('startBtn');
    const rankingBtn = document.getElementById('rankingBtn');
    const creditsBtn = document.getElementById('creditsBtn');
    const nameError = document.getElementById('nameError');

    // Carregar nome salvo anteriormente (se houver)
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }

    // Validar e iniciar jogo
    startBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        
        if (!playerName) {
            nameError.textContent = '⚠️ Digite seu nome para continuar!';
            playerNameInput.focus();
            return;
        }
        
        if (playerName.length < 3) {
            nameError.textContent = '⚠️ Nome deve ter pelo menos 3 caracteres!';
            playerNameInput.focus();
            return;
        }
        
        // Salvar nome no localStorage
        localStorage.setItem('playerName', playerName);
        
        // Redirecionar para o jogo
        window.location.href = 'game.html';
    });

    // Limpar erro ao digitar
    playerNameInput.addEventListener('input', () => {
        nameError.textContent = '';
    });

    // Enter para iniciar
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startBtn.click();
        }
    });

    // Navegação para ranking
    rankingBtn.addEventListener('click', () => {
        window.location.href = 'ranking.html';
    });

    // Navegação para créditos
    creditsBtn.addEventListener('click', () => {
        window.location.href = 'credits.html';
    });
});