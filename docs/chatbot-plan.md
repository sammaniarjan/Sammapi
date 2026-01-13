# BIUPAMA Chatbot - Architectuurplan

## Overzicht
Web-based chatbot voor tropengeneeskunde casuïstiek, geïntegreerd met de BIUPAMA studiegids, CDC, LCR en eigen medicatielijsten.

**Doelgroepen**: Militair artsen (operationeel) + BIUPAMA studenten (educatief)

**Stack**: Cloudflare Pages + Workers (past bij huidige hosting)

---

## Architectuur

```
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Pages (Frontend)                     │
│  - Chat interface (HTML/JS)                                  │
│  - Land/regio selector                                       │
│  - Medicatie trip planner UI                                 │
│  - PWA voor offline caching                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare Worker (Backend/API)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Claude API  │  │   Tools     │  │  Context    │          │
│  │ (chat)      │  │ (functions) │  │  Loader     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
│  Toegang via:                                                │
│  ├── fetch() van Pages frontend (primair)                   │
│  └── MCP Server voor Claude Desktop (optioneel)             │
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
                     │ (KV/JSON)     │
                     └───────────────┘
```

### Waarom Cloudflare Pages + Workers?
- **Je zit er al**: Huidige hosting is Cloudflare Pages
- **Geen extra infra**: Workers draait naast Pages
- **Gratis tier ruim**: 100k Worker requests/dag gratis
- **Edge performance**: Wereldwijd snel
- **MCP-ready**: Via `workers-mcp` package kun je later MCP toevoegen

---

## Componenten

### 1. Cloudflare Pages (Frontend)
- **Chat interface**: Vanilla JS met markdown rendering
- **Context selectors**: Land, reisduur, medische achtergrond
- **Trip planner UI**: Medicatie checklist generator
- **PWA**: Service worker voor offline basisdata
- **Communicatie**: `fetch()` naar Worker API

```
biupama-chatbot/
├── index.html          # Chat UI
├── style.css           # Styling (dark theme)
├── app.js              # Chat logica
└── sw.js               # Service worker (offline)
```

### 2. Cloudflare Worker (Backend API)
- **Endpoints**: `/api/chat`, `/api/cdc/:country`, `/api/medications`
- **Claude API**: Tool use voor intelligente responses
- **Secrets**: `ANTHROPIC_API_KEY` in Worker secrets

```typescript
// worker/src/index.ts
export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      return handleChat(request, env);
    }
    if (url.pathname.startsWith('/api/cdc/')) {
      return handleCDC(request, env);
    }
    // etc.
  }
}
```

### 3. Claude API met Tool Use
```typescript
// Tools beschikbaar voor Claude
const tools = [
  {
    name: "get_cdc_country_info",
    description: "Haal CDC reizigersadvies op voor een land",
    input_schema: {
      type: "object",
      properties: { country: { type: "string" } }
    }
  },
  {
    name: "get_endemic_diseases",
    description: "Welke ziekten zijn endemisch in regio",
    input_schema: {
      type: "object",
      properties: { region: { type: "string" } }
    }
  },
  {
    name: "generate_trip_medications",
    description: "Genereer medicatielijst voor trip",
    input_schema: {
      type: "object",
      properties: {
        destination: { type: "string" },
        duration_days: { type: "number" },
        team_size: { type: "number" }
      }
    }
  },
  {
    name: "search_biupama",
    description: "Zoek in BIUPAMA studiegids",
    input_schema: {
      type: "object",
      properties: { query: { type: "string" } }
    }
  }
];
```

### 4. Knowledge Base
- **index.html** is de source of truth (BIUPAMA.md is verouderd)
- **Aanpak**: Build-script dat content extraheert naar JSON
- **Opslag**: Cloudflare KV of gebundeld in Worker
- Claude's 200k context is ruim voldoende

```bash
# Build script: extract content uit index.html
node scripts/extract-content.js > content.json
```

### 5. MCP Server (Optioneel - voor powerusers)
Via `workers-mcp` package kunnen dezelfde Worker functies beschikbaar worden als MCP tools voor Claude Desktop.

```bash
# Setup (eenmalig)
npx workers-mcp init
npx workers-mcp install
```

### 6. Externe Integraties

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
- [ ] Cloudflare Worker opzetten met `/api/chat` endpoint
- [ ] Claude API integratie met BIUPAMA content als context
- [ ] Simpele chat UI op Cloudflare Pages
- [ ] Basis tool: `search_biupama`

### Fase 2: Integraties
- [ ] CDC data tool (cachen in Cloudflare KV)
- [ ] LCR data (handmatig of scraping)
- [ ] Medicatie database in KV
- [ ] Tools voor land lookup en medicatie planning

### Fase 3: Polish
- [ ] PWA offline support
- [ ] Trip planner UI met export (PDF/print)
- [ ] Conversation history (KV of localStorage)
- [ ] MCP server via `workers-mcp` (optioneel)

---

## Technische Keuzes

| Aspect | Keuze | Reden |
|--------|-------|-------|
| Frontend | Cloudflare Pages + Vanilla JS | Past bij huidige hosting |
| Backend | Cloudflare Worker | Naadloos met Pages, gratis tier |
| LLM | Claude API (Sonnet) | Medische kennis, tool use |
| Storage | Cloudflare KV | Key-value store, gratis tier |
| MCP | `workers-mcp` (optioneel) | Voor Claude Desktop powerusers |

---

## Kosten Inschatting

| Component | Kosten |
|-----------|--------|
| Claude API | ~$0.003 per vraag (sonnet) |
| Cloudflare Pages | Gratis |
| Cloudflare Workers | Gratis (100k requests/dag) |
| Cloudflare KV | Gratis (100k reads/dag) |

Bij 1000 vragen/maand: **~€3/maand** (alleen Claude API)

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
