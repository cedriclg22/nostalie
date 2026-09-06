// Barre de navigation : menu déroulant « Nos produits » et compteur de commande.
(function () {
  const drop = document.querySelector('.navdrop');
  if (drop) {
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

  const badge = document.getElementById('panierBadge');
  if (badge) {
    let n = 0;
    try { n = Object.keys(JSON.parse(localStorage.getItem('nostalie_selection') || '{}')).length; }
    catch (e) { /* stockage indisponible */ }
    badge.textContent = n;
    badge.hidden = n === 0;
  }
})();
