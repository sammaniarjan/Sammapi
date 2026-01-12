# BIUPAMA Chatbot - Architectuurplan

## Overzicht
Web-based chatbot voor tropengeneeskunde casuïstiek, geïntegreerd met de BIUPAMA studiegids, CDC, LCR en eigen medicatielijsten.

**Doelgroepen**: Militair artsen (operationeel) + BIUPAMA studenten (educatief)

---

## Architectuur

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Web App)                        │
│  - Chat interface                                            │
│  - Land/regio selector                                       │
│  - Medicatie trip planner                                    │
│  - PWA voor offline caching                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Python)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Claude API  │  │   Tools     │  │  Context    │          │
│  │ (chat)      │  │ (functions) │  │  Loader     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ BIUPAMA       │    │ CDC API       │    │ LCR           │
│ Knowledge Base│    │ Travelers     │    │ Reizigersadv. │
│ (index.html)  │    │ Health        │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
                              │
                     ┌───────────────┐
                     │ Medicatie     │
                     │ Database      │
                     │ (JSON/SQLite) │
                     └───────────────┘
```

---

## Componenten

### 1. Frontend (Static HTML/JS of React)
- **Chat interface**: Vraag-antwoord met markdown rendering
- **Context selectors**: Land, reisduur, medische achtergrond
- **Trip planner UI**: Medicatie checklist generator
- **PWA**: Service worker voor offline basisdata

### 2. Backend API
**Optie A: Serverless (Cloudflare Workers / Vercel Edge)**
- Laag onderhoud, gratis tier vaak voldoende
- Direct Claude API calls

**Optie B: Eigen server (Node.js/Python)**
- Meer controle
- Kan vector database hosten

### 3. Claude API Integratie
```javascript
// Voorbeeld tool definitie
tools: [
  {
    name: "get_cdc_country_info",
    description: "Haal CDC reizigersadvies op voor een land",
    input_schema: { country: "string" }
  },
  {
    name: "get_endemic_diseases",
    description: "Welke ziekten zijn endemisch in regio",
    input_schema: { region: "string" }
  },
  {
    name: "generate_trip_medications",
    description: "Genereer medicatielijst voor trip",
    input_schema: {
      destination: "string",
      duration_days: "number",
      team_size: "number"
    }
  },
  {
    name: "search_biupama",
    description: "Zoek in BIUPAMA studiegids",
    input_schema: { query: "string" }
  }
]
```

### 4. Knowledge Base
- **index.html** is de source of truth (BIUPAMA.md is verouderd)
- **Aanpak**: Content direct in context laden (geen vector DB nodig)
- **Optie A**: HTML parsen en text extraheren bij elke request
- **Optie B**: Build-stap die JSON export maakt van de content
- Claude's 200k context is ruim voldoende voor de volledige studiegids

### 5. Externe Integraties

#### CDC Travelers Health
- **API**: https://wwwnc.cdc.gov/travel/destinations/list
- **Data**: Vaccinaties, malariaprofylaxe, alerts per land
- Kan ook scraped/gecached worden voor snelheid

#### LCR (Landelijk Coördinatiecentrum Reizigersadvisering)
- **Website**: https://www.lcr.nl
- Geen publieke API → scraping of handmatige data export
- Cachen van landadviezen

#### Medicatie Database
```json
// medications.json
{
  "malaria_prophylaxis": [
    {
      "name": "Malarone (atovaquon/proguanil)",
      "dosage": "1 tablet per dag",
      "timing": "1 dag voor - 7 dagen na",
      "contraindications": ["nierfunctiestoornissen"],
      "pack_sizes": [12, 24, 36]
    },
    {
      "name": "Doxycycline",
      "dosage": "100mg per dag",
      "timing": "1 dag voor - 4 weken na",
      "contraindications": ["zwangerschap", "kinderen <8jr"],
      "pack_sizes": [30, 60, 100]
    }
  ],
  "travel_kit_base": [
    { "name": "ORS", "indication": "diarree", "quantity_per_person": 10 },
    { "name": "Loperamide", "indication": "reizigersdiarree", "quantity_per_person": 20 },
    { "name": "Azitromycine 500mg", "indication": "bacteriële diarree", "quantity_per_person": 6 }
  ]
}
```

---

## Use Cases

### 1. Casuïstiek (Student)
> "34-jarige man, 2 weken terug uit Ghana, koorts 39.5°C, hoofdpijn. Wat is je differentiaaldiagnose?"

→ Chatbot zoekt BIUPAMA, geeft DD met malaria bovenaan, vraagt door naar dikke druppel etc.

### 2. Operationeel advies (Arts)
> "We gaan 3 weken naar Mali met team van 8. Welke medicatie moeten we meenemen?"

→ Tool haalt CDC/LCR info Mali, genereert medicatielijst met aantallen

### 3. Endemische info
> "Welke ziekten zijn endemisch in Suriname?"

→ CDC lookup + BIUPAMA context over relevante pathogenen

---

## Implementatie Fases

### Fase 1: MVP
- [ ] Simpele chat UI (HTML/JS, past bij huidige stack)
- [ ] Backend endpoint (Vercel/Cloudflare serverless)
- [ ] Claude API met index.html content als context
- [ ] Basis tool: `search_biupama`

### Fase 2: Integraties
- [ ] CDC data integratie (cachen van land-info)
- [ ] LCR data (handmatig of scraping)
- [ ] Medicatie database JSON
- [ ] Tools voor land lookup en medicatie planning

### Fase 3: Polish
- [ ] PWA offline support (gecachete basisdata)
- [ ] Trip planner UI met export (PDF/print)
- [ ] Conversation history

---

## Technische Keuzes

| Aspect | Aanbeveling | Reden |
|--------|-------------|-------|
| Frontend | Vanilla JS of Vue | Past bij huidige static stack |
| Backend | Vercel Edge Functions | Gratis, snel, geen server beheer |
| LLM | Claude API (Sonnet) | Medische kennis, tool use |
| Vector DB | Niet nodig | Content past in context window |
| Database | JSON files → SQLite (later) | Geen infra nodig |

---

## Kosten Inschatting

| Component | Kosten |
|-----------|--------|
| Claude API | ~$0.003 per vraag (sonnet) |
| Vercel hosting | Gratis tier (100k requests/maand) |
| Domein (optioneel) | ~€10/jaar |

Bij 1000 vragen/maand: **~€3/maand**

---

## Beslissingen

- **Taal**: Nederlands primair, Engels voor internationale operaties
- **Medicatie data**: Wisselend beschikbaar (Excel/docs) → flexibele import nodig
- **Authenticatie**: Openbaar toegankelijk
- **Hosting**: Cloud (serverless)
- **Source of truth**: index.html (niet BIUPAMA.md)

---

## Volgende Stappen

1. Opzetten project structuur
2. MVP chat interface bouwen
3. Claude API integratie met BIUPAMA content
4. Testen met voorbeeld casuïstiek
