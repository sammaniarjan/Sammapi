# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dashboard** - A launcher/portal for four standalone web applications used for Dutch military medical education (BIUPAMA curriculum). All apps are static HTML/CSS/JS with no build process, no backend, and no dependencies.

## Architecture

```
Dashboard (index.html)
├── biupama-app-main/     → Tropengeneeskunde studiegids
├── excel-to-ical/        → Lesrooster (Excel → iCal converter)
├── ppv-main/             → PPV/NPV calculator (diagnostische tests)
└── SnaakGPT/             → Military quotes game
```

### Hub (index.html)
Central launcher with links to the apps. Dark theme with green accents matching sub-app aesthetics.

**Hidden app**: excel-to-ical is NOT visibly linked. It sits behind an easter egg: type "rooster" on the hub (desktop) or tap the logo icon 7× quickly (mobile), then enter an access code. Only the SHA-256 hash of the code lives in source (`ACCESS_HASH` in both hub `index.html` and `excel-to-ical/index.html`). The app itself is also gated, so a direct URL still requires the code. Never add a visible link to excel-to-ical or put the plaintext code anywhere in the repo.

### Sub-Apps (each has own CLAUDE.md with detailed docs)

| App | Purpose | Key Files |
|-----|---------|-----------|
| **biupama-app-main** | Medical study content for tropical medicine | `index.html`, `BIUPAMA.md` (source content) |
| **excel-to-ical** | Convert Excel schedules to iCal format | `index.html` (uses xlsx.js library via CDN) |
| **ppv-main** | PPV/NPV calculator for diagnostic tests (Bayesian statistics) | `index.html`, `styles.css`, `script.js` |
| **SnaakGPT** | Gamified military quotes with ranking system | `index.html`, `quotes.js`, `config.js` |

## Development

```bash
# Serve locally (required: internal links use directory URLs like "bellijst/",
# which resolve to index.html over HTTP but not via file://)
python3 -m http.server 8000
# then open http://localhost:8000/
```

No build step required. All apps are self-contained HTML files.

**Internal links**: always link to directories (`href="bellijst/"`, `href="../"`), never to `index.html` directly, so visitors see clean URLs on GitHub Pages.

## Writing style (de-AI-fyer)

All text in this repo must be free of AI-typography tells. **Run the checker before every commit**:

```bash
python3 tools/deaifyer.py        # check; exit code 1 on violations
python3 tools/deaifyer.py --fix  # auto-fixes curly quotes and digit ranges
```

Rules the tool enforces:
- **No em/en dashes as thought-dashes** (`—`, `–`, `&mdash;`, `&ndash;`) in prose. Rewrite by hand to a colon, comma, semicolon, parentheses, or a sentence split; never blind-replace.
- **No curly quotes/apostrophes** (`“ ” ‘ ’` and their entities); `--fix` converts them to straight quotes.
- **Digit ranges use a hyphen** (`10-15`, `18:00-24:00`); `--fix` converts en-dashes between digits.
- Filler words (cruciaal, essentieel, naadloos, robuust, kortom) are reported as warnings only; judge per case, medical emphasis in the study guides is fine.

Also avoid other AI-writing tells when authoring new content: "niet X, maar Y"-contrasts as a tic, rule-of-three lists everywhere, and significance inflation. The vendored `excel-to-ical/lib/` is excluded and must never be touched.

## Deployment

Hosted on GitHub Pages.

**Important**: Avoid spaces in folder/file names (causes deployment failures). Use hyphens instead.

## Design System

All apps share a dark theme with colored accents:
- Hub: `#2dd4a0` (mint green)
- Biupama: `#2dd4a0` (mint green)
- Excel-to-iCal: `#10b981` (emerald)
- PPV-main: `#3b82f6` (blue)
- SnaakGPT: `#00ff00` (neon green, terminal aesthetic)

## Language

All content is in **Dutch** (Nederlands). Target audience: Dutch military medical students.

## Sub-App Documentation

Each sub-app has its own `CLAUDE.md` with detailed technical documentation:
- `biupama-app-main/CLAUDE.md` - Medical content structure, card patterns, badge classes
- `SnaakGPT/CLAUDE.md` - Game modes, rank system, point economy, audio system
