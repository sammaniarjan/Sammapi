# Tascheck: AE medisch materiaal

Zelfstandige web-app voor het beheer van de medische sets bij AE-vluchten (rotary wing). Vervangt het bijhouden van tellingen, vervaldatums en bestellijsten in losse Excel-bestanden.

## Structuur

Er zijn 8 **sets**, elk beheerd door een duo. Elke set bestaat uit vaste **onderdelen**:

- Tas
- Container tas
- Foudraal (O2)
- Pelicase
- Unipack

De onderdelen bevatten **artikelen**, gegroepeerd per **compartiment** (behalve de Unipack). Per artikel worden vastgelegd: herkenbare naam, **SAP-benaming en SAP-nummer** (bestellingen gaan op SAP-nummer), norm-aantal, aanwezig aantal, eenheid, lotnummer, vervaldatum en optioneel een **foto** ter herkenning.

## Wat de app doet

- **Telling per onderdeel**: stap artikel voor artikel door de inhoud met grote +/− knoppen; per artikel kan de vervaldatum op de verpakking direct worden bijgewerkt en wordt de foto getoond ter herkenning. Afsluiten met een overzicht van afwijkingen, daarna opslaan.
- **Vervaldatumbewaking**: elk artikel krijgt automatisch een status: verlopen (rood), verloopt binnen 1 maand (rood), binnen 3 maanden (oranje), of goed (groen). Het tabblad *Vervaldata* toont alles gesorteerd op urgentie.
- **Bestellijst met aanvulvolgorde**: artikelen die verlopen zijn, binnenkort verlopen of onder de norm zitten verschijnen vanzelf op de bestellijst. Per regel wordt de herkomst gekozen volgens de vaste volgorde: eerst de **grijze voorraad**, dan de voorraad van **MatLog (Gilze)**, en wat daar niet is gaat als **VMF-bestelling** via de SharePoint van MatLog naar het MGLC. Regels die uit grijze voorraad of MatLog komen gaan niet mee in de bestelling.
- **Export op SAP-nummer**: de bestelling gaat als e-mail, klembordtekst of CSV, met per regel SAP-nummer en SAP-benaming.
- **Beheer**: sets (incl. duo), onderdelen, compartimenten en artikelen zijn volledig te bewerken. Een nieuwe set kan direct met de standaardonderdelen worden aangemaakt.

## Gebruik

Open `index.html` in een browser, geen installatie of server nodig. De app is ontworpen voor gebruik op een telefoon tijdens het tellen.

Gegevens staan lokaal op het apparaat (browseropslag). Via het tandwiel rechtsboven kan een back-up (JSON) worden gedownload en hersteld, bijvoorbeeld om gegevens naar een ander apparaat over te zetten. Foto's tellen mee in de opslagruimte (ze worden verkleind opgeslagen).

Bij de eerste start staan er 8 demosets in met dummy-artikelen en dummy-SAP-nummers; via *Instellingen → Terug naar demodata* is die situatie altijd terug te halen.

## Beperkingen / vervolg

- Opslag is per apparaat; er is (nog) geen gedeelde database waarmee alle duo's in dezelfde gegevens werken. Back-up/herstel is de tijdelijke overdrachtsroute.
- Direct aansluiten op SAP/MGLC of de SharePoint van MatLog vergt een koppeling; tot die tijd genereert de app de VMF-bestelling als e-mail of CSV.
- De grijze voorraad verdwijnt op termijn (zodra MatLog de voorraden op orde heeft); de herkomstoptie kan dan vervallen.
- Het bredere proces (SWR-aanvraagformulieren rond AE-vluchten) valt buiten dit deelproject.
