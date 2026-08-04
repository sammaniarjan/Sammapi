# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**AMA Rooster** - Excel to iCal converter for Dutch military medical schedules. Part of the [AMA Hub](../CLAUDE.md) project. Converts Excel rooster files to iCal format with calendar visualization.

## Development

```bash
open index.html                    # Direct file
python3 -m http.server 8000        # Local server
```

No build step. Single-file app with inline CSS/JS.

## Architecture

`index.html` contains everything:
- **Access gate**: SHA-256 hashed access code required (sessionStorage token `ama-rooster-toegang`); only the hash is in source. Hub easter egg (type "rooster" or 7× logo taps) opens the same gate.
- **Privacy**: 100% local processing, enforced by a CSP meta tag that blocks ALL network requests. xlsx.js is vendored locally in `lib/` (NOT loaded from CDN — do not reintroduce external resources). See `PRIVACY.md`.
- **Excel parsing**: Uses local `lib/xlsx.full.min.js` to parse `.xlsx/.xls` files
- **Calendar views**: Week and month views with navigation
- **Change detection**: Compares uploads to detect new/modified events
- **iCal export**: Generates `.ics` files for calendar import
- **LocalStorage**: Persists events between sessions

### Expected Excel Format

| Dag | Datum | Tijd | Locatie | Module | Les | Docent |
|-----|-------|------|---------|--------|-----|--------|
| ma  | 45678 | 0900-1200 | Zaal A | TG1 | Malaria | Dr. X |

- Column 1 (Datum): Excel serial date number
- Column 2 (Tijd): Format `HHMM-HHMM` or `dzv` (hele dag)
- Event title format: `[MODULE] Lesson - Teacher`

### Key Functions

- `parseExcelData(data)` - Converts Excel rows to event objects
- `compareRoosters(oldEvents, newEvents)` - Detects added/modified/deleted events
- `generateStableUID(event)` - Creates consistent UIDs for change tracking
- `exportIcal()` - Generates iCal file content

## Files

| File | Purpose |
|------|---------|
| `index.html` | Complete app (HTML/CSS/JS) |
| `lib/xlsx.full.min.js` | Vendored SheetJS library (local, no CDN) |
| `PRIVACY.md` | Privacy statement + technical proof for privacy officer |
| `convertor.js` | Legacy React component (unused, for reference) |
| `voorbeeld rooster/` | Test Excel files |

## Design

- Accent color: `#10b981` (emerald)
- Dark theme matching AMA Hub aesthetic
- Dutch language UI

## Notes

- xlsx is loaded from local `lib/xlsx.full.min.js` (copied from `node_modules/xlsx/dist/`); never switch back to a CDN — the CSP blocks it and it undermines the privacy guarantee
- To change the access code: compute `printf 'NEWCODE' | shasum -a 256` (uppercase!) and replace the `ACCESS_HASH` constant in BOTH `index.html` (gate script) and the hub `../index.html` (easter egg script)
- Sample roster in `voorbeeld rooster/` for testing
