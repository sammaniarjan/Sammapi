# Privacyverklaring & technische onderbouwing: Lesrooster (Excel → iCal)

*Laatst bijgewerkt: 4 augustus 2026*

Dit document beschrijft hoe de Lesrooster-app met gegevens omgaat en onderbouwt technisch en controleerbaar waarom er **geen sprake is van uploaden, doorgifte of externe verwerking** van roostergegevens.

## Kern in één zin

**Het Excel-bestand verlaat het apparaat van de gebruiker nooit.** Alle verwerking (uitlezen, weergeven, omzetten naar iCal) gebeurt uitsluitend in de browser van de gebruiker, op diens eigen apparaat. Er bestaat geen server, database, API of externe dienst die de gegevens ontvangt.

## Hoe de app werkt (gegevensstroom)

1. De gebruiker kiest een Excel-bestand via de bestandskiezer of drag-and-drop.
2. De browser leest het bestand **in het geheugen van het eigen apparaat** uit via de standaard `FileReader`-API. Dit is een lokale leesbewerking, géén upload; er wordt geen HTTP-verzoek gedaan.
3. Een lokaal meegeleverde JavaScript-bibliotheek (SheetJS/xlsx, opgenomen in `lib/xlsx.full.min.js`) ontleedt het bestand in de browser.
4. De roosterregels worden als kalender weergegeven en kunnen worden geëxporteerd als `.ics`-bestand. Ook dat exportbestand wordt lokaal gegenereerd en direct als download aangeboden; het passeert geen server.
5. Voor gebruiksgemak (wijzigingsdetectie bij een nieuwe upload) bewaart de app het rooster in de `localStorage` van de browser van de gebruiker. Deze opslag staat fysiek op het apparaat van de gebruiker, is alleen door die browser leesbaar en wordt volledig gewist met de knop **"Wis rooster"**.

Er is bewust geen backend: de app is een statisch HTML-bestand. Statische hosting (GitHub Pages) levert alleen de pagina zelf uit; wat de gebruiker daarna met de pagina doet, blijft op het apparaat.

## Technische waarborgen (afdwingbaar, niet alleen beleid)

| Waarborg | Uitwerking |
|---|---|
| **Content-Security-Policy** | De pagina bevat een CSP-header (`default-src 'none'`, geen `connect-src`) waarmee de **browser zelf** ieder netwerkverzoek vanaf de pagina blokkeert: geen `fetch`, geen `XMLHttpRequest`, geen beacons, geen externe scripts. Zelfs kwaadwillende of foutieve code zou dus niets kunnen versturen. |
| **Geen externe bibliotheken** | De xlsx-bibliotheek wordt lokaal meegeleverd in plaats van via een CDN geladen. Bij het openen van de app wordt dus ook geen verbinding met derden (zoals Cloudflare) gemaakt. |
| **Geen analytics/tracking** | De app bevat geen cookies, geen analytics, geen tracking pixels en geen fonts of andere assets van derden. |
| **Werkt volledig offline** | De app functioneert met vliegtuigmodus aan, het directe bewijs dat er geen server bij de verwerking betrokken is. |
| **Open broncode** | Alle code is leesbaar via de paginabron; de werking is volledig verifieerbaar. |

## Zelf verifiëren (5 minuten)

1. Open de app en open de ontwikkelaarstools van de browser (F12) → tabblad **Netwerk/Network**.
2. Upload een Excel-bestand en exporteer een `.ics`.
3. Constateer: er verschijnt **geen enkel netwerkverzoek** tijdens deze handelingen.
4. Extra bewijs: schakel wifi/netwerk uit (vliegtuigmodus) en herhaal stap 2: alles blijft werken.

## Beoordeling in AVG-termen

- Er vindt **geen doorgifte aan derden** plaats en geen verwerking door of namens de beheerder van de website: de gegevens komen nooit bij een andere partij dan de gebruiker zelf terecht.
- De verwerking is vergelijkbaar met het openen van het Excel-bestand in Excel zelf: het gebeurt op het eigen apparaat, onder eigen controle van de gebruiker.
- De enige "opslag" is de lokale browseropslag op het apparaat van de gebruiker zelf, die de gebruiker op elk moment zelf kan wissen (knop **"Wis rooster"**, of via de browserinstellingen).

## Restrisico's en mitigaties

| Risico | Mitigatie |
|---|---|
| Gebruik op een gedeeld/openbaar apparaat: rooster blijft in localStorage achter | Knop **"Wis rooster"** verwijdert alle opgeslagen gegevens; advies in de app om dit op gedeelde apparaten te doen. |
| Toekomstige codewijziging zou alsnog data kunnen versturen | De CSP blokkeert dit op browserniveau; daarnaast is de broncode openbaar en controleerbaar (versiebeheer via git). |
| Het geëxporteerde `.ics`-bestand wordt door de gebruiker in een agenda van derden (bijv. Google Calendar) geïmporteerd | Dit is een bewuste, eigen handeling van de gebruiker met diens eigen bestand, gelijk aan het handmatig invoeren van afspraken in de eigen agenda. De app zelf verstuurt niets. |

## Contact

Vragen over dit document of verzoek tot demonstratie van bovenstaande verificatiestappen: Arjan Sammani.
