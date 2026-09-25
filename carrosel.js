const botaonext = document.getElementById("next");
const botaoprev = document.getElementById("prev");
const galeria = document.querySelector(".galeria");
const imagens = document.querySelectorAll(".galeria img");
const containerIndicadores = document.getElementById("indicadores");

let indiceAtual = 0;

function getQuantidadesVisual() {
  return window.innerWidth <= 768 ? 1 : 3;
}

// Cria os pontos conforme a quantidade de imagens
function criarIndicadores() {
  if (!containerIndicadores) return;
  containerIndicadores.innerHTML = ""; // Limpa os pontos anteriores

  imagens.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("ativo");
    
    // Permite clicar no ponto para navegar
    dot.addEventListener("click", () => {
      indiceAtual = index;
      mudarImagem();
    });

    containerIndicadores.appendChild(dot);
  });
}

function mudarImagem() {
  const quantidadesVisual = getQuantidadesVisual();

  if (indiceAtual > imagens.length - quantidadesVisual) {
    indiceAtual = Math.max(0, imagens.length - quantidadesVisual);
  }

  imagens.forEach(function (img) {
    img.classList.remove("ativa");
  });

  for (let i = 0; i < quantidadesVisual; i++) {
    const indiceExibir = indiceAtual + i;
    if (imagens[indiceExibir]) {
      imagens[indiceExibir].classList.add("ativa");
    }
  }

  // Atualiza as bolinhas ativas
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("ativo", idx === indiceAtual);
  });
}

function proximaImagem() {
  const quantidadesVisual = getQuantidadesVisual();
  if (indiceAtual >= imagens.length - quantidadesVisual) {
    indiceAtual = 0;
  } else {
    indiceAtual++;
  }
  mudarImagem();
}

function imagemAnterior() {
  const quantidadesVisual = getQuantidadesVisual();
  if (indiceAtual === 0) {
    indiceAtual = imagens.length - quantidadesVisual;
  } else {
    indiceAtual--;
  }
  mudarImagem();
}

if (botaonext) botaonext.addEventListener("click", proximaImagem);
if (botaoprev) botaoprev.addEventListener("click", imagemAnterior);

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
  const limiteSwipe = 40;
  if (startX - endX > limiteSwipe) {
    proximaImagem();
  } else if (endX - startX > limiteSwipe) {
    imagemAnterior();
  }
}

window.addEventListener("resize", mudarImagem);

// Inicializa a exibição e gera as bolinhas
criarIndicadores();
mudarImagem();