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
});

specificitySlider.addEventListener('input', () => {
  specificityValue.textContent = specificitySlider.value + '%';
});

prevalenceSlider.addEventListener('input', () => {
  prevalenceValue.textContent = prevalenceSlider.value + '%';
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
    description: 'COVID antigeen sneltest tijdens een golf. Sensitiviteit ~75%, specificiteit 99%. Bij 12% prevalentie werkt de test goed.'
  },
  'covid-low': {
    population: 10000,
    sensitivity: 75,
    specificity: 99,
    prevalence: 0.5,
    description: 'Dezelfde antigeen test in een rustige periode (0.5% prevalentie). Let op hoe de PPV dramatisch daalt!'
  },
  'ddimer': {
    population: 1000,
    sensitivity: 95,
    specificity: 40,
    prevalence: 20,
    description: 'D-dimeer: zeer sensitief (95%), maar lage specificiteit (40%). Ideaal om longembolie uit te sluiten (hoge NPV).'
  },
  'mammografie': {
    population: 100000,
    sensitivity: 85,
    specificity: 90,
    prevalence: 0.5,
    description: 'Mammografie screening: goede test, maar bij 0.5% prevalentie toch veel vals-positieven.'
  },
  'troponine': {
    population: 1000,
    sensitivity: 99,
    specificity: 85,
    prevalence: 18,
    description: 'hs-Troponine: extreem sensitief (99%). Een negatieve uitslag sluit infarct vrijwel uit.'
  },
  'psa': {
    population: 10000,
    sensitivity: 80,
    specificity: 35,
    prevalence: 10,
    description: 'PSA: lage specificiteit (35%) door vele andere oorzaken. Leidt tot veel onnodige biopsieën.'
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

  const isRuleOut = r.npv >= 0.95 && r.ppv < 0.5;
  const isRuleIn = r.ppv >= 0.8;

  let text = '';

  if (isRuleOut) {
    text = `<strong>Dit is een "rule-out" test.</strong><br><br>`;
    text += `De PPV is laag (${ppvPct}%) — een positieve uitslag is vaak vals alarm. `;
    text += `Maar de <span class="highlight good">NPV is ${npvPct}%</span>: een negatieve uitslag sluit de aandoening vrijwel uit.`;
    text += `<br><br>Van ${fmt(totalNeg)} negatieve uitslagen zijn er ${fmt(r.trueNegatives)} terecht. Slechts ${fmt(r.falseNegatives)} worden gemist.`;
    text += `<br><br><em>Klinisch:</em> Gebruik deze test om gerust te stellen. Bij positieve uitslag is aanvullend onderzoek nodig.`;
  } else if (isRuleIn) {
    text = `<strong>Goede "rule-in" test.</strong><br><br>`;
    text += `Van elke 10 positieve uitslagen zijn er <span class="highlight good">${Math.round(r.ppv * 10)}</span> terecht. NPV is ${npvPct}%.`;
    text += `<br><br>Absoluut: ${fmt(r.truePositives)} terecht positief, ${fmt(r.falsePositives)} vals positief.`;
  } else if (r.ppv >= 0.5) {
    const wrong = Math.round((1 - r.ppv) * 10);
    text = `Van elke 10 positieve uitslagen zijn er <span class="highlight bad">${wrong}</span> vals alarm. NPV is ${npvPct}%.`;
    text += `<br><br>Absoluut: ${fmt(r.truePositives)} terecht, ${fmt(r.falsePositives)} onterecht.`;
  } else if (r.ppv >= 0.2) {
    text = `Van elke 10 positieve uitslagen zijn er maar <span class="highlight bad">${Math.round(r.ppv * 10)}</span> terecht.`;
    if (r.npv >= 0.9) {
      text += ` Wel is de <span class="highlight good">NPV ${npvPct}%</span> — een negatieve uitslag is betrouwbaar.`;
    }
    text += `<br><br>Absoluut: ${fmt(r.truePositives)} terecht, ${fmt(r.falsePositives)} onterecht.`;
  } else {
    text = `Van elke 100 positieve uitslagen zijn er maar <span class="highlight bad">${Math.round(r.ppv * 100)}</span> terecht!`;
    if (r.npv >= 0.9) {
      text += `<br><br>De <span class="highlight good">NPV is wel ${npvPct}%</span> — een negatieve uitslag sluit uit.`;
    }
  }

  if (r.prevalence < 0.05 && !isRuleOut) {
    text += `<br><br><em>Let op:</em> Bij ${prevPct}% prevalentie zijn er zoveel gezonden dat zelfs een specifieke test veel vals-positieven geeft.`;
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

  const isRuleOut = r.npv >= 0.95 && r.ppv < 0.5;

  if (isRuleOut) {
    impactMessage.classList.add('good');
    impactTitle.textContent = 'Geschikt als uitsluitingstest';
    impactText.textContent = `PPV ${ppvPct}% (veel vals alarm), maar NPV ${npvPct}%. Negatieve uitslag geeft zekerheid.`;
  } else if (r.ppv >= 0.7) {
    impactMessage.classList.add('good');
    impactTitle.textContent = 'Test presteert goed';
    impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%. De meeste voorspellingen kloppen.`;
  } else if (r.ppv >= 0.4) {
    if (r.npv >= 0.9) {
      impactTitle.textContent = 'Beperkt voor bevestiging, goed voor uitsluiting';
      impactText.textContent = `PPV ${ppvPct}% (matig), maar NPV ${npvPct}% — negatief is betrouwbaar.`;
    } else {
      impactTitle.textContent = 'Wees voorzichtig';
      impactText.textContent = `PPV ${ppvPct}%: bijna helft is vals alarm.`;
    }
  } else {
    if (r.npv >= 0.95) {
      impactTitle.textContent = 'Alleen bruikbaar om uit te sluiten';
      impactText.textContent = `PPV slechts ${ppvPct}%, maar NPV ${npvPct}% — negatief sluit uit.`;
    } else {
      impactMessage.classList.add('bad');
      impactTitle.textContent = 'Test heeft beperkte waarde';
      impactText.textContent = `PPV ${ppvPct}%, NPV ${npvPct}%. Beide onbetrouwbaar.`;
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
