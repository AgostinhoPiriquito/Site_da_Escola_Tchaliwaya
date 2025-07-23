// JavaScript para Plataforma E-Learning Inteligente - Escola Primária Tchalawaya

// Sistema de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initChatbot();
    initQuizSystem();
    initRecommendationSystem();
    initProgressTracking();
    initForumInteractions();
    loadDashboardData();
});

// Sistema do Chatbot com IA
let chatHistory = [];

function initChatbot() {
    const chatInput = document.getElementById('entrada-de-chat');
    const sendButton = document.getElementById('enviar-chat');
    
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}
function sendMessage() {
    const input = document.getElementById('entrada-de-chat');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simular resposta do chatbot com IA
        setTimeout(() => {
            const response = generateAIResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}


function addChatMessage(message, sender) {
    const container = document.getElementById('mensagens-de-bate-papo');
    const messageElement = document.createElement('div');
    messageElement.className = `mensagem-de-bate-papo ${sender}-message`;
    messageElement.innerHTML = `
        <strong>${sender === 'user' ? 'Você' : 'IA Tchalawaya'}:</strong> ${message}
    `;
    container.appendChild(messageElement);
    container.scrollTop = container.scrollHeight;
    
    chatHistory.push({ message, sender });
}


function generateAIResponse(userMessage) {
    const responses = {
        'matemática': 'Excelente pergunta sobre matemática! Posso recomendar videoaulas sobre operações básicas e exercícios práticos. O que você gostaria de estudar?',
        'português': 'Vou ajudar você com português! Temos livros sobre leitura, escrita e gramática adaptadas para cada nível. O que você gostaria de aprender?',
        'ciências': 'Ciências são fascinantes! Posso sugerir experimentos virtuais e conteúdos sobre o corpo humano, plantas e animais. Qual tópico mais lhe interessa?',
        'ajuda': 'Estou aqui para ajudar! Posso recomendar conteúdos, explicar conceitos, criar quizzes personalizados e acompanhar seu progresso. Como posso te ajudar?',
        'quiz': 'Vou criar um quiz personalizado para você! Com base no seu histórico de estudos, posso gerar perguntas certas ao seu nível. Sobre qual matéria?',
        'default': 'Entendi sua pergunta! Como IA educacional, posso ajudar com recomendações de conteúdo, explicações e atividades personalizadas. Posso dar mais detalhes?'
    };
    
    const msg = userMessage.toLowerCase();
    for (let key in responses) {
        if (msg.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}
// Sistema de Quiz com IA
let currentQuiz = null;

function initQuizSystem() {
    // Configurar quiz interativo
}

function generateQuiz(subject, difficulty = 'fácil') {
    const quizzes = {
        'matemática': {
            'fácil': [
                {
                    question: 'Quanto é 2 + 3?',
                    options: ['4', '5', '6', '7'],
                    correct: 1
                },
                {
                    question: 'Qual é o dobro de 4?',
                    options: ['6', '8', '10', '12'],
                    correct: 1
                }
            ]
        },
        'português': {
            'fácil': [
                {
                    question: 'Quantas letras tem o alfabeto português?',
                    options: ['24', '25', '26', '27'],
                    correct: 2
                }
            ]
        }
    };
    return quizzes[subject]?.[difficulty] || [];
}

function displayQuiz(quiz) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    container.innerHTML = '<h4>Quiz Personalizado</h4>';

    quiz.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <h5>Pergunta ${index + 1}: ${question.question}</h5>
            <ul class="quiz-options">
                ${question.options.map((option, optIndex) => `
                    <li class="quiz-option" onclick="selectOption(${index}, ${optIndex})">${option}</li>
                `).join('')}
            </ul>
        `;
        container.appendChild(questionDiv);
    });

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = 'Enviar Respostas';
    submitBtn.onclick = () => submitQuiz(quiz);
    container.appendChild(submitBtn);
}

function selectOption(questionIndex, optionIndex) {
    const options = document.querySelectorAll(`.quiz-question:nth-child(${questionIndex + 2}) .quiz-option`);
    options.forEach(opt => opt.classList.remove('selected'));
    if (options[optionIndex]) {
        options[optionIndex].classList.add('selected');
    }
}

// Sistema de Recomendações com IA
function initRecommendationSystem() {
    loadRecommendations();
}

function loadRecommendations() {
    const container = document.getElementById('recomendacoes-container');
    if (!container) return;

    const recommendations = generatePersonalizedRecommendations();

    container.innerHTML = '';
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-card';
        recDiv.innerHTML = `
            <div class="card-body">
                <span class="ai-badge">IA</span>
                <h6 class="card-title">${rec.title}</h6>
                <p class="card-text">${rec.description}</p>
                <small class="text-muted">Baseado no seu progresso em ${rec.subject}</small>
            </div>
        `;
        container.appendChild(recDiv);
    });
}

function generatePersonalizedRecommendations() {
    return [
        {
            title: 'Videoaula: Tabuada Divertida',
            description: 'Aprenda a tabuada com músicas e jogos interativos.',
            subject: 'Matemática'
        },
        {
            title: 'Exercícios: Leitura e Interpretação',
            description: 'Histórias curtas com perguntas para desenvolver a compreensão.',
            subject: 'Português'
        },
        {
            title: 'Experimento: Ciclo da Água',
            description: 'Demonstração virtual do ciclo da água na natureza.',
            subject: 'Ciências'
        }
    ];
}

// Sistema de Acompanhamento de Progresso
function initProgressTracking() {
    updateProgressCharts();
}

function updateProgressCharts() {
    // Dados de progresso simulados
    const progressData = {
        matematica: 75,
        portugues: 85,
        ciencias: 60,
        geografia: 70
    };

    updateProgressBars(progressData);
}

function updateProgressBars(data) {
    Object.keys(data).forEach(subject => {
        const progressBar = document.getElementById(`progress-${subject}`);
        if (progressBar) {
            progressBar.style.width = `${data[subject]}%`;
            progressBar.setAttribute('aria-valuenow', data[subject]);
            progressBar.textContent = `${data[subject]}%`;
        }
    });
}

// Sistema do Fórum Interativo
function initForumInteractions() {
    loadForumPosts();
}

function loadForumPosts() {
    const container = document.getElementById('postagens-do-forum');
    if (!container) return;

    const posts = [
        {
            author: 'Ana Silva',
            date: '2 horas atrás',
            title: 'Dúvida sobre frações',
            content: 'Alguém pode me explicar como somar frações com denominadores diferentes?'
        },
        {
            author: 'Professor João',
            date: '5 horas atrás',
            title: 'Dica de Estudo',
            content: 'Lembrem-se de praticar a leitura diariamente por pelo menos 30 minutos!'
        }
    ];

    container.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'forum-post';
        postDiv.innerHTML = `
            <div class="forum-post-header">
                <span class="forum-post-author">${post.author}</span>
                <span class="forum-post-date">${post.date}</span>
            </div>
            <h6>${post.title}</h6>
            <p>${post.content}</p>
            <button class="btn btn-sm btn-outline-primary">Responder</button>
        `;
        container.appendChild(postDiv);
    });
}

// Carregar dados do painel
function loadDashboardData() {
    // Carregamento simulado de dados do dashboard
    updateDashboardStats();
}

function updateDashboardStats() {
    const stats = {
        totalStudents: 245,
        activeClasses: 12,
        completedLessons: 1580,
        averageProgress: '78%'
    };

    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = stats[key];
        }
    });
}
// Função para alternar entre sessões
function showSection(sectionId) {
    // Ocultar todas as sessões
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar a seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Atualizar navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Funções auxiliares
function refreshData() {
    loadDashboardData();
    loadRecommendations();
    loadForumPosts();
}

// Atualização automática a cada 5 minutos
setInterval(refreshData, 300000);