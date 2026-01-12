# Tropengeneeskunde Study App

Interactive study application for tropical medicine. Provides organized, searchable study material for infectious diseases, parasitology, and travel medicine.

## Quick Start

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve locally
python3 -m http.server 8000
# Visit http://localhost:8000
```

No build process or dependencies required.

## Features

- **Three navigation sections**: Klachtgestuurd (symptom-based), Ziektebeelden (diseases), Praktisch (clinical)
- **Search**: Cmd/Ctrl+K for quick search across all content
- **Collapsible cards**: Organized content with expand/collapse
- **Scroll spy**: Active section highlighting in sidebar
- **Mobile responsive**: Hamburger menu on smaller screens
- **Dark theme**: Easy on the eyes during long study sessions

## Interactive Modules

| Module | Location | Description |
|--------|----------|-------------|
| Main App | `index.html` | Primary study content |
| Malaria Quiz | `minigames/Malaria identificatie spel/` | Microscopy identification practice |
| HIV Calculator | `minigames/HIV calculator ris/` | Risk assessment tool |

## Content Source

Medical content is maintained in `BIUPAMA.md` as the single source of truth. Personal study notes in `powerpoints/aantekeningen sammani/` contain lecture annotations and content expansion instructions.

## For Developers

See `CLAUDE.md` for technical documentation including:
- HTML/CSS/JS architecture
- Card component patterns
- Badge classes for pathogen types
- Navigation structure

## Language

All content is in Dutch (Nederlands).

## License

Educational use. Medical images sourced from CDC DPDx (public domain) where applicable.
