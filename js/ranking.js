// Sistema de Ranking - USANDO LOCALSTORAGE (funciona offline)
document.addEventListener('DOMContentLoaded', async () => {
    await loadLeaderboard();
});

async function loadLeaderboard() {
    const list = document.getElementById('leaderboardList');
    
    try {
        // Buscar ranking do localStorage
        const rankingData = localStorage.getItem('ciber_guardioes_ranking');
        
        if (!rankingData) {
            list.innerHTML = '<div class="empty-ranking">Nenhum guardião registrado ainda.<br>Seja o primeiro a completar uma missão!</div>';
            return;
        }
        
        // Parse do JSON
        const scores = JSON.parse(rankingData);
        
        if (!scores || scores.length === 0) {
            list.innerHTML = '<div class="empty-ranking">Nenhum guardião registrado ainda.<br>Seja o primeiro a completar uma missão!</div>';
            return;
        }
        
        // Ordenar por pontuação (maior para menor)
        scores.sort((a, b) => b.score - a.score);
        
        // Exibir top 50
        displayLeaderboard(scores.slice(0, 50));
        
    } catch (error) {
        console.error('Erro ao carregar ranking:', error);
        list.innerHTML = '<div class="empty-ranking">Erro ao carregar o ranking.<br>Tente novamente mais tarde.</div>';
    }
}

function displayLeaderboard(scores) {
    const list = document.getElementById('leaderboardList');
    
    if (scores.length === 0) {
        list.innerHTML = '<div class="empty-ranking">Nenhum guardião registrado ainda.</div>';
        return;
    }
    
    list.innerHTML = scores.map((entry, index) => {
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
        const topClass = rank <= 3 ? 'top3' : '';
        
        // Formatar data
        const date = new Date(entry.timestamp);
        const dateStr = date.toLocaleDateString('pt-BR');
        
        return `
            <div class="leaderboard-entry ${topClass}">
                <span class="rank">${medal}</span>
                <span class="name">${escapeHtml(entry.name)}</span>
                <span class="score">${entry.score} pts</span>
                <span class="date">${dateStr}</span>
            </div>
        `;
    }).join('');
}

// Prevenir XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}