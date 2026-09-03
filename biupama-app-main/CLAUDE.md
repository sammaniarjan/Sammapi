# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application for studying tropical medicine (Tropengeneeskunde). It presents medical study material in an interactive, single-page format with navigation and search capabilities.

**Architecture**: Static HTML/CSS/JavaScript application - no build process, no dependencies, no backend. Includes PWA support for offline use.

## File Structure

```
.
├── index.html           # Main application (HTML + inline CSS/JS)
├── manifest.json        # PWA manifest for installable app
├── service-worker.js    # Offline caching (stale-while-revalidate)
├── BIUPAMA.md          # Source study content (Dutch tropical medicine)
├── images/             # Medical diagrams and maps
│   ├── huidafwijkingen/  # Skin condition images
│   └── *.png, *.jpg      # Various medical images
├── minigames/          # Interactive learning modules
│   ├── Malaria identificatie spel/  # Microscopy quiz (has own CLAUDE.md)
│   └── HIV calculator ris/          # HIV risk calculator
└── powerpoints/        # Reference PDFs and PowerPoints
    ├── aantekeningen sammani/  # Personal study notes (.docx files)
    └── *.pdf           # Lecture slides and reference materials
```

**Note on Word documents**: The `aantekeningen sammani/` folder contains study notes in .docx format. To read these:
```bash
textutil -convert txt -stdout "powerpoints/aantekeningen sammani/filename.docx"
```

## Content Architecture

The application displays tropical medicine content structured in three navigation sections:

1. **Klachtgestuurd** (Symptom-Based Approach)
   - Koorts (fever), diarree, huidafwijkingen, eosinofilie, icterus, hepatosplenomegalie, neurologie

2. **Ziektebeelden** (Disease Entities)
   - Malaria, tyfus, dengue, schistosomiasis, filariasis, tuberculose, HIV/AIDS, leishmaniasis, etc.

3. **Praktisch** (Practical/Clinical)
   - 1e Lijn Benadering (first-line clinical approach)
   - Endemische gebieden, laboratorium, antibiotica, malariapreventie, vaccinaties, gifdieren, keuringsonderzoek

The content source is `BIUPAMA.md` - a comprehensive markdown file that should be kept as the single source of truth for medical content.

## Key Technical Details

### HTML Structure (index.html)

- **Self-contained**: All CSS and JavaScript are inline (no external files)
- **Responsive design**: Grid layout that adapts to mobile with hamburger menu
- **Warm light theme**: Custom CSS variables define the color scheme (green accent `#0d9f6e` on a warm light background `#e2d9cc`, matching the hub)
- **Navigation**:
  - Sidebar navigation auto-generated from content sections
  - Search functionality for filtering content
  - Image modal for viewing medical images

### Content Rendering

The main content is hardcoded in HTML within the `<main>` element. When updating medical content:

1. Update `BIUPAMA.md` (the authoritative source)
2. Manually sync relevant sections to `index.html`
3. Ensure proper HTML structure with section IDs for navigation

### Styling System

Uses CSS custom properties (variables) for theming:
- Warm light palette (beige background, white cards, green accent)
- Color-coded badges for pathogen types (bacteria, protozoa, helminths, viruses, fungi)
- Responsive breakpoint at 768px for mobile

### Card Component Pattern

Content is organized in collapsible cards using this structure:
```html
<div class="card" data-card>
    <div class="card-header">
        <div>
            <div class="card-title">Title</div>
            <div class="card-subtitle">Subtitle</div>
        </div>
        <svg class="card-toggle">...</svg>
    </div>
    <div class="card-content">
        <div class="card-body">
            <!-- Content here -->
        </div>
    </div>
</div>
```

### Badge Classes for Pathogen Types

Use these classes to color-code pathogens:
- `badge-bacteria` - Bacterial infections
- `badge-protozoa` - Protozoa (also used for neurotoxic effects)
- `badge-helminth` - Helminths (also used for cytotoxic effects)
- `badge-virus` - Viral infections
- `badge-fungi` - Fungal infections

### Alert Boxes

Use alert classes for callouts:
- `alert alert-danger` - Critical warnings, red flags
- `alert alert-warning` - Cautions, important notes
- `alert alert-info` - General information

### Interactive Components

Some sections contain interactive JavaScript elements:
- **GCS Calculator** (neurology section): Radio button inputs with score calculation
- **Search Modal**: Global search functionality (Cmd/Ctrl+K to open)
- **Scroll Spy**: Automatically highlights current section in sidebar
- **Image Modal**: Click images with `onclick="openModal(this)"` for lightbox view
- Pattern: Use inline `<script>` tags within the card for component-specific JavaScript

### Search Keywords (searchData array)

The search functionality uses a `searchData` array in the JavaScript. When adding new sections:
```javascript
{ title: 'Section Name', category: 'Ziektebeeld', section: 'section-id', keywords: 'keyword1 keyword2 keyword3' },
```

### Internal Links

Use the `internal-link` class for hyperlinks within the app:
```html
<a href="#section-id" class="internal-link">Link text</a>
```

## Working with Study Notes

The `powerpoints/aantekeningen sammani/` folder contains personal study notes in .docx format. These notes may include:
- Additional explanations and clarifications from lectures
- Instructions for expanding content (marked as `[instructie: ...]`)
- Supplementary information to add to the main content

**Example from Aantekeningen malaria dag 3.docx**:
- Contains notes about parasite definitions and host relationships
- Specifies that mosquitoes are the definitive host (sexual reproduction)
- Notes about clonal expansion in humans vs sexual reproduction in mosquitoes
- Instructions to add this content to the Parasitology & Taxonomy section

When these notes contain instructions to update content:
1. Read the notes using textutil command
2. Integrate the information into `BIUPAMA.md`
3. Update corresponding sections in `index.html` if needed

## Development Workflow

### Running the Application

```bash
# Open directly in browser
open index.html

# Or serve with Python
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Making Content Updates

1. Edit content in `BIUPAMA.md`
2. Transfer changes to corresponding sections in `index.html`
3. Refresh browser to see changes (no build step needed)

### Adding Images

1. Place images in `images/` directory (or `images/huidafwijkingen/` for skin conditions)
2. Reference in HTML: `<img src="images/filename.png" alt="...">`
3. Use `onclick="openModal(this)"` for lightbox functionality

### Modifying Styles

All CSS is in the `<style>` block in `index.html`. Key sections:
- `:root` - CSS variables for colors, spacing, shadows
- `.app-container` - Main grid layout
- `.sidebar` - Navigation sidebar
- `@media (max-width: 768px)` - Mobile responsive styles

## Important Considerations

### Medical Content

- Content is in **Dutch** (medical terminology for Dutch medical students)
- Focused on tropical/travel medicine for the BIUPAMA curriculum
- Tables contain critical diagnostic, treatment, and epidemiological information
- References to specific drugs, dosages, and geographic disease distributions

### Writing Tone & Style

- **Wetenschappelijk**: Gebruik evidence-based formuleringen en correcte medische terminologie
- **Genuanceerd**: Vermijd absolute uitspraken waar nuance nodig is (bijv. "vaak" i.p.v. "altijd", "kan voorkomen" i.p.v. "komt voor")
- **Geen superlatieven**: Vermijd hyperbolen zoals "zeer belangrijk", "uiterst gevaarlijk", "absoluut noodzakelijk" - laat de feiten spreken
- **Objectief**: Presenteer informatie neutraal zonder onnodige dramatisering
- **Beknopt**: Gebruik korte, duidelijke zinnen die passen bij medisch studiemateriaal

### When Editing

- **Preserve medical accuracy**: Do not modify medical facts, dosages, or diagnostic criteria without explicit instruction
- **Maintain table structure**: Many tables are critical reference material
- **Keep navigation sync**: Section IDs must match sidebar navigation links
- **Test responsiveness**: Check both desktop and mobile (< 768px) layouts

### Navigation Links

Sidebar navigation uses hash links (`#section-id`) that must match the `id` attributes on content sections. When adding new sections:
1. Add section with unique `id`
2. Add corresponding navigation link in sidebar
3. Ensure smooth scroll behavior works

## Git Workflow

```bash
# Check status
git status

# Stage and commit changes
git add .
git commit -m "descriptive message"

# Push changes
git push origin main
```

## Project Context

- **Target audience**: Medical students studying tropical medicine
- **Language**: Dutch (Nederlands)
- **Medical focus**: Infectious diseases, parasitology, travel medicine
- **Educational level**: Advanced medical curriculum (BIUPAMA program)
