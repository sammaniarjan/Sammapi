# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SNAAK COMMAND CENTER** - A hardcore, competitive terminal-style web app for Dutch military quotes. No soft shit. Just laughs, competition, and ranking up through action.

Pure client-side application (HTML/CSS/JS) with terminal/HUD aesthetic, gamification, and multiple game modes.

## Core Philosophy

**HARD. COMPETITIVE. FUNNY.**

This isn't a gentle reflection app. It's for people who want to:
- Laugh their ass off at absurd military quotes
- Compete and rank up
- Battle quotes head-to-head
- Generate custom roasts
- Survive chaos mode

## Architecture

### File Structure

Extra: **doom.html** — SNAAK DOOM, a standalone pseudo-3D raycasting shooter (canvas, DDA raycasting, sprite enemies, wave survival). Launched from the MINI-GAMES menu. Loads `quotes.js` (random quote toast on each kill) and `config.js` (rank lookup). Awards rank points directly to the shared `playerStats` localStorage key: 5/kill + 10/completed wave, granted on game over. Terminal aesthetic (green raycast walls, CRT scanlines, procedurally drawn enemy sprites). Desktop: WASD + mouse (pointer lock) + click/space to fire, R reload, ESC pause. Touch devices get on-screen controls.

1. **index.html** - Complete single-page app
   - Terminal aesthetic with scanlines, CRT effects, monospace font
   - 6 game modes: Quotes, Battle, Roast Generator, Quiz, Chaos, Leaderboard
   - HUD-style header with live stats (score, streak, rank)
   - Boot sequence animation
   - All CSS and JS embedded

2. **quotes.js** - Quote arsenal & game data
   - `snaakQuotes` object: 6 categories of quotes (arrays of strings)
   - `roastTemplates` & `roastComponents`: Template system for roast generator
   - `achievements`: Achievement system config
   - `allQuotes`: Flattened array for random selection

3. **config.js** - Game configuration
   - Rank progression thresholds (KOJP → MAJOOR)
   - Point system (quoteView: 1, battleWin: 10, quizCorrect: 5, etc.)
   - Timing configs for battles, quiz, chaos mode
   - Visual effect toggles
   - Audio settings

## Game Modes Explained

### 1. QUOTES Mode
Basic mode - shows random quotes. +1 point per quote viewed. Foundation for learning quotes.

### 2. BATTLE Mode
**Core competitive feature.** Two random quotes face off. User votes for the hardest/funniest. 8-second timer. Auto-picks random if time expires. +2 points per vote. Immediate next battle after voting.

### 3. ROAST GENERATOR
Custom roast builder using template system. Randomly combines components:
- Templates: "U ziet eruit als {object}", "U {action} als {comparison}", etc.
- Components: objects, bodyparts, comparisons, actions, skills, ridiculous subjects
Generates unique roasts like "U marcheert als een dronken flamingo"
+3 points per generated roast.

### 4. QUIZ Mode
Test knowledge. Shows quote → guess correct category from 4 options (1 correct, 3 wrong). Visual feedback (green=correct, red=wrong). +5 points for correct answer. Auto-starts next question after 2 seconds.

### 5. CHAOS Mode
**Hardcore survival mode.** 10 random quotes rapid-fire in 20 seconds (2 seconds between quotes). Visual counter and progress bar. Chaos flash animation on each quote. +15 points for completing all 10. Tests endurance and quote overload.

### 6. LEADERBOARD (Ranks)
Shows full rank progression table:
- 10 ranks from KOJP (0 pts) to MAJOOR (10,000 pts)
- Visual indicators (achieved ranks colored, locked ranks dimmed)
- Current score display
- "Next rank" info (how many points needed)

## Rank Progression System

**Earn ranks through ACTION, not passive viewing.**

Ranks (threshold → name → title):
- 0: KOJP "Klote Ongemotiveerde Jankende Pax"
- 100: RECRUUT "Verse Pax"
- 250: SOLDAAT "Kan Mee"
- 500: KORPORAAL "Begint Erop Te Lijken"
- 1000: SERGEANT "Echte Snaak"
- 2000: SERGEANT-MAJOOR "Harde Jongen"
- 3500: VAANDRIG "Respect"
- 5000: LUITENANT "Command Material"
- 7500: KAPITEIN "Absolute Snaba"
- 10000: MAJOOR "Legende"

Each rank has unique color. Level-up triggers audio + notification.

## Point Economy

- Quote view: 1 pt (minimal - encourages action)
- Battle vote: 2 pts (engagement)
- Roast create: 3 pts (creativity)
- Quiz correct: 5 pts (skill)
- Chaos complete: 15 pts (endurance)
- Streak day: 20 pts (loyalty)

Balance: Passive viewing gives minimal points. Active modes (quiz, chaos) give significant rewards.

## Visual Design Language

**Terminal/Command Center Aesthetic:**
- Pure black background (#000000)
- Neon green text (#00ff00)
- Yellow accents for scores/ranks (#ffff00)
- Red for warnings/timers (#ff0000)
- Cyan for labels (#00ffff)

**Effects:**
- Scanlines: Animated 4px gradient overlay (CRT effect)
- Terminal flicker: Subtle opacity pulse
- Glow: Box-shadows on borders (green glow)
- ASCII art: Box-drawing characters for headers
- Monospace font: 'Share Tech Mono' (Google Fonts)

**Responsiveness:**
- Battle/Quiz: Single column on mobile (<768px)
- Mode buttons: Smaller font/padding on mobile
- Quotes: Scale down to 1.3rem on mobile
- Always maintain terminal aesthetic

## State Management

**localStorage Schema:**
```javascript
playerStats: {
  score: number,
  streak: number,
  battles: number,
  quizzes: number
}
```

No other persistence needed. Stateless modes (no saved progress in battles/quiz/chaos).

## Audio System

Web Audio API oscillator-based sounds:
- click: 1200Hz, 0.05s (UI interactions)
- win: 880Hz, 0.15s (correct answers, votes)
- lose: 220Hz, 0.2s (wrong answers)
- levelup: Multi-tone [440, 550, 660]Hz (rank up)
- chaos: 1600Hz, 0.03s (rapid fire)

Volume: 0.05 (5% - subtle). Unlocked on first user interaction (iOS/Safari requirement).

## Key Implementation Patterns

### Mode Switching
Single `switchMode(mode)` function:
- Updates active button styling
- Changes action button text
- Calls mode-specific show function
- Plays click sound

### Battle Timer
`setInterval` counting down from 8. Updates DOM every second. Auto-votes random choice at 0. Cleanup with `clearInterval`.

### Roast Generation
Template string replacement:
1. Pick random template
2. Replace all `{placeholder}` tokens
3. Random component selection
4. Display result

### Quiz Logic
1. Pick random quote
2. Find correct category
3. Generate 3 wrong categories (filtered, random)
4. Shuffle options
5. On answer: disable clicks, show correct/wrong styling, delay next question

### Chaos Mode
Recursive `showNextChaosQuote()`:
- Increment counter
- Update progress bar
- Show quote with flash animation
- setTimeout to next quote (2s)
- Base case: counter >= total → completion reward

## Boot Sequence

Fixed overlay with sequential text animations. Hidden on any key/click. Triggers `init()` which loads first mode.

## Development Workflow

### Adding Quotes
Edit `quotes.js` → add strings to category arrays. Quotes are simple strings, no metadata needed.

### Adjusting Points/Timing
Edit `config.js` → modify `points` or `battle`/`quiz`/`chaos` timing values.

### New Rank
Add to `snaakConfig.ranks` with threshold, name, title, color.

### New Game Mode
1. Add button to `.mode-selector`
2. Add case to `switchMode()`
3. Create `show{Mode}Mode()` function
4. Add case to `handleAction()`
5. Implement mode logic

### Visual Tweaks
All CSS in `<style>` block in index.html. CSS variables at `:root`. Maintain terminal aesthetic (green/black/neon).

## Testing

Open index.html in browser. No build step required.

Test checklist:
- Boot sequence (key/click to dismiss)
- All 6 modes functional
- Rank progression (manually adjust score in localStorage to test)
- Mobile responsive (<768px)
- Audio (after first interaction)
- Timer accuracy (battle 8s, chaos 2s intervals)

## Technical Constraints

- Pure vanilla JS (no frameworks)
- No backend/API calls
- localStorage only persistence
- Single HTML file architecture
- Embedded CSS/JS for portability

## Performance Notes

- Minimal DOM manipulation (innerHTML swaps per mode)
- No heavy animations (just CSS transitions)
- Audio optimized (single oscillator per sound)
- Scanlines CSS-only (no JS)

## Future Expansion Ideas

If adding features, maintain core principles:
- Hard, not soft
- Competitive, not passive
- Funny, not serious
- Terminal aesthetic
- Action earns rewards

Possible additions:
- Daily challenges (specific quote to find)
- Multiplayer battles (requires backend)
- Custom quote submission (with moderation)
- Sound packs (different audio themes)
- Export stats/share rank
