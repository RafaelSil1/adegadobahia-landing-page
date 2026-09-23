const botaonext = document.getElementById("next");
const botaoprev = document.getElementById("prev");
const galeria = document.querySelector(".galeria");
const imagens = document.querySelectorAll(".galeria img");

let indiceAtual = 0;

// Retorna 1 para telas pequenas (<= 768px) e 3 para telas maiores
function getQuantidadesVisual() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function mudarImagem() {
  const quantidadesVisual = getQuantidadesVisual();

  // Garante que o índice atual não fique fora dos limites ao redimensionar a tela
  if (indiceAtual > imagens.length - quantidadesVisual) {
    indiceAtual = Math.max(0, imagens.length - quantidadesVisual);
  }

  // 1. Remove a classe 'ativa' de todas as imagens
  imagens.forEach(function (img) {
    img.classList.remove("ativa");
  });

  // 2. Adiciona a classe 'ativa' apenas no intervalo visível
  for (let i = 0; i < quantidadesVisual; i++) {
    const indiceExibir = indiceAtual + i;
    if (imagens[indiceExibir]) {
      imagens[indiceExibir].classList.add("ativa");
    }
  }
}

function proximaImagem() {
  const quantidadesVisual = getQuantidadesVisual();
  if (indiceAtual >= imagens.length - quantidadesVisual) {
    indiceAtual = 0; // Volta para o início
  } else {
    indiceAtual++;
  }
  mudarImagem();
}

function imagemAnterior() {
  const quantidadesVisual = getQuantidadesVisual();
  if (indiceAtual === 0) {
    indiceAtual = imagens.length - quantidadesVisual; // Vai para o final
  } else {
    indiceAtual--;
  }
  mudarImagem();
}

// Eventos de clique nos botões (Desktop)
if (botaonext) botaonext.addEventListener("click", proximaImagem);
if (botaoprev) botaoprev.addEventListener("click", imagemAnterior);

// --- LÓGICA DE SWIPE / DESLIZAR O DEDO (Mobile) ---
let startX = 0;
let endX = 0;

galeria.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});

galeria.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const limiteSwipe = 40; // Distância mínima do arrasto em pixels

  if (startX - endX > limiteSwipe) {
    // Arrastou para a esquerda -> Próxima imagem
    proximaImagem();
  } else if (endX - startX > limiteSwipe) {
    // Arrastou para a direita -> Imagem anterior
    imagemAnterior();
  }
}

// Atualiza a exibição se a janela for redimensionada
window.addEventListener("resize", mudarImagem);

// Inicializa a exibição
mudarImagem();