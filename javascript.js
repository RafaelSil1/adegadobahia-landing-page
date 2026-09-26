document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MENU ATIVO AUTOMÁTICO
     ========================================================================== */
  const linksNav = document.querySelectorAll('nav a');
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

  linksNav.forEach(link => {
    const linkPagina = link.getAttribute('href');
    if (linkPagina === paginaAtual) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ==========================================================================
     2. EFEITO DE ZOOM DE IMAGENS (GALERIA / CARDS)
     ========================================================================== */
  const fotosGaleria = document.querySelectorAll('.galeria img, .card img, .carrossel-slides img');

  if (fotosGaleria.length > 0) {
    const modal = document.createElement('div');
    modal.id = 'modal-foto';
    modal.style.cssText = `
      display: none;
      position: fixed;
      z-index: 1000;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.85);
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 20px;
    `;

    const imgAmpliada = document.createElement('img');
    imgAmpliada.style.cssText = `
      max-width: 90%;
      max-height: 85%;
      border-radius: 8px;
      box-shadow: 0 5px 25px rgba(0,0,0,0.5);
      transition: transform 0.3s ease;
    `;

    modal.appendChild(imgAmpliada);
    document.body.appendChild(modal);

    fotosGaleria.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        imgAmpliada.src = img.src;
        imgAmpliada.alt = img.alt;
        modal.style.display = 'flex';
      });
    });

    modal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  /* ==========================================================================
     3. ANIMAÇÃO SUAVE DE ENTRADA (SCROLL REVEAL)
     ========================================================================== */
  const elementosAnimados = document.querySelectorAll('.card, .detalhes, .galerya img');

  if (elementosAnimados.length > 0) {
    elementosAnimados.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    elementosAnimados.forEach(el => observer.observe(el));
  }


  // 4. INICIA O LOOP AUTOMÁTICO
  setInterval(proximaImagemMosaico, tempoTransicao);
}


/* ==========================================================================
   4. TRANSIÇÃO AUTOMÁTICA DO BANNER (SOMENTE LEITURA / SEM GESTOS)
   ========================================================================== */
const heroMosaico = document.querySelector('.hero-mosaico');
const itensMosaico = document.querySelectorAll('.mosaico-item');

const isMobile = window.innerWidth <= 768;

if (heroMosaico && itensMosaico.length > 0 && isMobile) {
  let indiceMosaico = 0;
  const tempoTransicao = 3000;

  // 1. DESATIVA O ARRASTO DAS IMAGENS E ITENS
  itensMosaico.forEach(item => {
    item.style.userSelect = 'none';
    item.style.webkitUserDrag = 'none';
    
    item.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
    item.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
  });

  // 2. DESATIVA O TOQUE APENAS PARA ARRASTO (Sem usar pointer-events: none)
  heroMosaico.style.touchAction = 'none';

  // 3. FUNÇÃO QUE FAZ A TROCA DAS IMAGENS MOVENDO A ROLAGEM DO CONTAINER
  function proximaImagemMosaico() {
    indiceMosaico = (indiceMosaico + 1) % itensMosaico.length;
    
    // Pega a largura exata de um item para calcular a rolagem
    const larguraItem = itensMosaico[0].clientWidth;

    heroMosaico.scrollTo({
      left: indiceMosaico * larguraItem,
      behavior: 'smooth'
    });
  }

  // 4. INICIA O LOOP AUTOMÁTICO
  setInterval(proximaImagemMosaico, tempoTransicao);
}



const botaonext = document.getElementById("next");
const botaoprev = document.getElementById("prev");
const galeria = document.querySelector(".galeria");
const imagens = document.querySelectorAll(".galeria img");
const containerIndicadores = document.getElementById("indicadores");

if (galeria && imagens.length > 0) {
  let indiceAtual = 0;

  function getQuantidadesVisual() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function criarIndicadores() {
    if (!containerIndicadores) return;
    containerIndicadores.innerHTML = "";

    imagens.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("ativo");
      
      dot.addEventListener("click", () => {
        indiceAtual = index;
        mudarImagemGaleria();
      });

      containerIndicadores.appendChild(dot);
    });
  }

  function mudarImagemGaleria() {
    const quantidadesVisual = getQuantidadesVisual();

    if (indiceAtual > imagens.length - quantidadesVisual) {
      indiceAtual = Math.max(0, imagens.length - quantidadesVisual);
    }

    imagens.forEach(img => img.classList.remove("ativa"));

    for (let i = 0; i < quantidadesVisual; i++) {
      const indiceExibir = indiceAtual + i;
      if (imagens[indiceExibir]) {
        imagens[indiceExibir].classList.add("ativa");
      }
    }

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("ativo", idx === indiceAtual);
    });
  }

  function proximaImagemGaleria() {
    const quantidadesVisual = getQuantidadesVisual();
    if (indiceAtual >= imagens.length - quantidadesVisual) {
      indiceAtual = 0;
    } else {
      indiceAtual++;
    }
    mudarImagemGaleria();
  }

  function imagemAnteriorGaleria() {
    const quantidadesVisual = getQuantidadesVisual();
    if (indiceAtual === 0) {
      indiceAtual = imagens.length - quantidadesVisual;
    } else {
      indiceAtual--;
    }
    mudarImagemGaleria();
  }

  // --- TOUCH SWIPE (Exclusivo para dispositivos móveis) ---
  let startX = 0;
  let endX = 0;
  const sensibilidade = 50; // Mínimo de deslocamento em px para ativar o swipe

  galeria.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  galeria.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    processarSwipe();
  }, { passive: true });

  function processarSwipe() {
    const distancia = startX - endX;

    if (distancia > sensibilidade) {
      proximaImagemGaleria();
    } else if (distancia < -sensibilidade) {
      imagemAnteriorGaleria();
    }
    
    startX = 0;
    endX = 0;
  }
  // --------------------------------------------------------

  // Ações de clique nos botões
  if (botaonext) botaonext.addEventListener("click", proximaImagemGaleria);
  if (botaoprev) botaoprev.addEventListener("click", imagemAnteriorGaleria);

  // Reorganiza as imagens ao redimensionar a janela
  window.addEventListener("resize", mudarImagemGaleria);

  // Inicializa a exibição e os indicadores
  criarIndicadores();
  mudarImagemGaleria();
}


  /* ==========================================================================
     6. MENU HAMBÚRGUER (MOBILE)
     ========================================================================== */
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');

      if (menuIcon) {
        if (menuIcon.classList.contains('fa-bars')) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        } else {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      }
    });
  }

});