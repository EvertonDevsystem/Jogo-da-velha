# Jogo-da-velha
📘 Guia de Documentação do Código — Jogo da Velha Aurudo
Desenvolvido por: Everton Eduardo Martin de Carvalho (1º D.S. — Etec Prof. José Carlos Seno Junior)


1. 🏗️ Estrutura HTML (O Esqueleto da Aplicação)
O código HTML é responsável por estruturar visualmente todos os elementos na tela, organizando o projeto em blocos lógicos:

<canvas id="bgCanvas">: Um elemento de renderização gráfica em tempo real. Ele serve de base para desenhar as animações dinâmicas de fundo (partículas, chuva digital, estrelas e ondas).

<div id="authModal">: Uma janela modal (pop-up) de autenticação que exige que o usuário digite um nome de usuário e uma senha antes de iniciar ou carregar seus recordes salvos.

<div id="mainMenu" class="side-menu">: O menu lateral principal estilo Drawer que desliza na tela. Ele abriga todas as configurações do jogo através de botões e acordeões.

<div id="top10Menu" class="side-menu">: Um painel dedicado a exibir as tabelas consolidadas com o ranking de vitórias e derrotas tanto no modo PvP quanto no PvE.

<div id="adminMenu" class="side-menu">: Um painel administrativo protegido por senha (Everton1002!) que permite ao desenvolvedor redefinir o menu ou zerar os placares armazenados.

<div class="board">: A grade estrutural contendo as 9 células (.cell) que formam o tabuleiro tradicional 3x3 do Jogo da Velha.



2. 🎨 Estilos CSS & Variáveis Globais (:root)
O CSS utiliza Variáveis CSS (--variavel) para permitir a troca dinâmica de temas de cores e o redimensionamento responsivo de forma simples:



:root: Define a paleta de cores padrão inicial e medidas do layout, como:

--bg-color: Cor de fundo principal da página.

--primary-color: Cor de destaque principal (usada em textos importantes, bordas e símbolos ativos).

--secondary-color: Cor secundária para gradientes e títulos de tabelas.

--card-bg: Cor de fundo dos painéis, cartas e do tabuleiro.

--cell-size: Define o tamanho dinâmico em pixels de cada caixinha do tabuleiro.

body.theme-[nome]: Classes aplicadas dinamicamente ao elemento <body> (como theme-nebulosa, theme-sakura, theme-fire, etc.) que sobrepõem as variáveis do :root, alterando instantaneamente a identidade visual e o esquema de cores de todo o jogo.

body.device-[tipo]: Classes que controlam a adaptação da interface para diferentes tamanhos de tela (desktop, tablet, mobile), alterando larguras máximas e fontes.




3. ⚡ Lógica em JavaScript (O Cérebro do Jogo)
O script JavaScript gerencia as regras do jogo, inteligência artificial, persistência de dados e efeitos visuais:

A. Gerenciamento de Contas e Sessão (localStorage)
usuarioLogado: Armazena o nome da conta ativa na memória local do navegador.

processarAutenticacao(): Valida os dados digitados no modal de login, cadastrando novas senhas ou autenticando usuários existentes no localStorage.

fazerLogout(): Encerra a sessão atual do jogador e limpa os campos de identificação.



B. O Motor do Jogo e Turnos
tabuleiro = [...]: Um vetor (array) com 9 posições que armazena o estado atual de cada célula ('', X ou O).

lidarComClique(e): Captura o clique do usuário em uma célula do tabuleiro, verifica se a jogada é válida, reproduz o som de clique e atualiza o estado visual.

verificarFimDeJogo(): Analisa após cada jogada se houve uma combinação vencedora com base nas condicoesVitoria, preenche o placar correspondente, dispara o efeito de confetes (canvas-confetti) e bloqueia o tabuleiro se o jogo acabar.




C. Inteligência Artificial (Modo PvE)
jogadaIA(): Controla a resposta automática do computador no modo contra a IA.

dificuldadeIA: Define o comportamento tático da máquina, variando de acordo com a escolha do usuário:

Fácil: Escolhe posições totalmente aleatórias.

Médio e Normal: Realiza jogadas inteligentes para bloquear o oponente ou vencer quando há oportunidades diretas.

Difícil: Adota estratégias defensivas e ofensivas avançadas (priorizando o centro e cantos do tabuleiro).



D. Animações Dinâmicas em Canvas
runAnimation(): Renderiza continuamente os efeitos visuais selecionados no fundo da tela através da API HTML5 Canvas:

Partículas Neon: Bolinhas flutuantes com opacidade variável.

Chuva Digital: Caracteres e símbolos caindo em formato de matriz.

Estrelas Cadentes: Pequenos traços luminosos cruzando o espaço.

Ondas Fluídas: Curvas senoidais animadas em tempo real.
