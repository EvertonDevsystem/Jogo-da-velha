// ==========================================
// 🛠️ CONFIGURAÇÃO DOS SÍMBOLOS (MUDA AQUI!)
// ==========================================
const SIMBOLO_X = '❌'; 
const SIMBOLO_O = '⭕'; 
// Se preferir imagens locais:
// const SIMBOLO_X = '<img src="x.png" alt="X">';
// const SIMBOLO_O = '<img src="o.png" alt="O">';
// ==========================================

const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const timerElement = document.getElementById('timer');
const sidebar = document.getElementById('sidebar');
const audioClique = document.getElementById('audioClique');
const audioVitoria = document.getElementById('audioVitoria');

let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorAtual = SIMBOLO_X;
let jogoAtivo = true;

let segundos = 0;
let minutos = 0;
let intervaloTempo = null;

const condicoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Iniciar cronômetro ao carregar
iniciarTempo();

cells.forEach((cell) => {
    cell.addEventListener('click', lidarComClique);
});

function toggleMenu() {
    sidebar.classList.toggle('ativo');
}

function iniciarTempo() {
    pararTempo();
    segundos = 0;
    minutos = 0;
    atualizarDisplayTempo();
    intervaloTempo = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        atualizarDisplayTempo();
    }, 1000);
}

function pararTempo() {
    clearInterval(intervaloTempo);
}

function atualizarDisplayTempo() {
    let minFormatado = minutos < 10 ? '0' + minutos : minutos;
    let segFormatado = segundos < 10 ? '0' + segundos : segundos;
    if (timerElement) {
        timerElement.innerHTML = `${minFormatado}:${segFormatado}`;
    }
}

function lidarComClique(e) {
    const celulaClicada = e.currentTarget;
    const index = celulaClicada.getAttribute('data-index');

    if (tabuleiro[index] !== '' || !jogoAtivo) return;

    // Toca som de clique
    if (audioClique) {
        audioClique.currentTime = 0;
        audioClique.play().catch(() => {});
    }

    tabuleiro[index] = jogadorAtual;
    celulaClicada.innerHTML = jogadorAtual;

    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    let venceu = false;

    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            venceu = true;
            break;
        }
    }

    if (venceu) {
        pararTempo();
        if (audioVitoria) {
            audioVitoria.currentTime = 0;
            audioVitoria.play().catch(() => {});
        }

        let nomeVencedor = (jogadorAtual === SIMBOLO_X) ? 'X' : 'O';
        statusElement.innerHTML = `Fim de jogo! O jogador ${nomeVencedor} venceu! 🎉`;
        jogoAtivo = false;
        return;
    }

    if (!tabuleiro.includes('')) {
        pararTempo();
        statusElement.innerHTML = `Deu velha! Empate! 🤝`;
        jogoAtivo = false;
        return;
    }

    // Alterna o turno
    jogadorAtual = (jogadorAtual === SIMBOLO_X) ? SIMBOLO_O : SIMBOLO_X;
    let nomeTurno = (jogadorAtual === SIMBOLO_X) ? 'X' : 'O';
    statusElement.innerHTML = `Vez do jogador ${nomeTurno}`;
}

function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    jogadorAtual = SIMBOLO_X;
    statusElement.innerHTML = `Vez do jogador X`;
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    iniciarTempo();
}