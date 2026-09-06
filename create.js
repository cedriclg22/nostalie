/* Nostalie — création du cadre jeu.
   Cinq étapes, une par écran sur téléphone, avec l'aperçu de l'affiche
   toujours à côté sur ordinateur. Rien n'est envoyé : tout se passe dans
   le navigateur, et l'affiche n'est enregistrée qu'au moment de générer. */
(function () {

  const MIN_PHOTOS = 4;
  const MAX_PHOTOS = 6;

  const ETAPES = ['Photos', 'Mots', 'Rébus', 'Récompense', 'Couleurs'];

  const PALETTES = [
    ['#F50068', '#FDF5EA'], ['#4A3128', '#FBEEDF'], ['#2F6F63', '#F1F6F0'],
    ['#C2410C', '#FFF4E6'], ['#3B4CCA', '#EEF1FF'], ['#8B2E5D', '#FCEEF5']
  ];

  const nouvelEtat = () => ({
    photos: [],
    oddPhotoIndex: 0,
    words: [{ word: '', clue: '', key: true }, { word: '', clue: '', key: false }],
    rebusAnswer: '',
    rebusEmojis: [],
    finalWord: '',
    montage: { items: [], audio: null },
    colorPrimary: '#F50068',
    colorSecondary: '#FDF5EA'
  });

  let etat = nouvelEtat();
  let etape = 0;
  let grilleCache = { signature: '', valeur: null };

  const $ = (id) => document.getElementById(id);

  /* ---------- Photos : on réduit avant de garder, sinon l'affiche
       ne tient pas dans le stockage du navigateur. ---------- */

  function importerPhoto(fichier, cote = 1400, qualite = 0.82) {
    return fileToDataUrl(fichier).then((url) => new Promise((ok) => {
      const img = new Image();
      img.onload = () => {
        const e = Math.min(1, cote / Math.max(img.width, img.height));
        if (e === 1 && url.length < 900000) return ok(url);
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * e);
        c.height = Math.round(img.height * e);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL('image/jpeg', qualite));
      };
      img.onerror = () => ok(url);
      img.src = url;
    }));
  }

  /* ---------- L'affiche telle qu'elle sera ---------- */

  function motsUtiles() {
    return etat.words
      .map((m) => ({ word: (m.word || '').trim().toUpperCase(), clue: (m.clue || '').trim(), key: !!m.key }))
      .filter((m) => m.word.length > 1 && m.clue);
  }

  function grille() {
    const mots = motsUtiles();
    const signature = JSON.stringify(mots);
    if (signature !== grilleCache.signature) {
      grilleCache = { signature, valeur: mots.length >= 2 ? generateCrossword(mots) : null };
    }
    return grilleCache.valeur;
  }

  function affiche() {
    const photos = etat.photos.filter(Boolean);
    return {
      photos,
      oddPhotoIndex: Math.min(etat.oddPhotoIndex, Math.max(0, photos.length - 1)),
      words: motsUtiles(),
      crossword: grille(),
      rebusEmojis: etat.rebusEmojis,
      rebusAnswer: etat.rebusAnswer,
      diffPhoto: photos[0] || null,
      diffPoint: { x: 62, y: 38 },
      coverPhoto: photos[0] || null,
      video: null,
      montage: etat.montage,
      colorPrimary: etat.colorPrimary,
      colorSecondary: etat.colorSecondary,
      finalWord: etat.finalWord
    };
  }

  function dessinerApercu() {
    const cible = $('crPoster');
    cible.style.setProperty('--primary', etat.colorPrimary);
    cible.style.setProperty('--primary-dark', shade(etat.colorPrimary, -18));
    cible.style.setProperty('--secondary', etat.colorSecondary);
    renderPosterInto(cible, affiche());
    ajusterApercu();
  }

  /* L'affiche est composée pour 820 px de large : on la dessine à cette
     taille puis on la réduit, sinon les jeux ne tiennent plus dedans. */
  function ajusterApercu() {
    const boite = document.querySelector('.cr-apercu');
    const cible = $('crPoster');

    // Sous 560 px, l'affiche a ses propres règles compactes : on la laisse
    // occuper toute la largeur plutôt que de la réduire une seconde fois.
    if (window.matchMedia('(max-width: 560px)').matches) {
      cible.style.width = '100%';
      cible.style.transform = '';
      cible.style.height = '';
      return;
    }

    const cs = getComputedStyle(boite);
    const dispo = boite.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const k = Math.min(1, (dispo || 820) / 820);
    cible.style.width = '820px';
    cible.style.transformOrigin = 'top left';
    cible.style.transform = 'scale(' + k + ')';
    const aff = cible.firstElementChild;
    cible.style.height = Math.round((aff ? aff.offsetHeight : 820 * 4 / 3) * k) + 'px';
  }

  /* ---------- Étape 1 · les photos ---------- */

  function dessinerPhotos() {
    const zone = $('crPhotos');
    const cases = [];
    for (let i = 0; i < MAX_PHOTOS; i++) {
      const src = etat.photos[i];
      cases.push(src
        ? `<div class="cr-photo" data-i="${i}"><img src="${src}" alt="Photo ${i + 1}">
             <span class="cr-photo-num">${i + 1}</span>
             <button type="button" class="cr-photo-x" data-suppr="${i}" aria-label="Retirer la photo ${i + 1}">✕</button>
           </div>`
        : `<button type="button" class="cr-photo cr-photo-vide" data-ajout="1">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>
             <span>Ajouter</span>
           </button>`);
    }
    zone.innerHTML = cases.join('');

    zone.querySelectorAll('[data-ajout]').forEach((b) => b.addEventListener('click', () => champPhotos.click()));
    zone.querySelectorAll('[data-suppr]').forEach((b) => b.addEventListener('click', () => {
      etat.photos.splice(+b.dataset.suppr, 1);
      if (etat.oddPhotoIndex >= etat.photos.length) etat.oddPhotoIndex = 0;
      dessinerPhotos();
      rafraichir();
    }));

    const n = etat.photos.length;
    $('crPhotosAide').textContent = n < MIN_PHOTOS
      ? `Encore ${MIN_PHOTOS - n} photo${MIN_PHOTOS - n > 1 ? 's' : ''} pour continuer.`
      : `${n} photo${n > 1 ? 's' : ''} — vous pouvez en mettre jusqu'à ${MAX_PHOTOS}.`;

    $('crIntruseBloc').hidden = n < 2;
    $('crIntruse').innerHTML = etat.photos.map((src, i) =>
      `<button type="button" class="cr-chip-photo${i === etat.oddPhotoIndex ? ' on' : ''}" data-odd="${i}">
         <img src="${src}" alt=""><span>${i + 1}</span></button>`).join('');
    $('crIntruse').querySelectorAll('[data-odd]').forEach((b) => b.addEventListener('click', () => {
      etat.oddPhotoIndex = +b.dataset.odd;
      dessinerPhotos();
    }));
  }

  const champPhotos = Object.assign(document.createElement('input'), { type: 'file', accept: 'image/*', multiple: true });
  champPhotos.addEventListener('change', async (e) => {
    const fichiers = [...e.target.files].slice(0, MAX_PHOTOS - etat.photos.length);
    for (const f of fichiers) etat.photos.push(await importerPhoto(f));
    champPhotos.value = '';
    dessinerPhotos();
    rafraichir();
  });

  /* ---------- Étape 2 · les mots ---------- */

  function dessinerMots() {
    $('crMots').innerHTML = etat.words.map((m, i) => `
      <div class="cr-mot" data-i="${i}">
        <input class="cr-mot-mot" data-champ="word" data-i="${i}" value="${echapper(m.word)}" placeholder="MOT" autocomplete="off" maxlength="14">
        <input class="cr-mot-def" data-champ="clue" data-i="${i}" value="${echapper(m.clue)}" placeholder="Sa définition" autocomplete="off">
        <button type="button" class="cr-mot-x" data-suppr="${i}" aria-label="Retirer ce mot">✕</button>
      </div>`).join('');

    $('crMots').querySelectorAll('input').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const v = e.target.value;
        etat.words[+e.target.dataset.i][e.target.dataset.champ] =
          e.target.dataset.champ === 'word' ? sansAccent(v).toUpperCase() : v;
        if (e.target.dataset.champ === 'word') e.target.value = etat.words[+e.target.dataset.i].word;
        majAideMots();
      });
      inp.addEventListener('blur', rafraichir);
    });
    $('crMots').querySelectorAll('[data-suppr]').forEach((b) => b.addEventListener('click', () => {
      etat.words.splice(+b.dataset.suppr, 1);
      if (!etat.words.length) etat.words.push({ word: '', clue: '', key: true });
      dessinerMots();
      rafraichir();
    }));
    majAideMots();
  }

  function majAideMots() {
    const n = motsUtiles().length;
    $('crMotsAide').textContent = n < 2
      ? 'Il faut au moins deux mots avec leur définition pour croiser la grille.'
      : `${n} mots placés dans la grille.`;
  }

  /* ---------- Étape 3 · le rébus ---------- */

  function dessinerRebus() {
    $('crRebusMot').value = etat.rebusAnswer;
    $('crRebusApercu').innerHTML = etat.rebusEmojis.length
      ? etat.rebusEmojis.map((e, i) => `<button type="button" class="cr-emoji" data-retire="${i}" title="Retirer">${e}</button>`).join('')
      : '<span class="cr-vide">Les emojis apparaîtront ici.</span>';
    $('crRebusApercu').querySelectorAll('[data-retire]').forEach((b) => b.addEventListener('click', () => {
      etat.rebusEmojis.splice(+b.dataset.retire, 1);
      dessinerRebus();
      rafraichir();
    }));
    $('crRebusAide').textContent = !etat.rebusAnswer
      ? 'Tapez le mot à deviner.'
      : (etat.rebusEmojis.length ? '' : 'Ajoutez au moins un emoji.');
  }

  function dessinerPalette() {
    $('crPalette').innerHTML = EMOJI_LIBRARY
      .map((e) => `<button type="button" class="cr-emoji" data-ajoute="${e}">${e}</button>`).join('');
    $('crPalette').querySelectorAll('[data-ajoute]').forEach((b) => b.addEventListener('click', () => {
      if (etat.rebusEmojis.length < 8) etat.rebusEmojis.push(b.dataset.ajoute);
      dessinerRebus();
      rafraichir();
    }));
  }

  /* ---------- Étape 4 · la vidéo ---------- */

  function dessinerMontage() {
    const items = etat.montage.items;
    const zone = $('crMontage');
    if (!items.length && !etat.montage.audio) {
      zone.innerHTML = '<p class="cr-vide">Rien pour l\'instant. L\'affiche marche très bien sans.</p>';
      return;
    }
    zone.innerHTML =
      items.map((it, i) => `
        <div class="cr-mitem">
          ${it.type === 'photo' ? `<img src="${it.src}" alt="">` : '<span class="cr-mvideo">▶</span>'}
          <b>${it.type === 'photo' ? 'Photo' : 'Vidéo'} ${i + 1}</b>
          <button type="button" class="cr-mot-x" data-mdel="${i}" aria-label="Retirer">✕</button>
        </div>`).join('') +
      (etat.montage.audio
        ? '<div class="cr-mitem"><span class="cr-mvideo">♪</span><b>Musique</b><button type="button" class="cr-mot-x" data-adel="1" aria-label="Retirer la musique">✕</button></div>'
        : '');

    zone.querySelectorAll('[data-mdel]').forEach((b) => b.addEventListener('click', () => {
      items.splice(+b.dataset.mdel, 1);
      dessinerMontage();
    }));
    const a = zone.querySelector('[data-adel]');
    if (a) a.addEventListener('click', () => { etat.montage.audio = null; dessinerMontage(); });
  }

  /* ---------- Étape 5 · les couleurs ---------- */

  function dessinerCouleurs() {
    $('crPalettes').innerHTML = PALETTES.map(([a, b]) => `
      <button type="button" class="cr-swatch${a === etat.colorPrimary && b === etat.colorSecondary ? ' on' : ''}"
              data-a="${a}" data-b="${b}" aria-label="Palette ${a}">
        <i style="background:${a}"></i><i style="background:${b}"></i>
      </button>`).join('');
    $('crPalettes').querySelectorAll('.cr-swatch').forEach((s) => s.addEventListener('click', () => {
      etat.colorPrimary = s.dataset.a;
      etat.colorSecondary = s.dataset.b;
      $('crCoul1').value = etat.colorPrimary;
      $('crCoul2').value = etat.colorSecondary;
      dessinerCouleurs();
      rafraichir();
    }));
    $('crCoul1').value = etat.colorPrimary;
    $('crCoul2').value = etat.colorSecondary;
  }

  /* ---------- Navigation ---------- */

  function manque(i) {
    if (i === 0 && etat.photos.length < MIN_PHOTOS) return `Ajoutez au moins ${MIN_PHOTOS} photos.`;
    if (i === 1 && motsUtiles().length < 2) return 'Il faut deux mots avec leur définition.';
    if (i === 2 && (!etat.rebusAnswer.trim() || !etat.rebusEmojis.length)) return 'Il manque le mot ou les emojis du rébus.';
    if (i === 3 && !etat.finalWord.trim()) return 'Il manque le mot final.';
    return '';
  }

  function allerA(i) {
    etape = Math.max(0, Math.min(ETAPES.length - 1, i));
    document.querySelectorAll('.cr-etape').forEach((s) => { s.hidden = +s.dataset.etape !== etape; });

    $('crFil').innerHTML = ETAPES.map((nom, k) => `
      <li class="${k === etape ? 'on' : (k < etape ? 'fait' : '')}">
        <button type="button" data-va="${k}"><i>${k + 1}</i><span>${nom}</span></button>
      </li>`).join('');
    $('crFil').querySelectorAll('[data-va]').forEach((b) => b.addEventListener('click', () => {
      const cible = +b.dataset.va;
      if (cible <= etape) return allerA(cible);
      for (let k = etape; k < cible; k++) {
        const m = manque(k);
        if (m) { allerA(k); signaler(m); return; }
      }
      allerA(cible);
    }));

    $('crRetour').disabled = etape === 0;
    $('crSuivant').hidden = etape === ETAPES.length - 1;
    document.body.classList.toggle('cr-apercu-ouvert', etape === ETAPES.length - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    rafraichir();
  }

  function signaler(message) {
    const b = $('crSuivant');
    b.classList.add('cr-secoue');
    setTimeout(() => b.classList.remove('cr-secoue'), 500);
    const aide = document.querySelector('.cr-etape:not([hidden]) .cr-aide');
    if (aide) { aide.textContent = message; aide.classList.add('cr-alerte'); }
  }

  function rafraichir() {
    dessinerApercu();
  }

  /* ---------- Petits outils ---------- */

  function echapper(s) {
    return String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function sansAccent(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z]/g, '');
  }

  /* ---------- Branchements ---------- */

  $('crSuivant').addEventListener('click', () => {
    const m = manque(etape);
    if (m) return signaler(m);
    allerA(etape + 1);
  });
  $('crRetour').addEventListener('click', () => allerA(etape - 1));

  $('crAddMot').addEventListener('click', () => {
    if (etat.words.length >= 6) return;
    etat.words.push({ word: '', clue: '', key: false });
    dessinerMots();
  });
  $('crIdeesMots').addEventListener('click', () => {
    const libres = WORD_SUGGESTIONS.filter((s) => !etat.words.some((m) => m.word === s.word));
    etat.words.forEach((m, i) => {
      if (!m.word && libres.length) Object.assign(etat.words[i], libres.shift(), { key: i === 0 });
    });
    while (etat.words.length < 4 && libres.length) etat.words.push({ ...libres.shift(), key: false });
    dessinerMots();
    rafraichir();
  });

  $('crRebusMot').addEventListener('input', (e) => {
    etat.rebusAnswer = e.target.value;
    etat.rebusEmojis = e.target.value.trim() ? suggestRebus(e.target.value.trim()) : [];
    dessinerRebus();
    rafraichir();
  });
  $('crRebusRegen').addEventListener('click', () => {
    if (!etat.rebusAnswer.trim()) return;
    etat.rebusEmojis = suggestRebus(etat.rebusAnswer.trim());
    dessinerRebus();
    rafraichir();
  });
  $('crRebusVider').addEventListener('click', () => { etat.rebusEmojis = []; dessinerRebus(); rafraichir(); });

  $('crMotFinal').addEventListener('input', (e) => { etat.finalWord = e.target.value; rafraichir(); });

  $('crMontagePhotos').addEventListener('change', async (e) => {
    for (const f of [...e.target.files]) {
      etat.montage.items.push({ type: 'photo', src: await importerPhoto(f, 1000, 0.78), duration: 2.5 });
    }
    e.target.value = '';
    dessinerMontage();
  });
  $('crMontageVideo').addEventListener('change', async (e) => {
    if (e.target.files[0]) etat.montage.items.push({ type: 'video', src: await fileToDataUrl(e.target.files[0]) });
    e.target.value = '';
    dessinerMontage();
  });
  $('crMontageAudio').addEventListener('change', async (e) => {
    if (e.target.files[0]) etat.montage.audio = await fileToDataUrl(e.target.files[0]);
    e.target.value = '';
    dessinerMontage();
  });

  $('crCoul1').addEventListener('input', (e) => { etat.colorPrimary = e.target.value; dessinerCouleurs(); rafraichir(); });
  $('crCoul2').addEventListener('input', (e) => { etat.colorSecondary = e.target.value; dessinerCouleurs(); rafraichir(); });

  $('crVoirApercu').addEventListener('click', () => document.body.classList.toggle('cr-apercu-ouvert'));
  $('crFermerApercu').addEventListener('click', () => document.body.classList.remove('cr-apercu-ouvert'));

  $('crGenerer').addEventListener('click', () => {
    const id = Store.newId();
    try {
      Store.save(id, affiche());
    } catch (e) {
      return signaler("L'affiche est trop lourde pour ce navigateur. Retirez une photo de la vidéo surprise.");
    }
    const url = new URL('view.html', location.href);
    url.searchParams.set('id', id);
    $('crLien').value = url.toString();
    $('crVoir').href = url.toString();
    const impression = new URL('poster.html', location.href);
    impression.searchParams.set('id', id);
    $('crImprimer').href = impression.toString();
    $('crPartage').hidden = false;
    $('crFinal').hidden = true;
    $('crPartage').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('crLien').addEventListener('focus', (e) => e.target.select());

  $('crDemo').addEventListener('click', () => {
    const d = buildDemoBoard();
    etat = {
      photos: d.photos.slice(), oddPhotoIndex: d.oddPhotoIndex,
      words: d.words.map((m) => ({ ...m })),
      rebusAnswer: d.rebusAnswer, rebusEmojis: d.rebusEmojis.slice(),
      finalWord: d.finalWord, montage: d.montage,
      colorPrimary: d.colorPrimary, colorSecondary: d.colorSecondary
    };
    toutDessiner();
    allerA(0);
  });
  $('crVider').addEventListener('click', () => {
    etat = nouvelEtat();
    $('crPartage').hidden = true;
    $('crFinal').hidden = false;
    toutDessiner();
    allerA(0);
  });

  function toutDessiner() {
    dessinerPhotos();
    dessinerMots();
    dessinerRebus();
    dessinerMontage();
    dessinerCouleurs();
    $('crMotFinal').value = etat.finalWord;
  }

  if (window.ResizeObserver) new ResizeObserver(ajusterApercu).observe(document.querySelector('.cr-apercu'));
  else window.addEventListener('resize', ajusterApercu);

  dessinerPalette();
  toutDessiner();
  allerA(0);
})();
