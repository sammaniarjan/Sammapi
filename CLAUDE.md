# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AMA Hub** - A launcher/portal for three standalone web applications used for Dutch military medical education (BIUPAMA curriculum). All apps are static HTML/CSS/JS with no build process, no backend, and no dependencies.

## Architecture

```
AMA Hub (index.html)
├── biupama-app-main/     → Tropengeneeskunde studiegids
├── excel-to-ical/        → AMA Rooster (Excel → iCal converter)
└── SnaakGPT/             → Military quotes game
```

### Hub (index.html)
Central launcher with links to all three apps. Dark theme with green accents matching sub-app aesthetics.

### Sub-Apps (each has own CLAUDE.md with detailed docs)

| App | Purpose | Key Files |
|-----|---------|-----------|
| **biupama-app-main** | Medical study content for tropical medicine | `index.html`, `BIUPAMA.md` (source content) |
| **excel-to-ical** | Convert Excel schedules to iCal format | `index.html` (uses xlsx.js library via CDN) |
| **SnaakGPT** | Gamified military quotes with ranking system | `index.html`, `quotes.js`, `config.js` |

## Development

```bash
# Run any app
open index.html                    # Hub launcher
open biupama-app-main/index.html   # Study app
open excel-to-ical/index.html      # Rooster converter
open SnaakGPT/index.html           # Quotes game

# Or serve locally
python3 -m http.server 8000
```

No build step required. All apps are self-contained HTML files.

## Deployment

Hosted on GitHub Pages.

**Important**: Avoid spaces in folder/file names (causes deployment failures). Use hyphens instead.

## Design System

All apps share a dark theme with green accents:
- Hub: `#2dd4a0` (mint green)
- Biupama: `#2dd4a0` (mint green)
- Excel-to-iCal: `#10b981` (emerald)
- SnaakGPT: `#00ff00` (neon green, terminal aesthetic)

## Language

All content is in **Dutch** (Nederlands). Target audience: Dutch military medical students.

## Sub-App Documentation

Each sub-app has its own `CLAUDE.md` with detailed technical documentation:
- `biupama-app-main/CLAUDE.md` - Medical content structure, card patterns, badge classes
- `SnaakGPT/CLAUDE.md` - Game modes, rank system, point economy, audio system
