// Page produit : galerie, choix de la formule, ajout à la commande.
(function () {
  const CLE = 'nostalie_selection';
  const slug0 = new URLSearchParams(location.search).get('p');
  const slug = PRODUIT_PAGES[slug0] ? slug0 : 'cadre-jeu';

  document.getElementById('pdpRoot').innerHTML = PRODUIT_PAGES[slug];
  document.title = PRODUIT_INFO[slug].nom + ' — Nostalie';

  let format = PRODUIT_INFO[slug].formats[0].id;

  const lire = () => {
    try { return JSON.parse(localStorage.getItem(CLE) || '{}'); } catch (e) { return {}; }
  };
  const ecrire = (o) => {
    try { localStorage.setItem(CLE, JSON.stringify(o)); } catch (e) { /* stockage indisponible */ }
  };

  // --- galerie ---
  const shots = [...document.querySelectorAll('.shot')];
  const thumbs = [...document.querySelectorAll('.thumb')];
  thumbs.forEach((t) => t.addEventListener('click', () => {
    const i = +t.dataset.i;
    shots.forEach((s) => s.classList.toggle('on', +s.dataset.i === i));
    thumbs.forEach((x) => x.classList.toggle('on', x === t));
  }));

  // --- formule ---
  const opts = [...document.querySelectorAll('.opt')];
  opts.forEach((o) => o.addEventListener('click', () => {
    format = o.dataset.fmt;
    opts.forEach((x) => x.classList.toggle('on', x === o));
    document.getElementById('ajoute').hidden = true;
  }));

  // --- panier ---
  function majBadge() {
    const n = Object.keys(lire()).length;
    const badge = document.getElementById('panierBadge');
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  document.getElementById('ajouter').addEventListener('click', () => {
    const sel = lire();
    // le pack et l'achat à l'unité s'excluent
    if (PRODUIT_INFO[slug].pack) {
      Object.keys(sel).forEach((s) => delete sel[s]);
    } else {
      PRODUIT_ORDRE.filter((s) => PRODUIT_INFO[s] && PRODUIT_INFO[s].pack).forEach((s) => delete sel[s]);
    }
    sel[slug] = format;
    ecrire(sel);
    document.getElementById('ajoute').hidden = false;
    majBadge();
  });

  majBadge();
})();
