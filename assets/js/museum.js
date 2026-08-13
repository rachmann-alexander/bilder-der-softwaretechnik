/* =========================================================================
   museum.js  --  baut die Ausstellungsuebersicht aus dem Register.

   Verwendung im HTML:
     <ul class="galerie" data-galerie data-basis="ausstellungen/"></ul>
     <script src="ausstellungen/register.js"></script>
     <script src="assets/js/museum.js"></script>

   data-basis  Pfad zum Ausstellungsordner, relativ zur aufrufenden Seite.
   data-limit  Optional. Zeigt nur die ersten n Ausstellungen.
   ========================================================================= */

(function () {
  "use strict";

  var MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni",
                "Juli", "August", "September", "Oktober", "November", "Dezember"];

  function datumLesbar(iso) {
    var teile = String(iso || "").split("-");
    if (teile.length !== 3) { return iso || ""; }
    var monat = MONATE[Number(teile[1]) - 1];
    if (!monat) { return iso; }
    return Number(teile[2]) + ". " + monat + " " + teile[0];
  }

  function element(tag, klasse, text) {
    var el = document.createElement(tag);
    if (klasse) { el.className = klasse; }
    if (text !== undefined) { el.textContent = text; }
    return el;
  }

  function tafelBauen(a, basis) {
    var ziel = basis + a.id + "/";

    var li = element("li", "tafel");

    var bildlink = element("a", "tafel-bild");
    bildlink.href = ziel;
    bildlink.setAttribute("tabindex", "-1");
    bildlink.setAttribute("aria-hidden", "true");

    var bild = element("img");
    bild.src = ziel + (a.vorschau || "");
    bild.alt = "";
    bild.loading = "lazy";
    bildlink.appendChild(bild);
    li.appendChild(bildlink);

    var text = element("div", "tafel-text");
    text.appendChild(element("p", "marke", a.untertitel || ""));

    var h3 = element("h3");
    var titellink = element("a", null, a.titel || a.id);
    titellink.href = ziel;
    h3.appendChild(titellink);
    text.appendChild(h3);

    text.appendChild(element("p", null, a.text || ""));

    var fuss = element("p", "fuss");
    var stuecke = [];
    if (a.raum)      { stuecke.push(a.raum); }
    if (a.exponate)  { stuecke.push(a.exponate + (a.exponate === 1 ? " Exponat" : " Exponate")); }
    if (a.eroeffnet) { stuecke.push("eröffnet " + datumLesbar(a.eroeffnet)); }
    fuss.textContent = stuecke.join("  ·  ");
    text.appendChild(fuss);

    li.appendChild(text);
    return li;
  }

  function galerieFuellen(behaelter) {
    var register = window.MUSEUM_REGISTER;
    if (!Array.isArray(register)) {
      behaelter.appendChild(element("li", null,
        "Das Register konnte nicht geladen werden. Prüfe ausstellungen/register.js."));
      return;
    }

    var basis = behaelter.getAttribute("data-basis") || "ausstellungen/";
    var limit = parseInt(behaelter.getAttribute("data-limit"), 10);

    var liste = register.slice().sort(function (a, b) {
      return String(b.eroeffnet || "").localeCompare(String(a.eroeffnet || ""));
    });

    if (!isNaN(limit)) { liste = liste.slice(0, limit); }

    if (liste.length === 0) {
      behaelter.appendChild(element("li", null, "Zurzeit zeigt das Museum keine Ausstellung."));
      return;
    }

    liste.forEach(function (a) { behaelter.appendChild(tafelBauen(a, basis)); });

    var zaehler = document.querySelector("[data-anzahl]");
    if (zaehler) {
      zaehler.textContent = register.length === 1
        ? "Eine Ausstellung"
        : register.length + " Ausstellungen";
    }
  }

  function start() {
    var behaelter = document.querySelectorAll("[data-galerie]");
    Array.prototype.forEach.call(behaelter, galerieFuellen);

    var jahr = document.querySelectorAll("[data-jahr]");
    Array.prototype.forEach.call(jahr, function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
