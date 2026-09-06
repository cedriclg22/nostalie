# -*- coding: utf-8 -*-
"""Génère produit.js (PRODUIT_INFO + PRODUIT_PAGES) à partir des données ci-dessous.
   Relancer après chaque modification : python3 tools-produit-build.py"""
import json

WIFI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5a13 13 0 0 1 16 0"/><path d="M7 13a8.5 8.5 0 0 1 10 0"/><circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none"/></svg>'


def puzzle(src, loose=(0, 4)):
    tiles = []
    for r in range(4):
        for c in range(5):
            cls = ' class="loose"' if (r, c) == loose else ''
            tiles.append('<i%s style="background-position:%.2f%% %.2f%%"></i>' % (cls, c * 25, r * 100 / 3))
    return '<div class="puzzle-mock" style="--puz:url(\'%s\')">%s</div>' % (src, ''.join(tiles))


def device(src):
    return ('<div class="device-mock"><div class="wifi">%s</div>'
            '<div class="screen"><img src="%s" alt=""></div><div class="magnet"></div></div>' % (WIFI, src))


def frame(src):
    return '<div class="frame-mock"><img src="%s" alt=""></div>' % src


XMAS_STACK = '<div class="xmas-stack">%s%s%s</div>' % (
    frame('image/poster-mur-salon.jpg'), device('image/bebe-mer.jpg'), puzzle('image/famille-plage-rochers.jpg'))


def photo(src, alt):
    return '<img src="%s" alt="%s">' % (src, alt)


def mock(html, tint):
    return '<div class="shot-mock" style="--tint:%s">%s</div>' % (tint, html)


ROSE, SKY, SAGE = 'var(--rose)', 'var(--sky)', 'var(--sage)'
XMAS_TINT = 'linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))'

PRODUITS = {
 'cadre-jeu': dict(
   nom="Cadre jeu", num="Produit 01", badge="Le plus choisi", tint=ROSE,
   titre="Le cadre jeu",
   sous_titre="Un tableau à accrocher, avec 5 mini-jeux générés à partir de vos photos",
   intro="Vous choisissez vos photos et quelques mots. Les cinq jeux se composent tout seuls, et une vidéo surprise attend au bout.",
   bullets=[
     "<b>Cinq jeux sur une seule affiche</b> : pêle-mêle avec objet caché, mots fléchés, rébus, jeu des différences et mot final.",
     "<b>Générés à partir de vos souvenirs</b>, puis modifiables à la main, mot par mot, avant l'envoi.",
     "<b>Une vidéo surprise</b> qui ne se débloque qu'une fois les cinq jeux résolus. C'est la récompense, et elle fait son effet.",
     "<b>Le cadre en bois n'est envoyé qu'une fois.</b> Ensuite, seule l'affiche arrive : on ouvre par l'arrière, on glisse la nouvelle. Deux minutes.",
   ],
   medias=[photo('image/mamie-remplit-affiche.jpg', "Une grand-mère remplit les jeux de son cadre Nostalie au stylo"),
           photo('image/poster-mur-salon.jpg', "Le cadre jeu accroché au-dessus d'une cheminée"),
           photo('image/couple-pointe-poster.jpg', "Des grands-parents jouent avec leur cadre"),
           photo('image/papy-remplit-affiche.jpg', "Un grand-père remplit son affiche"),
           photo('image/changement-affiche.jpg', "On change l'affiche par l'arrière du cadre")],
   stats=[("5", "jeux par affiche"), ("1", "vidéo surprise"), ("2 min", "pour changer l'affiche"), ("3-5 j", "de délai de livraison")],
   raisons=[("Parce que ça se joue à plusieurs.", "Un cadre photo se regarde. Celui-là, on s'assoit autour."),
            ("Parce que c'est vous dedans.", "Vos photos, vos mots, vos private jokes. Rien de générique."),
            ("Parce que la vidéo fait pleurer.", "On a testé. Prévoyez les mouchoirs.")],
   avant="Un cadre photo classique : on le regarde une fois, on l'oublie, il prend la poussière.",
   apres="Un cadre jeu : on cherche, on rit, on triche un peu, et on finit devant une vidéo.",
   boite=[("L'affiche", "Format A3, papier épais, imprimée avec vos photos."),
          ("Le cadre en bois", "Envoyé une seule fois, il s'ouvre par l'arrière."),
          ("Le QR code", "Il déverrouille la vidéo surprise une fois les jeux résolus.")],
   etapes=[("Vous choisissez", "5 à 10 photos et quelques mots qui comptent."),
           ("Les jeux se génèrent", "Grille, définitions, rébus, objet caché. Vous corrigez ce que vous voulez."),
           ("Ça arrive chez eux", "L'affiche part par la poste, prête à jouer.")],
   specs=[("Format", "A3 (29,7 × 42 cm)"), ("Jeux", "5 par affiche"), ("Vidéo", "30 s à 5 min, via QR code"),
          ("Cadre", "Bois clair, envoyé une fois"), ("Rythme", "Mensuel, bimestriel ou unique"), ("Engagement", "Aucun")],
   faq=[("Faut-il un compte pour jouer ?", "Non. On joue au stylo sur l'affiche, le QR code suffit pour la vidéo."),
        ("Peut-on modifier les jeux générés ?", "Oui, tout est éditable avant l'envoi."),
        ("Et si mes photos sont sur mon téléphone ?", "C'est le cas le plus courant : on les envoie directement depuis le mobile.")]),

 'puzzle': dict(
   nom="Puzzle photo", num="Produit 02", badge="", tint=SKY,
   titre="Le puzzle photo",
   sous_titre="Une photo, ou un montage, imprimée sur un puzzle et envoyée chaque mois",
   intro="On l'assemble à plusieurs, on raconte, et l'image se dévoile en même temps que le souvenir.",
   bullets=[
     "<b>200 pièces</b>, carton épais, finition mate : ça tient dans la main et ça ne brille pas sous la lampe.",
     "<b>Une photo plein cadre, ou un montage de 2 à 9</b> — le recadrage est calculé pour qu'aucun visage ne tombe sur une découpe.",
     "<b>Une boîte personnalisée</b> au titre de votre souvenir. C'est déjà un cadeau avant même d'être ouvert.",
     "<b>Un nouveau puzzle chaque mois</b>, préparé à l'avance depuis l'app. Vous n'y pensez plus.",
   ],
   medias=[mock(puzzle('image/enfants-plage-lunettes.jpg', (3, 0)), SKY),
           mock(puzzle('image/famille-plage-rochers.jpg'), ROSE),
           mock(puzzle('image/enfants-calin.jpg', (1, 2)), SAGE),
           mock(puzzle('image/bebe-mer.jpg', (2, 3)), 'var(--lilac)')],
   stats=[("200", "pièces"), ("38 × 26", "cm une fois monté"), ("1 à 9", "photos par puzzle"), ("3-5 j", "de délai de livraison")],
   raisons=[("Parce qu'on le fait ensemble.", "Deux heures autour d'une table, sans écran. C'est rare."),
            ("Parce que la surprise dure.", "On ne sait quelle photo c'est qu'au bout de vingt minutes."),
            ("Parce qu'on le refait.", "Il se démonte, se range, et ressort au Noël suivant.")],
   avant="Une photo de plus dans la pellicule, vue trois secondes puis engloutie par les suivantes.",
   apres="Deux heures autour d'une table à reconstituer le même souvenir, pièce par pièce.",
   boite=[("Le puzzle", "200 pièces, carton épais, finition mate."),
          ("La boîte", "Personnalisée au titre de votre souvenir."),
          ("La carte", "Un mot de votre part, glissé dans la boîte.")],
   etapes=[("Vous choisissez la photo", "Une seule, ou un montage de 2 à 9."),
           ("Le montage se génère", "Recadrage et découpe calculés pour que chaque visage reste lisible."),
           ("Le puzzle part", "Chaque mois, sans y penser.")],
   specs=[("Pièces", "200"), ("Format monté", "38 × 26 cm"), ("Photos", "1 à 9 par puzzle"),
          ("Boîte", "Personnalisée, carton rigide"), ("Rythme", "Mensuel ou unique"), ("Engagement", "Aucun")],
   faq=[("Peut-on choisir le nombre de pièces ?", "200 pièces pour l'instant. D'autres formats arrivent."),
        ("Et si la photo est floue ?", "On vous prévient avant l'impression si la définition est trop faible."),
        ("Peut-on offrir un seul puzzle ?", "Oui, à l'unité, sans abonnement derrière.")]),

 'cadre-ecran': dict(
   nom="Cadre photo écran", num="Produit 03", badge="Nouveau", tint=SAGE,
   titre="Le cadre photo écran",
   sous_titre="Un écran connecté sur le frigo ou au mur, que toute la famille alimente depuis l'app",
   intro="Branché une fois au Wi-Fi, il affiche en quelques secondes chaque photo envoyée. Rien à faire de l'autre côté.",
   bullets=[
     "<b>Aimanté pour le frigo</b>, ou glissé dans son cadre en bois pour le mur. Les deux sont fournis.",
     "<b>Aucun réglage pour celui qui le reçoit.</b> Il ne touche à rien, jamais. Les photos arrivent, c'est tout.",
     "<b>Toute la famille contribue</b> : chacun pousse ses photos depuis l'app, autant qu'il veut.",
     "<b>Les petits-enfants envoient le mercredi</b>, ça s'affiche chez mamie le soir même.",
   ],
   medias=[mock(device('image/enfants-babyfoot.jpg'), SAGE),
           mock(device('image/bebe-mer.jpg'), SKY),
           mock(device('image/famille-plage-rochers.jpg'), ROSE),
           mock(device('image/enfants-calin.jpg'), 'var(--lilac)')],
   stats=[("10,1\"", "de diagonale"), ("∞", "photos stockées"), ("∞", "contributeurs"), ("0", "réglage à faire")],
   raisons=[("Parce qu'ils ne savent pas installer une app.", "Et qu'ils n'auront jamais à le faire."),
            ("Parce que le frigo, c'est là qu'on passe.", "Dix fois par jour, sans y penser."),
            ("Parce que tout le monde peut envoyer.", "Frères, sœurs, cousins : chacun sa photo du week-end.")],
   avant="Des photos envoyées dans un groupe WhatsApp que personne n'ouvre jamais chez les grands-parents.",
   apres="Un écran sur le frigo qui se remplit tout seul, vu dix fois par jour.",
   boite=[("L'écran", "Fin, aimanté, prêt à poser sur le frigo."),
          ("Le cadre bois", "Fourni aussi, si vous préférez l'accrocher au mur."),
          ("Le câble", "Alimentation USB-C, 2 m.")],
   etapes=[("On le branche", "Une fois, avec le Wi-Fi de la maison."),
           ("La famille envoie", "Chacun pousse ses photos depuis l'app."),
           ("Ça s'affiche", "En quelques secondes, sans rien à faire de l'autre côté.")],
   specs=[("Écran", "10,1 pouces, 1280 × 800"), ("Connexion", "Wi-Fi 2,4 / 5 GHz"), ("Fixation", "Aimants + cadre bois fourni"),
          ("Alimentation", "USB-C"), ("Photos", "Illimitées"), ("Contributeurs", "Illimités")],
   faq=[("Faut-il savoir se servir d'un téléphone pour le recevoir ?", "Non. Celui qui reçoit n'a rien à faire."),
        ("À quoi sert l'abonnement ?", "À l'hébergement des photos, aux envois illimités et aux mises à jour de l'écran."),
        ("Que se passe-t-il si j'arrête l'abonnement ?", "Vous gardez l'écran et les photos déjà envoyées.")]),

 'pack-noel': dict(
   nom="Pack Noël", num="Édition limitée", badge="-35 €", tint=XMAS_TINT,
   titre="Le Pack Noël",
   sous_titre="Les trois objets réunis dans un coffret, livrés avant le 24 décembre",
   intro="Le cadre écran, le cadre jeu et un puzzle photo, emballés ensemble et prêts à poser sous le sapin.",
   bullets=[
     "<b>Les trois produits d'un coup</b> : l'écran connecté et son cadre bois, le cadre jeu avec sa première affiche, un puzzle 200 pièces.",
     "<b>119 € au lieu de 153,80 €</b> — 34,80 € d'économie sur le prix à l'unité.",
     "<b>Livré avant le 24 décembre</b> si vous réservez avant le 10. Emballé pour être posé tel quel sous le sapin.",
     "<b>Les abonnements ne démarrent qu'en janvier</b>, et restent résiliables à tout moment.",
   ],
   medias=[mock(XMAS_STACK, XMAS_TINT),
           mock(device('image/bebe-mer.jpg'), SAGE),
           mock(frame('image/poster-mur-salon.jpg'), ROSE),
           mock(puzzle('image/famille-plage-rochers.jpg'), SKY)],
   stats=[("3", "objets dans le coffret"), ("-35 €", "sur le prix à l'unité"), ("24/12", "livré avant"), ("Janvier", "démarrage des abonnements")],
   raisons=[("Parce qu'un seul cadeau suffit.", "Trois objets, un seul paquet, une seule commande."),
            ("Parce que c'est moins cher.", "34,80 € de moins qu'à l'unité."),
            ("Parce que décembre passe vite.", "Réservé avant le 10, il est là avant le 24.")],
   avant="Trois cadeaux à trouver, trois commandes à suivre, et le doute jusqu'au 23 décembre.",
   apres="Un coffret réservé début décembre, livré avant le 24, emballé et prêt.",
   boite=[("Le cadre écran", "89 € — l'écran connecté et son cadre bois."),
          ("Le cadre jeu", "29,90 € — monté avec sa première affiche et sa vidéo surprise."),
          ("Un puzzle photo", "34,90 € — 200 pièces, dans sa boîte personnalisée.")],
   etapes=[("Vous réservez avant le 10 décembre", "Le temps d'imprimer et d'expédier sereinement."),
           ("Vous préparez vos photos", "Depuis le site, à votre rythme."),
           ("Le coffret arrive", "Emballé pour être posé tel quel sous le sapin.")],
   specs=[("Contenu", "Cadre écran + cadre jeu + puzzle"), ("Prix", "119 € au lieu de 153,80 €"),
          ("Réservation", "Jusqu'au 10 décembre"), ("Livraison", "Avant le 24 décembre"),
          ("Abonnements", "Démarrage en janvier"), ("Engagement", "Aucun")],
   faq=[("Puis-je l'offrir à quelqu'un d'autre ?", "Oui, on l'expédie directement à l'adresse de votre choix."),
        ("Suis-je obligé de prendre les abonnements ?", "Non. Sans abonnement, vous gardez l'écran et les objets reçus."),
        ("Et si je réserve après le 10 décembre ?", "On expédie quand même, mais sans garantir l'arrivée avant Noël.")]),
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


def page(slug):
    p = PRODUITS[slug]
    autres = [s for s in FICHES if s != slug]

    galerie_grande = ''.join(
        '<div class="shot%s" data-i="%d">%s</div>' % (' on' if i == 0 else '', i, m)
        for i, m in enumerate(p['medias']))
    galerie_vignettes = ''.join(
        '<button type="button" class="thumb%s" data-i="%d">%s</button>' % (' on' if i == 0 else '', i, m)
        for i, m in enumerate(p['medias']))

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
      <p class="pdp-intro">{p['intro']}</p>
      <ul class="pdp-bullets">{''.join('<li>%s</li>' % b for b in p['bullets'])}</ul>

      <div class="pdp-choix">
        <h2>Je choisis ma formule</h2>
        <div class="opts" id="opts">{formats}</div>
      </div>

      <button type="button" class="btn pdp-cta" id="ajouter">Ajouter à ma commande</button>
      <p class="pdp-added" id="ajoute" hidden>Ajouté. <a href="commander.html">Voir ma commande →</a></p>
      <p class="pdp-note">Livraison France comprise · Sans engagement, résiliable à tout moment.</p>

      <div class="reassure">{''.join('<span><i>%s</i>%s</span>' % r for r in REASSURANCE)}</div>
    </div>
  </div>

  <div class="stats">{''.join('<div class="stat"><b>%s</b><span>%s</span></div>' % s for s in p['stats'])}</div>

  <section class="psection">
    <h2>Trois bonnes raisons</h2>
    <div class="howto">{''.join('<div class="how-step"><h4>%s</h4><p>%s</p></div>' % r for r in p['raisons'])}</div>
  </section>

  <section class="psection">
    <h2>Avant, après</h2>
    <div class="avant-apres">
      <div class="col avant"><span class="col-tag">Sans</span><p>{p['avant']}</p></div>
      <div class="col apres"><span class="col-tag">Avec Nostalie</span><p>{p['apres']}</p></div>
    </div>
  </section>

  <section class="psection">
    <h2>Dans la boîte</h2>
    <div class="howto">{''.join('<div class="how-step nonum"><h4>%s</h4><p>%s</p></div>' % b for b in p['boite'])}</div>
  </section>

  <section class="psection">
    <h2>Comment ça marche</h2>
    <div class="howto">{''.join('<div class="how-step"><h4>%s</h4><p>%s</p></div>' % e for e in p['etapes'])}</div>
  </section>

  <section class="psection">
    <h2>Caractéristiques</h2>
    <dl class="specs">{''.join('<div class="spec"><dt>%s</dt><dd>%s</dd></div>' % s for s in p['specs'])}</dl>
  </section>

  <section class="psection">
    <h2>Questions</h2>
    <div class="faq">{''.join('<details><summary>%s</summary><p>%s</p></details>' % f for f in p['faq'])}</div>
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
