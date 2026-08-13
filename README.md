# Bilder der Softwaretechnik

Ein Museum für Softwaretechnik als statische Website. Es zeigt Diagramme,
Modelle und Entwürfe als Ausstellungsstücke.

Die Seite besteht aus HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt,
keine Abhängigkeiten zur Laufzeit. Jede Datei lässt sich per Doppelklick im Browser
öffnen.

---

## Aufbau

```
bilder-der-softwaretechnik/
├── index.html              Eingangshalle: Vorstellung, Vitrine, Besuchsdaten
├── ausstellungen.html      Übersicht aller Ausstellungen
├── impressum.html          Rechtliches (enthält TODO-Platzhalter)
├── .nojekyll               GitHub Pages liefert die Dateien unverändert aus
├── assets/
│   ├── css/museum.css      Museumslook für alle Seiten
│   └── js/museum.js        Baut die Galerie aus dem Register
├── ausstellungen/
│   ├── register.js         Liste aller Ausstellungen
│   └── 01-architektur-des-museums/
│       ├── index.html      Die Saalseite
│       ├── ausstellung.css Feinschliff nur für diesen Saal
│       ├── bilder/         Die Exponate als JPG
│       └── quellen/        Die PlantUML-Quellen der Exponate
└── werkzeuge/
    └── diagramme-rendern.sh   PlantUML-Quellen nach JPG
```

Eine Regel trägt das ganze Projekt: **Eine Ausstellung ist ein Ordner.**
Sie bringt ihre Seite, ihr Stylesheet, ihre Bilder und die Quellen der Bilder mit.
Die einzige Verbindung zum Haus ist ein Eintrag in `ausstellungen/register.js`.

---

## Auf GitHub Pages veröffentlichen

Vier Schritte führen zur veröffentlichten Seite:

1. Repository anlegen, etwa `bilder-der-softwaretechnik`.
2. Inhalt dieses Ordners committen und pushen:

   ```bash
   git init
   git add .
   git commit -m "Museum eröffnet"
   git branch -M main
   git remote add origin git@github.com:BENUTZERNAME/bilder-der-softwaretechnik.git
   git push -u origin main
   ```

3. Im Repository unter **Settings → Pages** als Quelle *Deploy from a branch*
   wählen, Zweig `main`, Ordner `/ (root)`.
4. Nach einer Minute läuft die Seite unter
   `https://BENUTZERNAME.github.io/bilder-der-softwaretechnik/`.

Alle Pfade sind relativ. Die Seite funktioniert deshalb in einem Unterordner,
unter einer eigenen Domain und lokal im Dateisystem.

### Lokal ansehen

Doppelklick auf `index.html` genügt. Wer lieber einen Server nutzt:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

---

## Eine Ausstellung hinzufügen

Drei Schritte, etwa für den zweiten Saal:

1. **Ordner anlegen.** Kopiere `ausstellungen/01-architektur-des-museums/`
   nach `ausstellungen/02-entwurfsmuster/` und leere `bilder/` und `quellen/`.
2. **Inhalt schreiben.** Passe `index.html` an, lege deine Diagrammquellen in
   `quellen/` und rendere sie (siehe unten).
3. **Register ergänzen.** Trage die Ausstellung in `ausstellungen/register.js` ein:

   ```js
   {
     id: "02-entwurfsmuster",
     titel: "Entwurfsmuster",
     untertitel: "Zwölf Lösungen, die sich bewährt haben",
     text: "Zwei bis drei Sätze für die Karte in der Übersicht.",
     vorschau: "bilder/01-uebersicht.jpg",
     raum: "Saal II",
     eroeffnet: "2026-09-01",
     exponate: 6
   }
   ```

Mehr ist nicht nötig. Die Übersicht liest das Register beim Laden und sortiert
die Karten nach Eröffnungsdatum, das jüngste zuerst.

### Felder des Registers

| Feld | Bedeutung |
| --- | --- |
| `id` | Ordnername unter `ausstellungen/` |
| `titel` | Name der Ausstellung |
| `untertitel` | Eine Zeile zur Einordnung |
| `text` | Zwei bis drei Sätze für die Übersichtskarte |
| `vorschau` | Vorschaubild, relativ zum Ausstellungsordner |
| `raum` | Saalbezeichnung, etwa `Saal II` |
| `eroeffnet` | Datum als `JJJJ-MM-TT`, steuert die Sortierung |
| `exponate` | Anzahl der Exponate |

---

## Diagramme rendern

Die Exponate entstehen aus PlantUML-Quellen. Das Skript rendert nach PNG und
wandelt anschließend nach JPG.

```bash
export PLANTUML_JAR=/pfad/zu/plantuml.jar
./werkzeuge/diagramme-rendern.sh                        # alle Ausstellungen
./werkzeuge/diagramme-rendern.sh 01-architektur-des-museums
```

Voraussetzungen sind Java, Graphviz (`dot`) und ImageMagick (`convert`).
Unter Debian und Ubuntu:

```bash
sudo apt install default-jre graphviz imagemagick
```

`plantuml.jar` gibt es unter <https://plantuml.com/download>. Lege es nach
`werkzeuge/plantuml.jar` oder setze `PLANTUML_JAR`.

Die gerenderten JPG-Dateien gehören ins Repository. Wer das Museum nur
anschaut oder deployt, braucht die Werkzeuge nicht.

---

## Offene Punkte

Vor der Veröffentlichung zu erledigen:

- `impressum.html` enthält Platzhalter mit `TODO`. Ersetze sie vollständig,
  sonst ist die Seite nach § 5 DDG abmahnfähig.
- Lizenz für die ausgestellten Diagramme festlegen und im Impressum nennen.
- Link zum Repository im Impressum eintragen.

---

## Lizenz

TODO: Lizenz wählen, etwa MIT für den Quelltext und CC BY 4.0 für die Diagramme.
