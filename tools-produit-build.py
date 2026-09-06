# -*- coding: utf-8 -*-
WIFI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5a13 13 0 0 1 16 0"/><path d="M7 13a8.5 8.5 0 0 1 10 0"/><circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none"/></svg>'
SPARK = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"/></svg>'

def puzzle(src, loose=(0,4), extra=''):
    tiles=[]
    for r in range(4):
        for c in range(5):
            cls=' class="loose"' if (r,c)==loose else ''
            tiles.append('<i%s style="background-position:%.2f%% %.2f%%"></i>'%(cls, c*25, r*100/3))
    return '<div class="puzzle-mock" style="--puz:url(\'%s\')%s">%s</div>'%(src, extra, ''.join(tiles))

def device(src, extra=''):
    return ('<div class="device-mock"%s><div class="wifi">%s</div>'
            '<div class="screen"><img src="%s" alt=""></div><div class="magnet"></div></div>'
            % ((' style="%s"'%extra) if extra else '', WIFI, src))

def frame(src, extra=''):
    return '<div class="frame-mock"%s><img src="%s" alt=""></div>'%((' style="%s"'%extra) if extra else '', src)

PRODUITS = {
 'cadre-jeu': dict(
   nom="Cadre jeu", num="Produit 01", tint="var(--rose)",
   titre="Le cadre jeu",
   accroche="Un tableau à accrocher, avec 5 mini-jeux générés à partir de vos photos.",
   media='<img class="full portrait" src="image/mamie-remplit-affiche.jpg" alt="Une grand-mère remplit les jeux de son cadre Nostalie">',
   prix="19,90 €", periode="par mois", alt="Cadre en bois offert au premier envoi · ou 29,90 € en création unique.",
   cta=("Créer mon cadre", "create.html"),
   chips=["Pêle-mêle","Mots fléchés","Rébus","Différences","Vidéo surprise"],
   boite=[("L'affiche","Format A3, papier épais, imprimée avec vos photos."),
          ("Le cadre en bois","Envoyé une seule fois, ouvert par l'arrière pour changer l'affiche."),
          ("Le QR code","Il déverrouille la vidéo surprise une fois les jeux résolus.")],
   etapes=[("Vous choisissez","5 à 10 photos et quelques mots qui comptent."),
           ("Les jeux se génèrent","Grille, définitions, rébus, objet caché. Vous corrigez ce que vous voulez."),
           ("Ça arrive chez eux","L'affiche part par la poste, prête à jouer.")],
   specs=[("Format","A3 (29,7 × 42 cm)"),("Jeux","5 par affiche"),("Vidéo","30 s à 5 min, via QR code"),
          ("Cadre","Bois clair, envoyé une fois"),("Rythme","Mensuel, bimestriel ou unique"),("Engagement","Aucun")],
   faq=[("Faut-il un compte pour jouer ?","Non. On joue au stylo sur l'affiche, le QR code suffit pour la vidéo."),
        ("Peut-on modifier les jeux générés ?","Oui, tout est éditable avant l'envoi.")]),

 'puzzle': dict(
   nom="Puzzle photo", num="Produit 02", tint="var(--sky)",
   titre="Le puzzle photo",
   accroche="Une photo, ou un montage, imprimée sur un puzzle et envoyée chaque mois.",
   media=puzzle('image/enfants-plage-lunettes.jpg', loose=(3,0), extra='; max-width:340px'),
   prix="24,90 €", periode="par mois", alt="Livraison comprise · ou 34,90 € à l'unité.",
   cta=("Composer mon puzzle", "create.html"),
   chips=["200 pièces","1 photo ou un montage","Boîte personnalisée","Livré chaque mois"],
   boite=[("Le puzzle","200 pièces, carton épais, finition mate."),
          ("La boîte","Personnalisée au titre de votre souvenir."),
          ("La carte","Un mot de votre part, glissé dans la boîte.")],
   etapes=[("Vous choisissez la photo","Une seule, ou un montage de 2 à 9."),
           ("Le montage se génère","Recadrage et découpe calculés pour que chaque visage reste lisible."),
           ("Le puzzle part","Chaque mois, sans y penser.")],
   specs=[("Pièces","200"),("Format monté","38 × 26 cm"),("Photos","1 à 9 par puzzle"),
          ("Boîte","Personnalisée, carton rigide"),("Rythme","Mensuel ou unique"),("Engagement","Aucun")],
   faq=[("Peut-on choisir le nombre de pièces ?","200 pièces pour l'instant. D'autres formats arrivent."),
        ("Et si la photo est floue ?","On vous prévient avant l'impression si la définition est trop faible.")]),

 'cadre-ecran': dict(
   nom="Cadre photo écran", num="Produit 03", tint="var(--sage)",
   titre="Le cadre photo écran",
   accroche="Un écran connecté sur le frigo ou au mur. La famille y envoie ses photos depuis l'app.",
   media=device('image/enfants-babyfoot.jpg', 'max-width:340px'),
   prix="9 €", periode="par mois", alt="+ 89 € l'écran, une seule fois. App iOS et Android incluse.",
   cta=("Voir l'app mobile", "index.html#app"),
   chips=["Wi-Fi","Aimanté ou encadré","Photos illimitées","9 €/mois"],
   boite=[("L'écran","Fin, aimanté, prêt à poser sur le frigo."),
          ("Le cadre bois","Fourni aussi, si vous préférez l'accrocher au mur."),
          ("Le câble","Alimentation USB-C, 2 m.")],
   etapes=[("On le branche","Une fois, avec le Wi-Fi de la maison."),
           ("La famille envoie","Chacun pousse ses photos depuis l'app."),
           ("Ça s'affiche","En quelques secondes, sans rien à faire de l'autre côté.")],
   specs=[("Écran","10,1 pouces, 1280 × 800"),("Connexion","Wi-Fi 2,4 / 5 GHz"),("Fixation","Aimants + cadre bois fourni"),
          ("Alimentation","USB-C"),("Photos","Illimitées"),("Contributeurs","Illimités")],
   faq=[("Faut-il savoir se servir d'un téléphone pour le recevoir ?","Non. Celui qui reçoit n'a rien à faire."),
        ("À quoi sert l'abonnement ?","À l'hébergement des photos, aux envois illimités et aux mises à jour de l'écran.")]),

 'pack-noel': dict(
   nom="Pack Noël", num="Édition limitée", tint="linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))",
   titre="Le Pack Noël",
   accroche="Les trois objets réunis dans un coffret, livrés avant le 24 décembre.",
   media='XMAS_STACK',
   prix="119 €", periode="le coffret", alt="Au lieu de 153,80 €. Les abonnements ne démarrent qu'en janvier, résiliables à tout moment.",
   cta=("Préparer mes photos", "create.html"),
   chips=["Coffret cadeau","Livré avant le 24/12","3 objets","-35 €"],
   boite=[("Le cadre écran","89 € — l'écran connecté et son cadre bois."),
          ("Le cadre jeu","29,90 € — monté avec sa première affiche et sa vidéo surprise."),
          ("Un puzzle photo","34,90 € — 200 pièces, dans sa boîte personnalisée.")],
   etapes=[("Vous réservez avant le 10 décembre","Le temps d'imprimer et d'expédier sereinement."),
           ("Vous préparez vos photos","Depuis le site, à votre rythme."),
           ("Le coffret arrive","Emballé pour être posé tel quel sous le sapin.")],
   specs=[("Contenu","Cadre écran + cadre jeu + puzzle"),("Prix","119 € au lieu de 153,80 €"),
          ("Réservation","Jusqu'au 10 décembre"),("Livraison","Avant le 24 décembre"),
          ("Abonnements","Démarrage en janvier"),("Engagement","Aucun")],
   faq=[("Puis-je l'offrir à quelqu'un d'autre ?","Oui, on l'expédie directement à l'adresse de votre choix."),
        ("Suis-je obligé de prendre les abonnements ?","Non. Sans abonnement, vous gardez l'écran et les objets reçus.")]),
}

XMAS_STACK = ('<div class="xmas-stack">%s%s%s</div>'
              % (frame('image/poster-mur-salon.jpg'), device('image/bebe-mer.jpg'),
                 puzzle('image/famille-plage-rochers.jpg')))

ORDRE = ['cadre-jeu','puzzle','cadre-ecran','pack-noel']

def bloc(slug):
    p = dict(PRODUITS[slug])
    media = XMAS_STACK if p['media'] == 'XMAS_STACK' else p['media']
    autres = [s for s in ORDRE if s != slug]
    cta_txt, cta_href = p['cta']
    return f"""
      <a class="crumb" href="index.html">← Tous les produits</a>

      <div class="phero">
        <div class="phero-media" style="--tint: {p['tint']}">{media}</div>
        <div>
          <span class="kicker">{p['num']}</span>
          <h1>{p['titre']}</h1>
          <p class="lead">{p['accroche']}</p>
          <div class="pprice"><span class="amount">{p['prix']}</span><span class="per">{p['periode']}</span></div>
          <p class="palt">{p['alt']}</p>
          <div class="chips">{''.join('<span class="chip">%s</span>' % c for c in p['chips'])}</div>
          <a class="btn" href="{cta_href}">{SPARK} {cta_txt}</a>
        </div>
      </div>

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
        <h2>Les autres produits</h2>
        <div class="otherprods">{''.join('<a class="otherprod" href="produit.html?p=%s"><span>%s</span><b>%s</b></a>' % (s, PRODUITS[s]['num'], PRODUITS[s]['nom']) for s in autres)}</div>
      </section>
"""

import json
data = {s: bloc(s) for s in ORDRE}
titres = {s: PRODUITS[s]['nom'] for s in ORDRE}
open('produit.js','w').write(
  "// Contenu des pages produit — généré, une page pour les quatre offres.\n"
  "const PRODUIT_BLOCS = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
  "const PRODUIT_NOMS = " + json.dumps(titres, ensure_ascii=False) + ";\n\n"
  "(function () {\n"
  "  const slug = new URLSearchParams(location.search).get('p');\n"
  "  const key = PRODUIT_BLOCS[slug] ? slug : 'cadre-jeu';\n"
  "  document.getElementById('produitContent').innerHTML = PRODUIT_BLOCS[key];\n"
  "  document.title = PRODUIT_NOMS[key] + ' — Nostalie';\n"
  "})();\n")
print('produit.js écrit')

# --- bandeau Noël pour la home ---
open('/tmp/xmas_home.html','w').write(f"""
  <!-- PACK NOEL -->
  <section class="section" id="noel">
    <div class="section-inner">
      <div class="xmas-card">
        <div>
          <span class="kicker">Édition limitée</span>
          <h2>Le Pack Noël</h2>
          <p>Les trois objets dans un coffret, livrés avant le 24 décembre.</p>
          <ul class="prod-list">
            <li>Le cadre écran et son cadre bois</li>
            <li>Le cadre jeu monté avec sa première affiche</li>
            <li>Un puzzle photo 200 pièces</li>
          </ul>
          <div class="xmas-price"><span class="amount">119 €</span><s>153,80 €</s></div>
          <a class="btn" href="produit.html?p=pack-noel">{SPARK} Voir le Pack Noël</a>
          <p class="xmas-note">Réservation jusqu'au 10 décembre · abonnements démarrés en janvier.</p>
        </div>
        {XMAS_STACK}
      </div>
    </div>
  </section>
""")
print('bandeau Noël écrit')
