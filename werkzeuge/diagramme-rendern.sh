#!/usr/bin/env bash
# =========================================================================
# Rendert alle PlantUML-Quellen einer Ausstellung nach JPG.
#
# Aufruf:
#   ./werkzeuge/diagramme-rendern.sh                     # alle Ausstellungen
#   ./werkzeuge/diagramme-rendern.sh 01-architektur-des-museums
#
# Voraussetzungen:
#   - Java 8 oder neuer
#   - Graphviz (dot)
#   - ImageMagick (convert)
#   - plantuml.jar, gefunden über $PLANTUML_JAR oder ./werkzeuge/plantuml.jar
#
# PlantUML schreibt PNG. Der zweite Schritt wandelt nach JPG, weil das
# Museum seine Exponate als JPG hängt.
# =========================================================================

set -euo pipefail

WURZEL="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
JAR="${PLANTUML_JAR:-$WURZEL/werkzeuge/plantuml.jar}"
QUALITAET="${JPG_QUALITAET:-92}"

if [ ! -f "$JAR" ]; then
  echo "plantuml.jar fehlt: $JAR" >&2
  echo "Lade es von https://plantuml.com/download oder setze PLANTUML_JAR." >&2
  exit 1
fi

for werkzeug in java dot convert; do
  command -v "$werkzeug" >/dev/null 2>&1 || { echo "$werkzeug fehlt." >&2; exit 1; }
done

if [ $# -gt 0 ]; then
  SAELE=("$@")
else
  SAELE=()
  for d in "$WURZEL"/ausstellungen/*/; do
    [ -d "$d/quellen" ] && SAELE+=("$(basename "$d")")
  done
fi

for saal in "${SAELE[@]}"; do
  QUELLEN="$WURZEL/ausstellungen/$saal/quellen"
  BILDER="$WURZEL/ausstellungen/$saal/bilder"

  [ -d "$QUELLEN" ] || { echo "Überspringe $saal: kein Ordner quellen/"; continue; }
  mkdir -p "$BILDER"

  echo "== $saal"
  TMP="$(mktemp -d)"

  ( cd "$QUELLEN" && java -jar "$JAR" -charset UTF-8 -tpng -o "$TMP" ./*.puml )

  for png in "$TMP"/*.png; do
    [ -e "$png" ] || continue
    name="$(basename "${png%.png}")"
    convert "$png" -background white -alpha remove -alpha off \
            -quality "$QUALITAET" "$BILDER/$name.jpg"
    echo "   $name.jpg"
  done

  rm -rf "$TMP"
done

echo "Fertig."
