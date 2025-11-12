// Diálogos simplificados para crianças de 8-10 anos

// FASE 1: FORTALEZA DAS SENHAS
const phase1SimpleDialogues = {
    owl: [
        '🦉 Oi! Eu sou a Coruja Cyber, sua amiga!',
        'Vamos aprender sobre SENHAS FORTES juntos?',
        'Senhas fracas são fáceis de descobrir. Os vilões adoram isso!',
        'Vê aqueles cristais roxos brilhando? Vá até eles e pressione ESPAÇO!'
    ],
    
    puzzles: [
        {
            question: '🔐 Qual dessas senhas é mais DIFÍCIL de descobrir?',
            options: [
                { text: '123456', feedback: '❌ Muito fácil! Todo mundo tenta essa primeiro.' },
                { text: 'senha', feedback: '❌ Os vilões sabem essa palavra!' },
                { text: 'C1b3r@2025!', feedback: '✅ ISSO! Tem letras, números e símbolos. Super difícil!' },
                { text: 'meunome', feedback: '❌ Seu nome é fácil de descobrir!' }
            ]
        },
        {
            question: '🤔 O que faz uma senha ser FORTE?',
            options: [
                { text: 'Ser curtinha', feedback: '❌ Não! Senhas curtas são fáceis de adivinhar.' },
                { text: 'Usar meu aniversário', feedback: '❌ Vilões podem descobrir isso na internet!' },
                { text: 'Ter MUITOS caracteres diferentes', feedback: '✅ PERFEITO! Quanto mais misturado, melhor!' },
                { text: 'Ser igual em tudo', feedback: '❌ Perigo! Se descobrirem uma, descobrem todas!' }
            ]
        },
        {
            question: '🤐 Você deve contar sua senha para alguém?',
            options: [
                { text: 'Para meus amigos', feedback: '❌ Não! Nem para os melhores amigos.' },
                { text: 'Para meus pais', feedback: '✅ CERTO! Só para adultos que cuidam de você.' },
                { text: 'Se alguém pedir com educação', feedback: '❌ NUNCA! Pessoas boas não pedem senhas.' },
                { text: 'Por mensagem', feedback: '❌ Perigoso! Mensagens podem ser lidas por vilões.' }
            ]
        }
    ],
    
    bossIntro: '⚠️ CUIDADO! O vilão "Senha Fraca" apareceu! Chegue perto dele para derrotá-lo!',
    bossDefeat: '🎉 VOCÊ VENCEU! O vilão fugiu! Senha Fraca não volta mais!'
};

// FASE 2: LABIRINTO DOS LINKS
const phase2SimpleDialogues = {
    guardian: [
        '🛡️ Oi! Sou o Guardião do Firewall!',
        'Aqui temos links FALSOS e VERDADEIROS.',
        'Links falsos roubam suas informações! Vamos aprender a identificar?',
        'Cuidado com as paredes do labirinto! Não dá pra passar por elas.'
    ],
    
    puzzles: [
        {
            question: '🔗 Qual desses links parece SEGURO?',
            options: [
                { text: 'bancod0brasil.com', feedback: '❌ Olha bem! Tem um ZERO no lugar da letra O. É FALSO!' },
                { text: 'bb.com.br', feedback: '✅ ISSO! Endereço curto e correto do banco!' },
                { text: 'bb-dados.com', feedback: '❌ Bancos de verdade não usam nomes assim!' },
                { text: 'bit.ly/banco', feedback: '❌ Links encurtados escondem o endereço de verdade!' }
            ]
        },
        {
            question: '📧 Você recebe um email estranho. O que fazer?',
            options: [
                { text: 'Clicar para ver', feedback: '❌ NÃO CLIQUE! Pode ser armadilha!' },
                { text: 'Mandar para amigos', feedback: '❌ Não! Você espalha o perigo assim.' },
                { text: 'APAGAR e contar para um adulto', feedback: '✅ PERFEITO! Sempre avise um adulto!' },
                { text: 'Responder', feedback: '❌ Nunca responda! Os vilões ficam felizes com isso.' }
            ]
        },
        {
            question: '⚠️ O que é um sinal de email FALSO?',
            options: [
                { text: 'Diz "URGENTE! CLIQUE AGORA!"', feedback: '✅ ISSO! Emails verdadeiros não apressam você assim!' },
                { text: 'Tem erros de português', feedback: '✅ BOM! Empresas de verdade escrevem certinho.' },
                { text: 'Vem de um email oficial', feedback: '❌ Cuidado! Vilões copiam emails oficiais. Veja o endereço completo!' },
                { text: 'Pede sua senha', feedback: '✅ ALERTA! NUNCA pedem senha por email!' }
            ]
        }
    ],
    
    bossIntro: '⚠️ O hacker "Link Malicioso" está criando links falsos! Derrote-o!',
    bossDefeat: '🎉 VOCÊ CONSEGUIU! Agora sabe identificar links falsos!'
};

// FASE 3: PRAÇA DA PRIVACIDADE
const phase3SimpleDialogues = {
    keeper: [
        '🔒 Olá! Sou o Guardião da Privacidade!',
        'Privacidade significa: o que é SEU, fica com VOCÊ!',
        'Nem tudo deve ser compartilhado na internet!',
        'Complete os desafios e vire um mestre da privacidade!'
    ],
    
    puzzles: [
        {
            question: '📱 O que é SEGURO postar nas redes sociais?',
            options: [
                { text: 'Meu endereço completo', feedback: '❌ PERIGOSO! Pessoas ruins podem te achar!' },
                { text: 'Meu telefone', feedback: '❌ Não compartilhe! Pode receber mensagens ruins.' },
                { text: 'Fotos de coisas que gosto', feedback: '✅ ISSO! Compartilhar gostos é legal e seguro!' },
                { text: 'Quando não estou em casa', feedback: '❌ PERIGO! Você está avisando que sua casa está vazia!' }
            ]
        },
        {
            question: '🔐 Como deixar seu perfil mais SEGURO?',
            options: [
                { text: 'Deixar PÚBLICO para todos', feedback: '❌ Não! Qualquer um vê suas coisas.' },
                { text: 'Aceitar TODOS os pedidos', feedback: '❌ Perigo! Pode ter pessoas más fingindo ser legais.' },
                { text: 'Deixar PRIVADO só para amigos', feedback: '✅ PERFEITO! Só quem você conhece vê suas coisas!' },
                { text: 'Mostrar onde estou sempre', feedback: '❌ MUITO PERIGOSO! Não revele sua localização!' }
            ]
        },
        {
            question: '📲 Um aplicativo pede seus contatos. O que fazer?',
            options: [
                { text: 'Deixar sempre', feedback: '❌ Não! Nem todos os apps precisam disso.' },
                { text: 'Perguntar: "Ele PRECISA mesmo disso?"', feedback: '✅ ÓTIMO! Sempre questione antes de permitir!' },
                { text: 'Negar tudo', feedback: '❌ Alguns apps precisam de algumas permissões para funcionar.' },
                { text: 'Não me importo', feedback: '❌ Suas informações são importantes! Cuide delas!' }
            ]
        }
    ],
    
    bossIntro: '⚠️ O "Ladrão de Dados" quer roubar suas informações! Proteja-as!',
    bossDefeat: '🎉 INCRÍVEL! Você é um Mestre da Privacidade agora!'
};

// Mensagens gerais simplificadas
const generalMessages = {
    welcome: 'Bem-vindo! Use as SETAS ou WASD para andar. Pressione ESPAÇO para conversar!',
    puzzleCorrect: '🌟 ISSO AÍ! Você acertou! +100 pontos!',
    puzzleWrong: '🤔 Ops! Não é essa. Tente de novo! Você consegue!',
    allPuzzlesComplete: 'UHUUL! Você completou todos os desafios! Agora enfrente o vilão!',
    phaseComplete: 'PARABÉNS! Fase completa! Você está aprendendo muito!',
    gameComplete: 'VOCÊ É INCRÍVEL! Completou TODAS as fases! Agora é um Ciber Guardião de verdade! 🏆'
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.simpleDialogues = {
        phase1: phase1SimpleDialogues,
        phase2: phase2SimpleDialogues,
        phase3: phase3SimpleDialogues,
        general: generalMessages
    };
}