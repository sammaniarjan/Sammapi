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
    description: 'Drone-detectie in oorlogsgebied. "99% accuraat" bij 10% vijanden. PPV is hoog (~92%): de meeste alarmen kloppen.'
  },
  'drone-peace': {
    population: 100000,
    sensitivity: 99,
    specificity: 99,
    prevalence: 0.1,
    description: 'Zelfde drone bij routine surveillance (0,1% vijanden). PPV daalt naar ~9%: meer dan 90% van de alarmen is vals!'
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
    text += `De PPV is ${ppvPct}%: van alle positieve uitslagen is dit het percentage dat daadwerkelijk ziek is. `;
    text += `De <span class="highlight good">NPV is ${npvPct}%</span>: van alle negatieve uitslagen is dit percentage daadwerkelijk gezond.`;
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
// eigen zekerheidsscore. De scorepools overlappen sterk, zodat de
// missies qua scores hetzelfde aanvoelen (sessie-AUC: 0,72).
//   Missie 1: oorlogsgebied, 9 van 10 meldingen echt vijand.
//   Missie 2: surveillance,  1 van 10 meldingen echt vijand.

const gameOverlay = document.getElementById('game-overlay');
const gameButton = document.getElementById('game-button');
const defenseToGame = document.getElementById('defense-to-game');

const SCORES_VIJAND = [98, 96, 93, 91, 89, 87, 85, 82, 79, 75];
const SCORES_BURGER = [93, 90, 88, 85, 83, 81, 78, 75, 71, 67];

const MISSIES = [
  {
    naam: 'MISSIE 1: CONFLICTGEBIED',
    kort: 'Missie 1: conflictgebied',
    vijanden: 9, burgers: 1,
    regels: [
      'Je bestuurt een gewapende drone boven een <strong>oorlogsgebied</strong>.',
      'Er wordt zwaar gevochten. Overal vijandelijke eenheden.',
      'De computer wijst doelwitten aan, met een score. Hoe hoger, hoe zekerder.',
      'Maar jij beslist: <strong>vuren of afbreken</strong>. Je hebt 3 seconden.',
      'Eerst een oefendoelwit. Daarna telt elke keuze.'
    ]
  },
  {
    naam: 'MISSIE 2: SURVEILLANCE',
    kort: 'Missie 2: surveillance',
    vijanden: 1, burgers: 9,
    regels: [
      'Nieuwe opdracht. Zelfde drone, zelfde computer.',
      'Je vliegt nu boven een <strong>rustige stad</strong>. Vredesmissie.',
      'Vijandelijke activiteit is hier zeldzaam.',
      'Weer 10 meldingen. Jij beslist weer.'
    ]
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

// Regels die een voor een in beeld komen
function revealHtml(regels, startVertraging) {
  let d = startVertraging || 0;
  return regels.map(r => {
    const html = '<p class="brief-regel reveal-line" style="animation-delay:' + d.toFixed(1) + 's">' + r + '</p>';
    d += 0.8;
    return html;
  }).join('');
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
  // de rest naar missie 2. Elke poolwaarde wordt precies een keer gebruikt.
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
  document.getElementById('brief-body').innerHTML = revealHtml(m.regels);
  document.getElementById('brief-start').textContent = missieIdx === 0 ? 'Start →' : 'Start missie 2 →';
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
    doelwitten.unshift({ vijand: false, score: 86, oefening: true });
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
  document.getElementById('hud-missie').textContent = d.oefening ? 'OEFENING (telt niet mee)' : m.kort;
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
    const keuze = vuur === true ? 'VUUR' : (vuur === null ? 'GEEN BESLUIT' : 'AFBREKEN');
    uitkomst.textContent = 'OEFENING KLAAR\nJe koos: ' + keuze + '.\nVanaf nu telt elke keuze.';
    uitkomst.className = 'hud-uitkomst show neutraal';
  } else {
    sessieDoelen.push({ vijand: d.vijand, score: d.score });
    const r = gameResultaten[missieIdx];
    let cls, tekst;
    if (vuur === true) {
      if (d.vijand) { r.vuurVijand++; cls = 'goed'; tekst = 'RAAK. DREIGING UITGESCHAKELD\nScore was ' + d.score + '%.'; }
      else { r.vuurBurger++; cls = 'fout'; tekst = 'BURGER GERAAKT\nDe computer gaf ' + d.score + '%. De computer zat ernaast.'; }
    } else {
      if (vuur === null) r.timeouts++;
      const kop = vuur === null ? 'TE LAAT. AUTOMATISCH AFGEBROKEN\n' : 'AFGEBROKEN\n';
      if (d.vijand) { r.abortVijand++; cls = 'neutraal'; tekst = kop + 'Dit was wel een vijand. Score ' + d.score + '%.'; }
      else { r.abortBurger++; cls = 'goed'; tekst = kop + 'Dit was een burger. Score ' + d.score + '%.'; }
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
    <tr><th>Jouw keuze</th><th>Werkelijkheid</th><th>Aantal</th></tr>
    <tr><td>Vuur</td><td class="t-goed">vijand, terecht</td><td><strong>${r.vuurVijand}</strong></td></tr>
    <tr><td>Vuur</td><td class="t-fout">burger, geraakt</td><td><strong>${r.vuurBurger}</strong></td></tr>
    <tr><td>Afgebroken</td><td class="t-neutraal">vijand, ontsnapt</td><td><strong>${r.abortVijand}</strong></td></tr>
    <tr><td>Afgebroken</td><td class="t-goed">burger, gespaard</td><td><strong>${r.abortBurger}</strong></td></tr>
  </table>`;
}

// Mann-Whitney: kans dat een willekeurige vijand een hogere score
// heeft dan een willekeurige burger (gelijke scores tellen half mee).
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
  document.getElementById('brief-titel').textContent = 'Missie 1 zit erop';
  document.getElementById('brief-body').innerHTML =
    missieTabel(r) +
    revealHtml([
      'Hier was vuren meestal raak: <strong>9 van de 10</strong> meldingen waren echt een vijand.',
      '<strong>Maar nu verandert alles.</strong>'
    ], 0.3) +
    revealHtml(MISSIES[1].regels, 2.4);
  document.getElementById('brief-start').textContent = 'Start missie 2 →';
  gameScreen('game-brief');
}

// Teller die oploopt naar de eindwaarde
function telOp(el, naar, duurMs) {
  const start = performance.now();
  function stap(nu) {
    const t = Math.min(1, (nu - start) / duurMs);
    el.textContent = Math.round(t * naar);
    if (t < 1) requestAnimationFrame(stap);
  }
  requestAnimationFrame(stap);
}

function toonDebrief() {
  const r1 = gameResultaten[0], r2 = gameResultaten[1];
  const burgersGeraakt = r1.vuurBurger + r2.vuurBurger;
  const vuurVijandTotaal = r1.vuurVijand + r2.vuurVijand;
  const abortBurgerTotaal = r1.abortBurger + r2.abortBurger;
  const auc = berekenAuc(sessieDoelen);
  const aucPct = auc === null ? null : Math.round(auc * 100);

  document.getElementById('debrief-titel').textContent = 'Debrief';

  let html = `<div class="debrief-punch reveal-line" style="animation-delay:0.3s">
    <div class="groot"><span id="punch-num">0</span> burger${burgersGeraakt === 1 ? '' : 's'} geraakt</div>
    <p>${burgersGeraakt === 0
      ? 'Geen burgers geraakt. Maar hoeveel vijanden liet je lopen?'
      : 'Elke burger kreeg van de computer een hoge score.'}</p>
  </div>`;

  html += `<div class="reveal-line" style="animation-delay:1.4s">
    <h3 style="font-size:0.95rem;margin:0 0 6px;">${MISSIES[0].naam}</h3>` + missieTabel(r1) +
    `<h3 style="font-size:0.95rem;margin:14px 0 6px;">${MISSIES[1].naam}</h3>` + missieTabel(r2) + `</div>`;

  html += `<div class="debrief-les reveal-line" style="animation-delay:2.5s">
    <p style="margin:0 0 8px;"><strong>De computer was niet kapot.</strong></p>
    <p style="margin:0;">Zet een echte vijand naast een burger, en in <strong>${aucPct} van de 100 keer</strong>
    geeft de computer de vijand de hoogste score. Dat heet een AUC van 0,${aucPct}. Best goed.</p>
  </div>`;

  html += `<div class="debrief-les reveal-line" style="animation-delay:3.6s">
    <p style="margin:0 0 8px;"><strong>Dit deed jij.</strong></p>
    <p style="margin:0 0 4px;">Vijanden uitgeschakeld: <strong>${vuurVijandTotaal} van de 10</strong>.</p>
    <p style="margin:0;">Burgers gespaard: <strong>${abortBurgerTotaal} van de 10</strong>.</p>
  </div>`;

  html += `<div class="debrief-les reveal-line" style="animation-delay:4.7s">
    <p style="margin:0 0 8px;"><strong>Wat ging er dan mis? De omgeving.</strong></p>
    <p style="margin:0 0 4px;">In het oorlogsgebied was 9 van de 10 meldingen echt.</p>
    <p style="margin:0 0 4px;">Boven de stad was 9 van de 10 meldingen een burger.</p>
    <p style="margin:0 0 8px;">Zelfde computer. Zelfde soort scores. Andere wereld.</p>
    <p style="margin:0;">Daarom mag een mens nooit blind op een score vertrouwen.
    <strong>Je moet weten waar je bent.</strong></p>
  </div>`;

  document.getElementById('debrief-body').innerHTML = html;

  const nav = document.getElementById('debrief-nav');
  nav.innerHTML = '';
  const btnUitleg = document.createElement('button');
  btnUitleg.className = 'btn-back';
  btnUitleg.textContent = 'Hoe zit dit?';
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
  setTimeout(() => telOp(document.getElementById('punch-num'), burgersGeraakt, 1300), 600);
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

// Directe start vanaf het dashboard (kaart "Human in the Loop")
if (new URLSearchParams(window.location.search).has('simulatie')) {
  openGame();
}
