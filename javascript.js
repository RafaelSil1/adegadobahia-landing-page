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
     2. EFEITO DE ZOOM/AMPLIAÇÃO DE IMAGENS (GALERIA / CARDS)
     ========================================================================== */
  const fotosGaleria = document.querySelectorAll('.galeria img, .card img, .carrossel-slides img');

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

  /* ==========================================================================
     3. ANIMAÇÃO SUAVE DE ENTRADA CONFORME ROLA A TELA (SCROLL REVEAL)
     ========================================================================== */
  const elementosAnimados = document.querySelectorAll('.card, .detalhes, .galerya img');

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

/* ==========================================================================
     4. TRANSIÇÃO TOTALMENTE AUTOMÁTICA NO HERO MOSAICO
     ========================================================================== */
  const heroMosaico = document.querySelector('.hero-mosaico');
  const itensMosaico = document.querySelectorAll('.mosaico-item');

  if (heroMosaico && itensMosaico.length > 0) {
    let indiceMosaico = 0;

    // Função simples que move para a próxima imagem
    function proximaImagem() {
      indiceMosaico = (indiceMosaico + 1) % itensMosaico.length;
      const deslocamento = indiceMosaico * 100;

      itensMosaico.forEach(item => {
        item.style.transform = `translateX(-${deslocamento}%)`;
      });
    }

    // Inicia a troca automática a cada 3 segundos (3000ms) sem interrupções
    setInterval(proximaImagem, 3000);
  }
  
});