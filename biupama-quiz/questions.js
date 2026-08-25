// BIUPAMA Quiz - Vragenbank Tropengeneeskunde
// Gebaseerd op BIUPAMA.md (studiedocument tropengeneeskunde)
// Structuur: { id, cat, q, opts[4], correct (0-3), uitleg }

const QUIZ_QUESTIONS = [
  // ===== KLACHTGESTUURD =====
  {
    id: 'q1',
    cat: 'Klachtgestuurd',
    q: 'Een militair meldt zich met koorts en trombocytopenie na een tropenreis. Aan welke combinatie van diagnosen denk je volgens de diagnostische kapstok als eerste?',
    opts: [
      'Giardiasis, amoebiasis en cholera',
      'Malaria, dengue en rickettsiose',
      'Strongyloidiasis, toxocariasis en ascariasis',
      'Hepatitis A, hepatitis E en brucellose'
    ],
    correct: 1,
    uitleg: 'Volgens de kapstok "koorts na tropen" wijst de combinatie met trombopenie op malaria, dengue of rickettsiose. Helminthen geven eerder eosinofilie en darmprotozoa geven vooral diarree.'
  },
  {
    id: 'q2',
    cat: 'Klachtgestuurd',
    q: 'Een reiziger heeft koorts en een eosinofilie van 2000 × 10⁶/L. Welk type verwekker is dan het meest waarschijnlijk?',
    opts: [
      'Een virus (bijv. dengue)',
      'Een bacterie (bijv. Salmonella Typhi)',
      'Een protozo (bijv. Plasmodium)',
      'Een weefselinvasieve helminth (bijv. Strongyloides of Schistosoma)'
    ],
    correct: 3,
    uitleg: 'Eosinofilie >1500 wijst op een weefselinvasieve helminth zoals Strongyloides, Schistosoma (acuut), Filaria of Toxocara. Protozoa, bacteriën en virussen geven geen eosinofilie.'
  },
  {
    id: 'q3',
    cat: 'Klachtgestuurd',
    q: 'Bij welke van de volgende verwekkers verwacht je GEEN eosinofilie?',
    opts: [
      'Giardia lamblia',
      'Strongyloides stercoralis',
      'Toxocara canis',
      'Schistosoma mansoni (acute fase)'
    ],
    correct: 0,
    uitleg: 'Protozoa zoals Giardia, malaria en amoeben geven nooit eosinofilie. Weefselinvasieve helminthen (Strongyloides, Toxocara, acute Schistosoma) geven juist uitgesproken eosinofilie.'
  },
  {
    id: 'q4',
    cat: 'Klachtgestuurd',
    q: 'Een reiziger wordt pas 5 weken na terugkeer uit de tropen ziek met koorts. Welke diagnose past het best bij deze incubatietijd (>21 dagen)?',
    opts: [
      'Dengue',
      'Chikungunya',
      'Malaria door P. vivax',
      'Rickettsiose'
    ],
    correct: 2,
    uitleg: 'P. vivax, P. ovale en P. malariae hebben een incubatietijd >21 dagen (soms maanden tot jaren door hypnozoïeten). Dengue, chikungunya en rickettsiose hebben een incubatietijd korter dan 10 dagen.'
  },
  {
    id: 'q5',
    cat: 'Klachtgestuurd',
    q: 'Een patiënt heeft koortspieken die om de dag optreden (elke 48 uur, tertiana). Bij welke verwekkers past dit patroon?',
    opts: [
      'Salmonella Typhi',
      'P. vivax en P. ovale',
      'P. malariae',
      'Denguevirus'
    ],
    correct: 1,
    uitleg: 'Koorts tertiana (om de dag, 48-uurscyclus) past bij P. vivax en P. ovale. P. malariae geeft koorts quartana (72 uur), buiktyfus continue koorts en dengue een bifasisch (zadeldak) patroon.'
  },
  {
    id: 'q6',
    cat: 'Klachtgestuurd',
    q: 'Na een safari in Oost-Afrika heeft een reiziger koorts en een zwarte korst (eschar) op het been. Aan welke verwekker denk je als eerste?',
    opts: [
      'Rickettsia spp.',
      'Plasmodium falciparum',
      'Salmonella Typhi',
      'Leishmania spp.'
    ],
    correct: 0,
    uitleg: 'Een eschar (zwarte korst) bij koorts is kenmerkend voor rickettsiose, in dit geval passend bij tick bite fever na een safari. Behandeling: doxycycline.'
  },
  {
    id: 'q7',
    cat: 'Klachtgestuurd',
    q: 'Een patiënt heeft een jeukende, urticariële lijn op de bil die zich snel verplaatst (5-10 cm per uur). Welke diagnose is dit vrijwel pathognomonisch?',
    opts: [
      'Cutane larva migrans (hookworm)',
      'Cutane leishmaniasis',
      'Tungiasis',
      'Larva currens (Strongyloides stercoralis)'
    ],
    correct: 3,
    uitleg: 'Larva currens door Strongyloides beweegt snel (5-10 cm/uur) en zit vaak perianaal of op de billen. Cutane larva migrans (hondenhookworm) migreert veel langzamer en zit vooral op voeten.'
  },
  {
    id: 'q8',
    cat: 'Klachtgestuurd',
    q: 'Wat is het mechanisme achter het Löffler syndroom (passagère pulmonale infiltraten met hoesten, koorts en eosinofilie)?',
    opts: [
      'Trapping van microfilarieën in de longen',
      'Granuloomvorming rond Schistosoma-eieren',
      'Longmigratie van larven van Ascaris of hookworm',
      'Sekwestratie van geparasiteerde erytrocyten'
    ],
    correct: 2,
    uitleg: 'Het Löffler syndroom ontstaat door longmigratie van larven (Ascaris, hookworm) en is zelflimiterend. Trapping van microfilarieën past bij tropische pulmonale eosinofilie (TPE).'
  },
  {
    id: 'q9',
    cat: 'Klachtgestuurd',
    q: 'Een militair heeft 5 weken geleden in Lake Malawi gezwommen en presenteert zich nu met koorts, urticaria, hoesten en ernstige eosinofilie. Wat is de meest waarschijnlijke diagnose?',
    opts: [
      'Katayama syndroom (acute schistosomiasis)',
      'Malaria tropica',
      'Buiktyfus',
      'Acute HIV-infectie'
    ],
    correct: 0,
    uitleg: 'Het Katayama syndroom treedt 4-7 weken na eerste zoetwaterexpositie op, vooral bij niet-immune reizigers: koorts, urticaria, hoesten en ernstige eosinofilie. Lake Malawi is een klassieke schistosomiasis-hotspot.'
  },
  {
    id: 'q10',
    cat: 'Klachtgestuurd',
    q: 'Een patiënt met koorts na de tropen heeft icterus met vooral ongeconjugeerde hyperbilirubinemie, laag haptoglobine en hoog LDH. Wat is het meest waarschijnlijke mechanisme?',
    opts: [
      'Galwegobstructie door een parasiet',
      'Hemolyse, bijvoorbeeld door malaria',
      'Hepatocellulaire schade door virale hepatitis',
      'Cholestase door medicatie'
    ],
    correct: 1,
    uitleg: 'Ongeconjugeerde hyperbilirubinemie met hemolyseparameters past bij pre-hepatische icterus door hemolyse; malaria is daarvan in de tropen een belangrijke oorzaak. Hepatitis geeft stijging van beide fracties, obstructie vooral geconjugeerd bilirubine.'
  },

  // ===== MALARIA =====
  {
    id: 'q11',
    cat: 'Malaria',
    q: 'Wat is de grondregel bij elke patiënt met koorts na verblijf in een malariagebied?',
    opts: [
      'Het is malaria tot het tegendeel bewezen is: altijd dikke druppel en bloeduitstrijk',
      'Eerst 48 uur afwachten of de koorts vanzelf zakt',
      'Direct empirisch antibiotica starten',
      'Alleen testen op malaria bij een tertiana koortspatroon'
    ],
    correct: 0,
    uitleg: 'Elke koorts na een malariagebied is malaria tot het tegendeel bewezen. De dikke druppel met bloeduitstrijk is altijd geïndiceerd; het koortspatroon kan aspecifiek zijn.'
  },
  {
    id: 'q12',
    cat: 'Malaria',
    q: 'Welke Plasmodium-soorten vormen hypnozoïeten in de lever en kunnen daardoor maanden tot jaren later een relapse geven?',
    opts: [
      'P. falciparum en P. knowlesi',
      'P. malariae en P. falciparum',
      'P. vivax en P. ovale',
      'Alle vijf de humane Plasmodium-soorten'
    ],
    correct: 2,
    uitleg: 'Alleen P. vivax en P. ovale vormen hypnozoïeten in de lever. Daarom is bij deze soorten nabehandeling met primaquine nodig; P. falciparum en P. malariae hebben geen hypnozoïeten.'
  },
  {
    id: 'q13',
    cat: 'Malaria',
    q: 'Een reiziger keert terug van Borneo (Maleisië) met dagelijkse koortspieken. Microscopisch lijkt de parasiet op P. malariae. Waar moet je aan denken?',
    opts: [
      'Chloroquineresistente P. vivax',
      'Een menginfectie van P. ovale en P. vivax',
      'Babesiose',
      'P. knowlesi'
    ],
    correct: 3,
    uitleg: 'P. knowlesi (primatenmalaria, o.a. Borneo) heeft een 24-uurscyclus met dagelijkse koorts, lijkt microscopisch op P. malariae en kan snel ernstig verlopen. Laagdrempelig als gecompliceerd behandelen.'
  },
  {
    id: 'q14',
    cat: 'Malaria',
    q: 'Wat is de eerste keus behandeling van ongecompliceerde malaria tropica (P. falciparum) bij een volwassene?',
    opts: [
      'Chloroquine gedurende 3 dagen',
      'Artemether/lumefantrine (Riamet), in te nemen met vetrijk voedsel',
      'Primaquine gedurende 14 dagen',
      'Doxycycline gedurende 7 dagen'
    ],
    correct: 1,
    uitleg: 'Artemether/lumefantrine is eerste keus bij ongecompliceerde falciparum-malaria (4 tab op t=0, 8, 24, 36, 48, 60 uur). Inname met vetrijk voedsel verhoogt de absorptie. Chloroquine is voor P. falciparum vrijwel wereldwijd onbruikbaar door resistentie.'
  },
  {
    id: 'q15',
    cat: 'Malaria',
    q: 'Wat is de behandeling van eerste keus in de acute fase van gecompliceerde P. falciparum-malaria?',
    opts: [
      'Orale atovaquon/proguanil (Malarone)',
      'Chloroquine intraveneus',
      'Artesunaat intraveneus 2.4 mg/kg op t=0, 12 en 24 uur',
      'Mefloquine oraal in oplaaddosering'
    ],
    correct: 2,
    uitleg: 'Gecompliceerde malaria wordt behandeld met IV artesunaat (2.4 mg/kg op t=0, 12, 24 uur, daarna elke 24 uur) met IC-bewaking. Na stabilisatie wordt de kuur oraal afgemaakt met artemether/lumefantrine.'
  },
  {
    id: 'q16',
    cat: 'Malaria',
    q: 'Welke bepaling moet altijd worden verricht vóór het starten van primaquine?',
    opts: [
      'G6PD-activiteit',
      'Leverenzymen (ALT/AST)',
      'Hemoglobine',
      'Nierfunctie (creatinine)'
    ],
    correct: 0,
    uitleg: 'Primaquine kan bij G6PD-deficiëntie ernstige hemolyse veroorzaken. Daarom altijd eerst G6PD bepalen; bij deficiëntie een aangepast wekelijks schema of afzien van primaquine.'
  },
  {
    id: 'q17',
    cat: 'Malaria',
    q: 'Waarom is bij malaria door P. malariae géén nabehandeling met primaquine nodig?',
    opts: [
      'Omdat P. malariae altijd zelflimiterend verloopt',
      'Omdat chloroquine ook de hypnozoïeten van P. malariae doodt',
      'Omdat primaquine niet werkzaam is tegen P. malariae',
      'Omdat P. malariae geen hypnozoïeten vormt'
    ],
    correct: 3,
    uitleg: 'Primaquine dient om hypnozoïeten in de lever te eradiceren. P. malariae vormt geen hypnozoïeten; behandeling met chloroquine alleen volstaat.'
  },
  {
    id: 'q18',
    cat: 'Malaria',
    q: 'Waarom is een malariasneltest (RDT op basis van HRP2) niet geschikt om het effect van de behandeling te controleren?',
    opts: [
      'De test detecteert alleen P. vivax',
      'HRP2 blijft na behandeling nog weken positief',
      'De test wordt pas positief na 2 weken infectie',
      'De test kan geen falciparum detecteren'
    ],
    correct: 1,
    uitleg: 'De HRP2-gebaseerde RDT blijft na een behandelde infectie nog weken positief en is dus ongeschikt voor genezingscontrole. Controle gebeurt met parasitemie in de dikke druppel/uitstrijk (dag 2-3 moet dalen).'
  },
  {
    id: 'q19',
    cat: 'Malaria',
    q: 'De dikke druppel is negatief bij een patiënt met sterke klinische verdenking op malaria. Wat is het juiste beleid?',
    opts: [
      'Malaria is uitgesloten; zoek een andere oorzaak',
      'Direct starten met IV artesunaat',
      'De test herhalen na 8-12 uur (tot 2x)',
      'Overstappen op serologie'
    ],
    correct: 2,
    uitleg: 'Eén negatieve dikke druppel sluit malaria niet uit. Bij verdenking wordt de test na 8-12 uur herhaald (2x) voordat malaria verworpen wordt.'
  },
  {
    id: 'q20',
    cat: 'Malaria',
    q: 'Een militair terug uit Mali heeft P. falciparum-malaria. Welke laboratoriumbevinding maakt dit volgens de WHO-criteria een gecompliceerde malaria?',
    opts: [
      'CRP van 80 mg/L',
      'Trombocyten van 120 × 10⁹/L',
      'Hemoglobine van 7.5 g/dL',
      'Glucose van 1.8 mmol/L'
    ],
    correct: 3,
    uitleg: 'Hypoglycemie (glucose <2.2 mmol/L) is een WHO-criterium voor gecompliceerde malaria. Andere criteria zijn o.a. coma (GCS ≤11), Hb <5 g/dL, nierinsufficiëntie, shock en acidose. Trombopenie op zich is geen criterium.'
  },
  {
    id: 'q21',
    cat: 'Malaria',
    q: 'Op welk moment van de dag is het risico op malariatransmissie het grootst?',
    opts: [
      'In de schemering en nacht (Anopheles-mug)',
      'Midden op de dag (Aedes-mug)',
      'Alleen in de vroege ochtend',
      'Het risico is de hele dag gelijk'
    ],
    correct: 0,
    uitleg: 'Malaria wordt overgedragen door de Anopheles-mug, die in de schemering en nacht steekt. De Aedes-mug (dengue, chikungunya, zika, gele koorts) steekt juist overdag.'
  },

  // ===== BUIKTYFUS =====
  {
    id: 'q22',
    cat: 'Buiktyfus',
    q: 'Een reiziger uit India heeft sinds 10 dagen geleidelijk stijgende koorts ("stepladder fever"), hoofdpijn en obstipatie. Bij onderzoek: pols 68/min bij 39.5°C en bleke vlekjes op de romp. Wat is de meest waarschijnlijke diagnose?',
    opts: [
      'Dengue',
      'Buiktyfus',
      'Malaria tropica',
      'Acute schistosomiasis'
    ],
    correct: 1,
    uitleg: 'Geleidelijk stijgende koorts, relatieve bradycardie (pols past niet bij koorts), roseolae en obstipatie (vaker dan diarree!) zijn kenmerkend voor buiktyfus (Salmonella Typhi). Zuid-Azië heeft de hoogste incidentie.'
  },
  {
    id: 'q23',
    cat: 'Buiktyfus',
    q: 'Welke kweek heeft de hoogste sensitiviteit voor het aantonen van buiktyfus?',
    opts: [
      'Feceskweek',
      'Urinekweek',
      'Beenmergkweek',
      'Keelkweek'
    ],
    correct: 2,
    uitleg: 'De beenmergkweek heeft met circa 90% de hoogste sensitiviteit. De bloedkweek (week 1-2) haalt 40-80%, de feceskweek (week 2-3) slechts circa 30%. Widal-serologie heeft een lage specificiteit.'
  },
  {
    id: 'q24',
    cat: 'Buiktyfus',
    q: 'Welke complicatie van buiktyfus treedt typisch op in week 3-4 van de onbehandelde ziekte?',
    opts: [
      'Hemorrhagische shock door plasmalekkage',
      'Acute blindheid',
      'Hyperinfectiesyndroom',
      'Intestinale perforatie'
    ],
    correct: 3,
    uitleg: 'In week 3-4 kunnen complicaties optreden zoals intestinale perforatie (2-3%), gastro-intestinale bloeding en tyfeuze encefalopathie, door necrose van de aangetaste Peyerse plaques.'
  },
  {
    id: 'q25',
    cat: 'Buiktyfus',
    q: 'Waarom is ciprofloxacine vaak geen goede empirische keuze bij buiktyfus opgelopen in Zuid-Azië?',
    opts: [
      'Vanwege hoge fluoroquinolonresistentie van S. Typhi in die regio',
      'Omdat ciprofloxacine de darmwand niet bereikt',
      'Omdat ciprofloxacine alleen intraveneus werkt bij tyfus',
      'Omdat ciprofloxacine dragerschap induceert'
    ],
    correct: 0,
    uitleg: 'In Zuid-Azië (India, Pakistan) bestaat hoge fluoroquinolonresistentie, met in Pakistan zelfs XDR-tyfus. Azitromycine of ceftriaxon zijn dan betere keuzes.'
  },

  // ===== DENGUE & VHK =====
  {
    id: 'q26',
    cat: 'Dengue & VHK',
    q: 'Door welke vector en op welk moment van de dag wordt dengue overgedragen?',
    opts: [
      'Anopheles-mug, in de nacht',
      'Aedes-mug, overdag',
      'Culex-mug, in de schemering',
      'Zandvlieg, in de nacht'
    ],
    correct: 1,
    uitleg: 'Dengue wordt overgedragen door Aedes aegypti/albopictus, die overdag steekt. Muggenwering alleen in de avond beschermt dus onvoldoende tegen dengue.'
  },
  {
    id: 'q27',
    cat: 'Dengue & VHK',
    q: 'Welke pijnstiller heeft de voorkeur bij een patiënt met dengue, en waarom?',
    opts: [
      'Ibuprofen, vanwege het ontstekingsremmende effect',
      'Aspirine, vanwege het koortswerende effect',
      'Paracetamol; NSAID\'s en aspirine zijn gecontra-indiceerd wegens bloedingsrisico',
      'Diclofenac, omdat het de trombocyten spaart'
    ],
    correct: 2,
    uitleg: 'Dengue kent geen specifieke therapie; de behandeling is supportive met vocht en paracetamol. NSAID\'s en aspirine worden vermeden vanwege het bloedingsrisico bij trombopenie.'
  },
  {
    id: 'q28',
    cat: 'Dengue & VHK',
    q: 'Welke test is het meest geschikt om dengue aan te tonen in de eerste dagen (dag 1-5) van de ziekte?',
    opts: [
      'NS1-antigeen (eventueel met PCR)',
      'IgG-serologie',
      'Bloedkweek',
      'Dikke druppel'
    ],
    correct: 0,
    uitleg: 'In de vroege fase (dag 1-5) zijn NS1-antigeen en PCR positief. IgM wordt pas vanaf dag 4-5 positief, IgG pas vanaf week 2 (of bij eerdere/secundaire infectie).'
  },
  {
    id: 'q29',
    cat: 'Dengue & VHK',
    q: 'Welke bevinding bij een denguepatiënt is een waarschuwingssignaal voor transitie naar ernstige dengue?',
    opts: [
      'Dalende koorts op dag 4',
      'Milde leukopenie',
      'Retro-orbitale hoofdpijn',
      'Snelle hematocrietstijging met dalende trombocyten'
    ],
    correct: 3,
    uitleg: 'Een snelle Ht-stijging met dalende trombocyten wijst op plasmalekkage en dreigende shock (DSS). Andere waarschuwingssignalen: buikpijn, persisterend braken, vochtaccumulatie, slijmvliesbloeding en lethargie.'
  },
  {
    id: 'q30',
    cat: 'Dengue & VHK',
    q: 'Een reiziger uit India heeft koorts gehad en houdt maandenlang invaliderende gewrichtspijn. Welk arbovirus past hier het best bij?',
    opts: [
      'Denguevirus',
      'Chikungunyavirus',
      'Zikavirus',
      'Japanse-encefalitisvirus'
    ],
    correct: 1,
    uitleg: 'Chikungunya kenmerkt zich door invaliderende artralgie die chronisch kan worden (chronische artritis). Dengue geeft vooral trombopenie en shockrisico, zika een mild beeld met conjunctivitis.'
  },

  // ===== PARASIETEN =====
  {
    id: 'q31',
    cat: 'Parasieten',
    q: 'Wat is het middel van eerste keus bij chronische schistosomiasis door S. mansoni of S. haematobium?',
    opts: [
      'Albendazol',
      'Ivermectine',
      'Praziquantel 40 mg/kg in 2 doses op 1 dag',
      'Metronidazol'
    ],
    correct: 2,
    uitleg: 'Praziquantel 40 mg/kg (in 2 doses op 1 dag) is eerste keus bij S. mansoni en S. haematobium; bij S. japonicum is de dosis 60 mg/kg. Praziquantel werkt alleen tegen volwassen wormen.'
  },
  {
    id: 'q32',
    cat: 'Parasieten',
    q: 'Een militair die in Lake Malawi heeft gezwommen krijgt maanden later terminale hematurie. In de urine worden eieren met een terminale doorn gevonden. Wat is de verwekker?',
    opts: [
      'Schistosoma mansoni',
      'Schistosoma japonicum',
      'Fasciola hepatica',
      'Schistosoma haematobium'
    ],
    correct: 3,
    uitleg: 'S. haematobium veroorzaakt urogenitale schistosomiasis met hematurie; de eieren hebben een terminale doorn (S. mansoni: laterale doorn, in feces). Lake Malawi is de klassieke S. haematobium-hotspot. Chronisch is er risico op blaascarcinoom.'
  },
  {
    id: 'q33',
    cat: 'Parasieten',
    q: 'Waarom wordt bij het Katayama syndroom eerst met corticosteroïden behandeld en de praziquantelkuur na 6-8 weken herhaald?',
    opts: [
      'Omdat praziquantel niet werkt tegen onrijpe wormstadia',
      'Omdat corticosteroïden de wormen doden',
      'Omdat praziquantel in de acute fase levertoxisch is',
      'Omdat de eieren pas na steroïden detecteerbaar worden'
    ],
    correct: 0,
    uitleg: 'Praziquantel doodt alleen volwassen wormen, niet de onrijpe vormen die bij acute schistosomiasis aanwezig zijn. Daarom: eerst steroïden tegen de ontstekingsreactie en de praziquantel na 6-8 weken herhalen.'
  },
  {
    id: 'q34',
    cat: 'Parasieten',
    q: 'Waarom moet vóór het starten van corticosteroïden gescreend worden op Strongyloides stercoralis bij patiënten die in de tropen zijn geweest?',
    opts: [
      'Corticosteroïden maken de fecesdiagnostiek onbetrouwbaar',
      'Vanwege het risico op een hyperinfectiesyndroom met mortaliteit tot 70%',
      'Omdat corticosteroïden de werking van ivermectine blokkeren',
      'Omdat Strongyloides resistent wordt onder corticosteroïden'
    ],
    correct: 1,
    uitleg: 'Door auto-infectie kan Strongyloides decennialang persisteren. Bij immunosuppressie (vooral corticosteroïden) kan een hyperinfectiesyndroom ontstaan met massieve larvale invasie, gramnegatieve sepsis en mortaliteit tot 70%.'
  },
  {
    id: 'q35',
    cat: 'Parasieten',
    q: 'Wat is de eerste keus behandeling van een ongecompliceerde strongyloidiasis bij een volwassene?',
    opts: [
      'Praziquantel 40 mg/kg eenmalig',
      'Mebendazol 100 mg 2dd 3 dagen',
      'Metronidazol 500 mg 3dd 7 dagen',
      'Ivermectine 200 µg/kg op dag 1 en 2'
    ],
    correct: 3,
    uitleg: 'Ivermectine 200 µg/kg op dag 1 en 2 is eerste keus; albendazol 400 mg 2dd 7 dagen is het alternatief. Bij hyperinfectie wordt ivermectine dagelijks gegeven tot minimaal 2 weken na negatieve feces.'
  },
  {
    id: 'q36',
    cat: 'Parasieten',
    q: 'Een reiziger heeft chronische, stinkende waterige diarree met flatulentie en gewichtsverlies; het Giardia-antigeen in feces is positief. Wat is de eerste keus behandeling?',
    opts: [
      'Albendazol 400 mg eenmalig',
      'Paromomycine 500 mg 3dd',
      'Tinidazol 2 g eenmalig',
      'Cotrimoxazol 960 mg 2dd'
    ],
    correct: 2,
    uitleg: 'Tinidazol 2 g eenmalig is eerste keus bij giardiasis (effectiviteit ca. 90%); metronidazol 500 mg 3dd 5-7 dagen is het alternatief (ca. 80%).'
  },
  {
    id: 'q37',
    cat: 'Parasieten',
    q: 'Een patiënt met amoebendysenterie is behandeld met metronidazol. Wat moet daarna nog gebeuren?',
    opts: [
      'Cyste-eradicatie met paromomycine',
      'Niets; metronidazol volstaat',
      'Een tweede kuur metronidazol na 4 weken',
      'Levenslange onderhoudsbehandeling'
    ],
    correct: 0,
    uitleg: 'Metronidazol doodt alleen de trofozoïeten. Daarna is altijd cyste-eradicatie nodig met paromomycine (500 mg 3dd 7-10 dagen) om dragerschap en recidief te voorkomen.'
  },
  {
    id: 'q38',
    cat: 'Parasieten',
    q: 'Waarom mag DEC (diëthylcarbamazine) nooit gegeven worden bij een patiënt met onchocerciasis?',
    opts: [
      'DEC is niet werkzaam tegen filaria',
      'DEC kan een Mazzotti-reactie met acute blindheid veroorzaken',
      'DEC veroorzaakt ernstige levertoxiciteit',
      'DEC maskeert de diagnose bij skin snips'
    ],
    correct: 1,
    uitleg: 'Bij onchocerciasis kan DEC een Mazzotti-reactie veroorzaken met acute blindheid. Ook bij hoge Loa loa-microfilaremie is DEC gevaarlijk (encefalopathie). Screen daarom altijd eerst op co-infecties.'
  },
  {
    id: 'q39',
    cat: 'Parasieten',
    q: 'Waarom moet ivermectine bij onchocerciasis jaarlijks herhaald worden?',
    opts: [
      'Omdat resistentie snel optreedt',
      'Omdat de vector de patiënt telkens opnieuw infecteert',
      'Omdat ivermectine alleen de microfilarieën doodt en niet de volwassen wormen',
      'Omdat ivermectine na een jaar is uitgewerkt in het vetweefsel'
    ],
    correct: 2,
    uitleg: 'Ivermectine (150 µg/kg eenmalig) doodt alleen microfilarieën; de volwassen wormen in de noduli overleven en blijven nieuwe microfilarieën produceren. Doxycycline (anti-Wolbachia) kan de adulte wormen steriliseren en doden.'
  },
  {
    id: 'q40',
    cat: 'Parasieten',
    q: 'Hoe loopt een mens (neuro)cysticercose op?',
    opts: [
      'Door het eten van rauw rundvlees met larven',
      'Door huidpenetratie van larven uit de bodem',
      'Door het eten van rauwe zoetwatervis',
      'Door feco-orale ingestie van eieren van Taenia solium'
    ],
    correct: 3,
    uitleg: 'Cysticercose ontstaat door feco-orale inname van T. solium-eieren, niet door het eten van varkensvlees (dat geeft taeniasis, de darmlintworm). Neurocysticercose is in endemische gebieden de belangrijkste oorzaak van verworven epilepsie.'
  },

  // ===== TBC & HIV =====
  {
    id: 'q41',
    cat: 'TBC & HIV',
    q: 'Welke middelen vormen de initiële fase (eerste 2 maanden) van de tuberculosebehandeling?',
    opts: [
      'Rifampicine, isoniazide, pyrazinamide en ethambutol',
      'Rifampicine en isoniazide',
      'Isoniazide, ethambutol en streptomycine',
      'Rifampicine, dapson en clofazimine'
    ],
    correct: 0,
    uitleg: 'De initiële fase bestaat uit 2 maanden rifampicine, isoniazide (+ vitamine B6), pyrazinamide en ethambutol (RHZE), gevolgd door 4 maanden rifampicine + isoniazide. Rifampicine + dapson ± clofazimine is de MDT voor lepra.'
  },
  {
    id: 'q42',
    cat: 'TBC & HIV',
    q: 'Wat is het voordeel van de GeneXpert MTB/RIF-test bij de diagnostiek van tuberculose?',
    opts: [
      'Het is de gouden standaard die de kweek vervangt',
      'Snelle PCR die tegelijk rifampicineresistentie aantoont',
      'Hij onderscheidt latente van actieve TBC',
      'Hij is bruikbaar als genezingscontrole'
    ],
    correct: 1,
    uitleg: 'GeneXpert MTB/RIF is een snelle PCR die M. tuberculosis én rifampicineresistentie detecteert. De sputumkweek (Löwenstein, 2-8 weken) blijft de gouden standaard; Mantoux/IGRA zijn voor latente TBC.'
  },
  {
    id: 'q43',
    cat: 'TBC & HIV',
    q: 'Een militair heeft 3 weken na onbeschermd seksueel contact in Sub-Sahara Afrika koorts, faryngitis, lymfadenopathie en huiduitslag. Malariadiagnostiek is negatief. Welke diagnose moet je actief uitsluiten?',
    opts: [
      'Secundaire syfilis',
      'Buiktyfus',
      'Viscerale leishmaniasis',
      'Acute HIV-infectie'
    ],
    correct: 3,
    uitleg: 'Het mononucleosis-achtige beeld 2-4 weken na risicocontact past bij een acute HIV-infectie. Denk hieraan bij onverklaarde koorts na een tropenreis; diagnostiek met een HIV-combotest.'
  },
  {
    id: 'q44',
    cat: 'TBC & HIV',
    q: 'Een HIV-patiënt met CD4 <100 heeft koorts, hoofdpijn en focale uitval; MRI toont ring-aankleurende laesies. Wat is de meest waarschijnlijke diagnose en behandeling?',
    opts: [
      'Cryptococcenmeningitis; amfotericine B',
      'Tuberculoom; RHZE',
      'Cerebrale toxoplasmose; pyrimethamine + sulfadiazine + folinezuur',
      'Neurocysticercose; albendazol + corticosteroïden'
    ],
    correct: 2,
    uitleg: 'Ring-enhancing laesies bij HIV met CD4 <100 passen het meest bij cerebrale toxoplasmose. Behandeling: pyrimethamine + sulfadiazine + folinezuur gedurende minimaal 6 weken, daarna onderhoud.'
  },
  {
    id: 'q45',
    cat: 'TBC & HIV',
    q: 'Binnen welke termijn moet HIV post-expositieprofylaxe (PEP) gestart worden en hoe lang duurt de kuur?',
    opts: [
      'Binnen 72 uur (liefst zo snel mogelijk), gedurende 28 dagen',
      'Binnen 1 week, gedurende 14 dagen',
      'Binnen 24 uur, gedurende 3 dagen',
      'Binnen 2 weken, gedurende 6 maanden'
    ],
    correct: 0,
    uitleg: 'PEP is geïndiceerd bij hoog-risicoblootstelling binnen 72 uur, maar moet zo snel mogelijk starten (liefst <2 uur). Schema: TDF/FTC + raltegravir of dolutegravir gedurende 28 dagen.'
  },

  // ===== SOA =====
  {
    id: 'q46',
    cat: 'SOA',
    q: 'Een patiënt heeft een solitair, pijnloos genitaal ulcus met een vaste rand. Welke diagnose is het meest waarschijnlijk?',
    opts: [
      'Chancroid (Haemophilus ducreyi)',
      'Primaire syfilis (ulcus durum)',
      'Herpes genitalis',
      'Lymphogranuloma venereum'
    ],
    correct: 1,
    uitleg: 'Het pijnloze ulcus durum is kenmerkend voor primaire syfilis (Treponema pallidum). Chancroid geeft juist een pijnlijk ulcus met inguinale bubonen; LGV begint met een kleine papel gevolgd door pijnlijke inguinale lymfadenopathie.'
  },
  {
    id: 'q47',
    cat: 'SOA',
    q: 'Wat is de behandeling van eerste keus bij vroege syfilis?',
    opts: [
      'Azitromycine 1 g eenmalig oraal',
      'Doxycycline 100 mg 2dd 21 dagen',
      'Benzathine penicilline G 2.4 miljoen eenheden IM',
      'Ceftriaxon 500 mg IM eenmalig'
    ],
    correct: 2,
    uitleg: 'Syfilis wordt behandeld met benzathine penicilline G 2.4 MU intramusculair. Doxycycline 21 dagen is de behandeling van LGV; ceftriaxon + azitromycine is het regime voor urethritis (gonorroe/chlamydia).'
  },
  {
    id: 'q48',
    cat: 'SOA',
    q: 'Welke verwekker veroorzaakt lymphogranuloma venereum (LGV), met het "groove sign" als kenmerk?',
    opts: [
      'Haemophilus ducreyi',
      'Treponema pallidum',
      'Neisseria gonorrhoeae',
      'Chlamydia trachomatis (serovar L1-3)'
    ],
    correct: 3,
    uitleg: 'LGV wordt veroorzaakt door Chlamydia trachomatis serovar L1-3: een kleine papel gevolgd door pijnlijke inguinale lymfadenopathie ("groove sign"). Behandeling: doxycycline 100 mg 2dd gedurende 21 dagen.'
  },

  // ===== OVERIG =====
  {
    id: 'q49',
    cat: 'Overig',
    q: 'Een militair heeft na wadend werk in overstroomd gebied in Sri Lanka koorts, icterus en een gestoorde nierfunctie. Wat is de meest waarschijnlijke diagnose?',
    opts: [
      'Leptospirose (ziekte van Weil)',
      'Gele koorts',
      'Amoebenleverabces',
      'Hepatitis A'
    ],
    correct: 0,
    uitleg: 'De trias koorts, icterus en nierfalen na zoetwater-/modderexpositie past bij het syndroom van Weil (leptospirose). Transmissie verloopt via water dat besmet is met urine van knaagdieren; risico stijgt na overstromingen.'
  },
  {
    id: 'q50',
    cat: 'Overig',
    q: 'Wat is de empirische behandeling van eerste keus bij leptospirose?',
    opts: [
      'Metronidazol 750 mg 3dd 10 dagen',
      'Azitromycine 1 g eenmalig',
      'Doxycycline 100 mg 2dd 7 dagen',
      'Ivermectine 200 µg/kg eenmalig'
    ],
    correct: 2,
    uitleg: 'Doxycycline 100 mg 2dd gedurende 7 dagen is eerste keus bij leptospirose; penicilline G is het alternatief. Doxycycline dekt ook rickettsiose, een belangrijke differentiaaldiagnose.'
  },
  {
    id: 'q51',
    cat: 'Overig',
    q: 'Babesiose wordt overgebracht door de Ixodes-teek (dezelfde vector als Lyme). Bij welke patiëntengroep kan babesiose ernstig verlopen?',
    opts: [
      'Kinderen onder de 5 jaar',
      'Patiënten met asplenie',
      'Zwangeren in het eerste trimester',
      'Patiënten met G6PD-deficiëntie'
    ],
    correct: 1,
    uitleg: 'Babesiose (malaria-achtig beeld met hemolytische anemie, "Maltese cross" in de uitstrijk) kan ernstig verlopen bij asplenie, immuungecompromitteerden en ouderen. Co-infectie met Lyme en anaplasmose is mogelijk via dezelfde teek.'
  },

  // ===== DIAGNOSTIEK & PREVENTIE =====
  {
    id: 'q52',
    cat: 'Diagnostiek & Preventie',
    q: 'Waarom wordt bij parasitologisch fecesonderzoek standaard 3x feces op verschillende dagen afgenomen (triple feces)?',
    opts: [
      'Om laboratoriumfouten uit te sluiten',
      'Omdat de eieren binnen enkele uren afbreken',
      'Omdat elk monster op een andere parasiet wordt getest',
      'Vanwege intermitterende uitscheiding van parasieten'
    ],
    correct: 3,
    uitleg: 'Parasieten worden intermitterend uitgescheiden; één monster kan vals-negatief zijn (bijv. Strongyloides: 1x feces ~30% sensitief, 3x 50-70%). Daarom 3 monsters op verschillende dagen, met concentratietechnieken.'
  },
  {
    id: 'q53',
    cat: 'Diagnostiek & Preventie',
    q: 'Wat is bij de Giemsa-kleuring het essentiële verschil in preparatie tussen de dikke en de dunne druppel?',
    opts: [
      'De dikke druppel wordt NIET met methanol gefixeerd, zodat de erytrocyten lyseren',
      'De dikke druppel wordt langer gekleurd dan de dunne',
      'De dunne druppel wordt niet gefixeerd om parasieten zichtbaar te maken',
      'De dikke druppel wordt bij lagere vergroting beoordeeld'
    ],
    correct: 0,
    uitleg: 'De dikke druppel wordt bewust niet gefixeerd zodat de erytrocyten lyseren en parasieten geconcentreerd zichtbaar worden (sensitief, maar soortbepaling lastiger). De dunne uitstrijk wordt juist met methanol gefixeerd voor speciesdifferentiatie.'
  },
  {
    id: 'q54',
    cat: 'Diagnostiek & Preventie',
    q: 'Waar staat de ABCD-regel van malariapreventie voor?',
    opts: [
      'Antibiotica, Bloedonderzoek, Chloroquine, DEET',
      'Awareness, Bed nets, Chloroquine, Doxycycline',
      'Awareness, Bite prevention, Chemoprophylaxis, Diagnosis',
      'Anamnese, Bloeddruk, Circulatie, Diagnostiek'
    ],
    correct: 2,
    uitleg: 'De ABCD-regel: Awareness (bewustzijn van risico), Bite prevention (muggenbeten voorkomen), Chemoprophylaxis (medicamenteuze preventie) en Diagnosis (snelle diagnose bij koorts).'
  },
  {
    id: 'q55',
    cat: 'Diagnostiek & Preventie',
    q: 'Een militair gebruikt atovaquon-proguanil (Malarone) als malariaprofylaxe. Hoe lang moet dit na terugkeer uit het malariagebied worden doorgebruikt?',
    opts: [
      'Stoppen op de dag van vertrek',
      'Nog 4 weken na terugkeer',
      'Nog 3 maanden na terugkeer',
      'Nog 7 dagen na terugkeer'
    ],
    correct: 3,
    uitleg: 'Atovaquon-proguanil: dagelijks, starten 1-2 dagen voor vertrek en doorgaan tot 7 dagen na terugkeer. Mefloquine (wekelijks) en doxycycline (dagelijks) moeten juist 4 weken na terugkeer worden doorgebruikt.'
  },
  {
    id: 'q56',
    cat: 'Diagnostiek & Preventie',
    q: 'Welk reizigersvaccin is gecontra-indiceerd bij een patiënt met ernstige immunosuppressie?',
    opts: [
      'Hepatitis A-vaccin',
      'Gele koorts-vaccin',
      'Buiktyfus Vi-polysacharidevaccin (parenteraal)',
      'Meningokokken ACWY-vaccin'
    ],
    correct: 1,
    uitleg: 'Bij immunosuppressie zijn levende vaccins gecontra-indiceerd: gele koorts, orale tyfus (Vivotif) en BCG. Het parenterale Vi-polysacharidevaccin en de geïnactiveerde vaccins kunnen wel.'
  },
  {
    id: 'q57',
    cat: 'Diagnostiek & Preventie',
    q: 'Een militair heeft 2 weken geleden in Afrika in zoet water gezwommen en wil zich laten testen op schistosomiasis. Waarom is serologie op dit moment nog niet zinvol?',
    opts: [
      'Serologie is nooit zinvol bij schistosomiasis',
      'De test is alleen betrouwbaar bij klachten',
      'De serologie wordt pas 6-8 weken na expositie positief',
      'Eerst moet een urinekweek worden afgenomen'
    ],
    correct: 2,
    uitleg: 'Schistosoma-serologie wordt pas 6-8 weken na expositie positief; eerder testen geeft vals-negatieve uitslagen. Elke zoetwaterexpositie in Afrika is een indicatie om schistosomiasis uit te sluiten, al bij 10 minuten waden.'
  }
];
