// ===================================
// Algoritme Checker - Wizard
// ===================================

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const mainApp = document.getElementById('main-app');
const startButton = document.getElementById('start-button');

const progressSteps = document.querySelectorAll('.progress-step');
const stepContents = document.querySelectorAll('.step-content');

const populationInput = document.getElementById('population');
const sensitivitySlider = document.getElementById('sensitivity');
const sensitivityValue = document.getElementById('sensitivity-value');
const specificitySlider = document.getElementById('specificity');
const specificityValue = document.getElementById('specificity-value');
const prevalenceSlider = document.getElementById('prevalence');
const prevalenceValue = document.getElementById('prevalence-value');

const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

// Result elements
const resultPpv = document.getElementById('result-ppv');
const resultNpv = document.getElementById('result-npv');
const resultTp = document.getElementById('result-tp');
const resultFp = document.getElementById('result-fp');
const resultTn = document.getElementById('result-tn');
const resultFn = document.getElementById('result-fn');
const peopleGrid = document.getElementById('people-grid');
const eli5Text = document.getElementById('eli5-text');
const impactMessage = document.getElementById('impact-message');
const impactTitle = document.getElementById('impact-title');
const impactText = document.getElementById('impact-text');

// Live visualization elements
const liveIconArray = document.getElementById('live-icon-array');
const livePpv = document.getElementById('live-ppv');
const liveNpv = document.getElementById('live-npv');
const ppvMeterArc = document.getElementById('ppv-meter-arc');
const npvMeterArc = document.getElementById('npv-meter-arc');

let currentStep = 1;

// ===================================
// Navigation
// ===================================

function goToStep(step) {
  currentStep = step;

  // Update progress bar
  progressSteps.forEach((ps, i) => {
    const stepNum = i + 1;
    ps.classList.remove('active', 'completed');
    if (stepNum === step) {
      ps.classList.add('active');
    } else if (stepNum < step) {
      ps.classList.add('completed');
    }
  });

  // Update content
  stepContents.forEach(sc => {
    sc.classList.remove('active');
  });
  document.getElementById(`step-${step}`).classList.add('active');
}

// Start button
startButton.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  mainApp.style.display = 'flex';
});

// Navigation buttons
document.querySelectorAll('[data-goto]').forEach(btn => {
  btn.addEventListener('click', () => {
    goToStep(parseInt(btn.dataset.goto));
  });
});

// Progress step clicks
progressSteps.forEach((ps, i) => {
  ps.addEventListener('click', () => {
    const stepNum = i + 1;
    // Only allow going back or to current
    if (stepNum <= currentStep) {
      goToStep(stepNum);
    }
  });
});

// Calculate button
calculateBtn.addEventListener('click', () => {
  const population = parseInt(populationInput.value);
  const sensitivity = parseFloat(sensitivitySlider.value) / 100;
  const specificity = parseFloat(specificitySlider.value) / 100;
  const prevalence = parseFloat(prevalenceSlider.value) / 100;

  if (population > 0) {
    const results = calculate(population, sensitivity, specificity, prevalence);
    displayResults(results);
    goToStep(3);
  } else {
    alert('Voer een geldige populatiegrootte in.');
  }
});

// Reset button
resetBtn.addEventListener('click', () => {
  goToStep(1);
});

// ===================================
// Sliders
// ===================================

sensitivitySlider.addEventListener('input', () => {
  sensitivityValue.textContent = sensitivitySlider.value + '%';
  updateLiveVisualization();
});

specificitySlider.addEventListener('input', () => {
  specificityValue.textContent = specificitySlider.value + '%';
  updateLiveVisualization();
});

prevalenceSlider.addEventListener('input', () => {
  prevalenceValue.textContent = prevalenceSlider.value + '%';
  updateLiveVisualization();
});

populationInput.addEventListener('input', () => {
  updateLiveVisualization();
});

// ===================================
// Examples
// ===================================

const examples = {
  'covid-high': {
    population: 10000,
    sensitivity: 75,
    specificity: 99,
    prevalence: 12,
    description: 'COVID antigeen sneltest. Sensitiviteit ~75%, specificiteit 99%. Prevalentie 12% (tijdens golf).'
  },
  'covid-low': {
    population: 10000,
    sensitivity: 75,
    specificity: 99,
    prevalence: 0.5,
    description: 'Zelfde antigeen test, maar bij 0.5% prevalentie (rustige periode). Vergelijk de PPV met het vorige voorbeeld.'
  },
  'ddimer': {
    population: 1000,
    sensitivity: 95,
    specificity: 40,
    prevalence: 20,
    description: 'D-dimeer: hoge sensitiviteit (95%), lage specificiteit (40%). Resulteert in hoge NPV, lage PPV.'
  },
  'mammografie': {
    population: 100000,
    sensitivity: 85,
    specificity: 90,
    prevalence: 0.5,
    description: 'Mammografie screening: sensitiviteit 85%, specificiteit 90%. Prevalentie 0.5% bij screeningspopulatie.'
  },
  'troponine': {
    population: 1000,
    sensitivity: 99,
    specificity: 85,
    prevalence: 18,
    description: 'hs-Troponine: zeer hoge sensitiviteit (99%), specificiteit 85%. Prevalentie 18% op SEH met pijn op de borst.'
  },
  'psa': {
    population: 10000,
    sensitivity: 80,
    specificity: 35,
    prevalence: 10,
    description: 'PSA: sensitiviteit 80%, lage specificiteit (35%) door diverse oorzaken van PSA-verhoging.'
  },
  'drone-war': {
    population: 10000,
    sensitivity: 99,
    specificity: 99,
    prevalence: 10,
    description: 'Drone-detectie in oorlogsgebied. "99% accuraat" bij 10% vijanden. PPV is hoog (~92%) — de meeste alarmen kloppen.'
  },
  'drone-peace': {
    population: 100000,
    sensitivity: 99,
    specificity: 99,
    prevalence: 0.1,
    description: 'Zelfde drone bij routine surveillance (0,1% vijanden). PPV daalt naar ~9% — meer dan 90% van de alarmen is vals!'
  }
};

const exampleButtons = document.querySelectorAll('.example-btn');
const exampleInfo = document.getElementById('example-info');
const exampleDescription = document.getElementById('example-description');

exampleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.example;
    const ex = examples[key];

    if (ex) {
      populationInput.value = ex.population;
      sensitivitySlider.value = ex.sensitivity;
      sensitivityValue.textContent = ex.sensitivity + '%';
      specificitySlider.value = ex.specificity;
      specificityValue.textContent = ex.specificity + '%';
      prevalenceSlider.value = ex.prevalence;
      prevalenceValue.textContent = ex.prevalence + '%';

      exampleDescription.textContent = ex.description;
      exampleInfo.style.display = 'block';

      exampleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update live visualization
      updateLiveVisualization();
    }
  });
});

// ===================================
// Calculation
// ===================================

function calculate(population, sensitivity, specificity, prevalence) {
  const trueCases = Math.round(population * prevalence);
  const normalCases = population - trueCases;

  const truePositives = Math.round(sensitivity * trueCases);
  const falseNegatives = trueCases - truePositives;
  const falsePositives = Math.round((1 - specificity) * normalCases);
  const trueNegatives = normalCases - falsePositives;

  const totalPositives = truePositives + falsePositives;
  const totalNegatives = trueNegatives + falseNegatives;

  const ppv = totalPositives > 0 ? truePositives / totalPositives : 0;
  const npv = totalNegatives > 0 ? trueNegatives / totalNegatives : 0;

  return {
    truePositives,
    falsePositives,
    trueNegatives,
    falseNegatives,
    ppv,
    npv,
    sensitivity,
    specificity,
    prevalence
  };
}

// ===================================
// Display Results
// ===================================

function displayResults(r) {
  resultPpv.textContent = (r.ppv * 100).toFixed(1) + '%';
  resultNpv.textContent = (r.npv * 100).toFixed(1) + '%';
  resultTp.textContent = fmt(r.truePositives);
  resultFp.textContent = fmt(r.falsePositives);
  resultTn.textContent = fmt(r.trueNegatives);
  resultFn.textContent = fmt(r.falseNegatives);

  updatePeopleGrid(r.truePositives, r.falsePositives);
  updateELI5(r);
  updateImpact(r);
}

// ===================================
// People Grid
// ===================================

function updatePeopleGrid(truePos, falsePos) {
  const total = truePos + falsePos;
  const maxDots = 100;

  let scaledTrue = truePos;
  let scaledFalse = falsePos;

  if (total > maxDots) {
    const scale = maxDots / total;
    scaledTrue = Math.max(1, Math.round(truePos * scale));
    scaledFalse = Math.max(1, Math.round(falsePos * scale));

    while (scaledTrue + scaledFalse > maxDots) {
      if (scaledFalse > scaledTrue) scaledFalse--;
      else scaledTrue--;
    }
  }

  const dots = [];
  for (let i = 0; i < scaledTrue; i++) dots.push('true-positive');
  for (let i = 0; i < scaledFalse; i++) dots.push('false-positive');
  shuffle(dots);

  peopleGrid.innerHTML = '';
  dots.forEach(type => {
    const dot = document.createElement('div');
    dot.className = 'person-dot ' + type;
    peopleGrid.appendChild(dot);
  });
}

// ===================================
// ELI5
// ===================================

function updateELI5(r) {
  const ppvPct = (r.ppv * 100).toFixed(0);
  const npvPct = (r.npv * 100).toFixed(0);
  const total = r.truePositives + r.falsePositives;
  const totalNeg = r.trueNegatives + r.falseNegatives;
  const prevPct = (r.prevalence * 100).toFixed(1);

  const highNpvLowPpv = r.npv >= 0.95 && r.ppv < 0.5;
  const highPpv = r.ppv >= 0.8;

  let text = '';

  if (highNpvLowPpv) {
    text = `<strong>Hoge NPV, lage PPV.</strong><br><br>`;
    text += `De PPV is ${ppvPct}% — van alle positieve uitslagen is dit het percentage dat daadwerkelijk ziek is. `;
    text += `De <span class="highlight good">NPV is ${npvPct}%</span> — van alle negatieve uitslagen is dit percentage daadwerkelijk gezond.`;
    text += `<br><br>Van ${fmt(totalNeg)} negatieve uitslagen zijn er ${fmt(r.trueNegatives)} terecht negatief en ${fmt(r.falseNegatives)} vals negatief.`;
  } else if (highPpv) {
    text = `<strong>Hoge PPV (${ppvPct}%).</strong><br><br>`;
    text += `Van elke 10 positieve uitslagen zijn er ${Math.round(r.ppv * 10)} terecht positief. De NPV is ${npvPct}%.`;
    text += `<br><br>Absoluut: ${fmt(r.truePositives)} terecht positief, ${fmt(r.falsePositives)} vals positief.`;
  } else if (r.ppv >= 0.5) {
    const wrong = Math.round((1 - r.ppv) * 10);
    text = `Van elke 10 positieve uitslagen zijn er ${wrong} vals positief. De NPV is ${npvPct}%.`;
    text += `<br><br>Absoluut: ${fmt(r.truePositives)} terecht positief, ${fmt(r.falsePositives)} vals positief.`;
  } else if (r.ppv >= 0.2) {
    text = `Van elke 10 positieve uitslagen zijn er ${Math.round(r.ppv * 10)} terecht positief.`;
    if (r.npv >= 0.9) {
      text += ` De <span class="highlight good">NPV is ${npvPct}%</span>.`;
    }
    text += `<br><br>Absoluut: ${fmt(r.truePositives)} terecht positief, ${fmt(r.falsePositives)} vals positief.`;
  } else {
    text = `Van elke 100 positieve uitslagen zijn er ${Math.round(r.ppv * 100)} terecht positief.`;
    if (r.npv >= 0.9) {
      text += `<br><br>De <span class="highlight good">NPV is ${npvPct}%</span>.`;
    }
  }

  if (r.prevalence < 0.05 && !highNpvLowPpv) {
    text += `<br><br><em>Opmerking:</em> Bij een prevalentie van ${prevPct}% is het aantal gezonden veel groter dan het aantal zieken, wat het absolute aantal vals-positieven verhoogt.`;
  }

  eli5Text.innerHTML = text;
}

// ===================================
// Impact
// ===================================

function updateImpact(r) {
  const ppvPct = (r.ppv * 100).toFixed(0);
  const npvPct = (r.npv * 100).toFixed(0);

  impactMessage.classList.remove('good', 'bad');

  const highNpvLowPpv = r.npv >= 0.95 && r.ppv < 0.5;

  if (highNpvLowPpv) {
    impactTitle.textContent = 'Hoge NPV, lage PPV';
    impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%. Het percentage vals-positieven is hoger dan het percentage vals-negatieven.`;
  } else if (r.ppv >= 0.7) {
    impactTitle.textContent = 'Hoge PPV en NPV';
    impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%.`;
  } else if (r.ppv >= 0.4) {
    if (r.npv >= 0.9) {
      impactTitle.textContent = 'Matige PPV, hoge NPV';
      impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%.`;
    } else {
      impactTitle.textContent = 'Matige PPV en NPV';
      impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%.`;
    }
  } else {
    if (r.npv >= 0.95) {
      impactTitle.textContent = 'Lage PPV, hoge NPV';
      impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%.`;
    } else {
      impactTitle.textContent = 'Lage PPV en NPV';
      impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%.`;
    }
  }
}

// ===================================
// Helpers
// ===================================

function fmt(n) {
  return n.toLocaleString('nl-NL');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ===================================
// Live Visualization
// ===================================

function initLiveVisualization() {
  // Create 100 dots for icon array
  liveIconArray.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const dot = document.createElement('div');
    dot.className = 'icon-dot';
    liveIconArray.appendChild(dot);
  }
  updateLiveVisualization();
}

function updateLiveVisualization() {
  const population = parseInt(populationInput.value) || 10000;
  const sensitivity = parseFloat(sensitivitySlider.value) / 100;
  const specificity = parseFloat(specificitySlider.value) / 100;
  const prevalence = parseFloat(prevalenceSlider.value) / 100;

  // Calculate values
  const results = calculate(population, sensitivity, specificity, prevalence);
  const ppv = results.ppv;
  const npv = results.npv;

  // Update meter values
  livePpv.textContent = (ppv * 100).toFixed(0) + '%';
  liveNpv.textContent = (npv * 100).toFixed(0) + '%';

  // Update meter arcs (arc length is π * radius = π * 40 ≈ 126)
  const arcLength = 126;
  const ppvArc = ppv * arcLength;
  const npvArc = npv * arcLength;
  ppvMeterArc.setAttribute('stroke-dasharray', `${ppvArc} ${arcLength}`);
  npvMeterArc.setAttribute('stroke-dasharray', `${npvArc} ${arcLength}`);

  // Update icon array - show ratio of TP to FP out of 100 positive results
  const totalPositive = results.truePositives + results.falsePositives;
  let tpCount = 0;
  if (totalPositive > 0) {
    tpCount = Math.round((results.truePositives / totalPositive) * 100);
  }
  const fpCount = 100 - tpCount;

  const dots = liveIconArray.querySelectorAll('.icon-dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('tp', 'fp');
    if (i < tpCount) {
      dot.classList.add('tp');
    } else {
      dot.classList.add('fp');
    }
  });
}

// Initialize live visualization when starting the app
startButton.addEventListener('click', () => {
  initLiveVisualization();
});

// ===================================
// Defense Context
// ===================================

const defenseOverlay = document.getElementById('defense-overlay');
const defenseButton = document.getElementById('defense-button');
const defenseClose = document.getElementById('defense-close');
const defenseToCalc = document.getElementById('defense-to-calc');
const defenseProgressFill = document.getElementById('defense-progress-fill');
const defenseStepLabels = document.querySelectorAll('.defense-step-labels span');
const defenseSteps = document.querySelectorAll('.defense-step');

let currentDefenseStep = 1;
const totalDefenseSteps = 5;

// Open defense context
defenseButton.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  defenseOverlay.style.display = 'flex';
  goToDefenseStep(1);
});

// Close defense context
defenseClose.addEventListener('click', () => {
  defenseOverlay.style.display = 'none';
  welcomeScreen.style.display = 'block';
});

// Defense-to-calculator transition
defenseToCalc.addEventListener('click', () => {
  defenseOverlay.style.display = 'none';
  mainApp.style.display = 'flex';

  // Pre-fill with war scenario (fits slider range)
  populationInput.value = 10000;
  sensitivitySlider.value = 99;
  sensitivityValue.textContent = '99%';
  specificitySlider.value = 99;
  specificityValue.textContent = '99%';
  prevalenceSlider.value = 10;
  prevalenceValue.textContent = '10%';

  initLiveVisualization();
});

// Defense step navigation
function goToDefenseStep(step) {
  currentDefenseStep = step;

  // Update progress bar
  const pct = (step / totalDefenseSteps) * 100;
  defenseProgressFill.style.width = pct + '%';

  // Update step labels
  defenseStepLabels.forEach((label, i) => {
    label.classList.toggle('active', i < step);
  });

  // Show/hide steps
  defenseSteps.forEach(s => s.classList.remove('active'));
  const target = document.getElementById('def-step-' + step);
  if (target) target.classList.add('active');

  // Render grids on demand
  if (step === 3) renderDefenseGrid('defense-grid-war', 92, 8);
  if (step === 4) renderDefenseGrid('defense-grid-peace', 9, 91);
}

// Defense navigation buttons
document.querySelectorAll('[data-defgoto]').forEach(btn => {
  btn.addEventListener('click', () => {
    goToDefenseStep(parseInt(btn.dataset.defgoto));
  });
});

// Render a mini icon grid for defense scenarios
function renderDefenseGrid(containerId, tpCount, fpCount) {
  const container = document.getElementById(containerId);
  if (!container || container.children.length > 0) return;

  const total = tpCount + fpCount;
  const dots = [];
  for (let i = 0; i < tpCount; i++) dots.push('tp');
  for (let i = 0; i < fpCount; i++) dots.push('fp');

  // Shuffle for visual effect
  for (let i = dots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dots[i], dots[j]] = [dots[j], dots[i]];
  }

  dots.forEach(type => {
    const dot = document.createElement('div');
    dot.className = 'icon-dot ' + type;
    container.appendChild(dot);
  });
}

// ===================================
// Human-in-the-Loop Simulatie
// ===================================
// Twee missies met dezelfde sensor. Per doelwit geeft het model een
// eigen zekerheidsscore (zoals een echte classifier). De aantallen
// per missie volgen de PPV van het scenario:
//   Missie 1: oorlogsgebied, PPV ~92% -> 9 van 10 alarmen echt vijand.
//   Missie 2: surveillance,  PPV ~9%  -> 1 van 10 alarmen echt vijand.
// Scorepools zijn zo gekozen dat de sessie-AUC van de sensor 0,85 is.

const gameOverlay = document.getElementById('game-overlay');
const gameButton = document.getElementById('game-button');
const defenseToGame = document.getElementById('defense-to-game');

const SCORES_VIJAND = [97, 95, 93, 91, 89, 88, 86, 84, 83, 79];
const SCORES_BURGER = [90, 87, 85, 82, 80, 78, 76, 74, 72, 70];

const MISSIES = [
  {
    naam: 'MISSIE 1 — ACTIEF CONFLICTGEBIED',
    kort: 'Missie 1: conflictgebied',
    vijanden: 9, burgers: 1,
    ppvTekst: '91,7%', prevalentieTekst: '10% van de gescande personen is vijandig',
    briefing: `
      <p>Je bent operator van een gewapende drone boven een <strong>actief conflictgebied</strong>.
      Er wordt zwaar gevochten; vijandelijke eenheden bewegen door de sector.</p>
      <div class="brief-blok">
        <strong>Jouw rol — human in the loop:</strong> het AI-systeem markeert doelwitten en geeft
        per contact een <strong>zekerheidsscore</strong> — die verschilt per doelwit.
        Vóór elke aanval beslis jij binnen <strong>3 seconden</strong>: VUUR of AFBREKEN.
        De fabrikant claimt dat het systeem "99% accuraat" is.
      </div>
      <p>Je krijgt eerst één <strong>oefendoelwit</strong> (telt niet mee), daarna 10 echte alarmen.
      Op het beeld is niets te onderscheiden — je hebt de score van het systeem en je kennis
      van de context.</p>`
  },
  {
    naam: 'MISSIE 2 — ROUTINE SURVEILLANCE',
    kort: 'Missie 2: surveillance',
    vijanden: 1, burgers: 9,
    ppvTekst: '9,0%', prevalentieTekst: '0,1% van de gescande personen is vijandig',
    briefing: `
      <p>Nieuwe inzet: <strong>routine surveillance boven bewoond gebied</strong> tijdens een
      vredesmissie. Er zijn nauwelijks vijandelijke activiteiten gemeld.</p>
      <div class="brief-blok">
        <strong>Zelfde systeem, zelfde sensor, zelfde soort scores.</strong> Nog steeds
        "99% accuraat" volgens de fabrikant. Nog steeds 3 seconden per beslissing.
      </div>
      <p>Opnieuw 10 alarmen. Denk aan wat je in het veld hebt gezien — en aan wat
      je wéét over de omgeving.</p>`
  }
];

let missieIdx = 0;
let doelwitten = [];      // per doelwit: { vijand: bool, score: int, oefening: bool }
let doelwitIdx = 0;
let gameResultaten = [];  // per missie: {vuurVijand, vuurBurger, abortVijand, abortBurger, timeouts}
let sessieDoelen = [];    // alle echte (niet-oefen) doelwitten voor de AUC
let hudTimer = null;
let hudActief = false;

function gameScreen(id) {
  document.querySelectorAll('.game-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function openGame() {
  welcomeScreen.style.display = 'none';
  defenseOverlay.style.display = 'none';
  mainApp.style.display = 'none';
  gameOverlay.style.display = 'flex';
  missieIdx = 0;
  gameResultaten = [];
  sessieDoelen = [];
  // Scorepools verdelen: 9 vijandscores + 1 burgerscore naar missie 1,
  // de rest naar missie 2 — zo wordt elke poolwaarde precies één keer gebruikt.
  const vs = [...SCORES_VIJAND]; shuffle(vs);
  const bs = [...SCORES_BURGER]; shuffle(bs);
  MISSIES[0].scores = { vijand: vs.slice(0, 9), burger: bs.slice(0, 1) };
  MISSIES[1].scores = { vijand: vs.slice(9), burger: bs.slice(1) };
  toonBriefing();
}

function sluitGame() {
  stopHudTimer();
  gameOverlay.style.display = 'none';
  welcomeScreen.style.display = 'block';
}

function toonBriefing() {
  const m = MISSIES[missieIdx];
  document.getElementById('brief-titel').textContent = m.naam;
  document.getElementById('brief-body').innerHTML = m.briefing;
  document.getElementById('brief-start').textContent = missieIdx === 0 ? 'Start oefening →' : 'Start missie 2 →';
  gameScreen('game-brief');
}

function startMissie() {
  const m = MISSIES[missieIdx];
  doelwitten = [];
  m.scores.vijand.forEach(sc => doelwitten.push({ vijand: true, score: sc, oefening: false }));
  m.scores.burger.forEach(sc => doelwitten.push({ vijand: false, score: sc, oefening: false }));
  shuffle(doelwitten);
  // Missie 1 begint met een oefendoelwit dat niet meetelt
  if (missieIdx === 0) {
    doelwitten.unshift({ vijand: false, score: 88, oefening: true });
  }
  doelwitIdx = 0;
  gameResultaten[missieIdx] = { vuurVijand: 0, vuurBurger: 0, abortVijand: 0, abortBurger: 0, timeouts: 0 };
  gameScreen('game-play');
  volgendDoelwit();
}

function volgendDoelwit() {
  const d = doelwitten[doelwitIdx];
  const m = MISSIES[missieIdx];
  const uitkomst = document.getElementById('hud-uitkomst');
  uitkomst.className = 'hud-uitkomst';
  uitkomst.textContent = '';

  const echteIdx = doelwitten.filter((x, i) => i < doelwitIdx && !x.oefening).length;
  const echteTotaal = doelwitten.filter(x => !x.oefening).length;
  document.getElementById('hud-missie').textContent = d.oefening ? 'OEFENING — telt niet mee' : m.kort;
  document.getElementById('hud-teller').textContent = d.oefening ? 'oefendoelwit' : 'doelwit ' + (echteIdx + 1) + '/' + echteTotaal;
  document.getElementById('hud-score').textContent = '(' + d.score + '%)';
  document.getElementById('btn-vuur').disabled = false;
  document.getElementById('btn-abort').disabled = false;

  // Timerbalk resetten en starten
  const vul = document.getElementById('hud-timervul');
  vul.classList.remove('lopend');
  vul.style.width = '100%';
  void vul.offsetWidth; // reflow forceert herstart van de transitie
  vul.classList.add('lopend');

  hudActief = true;
  hudTimer = setTimeout(() => beslis(null), 3000);
}

function stopHudTimer() {
  clearTimeout(hudTimer);
  hudTimer = null;
  hudActief = false;
}

function beslis(vuur) { // true = vuur, false = afbreken, null = timeout
  if (!hudActief) return;
  stopHudTimer();
  document.getElementById('btn-vuur').disabled = true;
  document.getElementById('btn-abort').disabled = true;
  document.getElementById('hud-timervul').classList.remove('lopend');

  const d = doelwitten[doelwitIdx];
  const uitkomst = document.getElementById('hud-uitkomst');

  if (d.oefening) {
    const keuze = vuur === true ? 'VUUR' : (vuur === null ? 'GEEN BESLUIT (automatisch afgebroken)' : 'AFBREKEN');
    uitkomst.textContent = 'OEFENING VOLTOOID\nJe koos: ' + keuze + '.\nVanaf nu telt elke beslissing.';
    uitkomst.className = 'hud-uitkomst show neutraal';
  } else {
    sessieDoelen.push({ vijand: d.vijand, score: d.score });
    const r = gameResultaten[missieIdx];
    let cls, tekst;
    if (vuur === true) {
      if (d.vijand) { r.vuurVijand++; cls = 'goed'; tekst = 'DREIGING UITGESCHAKELD\nScore was ' + d.score + '%.'; }
      else { r.vuurBurger++; cls = 'fout'; tekst = 'BURGER GERAAKT\nHet systeem gaf ' + d.score + '% zekerheid — en zat ernaast.'; }
    } else {
      if (vuur === null) r.timeouts++;
      const kop = vuur === null ? 'TE LAAT — AUTOMATISCH AFGEBROKEN\n' : 'AFGEBROKEN\n';
      if (d.vijand) { r.abortVijand++; cls = 'neutraal'; tekst = kop + 'Het doelwit wás een vijand (score ' + d.score + '%).'; }
      else { r.abortBurger++; cls = 'goed'; tekst = kop + 'Het doelwit was een burger (score ' + d.score + '%).'; }
    }
    uitkomst.textContent = tekst;
    uitkomst.className = 'hud-uitkomst show ' + cls;
  }

  doelwitIdx++;
  setTimeout(() => {
    if (doelwitIdx < doelwitten.length) {
      volgendDoelwit();
    } else if (missieIdx === 0) {
      missieIdx = 1;
      toonTussenstand();
    } else {
      toonDebrief();
    }
  }, 1500);
}

function missieTabel(r) {
  return `<table class="debrief-tabel">
    <tr><th>Jouw besluit</th><th>Werkelijkheid</th><th>Aantal</th></tr>
    <tr><td>Vuur</td><td class="t-goed">vijand — terecht</td><td><strong>${r.vuurVijand}</strong></td></tr>
    <tr><td>Vuur</td><td class="t-fout">burger — geraakt</td><td><strong>${r.vuurBurger}</strong></td></tr>
    <tr><td>Afgebroken</td><td class="t-neutraal">vijand — ontsnapt</td><td><strong>${r.abortVijand}</strong></td></tr>
    <tr><td>Afgebroken</td><td class="t-goed">burger — gespaard</td><td><strong>${r.abortBurger}</strong></td></tr>
  </table>`;
}

// Mann-Whitney: kans dat een willekeurige vijand een hogere score
// heeft dan een willekeurige burger (ties tellen half mee).
function berekenAuc(doelen) {
  const v = doelen.filter(d => d.vijand).map(d => d.score);
  const b = doelen.filter(d => !d.vijand).map(d => d.score);
  if (!v.length || !b.length) return null;
  let som = 0;
  v.forEach(sv => b.forEach(sb => {
    if (sv > sb) som += 1;
    else if (sv === sb) som += 0.5;
  }));
  return som / (v.length * b.length);
}

function toonTussenstand() {
  const r = gameResultaten[0];
  const m = MISSIES[0];
  document.getElementById('brief-titel').textContent = 'Tussenstand — ' + m.kort;
  document.getElementById('brief-body').innerHTML =
    missieTabel(r) +
    `<p>In dit gebied was ${m.prevalentieTekst}: van de 10 alarmen waren er ${m.vijanden} echt.
    Vuren op een alarm was hier meestal terecht — zeker bij hoge scores.</p>
    <div class="brief-blok"><strong>Nu verandert de context.</strong> Zelfde drone, zelfde sensor,
    zelfde soort scores — ander gebied.</div>` +
    MISSIES[1].briefing;
  document.getElementById('brief-start').textContent = 'Start missie 2 →';
  gameScreen('game-brief');
}

function toonDebrief() {
  const r1 = gameResultaten[0], r2 = gameResultaten[1];
  const burgersGeraakt = r1.vuurBurger + r2.vuurBurger;
  const vijandenTotaal = MISSIES[0].vijanden + MISSIES[1].vijanden;   // 10
  const burgersTotaal = MISSIES[0].burgers + MISSIES[1].burgers;      // 10
  const vuurVijandTotaal = r1.vuurVijand + r2.vuurVijand;
  const abortBurgerTotaal = r1.abortBurger + r2.abortBurger;
  const sens = Math.round(vuurVijandTotaal / vijandenTotaal * 100);
  const spec = Math.round(abortBurgerTotaal / burgersTotaal * 100);
  const auc = berekenAuc(sessieDoelen);
  const aucTekst = auc === null ? '—' : auc.toFixed(2).replace('.', ',');

  document.getElementById('debrief-titel').textContent = 'Debrief: dezelfde sensor, een andere wereld';

  let html = '<h3 style="font-size:0.95rem;margin:0 0 6px;">' + MISSIES[0].naam + '</h3>' + missieTabel(r1);
  html += '<h3 style="font-size:0.95rem;margin:16px 0 6px;">' + MISSIES[1].naam + '</h3>' + missieTabel(r2);

  html += `<div class="debrief-punch">
    <div class="groot">${burgersGeraakt} burger${burgersGeraakt === 1 ? '' : 's'} geraakt</div>
    <p>${burgersGeraakt === 0
      ? 'Je hebt geen burgers geraakt — maar tel ook de vijanden die je daarvoor moest laten ontsnappen.'
      : 'Elk van hen kreeg van het systeem een hoge zekerheidsscore.'}</p>
  </div>`;

  html += `<div class="debrief-les">
    <p style="margin:0 0 10px;"><strong>De sensor was echt goed: AUC ${aucTekst}.</strong></p>
    <p style="margin:0 0 10px;">Per doelwit gaf het model een andere zekerheidsscore. De AUC — de kans dat
    een willekeurige echte vijand een hogere score krijgt dan een willekeurige burger — was in deze
    sessie <strong>${aucTekst}</strong>. Dat is een prima onderscheidend model; het probleem lag niet bij de techniek.</p>
    <p style="margin:0;">Jouw beslissingen kwamen neer op een <strong>sensitiviteit van ${sens}%</strong>
    (${vuurVijandTotaal} van de ${vijandenTotaal} vijanden uitgeschakeld) en een
    <strong>specificiteit van ${spec}%</strong> (${abortBurgerTotaal} van de ${burgersTotaal} burgers gespaard) —
    jouw eigen punt op de ROC-curve.</p>
  </div>`;

  html += `<div class="debrief-les">
    <p style="margin:0 0 10px;"><strong>Wat je zojuist voelde, is de base rate fallacy.</strong></p>
    <p style="margin:0 0 10px;">In missie 1 (${MISSIES[0].prevalentieTekst}) was de PPV van een alarm
    <strong>${MISSIES[0].ppvTekst}</strong>: 9 van de 10 alarmen klopten, en vuren op hoge scores werkte.</p>
    <p style="margin:0 0 10px;">In missie 2 (${MISSIES[1].prevalentieTekst}) was de PPV van hetzelfde soort alarm
    nog maar <strong>${MISSIES[1].ppvTekst}</strong>: 9 van de 10 alarmen waren burgers — ook alarmen met
    hoge scores. Zelfs wie de scores slim gebruikt, raakt hier burgers of laat de enige echte vijand lopen.</p>
    <p style="margin:0;">Een goede AUC beschermt niet tegen een lage a-priorikans; hij verschuift alleen
    wáár je de grens legt. Dit is precies waarom "zinvolle menselijke tussenkomst" meer vraagt dan op een
    knop drukken binnen 3 seconden: de mens moet de context — de prevalentie — kennen en meewegen.</p>
  </div>`;

  document.getElementById('debrief-body').innerHTML = html;

  const nav = document.getElementById('debrief-nav');
  nav.innerHTML = '';
  const btnUitleg = document.createElement('button');
  btnUitleg.className = 'btn-back';
  btnUitleg.textContent = 'Bekijk de uitleg';
  btnUitleg.addEventListener('click', () => {
    gameOverlay.style.display = 'none';
    defenseOverlay.style.display = 'flex';
    goToDefenseStep(1);
  });
  const btnOpnieuw = document.createElement('button');
  btnOpnieuw.className = 'btn-next';
  btnOpnieuw.textContent = 'Opnieuw spelen';
  btnOpnieuw.addEventListener('click', openGame);
  const btnKlaar = document.createElement('button');
  btnKlaar.className = 'btn-next btn-primary';
  btnKlaar.textContent = 'Afsluiten';
  btnKlaar.addEventListener('click', sluitGame);
  nav.appendChild(btnUitleg);
  nav.appendChild(btnOpnieuw);
  nav.appendChild(btnKlaar);

  gameScreen('game-debrief');
}

// Events
gameButton.addEventListener('click', openGame);
if (defenseToGame) defenseToGame.addEventListener('click', openGame);
document.getElementById('game-exit').addEventListener('click', sluitGame);
document.getElementById('brief-start').addEventListener('click', startMissie);
document.getElementById('btn-vuur').addEventListener('click', () => beslis(true));
document.getElementById('btn-abort').addEventListener('click', () => beslis(false));

document.addEventListener('keydown', (e) => {
  if (gameOverlay.style.display === 'none') return;
  if (!document.getElementById('game-play').classList.contains('active')) return;
  if (e.key === 'v' || e.key === 'V') beslis(true);
  if (e.key === 'a' || e.key === 'A') beslis(false);
});
