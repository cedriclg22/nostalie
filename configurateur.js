// Configurateur de commande : le Pack Noël, ou les produits à l'unité.
(function () {
  const CLE = 'nostalie_selection';

  // selection = { 'cadre-jeu': 'abo', 'puzzle': 'unite', ... }  |  { 'pack-noel': 'pack' }
  let selection = {};

  const euro = (n) => n.toFixed(2).replace('.', ',').replace(',00', '') + ' €';
  const fmtId = (slug) => PRODUIT_INFO[slug].formats.find((f) => f.id === selection[slug]);

  function charger() {
    const p = new URLSearchParams(location.search).get('p');
    if (PRODUIT_INFO[p]) {
      selection = { [p]: PRODUIT_INFO[p].formats[0].id };
      return;
    }
    try {
      const brut = JSON.parse(localStorage.getItem(CLE) || '{}');
      Object.keys(brut).forEach((slug) => {
        if (PRODUIT_INFO[slug] && PRODUIT_INFO[slug].formats.some((f) => f.id === brut[slug])) {
          selection[slug] = brut[slug];
        }
      });
    } catch (e) { /* stockage indisponible : on repart d'une sélection vide */ }
  }

  function sauver() {
    try { localStorage.setItem(CLE, JSON.stringify(selection)); } catch (e) { /* ignoré */ }
  }

  function basculer(slug, formatId) {
    const estPack = PRODUIT_INFO[slug].pack;
    if (selection[slug] && (!formatId || selection[slug] === formatId)) {
      delete selection[slug];
    } else {
      if (estPack) selection = {};
      else PRODUIT_ORDRE.filter((s) => PRODUIT_INFO[s].pack).forEach((s) => delete selection[s]);
      selection[slug] = formatId || PRODUIT_INFO[slug].formats[0].id;
    }
    sauver();
    rendre();
  }

  function carteOffre(slug) {
    const info = PRODUIT_INFO[slug];
    const choisi = !!selection[slug];
    const formats = info.formats.map((f) => {
      const actif = selection[slug] === f.id;
      const seul = info.formats.length === 1;
      return `<button type="button" class="fmt${actif ? ' on' : ''}" data-slug="${slug}" data-fmt="${f.id}">
        <span class="fmt-label">${seul ? f.label : f.label}</span>
        <span class="fmt-prix">${f.prix}<em>${f.per}</em></span>
      </button>`;
    }).join('');

    return `<article class="offer${choisi ? ' on' : ''}${info.pack ? ' offer-pack' : ''}" data-slug="${slug}">
      <button type="button" class="offer-head" data-slug="${slug}">
        <span class="offer-check" aria-hidden="true"></span>
        <span class="offer-id">
          <span class="offer-num">${info.num}</span>
          <b>${info.nom}</b>
          <span class="offer-desc">${info.accroche}</span>
        </span>
      </button>
      <div class="fmts">${formats}</div>
      ${info.pack ? '' : `<a class="offer-lien" href="produit.html?p=${slug}">Voir la fiche produit →</a>`}
    </article>`;
  }

  function lignesRecap() {
    return PRODUIT_ORDRE.filter((s) => selection[s]).map((s) => {
      const f = fmtId(s);
      return { slug: s, nom: PRODUIT_INFO[s].nom, format: f };
    });
  }

  function rendre() {
    const lignes = lignesRecap();
    const maintenant = lignes.reduce((t, l) => t + l.format.now, 0);
    const parMois = lignes.reduce((t, l) => t + l.format.month, 0);

    document.getElementById('offresListe').innerHTML =
      PRODUIT_ORDRE.filter((s) => PRODUIT_INFO[s].pack).map(carteOffre).join('') +
      '<div class="offer-sep"><span>ou à l\'unité</span></div>' +
      PRODUIT_ORDRE.filter((s) => !PRODUIT_INFO[s].pack).map(carteOffre).join('');

    document.getElementById('recapLignes').innerHTML = lignes.length
      ? lignes.map((l) => `<li><span>${PRODUIT_INFO[l.slug].pack ? l.nom : `<a href="produit.html?p=${l.slug}">${l.nom}</a>`}<em>${l.format.detail}</em></span><b>${l.format.prix}</b></li>`).join('')
      : '<li class="vide">Rien de sélectionné pour l\'instant.</li>';

    document.getElementById('recapTotaux').innerHTML = lignes.length
      ? `<div class="tot"><span>À la commande</span><b>${euro(maintenant)}</b></div>` +
        (parMois > 0 ? `<div class="tot sub"><span>Puis chaque mois</span><b>${euro(parMois)}</b></div>` : '')
      : '';

    const cta = document.getElementById('recapCta');
    cta.classList.toggle('disabled', lignes.length === 0);
    cta.textContent = lignes.length > 1 ? 'Continuer avec ' + lignes.length + ' produits' : 'Continuer';

    const badge = document.getElementById('panierBadge');
    if (badge) { badge.textContent = lignes.length; badge.hidden = lignes.length === 0; }
  }

  document.getElementById('offresListe').addEventListener('click', (e) => {
    const fmt = e.target.closest('.fmt');
    if (fmt) return basculer(fmt.dataset.slug, fmt.dataset.fmt);
    const head = e.target.closest('.offer-head');
    if (head) return basculer(head.dataset.slug, null);
  });

  charger();
  rendre();
})();
