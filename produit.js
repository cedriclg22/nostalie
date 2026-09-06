// Fiches produit et offres — généré par tools-produit-build.py, ne pas éditer à la main.
const PRODUIT_ORDRE = ["cadre-jeu", "puzzle", "cadre-ecran", "pack-noel"];
const PRODUIT_INFO = {
 "cadre-jeu": {
  "nom": "Cadre jeu",
  "num": "Produit 01",
  "tint": "var(--rose)",
  "accroche": "Un tableau à accrocher, avec 5 mini-jeux générés à partir de vos photos.",
  "formats": [
   {
    "id": "abo",
    "label": "Chaque mois",
    "prix": "19,90 €",
    "per": "/mois",
    "now": 19.9,
    "month": 19.9,
    "detail": "Cadre en bois offert au premier envoi."
   },
   {
    "id": "unite",
    "label": "Une seule fois",
    "prix": "29,90 €",
    "per": "",
    "now": 29.9,
    "month": 0,
    "detail": "Cadre en bois compris, sans suite."
   }
  ],
  "pack": false
 },
 "puzzle": {
  "nom": "Puzzle photo",
  "num": "Produit 02",
  "tint": "var(--sky)",
  "accroche": "Une photo, ou un montage, imprimée sur un puzzle et envoyée chaque mois.",
  "formats": [
   {
    "id": "abo",
    "label": "Chaque mois",
    "prix": "24,90 €",
    "per": "/mois",
    "now": 24.9,
    "month": 24.9,
    "detail": "Un nouveau puzzle tous les mois."
   },
   {
    "id": "unite",
    "label": "Une seule fois",
    "prix": "34,90 €",
    "per": "",
    "now": 34.9,
    "month": 0,
    "detail": "Un seul puzzle, sans suite."
   }
  ],
  "pack": false
 },
 "cadre-ecran": {
  "nom": "Cadre photo écran",
  "num": "Produit 03",
  "tint": "var(--sage)",
  "accroche": "Un écran connecté sur le frigo ou au mur. La famille y envoie ses photos depuis l'app.",
  "formats": [
   {
    "id": "std",
    "label": "L'écran + son abonnement",
    "prix": "89 €",
    "per": " puis 9 €/mois",
    "now": 89.0,
    "month": 9.0,
    "detail": "89 € l'écran, une seule fois, puis 9 € par mois."
   }
  ],
  "pack": false
 },
 "pack-noel": {
  "nom": "Pack Noël",
  "num": "Édition limitée",
  "tint": "linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))",
  "accroche": "Les trois objets réunis dans un coffret, livrés avant le 24 décembre.",
  "formats": [
   {
    "id": "pack",
    "label": "Le coffret complet",
    "prix": "119 €",
    "per": "",
    "now": 119.0,
    "month": 0,
    "detail": "Au lieu de 153,80 €. Les abonnements ne démarrent qu'en janvier."
   }
  ],
  "pack": true
 }
};
const PRODUIT_DETAILS = {
 "cadre-jeu": "\n      <section class=\"pdetail\" id=\"fiche-cadre-jeu\">\n        <div class=\"phero\">\n          <div class=\"phero-media\" style=\"--tint: var(--rose)\"><img class=\"full portrait\" src=\"image/mamie-remplit-affiche.jpg\" alt=\"Une grand-mère remplit les jeux de son cadre Nostalie\"></div>\n          <div>\n            <span class=\"kicker\">Produit 01</span>\n            <h2>Le cadre jeu</h2>\n            <p class=\"lead\">Un tableau à accrocher, avec 5 mini-jeux générés à partir de vos photos.</p>\n            <div class=\"chips\"><span class=\"chip\">Pêle-mêle</span><span class=\"chip\">Mots fléchés</span><span class=\"chip\">Rébus</span><span class=\"chip\">Différences</span><span class=\"chip\">Vidéo surprise</span></div>\n          </div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Dans la boîte</h3>\n          <div class=\"howto\"><div class=\"how-step nonum\"><h4>L'affiche</h4><p>Format A3, papier épais, imprimée avec vos photos.</p></div><div class=\"how-step nonum\"><h4>Le cadre en bois</h4><p>Envoyé une seule fois, ouvert par l'arrière pour changer l'affiche.</p></div><div class=\"how-step nonum\"><h4>Le QR code</h4><p>Il déverrouille la vidéo surprise une fois les jeux résolus.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Comment ça marche</h3>\n          <div class=\"howto\"><div class=\"how-step\"><h4>Vous choisissez</h4><p>5 à 10 photos et quelques mots qui comptent.</p></div><div class=\"how-step\"><h4>Les jeux se génèrent</h4><p>Grille, définitions, rébus, objet caché. Vous corrigez ce que vous voulez.</p></div><div class=\"how-step\"><h4>Ça arrive chez eux</h4><p>L'affiche part par la poste, prête à jouer.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Caractéristiques</h3>\n          <dl class=\"specs\"><div class=\"spec\"><dt>Format</dt><dd>A3 (29,7 × 42 cm)</dd></div><div class=\"spec\"><dt>Jeux</dt><dd>5 par affiche</dd></div><div class=\"spec\"><dt>Vidéo</dt><dd>30 s à 5 min, via QR code</dd></div><div class=\"spec\"><dt>Cadre</dt><dd>Bois clair, envoyé une fois</dd></div><div class=\"spec\"><dt>Rythme</dt><dd>Mensuel, bimestriel ou unique</dd></div><div class=\"spec\"><dt>Engagement</dt><dd>Aucun</dd></div></dl>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Questions</h3>\n          <div class=\"faq\"><details><summary>Faut-il un compte pour jouer ?</summary><p>Non. On joue au stylo sur l'affiche, le QR code suffit pour la vidéo.</p></details><details><summary>Peut-on modifier les jeux générés ?</summary><p>Oui, tout est éditable avant l'envoi.</p></details></div>\n        </div>\n      </section>\n",
 "puzzle": "\n      <section class=\"pdetail\" id=\"fiche-puzzle\">\n        <div class=\"phero\">\n          <div class=\"phero-media\" style=\"--tint: var(--sky)\"><div class=\"puzzle-mock\" style=\"--puz:url('image/enfants-plage-lunettes.jpg'); max-width:340px\"><i style=\"background-position:0.00% 0.00%\"></i><i style=\"background-position:25.00% 0.00%\"></i><i style=\"background-position:50.00% 0.00%\"></i><i style=\"background-position:75.00% 0.00%\"></i><i style=\"background-position:100.00% 0.00%\"></i><i style=\"background-position:0.00% 33.33%\"></i><i style=\"background-position:25.00% 33.33%\"></i><i style=\"background-position:50.00% 33.33%\"></i><i style=\"background-position:75.00% 33.33%\"></i><i style=\"background-position:100.00% 33.33%\"></i><i style=\"background-position:0.00% 66.67%\"></i><i style=\"background-position:25.00% 66.67%\"></i><i style=\"background-position:50.00% 66.67%\"></i><i style=\"background-position:75.00% 66.67%\"></i><i style=\"background-position:100.00% 66.67%\"></i><i class=\"loose\" style=\"background-position:0.00% 100.00%\"></i><i style=\"background-position:25.00% 100.00%\"></i><i style=\"background-position:50.00% 100.00%\"></i><i style=\"background-position:75.00% 100.00%\"></i><i style=\"background-position:100.00% 100.00%\"></i></div></div>\n          <div>\n            <span class=\"kicker\">Produit 02</span>\n            <h2>Le puzzle photo</h2>\n            <p class=\"lead\">Une photo, ou un montage, imprimée sur un puzzle et envoyée chaque mois.</p>\n            <div class=\"chips\"><span class=\"chip\">200 pièces</span><span class=\"chip\">1 photo ou un montage</span><span class=\"chip\">Boîte personnalisée</span><span class=\"chip\">Livré chaque mois</span></div>\n          </div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Dans la boîte</h3>\n          <div class=\"howto\"><div class=\"how-step nonum\"><h4>Le puzzle</h4><p>200 pièces, carton épais, finition mate.</p></div><div class=\"how-step nonum\"><h4>La boîte</h4><p>Personnalisée au titre de votre souvenir.</p></div><div class=\"how-step nonum\"><h4>La carte</h4><p>Un mot de votre part, glissé dans la boîte.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Comment ça marche</h3>\n          <div class=\"howto\"><div class=\"how-step\"><h4>Vous choisissez la photo</h4><p>Une seule, ou un montage de 2 à 9.</p></div><div class=\"how-step\"><h4>Le montage se génère</h4><p>Recadrage et découpe calculés pour que chaque visage reste lisible.</p></div><div class=\"how-step\"><h4>Le puzzle part</h4><p>Chaque mois, sans y penser.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Caractéristiques</h3>\n          <dl class=\"specs\"><div class=\"spec\"><dt>Pièces</dt><dd>200</dd></div><div class=\"spec\"><dt>Format monté</dt><dd>38 × 26 cm</dd></div><div class=\"spec\"><dt>Photos</dt><dd>1 à 9 par puzzle</dd></div><div class=\"spec\"><dt>Boîte</dt><dd>Personnalisée, carton rigide</dd></div><div class=\"spec\"><dt>Rythme</dt><dd>Mensuel ou unique</dd></div><div class=\"spec\"><dt>Engagement</dt><dd>Aucun</dd></div></dl>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Questions</h3>\n          <div class=\"faq\"><details><summary>Peut-on choisir le nombre de pièces ?</summary><p>200 pièces pour l'instant. D'autres formats arrivent.</p></details><details><summary>Et si la photo est floue ?</summary><p>On vous prévient avant l'impression si la définition est trop faible.</p></details></div>\n        </div>\n      </section>\n",
 "cadre-ecran": "\n      <section class=\"pdetail\" id=\"fiche-cadre-ecran\">\n        <div class=\"phero\">\n          <div class=\"phero-media\" style=\"--tint: var(--sage)\"><div class=\"device-mock\" style=\"max-width:340px\"><div class=\"wifi\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9.5a13 13 0 0 1 16 0\"/><path d=\"M7 13a8.5 8.5 0 0 1 10 0\"/><circle cx=\"12\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/></svg></div><div class=\"screen\"><img src=\"image/enfants-babyfoot.jpg\" alt=\"\"></div><div class=\"magnet\"></div></div></div>\n          <div>\n            <span class=\"kicker\">Produit 03</span>\n            <h2>Le cadre photo écran</h2>\n            <p class=\"lead\">Un écran connecté sur le frigo ou au mur. La famille y envoie ses photos depuis l'app.</p>\n            <div class=\"chips\"><span class=\"chip\">Wi-Fi</span><span class=\"chip\">Aimanté ou encadré</span><span class=\"chip\">Photos illimitées</span><span class=\"chip\">9 €/mois</span></div>\n          </div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Dans la boîte</h3>\n          <div class=\"howto\"><div class=\"how-step nonum\"><h4>L'écran</h4><p>Fin, aimanté, prêt à poser sur le frigo.</p></div><div class=\"how-step nonum\"><h4>Le cadre bois</h4><p>Fourni aussi, si vous préférez l'accrocher au mur.</p></div><div class=\"how-step nonum\"><h4>Le câble</h4><p>Alimentation USB-C, 2 m.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Comment ça marche</h3>\n          <div class=\"howto\"><div class=\"how-step\"><h4>On le branche</h4><p>Une fois, avec le Wi-Fi de la maison.</p></div><div class=\"how-step\"><h4>La famille envoie</h4><p>Chacun pousse ses photos depuis l'app.</p></div><div class=\"how-step\"><h4>Ça s'affiche</h4><p>En quelques secondes, sans rien à faire de l'autre côté.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Caractéristiques</h3>\n          <dl class=\"specs\"><div class=\"spec\"><dt>Écran</dt><dd>10,1 pouces, 1280 × 800</dd></div><div class=\"spec\"><dt>Connexion</dt><dd>Wi-Fi 2,4 / 5 GHz</dd></div><div class=\"spec\"><dt>Fixation</dt><dd>Aimants + cadre bois fourni</dd></div><div class=\"spec\"><dt>Alimentation</dt><dd>USB-C</dd></div><div class=\"spec\"><dt>Photos</dt><dd>Illimitées</dd></div><div class=\"spec\"><dt>Contributeurs</dt><dd>Illimités</dd></div></dl>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Questions</h3>\n          <div class=\"faq\"><details><summary>Faut-il savoir se servir d'un téléphone pour le recevoir ?</summary><p>Non. Celui qui reçoit n'a rien à faire.</p></details><details><summary>À quoi sert l'abonnement ?</summary><p>À l'hébergement des photos, aux envois illimités et aux mises à jour de l'écran.</p></details></div>\n        </div>\n      </section>\n",
 "pack-noel": "\n      <section class=\"pdetail\" id=\"fiche-pack-noel\">\n        <div class=\"phero\">\n          <div class=\"phero-media\" style=\"--tint: linear-gradient(150deg, var(--sage), var(--sky) 60%, var(--rose))\"><div class=\"xmas-stack\"><div class=\"frame-mock\"><img src=\"image/poster-mur-salon.jpg\" alt=\"\"></div><div class=\"device-mock\"><div class=\"wifi\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9.5a13 13 0 0 1 16 0\"/><path d=\"M7 13a8.5 8.5 0 0 1 10 0\"/><circle cx=\"12\" cy=\"17.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/></svg></div><div class=\"screen\"><img src=\"image/bebe-mer.jpg\" alt=\"\"></div><div class=\"magnet\"></div></div><div class=\"puzzle-mock\" style=\"--puz:url('image/famille-plage-rochers.jpg')\"><i style=\"background-position:0.00% 0.00%\"></i><i style=\"background-position:25.00% 0.00%\"></i><i style=\"background-position:50.00% 0.00%\"></i><i style=\"background-position:75.00% 0.00%\"></i><i class=\"loose\" style=\"background-position:100.00% 0.00%\"></i><i style=\"background-position:0.00% 33.33%\"></i><i style=\"background-position:25.00% 33.33%\"></i><i style=\"background-position:50.00% 33.33%\"></i><i style=\"background-position:75.00% 33.33%\"></i><i style=\"background-position:100.00% 33.33%\"></i><i style=\"background-position:0.00% 66.67%\"></i><i style=\"background-position:25.00% 66.67%\"></i><i style=\"background-position:50.00% 66.67%\"></i><i style=\"background-position:75.00% 66.67%\"></i><i style=\"background-position:100.00% 66.67%\"></i><i style=\"background-position:0.00% 100.00%\"></i><i style=\"background-position:25.00% 100.00%\"></i><i style=\"background-position:50.00% 100.00%\"></i><i style=\"background-position:75.00% 100.00%\"></i><i style=\"background-position:100.00% 100.00%\"></i></div></div></div>\n          <div>\n            <span class=\"kicker\">Édition limitée</span>\n            <h2>Le Pack Noël</h2>\n            <p class=\"lead\">Les trois objets réunis dans un coffret, livrés avant le 24 décembre.</p>\n            <div class=\"chips\"><span class=\"chip\">Coffret cadeau</span><span class=\"chip\">Livré avant le 24/12</span><span class=\"chip\">3 objets</span><span class=\"chip\">-35 €</span></div>\n          </div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Dans la boîte</h3>\n          <div class=\"howto\"><div class=\"how-step nonum\"><h4>Le cadre écran</h4><p>89 € — l'écran connecté et son cadre bois.</p></div><div class=\"how-step nonum\"><h4>Le cadre jeu</h4><p>29,90 € — monté avec sa première affiche et sa vidéo surprise.</p></div><div class=\"how-step nonum\"><h4>Un puzzle photo</h4><p>34,90 € — 200 pièces, dans sa boîte personnalisée.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Comment ça marche</h3>\n          <div class=\"howto\"><div class=\"how-step\"><h4>Vous réservez avant le 10 décembre</h4><p>Le temps d'imprimer et d'expédier sereinement.</p></div><div class=\"how-step\"><h4>Vous préparez vos photos</h4><p>Depuis le site, à votre rythme.</p></div><div class=\"how-step\"><h4>Le coffret arrive</h4><p>Emballé pour être posé tel quel sous le sapin.</p></div></div>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Caractéristiques</h3>\n          <dl class=\"specs\"><div class=\"spec\"><dt>Contenu</dt><dd>Cadre écran + cadre jeu + puzzle</dd></div><div class=\"spec\"><dt>Prix</dt><dd>119 € au lieu de 153,80 €</dd></div><div class=\"spec\"><dt>Réservation</dt><dd>Jusqu'au 10 décembre</dd></div><div class=\"spec\"><dt>Livraison</dt><dd>Avant le 24 décembre</dd></div><div class=\"spec\"><dt>Abonnements</dt><dd>Démarrage en janvier</dd></div><div class=\"spec\"><dt>Engagement</dt><dd>Aucun</dd></div></dl>\n        </div>\n\n        <div class=\"psection\">\n          <h3>Questions</h3>\n          <div class=\"faq\"><details><summary>Puis-je l'offrir à quelqu'un d'autre ?</summary><p>Oui, on l'expédie directement à l'adresse de votre choix.</p></details><details><summary>Suis-je obligé de prendre les abonnements ?</summary><p>Non. Sans abonnement, vous gardez l'écran et les objets reçus.</p></details></div>\n        </div>\n      </section>\n"
};
