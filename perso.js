/* Nostalie — « voir avec votre photo ».
   Le client importe une image, on la place en direct sur le puzzle
   (découpe 200 pièces) ou dans l'écran du cadre connecté. */

/* ---------- Petits utilitaires ---------- */

function persoAlea(graine) {
  let s = graine >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function persoLireFichier(fichier) {
  return new Promise((ok, ko) => {
    const r = new FileReader();
    r.onload = () => ok(r.result);
    r.onerror = ko;
    r.readAsDataURL(fichier);
  });
}

/* ---------- Découpe de puzzle ----------
   Un bord de pièce : une ligne droite avec un téton au milieu, qui sort
   d'un côté ou de l'autre. Les coordonnées sont exprimées le long du bord
   (t de 0 à 1) et perpendiculairement (n, en fraction de la longueur). */

function persoBordPiece(x0, y0, x1, y1, sens) {
  const dx = x1 - x0, dy = y1 - y0;
  const nx = -dy, ny = dx;
  const p = (t, n) =>
    (x0 + dx * t + nx * n * sens).toFixed(1) + ',' + (y0 + dy * t + ny * n * sens).toFixed(1);
  return ' L' + p(0.40, 0) +
         ' C' + p(0.36, 0.05) + ' ' + p(0.31, 0.17) + ' ' + p(0.41, 0.22) +
         ' C' + p(0.48, 0.28) + ' ' + p(0.52, 0.28) + ' ' + p(0.59, 0.22) +
         ' C' + p(0.69, 0.17) + ' ' + p(0.64, 0.05) + ' ' + p(0.60, 0) +
         ' L' + x1.toFixed(1) + ',' + y1.toFixed(1);
}

/** Toutes les lignes de découpe intérieures d'une grille cols × rows. */
function persoDecoupe(cols, rows, larg, haut, graine) {
  const alea = persoAlea(graine);
  const cx = larg / cols, cy = haut / rows;
  const traits = [];

  for (let r = 1; r < rows; r++) {
    let d = 'M0,' + (r * cy).toFixed(1);
    for (let c = 0; c < cols; c++) {
      d += persoBordPiece(c * cx, r * cy, (c + 1) * cx, r * cy, alea() < 0.5 ? 1 : -1);
    }
    traits.push(d);
  }
  for (let c = 1; c < cols; c++) {
    let d = 'M' + (c * cx).toFixed(1) + ',0';
    for (let r = 0; r < rows; r++) {
      d += persoBordPiece(c * cx, r * cy, c * cx, (r + 1) * cy, alea() < 0.5 ? 1 : -1);
    }
    traits.push(d);
  }
  return traits.join(' ');
}

/* ---------- Placement en perspective ----------
   Homographie du rectangle de départ vers les quatre coins mesurés sur la
   photo du cadre, traduite en matrix3d CSS. */

function persoMultMM(a, b) {
  const c = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let s = 0;
      for (let k = 0; k < 3; k++) s += a[3 * i + k] * b[3 * k + j];
      c[3 * i + j] = s;
    }
  }
  return c;
}

function persoMultMV(m, v) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
  ];
}

function persoAdj(m) {
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]
  ];
}

/** Base projective envoyant (1,0,0) (0,1,0) (0,0,1) sur les trois premiers
    points, normalisée pour que le quatrième tombe juste. */
function persoBase(p) {
  const m = [p[0], p[2], p[4], p[1], p[3], p[5], 1, 1, 1];
  const v = persoMultMV(persoAdj(m), [p[6], p[7], 1]);
  return persoMultMM(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

/** matrix3d qui envoie le rectangle larg × haut sur les 4 coins donnés
    (ordre : haut-gauche, haut-droit, bas-gauche, bas-droit). */
function persoMatrice(larg, haut, coins) {
  const depart = [0, 0, larg, 0, 0, haut, larg, haut];
  const t = persoMultMM(persoBase(coins), persoAdj(persoBase(depart)));
  const n = t.map((v) => v / t[8]);
  return 'matrix3d(' + [
    n[0], n[3], 0, n[6],
    n[1], n[4], 0, n[7],
    0, 0, 1, 0,
    n[2], n[5], 0, n[8]
  ].join(',') + ')';
}

/* ---------- Les deux rendus ---------- */

const PERSO_PUZZLE = {
  cols: 20, rows: 10,          // 200 pièces sur 48 × 36 cm
  larg: 480, haut: 360,
  defaut: 'image/famille-plage-rochers.webp',
  legende: 'Puzzle personnalisé 200 pièces · taille montée ca. 48 × 36 cm'
};

/* Coins de la dalle relevés sur la photo du produit,
   et rectangle du téléphone posé en dessous. */
const PERSO_ECRAN = {
  fond: 'image/cadre-ecran-produit.webp',
  sceneL: 1219, sceneH: 1165,
  ecran: { larg: 940, haut: 600, coins: [139, 117, 1071, 156, 182, 780, 1129, 747] },
  tel: { x: 60, y: 960, larg: 414, haut: 192, rayon: 26 },
  legende: 'Cadre photo écran 10,1" · la photo s\'affiche aussi sur le téléphone'
};

function persoRenduPuzzle() {
  const c = PERSO_PUZZLE;
  const coupe = persoDecoupe(c.cols, c.rows, c.larg, c.haut, 20260906);
  return `
    <figure class="puz-rendu">
      <div class="puz-plateau">
        <img class="puz-photo" src="${c.defaut}" alt="Aperçu du puzzle personnalisé">
        <svg class="puz-coupe" viewBox="0 0 ${c.larg} ${c.haut}" preserveAspectRatio="none" aria-hidden="true">
          <path class="puz-relief" d="${coupe}"/>
          <path class="puz-trait" d="${coupe}"/>
        </svg>
      </div>
      <figcaption>${c.legende}</figcaption>
    </figure>`;
}

function persoRenduEcran() {
  const c = PERSO_ECRAN;
  return `
    <figure class="ecr-rendu">
      <div class="ecr-cadre">
        <div class="ecr-scene">
          <img class="ecr-fond" src="${c.fond}" alt="Le cadre photo écran Nostalie posé, relié au téléphone">
          <div class="ecr-zone ecr-ecran" hidden><img alt=""></div>
          <div class="ecr-zone ecr-tel" hidden><img alt=""></div>
        </div>
      </div>
      <figcaption>${c.legende}</figcaption>
    </figure>`;
}

/* ---------- Montage ---------- */

const PERSO_ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="M7.5 8.5L12 4l4.5 4.5"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/></svg>';

/** Le bloc tel qu'il apparaît dans la galerie de la fiche produit :
    le rendu occupe la vignette, les deux boutons passent en dessous. */
function persoMarquageGalerie(rendu) {
  return `
    <div class="perso-vue sp-vue">${rendu}</div>
    <div class="sp-barre">
      <label class="btn small perso-choisir">${PERSO_ICONE}<span>Voir avec ma photo</span>
        <input type="file" accept="image/*" hidden></label>
      <button type="button" class="btn ghost small perso-reset" hidden>Photo d'origine</button>
    </div>`;
}

function persoMonter(bloc) {
  if (bloc.dataset.persoMonte) return;   // la page produit monte le bloc dès l'injection
  bloc.dataset.persoMonte = '1';
  const type = bloc.dataset.perso;
  const rendu = type === 'puzzle' ? persoRenduPuzzle() : persoRenduEcran();

  bloc.innerHTML = persoMarquageGalerie(rendu);

  const vue = bloc.querySelector('.perso-vue');
  const champ = bloc.querySelector('input[type=file]');
  const reset = bloc.querySelector('.perso-reset');

  const poser = type === 'puzzle' ? persoPoserPuzzle(bloc) : persoPoserEcran(bloc);

  async function prendre(fichier) {
    if (!fichier || !fichier.type.startsWith('image/')) return;
    poser(await persoLireFichier(fichier));
    reset.hidden = false;
    vue.classList.add('perso-rempli');
  }

  champ.addEventListener('change', (e) => prendre(e.target.files[0]));
  reset.addEventListener('click', () => {
    poser(null);
    reset.hidden = true;
    champ.value = '';
    vue.classList.remove('perso-rempli');
  });

  // Glisser-déposer, pour ceux qui sont sur un ordinateur.
  ['dragenter', 'dragover'].forEach((n) => vue.addEventListener(n, (e) => {
    e.preventDefault();
    vue.classList.add('perso-survol');
  }));
  ['dragleave', 'drop'].forEach((n) => vue.addEventListener(n, (e) => {
    e.preventDefault();
    vue.classList.remove('perso-survol');
  }));
  vue.addEventListener('drop', (e) => prendre(e.dataTransfer.files[0]));
}

function persoPoserPuzzle(bloc) {
  const img = bloc.querySelector('.puz-photo');
  return (src) => { img.src = src || PERSO_PUZZLE.defaut; };
}

function persoPoserEcran(bloc) {
  const c = PERSO_ECRAN;
  const cadre = bloc.querySelector('.ecr-cadre');
  const scene = bloc.querySelector('.ecr-scene');
  const zoneEcran = bloc.querySelector('.ecr-ecran');
  const zoneTel = bloc.querySelector('.ecr-tel');

  cadre.style.aspectRatio = c.sceneL + ' / ' + c.sceneH;
  scene.style.width = c.sceneL + 'px';
  scene.style.height = c.sceneH + 'px';

  zoneEcran.style.width = c.ecran.larg + 'px';
  zoneEcran.style.height = c.ecran.haut + 'px';
  zoneEcran.style.transform = persoMatrice(c.ecran.larg, c.ecran.haut, c.ecran.coins);

  zoneTel.style.left = c.tel.x + 'px';
  zoneTel.style.top = c.tel.y + 'px';
  zoneTel.style.width = c.tel.larg + 'px';
  zoneTel.style.height = c.tel.haut + 'px';
  zoneTel.style.borderRadius = c.tel.rayon + 'px';

  // La scène est dessinée à sa taille réelle puis réduite à celle du bloc,
  // pour que la perspective reste juste quelle que soit la largeur d'écran.
  const ajuster = () => {
    scene.style.transform = 'scale(' + (cadre.clientWidth / c.sceneL) + ')';
  };
  ajuster();
  if (window.ResizeObserver) new ResizeObserver(ajuster).observe(cadre);
  else window.addEventListener('resize', ajuster);

  return (src) => {
    [zoneEcran, zoneTel].forEach((z) => {
      z.querySelector('img').src = src || '';
      z.hidden = !src;
    });
  };
}

function monterPersonnalisation(racine) {
  (racine || document).querySelectorAll('[data-perso]').forEach(persoMonter);
}

document.addEventListener('DOMContentLoaded', () => monterPersonnalisation(document));
