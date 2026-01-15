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
