# Tascheck — AE medisch materiaal

Zelfstandige web-app (los van de tropengeneeskunde-studieapp) voor het beheer van medische tassen bij AE-vluchten (rotary wing). Vervangt het bijhouden van tellingen en vervaldatums in losse Excel-bestanden.

## Wat de app doet

- **Telling per tas**: stap item voor item door de tas met grote +/− knoppen; per item kan de vervaldatum op de verpakking direct worden bijgewerkt. Afsluiten met een overzicht van afwijkingen, daarna opslaan.
- **Vervaldatumbewaking**: elk item krijgt automatisch een status — verlopen (rood), verloopt binnen 1 maand (rood), binnen 3 maanden (oranje), of goed (groen). Het tabblad *Vervaldata* toont alles gesorteerd op urgentie.
- **Automatische bestellijst**: items die verlopen zijn, binnenkort verlopen, of onder de norm zitten na een telling verschijnen vanzelf op de bestellijst, met reden en voorgesteld aantal. Aantallen zijn aan te passen en regels uit te vinken. Versturen kan via e-mail, klembord of CSV-download.
- **Beheer**: tassen en items toevoegen, bewerken en verwijderen (naam, norm, eenheid, lotnummer, vervaldatum, locatie).

## Gebruik

Open `index.html` in een browser — geen installatie of server nodig. De app is ontworpen voor gebruik op een telefoon tijdens het tellen.

Gegevens staan lokaal op het apparaat (browseropslag). Via het tandwiel rechtsboven kan een back-up (JSON) worden gedownload en hersteld, bijvoorbeeld om gegevens naar een ander apparaat over te zetten.

Bij de eerste start staat er demodata in (drie voorbeeldtassen met realistische AE-inhoud); via *Instellingen → Terug naar demodata* is die altijd terug te halen.

## Beperkingen / vervolg

- Opslag is per apparaat; er is (nog) geen gedeelde database voor meerdere gebruikers.
- Automatisch bestellen vergt een koppeling met het bestelsysteem van de leverancier; tot die tijd genereert de app de bestellijst als e-mail of CSV.
- Het bredere proces (SWR-aanvraagformulieren rond AE-vluchten) valt buiten dit deelproject.
