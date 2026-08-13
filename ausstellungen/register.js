/* =========================================================================
   Register aller Ausstellungen.
   Dies ist die EINZIGE Datei, die Du aendern musst, um eine Ausstellung
   hinzuzufuegen. Traege einen neuen Eintrag ein und lege den passenden
   Ordner unter ausstellungen/ an.

   Felder:
     id        Ordnername unter ausstellungen/
     titel     Name der Ausstellung
     untertitel Kurze Einordnung (eine Zeile)
     text      Zwei bis drei Saetze fuer die Uebersichtskarte
     vorschau  Pfad zum Vorschaubild, relativ zum Ausstellungsordner
     raum      Raumnummer oder Saalbezeichnung
     eroeffnet Datum im Format JJJJ-MM-TT
     exponate  Anzahl der Exponate
   ========================================================================= */

window.MUSEUM_REGISTER = [
  {
    id: "01-architektur-des-museums",
    titel: "Architektur des Museums",
    untertitel: "Vier Ansichten auf das eigene Bauwerk",
    text: "Das Museum stellt sich selbst aus. Vier UML-Diagramme zeigen Bausteine, Verzeichnisse, Auslieferung und den Weg eines Besuchers durch die Seiten.",
    vorschau: "bilder/01-bausteinsicht.jpg",
    raum: "Saal I",
    eroeffnet: "2026-08-13",
    exponate: 4
  }
];
