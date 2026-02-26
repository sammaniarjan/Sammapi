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
