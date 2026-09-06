// Barre de navigation : menu déroulant « Nos produits » et compteur de commande.
(function () {
  // Visuels du menu, construits ici pour n'exister qu'à un seul endroit.
  const WIFI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5a13 13 0 0 1 16 0"/><path d="M7 13a8.5 8.5 0 0 1 10 0"/><circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none"/></svg>';

  function puzzleMock(src) {
    let t = '';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        t += `<i style="background-position:${c * 25}% ${(r * 100 / 3).toFixed(2)}%"></i>`;
      }
    }
    return `<div class="puzzle-mock" style="--puz:url('${src}')">${t}</div>`;
  }
  const deviceMock = (src) =>
    `<div class="device-mock"><div class="wifi">${WIFI}</div><div class="screen"><img src="${src}" alt=""></div><div class="magnet"></div></div>`;
  const frameMock = (src) => `<div class="frame-mock"><img src="${src}" alt=""></div>`;

  const VISUELS = {
    'cadre-jeu': { tint: 'var(--rose)', html: '<img src="image/mamie-remplit-affiche.jpg" alt="">' },
    'puzzle': { tint: 'var(--sky)', html: '<img src="image/puzzle-mamie-table.jpg" alt="">' },
    'cadre-ecran': { tint: 'var(--sage)', html: deviceMock('image/bebe-mer.jpg') },
    'packs': {
      tint: 'linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))',
      html: `<div class="xmas-stack">${frameMock('image/poster-mur-salon.jpg')}${deviceMock('image/enfants-babyfoot.jpg')}${puzzleMock('image/famille-plage-rochers.jpg')}</div>`
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
