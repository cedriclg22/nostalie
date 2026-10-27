# -*- coding: utf-8 -*-
"""Génère produit.js (PRODUIT_INFO + PRODUIT_PAGES) à partir des données ci-dessous.
   Relancer après chaque modification : python3 tools-produit-build.py"""
import json

def frame(src):
    return '<div class="frame-mock"><img src="%s" alt=""></div>' % src


def empile(src, classe):
    """Une photo inclinée dans la pile du coffret."""
    return '<div class="xmas-photo %s"><img src="%s" alt=""></div>' % (classe, src)


XMAS_STACK = '<div class="xmas-stack">%s%s%s</div>' % (
    frame('image/poster-mur-salon.webp'),
    empile('image/ecran-famille-buffet.webp', 'ecran'),
    empile('image/puzzle-noel-canape.webp', 'puzzle'))


def photo(src, alt, differe=True):
    """Les vues de galerie ne sont pas toutes visibles : on diffère leur chargement."""
    attrs = ' loading="lazy" decoding="async"' if differe else ''
    return '<img%s src="%s" alt="%s">' % (attrs, src, alt)


def ic(nom):
    """Un picto du sprite (icones.js)."""
    return '<svg class="ic"><use href="#i-%s"/></svg>' % nom


def mock(html, tint):
    return '<div class="shot-mock" style="--tint:%s">%s</div>' % (tint, html)


ROSE, SKY, SAGE = 'var(--rose)', 'var(--sky)', 'var(--sage)'
XMAS_TINT = 'linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))'

PRODUITS = {
 'cadre-jeu': dict(
   nom="Cadre jeu", num="Produit 01", badge="Le plus choisi", tint=ROSE,
   titre="Le cadre jeu",
   sous_titre="5 mini-jeux tirés de vos photos. Une vidéo au bout.",
   points=[("spark", "5 jeux générés"), ("play", "Vidéo surprise au bout"), ("gift", "Cadre bois offert")],
   medias=[photo('image/mamie-remplit-affiche.webp', "Une grand-mère remplit les jeux de son cadre Nostalie au stylo"),
           photo('image/poster-mur-salon.webp', "Le cadre jeu accroché au-dessus d'une cheminée"),
           photo('image/couple-pointe-poster.webp', "Des grands-parents jouent avec leur cadre"),
           photo('image/papy-remplit-affiche.webp', "Un grand-père remplit son affiche"),
           photo('image/changement-affiche.webp', "On change l'affiche par l'arrière du cadre")],
   stats=[("5", "jeux par affiche"), ("1", "vidéo surprise"), ("2 min", "pour changer l'affiche"), ("3-5 j", "de délai de livraison")],
   boite=[("frame", "Affiche A3"), ("gift", "Cadre en bois"), ("qr", "QR vidéo")],
   etapes=[("phone", "Vous choisissez", "5 à 10 photos"), ("spark", "Les jeux se génèrent", "modifiables"), ("box", "Ça arrive chez eux", "par la poste")],
   specs=[("Format", "A3 (29,7 × 42 cm)"), ("Jeux", "5 par affiche"), ("Vidéo", "30 s à 5 min, via QR code"),
          ("Cadre", "Bois clair, envoyé une fois"), ("Rythme", "Mensuel, bimestriel ou unique"), ("Engagement", "Aucun")]),

 'puzzle': dict(
   nom="Puzzle photo", num="Produit 02", badge="", tint=SKY,
   titre="Le puzzle photo",
   sous_titre="Votre photo en 200 pièces, chaque mois.",
   points=[("puzzle", "200 pièces, finition mate"), ("frame", "1 photo ou un montage"), ("cal", "Un nouveau chaque mois")],
   medias=[photo('image/puzzle-mamie-table.webp', "Une grand-mère assemble le puzzle photo de sa petite-fille sur la table"),
           photo('image/puzzle-noel-canape.webp', "Un puzzle photo de Noël assemblé sur la table basse du salon"),
           photo('image/puzzle-papy-foot.webp', "Un grand-père termine le puzzle photo de son petit-fils footballeur"),
           photo('image/enfants-plage-lunettes.webp', "Le genre de photo qui devient un puzzle")],
   stats=[("200", "pièces"), ("48 × 36", "cm une fois monté"), ("1 à 9", "photos par puzzle"), ("3-5 j", "de délai de livraison")],
   boite=[("puzzle", "200 pièces"), ("box", "Boîte perso"), ("heart", "Votre petit mot")],
   etapes=[("phone", "Vous choisissez", "1 à 9 photos"), ("spark", "Le montage se fait", "visages préservés"), ("box", "Le puzzle part", "chaque mois")],
   specs=[("Pièces", "200"), ("Format monté", "48 × 36 cm (ca.)"), ("Photos", "1 à 9 par puzzle"),
          ("Boîte", "Personnalisée, carton rigide"), ("Rythme", "Mensuel ou unique"), ("Engagement", "Aucun")]),

 'cadre-ecran': dict(
   nom="Cadre photo écran", num="Produit 03", badge="Nouveau", tint=SAGE,
   titre="Le cadre photo écran",
   sous_titre="Sur le frigo. Toute la famille l'alimente depuis l'app.",
   points=[("wifi", "Wi-Fi, 0 réglage"), ("heart", "Photos illimitées"), ("home", "Aimanté ou au mur")],
   medias=[photo('image/cadre-ecran-produit.webp', "Le cadre photo écran Nostalie posé sur un meuble, relié au téléphone"),
           photo('image/ecran-grands-parents-salon.webp', "Des grands-parents devant leur cadre photo écran posé sur la table basse"),
           photo('image/ecran-famille-buffet.webp', "Une famille dans son salon, le cadre écran posé sur le buffet"),
           photo('image/ecran-amoureux-soir.webp', "Le cadre écran affiche la photo d'un proche dans un salon le soir")],
   stats=[("10,1\"", "de diagonale"), ("∞", "photos stockées"), ("∞", "contributeurs"), ("0", "réglage à faire")],
   boite=[("screen", "Écran 10,1\""), ("frame", "Cadre bois"), ("plug", "Câble USB-C")],
   etapes=[("wifi", "On le branche", "une seule fois"), ("phone", "La famille envoie", "depuis l'app"), ("screen", "Ça s'affiche", "en quelques secondes")],
   specs=[("Écran", "10,1 pouces, 1280 × 800"), ("Connexion", "Wi-Fi 2,4 / 5 GHz"), ("Fixation", "Aimants + cadre bois fourni"),
          ("Alimentation", "USB-C"), ("Photos", "Illimitées"), ("Contributeurs", "Illimités")]),

 'pack-noel': dict(
   nom="Pack Noël", num="Édition limitée", badge="-35 €", tint=XMAS_TINT,
   titre="Le Pack Noël",
   sous_titre="Les trois objets dans un coffret, livrés avant le 24 décembre.",
   points=[("gift", "3 objets, 1 coffret"), ("heart", "34,80 € d'économie"), ("cal", "Livré avant le 24")],
   medias=[mock(XMAS_STACK, XMAS_TINT),
           photo('image/ecran-grands-parents-salon.webp', "Le cadre photo écran du coffret"),
           mock(frame('image/poster-mur-salon.webp'), ROSE),
           photo('image/puzzle-noel-canape.webp', "Le puzzle photo du coffret")],
   stats=[("3", "objets dans le coffret"), ("-35 €", "sur le prix à l'unité"), ("24/12", "livré avant"), ("Janvier", "démarrage des abonnements")],
   boite=[("screen", "Cadre écran"), ("frame", "Cadre jeu"), ("puzzle", "Puzzle photo")],
   etapes=[("cal", "Réservez", "avant le 10/12"), ("phone", "Préparez vos photos", "à votre rythme"), ("gift", "Le coffret arrive", "avant le 24/12")],
   specs=[("Contenu", "Cadre écran + cadre jeu + puzzle"), ("Prix", "119 € au lieu de 153,80 €"),
          ("Réservation", "Jusqu'au 10 décembre"), ("Livraison", "Avant le 24 décembre"),
          ("Abonnements", "Démarrage en janvier"), ("Engagement", "Aucun")]),
}

# Formats commandables. now = payé à la commande, month = prélevé ensuite chaque mois.
FORMATS = {
 'cadre-jeu': [
   dict(id='abo', label='Chaque mois', prix='19,90 €', per='/mois', barre='', tag='Le plus choisi',
        now=19.90, month=19.90, detail='Cadre en bois offert au premier envoi.'),
   dict(id='unite', label='Une seule fois', prix='29,90 €', per='', barre='', tag='',
        now=29.90, month=0, detail='Cadre en bois compris, sans suite.'),
 ],
 'puzzle': [
   dict(id='abo', label='Chaque mois', prix='24,90 €', per='/mois', barre='', tag='Le plus choisi',
        now=24.90, month=24.90, detail='Un nouveau puzzle tous les mois.'),
   dict(id='unite', label='Une seule fois', prix='34,90 €', per='', barre='', tag='',
        now=34.90, month=0, detail='Un seul puzzle, sans suite.'),
 ],
 'cadre-ecran': [
   dict(id='std', label="L'écran + son abonnement", prix='89 €', per=' puis 9 €/mois', barre='', tag='',
        now=89.00, month=9.00, detail="89 € l'écran, une seule fois, puis 9 € par mois."),
 ],
 'pack-noel': [
   dict(id='pack', label='Le coffret complet', prix='119 €', per='', barre='153,80 €', tag='-35 €',
        now=119.00, month=0, detail="Au lieu de 153,80 €. Abonnements démarrés en janvier."),
 ],
}

ORDRE = ['cadre-jeu', 'puzzle', 'cadre-ecran', 'pack-noel']
FICHES = ['cadre-jeu', 'puzzle', 'cadre-ecran']  # pages produit individuelles

REASSURANCE = [("🇫🇷", "Imprimé en France"), ("📦", "Livraison comprise"),
               ("🔁", "Sans engagement"), ("🎁", "Emballage cadeau offert")]


PERSO = {'puzzle': 'puzzle', 'cadre-ecran': 'ecran'}

PERSO_VIGNETTE = ('<span class="thumb-perso">'
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"'
                  ' stroke-linecap="round" stroke-linejoin="round">'
                  '<path d="M12 16V4"/><path d="M7.5 8.5L12 4l4.5 4.5"/>'
                  '<path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/></svg>'
                  '<b>Ma photo</b></span>')


def page(slug):
    p = PRODUITS[slug]
    autres = [s for s in FICHES if s != slug]

    # Sur le puzzle et l'écran, la première vue de la galerie est l'essai avec
    # sa propre photo : perso.js la remplit une fois la page injectée.
    vues = list(p['medias'])
    vignettes = list(p['medias'])
    if slug in PERSO:
        vues.insert(0, '<div class="perso-galerie" data-perso="%s" data-perso-mode="galerie"></div>' % PERSO[slug])
        vignettes.insert(0, PERSO_VIGNETTE)

    galerie_grande = ''.join(
        '<div class="shot%s%s" data-i="%d">%s</div>'
        % (' on' if i == 0 else '', ' shot-perso' if 'perso-galerie' in m else '', i, m)
        for i, m in enumerate(vues))
    galerie_vignettes = ''.join(
        '<button type="button" class="thumb%s" data-i="%d">%s</button>' % (' on' if i == 0 else '', i, m)
        for i, m in enumerate(vignettes))

    formats = ''.join(
        '<button type="button" class="opt%s" data-fmt="%s">'
        '<span class="opt-check" aria-hidden="true"></span>'
        '<span class="opt-body"><b>%s</b><em>%s</em></span>'
        '<span class="opt-prix">%s<i>%s</i>%s</span>'
        '%s</button>' % (
            ' on' if i == 0 else '', f['id'], f['label'], f['detail'], f['prix'], f['per'],
            ('<s>%s</s>' % f['barre']) if f['barre'] else '',
            ('<span class="opt-tag">%s</span>' % f['tag']) if f['tag'] else '')
        for i, f in enumerate(FORMATS[slug]))

    return f"""
  <nav class="fil"><a href="index.html">Accueil</a> <span>/</span> <a href="index.html#produits">Nos produits</a> <span>/</span> {p['nom']}</nav>

  <div class="pdp">
    <div class="pdp-gallery">
      <div class="shots" style="--tint: {p['tint']}">{galerie_grande}</div>
      <div class="thumbs">{galerie_vignettes}</div>
    </div>

    <div class="pdp-buy">
      {('<span class="pill">' + p['badge'] + '</span>') if p['badge'] else ''}
      <span class="pdp-num">{p['num']}</span>
      <h1>{p['titre']}</h1>
      <p class="pdp-sub">{p['sous_titre']}</p>
      <ul class="pdp-points">{''.join('<li><i>%s</i>%s</li>' % (ic(n), t) for n, t in p['points'])}</ul>

      <div class="pdp-choix">
        <h2>Je choisis ma formule</h2>
        <div class="opts" id="opts">{formats}</div>
      </div>

      <button type="button" class="btn pdp-cta" id="ajouter">Ajouter à ma commande</button>
      <p class="pdp-added" id="ajoute" hidden>Ajouté. <a href="packs.html">Voir ma commande →</a></p>
      <p class="pdp-note">Livraison France comprise · Sans engagement, résiliable à tout moment.</p>

      <div class="reassure">{''.join('<span><i>%s</i>%s</span>' % r for r in REASSURANCE)}</div>
    </div>
  </div>

  <div class="stats">{''.join('<div class="stat"><b>%s</b><span>%s</span></div>' % s for s in p['stats'])}</div>

  <section class="psection">
    <h2>Comment ça marche</h2>
    <ol class="steps">{''.join('<li><i>%s</i><b>%s</b><span>%s</span></li>' % (ic(n), t, sous) for n, t, sous in p['etapes'])}</ol>
  </section>

  <section class="psection">
    <h2>Dans la boîte</h2>
    <div class="inbox">{''.join('<div><i>%s</i><b>%s</b></div>' % (ic(n), t) for n, t in p['boite'])}</div>
  </section>

  <section class="psection">
    <h2>Caractéristiques</h2>
    <dl class="specs">{''.join('<div class="spec"><dt>%s</dt><dd>%s</dd></div>' % s for s in p['specs'])}</dl>
  </section>

  <section class="psection">
    <h2>Vous aimerez aussi</h2>
    <div class="cross">{''.join(
      '<a class="crossitem" href="%s"><div class="crossmedia" style="--tint:%s">%s</div>'
      '<div class="crossbody"><span>%s</span><b>%s</b><em>%s</em><span class="crosscta">Découvrir →</span></div></a>'
      % (('packs.html' if s == 'pack-noel' else 'produit.html?p=' + s),
         PRODUITS[s]['tint'], PRODUITS[s]['medias'][0], PRODUITS[s]['num'], PRODUITS[s]['nom'],
         FORMATS[s][0]['prix'] + FORMATS[s][0]['per'])
      for s in autres + ['pack-noel'])}</div>
  </section>
"""


infos = {s: dict(nom=PRODUITS[s]['nom'], num=PRODUITS[s]['num'], tint=PRODUITS[s]['tint'],
                 accroche=PRODUITS[s]['sous_titre'], formats=FORMATS[s], pack=(s == 'pack-noel'))
         for s in ORDRE}
pages = {s: page(s) for s in FICHES}

open('produit.js', 'w').write(
  "// Fiches produit — généré par tools-produit-build.py, ne pas éditer à la main.\n"
  "const PRODUIT_ORDRE = " + json.dumps(ORDRE, ensure_ascii=False) + ";\n"
  "const PRODUIT_FICHES = " + json.dumps(FICHES, ensure_ascii=False) + ";\n"
  "const PRODUIT_INFO = " + json.dumps(infos, ensure_ascii=False, indent=1) + ";\n"
  "const PRODUIT_PAGES = " + json.dumps(pages, ensure_ascii=False, indent=1) + ";\n")
print('produit.js écrit :', sum(len(v) for v in pages.values()), 'caractères de pages')
