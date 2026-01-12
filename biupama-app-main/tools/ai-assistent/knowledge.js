// Knowledge Base voor Tropengeneeskunde AI Assistent
// Gebaseerd op BIUPAMA.md content

const knowledgeBase = [
  // ============================================
  // KLACHTGESTUURDE BENADERING
  // ============================================
  {
    id: 'koorts',
    title: 'Koorts',
    category: 'Klachtgestuurd',
    keywords: ['koorts', 'temperatuur', 'fever', 'incubatietijd', 'malaria', 'dengue', 'buiktyfus', 'anamnese', 'tropen', 'reisanamnese', 'dikke druppel', 'bloeduitstrijk'],
    summary: 'Koorts na tropenverblijf: systematische benadering met focus op incubatietijden en differentiaaldiagnose.',
    content: `## Koorts na Tropenverblijf

### Definitie
Lichaamstemperatuur >38.0°C (rectaal) of >37.5°C (oraal/axillair)

### ALTIJD uitsluiten: MALARIA
Elke koorts na malariagebied is malaria tot het tegendeel bewezen!

### Incubatietijden
| Periode | Ziektebeelden |
|---------|---------------|
| < 10 dagen | Dengue, Chikungunya, Rickettsiose, VHF |
| 10-21 dagen | Malaria (falciparum), Buiktyfus, Leptospirose, Acute schistosomiasis |
| > 21 dagen | Malaria (vivax/ovale/malariae), TBC, Leishmaniasis, Amoebenabces |
| Maanden-jaren | HIV, Hepatitis B/C, Strongyloidiasis, Filariasis |

### Koortspatronen
- **Continu**: Buiktyfus, TBC
- **Intermitterend**: Malaria, abces
- **Tertiana (48u)**: P. vivax, P. ovale
- **Quartana (72u)**: P. malariae
- **Bifasisch (zadeldak)**: Dengue

### Diagnostisch Algoritme
KOORTS NA TROPEN:
- + Trombopenie → Malaria, Dengue, Rickettsia
- + Eosinofilie → Helminth (weefselfase)
- + Icterus → Malaria, Leptospirose, Hepatitis
- + Lymfadenopathie → HIV, TBC, Leishmaniasis
- + Splenomegalie → Malaria, Buiktyfus, Leishmaniasis
- + Eschar → Rickettsia
- + Hemorrhagie → Dengue, VHF

### Aanvullend Onderzoek Eerste Lijn
- Dikke druppel + bloeduitstrijk (ALTIJD bij malariagebied)
- Malaria sneltest (RDT)
- Bloedbeeld (leuko's, trombo's, eosinofilie)
- Leverenzymen, nierfunctie, CRP`
  },

  {
    id: 'diarree',
    title: 'Diarree',
    category: 'Klachtgestuurd',
    keywords: ['diarree', 'reizigersdiarree', 'dysenterie', 'giardia', 'amoebe', 'shigella', 'waterig', 'bloederig', 'ors', 'azitromycine', 'metronidazol', 'dehydratie'],
    summary: 'Diarree bij reizigers: classificatie, differentiaaldiagnose en behandeling.',
    content: `## Diarree

### Definitie
≥3 dunne/waterige ontlastingen per 24 uur

### Classificatie
| Type | Duur | Oorzaken |
|------|------|----------|
| Acuut | < 2 weken | Infectieus (90%), toxines |
| Persisterend | 2-4 weken | Giardia, Cryptosporidium |
| Chronisch | > 4 weken | Parasitair, inflammatoir |

### Waterig vs. Bloederig
**Waterig (dunne darm):**
- ETEC (reizigersdiarree #1)
- Vibrio cholerae
- Norovirus, Rotavirus
- Giardia, Cryptosporidium

**Bloederig/Dysenterie (dikke darm):**
- Shigella, Campylobacter, Salmonella
- Entamoeba histolytica
- C. difficile (na antibiotica)

### Alarmsymptomen
- Bloederige diarree
- Koorts >38.5°C
- Ernstige dehydratie
- Diarree >7 dagen
- Immuungecompromitteerd

### Behandeling
**Rehydratie (hoeksteen):**
ORS: Na 60-90 mmol/L, glucose, K+

**Medicamenteus:**
| Middel | Indicatie | Dosering |
|--------|-----------|----------|
| Azitromycine | Empirisch | 1000mg eenmalig of 500mg 1dd 3d |
| Metronidazol | Giardia | 2g 1dd 3 dagen |
| Metronidazol | Amoebe | 750mg 3dd 5-10 dagen |
| Loperamide | Symptomatisch (niet bij dysenterie!) | 4mg start, 2mg per ontlasting |

### Preventie
"Cook it, boil it, peel it, or forget it"`
  },

  {
    id: 'huidafwijkingen',
    title: 'Huidafwijkingen',
    category: 'Klachtgestuurd',
    keywords: ['huid', 'clm', 'cutaneous larva migrans', 'larva currens', 'leishmaniasis', 'myiasis', 'tungiasis', 'ulcus', 'nodulus', 'serpigineus', 'jeuk', 'hookworm', 'strongyloides', 'ivermectine', 'albendazol'],
    summary: 'Huidafwijkingen na tropenverblijf: van migrerende laesies tot ulcera.',
    content: `## Huidafwijkingen

### Systematiek
| Categorie | Voorbeelden |
|-----------|-------------|
| Migrerende laesies | CLM, larva currens |
| Ulcera | Leishmaniasis, mycobacteriën |
| Noduli | Onchocerciasis, myiasis |
| Uitslag + koorts | Dengue, rickettsiose |

### Cutaneous Larva Migrans (CLM)
**Verwekker:** Hondenhookworm (Ancylostoma braziliense)
**Transmissie:** Gecontamineerd zand (stranden!)
**Kliniek:** Intensief jeukende, kronkelende erythemateuze lijnen

**Behandeling:**
| Middel | Dosering |
|--------|----------|
| 1e keus: Ivermectine | 200 µg/kg eenmalig |
| Alternatief: Albendazol | 400 mg 1dd 3 dagen |

*Cryotherapie is NIET effectief!*

### Larva Currens
**Verwekker:** Strongyloides stercoralis
**Kliniek:** SNELLE migrerende lijn (5-10 cm/uur), vaak perianaal
**Cave:** Auto-infectie, hyperinfectie bij immunosuppressie
**Behandeling:** Ivermectine 200 µg/kg eenmalig

### Cutane Leishmaniasis
**Verwekker:** Leishmania spp.
**Vector:** Zandvlieg
**Kliniek:** Pijnloze papel → nodulus → ulcus met opgeworpen rand
**Diagnose:** Biopt, kweek, PCR (species-identificatie belangrijk!)

**Behandeling afhankelijk van species:**
- Kleine laesies Oude Wereld: expectatief of lokaal
- Meerdere/grote laesies: Liposomaal amfotericine B
- L. braziliensis (mucocutaan risico): ALTIJD systemisch

### Myiasis
**Definitie:** Infestatie met vliegenlarven
**Kliniek:** Pijnlijke nodulus met centrale opening
**Behandeling:** Extractie (afsluiten met vaseline)

### Tungiasis (Zandvlo)
**Verwekker:** Tunga penetrans
**Behandeling:** Steriele extractie`
  },

  {
    id: 'eosinofilie',
    title: 'Eosinofilie',
    category: 'Klachtgestuurd',
    keywords: ['eosinofilie', 'eosinofielen', 'helminth', 'worm', 'strongyloides', 'schistosoma', 'filaria', 'toxocara', 'ascaris', 'katayama', 'löffler', 'tpe', 'tropische pulmonale eosinofilie'],
    summary: 'Eosinofilie: denk aan weefselinvasieve helminthen.',
    content: `## Eosinofilie

### Definitie
| Graad | Eosinofielen |
|-------|--------------|
| Normaal | < 400-500 × 10⁶/L |
| Mild | 500 - 1500 × 10⁶/L |
| Matig | 1500 - 5000 × 10⁶/L |
| Ernstig | > 5000 × 10⁶/L |

### Belangrijkste tropische oorzaak: HELMINTHEN
Alleen weefselinvasieve helminthen geven eosinofilie!

| Parasiet | Eosinofilie |
|----------|-------------|
| Strongyloides | +++ |
| Schistosoma (acuut) | +++ |
| Filaria (TPE) | +++ |
| Toxocara | +++ |
| Ascaris (migratie) | ++ |
| Hookworm (migratie) | ++ |

### CAVE
Protozoa (Malaria, Amoebe, Giardia) geven NOOIT eosinofilie!

### Specifieke Syndromen

**Löffler Syndroom:**
- Passerende pulmonale infiltraten
- Door longmigratie larven (Ascaris, hookworm)
- Zelflimiterend

**Tropische Pulmonale Eosinofilie (TPE):**
- Filaria (W. bancrofti, Brugia)
- Nachtelijke hoest/piepen, ernstige eosinofilie
- Geen microfilarieën in bloed!
- Behandeling: DEC 3dd 2mg/kg 14-21 dagen

**Katayama Syndroom:**
- Acute schistosomiasis (4-7 weken na expositie)
- Koorts, eosinofilie, urticaria
- Bij eerste blootstelling (niet-immune reizigers)

### Diagnostisch Algoritme
Bij eosinofilie > 500 + reisanamnese:
1. Stool O&P (3x)
2. Serologieën: Schistosoma, Filaria, Strongyloides, Toxocara
3. Bij hoge verdenking + negatief: empirische therapie albendazol`
  },

  {
    id: 'icterus',
    title: 'Geelzucht (Icterus)',
    category: 'Klachtgestuurd',
    keywords: ['icterus', 'geelzucht', 'bilirubine', 'hepatitis', 'hemolyse', 'malaria', 'leptospirose', 'gele koorts', 'lever', 'galwegen'],
    summary: 'Icterus na tropenverblijf: van hemolyse tot hepatitis.',
    content: `## Geelzucht (Icterus)

### Definitie
Gele verkleuring huid/sclerae door verhoogd bilirubine (> 40-50 µmol/L)

### Classificatie
| Type | Bilirubine | Oorzaken |
|------|------------|----------|
| Pre-hepatisch | Ongeconjugeerd ↑ | Hemolyse (malaria!), Gilbert |
| Hepatocellulair | Beide ↑ | Hepatitis, cirrose |
| Post-hepatisch | Geconjugeerd ↑ | Galstenen, tumor, parasitair |

### Differentiaaldiagnose Tropen

**Infectieus:**
- Virale hepatitis (A, B, C, E)
- Malaria (hemolyse)
- Leptospirose (Weil)
- Gele koorts
- Amoebenabces
- Fasciola/Clonorchis (galwegen)

**Niet-infectieus:**
- G6PD-deficiëntie + trigger
- Sikkelcelcrisis
- Medicamenteus (rifampicine, isoniazide)

### Lichamelijk Onderzoek
| Bevinding | Betekenis |
|-----------|-----------|
| Pijnlijke hepatomegalie | Hepatitis, amoebenabces |
| Harde lever | Cirrose, maligniteit |
| Splenomegalie | Malaria, buiktyfus, portale hypertensie |
| Koorts | Infectieuze genese |

### Aanvullend Onderzoek
- Bilirubine (totaal + direct)
- ALT, AST, AF, γGT
- LDH, haptoglobine, reticulocyten (hemolyse)
- Dikke druppel
- Hepatitis serologie
- Echo abdomen`
  },

  {
    id: 'hepatosplenomegalie',
    title: 'Hepatosplenomegalie',
    category: 'Klachtgestuurd',
    keywords: ['hepatomegalie', 'splenomegalie', 'lever', 'milt', 'kala-azar', 'leishmaniasis', 'malaria', 'buiktyfus', 'schistosomiasis'],
    summary: 'Hepatosplenomegalie: van acute infecties tot chronische parasitaire ziekten.',
    content: `## Hepatosplenomegalie

### Oorzaken in de Tropen
| Acuut | Chronisch |
|-------|-----------|
| Malaria | Schistosomiasis |
| Buiktyfus | Viscerale leishmaniasis |
| Virale hepatitis | Hyperreactieve malariale splenomegalie |
| Leptospirose | Cirrose |
| Amoebenabces | Sikkelcelziekte |

### Viscerale Leishmaniasis (Kala-azar)
**Verwekker:** Leishmania donovani complex
**Verspreiding:** Indisch subcontinent, Oost-Afrika, Brazilië, Middellandse Zee

**Kliniek:**
- Langdurige koorts
- ENORME splenomegalie
- Hepatomegalie
- Pancytopenie
- Gewichtsverlies
- Hyperpigmentatie ("zwarte koorts")

**Diagnose:** Beenmerg/miltpunctie (amastigoten), serologie (rK39), PCR

**Behandeling:**
| Regio | 1e keus |
|-------|---------|
| Indisch subcontinent | Liposomaal amfotericine B 10 mg/kg totaal |
| Oost-Afrika | Liposomaal amfotericine B 20-30 mg/kg totaal |
| HIV-geassocieerd | Liposomaal amfotericine B 40 mg/kg + secundaire profylaxe |

*100% fataal zonder behandeling!*

### Hyperreactieve Malariale Splenomegalie (HMS)
- Chronische hyperimmune reactie op malaria
- Massieve splenomegalie
- Hoge IgM
- Behandeling: langdurige malariaprofylaxe`
  },

  {
    id: 'neurologisch',
    title: 'Neurologische Klachten',
    category: 'Klachtgestuurd',
    keywords: ['neurologie', 'meningitis', 'encefalitis', 'cerebrale malaria', 'neurocysticercose', 'epilepsie', 'coma', 'gcs', 'convulsies', 'toxoplasmose', 'cryptococcen'],
    summary: 'Neurologische klachten na tropenverblijf: van meningitis tot cerebrale malaria.',
    content: `## Neurologische Klachten

### Differentiaaldiagnose
| Syndroom | Oorzaken |
|----------|----------|
| Meningitis | Bacterieel, TBC, Cryptococcen (HIV), viraal |
| Encefalitis | Japanse encefalitis, rabiës, cerebrale malaria |
| Focale laesie | Neurocysticercose, toxoplasmose (HIV), TBC |
| Myelitis | Schistosomiasis, HTLV-1 |

### Cerebrale Malaria
**Definitie:** P. falciparum met coma (GCS ≤11) zonder andere oorzaak

**Pathofysiologie:** Sekwestratie parasitaire erytrocyten in cerebrale capillairen

**Kliniek:**
- Bewustzijnsdaling
- Convulsies
- Decorticatie/decerebratie
- Retinale bloedingen

**Behandeling:** IV artesunaat, IC-bewaking, hypoglycemie behandelen

### Neurocysticercose
**Verwekker:** Larven Taenia solium (varkenstapeworm)
**Transmissie:** Feco-oraal (eieren), NIET door varkensvlees!
**Kliniek:** Epilepsie (#1 oorzaak verworven epilepsie endemisch), hoofdpijn

**Diagnose:** CT/MRI (cysten, calcificaties), serologie

**Behandeling:**
| Type | Behandeling |
|------|-------------|
| Solitaire cyste | Albendazol 15 mg/kg/dag 10-14 dagen + dexamethason |
| Meerdere cysten | Albendazol + praziquantel |
| Calcificaties alleen | Geen antiparasitair, alleen anti-epileptica |

*ALTIJD corticosteroïden VÓÓR antiparasitaire therapie!*`
  },

  // ============================================
  // ZIEKTEBEELDEN
  // ============================================
  {
    id: 'malaria',
    title: 'Malaria',
    category: 'Ziektebeeld',
    keywords: ['malaria', 'plasmodium', 'falciparum', 'vivax', 'ovale', 'malariae', 'knowlesi', 'anopheles', 'koorts', 'riamet', 'artemether', 'lumefantrine', 'artesunaat', 'chloroquine', 'primaquine', 'dikke druppel', 'parasitemie', 'hypnozoiet', 'tertiana', 'quartana', 'cerebraal'],
    summary: 'Malaria: de belangrijkste tropische infectieziekte met potentieel fataal beloop.',
    content: `## Malaria

### Epidemiologie
- 240+ miljoen cases/jaar, >600.000 doden
- Transmissie: Anopheles mug (schemering/nacht)

### Plasmodium Soorten
| Soort | Incubatie | Kenmerk | Ernst |
|-------|-----------|---------|-------|
| P. falciparum | 7-14 d | Geen hypnozoïeten, hoge parasitemie | ERNSTIG/FATAAL |
| P. vivax | 12-17 d | Hypnozoïeten, tertiana | Mild-matig |
| P. ovale | 15-18 d | Hypnozoïeten, tertiana | Mild |
| P. malariae | 18-40 d | Quartana | Mild |
| P. knowlesi | 9-12 d | Dagelijks (24u), ZO-Azië | Potentieel ernstig |

### WHO-criteria Gecompliceerde Malaria
- Cerebrale malaria (GCS ≤11)
- Ernstige anemie (Hb <5 g/dL)
- Acute nierinsufficiëntie
- ARDS
- Hypoglycemie (<2.2 mmol/L)
- Hyperparasitemie (>10%)
- Shock, acidose, DIC

### Diagnostiek
| Test | Kenmerken |
|------|-----------|
| Dikke druppel | Gouden standaard |
| Bloeduitstrijk | Species, parasitemie-% |
| RDT (sneltest) | HRP2, pLDH |

Bij negatief: herhalen na 8-12 uur!

### Behandeling

**P. falciparum - Ongecompliceerd:**
| Middel | Dosering |
|--------|----------|
| 1e keus: Riamet® | 4 tab op t=0,8,24,36,48,60u (met vetrijk voedsel) |
| Alt: Malarone® | 4 tab 1dd 3 dagen |

**P. falciparum - Gecompliceerd:**
- Artesunaat IV 2.4 mg/kg op t=0, 12, 24u, daarna elke 24u
- IC-opname, monitor glucose/Hb/parasitemie

**P. vivax/ovale:**
- Chloroquine 600mg dag 1, 300mg dag 2-3
- + Primaquine 0.25-0.5 mg/kg 14 dagen (G6PD bepalen!)

**P. knowlesi:**
- Behandel als P. falciparum (kan snel verslechteren)`
  },

  {
    id: 'buiktyfus',
    title: 'Buiktyfus',
    category: 'Ziektebeeld',
    keywords: ['buiktyfus', 'tyfus', 'typhoid', 'salmonella', 'typhi', 'paratyphi', 'stepladder', 'bradycardie', 'roseolae', 'perforatie', 'azitromycine', 'ceftriaxon'],
    summary: 'Buiktyfus: feco-orale transmissie met karakteristieke geleidelijke koorts.',
    content: `## Buiktyfus (Typhoid Fever)

### Verwekker
Salmonella enterica serovar Typhi
Verwant: S. Paratyphi A, B, C

### Epidemiologie
- Feco-orale transmissie
- Endemisch: Zuid-Azië, Afrika, Latijns-Amerika
- Incubatie: 7-21 dagen (gem. 10-14)

### Kliniek per Week
| Week | Symptomen |
|------|-----------|
| Week 1 | Geleidelijk stijgende koorts, hoofdpijn, malaise, obstipatie |
| Week 2 | Continue koorts (39-40°C), roseolae, hepatosplenomegalie |
| Week 3-4 | Complicaties: perforatie, bloeding, encefalopathie |

### Typische Bevindingen
- "Stepladder fever" - geleidelijk stijgend
- Relatieve bradycardie (pols past niet bij koorts)
- Roseolae - bleke vlekjes op romp
- Coated tongue
- Hepatosplenomegalie

### Diagnostiek
- Bloedkweek (gouden standaard, week 1-2)
- Beenmergkweek (hoogste sensitiviteit)
- Feceskweek (positief week 3-4)
- Widal-test (beperkte waarde)

### Behandeling
| Setting | 1e keus | Alternatief |
|---------|---------|-------------|
| Ongecompliceerd | Azitromycine 1g dag 1, 500mg dag 2-7 | Ciprofloxacine 500mg 2dd 7-14d |
| Ernstig/complicaties | Ceftriaxon 2g IV 1dd 10-14d | |

*Cave: toenemende resistentie fluoroquinolonen Zuid-Azië!*

### Complicaties
- Darmperforatie (3e week)
- Darmbloeding
- Typhoid encefalopathie
- Chronisch dragerschap (1-4%)`
  },

  {
    id: 'dengue',
    title: 'Dengue',
    category: 'Ziektebeeld',
    keywords: ['dengue', 'breakbone', 'aedes', 'arbovirus', 'flavivirus', 'trombopenie', 'ns1', 'hemorrhagisch', 'shock', 'bifasisch', 'zadeldak', 'warning signs'],
    summary: 'Dengue: meest voorkomende arbovirus met kenmerkende trombopenie.',
    content: `## Dengue

### Verwekker
Dengue virus (flavivirus), 4 serotypen

### Epidemiologie
- Vector: Aedes aegypti/albopictus (dagbijter!)
- Incubatie: 4-7 dagen
- Verspreiding: tropen/subtropen wereldwijd

### Kliniek

**Klassieke Dengue:**
- Hoge koorts
- Ernstige hoofdpijn, retro-orbitale pijn
- Myalgie/artralgie ("breakbone fever")
- Uitslag (maculopapulair, dag 3-4)
- Trombopenie, leukopenie

**Bifasisch beloop (zadeldak):**
Koorts → afebriel (dag 3-7) → evt. 2e piek

### Warning Signs (kritieke fase)
- Buikpijn
- Aanhoudend braken
- Vochtophoping (ascites, pleuravocht)
- Slijmvliesbloedingen
- Lethargie
- Lever >2cm onder ribbenboog
- Stijging Ht met daling trombo's

### Ernstige Dengue
- Shock (dengue shock syndrome)
- Ernstige bloeding
- Orgaanfalen

### Diagnostiek
| Test | Timing |
|------|--------|
| NS1-antigeen | Dag 1-7 (acuut) |
| IgM | Vanaf dag 5 |
| IgG | Vanaf dag 7, eerder bij secundaire infectie |

### Behandeling
Ondersteunend! Geen specifieke antivirale therapie.
- Vocht (cave: overvulling)
- Paracetamol (GEEN NSAIDs/aspirine!)
- Monitor voor warning signs
- IC bij shock/ernstige dengue`
  },

  {
    id: 'schistosomiasis',
    title: 'Schistosomiasis',
    category: 'Ziektebeeld',
    keywords: ['schistosomiasis', 'bilharzia', 'schistosoma', 'haematobium', 'mansoni', 'japonicum', 'katayama', 'zoetwater', 'cercariën', 'praziquantel', 'eosinofilie', 'hematurie', 'portale hypertensie'],
    summary: 'Schistosomiasis: zoetwater-transmissie met acute (Katayama) en chronische manifestaties.',
    content: `## Schistosomiasis (Bilharzia)

### Verwekker & Verspreiding
| Species | Verspreiding | Target orgaan |
|---------|--------------|---------------|
| S. haematobium | Afrika, Midden-Oosten | Blaas/urogenitaal |
| S. mansoni | Afrika, Latijns-Amerika | Darm, lever |
| S. japonicum | Azië | Darm, lever |

### Transmissie
- Contact zoetwater met cercariën
- Penetratie huid (minuten)
- Bekende hotspots: Lake Malawi, Nijl

### Levenscyclus Samengevat
Cercariën → huid → schistosomula → longpassage → portale venen → pairing → eieren in weefsel

### Kliniek

**Acute fase (Katayama syndroom):**
- 4-7 weken na expositie
- Koorts, eosinofilie, urticaria, hoesten
- Vooral bij eerste blootstelling (niet-immuun)

**Chronische fase:**
| S. haematobium | S. mansoni/japonicum |
|----------------|----------------------|
| Hematurie | Diarree, buikpijn |
| Hydronefrose | Hepatosplenomegalie |
| Blaascarcinoom | Portale hypertensie |

### Diagnostiek
| Test | Timing |
|------|--------|
| Serologie | Positief na 6-8 weken |
| Eieren in urine/feces | Pas na 2-3 maanden |
| Biopt (blaas/rectum) | Bij twijfel |

### Behandeling
**Praziquantel** 40 mg/kg (S. haematobium/mansoni) of 60 mg/kg (S. japonicum) in 1-2 doses

**Cave Katayama:**
- Praziquantel doodt alleen volwassen wormen
- Bij acuut: eerst corticosteroïden, praziquantel herhalen na 6-8 weken`
  },

  {
    id: 'strongyloidiasis',
    title: 'Strongyloidiasis',
    category: 'Ziektebeeld',
    keywords: ['strongyloides', 'stercoralis', 'larva currens', 'auto-infectie', 'hyperinfectie', 'immunosuppressie', 'ivermectine', 'eosinofilie', 'disseminatie'],
    summary: 'Strongyloidiasis: unieke auto-infectie met risico op fatale hyperinfectie.',
    content: `## Strongyloidiasis

### Verwekker
Strongyloides stercoralis

### Transmissie
- Huidpenetratie larven uit bodem
- UNIEK: auto-infectie (kan decennia persisteren!)

### Levenscyclus
Filariform larven → huid → long → darm → eieren → rhabditiforme larven → feces OF auto-infectie

### Kliniek

**Acute infectie:**
- Lokale huidreactie
- Löffler syndroom (longpassage)
- Buikklachten

**Chronische infectie:**
- Vaak asymptomatisch
- Intermitterende buikklachten
- Larva currens (snelle urticariële lijn, perianaal)
- Persisterende eosinofilie

**Hyperinfectiesyndroom:**
Bij immunosuppressie (corticosteroïden, HTLV-1, transplantatie):
- Massale disseminatie
- Gram-negatieve sepsis
- ARDS
- Meningitis
- Hoge mortaliteit!

### Diagnostiek
- Feces O&P (lage sensitiviteit, 3x herhalen)
- Serologie (Strongyloides IgG)
- Sputum/BAL bij hyperinfectie

### Behandeling
| Setting | Middel | Dosering |
|---------|--------|----------|
| Ongecompliceerd | Ivermectine | 200 µg/kg dag 1 en 2 |
| Hyperinfectie | Ivermectine | Dagelijks tot negatief |

**Belangrijk:**
- Screenen VÓÓR immunosuppressie bij risico
- Behandelen voordat corticosteroïden/chemo starten`
  },

  {
    id: 'darmparasieten',
    title: 'Darmparasieten',
    category: 'Ziektebeeld',
    keywords: ['darmparasiet', 'giardia', 'amoebe', 'entamoeba', 'ascaris', 'hookworm', 'trichuris', 'enterobius', 'albendazol', 'mebendazol', 'metronidazol'],
    summary: 'Overzicht darmparasieten: van protozoa tot helminthen.',
    content: `## Darmparasieten

### Protozoa

**Giardia lamblia:**
- Transmissie: feco-oraal (water!)
- Kliniek: waterige diarree, malabsorptie, opgeblazen gevoel
- Diagnose: Giardia-antigeen feces, microscopie
- Behandeling: Metronidazol 2g 1dd 3 dagen of Tinidazol 2g eenmalig

**Entamoeba histolytica:**
- Transmissie: feco-oraal
- Kliniek: dysenterie, leverabces
- Diagnose: Feces O&P, PCR, serologie (abces)
- Behandeling:
  - Invasief: Metronidazol 750mg 3dd 5-10 dagen
  - Cyste-eliminatie: Paromomycine 500mg 3dd 7 dagen

### Helminthen (Nematoden)

**Ascaris lumbricoides:**
- Transmissie: feco-oraal
- Kliniek: Löffler (migratie), darmobstructie
- Behandeling: Albendazol 400mg eenmalig

**Hookworm (Ancylostoma/Necator):**
- Transmissie: huidpenetratie (bodem)
- Kliniek: ijzergebreksanemie
- Behandeling: Albendazol 400mg eenmalig

**Trichuris trichiura:**
- Transmissie: feco-oraal
- Kliniek: dysenterie, rectumprolaps
- Behandeling: Albendazol 400mg 1dd 3 dagen

**Enterobius vermicularis (Aarsmade):**
- Transmissie: feco-oraal (auto-infectie)
- Kliniek: perianale jeuk (nachtelijk)
- Diagnose: Plakbandtest
- Behandeling: Mebendazol 100mg, herhaal na 2 weken

### Algemeen Behandelschema
| Parasiet | 1e keus |
|----------|---------|
| Nematoden (darm) | Albendazol 400mg |
| Giardia | Metronidazol of Tinidazol |
| Amoebe | Metronidazol + Paromomycine |`
  },

  {
    id: 'filariasis',
    title: 'Filariasis',
    category: 'Ziektebeeld',
    keywords: ['filariasis', 'wuchereria', 'brugia', 'loa', 'onchocerca', 'elephantiasis', 'lymfoedeem', 'microfilariën', 'ivermectine', 'dec', 'diethylcarbamazine', 'calabar', 'riverblindness'],
    summary: 'Filariasis: lymfatisch, loiasis en onchocerciasis.',
    content: `## Filariasis

### Overzicht
| Type | Verwekker | Vector | Kliniek |
|------|-----------|--------|---------|
| Lymfatisch | Wuchereria/Brugia | Mug | Lymfoedeem, elephantiasis |
| Loiasis | Loa loa | Daas (Chrysops) | Calabar zwelling, oogworm |
| Onchocerciasis | Onchocerca volvulus | Blackfly | Huidjeuk, noduli, blindheid |

### Lymfatische Filariasis
**Verspreiding:** Tropen wereldwijd
**Kliniek:**
- Acute: lymfangitis, lymfadenitis, koorts
- Chronisch: lymfoedeem, hydrocele, elephantiasis

**Diagnose:**
- Microfilarieën in nachtbloed
- Antigeen-test (CFA)
- Serologie

**Behandeling:**
- DEC (diethylcarbamazine) 6 mg/kg/dag 12 dagen
- + Albendazol 400mg
- Cave: geen DEC bij co-infectie Onchocerca/Loa!

### Loiasis
**Verspreiding:** West/Centraal-Afrika (regenwoud)
**Kliniek:**
- Calabar zwellingen (migrerende onderhuidse zwellingen)
- Oogworm (adulte worm migreert door conjunctiva)

**Diagnose:** Microfilarieën in dagbloed, oogworm visualisatie
**Behandeling:** DEC (voorzichtig bij hoge microfilariëmie → encefopathie)

### Onchocerciasis (Riverblindness)
**Verspreiding:** Afrika, Latijns-Amerika (bij snelstromende rivieren)
**Kliniek:**
- Ernstige huidjeuk
- Subcutane noduli (volwassen wormen)
- Blindheid (microfilarieën in oog)

**Diagnose:** Skin snip, slit lamp, serologie
**Behandeling:** Ivermectine 150 µg/kg, herhalen 6-12 maandelijks`
  },

  {
    id: 'tbc',
    title: 'Tuberculose',
    category: 'Ziektebeeld',
    keywords: ['tuberculose', 'tbc', 'mycobacterium', 'tuberculosis', 'pulmonaal', 'extrapulmonaal', 'rhze', 'rifampicine', 'isoniazide', 'ltbi', 'mantoux', 'igra', 'mdr'],
    summary: 'Tuberculose: chronische infectie met pulmonale en extrapulmonale manifestaties.',
    content: `## Tuberculose (TBC)

### Verwekker
Mycobacterium tuberculosis complex

### Epidemiologie
- Druppelinfectie
- 1/4 wereldbevolking latent geïnfecteerd
- Hoog-endemisch: Afrika, Azië

### Kliniek

**Pulmonale TBC:**
- Chronische hoest (>2-3 weken)
- Hemoptoë
- Nachtzweten
- Gewichtsverlies
- Koorts

**Extrapulmonale TBC:**
- Lymfeklieren (meest voorkomend)
- Pleuritis
- Meningitis
- Pott's disease (wervelkolom)
- Urogenitaal
- Miliair (gedissemineerd)

### Diagnostiek
| Test | Toepassing |
|------|------------|
| Sputumkweek + ZN | Gouden standaard pulmonaal |
| GeneXpert (PCR) | Snelle detectie + rifampicine-resistentie |
| X-thorax | Infiltraten, cavernes, hilair |
| Mantoux/IGRA | Latente infectie |

### Behandeling

**Actieve TBC (standaard):**
- Inductie (2 mnd): RHZE
  - Rifampicine + Isoniazide + Pyrazinamide + Ethambutol
- Continuering (4 mnd): RH
  - Rifampicine + Isoniazide

**Latente TBC (LTBI):**
- Isoniazide 6-9 maanden, OF
- Rifampicine 4 maanden, OF
- Isoniazide + Rifapentine 12 weken

### Cave
- DOT (Directly Observed Therapy) bij compliance risico
- MDR-TBC: resistentie rifampicine ± isoniazide
- HIV-TBC co-infectie: interacties ART!`
  },

  {
    id: 'hiv',
    title: 'HIV/AIDS',
    category: 'Ziektebeeld',
    keywords: ['hiv', 'aids', 'cd4', 'viral load', 'art', 'antiretroviraal', 'pep', 'prep', 'opportunistisch', 'pneumocystis', 'toxoplasmose', 'cryptococcen', 'kaposi'],
    summary: 'HIV/AIDS: immunodeficiëntie met opportunistische infecties.',
    content: `## HIV/AIDS

### Epidemiologie
- Transmissie: seksueel, bloed, verticaal
- Hoog-endemisch: Sub-Sahara Afrika

### Natuurlijk Beloop
1. Acute HIV (2-4 weken): mononucleosis-achtig
2. Asymptomatische fase (jaren)
3. AIDS (CD4 <200): opportunistische infecties

### AIDS-definiërende Aandoeningen
| CD4 | Aandoeningen |
|-----|--------------|
| <200 | Pneumocystis jirovecii pneumonie, oesofageale candidiasis |
| <100 | Toxoplasmose, Cryptosporidiose |
| <50 | CMV retinitis, MAC, Cryptococcen meningitis |

### Opportunistische Infecties Tropen
- TBC (alle CD4 niveaus!)
- Cryptococcen meningitis
- Visceraal leishmaniasis
- Penicilliosis (ZO-Azië)
- Histoplasmose

### Diagnostiek
- HIV-test (Ag/Ab combinatietest)
- Confirmatietest
- CD4-telling
- Virale load

### Behandeling (ART)
Start ongeacht CD4! Standaard: 2 NRTI + integrase-remmer

### PEP (Post-Expositie Profylaxe)
- Start <72 uur na blootstelling
- 28 dagen behandeling
- Tenofovir/emtricitabine + raltegravir

### PrEP (Pre-Expositie Profylaxe)
- Tenofovir/emtricitabine dagelijks
- Voor hoog-risico personen`
  },

  {
    id: 'soa',
    title: 'SOA',
    category: 'Ziektebeeld',
    keywords: ['soa', 'seksueel', 'syfilis', 'gonorroe', 'chlamydia', 'chancroid', 'lgv', 'urethritis', 'ulcus', 'treponema', 'penicilline'],
    summary: 'Seksueel overdraagbare aandoeningen in de tropen.',
    content: `## SOA

### Genitale Ulcera

| Aandoening | Verwekker | Kenmerk |
|------------|-----------|---------|
| Syfilis | Treponema pallidum | Pijnloze, harde ulcus (sjanker) |
| Chancroid | Haemophilus ducreyi | Pijnlijke, zachte ulcera + lymfadenopathie |
| LGV | C. trachomatis L1-3 | Kleine ulcus → bubo |
| Herpes | HSV-2 | Pijnlijke blaasjes/erosies |
| Donovanosis | K. granulomatis | Progressief granulomateus ulcus |

### Syfilis Stadia
| Stadium | Kliniek | Timing |
|---------|---------|--------|
| Primair | Sjanker (pijnloze ulcus) | 3 weken na infectie |
| Secundair | Uitslag, condylomata lata, koorts | 6-8 weken |
| Latent | Asymptomatisch | Maanden-jaren |
| Tertiair | Gumma, neurosyfilis, cardiovasculair | Jaren |

**Behandeling:**
- Primair/secundair: Benzathine penicilline G 2.4 MU IM eenmalig
- Latent laat/tertiair: 3 doses met 1 week interval
- Neurosyfilis: Penicilline G IV 10-14 dagen

### Urethritis/Cervicitis
| Verwekker | Behandeling |
|-----------|-------------|
| N. gonorrhoeae | Ceftriaxon 500mg IM eenmalig |
| C. trachomatis | Azitromycine 1g eenmalig of Doxycycline 100mg 2dd 7d |

*Altijd op beide behandelen bij urethritis!*`
  },

  // ============================================
  // PRAKTISCH
  // ============================================
  {
    id: 'labdiagnostiek',
    title: 'Laboratoriumdiagnostiek',
    category: 'Praktisch',
    keywords: ['lab', 'diagnostiek', 'dikke druppel', 'bloeduitstrijk', 'feces', 'serologie', 'pcr', 'microscopie', 'parasitologie'],
    summary: 'Overzicht laboratoriumdiagnostiek tropische infectieziekten.',
    content: `## Laboratoriumdiagnostiek

### Malaria
| Test | Kenmerken |
|------|-----------|
| Dikke druppel | Gouden standaard, sensitiviteit, herhalen bij negatief |
| Dunne uitstrijk | Species, parasitemie-% |
| RDT | Sneltest, HRP2/pLDH |

### Fecesonderzoek
- **O&P (Ova & Parasites):** Microscopie op eieren/cysten, 3x herhalen
- **Concentratietechnieken:** Verhogen sensitiviteit
- **Kweek:** Bacteriële pathogenen
- **Antigeen-detectie:** Giardia, Cryptosporidium
- **PCR:** Multiplex panels

### Serologische Tests
| Test | Toepassing |
|------|------------|
| Schistosoma serologie | Screening na zoetwater expositie |
| Strongyloides IgG | Screening voor immunosuppressie |
| Dengue NS1 + IgM/IgG | Acute dengue |
| HIV Ag/Ab | Screening |
| Hepatitis A/B/C | Icterus |

### Beeldvorming
- Echo abdomen: leverabces, splenomegalie, galwegen
- X-thorax: TBC, Löffler, pneumonie
- CT/MRI hersenen: neurocysticercose, toxoplasmose`
  },

  {
    id: 'antibiotica',
    title: 'Antibiotica',
    category: 'Praktisch',
    keywords: ['antibiotica', 'antiparasitair', 'azitromycine', 'doxycycline', 'albendazol', 'ivermectine', 'praziquantel', 'metronidazol', 'ciprofloxacine'],
    summary: 'Overzicht veelgebruikte antimicrobiële middelen in de tropen.',
    content: `## Antibiotica & Antiparasitaire Middelen

### Antiparasitaire Middelen

| Middel | Indicatie | Dosering |
|--------|-----------|----------|
| **Albendazol** | Nematoden, neurocysticercose | 400mg 1-3 dagen |
| **Mebendazol** | Nematoden | 100mg 2dd 3 dagen |
| **Ivermectine** | Strongyloides, CLM, Onchocerca, Scabies | 200 µg/kg |
| **Praziquantel** | Schistosoma, Taenia, Flukes | 40-60 mg/kg |
| **Metronidazol** | Giardia, Amoebe | 500-750mg 3dd |
| **Tinidazol** | Giardia | 2g eenmalig |
| **Paromomycine** | Amoebenkysten | 500mg 3dd 7d |

### Antimalariale Middelen

| Middel | Indicatie |
|--------|-----------|
| Artemether/lumefantrine (Riamet) | P. falciparum 1e keus |
| Atovaquon/proguanil (Malarone) | P. falciparum alternatief, profylaxe |
| Artesunaat IV | Ernstige malaria |
| Chloroquine | P. vivax/ovale/malariae |
| Primaquine | Hypnozoïeten (vivax/ovale) |
| DEC | Filariasis |

### Antibiotica

| Middel | Indicatie |
|--------|-----------|
| Azitromycine | Reizigersdiarree, buiktyfus, SOA |
| Doxycycline | Rickettsia, malariaprofylaxe, cholera |
| Ceftriaxon | Buiktyfus ernstig, gonorroe |
| Ciprofloxacine | Diarree (resistentie toenemend!) |
| Rifampicine | TBC |
| Isoniazide | TBC |

### Let Op
- G6PD bepalen vóór primaquine
- Interacties rifampicine
- Toenemende fluoroquinolone resistentie Zuid-Azië`
  },

  {
    id: 'malariapreventie',
    title: 'Malariapreventie',
    category: 'Praktisch',
    keywords: ['malariapreventie', 'profylaxe', 'abcd', 'malarone', 'lariam', 'doxycycline', 'deet', 'klamboe', 'atovaquon', 'mefloquine'],
    summary: 'ABCD van malariapreventie: awareness, bite prevention, chemoprofylaxe, diagnose.',
    content: `## Malariapreventie

### ABCD Principe
- **A**wareness - Bewustzijn van risico
- **B**ite prevention - Muggenbeten voorkomen
- **C**hemoprophylaxis - Medicamenteuze preventie
- **D**iagnosis - Snelle diagnose bij koorts

### Bite Prevention
- DEET 30-50% op huid
- Permetrine op kleding/klamboe
- Geïmpregneerde klamboe (LLIN)
- Beschermende kleding (schemering/nacht)
- Airconditioning/screens

### Chemoprofylaxe

| Middel | Dosering | Timing |
|--------|----------|--------|
| **Atovaquon/proguanil (Malarone)** | 1 tab/dag | 1-2d voor tot 7d na |
| **Doxycycline** | 100mg/dag | 1-2d voor tot 4w na |
| **Mefloquine (Lariam)** | 250mg/week | 2-3w voor tot 4w na |

### Keuze Profylaxe
| Middel | Voordeel | Nadeel |
|--------|----------|--------|
| Malarone | Kort voor/na, weinig bijwerkingen | Kostbaar bij lange reis |
| Doxycycline | Goedkoop | Fotosensitiviteit, candida |
| Mefloquine | Wekelijks | Neuropsychiatrisch, cardiale contra-indicaties |

### Speciale Groepen
- **Zwangeren:** Mefloquine (2e/3e trimester), vermijd Malarone
- **Kinderen:** Malarone vanaf 5kg, Mefloquine vanaf 5kg
- **Lange verblijvers:** Individueel advies`
  },

  {
    id: 'vaccinaties',
    title: 'Vaccinaties',
    category: 'Praktisch',
    keywords: ['vaccinatie', 'vaccin', 'gele koorts', 'hepatitis', 'buiktyfus', 'rabies', 'japanse encefalitis', 'tbe', 'meningokokken', 'cholera'],
    summary: 'Reizigersvaccinaties: van routine tot verplicht.',
    content: `## Vaccinaties

### Routine Vaccinaties (Controleren/Bijwerken)
- DTP (Difterie-Tetanus-Polio)
- BMR (Bof-Mazelen-Rubella)
- Hepatitis B

### Aanbevolen Reizigersvaccinaties

| Vaccin | Indicatie | Schema |
|--------|-----------|--------|
| **Hepatitis A** | Alle reizen buiten W-Europa/N-Amerika | 0, 6-12 mnd |
| **Buiktyfus** | Zuid-Azië, risicoreizen | Eenmalig, 3 jaar geldig |
| **Hepatitis B** | Langere reizen, medisch, seksueel risico | 0, 1, 6 mnd |

### Verplichte/Speciale Vaccinaties

| Vaccin | Indicatie | Bijzonderheden |
|--------|-----------|----------------|
| **Gele koorts** | Afrika/Zuid-Amerika (endemisch) | Verplicht sommige landen, levenslang geldig |
| **Meningokokken ACWY** | Meningitisgordel Afrika, Hadj | Verplicht Saudi-Arabië |
| **Japanse encefalitis** | ZO-Azië, langere reis ruraal | 2 doses |
| **Rabiës** | Afgelegen gebieden, diercontact | Pre-expositie: 0, 7, 21-28 dagen |
| **TBE** | Centraal-Europa, bos/outdoor | 3 doses |
| **Cholera** | Humanitaire werkers, uitbraken | Orale vaccin |

### Gele Koorts Details
- Levend verzwakt vaccin
- Contra-indicaties: <9 mnd, immuungecompromitteerd, thymuspathologie
- Certificaat: geldig vanaf 10 dagen na vaccinatie`
  },

  {
    id: 'afweerstoornis',
    title: 'Afweerstoornis',
    category: 'Praktisch',
    keywords: ['immuun', 'immuniteit', 'immunosuppressie', 'asplenie', 'hiv', 'cd4', 'b-cel', 't-cel', 'rituximab', 'transplantatie', 'opportunistisch'],
    summary: 'Reisadvies bij immunodeficiëntie en specifieke infectierisico\'s.',
    content: `## Afweerstoornis & Reizen

### Risico-indeling
| Afweer | Verhoogd risico |
|--------|-----------------|
| T-cel defect (HIV, transplantatie) | Opportunisten (Toxoplasma, Cryptosporidium, TBC) |
| B-cel defect (rituximab) | Gekapselde bacteriën, enterovirus |
| Asplenie | Malaria (ernstig!), gekapselde bacteriën |
| Neutropenie | Bacteriële/schimmelinfecties |

### Screening Vóór Immunosuppressie
Bij tropenverleden, screenen op:
- Strongyloides serologie (hyperinfectie risico!)
- Schistosoma serologie
- TBC (IGRA/Mantoux)
- Hepatitis B serostatus

### HIV & Reizen
| CD4 | Risico's | Advies |
|-----|----------|--------|
| >500 | Normaal risico | Standaard reisadvies |
| 200-500 | Verhoogd risico TBC, malaria | Profylaxe, vermijd hoog-risico |
| <200 | Opportunisten | Reis afraden |

### Asplenie
Hoog risico:
- Ernstige malaria (verhoogde mortaliteit)
- Babesiose
- Gekapselde bacteriën (pneumokokken, meningokokken)

Advies:
- Malariaprofylaxe essentieel
- Vaccinaties pneumokokken, meningokokken, Hib
- Standby antibiotica

### Levend Vaccins
CAVE bij immunosuppressie:
- Gele koorts (levend)
- BMR
- Orale tyfus
- Orale cholera

Alternatief: geïnactiveerde vaccins waar mogelijk`
  },

  {
    id: 'gifdieren',
    title: 'Gifdieren',
    category: 'Praktisch',
    keywords: ['gif', 'slang', 'slangenbeet', 'antivenom', 'envenomation', 'neurotoxisch', 'hemotoxisch', 'kwal', 'schorpioen', 'spin'],
    summary: 'Gifdieren: preventie en behandeling van envenomatie.',
    content: `## Gifdieren

### Slangenbeten

**Syndromen:**
| Type | Kliniek | Voorbeelden |
|------|---------|-------------|
| Neurotoxisch | Ptosis, paralyse, ademhalingsdepressie | Cobra, Kraits, Koraalslang |
| Hemotoxisch | Bloedingen, coagulopathie | Adder, Lancekoppen |
| Cytotoxisch | Lokale necrose, zwelling | Pofadder |

**Eerste Hulp:**
- Immobilisatie (drukverband bij neurotoxisch)
- GEEN tourniquet, incisie, uitzuigen
- Snel naar ziekenhuis
- Antivenom indien beschikbaar

**Indicaties Antivenom:**
- Systemische tekenen
- Coagulopathie
- Progressieve lokale zwelling
- Neurotoxische verschijnselen

### Kwallensteek
**Eerste hulp:**
- Spoelen met zeewater (NIET zoet water)
- Azijn bij box jellyfish
- Nestelcellen verwijderen (niet wrijven)
- Pijnstilling

### Schorpioenen
- Lokale pijn, zwelling
- Systemisch: autonome dysfunctie
- Behandeling: pijnstilling, antivenom indien ernstig

### Preventie
- Schoenen dragen
- Bed controleren
- 's Nachts lamp gebruiken
- Niet in holen/onder stenen grijpen`
  },

  {
    id: 'keuring',
    title: 'Keuringsonderzoek',
    category: 'Praktisch',
    keywords: ['keuring', 'screening', 'terugkeer', 'asymptomatisch', 'feces', 'serologie', 'bloedbeeld', 'eosinofilie'],
    summary: 'Screening na terugkeer uit de tropen.',
    content: `## Keuringsonderzoek

### Indicaties Screening
- Langdurig verblijf (>3-6 maanden)
- Verblijf in hoog-risico gebieden
- Specifieke exposities (zoetwater, onveilig seksueel contact)
- Asymptomatische reizigers met risico

### Standaard Screening

| Test | Indicatie |
|------|-----------|
| Bloedbeeld + diff | Eosinofilie, anemie |
| Leverenzymen | Hepatitis |
| Feces O&P (3x) | Darmparasieten |
| Strongyloides serologie | Langdurig verblijf tropisch gebied |
| Schistosoma serologie | Zoetwater expositie Afrika |
| HIV-test | Risico seksueel/bloed contact |
| Hepatitis B/C serologie | Risico seksueel/bloed contact |

### Timing
- Serologieën: 8-12 weken na laatste expositie
- Feces: direct te beginnen
- Herhalen indien negatief maar hoge verdenking

### Specifieke Situaties
| Expositie | Aanvullend onderzoek |
|-----------|---------------------|
| Zoetwater Afrika | Schistosoma serologie, urine (hematurie) |
| Barefoot exposure | Strongyloides, Hookworm |
| Onveilig seksueel contact | SOA-screening, HIV |
| Tuberculose-contact | IGRA, X-thorax |

### Asymptomatische Eosinofilie
- Belangrijke indicator voor helminth
- Serologieën + feces onderzoek
- Empirische behandeling bij hoge verdenking`
  },

  // ============================================
  // CLASSIFICATIE TABELLEN
  // ============================================
  {
    id: 'pathogenen-overzicht',
    title: 'Pathogenen Overzicht',
    category: 'Overzicht',
    keywords: ['pathogeen', 'bacterie', 'virus', 'parasiet', 'protozoa', 'helminth', 'schimmel', 'transmissie', 'classificatie'],
    summary: 'Complete classificatie van tropische pathogenen per type.',
    content: `## Pathogenen Classificatie

### Bacteriën
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Buiktyfus | Salmonella Typhi | Feco-oraal |
| Cholera | Vibrio cholerae | Water |
| Leptospirose | Leptospira | Water/urine knaagdieren |
| Rickettsiose | Rickettsia spp. | Teken/vlooien |
| Tuberculose | M. tuberculosis | Druppels |
| Lepra | M. leprae | Langdurig contact |

### Protozoa
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Malaria | Plasmodium spp. | Anopheles mug |
| Amoebiasis | E. histolytica | Feco-oraal |
| Giardiasis | Giardia lamblia | Feco-oraal |
| Leishmaniasis | Leishmania spp. | Zandvlieg |
| Slaapziekte | T. brucei | Tsetsevlieg |
| Chagas | T. cruzi | Triatomine wants |

### Helminthen - Nematoden
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Strongyloidiasis | S. stercoralis | Huid (bodem) |
| Ascariasis | A. lumbricoides | Feco-oraal |
| Hookworm | Ancylostoma/Necator | Huid (bodem) |
| Filariasis | Wuchereria/Brugia | Mug |

### Helminthen - Trematoden
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Schistosomiasis | Schistosoma spp. | Zoetwater |
| Fascioliasis | Fasciola hepatica | Waterplanten |

### Helminthen - Cestoden
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Taeniasis | Taenia spp. | Rauw vlees |
| Cysticercose | T. solium larve | Feco-oraal |
| Echinococcose | Echinococcus | Hond (feces) |

### Virussen
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Dengue | Dengue virus | Aedes mug (dag) |
| Gele koorts | YFV | Aedes mug |
| HIV | HIV | Seksueel/bloed |
| Hepatitis A/E | HAV/HEV | Feco-oraal |
| Rabiës | Rabies virus | Beet |

### Fungi
| Ziekte | Verwekker | Transmissie |
|--------|-----------|-------------|
| Histoplasmose | H. capsulatum | Inhalatie |
| Cryptococcose | C. neoformans | Inhalatie |`
  },

  {
    id: 'transmissie-overzicht',
    title: 'Transmissieroutes',
    category: 'Overzicht',
    keywords: ['transmissie', 'vector', 'mug', 'teek', 'vlieg', 'feco-oraal', 'seksueel', 'druppel'],
    summary: 'Overzicht transmissieroutes van tropische infecties.',
    content: `## Transmissieroutes

### Vector-overdracht
| Vector | Activiteit | Ziekten |
|--------|------------|---------|
| Anopheles mug | Nacht | Malaria, Filariasis |
| Aedes mug | Dag | Dengue, Chikungunya, Zika, Gele koorts |
| Culex mug | Nacht | Japanse encefalitis, West-Nile |
| Zandvlieg | Schemering | Leishmaniasis |
| Tsetsevlieg | Dag | Slaapziekte |
| Blackfly | Dag bij rivieren | Onchocerciasis |
| Teek | -- | Rickettsia, Lyme, CCHF, TBE |

### Feco-orale Route
- Bacterieel: Salmonella, Shigella, Cholera
- Viraal: Hepatitis A/E, Polio, Rota/Norovirus
- Parasitair: Giardia, Amoebe, Ascaris, Taenia-eieren

### Huid/Omgeving
| Route | Ziekten |
|-------|---------|
| Bodem (barefoot) | Strongyloides, Hookworm |
| Zoetwater | Schistosomiasis, Leptospirose |
| Zand (stranden) | CLM |

### Seksueel/Bloed
- HIV, Hepatitis B/C
- SOA (syfilis, gonorroe, chlamydia)

### Respiratoir
- TBC
- Legionella
- Endemische mycosen (Histoplasmose)

### Diercontact
- Rabiës (beet)
- Leptospirose (urine knaagdieren)
- Brucellose (melk)`
  },

  // ============================================
  // LEVERZIEKTEN (uit aantekeningen)
  // ============================================
  {
    id: 'hepatitis',
    title: 'Virale Hepatitis',
    category: 'Ziektebeeld',
    keywords: ['hepatitis', 'hep a', 'hep b', 'hep c', 'hep d', 'hep e', 'hav', 'hbv', 'hcv', 'hdv', 'hev', 'geelzucht', 'icterus', 'lever', 'vaccinatie', 'feco-oraal', 'seksueel', 'bloedoverdracht'],
    summary: 'Virale hepatitis A t/m E: transmissie, kliniek, serologie en preventie.',
    content: `## Virale Hepatitis

### Overzicht Hepatitisvirussen
| Type | Transmissie | Chronisch? | Vaccin? |
|------|-------------|------------|---------|
| Hep A | Feco-oraal | Nee | Ja |
| Hep B | Seksueel, bloed, verticaal | Ja | Ja |
| Hep C | Bloed (seksueel zeldzaam) | Ja (70%) | Nee |
| Hep D | Bloed (alleen met HBV) | Ja | (HBV vaccin beschermt) |
| Hep E | Feco-oraal, varkensvlees | Soms (immuungecompromitteerd) | (Ja, China) |

### Hepatitis A
**Transmissie:** Feco-oraal (voedsel/water, mens-mens)
**Incubatietijd:** Gemiddeld 30 dagen (15-50)
**Kliniek:**
- Koorts, malaise, anorexie
- Icterus (vaker bij ouderen!)
- Hepatomegalie, leverpijn

**Complicaties:**
- Fulminante hepatitis (zeldzaam)
- Cholestatische hepatitis
- Relapsing hepatitis

**Mortaliteit:** ~0.5% onbehandeld

**CAVE:** Besmettelijk VÓÓR symptomen ontstaan (fecale uitscheiding)
- Daarom ook kinderen vaccineren (kinderdagverblijf risico)

**Vaccinatie:**
- Dag van tevoren al effectief (lange incubatietijd, snelle respons)
- 2 doses (0, 6-12 maanden) voor langdurige bescherming

**Serologie:**
| Marker | Betekenis |
|--------|-----------|
| Anti-HAV IgM | Acute infectie |
| Anti-HAV IgG | Doorgemaakte infectie of vaccinatie |

### Hepatitis B
**Transmissie:** Seksueel, bloed, verticaal (moeder-kind)
**Incubatietijd:** 60-90 dagen
**Kliniek:** Vaak asymptomatisch, kan fulminant verlopen

**Chronisch beloop:** 5-10% volwassenen, >90% neonataal

**Complicaties chronisch:**
- Cirrose
- Hepatocellulair carcinoom (HCC)

**Serologie:**
| Marker | Acute infectie | Chronisch | Gevaccineerd | Immuun (doorgemaakt) |
|--------|----------------|-----------|--------------|---------------------|
| HBsAg | + | + | - | - |
| Anti-HBs | - | - | + | + |
| Anti-HBc IgM | + | - | - | - |
| Anti-HBc IgG | + | + | - | + |
| HBeAg | ± | ± | - | - |

### Hepatitis C
**Transmissie:** Bloed (IVDU, transfusies, tatoeages)
**Chronisch:** ~70% ontwikkelt chronische infectie
**Behandeling:** DAA's (Direct Acting Antivirals) - >95% genezing

### Hepatitis E
**Transmissie:** Feco-oraal (water), varkensvlees (rauw)
**Incubatietijd:** 15-60 dagen

**CAVE Zwangerschap:** CFR 15-25%! Reis afraden naar endemische gebieden.

**Chronisch beloop:** Mogelijk bij immuungecompromitteerden

**Minder mens-mens overdraagbaar dan Hep A**

### Algemene Kliniek Virale Hepatitis
- Koorts
- Leverpijn (rechter bovenbuik)
- Anorexie, misselijkheid
- Icterus
- Donkere urine, ontkleurde feces`
  },

  {
    id: 'leptospirose',
    title: 'Leptospirose',
    category: 'Ziektebeeld',
    keywords: ['leptospirose', 'leptospira', 'weil', 'ziekte van weil', 'zoetwater', 'ratten', 'knaagdieren', 'hepatorenaal', 'icterus', 'nierfalen', 'rode ogen', 'spirolept', 'mud run', 'city swim'],
    summary: 'Leptospirose: zoönotische spirocheet met spectrum van mild tot ziekte van Weil.',
    content: `## Leptospirose

### Verwekker
Leptospira interrogans (spirocheet)

### Epidemiologie
- **Top 5 oorzaak koorts uit de tropen**
- Transmissie: contact met water/bodem besmet met urine van knaagdieren
- Ook in Nederland: mud runs, city swims, rioolwerkers
- Incubatietijd: 1-4 weken (gem. 10 dagen)

### Kliniek

**Milde vorm (90%):**
- Griepachtig beeld
- Koorts, hoofdpijn, myalgie
- Rode ogen (conjunctivale injectie) - typisch!

**Ziekte van Weil (ernstige vorm, 10%):**
- Hepatorenaal syndroom
- Icterus
- Acute nierinsufficiëntie
- Bloedingen
- ARDS
- Mortaliteit 5-15%

### Diagnostiek
| Test | Timing |
|------|--------|
| PCR bloed/urine | Week 1 |
| Serologie (MAT) | Vanaf week 2 |
| Kweek | Langzaam, niet voor acute diagnostiek |

### Laboratorium
- Leverenzymen verhoogd (ASAT/ALAT)
- Bilirubine verhoogd
- Nierfunctiestoornissen (creatinine ↑)
- Trombopenie
- CK verhoogd (myositis)

### Behandeling
Reageert goed op antibiotica:
| Ernst | Behandeling |
|-------|-------------|
| Mild | Doxycycline 100mg 2dd 7 dagen |
| Ernstig | Penicilline G IV of Ceftriaxon IV |

Alternatief: Amoxicilline

### Preventie
- **Spirolept vaccin:** Alleen tegen ziekte van Weil (L. interrogans serovar icterohaemorrhagiae)
  - Beschermt NIET tegen andere serovars
- Vermijd contact besmet water
- Wondjes afdekken bij wateractiviteiten

### Let Op
Bij onbegrepen koorts uit tropen MET lever- én nierfunctiestoornis → denk aan leptospirose!`
  },

  {
    id: 'leverziekten',
    title: 'Leverziekten na Tropenbezoek',
    category: 'Ziektebeeld',
    keywords: ['lever', 'leverziekte', 'hepatitis', 'amoebenabces', 'leverabces', 'fasciola', 'leverbot', 'schistosoma', 'mansoni', 'bilirubine', 'asat', 'alat', 'af', 'ggt', 'icterus', 'geelzucht'],
    summary: 'Overzicht leverziekten na tropenbezoek: van hepatitis tot parasitaire oorzaken.',
    content: `## Leverziekten na Tropenbezoek

### Pathofysiologie Icterus
**Bilirubine metabolisme:**
- Lever conjugeert bilirubine (indirect → direct)
- Uitscheiding via gal naar darm

**Bij leverziekte:**
- Conjugatie gestoord → ongeconjugeerd (indirect) bilirubine ↑
- Uitscheiding gestoord → geconjugeerd (direct) bilirubine ↑
- Geel zichtbaar vanaf bilirubine > 60 µmol/L

**Feces/Urine:**
- Geen galuitscheiding → stopverfkleurige ontlasting
- Geconjugeerd bili in urine → donkere urine

### Laboratoriumdiagnostiek Lever
| Marker | Betekenis |
|--------|-----------|
| ASAT / ALAT | Levercelverval (hepatitis, toxisch) |
| AF / γGT | Cholestase, galwegobstructie |
| Bilirubine | Direct vs indirect (type icterus) |
| Albumine | Synthesefunctie lever |
| INR / PT | Stollingsfunctie |
| Lactaat | Leverfalen |

### Oorzaken Leverziekte na Tropen

**Viraal:**
- Hepatitis A, B, C, E
- EBV, CMV

**Bacterieel:**
- Leptospirose (ziekte van Weil)
- Buiktyfus (secundair)

**Parasitair:**
- **Amoebenabces** (E. histolytica)
- **Schistosomiasis** (S. mansoni - periportale fibrose)
- **Fascioliasis** (leverbot via waterkers)
- Echinococcose (hydatidcyste)

**Toxisch/Overig:**
- Medicamenteus (rifampicine, isoniazide)
- Alcohol
- Malaria (hemolyse → indirect bili ↑)

### Amoebenabces
**Verwekker:** Entamoeba histolytica
**Kliniek:**
- Koorts
- Pijnlijke hepatomegalie
- Icterus (bij grote abcessen)

**Diagnose:**
- Echo/CT: solitair abces rechter leverkwab
- Serologie (hoge sensitiviteit)
- Feces vaak negatief!

**Behandeling:**
1. Metronidazol 750mg 3dd 5-10 dagen
2. NABEHANDELING: Paromomycine 500mg 3dd 7 dagen (cyste-eliminatie)
   → Voorkomt recidief!

### Fascioliasis (Leverbot)
**Verwekker:** Fasciola hepatica
**Transmissie:** Waterkers, waterplanten
**Verspreiding:** Wereldwijd, ook Europa

**Kliniek:**
- Koorts, buikpijn, eosinofilie
- Hepatomegalie
- Galwegobstructie

**Diagnose:** Eieren in feces, serologie
**Behandeling:** Triclabendazol

### Schistosomiasis & Lever
**S. mansoni** (Afrika, Zuid-Amerika):
- Eieren in lever → granulomen
- Periportale fibrose ("pipestem fibrosis")
- Portale hypertensie
- Hepatosplenomegalie

### Hepatitis Serologie Interpretatie
| Situatie | HBsAg | Anti-HBs | Anti-HBc IgM | Anti-HBc IgG |
|----------|-------|----------|--------------|--------------|
| Acute HBV | + | - | + | + |
| Chronische HBV | + | - | - | + |
| Gevaccineerd | - | + | - | - |
| Doorgemaakt (immuun) | - | + | - | + |
| Window periode | - | - | + | + |`
  }
];

// Export voor gebruik in andere modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { knowledgeBase };
}
