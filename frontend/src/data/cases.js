// frontend/src/data/cases.js
// 5 Complete Patient Cases with full step-by-step simulation

const CASES = [
  // ════════════════════════════════════════
  // CASE 1 — ACUTE CHEST PAIN (STEMI)
  // ════════════════════════════════════════
  {
    id: 'stemi',
    title: 'Acute Chest Pain',
    subtitle: 'Emergency Department',
    category: 'Cardiology',
    difficulty: 'Critical',
    color: '#ff3333',
    emoji: '❤️',
    tags: ['STEMI', 'ACS', 'Emergency'],
    unlockOnDay: 1,
    summary: 'Classic STEMI presentation — time-critical management',
    steps: [
      {
        title: 'Initial Presentation',
        scenario: '58-year-old male arrives to ED with sudden-onset crushing chest pain radiating to left arm and jaw for 45 minutes. He is diaphoretic, anxious, and short of breath. PMH: Hypertension, Type 2 Diabetes, 30-pack-year smoker.',
        vitals: [
          { v: '168/98', n: 'BP mmHg',  c: 'abn' },
          { v: '102',    n: 'HR bpm',   c: 'warn' },
          { v: '97%',    n: 'SpO2',     c: 'warn' },
          { v: '37.4',   n: 'Temp °C',  c: 'ok' },
          { v: '22',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'What is your FIRST action?',
        options: [
          { text: 'Order 12-lead ECG immediately', correct: true },
          { text: 'Give IV morphine for pain relief', correct: false },
          { text: 'Order CXR and wait for results', correct: false },
          { text: 'Start IV fluids wide open', correct: false }
        ],
        explanation: '12-lead ECG is the MOST CRITICAL first step in chest pain. It must be done within 10 minutes of arrival. This identifies STEMI and guides immediate reperfusion decisions. TIME = MUSCLE! Every minute of delay = more myocardium lost.',
        pearl: 'Door-to-ECG time should be <10 minutes. Door-to-balloon time should be <90 minutes for STEMI.'
      },
      {
        title: 'ECG Results',
        scenario: 'ECG shows: ST elevation of 3mm in leads II, III, aVF with reciprocal ST depression in I and aVL. Patient pain is 9/10. SpO2 dropping to 94%.',
        vitals: [
          { v: '162/92', n: 'BP mmHg',  c: 'abn' },
          { v: '110',    n: 'HR bpm',   c: 'warn' },
          { v: '94%',    n: 'SpO2',     c: 'abn' },
          { v: '37.4',   n: 'Temp °C',  c: 'ok' },
          { v: '24',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'ECG confirms Inferior STEMI. Immediate next step?',
        options: [
          { text: 'Aspirin 325mg STAT + activate cath lab for primary PCI', correct: true },
          { text: 'Give antihypertensive and reassess in 1 hour', correct: false },
          { text: 'Order CT coronary angiogram', correct: false },
          { text: 'Stress test to confirm ischemia', correct: false }
        ],
        explanation: 'Confirmed STEMI = Aspirin 300-325mg immediately + IMMEDIATE activation of cath lab for Primary PCI. This is a STEMI equivalent — no time for further testing. Inferior STEMI (II,III,aVF) = RCA territory. Check right-sided leads (V4R) to rule out RV infarction before giving nitrates.',
        pearl: 'Inferior STEMI = RCA occlusion. Always check V4R for RV infarction — if present, AVOID nitrates (can cause severe hypotension).'
      },
      {
        title: 'MONA Protocol',
        scenario: 'Cath lab activated. While waiting, patient needs symptom management. Pain is 9/10. SpO2 94% on room air. BP 160/90.',
        vitals: [
          { v: '160/90', n: 'BP mmHg',  c: 'abn' },
          { v: '108',    n: 'HR bpm',   c: 'warn' },
          { v: '94%',    n: 'SpO2',     c: 'abn' },
          { v: '37.4',   n: 'Temp °C',  c: 'ok' },
          { v: '22',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'Correct MONA protocol order?',
        options: [
          { text: 'Morphine 2-4mg IV + O2 (if SpO2<94%) + Nitrate SL + Aspirin 325mg', correct: true },
          { text: 'Morphine + Antibiotics + Nitrate + Atropine', correct: false },
          { text: 'O2 high flow + Metoprolol IV + Aspirin + Heparin', correct: false },
          { text: 'Aspirin + Clopidogrel + LMWH + Nitrate', correct: false }
        ],
        explanation: 'MONA: Morphine (2-4mg IV for pain, titrate), Oxygen (ONLY if SpO2 <94% — routine O2 may be harmful), Nitrate SL (sublingual GTN — AVOID if RV infarction, hypotension, or PDE5 inhibitor use), Aspirin 325mg (chewed, not swallowed). Also add P2Y12 inhibitor (Ticagrelor/Clopidogrel) loading dose.',
        pearl: 'O2 is NOT given routinely in ACS anymore — only if SpO2 <94%. Hyperoxia can worsen coronary vasoconstriction.'
      },
      {
        title: 'Post-PCI Management',
        scenario: 'Successful primary PCI performed. Culprit: RCA 100% occlusion. Drug-eluting stent placed. TIMI 3 flow restored. Patient is now pain-free. BP 128/78, HR 72, SpO2 99%.',
        vitals: [
          { v: '128/78', n: 'BP mmHg',  c: 'ok' },
          { v: '72',     n: 'HR bpm',   c: 'ok' },
          { v: '99%',    n: 'SpO2',     c: 'ok' },
          { v: '37.1',   n: 'Temp °C',  c: 'ok' },
          { v: '16',     n: 'RR /min',  c: 'ok' }
        ],
        question: 'Correct discharge medications after STEMI + DES placement?',
        options: [
          { text: 'Aspirin lifelong + Ticagrelor/Clopidogrel 12 months + Statin + Beta-blocker + ACE-I', correct: true },
          { text: 'Aspirin 3 months only + Warfarin + Statin', correct: false },
          { text: 'Clopidogrel alone is sufficient', correct: false },
          { text: 'No antiplatelet needed after successful PCI', correct: false }
        ],
        explanation: 'Post-STEMI with DES: DAPT (Dual AntiPlatelet Therapy) = Aspirin LIFELONG + P2Y12 inhibitor (Ticagrelor preferred over Clopidogrel) for MINIMUM 12 months. Remember ABCDE: Aspirin (lifelong), Beta-blocker (reduces mortality), ACE-inhibitor/ARB (reduces remodeling), Statin (high-intensity: Atorvastatin 40-80mg), Education + lifestyle modification.',
        pearl: 'Ticagrelor preferred over Clopidogrel post-STEMI (PLATO trial — reduced mortality). DAPT duration minimum 12 months after DES.'
      }
    ]
  },

  // ════════════════════════════════════════
  // CASE 2 — PNEUMONIA
  // ════════════════════════════════════════
  {
    id: 'pneumonia',
    title: 'Fever with Productive Cough',
    subtitle: 'General Medicine Ward',
    category: 'Respiratory',
    difficulty: 'Moderate',
    color: '#3b82f6',
    emoji: '🫁',
    tags: ['CAP', 'Pneumonia', 'Antibiotic'],
    unlockOnDay: 2,
    summary: 'Community-acquired pneumonia — diagnosis and severity assessment',
    steps: [
      {
        title: 'Initial Assessment',
        scenario: '35-year-old female presents with 5-day history of fever (39.2°C), productive cough with yellow-green sputum, and right-sided pleuritic chest pain worsening on deep breathing. No significant PMH. SpO2 94% on room air.',
        vitals: [
          { v: '118/76', n: 'BP mmHg',  c: 'ok' },
          { v: '96',     n: 'HR bpm',   c: 'ok' },
          { v: '94%',    n: 'SpO2',     c: 'abn' },
          { v: '39.2',   n: 'Temp °C',  c: 'abn' },
          { v: '26',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'First-line investigation for suspected pneumonia?',
        options: [
          { text: 'Chest X-Ray + CBC with differential', correct: true },
          { text: 'HRCT thorax immediately', correct: false },
          { text: 'Bronchoscopy + BAL', correct: false },
          { text: 'Sputum culture only and wait', correct: false }
        ],
        explanation: 'CXR is the FIRST-LINE imaging for suspected pneumonia — cheap, fast, low radiation. CBC will show leukocytosis (elevated WBC >11,000) with neutrophilia in bacterial pneumonia. CT is NOT first-line unless: (1) CXR inconclusive, (2) complications suspected, (3) immunocompromised. Also check CRP, blood cultures x2 if severe.',
        pearl: 'CXR may be normal in early pneumonia or in severely dehydrated patients. If high suspicion and normal CXR, repeat in 24-48 hours or consider CT.'
      },
      {
        title: 'Results Review',
        scenario: 'CXR: Right lower lobe consolidation with air bronchograms. CBC: WBC 14,200/μL (82% neutrophils). CRP 186 mg/L. SpO2 still 94% on room air. Blood cultures pending. Urea 5.2 mmol/L. RR 26. No confusion.',
        vitals: [
          { v: '118/76', n: 'BP mmHg',  c: 'ok' },
          { v: '98',     n: 'HR bpm',   c: 'ok' },
          { v: '94%',    n: 'SpO2',     c: 'abn' },
          { v: '39.0',   n: 'Temp °C',  c: 'abn' },
          { v: '26',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'Calculate CURB-65. What is severity and management?',
        options: [
          { text: 'CURB-65 = 1 (RR≥30? No. Age<65. Urea normal. BP normal. No confusion) → Moderate — Admit, IV antibiotics', correct: true },
          { text: 'CURB-65 = 4 → ICU admission immediately', correct: false },
          { text: 'CURB-65 = 0 → Discharge with oral antibiotics', correct: false },
          { text: 'CURB-65 not applicable here', correct: false }
        ],
        explanation: 'CURB-65: Confusion(0) + Urea>7(0) + RR≥30(0) + BP<90/60(0) + Age≥65(0) = Score 1. However SpO2 <95% warrants admission regardless. Score 0-1 = low severity (home possible), Score 2 = moderate (hospital), Score 3+ = severe (ICU consider). This patient needs admission due to low SpO2 and inability to maintain oral intake.',
        pearl: 'CURB-65 is the UK tool. PSI/PORT score is used in USA. Both help guide admission decisions. Clinical judgment always overrides scores.'
      },
      {
        title: 'Antibiotic Choice',
        scenario: 'Admitted. O2 given via nasal cannula 2L/min — SpO2 now 97%. IV access inserted. Sputum Gram stain: gram-positive diplococci. Blood cultures sent. What antibiotic regimen?',
        vitals: [
          { v: '116/74', n: 'BP mmHg',  c: 'ok' },
          { v: '94',     n: 'HR bpm',   c: 'ok' },
          { v: '97%',    n: 'SpO2',     c: 'ok' },
          { v: '38.8',   n: 'Temp °C',  c: 'warn' },
          { v: '22',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'Gram-positive diplococci = likely S.pneumoniae. Best antibiotic choice?',
        options: [
          { text: 'IV Co-amoxiclav (Amoxicillin-Clavulanate) + Oral Clarithromycin (covers atypicals too)', correct: true },
          { text: 'IV Vancomycin (first choice for all pneumonia)', correct: false },
          { text: 'Oral Ciprofloxacin alone', correct: false },
          { text: 'Wait for culture results before starting antibiotics', correct: false }
        ],
        explanation: 'CAP treatment: Beta-lactam (covers typical organisms like S.pneumoniae) + Macrolide (covers atypicals: Mycoplasma, Chlamydophila, Legionella). Co-amoxiclav + Clarithromycin is standard UK regime. In penicillin allergy: Doxycycline or Levofloxacin monotherapy. NEVER delay antibiotics waiting for cultures — start within 4 hours of diagnosis (1 hour if severe).',
        pearl: 'Legionella pneumonia: urine Legionella antigen test is key. Treatment: Azithromycin or Fluoroquinolone. Legionella does NOT Gram stain well — suspect in severe CAP not responding to beta-lactam.'
      }
    ]
  },

  // ════════════════════════════════════════
  // CASE 3 — APPENDICITIS
  // ════════════════════════════════════════
  {
    id: 'appendicitis',
    title: 'Right Iliac Fossa Pain',
    subtitle: 'Surgical Admissions',
    category: 'Surgery',
    difficulty: 'Moderate',
    color: '#f59e0b',
    emoji: '🩺',
    tags: ['Appendicitis', 'Alvarado', 'Surgery'],
    unlockOnDay: 3,
    summary: 'Classic appendicitis — Alvarado scoring and surgical management',
    steps: [
      {
        title: 'Surgical Assessment',
        scenario: '19-year-old male presents with 18-hour history of pain that started periumbilical then migrated to right lower quadrant (RLQ). Associated nausea, anorexia, and low-grade fever. Rebound tenderness at McBurney\'s point. Rovsing\'s sign positive.',
        vitals: [
          { v: '122/78', n: 'BP mmHg',  c: 'ok' },
          { v: '92',     n: 'HR bpm',   c: 'ok' },
          { v: '98%',    n: 'SpO2',     c: 'ok' },
          { v: '38.3',   n: 'Temp °C',  c: 'warn' },
          { v: '18',     n: 'RR /min',  c: 'ok' }
        ],
        question: 'Calculate Alvarado score. What investigations?',
        options: [
          { text: 'CBC + CRP + Abdominal Ultrasound (Alvarado ~6-7, moderate-high risk)', correct: true },
          { text: 'MRI abdomen (gold standard, start here)', correct: false },
          { text: 'Diagnostic laparoscopy immediately without imaging', correct: false },
          { text: 'Discharge with analgesia and review in 48 hours', correct: false }
        ],
        explanation: 'Alvarado score (MANTRELS): Migration(1) + Anorexia(1) + Nausea(1) + Tenderness RLQ(2) + Rebound(1) + Elevated temp(1) + Leukocytosis(2) + Shift(1) = Max 10. This patient scores ~7 (migration, anorexia, nausea, RLQ tenderness, rebound, fever = 7). Score 7-10 = High probability appendicitis. Ultrasound first (no radiation, fast). CT if US inconclusive.',
        pearl: 'McBurney\'s point = 2/3 from umbilicus to right ASIS. Rovsing\'s sign = LLQ pressure causes RLQ pain (peritoneal irritation). Psoas sign = retrocecal appendix (pain on hip extension).'
      },
      {
        title: 'Imaging Results',
        scenario: 'CBC: WBC 14,800/μL, CRP 112 mg/L. Ultrasound: dilated appendix 10mm diameter, periappendiceal fat stranding, no free fluid. Alvarado score confirmed 8/10. Patient pain worsening to 8/10.',
        vitals: [
          { v: '118/76', n: 'BP mmHg',  c: 'ok' },
          { v: '96',     n: 'HR bpm',   c: 'ok' },
          { v: '98%',    n: 'SpO2',     c: 'ok' },
          { v: '38.5',   n: 'Temp °C',  c: 'warn' },
          { v: '18',     n: 'RR /min',  c: 'ok' }
        ],
        question: 'US confirms appendicitis. Alvarado 8/10. Management?',
        options: [
          { text: 'Nil by mouth + IV fluids + IV antibiotics + Consent for laparoscopic appendectomy', correct: true },
          { text: 'Oral antibiotics for 7 days and review', correct: false },
          { text: 'CT scan before any surgical decision', correct: false },
          { text: 'Colonoscopy to confirm diagnosis', correct: false }
        ],
        explanation: 'Confirmed appendicitis (Alvarado ≥7 + US confirmation) = Surgical management. Laparoscopic appendectomy is gold standard (faster recovery, less wound complications vs open). Pre-op: NBM, IV fluids, IV antibiotics (Co-amoxiclav or Cefuroxime + Metronidazole), VTE prophylaxis, consented. Delay increases perforation risk (15% at 24h → 30% at 36h → 70% at 48h).',
        pearl: 'Conservative management (antibiotics only) can work for uncomplicated appendicitis but 30% recurrence rate in 5 years. Surgical is still standard of care. Perforated appendicitis = IV Tazocin (Piperacillin-Tazobactam).'
      },
      {
        title: 'Intraoperative Finding',
        scenario: 'Laparoscopic appendectomy performed. Intraoperatively: gangrenous appendix found with small contained perforation at base. Peritoneal washout performed. Appendix sent for histology. Patient in recovery.',
        vitals: [
          { v: '124/80', n: 'BP mmHg',  c: 'ok' },
          { v: '88',     n: 'HR bpm',   c: 'ok' },
          { v: '99%',    n: 'SpO2',     c: 'ok' },
          { v: '37.8',   n: 'Temp °C',  c: 'warn' },
          { v: '16',     n: 'RR /min',  c: 'ok' }
        ],
        question: 'Gangrenous + perforated appendix found. Post-op antibiotics?',
        options: [
          { text: 'IV Piperacillin-Tazobactam (Tazocin) for 3-5 days, then oral Augmentin', correct: true },
          { text: 'No antibiotics needed — surgery was curative', correct: false },
          { text: 'IV Vancomycin only', correct: false },
          { text: 'Single dose pre-op antibiotics are sufficient', correct: false }
        ],
        explanation: 'Perforated/gangrenous appendicitis = Broad-spectrum antibiotics post-op. IV Piperacillin-Tazobactam covers gram-negative and anaerobic organisms (Bacteroides fragilis). Continue until afebrile + WBC normalizing (typically 3-5 days). Histology important to exclude rare carcinoid tumor or Crohn\'s disease at appendix base.',
        pearl: 'Carcinoid tumor of appendix: most common appendiceal tumor. If >2cm at base, right hemicolectomy may be needed. Always send appendix for histology!'
      }
    ]
  },

  // ════════════════════════════════════════
  // CASE 4 — DKA
  // ════════════════════════════════════════
  {
    id: 'dka',
    title: 'Diabetic Emergency',
    subtitle: 'Acute Medical Unit',
    category: 'Endocrinology',
    difficulty: 'Critical',
    color: '#10b981',
    emoji: '🩸',
    tags: ['DKA', 'Diabetes', 'Electrolytes'],
    unlockOnDay: 4,
    summary: 'DKA management — fluid, insulin, electrolyte protocol',
    steps: [
      {
        title: 'DKA Recognition',
        scenario: '22-year-old Type 1 diabetic brought in by ambulance. Found unconscious at home by flatmate. ABG: pH 7.14, pCO2 2.8 kPa, HCO3 8 mmol/L. BGL: 28.4 mmol/L (511 mg/dL). Urine ketones +++. Fruity breath. Kussmaul breathing. BP 88/60.',
        vitals: [
          { v: '88/60',  n: 'BP mmHg',  c: 'abn' },
          { v: '128',    n: 'HR bpm',   c: 'abn' },
          { v: '96%',    n: 'SpO2',     c: 'warn' },
          { v: '37.8',   n: 'Temp °C',  c: 'ok' },
          { v: '34',     n: 'RR /min',  c: 'abn' }
        ],
        question: 'Confirmed DKA. What is the MOST CRITICAL first intervention?',
        options: [
          { text: 'IV 0.9% Normal Saline 1L over 1 hour immediately (fluid resuscitation first)', correct: true },
          { text: 'Start insulin infusion 0.1 units/kg/hour immediately', correct: false },
          { text: 'Give IV 50% dextrose to raise blood sugar quickly', correct: false },
          { text: 'Sodium bicarbonate 8.4% for severe acidosis', correct: false }
        ],
        explanation: 'DKA management: FLUIDS FIRST, ALWAYS. 1L 0.9% NaCl over 1 hour as bolus. Reason: (1) Restore circulating volume, (2) Correct hypovolaemia, (3) Begin correction of osmolality. Starting insulin WITHOUT fluid replacement causes potassium to shift intracellularly → fatal hypokalemia. Bicarbonate is NOT indicated unless pH <6.9 (causes paradoxical CNS acidosis, worsens hypokalemia, not recommended routinely).',
        pearl: 'DKA diagnostic triad: Blood glucose >11 mmol/L (200mg/dL) + Ketonaemia ≥3 mmol/L or Ketonuria 2+ + Acidosis pH <7.3 or HCO3 <15. Kussmaul breathing = respiratory compensation for metabolic acidosis.'
      },
      {
        title: 'Fluid Protocol',
        scenario: '1L NS given. BP improved to 102/68. K+ comes back as 3.2 mmol/L. BGL still 26 mmol/L. Patient more responsive. Now planning insulin infusion.',
        vitals: [
          { v: '102/68', n: 'BP mmHg',  c: 'warn' },
          { v: '112',    n: 'HR bpm',   c: 'warn' },
          { v: '97%',    n: 'SpO2',     c: 'ok' },
          { v: '37.8',   n: 'Temp °C',  c: 'ok' },
          { v: '28',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'K+ is 3.2 mmol/L. Before starting insulin — what must you do?',
        options: [
          { text: 'Add 40 mmol KCl to next IV bag — replace potassium BEFORE insulin', correct: true },
          { text: 'Start insulin immediately regardless of K+ level', correct: false },
          { text: 'Give IV calcium gluconate first', correct: false },
          { text: 'K+ is normal — no action needed, start insulin', correct: false }
        ],
        explanation: 'CRITICAL RULE: Do NOT start insulin if K+ <3.5 mmol/L! Insulin drives K+ into cells → can cause fatal hypokalemia → cardiac arrhythmia. Replace K+ first: Add 40mmol KCl to 1L NS, give over 1 hour, recheck K+. If K+ >5.5: withhold K+ replacement (likely already depleted from cells). Monitor K+ hourly during insulin infusion. This is THE most common exam question about DKA.',
        pearl: 'Total body K+ is ALWAYS depleted in DKA (vomiting, osmotic diuresis, acidosis causes K+ efflux from cells). Serum K+ may be normal or high initially — DOES NOT reflect total body stores. Once insulin starts, K+ drops rapidly.'
      },
      {
        title: 'Insulin Protocol',
        scenario: 'K+ replaced. Now 4.1 mmol/L. Starting insulin infusion. BGL 24 mmol/L. Rate of BGL fall should be monitored. Ketones 5.8 mmol/L.',
        vitals: [
          { v: '114/72', n: 'BP mmHg',  c: 'ok' },
          { v: '102',    n: 'HR bpm',   c: 'warn' },
          { v: '97%',    n: 'SpO2',     c: 'ok' },
          { v: '37.6',   n: 'Temp °C',  c: 'ok' },
          { v: '24',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'Correct insulin protocol for DKA?',
        options: [
          { text: 'Fixed rate IV insulin 0.1 units/kg/hour. Target BGL fall 3-4 mmol/L/hour. Add 10% dextrose when BGL <14 mmol/L', correct: true },
          { text: 'Give SC insulin sliding scale only', correct: false },
          { text: 'High dose insulin 1 unit/kg/hour to clear ketones fast', correct: false },
          { text: 'Stop insulin when BGL normalizes (before ketones cleared)', correct: false }
        ],
        explanation: 'Fixed-rate IV insulin infusion (FRIII): 0.1 units/kg/hour. Target: BGL fall 3-4 mmol/L/hour. When BGL reaches 14 mmol/L — ADD 10% dextrose (do NOT stop insulin — need insulin to clear ketones). Resolution of DKA: pH >7.3 + HCO3 >15 + Ketones <0.6 mmol/L (not when BGL normalizes!). Continue IV insulin until patient eating and drinking and ketones cleared.',
        pearl: 'Never stop insulin just because BGL normalizes! The goal is to clear ketones. Switch to SC insulin only when: patient eating + ketones cleared + pH corrected. Overlap IV and SC insulin by 30-60 min to avoid gap.'
      }
    ]
  },

  // ════════════════════════════════════════
  // CASE 5 — SEPSIS
  // ════════════════════════════════════════
  {
    id: 'sepsis',
    title: 'Sepsis & Septic Shock',
    subtitle: 'ICU / High Dependency',
    category: 'Infectious',
    difficulty: 'Critical',
    color: '#8b5cf6',
    emoji: '🦠',
    tags: ['Sepsis', 'Hour-1 Bundle', 'ICU'],
    unlockOnDay: 5,
    summary: 'Hour-1 Bundle — recognizing and managing septic shock',
    steps: [
      {
        title: 'Sepsis Recognition',
        scenario: '68-year-old male from nursing home. 3-day history of dysuria and confusion. Wife says he is "not himself" and feverish. Nurse notes mottled skin, cold peripheries. GCS 13/15. qSOFA calculated.',
        vitals: [
          { v: '88/52',  n: 'BP mmHg',  c: 'abn' },
          { v: '124',    n: 'HR bpm',   c: 'abn' },
          { v: '94%',    n: 'SpO2',     c: 'abn' },
          { v: '38.8',   n: 'Temp °C',  c: 'abn' },
          { v: '28',     n: 'RR /min',  c: 'abn' }
        ],
        question: 'qSOFA score? Meets sepsis criteria? First action?',
        options: [
          { text: 'qSOFA 3/3 (RR≥22, AMS, SBP≤100) = High risk. Septic shock — start Hour-1 Bundle immediately', correct: true },
          { text: 'qSOFA 1 — send urine culture and wait for results', correct: false },
          { text: 'Give oral antibiotics and reassess tomorrow', correct: false },
          { text: 'This is just a UTI — simple urine dip is sufficient', correct: false }
        ],
        explanation: 'qSOFA (Quick SOFA): (1) RR ≥22 ✓, (2) Altered mental status ✓, (3) SBP ≤100 ✓ = Score 3/3 = HIGH RISK for organ dysfunction. This patient also meets SEPTIC SHOCK criteria: Sepsis + vasopressors needed + Lactate likely >2 mmol/L (hypotension + mottling). HOUR-1 BUNDLE must start IMMEDIATELY. Every hour of delay = 7% increased mortality.',
        pearl: 'Sepsis-3 Definition: Life-threatening organ dysfunction caused by dysregulated host response to infection. SOFA score ≥2 = organ dysfunction. Septic shock = Sepsis + vasopressors + Lactate >2 despite adequate fluid resuscitation.'
      },
      {
        title: 'Hour-1 Bundle',
        scenario: 'Septic shock confirmed. Lactate result: 4.8 mmol/L. This is a TIME-CRITICAL emergency. The Hour-1 Bundle must be completed within 60 minutes.',
        vitals: [
          { v: '86/50',  n: 'BP mmHg',  c: 'abn' },
          { v: '128',    n: 'HR bpm',   c: 'abn' },
          { v: '93%',    n: 'SpO2',     c: 'abn' },
          { v: '38.8',   n: 'Temp °C',  c: 'abn' },
          { v: '30',     n: 'RR /min',  c: 'abn' }
        ],
        question: 'Surviving Sepsis Hour-1 Bundle — all 5 components?',
        options: [
          { text: 'Lactate + Blood cultures x2 (before ABx) + Broad-spectrum ABx + 30mL/kg crystalloid + Vasopressors if MAP<65', correct: true },
          { text: 'Antibiotics + urine culture + oral fluids + paracetamol + observation', correct: false },
          { text: 'Blood cultures + wait 6 hours for cultures before antibiotics', correct: false },
          { text: 'Normal saline 500ml + single antibiotic + ICU referral tomorrow', correct: false }
        ],
        explanation: 'Surviving Sepsis Campaign Hour-1 Bundle (2018): (1) Measure LACTATE — if >2 mmol/L, treat as septic shock; (2) Blood cultures x2 sets (aerobic + anaerobic) BEFORE antibiotics; (3) Broad-spectrum antibiotics within 1 HOUR of recognition (do NOT wait for cultures); (4) 30mL/kg IV crystalloid (0.9% NaCl or Hartmann\'s) for hypotension OR lactate ≥4; (5) Vasopressors (Norepinephrine first-choice) if MAP <65 mmHg despite fluid resuscitation.',
        pearl: 'Norepinephrine (Noradrenaline) is the FIRST-LINE vasopressor in septic shock. Target MAP ≥65 mmHg. Add Vasopressin if norepinephrine dose >0.25-0.5 mcg/kg/min. Dopamine is second-line due to arrhythmia risk.'
      },
      {
        title: 'Source Control',
        scenario: 'Hour-1 Bundle completed: Lactate 4.8 measured, blood cultures taken x2, IV Piperacillin-Tazobactam + Gentamicin given, 2L NS infused, Norepinephrine started. MAP now 66. Source: likely UTI/urosepsis. Urine dip: nitrites +++ leukocytes +++.',
        vitals: [
          { v: '98/62',  n: 'BP mmHg',  c: 'warn' },
          { v: '114',    n: 'HR bpm',   c: 'warn' },
          { v: '95%',    n: 'SpO2',     c: 'ok' },
          { v: '38.4',   n: 'Temp °C',  c: 'warn' },
          { v: '24',     n: 'RR /min',  c: 'warn' }
        ],
        question: 'Urosepsis confirmed. Source control and antibiotic de-escalation strategy?',
        options: [
          { text: 'Urological review for obstruction + de-escalate ABx once culture sensitivities available (antibiotic stewardship)', correct: true },
          { text: 'Continue Pip-Tazo + Gentamicin indefinitely regardless of cultures', correct: false },
          { text: 'Stop all antibiotics after 48 hours regardless of response', correct: false },
          { text: 'No source control needed — antibiotics alone sufficient', correct: false }
        ],
        explanation: 'Source control is essential: urosepsis may have underlying obstruction (stone, stricture, BPH) requiring drainage/stenting. Request CT KUB or urological review. Antibiotic stewardship: start broad, narrow down once sensitivities available (typically 48-72h). Duration: 7-10 days for urosepsis (shorter with rapid clinical improvement). De-escalation reduces resistance and side effects. Daily reassessment of antibiotic need is best practice.',
        pearl: 'Procalcitonin (PCT) is useful biomarker for antibiotic de-escalation in sepsis. If PCT falls >80% from peak or <0.5 ng/mL = consider stopping antibiotics. Reduces antibiotic duration and resistance.'
      }
    ]
  }
];

export default CASES;
