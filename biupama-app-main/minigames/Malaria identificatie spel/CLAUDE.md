# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive quiz game for medical students to practice microscopic identification of malaria parasites (Plasmodium species) in Giemsa-stained thin blood smears. Part of the BIUPAMA tropical medicine curriculum.

**Architecture**: Single HTML file with inline CSS/JS. No build process, no dependencies.

## Running the Application

```bash
open index.html
# or
python3 -m http.server 8000
```

## File Structure

```
├── index.html          # Complete application (HTML + CSS + JS)
├── CREDITS.txt         # CDC image attribution (required for compliance)
└── images/             # 49 local microscopy images
    ├── falciparum/     # P. falciparum slides (14 images)
    ├── vivax/          # P. vivax slides (11 images)
    ├── ovale/          # P. ovale slides (11 images)
    └── malariae/       # P. malariae slides (13 images)
```

## Code Architecture

### JavaScript Data Structure

The `malariaData` object contains 4 species, each with:
- `images[]`: Array of `{url, stage}` objects pointing to local images
- `explanation`: Object with `title`, `description`, `keyFeatures[]`, `clinical`

### Core Functions

- `generateQuestionOrder()` - Creates randomized 10-question quiz (2-3 images per species)
- `loadQuestion()` / `generateOptions()` - Render current question
- `selectAnswer()` - Handle answer, update score, show feedback
- `showExplanation()` - Display morphological learning content
- `showFinalScore()` - Final summary with species comparison chart

### CSS Variables

Dark theme using custom properties: `--bg-dark`, `--accent-red`, `--accent-gold`, `--correct`, `--incorrect`

## Content Guidelines

- **Language**: Dutch medical terminology
- **Medical accuracy**: Do not modify morphological descriptions, clinical notes, or diagnostic criteria without explicit instruction
- **Image paths**: Relative paths to `images/[species]/filename.jpg`

## Image Copyright

All images are **CDC DPDx public domain** (U.S. federal government work). Attribution is documented in CREDITS.txt. When adding new images:
1. Use only public domain or properly licensed images
2. Update CREDITS.txt with source attribution
3. Follow naming convention: `Px_[stage]_thin[letter].jpg`

## Integration with Main App

This minigame is linked from the parent BIUPAMA app (`../index.html`) via a "Quiz" button in the Malaria section header. The link opens in a new tab.
