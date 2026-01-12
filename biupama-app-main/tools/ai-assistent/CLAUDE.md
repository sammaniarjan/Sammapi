# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Assistent voor tropengeneeskunde studie. Een chat interface die medische content doorzoekt en relevante informatie presenteert. Onderdeel van de BIUPAMA study app.

**Architecture**: Standalone HTML + JavaScript. Geen build process, geen externe dependencies.

## File Structure

```
tools/ai-assistent/
├── index.html      # Chat UI met retrieval logic
├── knowledge.js    # Content index (keywords, samenvattingen, volledige content)
└── CLAUDE.md       # Deze documentatie
```

## Running the Application

```bash
open index.html
# of
python3 -m http.server 8000 --directory ../../
# Bezoek http://localhost:8000/tools/ai-assistent/
```

## Code Architecture

### knowledge.js

Bevat de `knowledgeBase` array met alle geïndexeerde medische content:

```javascript
const knowledgeBase = [
  {
    id: 'malaria',           // Unieke identifier
    title: 'Malaria',        // Display naam
    category: 'Ziektebeeld', // Categorie (Klachtgestuurd, Ziektebeeld, Praktisch, Overzicht)
    keywords: [...],         // Array van zoektermen
    summary: '...',          // Korte samenvatting
    content: '...'           // Volledige markdown content
  },
  // ...
];
```

### index.html - Core Functions

**Retrieval Engine:**
- `findRelevantSections(query)` - Zoekt relevante secties op basis van query
- `calculateRelevance(queryWords, section)` - Berekent relevantiescore
- `normalizeQuery(query)` - Normaliseert zoekquery

**Response Generator:**
- `generateResponse(query, relevantSections)` - Genereert mock response met bronnen

**UI Functions:**
- `sendMessage()` - Verwerkt gebruikersinput
- `addMessage(content, type, sources)` - Voegt bericht toe aan chat
- `formatContent(content)` - Converteert markdown naar HTML

### Styling

Gebruikt dezelfde CSS variables als de hoofdapp:
- `--bg-primary: #0a0f0d`
- `--accent-green: #2dd4a0`
- etc.

## Adding New Content

1. Open `knowledge.js`
2. Voeg nieuwe entry toe aan `knowledgeBase` array:

```javascript
{
  id: 'nieuw-onderwerp',
  title: 'Nieuw Onderwerp',
  category: 'Ziektebeeld',
  keywords: ['keyword1', 'keyword2', ...],
  summary: 'Korte omschrijving...',
  content: `## Titel

Volledige content in markdown formaat...`
}
```

3. Test door te zoeken op de nieuwe keywords

## Future Improvements

- [ ] LLM API integratie (OpenAI/Anthropic)
- [ ] API key configuratie modal
- [ ] Conversation history (localStorage)
- [ ] Streaming responses
- [ ] Links naar hoofdapp secties
- [ ] Improved markdown rendering

## Integration with Main App

Linked from parent app (`../../index.html`) via a nav item in the sidebar. Opens in new tab.

## Content Guidelines

- **Taal**: Nederlands (medische terminologie)
- **Bronnen**: Content gebaseerd op BIUPAMA.md
- **Nauwkeurigheid**: Wijzig geen medische feiten zonder expliciete instructie
