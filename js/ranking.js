// Carregar e exibir o ranking
document.addEventListener('DOMContentLoaded', async () => {
    await loadLeaderboard();
});

async function loadLeaderboard() {
    const list = document.getElementById('leaderboardList');
    
    try {
        // Buscar todas as chaves de jogadores
        const result = await window.storage.list('player:', true);
        
        if (!result || !result.keys || result.keys.length === 0) {
            list.innerHTML = '<div class="empty-ranking">Nenhum guardião registrado ainda.<br>Seja o primeiro a completar uma missão!</div>';
            return;
        }
        
        // Buscar todos os dados dos jogadores
        const scores = [];
        for (const key of result.keys) {
            const data = await window.storage.get(key, true);
            if (data && data.value) {
                scores.push(JSON.parse(data.value));
            }
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
        
        return `
            <div class="leaderboard-entry ${topClass}">
                <span class="rank">${medal}</span>
                <span class="name">${escapeHtml(entry.name)}</span>
                <span class="score">${entry.score} pts</span>
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