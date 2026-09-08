// Barre de navigation : menu déroulant « Nos produits » et compteur de commande.
(function () {
  // Visuels du menu, construits ici pour n'exister qu'à un seul endroit.
  const frameMock = (src) => `<div class="frame-mock"><img src="${src}" alt=""></div>`;
  const photo = (src) => `<img src="${src}" alt="">`;

  const VISUELS = {
    'cadre-jeu': { tint: 'var(--rose)', html: photo('image/mamie-remplit-affiche.webp') },
    'puzzle': { tint: 'var(--sky)', html: photo('image/puzzle-mamie-table.webp') },
    'cadre-ecran': { tint: 'var(--sage)', html: photo('image/ecran-grands-parents-salon.webp') },
    'packs': {
      tint: 'linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))',
      html: `<div class="xmas-stack">${frameMock('image/poster-mur-salon.webp')}` +
            `<div class="xmas-photo ecran"><img src="image/ecran-famille-buffet.webp" alt=""></div>` +
            `<div class="xmas-photo puzzle"><img src="image/puzzle-noel-canape.webp" alt=""></div></div>`
    }
  };

  const drop = document.querySelector('.navdrop');
  if (drop) {
    drop.querySelectorAll('.navdrop-panel a').forEach((a) => {
      const v = VISUELS[a.dataset.vis];
      if (!v) return;
      a.insertAdjacentHTML('afterbegin', `<span class="navdrop-vis" style="--tint:${v.tint}">${v.html}</span>`);
    });

    const btn = drop.querySelector('.navdrop-btn');
    const ouvrir = (v) => {
      drop.classList.toggle('open', v);
      btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      ouvrir(!drop.classList.contains('open'));
    });
    document.addEventListener('click', (e) => { if (!drop.contains(e.target)) ouvrir(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') ouvrir(false); });
    drop.addEventListener('mouseleave', () => ouvrir(false));
  }
})();
