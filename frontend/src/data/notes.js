// frontend/src/data/notes.js
// 30+ Topics — 1 Month Complete PA Study Notes

export const NOTES = {

  // ══════════════════════════════════════════
  // CARDIOLOGY (8 topics)
  // ══════════════════════════════════════════
  stemi: {
    title: 'STEMI — ST Elevation MI',
    sub: 'Must Know — Cardiology',
    imp: 'must',
    week: 1,
    day: 1,
    blocks: [
      { t: 'Definition & ECG Criteria', type: 'b', items: [
        'STEMI = complete occlusion of coronary artery → transmural infarction',
        'ECG: ST elevation >1mm in ≥2 contiguous limb leads OR >2mm in ≥2 precordial leads',
        'New LBBB = STEMI equivalent (Sgarbossa criteria)',
        'Posterior MI: ST depression V1-V3 + tall R waves (do posterior leads V7-V9)',
      ]},
      { t: 'Territories', type: 'b', items: [
        'V1-V4: Anterior wall → LAD occlusion ("widow maker")',
        'II, III, aVF: Inferior wall → RCA occlusion (check V4R for RV infarction!)',
        'I, aVL, V5-V6: Lateral wall → LCx occlusion',
        'V7-V9: Posterior wall → RCA or LCx',
      ]},
      { t: 'MONA Protocol', type: 'm', letters: 'M · O · N · A', meaning: 'Morphine 2-4mg IV · Oxygen ONLY if SpO2<94% · Nitrate (AVOID if RV MI/hypotension/PDE5i) · Aspirin 300-325mg STAT' },
      { t: 'Reperfusion', type: 'b', items: [
        'PRIMARY PCI: door-to-balloon <90 min (preferred)',
        'FIBRINOLYSIS: if PCI unavailable, give within 30 min (door-to-needle <30 min)',
        'Adjuncts: P2Y12 inhibitor (Ticagrelor preferred — PLATO trial), Anticoagulation',
      ]},
      { t: 'Post-MI ABCDE', type: 'm', letters: 'A · B · C · D · E', meaning: 'Aspirin lifelong + P2Y12 × 12 months · Beta-blocker · ACE-I/ARB · Statin (high dose) · Education + Cardiac Rehab' },
      { t: 'Complications', type: 'b', items: [
        'Cardiogenic shock (Killip IV): Most feared. IV Dobutamine + urgent PCI',
        'VF/VT: Defibrillation immediately',
        'Free wall rupture: Day 3-5, sudden haemopericardium → emergency surgery',
        'VSR (Ventricular Septal Rupture): Harsh pansystolic murmur → surgery',
        'Papillary muscle rupture: Acute MR, pulmonary oedema → surgery',
        'Pericarditis (Dressler syndrome): Weeks later, aspirin/NSAIDs',
      ]},
    ]
  },

  nstemi: {
    title: 'NSTEMI & Unstable Angina',
    sub: 'ACS without ST elevation',
    imp: 'must',
    week: 1,
    day: 2,
    blocks: [
      { t: 'Definitions', type: 'b', items: [
        'NSTEMI: Troponin rise + symptoms ± ECG changes (ST depression, T-wave inversion). NO persistent ST elevation',
        'Unstable Angina: Same presentation but troponin NORMAL',
        'Pathology: Partial occlusion (unlike STEMI = complete)',
      ]},
      { t: 'GRACE Score', type: 'b', items: [
        'Risk stratification: Age, HR, SBP, Creatinine, Killip class, Cardiac arrest, ST deviation, Troponin',
        'High risk (GRACE >140): Early invasive strategy within 24h',
        'Intermediate (109-140): Invasive within 72h',
        'Low risk (<109): Conservative management possible',
      ]},
      { t: 'Management', type: 'b', items: [
        'DUAL ANTIPLATELET: Aspirin 300mg + Ticagrelor 180mg loading (or Clopidogrel 300-600mg)',
        'ANTICOAGULATION: Fondaparinux (preferred) or LMWH (Enoxaparin 1mg/kg BD)',
        'Beta-blocker if no contraindications',
        'Nitrates for symptom relief',
        'Coronary angiography timing based on GRACE score',
      ]},
      { t: 'Key Difference from STEMI', type: 'b', items: [
        'No fibrinolysis in NSTEMI (thrombus is platelet-rich, fibrinolysis worsens it!)',
        'Timing less urgent than STEMI but still time-sensitive',
        'Troponin rise/fall pattern: High sensitivity troponin at 0h and 1h or 3h',
      ]},
    ]
  },

  heartfailure: {
    title: 'Heart Failure',
    sub: 'HFrEF and HFpEF — Diagnosis and Management',
    imp: 'must',
    week: 1,
    day: 3,
    blocks: [
      { t: 'Classification', type: 'b', items: [
        'HFrEF (Reduced EF): EF <40%. Dilated, ischaemic. Most treatment evidence here',
        'HFmrEF (Mildly Reduced): EF 40-49%',
        'HFpEF (Preserved EF): EF >50%. Often elderly, HTN, AF. Harder to treat',
      ]},
      { t: 'Symptoms — Framingham Criteria', type: 'b', items: [
        'Major: PND (paroxysmal nocturnal dyspnoea), orthopnoea, elevated JVP, S3 gallop, cardiomegaly, pulmonary oedema',
        'Minor: Ankle oedema, nocturnal cough, dyspnoea on exertion, hepatomegaly, pleural effusion',
        'NYHA Classification: I (no symptoms) → IV (symptoms at rest)',
      ]},
      { t: 'Investigations', type: 'b', items: [
        'BNP/NT-proBNP: raised in HF (rule-out: BNP<100, NT-proBNP<300)',
        'Echo: EF, wall motion, valves — GOLD STANDARD',
        'CXR: Cardiomegaly, upper lobe diversion, Kerley B lines, bat-wing oedema',
        'ECG: may show LVH, LBBB, AF',
      ]},
      { t: 'Acute Pulmonary Oedema — LMNOP', type: 'm', letters: 'L · M · N · O · P', meaning: 'Lasix (IV furosemide) · Morphine 2-4mg · Nitrates (GTN infusion) · Oxygen (high flow/NIV) · Position (sit upright)' },
      { t: 'Chronic HFrEF — Quadruple Therapy (2023 ESC)', type: 'b', items: [
        '1. ACE-I/ARB or ARNI (Sacubitril-Valsartan): reduces mortality/hospitalisation',
        '2. Beta-blocker (Bisoprolol/Carvedilol/Metoprolol): reduces mortality',
        '3. MRA/Spironolactone: reduces mortality, watch K+',
        '4. SGLT2 inhibitor (Dapagliflozin/Empagliflozin): reduces CV death + hospitalisation',
      ]},
      { t: 'Devices', type: 'b', items: [
        'ICD: EF <35% after 3 months optimal medical therapy — prevents SCD',
        'CRT: LBBB + QRS >150ms + EF <35% — cardiac resynchronisation',
        'Heart transplant: end-stage, refractory HF',
      ]},
    ]
  },

  arrhythmia: {
    title: 'Arrhythmias — AF, VT, VF',
    sub: 'Recognition and Management',
    imp: 'must',
    week: 1,
    day: 4,
    blocks: [
      { t: 'Atrial Fibrillation (AF)', type: 'b', items: [
        'ECG: Irregularly irregular rhythm, absent P waves, fibrillatory baseline',
        'Rate control: Beta-blocker or rate-limiting CCB (Diltiazem/Verapamil)',
        'Rhythm control: DC cardioversion, Amiodarone, Flecainide (no structural heart disease)',
        'Anticoagulation: CHA2DS2-VASc score. Score ≥2 males/≥3 females → DOAC',
        'CHA2DS2-VASc: CHF, HTN, Age≥75(x2), DM, Stroke(x2), Vascular, Age65-74, Sex(female)',
      ]},
      { t: 'Broad Complex Tachycardia', type: 'b', items: [
        'QRS >120ms + rate >100',
        'VT (Ventricular Tachycardia): Regular broad complex. Haemodynamically unstable → DC cardioversion',
        'Stable VT: IV Amiodarone 300mg over 20-60 min',
        'Torsades de Pointes: IV Magnesium 2g over 10 min, correct QT-prolonging drugs',
      ]},
      { t: 'VF & Cardiac Arrest', type: 'b', items: [
        'VF: Chaotic, no cardiac output → DEFIBRILATE IMMEDIATELY',
        'BLS: 30:2 compressions:breaths at 100-120/min',
        'ALS algorithm: CPR 2 min → rhythm check → shock if VF/pVT → Adrenaline 1mg every 3-5 min',
        'Reversible causes (4Hs + 4Ts): Hypoxia, Hypovolaemia, Hypo/Hyperkalaemia, Hypothermia + Tension PTX, Tamponade, Toxins, Thromboembolism',
      ]},
      { t: 'Bradyarrhythmias', type: 'b', items: [
        'Sinus bradycardia: Atropine 0.5mg IV if symptomatic',
        'Complete heart block: IV Atropine, transcutaneous pacing → permanent pacemaker',
        'Mobitz II: High risk of complete block → pacemaker',
      ]},
    ]
  },

  hypertension: {
    title: 'Hypertension',
    sub: 'Classification, Assessment and Management',
    imp: 'important',
    week: 1,
    day: 5,
    blocks: [
      { t: 'Classification (NICE 2023)', type: 'b', items: [
        'Stage 1: Clinic ≥140/90, home/ABPM 135/85-149/94. Treat if <80y with QRISK >10% or end-organ damage',
        'Stage 2: Clinic ≥160/100, home/ABPM ≥150/95. Always treat',
        'Stage 3 / Severe: Clinic ≥180/120. Assess for end-organ damage',
        'Hypertensive emergency: ≥180/120 + end-organ damage (AKI, retinopathy, encephalopathy, MI, HF, aortic dissection)',
      ]},
      { t: 'Treatment Steps', type: 'b', items: [
        'Step 1: CCB (Amlodipine) OR ACE-I/ARB. Black/African: CCB or Thiazide first',
        'Step 2: CCB + ACE-I/ARB',
        'Step 3: CCB + ACE-I/ARB + Thiazide-like diuretic (Indapamide)',
        'Step 4 (Resistant HTN): Add Spironolactone (K+<4.5) or Beta-blocker/Alpha-blocker',
        'AVOID: ACE-I + ARB combination (dual RAAS blockade)',
      ]},
      { t: 'Hypertensive Emergency', type: 'b', items: [
        'Aortic dissection: IV Labetalol (rate + pressure control simultaneously)',
        'Hypertensive encephalopathy: IV Labetalol or Sodium Nitroprusside',
        'Eclampsia: IV Labetalol or IV Hydralazine, IV Magnesium for seizure prevention',
        'CAUTION: Do NOT lower BP too rapidly (cerebral autoregulation). Reduce by 25% in first hour',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // RESPIRATORY (5 topics)
  // ══════════════════════════════════════════
  pneumonia: {
    title: 'Community-Acquired Pneumonia (CAP)',
    sub: 'Diagnosis, Severity, Treatment',
    imp: 'must',
    week: 2,
    day: 8,
    blocks: [
      { t: 'Organisms', type: 'b', items: [
        'Most common: Streptococcus pneumoniae — lobar consolidation, rusty sputum, rigors',
        'Atypicals (walking pneumonia): Mycoplasma pneumoniae (young adults, dry cough, gradual onset)',
        'Chlamydophila pneumoniae, Legionella pneumophila (AC units, hyponatraemia, diarrhoea)',
        'Viral: Influenza A/B, SARS-CoV-2',
        'Aspiration: Anaerobes — right lower lobe, alcoholics, seizure patients',
      ]},
      { t: 'CURB-65 Severity Score', type: 'm', letters: 'C · U · R · B · 65', meaning: 'Confusion (new) · Urea >7mmol/L · RR ≥30 · BP <90/60 · Age ≥65 — 1 point each, max 5' },
      { t: 'CURB-65 Management', type: 'b', items: [
        'Score 0-1: Low severity → outpatient oral antibiotics',
        'Score 2: Moderate → hospital admission, consider IV',
        'Score 3-5: Severe → HDU/ICU, IV antibiotics',
      ]},
      { t: 'Antibiotic Treatment', type: 'b', items: [
        'Mild: Amoxicillin 500mg TDS × 5 days (penicillin allergy: Doxycycline)',
        'Moderate: IV Co-amoxiclav + Oral Clarithromycin (covers typical + atypical)',
        'Severe: IV Co-amoxiclav + IV Azithromycin or IV Levofloxacin monotherapy',
        'Legionella: IV Azithromycin or Levofloxacin',
        'Start within 4 hours (1 hour if severe/sepsis)',
      ]},
      { t: 'Complications', type: 'b', items: [
        'Parapneumonic effusion → thoracocentesis if >10mm on lateral decubitus',
        'Empyema → chest drain + antibiotics',
        'Lung abscess → prolonged antibiotics (4-6 weeks) ± drainage',
        'Respiratory failure → NIV/intubation',
      ]},
    ]
  },

  copd: {
    title: 'COPD — Chronic Obstructive Pulmonary Disease',
    sub: 'Diagnosis, Staging, Exacerbation Management',
    imp: 'must',
    week: 2,
    day: 9,
    blocks: [
      { t: 'Definition & Diagnosis', type: 'b', items: [
        'Persistent airflow limitation, not fully reversible. FEV1/FVC <0.70 post-bronchodilator',
        'GOLD Staging: GOLD 1 (FEV1≥80%), GOLD 2 (50-80%), GOLD 3 (30-50%), GOLD 4 (<30%)',
        'Symptoms: dyspnoea, chronic cough, sputum, reduced exercise tolerance',
        'Risk factors: Smoking (#1), alpha-1 antitrypsin deficiency, occupational dust/fumes',
      ]},
      { t: 'Stable COPD Treatment', type: 'b', items: [
        'Mild: SABA (Salbutamol) PRN',
        'Moderate: LABA (Salmeterol) + LAMA (Tiotropium)',
        'Severe: LABA + LAMA + ICS (Triple therapy)',
        'Smoking cessation: Most important intervention',
        'Pulmonary rehab, Flu and Pneumococcal vaccines, LTOT if PaO2 <7.3kPa',
      ]},
      { t: 'Acute Exacerbation Management', type: 'b', items: [
        'Increased dyspnoea + cough + sputum change',
        'Controlled O2: Target SpO2 88-92% (avoid hyperoxia → CO2 retention)',
        'Nebulised Salbutamol + Ipratropium',
        'Prednisolone 30-40mg PO × 5 days',
        'Antibiotics if purulent sputum: Amoxicillin or Doxycycline × 5 days',
        'NIV (BiPAP) if pH <7.35 and pCO2 >6: BEFORE intubation',
      ]},
    ]
  },

  asthma: {
    title: 'Asthma — Acute and Chronic',
    sub: 'Recognition and Emergency Management',
    imp: 'must',
    week: 2,
    day: 10,
    blocks: [
      { t: 'Acute Severity Assessment', type: 'b', items: [
        'Moderate: PEFR 50-75%, SpO2≥92%, speaks in sentences',
        'Severe: PEFR 33-50%, SpO2 <92%, speaks in words, RR≥25, HR≥110',
        'Life-threatening: PEFR <33%, SpO2<92%, silent chest, cyanosis, feeble effort, confusion/coma',
        'Near-fatal: hypercapnia (CO2>6kPa), requiring ventilation',
      ]},
      { t: 'Acute Asthma Treatment', type: 'b', items: [
        'Oxygen: High flow to maintain SpO2 94-98%',
        'SABA: Salbutamol 5mg nebulised back-to-back in severe/life-threatening',
        'Ipratropium 0.5mg nebulised (add to Salbutamol in severe)',
        'Steroids: Prednisolone 40-50mg PO or IV Hydrocortisone 100mg QDS',
        'Magnesium Sulphate 1.2-2g IV over 20 min (if life-threatening)',
        'IV Aminophylline: specialist only, risk of arrhythmia',
      ]},
      { t: 'Step-Up Therapy (BTS/SIGN)', type: 'b', items: [
        'Step 1: SABA (Salbutamol) PRN',
        'Step 2: Add low-dose ICS (Beclometasone)',
        'Step 3: Add LABA (Salmeterol). DO NOT give LABA without ICS!',
        'Step 4: High-dose ICS + LABA + consider LTRA (Montelukast)',
        'Step 5: Add oral steroids, biologics (Omalizumab, Mepolizumab)',
      ]},
    ]
  },

  pe: {
    title: 'Pulmonary Embolism (PE)',
    sub: 'Risk Stratification, Diagnosis, Treatment',
    imp: 'must',
    week: 2,
    day: 11,
    blocks: [
      { t: 'Wells Score (PE)', type: 'b', items: [
        'DVT symptoms (3), PE most likely diagnosis (3), HR>100 (1.5), Immobile/surgery <4wks (1.5)',
        'Previous DVT/PE (1.5), Haemoptysis (1), Active malignancy (1)',
        'Score ≤4 = PE unlikely (use D-dimer), >4 = PE likely (imaging)',
        'PERC rule (if Wells ≤2): if 8 criteria met → no further workup',
      ]},
      { t: 'Investigations', type: 'b', items: [
        'D-dimer: Sensitive but NOT specific. Use only in LOW probability',
        'CTPA: Gold standard imaging for PE',
        'V/Q scan: Alternative if contrast contraindicated (renal impairment, allergy)',
        'ECG: Sinus tachycardia most common. Classic (rare): S1Q3T3, RBBB, R-sided strain',
        'Echo: RV dilation/dysfunction = prognostically significant',
      ]},
      { t: 'Treatment', type: 'b', items: [
        'Haemodynamically STABLE: DOAC first line (Rivaroxaban or Apixaban — no bridging needed)',
        'Alternative: LMWH → Warfarin (INR 2-3)',
        'Duration: Provoked (3-6 months), Unprovoked (6-12 months), Cancer (LMWH or DOAC, extended)',
        'Massive PE (haemodynamically unstable): THROMBOLYSIS — Alteplase 100mg over 2h',
        'Surgical embolectomy: if thrombolysis contraindicated',
        'IVC filter: if anticoagulation contraindicated',
      ]},
    ]
  },

  pleural: {
    title: 'Pleural Effusion & Pneumothorax',
    sub: 'Diagnosis and Management',
    imp: 'important',
    week: 2,
    day: 12,
    blocks: [
      { t: 'Pleural Effusion Types', type: 'b', items: [
        'TRANSUDATE (protein <30g/L): Heart failure, cirrhosis, nephrotic syndrome, hypothyroidism',
        'EXUDATE (protein >30g/L): Pneumonia (parapneumonic), malignancy, TB, RA, SLE, PE',
        "Light's Criteria (exudate if ANY one met): LDH effusion/serum >0.6, protein eff/serum >0.5, LDH >2/3 upper normal",
        'Investigation: pleural fluid: LDH, protein, glucose, pH, cytology, culture',
      ]},
      { t: 'Pneumothorax Types', type: 'b', items: [
        'Primary spontaneous: Young tall thin males. <2cm + no dyspnoea → discharge, review',
        'Secondary (underlying lung disease): Always admit and treat',
        'Tension PTX: Trachea deviation away, absent breath sounds, haemodynamic compromise → NEEDLE DECOMPRESSION 2nd ICS MCL immediately, then chest drain',
        'Treatment ladder: observation → aspiration → chest drain → VATS',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // GASTROENTEROLOGY (4 topics)
  // ══════════════════════════════════════════
  gib: {
    title: 'GI Bleeding — Upper and Lower',
    sub: 'Assessment and Management',
    imp: 'must',
    week: 3,
    day: 15,
    blocks: [
      { t: 'Upper GI Bleed Causes', type: 'b', items: [
        'Peptic ulcer disease (most common, H.pylori + NSAIDs)',
        'Oesophageal varices (cirrhosis) — high mortality',
        'Mallory-Weiss tear (post-vomiting)',
        'Oesophagitis, gastritis, angiodysplasia',
      ]},
      { t: 'Rockall Score (UGIB risk)', type: 'b', items: [
        'Pre-endoscopy: Age, shock, comorbidities',
        'Post-endoscopy: Diagnosis, stigmata (active bleed, clot, visible vessel)',
        'Score >8 = high risk (>40% mortality)',
        'Blatchford score: predicts need for intervention',
      ]},
      { t: 'Management UGIB', type: 'b', items: [
        'ABC + 2 large bore IVs + cross-match 6 units',
        'IV PPI: Omeprazole 80mg bolus → 8mg/hr infusion (reduces re-bleeding)',
        'Varices: IV Terlipressin + Antibiotics (Ceftriaxone — reduces SBP and mortality) + Urgent OGD with banding',
        'OGD within 24h (within 12h if variceal bleed)',
        'Transfuse: Hb <70g/L (restrictive — better outcome). FFP if INR >1.5',
      ]},
      { t: 'Lower GI Bleed', type: 'b', items: [
        'Causes: Diverticular disease, colorectal cancer, IBD, angiodysplasia, haemorrhoids, ischaemic colitis',
        'Haematochezia + haemodynamically stable → colonoscopy when prepared',
        'Unstable → CT angiography → interventional radiology',
      ]},
    ]
  },

  ibd: {
    title: 'Inflammatory Bowel Disease (IBD)',
    sub: "Crohn's Disease and Ulcerative Colitis",
    imp: 'important',
    week: 3,
    day: 16,
    blocks: [
      { t: "Crohn's vs UC — Key Differences", type: 'b', items: [
        "Crohn's: Anywhere mouth to anus, skip lesions, transmural, granulomas, fistulae common",
        'UC: Rectum always involved, continuous, mucosal only, pseudopolyps',
        "Crohn's symptoms: Diarrhoea (±blood), RIF pain (mimics appendicitis), weight loss, perianal disease",
        'UC symptoms: Bloody diarrhoea, urgency, crampy pain, tenesmus',
      ]},
      { t: 'Investigations', type: 'b', items: [
        'Bloods: FBC, CRP, albumin, faecal calprotectin (screens for IBD)',
        "Colonoscopy + biopsy: GOLD STANDARD for diagnosis",
        "Crohn's: MRI small bowel (strictures, fistulae), barium follow-through",
        'UC: rigid sigmoidoscopy shows mucosal inflammation + biopsy',
      ]},
      { t: 'Treatment', type: 'b', items: [
        'Mild UC: Mesalazine (5-ASA) topical/oral',
        'Moderate-Severe UC: Steroids (Prednisolone) → Azathioprine → Biologics (Infliximab, Adalimumab)',
        "Crohn's: Steroids → Azathioprine/6-MP → Biologics (Anti-TNF)",
        'Toxic megacolon (UC complication): IV steroids, NBM, IV fluids. If no improvement 72h → surgery',
        'Surgery: total colectomy cures UC. No cure for Crohn\'s',
      ]},
    ]
  },

  liver: {
    title: 'Liver Disease — Hepatitis & Cirrhosis',
    sub: 'Diagnosis and Complications',
    imp: 'must',
    week: 3,
    day: 17,
    blocks: [
      { t: 'Hepatitis Comparison', type: 'b', items: [
        'Hep A: Faecal-oral, acute only, never chronic, self-limiting',
        'Hep B: Blood/sexual, acute + chronic, HBsAg (surface antigen), vaccination available',
        'Hep C: Blood-borne, 80% chronic, SVR (sustained virologic response) with DAAs (direct acting antivirals)',
        'Hep E: Faecal-oral (like A), can be severe in pregnancy',
      ]},
      { t: 'Cirrhosis Complications (HAVE A JAR)', type: 'm', letters: 'H · A · V · E  A  J · A · R',
        meaning: 'Hepatic encephalopathy · Ascites/SBP · Varices · Encephalopathy · Ascites · Jaundice · AKI (hepatorenal) · Renal failure' },
      { t: 'Ascites Management', type: 'b', items: [
        'Diagnostic tap: always send for WBC (SBP if neutrophils >250/mm3)',
        'Treatment: Aldactone (Spironolactone) + Furosemide (100:40 ratio)',
        'SBP (Spontaneous Bacterial Peritonitis): IV Cefotaxime → oral Norfloxacin prophylaxis',
        'Therapeutic paracentesis: large volume ascites. Replace albumin 8g/litre drained',
      ]},
      { t: 'Hepatic Encephalopathy', type: 'b', items: [
        'Precipitants: GI bleed, infection, constipation, diuretics, sedatives',
        'Treatment: Lactulose (titrate to 2-3 soft stools/day), Rifaximin (chronic encephalopathy)',
        'Treat precipitant!',
      ]},
    ]
  },

  pancreatitis: {
    title: 'Acute Pancreatitis',
    sub: 'Severity Assessment and Management',
    imp: 'must',
    week: 3,
    day: 18,
    blocks: [
      { t: 'Causes (GET SMASHED)', type: 'm', letters: 'G·E·T  S·M·A·S·H·E·D',
        meaning: 'Gallstones · Ethanol · Trauma · Steroids · Mumps/viruses · Autoimmune · Scorpion/spider · Hyperlipidaemia/Hypercalcaemia · ERCP · Drugs' },
      { t: 'Diagnosis', type: 'b', items: [
        'Lipase (preferred) or Amylase >3× upper limit of normal + symptoms',
        'CT abdomen with contrast (CECT): if diagnosis uncertain or to assess complications (Day 3-5)',
        'Ranson criteria / Glasgow score / CRP >150: predict severity',
        'BISAP score: newer, simple severity score',
      ]},
      { t: 'Management', type: 'b', items: [
        'AGGRESSIVE IV FLUIDS: Lactated Ringers preferred (250-500mL/hr initially)',
        'Nil by mouth initially (but early enteral nutrition if possible via NG — reduces infection)',
        'Analgesia: IV Morphine or Tramadol',
        'Antibiotics: Only if infected necrosis (NOT prophylactic)',
        'ERCP: If gallstone pancreatitis + biliary obstruction/cholangitis — within 72h',
        'Surgery: Necrosectomy for infected necrosis not responding to antibiotics',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // INFECTIOUS DISEASE (3 topics)
  // ══════════════════════════════════════════
  sepsis: {
    title: 'Sepsis & Septic Shock',
    sub: 'Surviving Sepsis Campaign — Hour-1 Bundle',
    imp: 'must',
    week: 1,
    day: 6,
    blocks: [
      { t: 'Sepsis-3 Definitions', type: 'b', items: [
        'Sepsis: Life-threatening organ dysfunction due to dysregulated host response to infection',
        'Septic Shock: Sepsis + vasopressors to maintain MAP ≥65 + lactate >2 mmol/L despite fluid',
        'SOFA score ≥2: organ dysfunction. qSOFA: RR≥22, AMS, SBP≤100 (quick bedside)',
      ]},
      { t: 'Hour-1 Bundle (Surviving Sepsis 2018)', type: 'b', items: [
        '1. LACTATE: Measure immediately. If >2 = septic shock. Repeat if >2 after fluid',
        '2. BLOOD CULTURES x2 sets (aerobic + anaerobic) BEFORE antibiotics',
        '3. ANTIBIOTICS: Broad-spectrum within 1 HOUR of recognition',
        '4. FLUIDS: 30mL/kg crystalloid bolus if hypotension OR lactate ≥4 mmol/L',
        '5. VASOPRESSORS: If MAP<65 despite fluids → Norepinephrine (noradrenaline) FIRST LINE',
      ]},
      { t: 'Vasopressor Hierarchy', type: 'b', items: [
        '1st: Norepinephrine (alpha-1 dominant, maintains SVR)',
        '2nd: Vasopressin (0.03 units/min, adds when NE dose high)',
        '3rd: Epinephrine (if cardiac output low)',
        '4th: Dobutamine (if cardiogenic component)',
        'Dopamine: Second-line (higher arrhythmia risk)',
      ]},
      { t: 'Antibiotic Choice by Source', type: 'b', items: [
        'Unknown source: Piperacillin-Tazobactam (Tazocin) ± Gentamicin',
        'Urosepsis: Co-amoxiclav or Cefuroxime',
        'Pneumonia: Co-amoxiclav + Azithromycin',
        'Meningitis: Ceftriaxone + Dexamethasone',
        'Neutropenic sepsis: Piperacillin-Tazobactam ± Gentamicin',
        'Abdominal: Piperacillin-Tazobactam or Meropenem (severe)',
      ]},
    ]
  },

  meningitis: {
    title: 'Meningitis & Encephalitis',
    sub: 'Emergency Recognition and Treatment',
    imp: 'must',
    week: 3,
    day: 19,
    blocks: [
      { t: 'Classic Triad + Signs', type: 'b', items: [
        'Triad: Fever + Headache + Neck stiffness (Kernig/Brudzinski signs)',
        'Kernig: Cannot extend knee when hip flexed 90°',
        'Brudzinski: Flexing neck causes involuntary knee flexion',
        'Non-blanching petechial/purpuric rash = MENINGOCOCCAL SEPTICAEMIA — treat immediately!',
        'Photophobia, phonophobia, vomiting, altered consciousness',
      ]},
      { t: 'Investigation', type: 'b', items: [
        'LP (lumbar puncture): GOLD STANDARD. Do CT head first if: focal neurology, GCS<13, papilloedema, immunocompromised',
        'CSF: Bacterial (turbid, high protein, low glucose, neutrophils), Viral (clear, normal protein, normal glucose, lymphocytes)',
        'Blood cultures x2 before antibiotics (but do NOT delay antibiotics for LP)',
      ]},
      { t: 'Treatment (Bacterial)', type: 'b', items: [
        'IV Ceftriaxone 2g BD: DO NOT DELAY for LP or imaging if suspicious',
        'Add IV Dexamethasone 0.15mg/kg QDS × 4 days (reduces hearing loss and complications in bacterial)',
        'Add IV Amoxicillin if listeria risk (age <3 months, >60 years, immunocompromised)',
        'Viral encephalitis (HSV): IV Aciclovir 10mg/kg TDS × 14-21 days',
        'Notify Public Health. Rifampicin prophylaxis for close contacts',
      ]},
    ]
  },

  hiv: {
    title: 'HIV & AIDS',
    sub: 'Opportunistic Infections and ART',
    imp: 'important',
    week: 3,
    day: 20,
    blocks: [
      { t: 'Diagnosis & Staging', type: 'b', items: [
        'HIV Ag/Ab combination test (4th gen): window period 4 weeks',
        'CD4 count: <200 = AIDS-defining. Normal 500-1500',
        'Viral load: treatment target <50 copies/mL',
        'AIDS-defining conditions: PCP, CMV retinitis, MAC, Toxoplasmosis, Kaposi sarcoma, Cryptococcal meningitis',
      ]},
      { t: 'Opportunistic Infections by CD4', type: 'b', items: [
        'CD4 <200: PCP (Pneumocystis jirovecii pneumonia) — prophylaxis: Co-trimoxazole',
        'CD4 <150: Toxoplasmosis (ring-enhancing brain lesions)',
        'CD4 <100: Cryptococcal meningitis (India ink stain), CMV retinitis',
        'CD4 <50: MAC (Mycobacterium avium complex), CMV colitis',
      ]},
      { t: 'ART (Antiretroviral Therapy)', type: 'b', items: [
        'Start ART in ALL HIV-positive patients regardless of CD4 count (now)',
        'Standard: 2 NRTIs + 1 INSTI (integrase inhibitor) — Dolutegravir-based preferred',
        'Goal: Viral load undetectable (U=U: Undetectable = Untransmittable)',
        'PEP (post-exposure): Start within 72h, continue 28 days',
        'PrEP (pre-exposure): Tenofovir/Emtricitabine for high-risk individuals',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // NEUROLOGY (4 topics)
  // ══════════════════════════════════════════
  stroke: {
    title: 'Ischemic Stroke',
    sub: 'Time-Critical Emergency — Time is Brain',
    imp: 'must',
    week: 2,
    day: 13,
    blocks: [
      { t: 'FAST Recognition', type: 'm', letters: 'F · A · S · T', meaning: 'Face drooping (asymmetric smile) · Arm weakness (can\'t raise equally) · Speech difficulty (slurred/can\'t find words) · Time — call 108 immediately' },
      { t: 'Immediate Workup', type: 'b', items: [
        '1. Non-contrast CT head: Rule out haemorrhage FIRST (hyperdense = blood)',
        '2. Blood glucose: HYPOGLYCAEMIA most common stroke mimic!',
        '3. BP, ECG (look for AF as cardioembolic source)',
        '4. CT angiogram: if large vessel occlusion suspected (clot visible)',
        '5. FBC, PT/INR, metabolic panel',
      ]},
      { t: 'tPA Thrombolysis', type: 'b', items: [
        'Window: 3 to 4.5 HOURS from symptom onset (LAST SEEN NORMAL)',
        'Dose: Alteplase 0.9mg/kg (max 90mg) — 10% bolus, 90% over 60 min',
        'BP must be <185/110 before giving (treat with IV Labetalol if needed)',
        'Door-to-needle: <60 minutes target',
        'Contraindications: haemorrhagic stroke, recent major surgery <14 days, active bleeding, INR>1.7',
        'WAKE-UP STROKE: MRI DWI/FLAIR mismatch can guide thrombolysis even beyond 4.5h',
      ]},
      { t: 'Mechanical Thrombectomy', type: 'b', items: [
        'Large vessel occlusion (ICA, M1/M2, basilar)',
        'Window: up to 24 hours in selected patients',
        'Door-to-groin puncture: <90 min',
        'Superior outcomes to thrombolysis alone in large vessel occlusion',
      ]},
      { t: 'Secondary Prevention', type: 'b', items: [
        'Antiplatelet: Aspirin 300mg × 2 weeks → Clopidogrel long-term',
        'If AF: Anticoagulation (DOAC preferred) after 2-4 weeks',
        'Statin: Atorvastatin 40-80mg regardless of baseline cholesterol',
        'BP control, glycaemic control, smoking cessation',
      ]},
    ]
  },

  epilepsy: {
    title: 'Epilepsy & Status Epilepticus',
    sub: 'Seizure Classification and Management',
    imp: 'must',
    week: 2,
    day: 14,
    blocks: [
      { t: 'Seizure Types (ILAE 2017)', type: 'b', items: [
        'Focal (partial): Originate one hemisphere. Aware (simple) or Impaired awareness (complex)',
        'Generalised: Both hemispheres. Tonic-clonic, absence, myoclonic, atonic, tonic, clonic',
        'Unknown onset: Epileptic spasms',
      ]},
      { t: 'Status Epilepticus Protocol', type: 'b', items: [
        '0-5 min: First aid, position, protect airway, O2, call for help, time seizure',
        '5-10 min (Early/Lorazepam phase): IV Lorazepam 0.1mg/kg (max 4mg). Repeat once after 5 min if no IV access: Buccal Midazolam or PR Diazepam',
        '15-30 min (Established SE): IV Phenytoin 18mg/kg at ≤50mg/min OR IV Valproate 25-40mg/kg',
        '30-60 min (Refractory SE): IV Levetiracetam, or general anaesthesia (Propofol/Thiopentone)',
      ]},
      { t: 'Antiepileptic Drugs (AEDs)', type: 'b', items: [
        'Focal seizures: Lamotrigine or Levetiracetam (first line)',
        'Generalised tonic-clonic: Sodium Valproate (most effective) — AVOID in women of childbearing age (teratogenic)',
        'Absence: Ethosuximide or Valproate',
        'Myoclonic: Valproate, Levetiracetam',
        'Driving: 1 year seizure-free before driving again (UK)',
      ]},
    ]
  },

  headache: {
    title: 'Headache — Migraine & Cluster & SAH',
    sub: 'Dangerous vs Benign — Red Flags',
    imp: 'important',
    week: 4,
    day: 22,
    blocks: [
      { t: 'Red Flags (SNOOP4)', type: 'm', letters: 'S·N·O·O·P4',
        meaning: 'Systemic symptoms/signs · Neurological deficits · Onset sudden (thunderclap) · Older age >50 new headache · Postural · Precipitated by Valsalva · Papilloedema · Progressive' },
      { t: 'Subarachnoid Haemorrhage (SAH)', type: 'b', items: [
        '"Thunderclap" headache: worst headache of life, instantaneous onset ("hit on head with bat")',
        'CTPA scan: 98% sensitive if done within 6h',
        'LP: If CT negative but SAH suspected: xanthochromia (12h-2 weeks post-bleed)',
        'Treatment: Neurosurgery referral. Nimodipine (calcium channel blocker to prevent vasospasm)',
      ]},
      { t: 'Migraine Management', type: 'b', items: [
        'Acute: Aspirin 900mg + Metoclopramide (antiemetic) OR Sumatriptan (triptan)',
        'Triptans: 5-HT1 agonists. Contraindicated in ischaemic heart disease',
        'Prophylaxis: Propranolol (first line), Amitriptyline, Topiramate, Valproate',
        'CGRP antagonists (new): Erenumab, Fremanezumab for chronic migraine',
      ]},
    ]
  },

  dementia: {
    title: 'Dementia & Delirium',
    sub: 'Differential Diagnosis and Management',
    imp: 'important',
    week: 4,
    day: 23,
    blocks: [
      { t: 'Dementia Types', type: 'b', items: [
        'Alzheimers (60-70%): Gradual onset, memory first, hippocampal atrophy on MRI',
        'Vascular: Stepwise progression, white matter changes, cardiovascular risk factors',
        'Lewy Body: Fluctuating cognition, visual hallucinations, Parkinsonism, REM sleep disorder',
        'Frontotemporal (FTD/Picks): Personality/behaviour change, younger onset (<65)',
      ]},
      { t: 'Delirium vs Dementia', type: 'b', items: [
        'DELIRIUM: ACUTE onset, fluctuating, REVERSIBLE, inattention prominent',
        'DEMENTIA: CHRONIC, gradual, typically irreversible, memory prominent',
        'Delirium precipitants (PINCH ME): Pain, Infection, Nutritional, Constipation, Hydration, Medications, Environment',
        'Delirium treatment: Treat cause! Haloperidol (not in Lewy Body — may be fatal)',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // ENDOCRINOLOGY (3 topics)
  // ══════════════════════════════════════════
  diabetes: {
    title: 'Diabetes Mellitus',
    sub: 'Classification, Diagnosis, Management',
    imp: 'must',
    week: 1,
    day: 7,
    blocks: [
      { t: 'Diagnostic Criteria', type: 'b', items: [
        'FPG ≥7.0 mmol/L (126 mg/dL) — fasting ≥8 hours',
        'Random glucose ≥11.1 mmol/L + symptoms',
        'HbA1c ≥48 mmol/mol (6.5%)',
        '2h OGTT ≥11.1 mmol/L',
        'Pre-diabetes: FPG 6.1-6.9, HbA1c 42-47',
      ]},
      { t: 'Type 1 vs Type 2', type: 'b', items: [
        'T1DM: Young, thin, autoimmune (anti-GAD, islet cell antibodies), absolute insulin deficiency, prone to DKA',
        'T2DM: Older, obese, insulin resistance + relative deficiency, prone to HHS',
        '3 Ps: Polyuria, Polydipsia, Polyphagia (+ weight loss in T1DM)',
      ]},
      { t: 'T2DM Treatment Stepwise (NICE)', type: 'b', items: [
        'Step 1: Metformin + lifestyle (if not contraindicated — eGFR<30 stop)',
        'Step 2: Add SGLT2i (Dapagliflozin/Empagliflozin) — especially if HF/CKD',
        'OR add GLP-1 agonist (Liraglutide) — especially if obesity',
        'Step 3: Add DPP-4 inhibitor (Sitagliptin) or Sulfonylurea or SGLT2i',
        'Step 4: Basal insulin, then bolus insulin',
        'Target HbA1c: <48 mmol/mol (7%) most T2DM. Individualise',
      ]},
      { t: 'Complications SWEET', type: 'm', letters: 'S · W · E · E · T',
        meaning: 'Stroke/Cardiovascular · Wound healing/Neuropathy · Eye (retinopathy) · End-stage renal disease · Toes/peripheral vascular disease' },
    ]
  },

  dka: {
    title: 'DKA — Diabetic Ketoacidosis',
    sub: 'Full Management Protocol',
    imp: 'must',
    week: 4,
    day: 24,
    blocks: [
      { t: 'DKA Diagnostic Criteria', type: 'b', items: [
        'Blood glucose >11 mmol/L (200 mg/dL)',
        'Ketonaemia ≥3 mmol/L OR urine ketones 2+ or more',
        'Acidosis: pH <7.3 OR HCO3 <15 mmol/L',
        'Severity: Mild pH 7.25-7.30 | Moderate 7.00-7.25 | Severe <7.00',
      ]},
      { t: 'FLUIDS First — Protocol', type: 'b', items: [
        '1L 0.9% NaCl over 1 hour (STAT)',
        'Then 1L over 2 hours × 2, then 1L over 4 hours',
        'When BGL reaches 14 mmol/L: add 10% Dextrose alongside saline (do NOT stop insulin)',
      ]},
      { t: 'POTASSIUM — CRITICAL', type: 'b', items: [
        'K+ <3.5: DO NOT START INSULIN. Replace 40mmol KCl in 1L, recheck',
        'K+ 3.5-5.5: Add 40mmol KCl to each litre',
        'K+ >5.5: No potassium supplementation. Monitor hourly',
        'WHY: Insulin drives K+ intracellularly → fatal hypokalemia if started without replacing',
      ]},
      { t: 'INSULIN Protocol (FRIII)', type: 'b', items: [
        'Fixed Rate IV Insulin Infusion: 0.1 units/kg/hour',
        'Target BGL fall: 3-4 mmol/L/hour (not faster)',
        'Resolution: pH >7.3 AND HCO3 >15 AND ketones <0.6 (NOT just BGL normalisation)',
        'Transition to SC: when eating and drinking + ketones cleared. Overlap IV/SC by 30-60 min',
      ]},
    ]
  },

  thyroid: {
    title: 'Thyroid Disease',
    sub: 'Hypothyroidism, Hyperthyroidism, Thyroid Cancer',
    imp: 'important',
    week: 4,
    day: 25,
    blocks: [
      { t: 'Hypothyroidism', type: 'b', items: [
        'Causes: Hashimoto (anti-TPO Ab), post-radioiodine, post-thyroidectomy, iodine deficiency, amiodarone',
        'Features: Weight gain, cold intolerance, constipation, dry skin, bradycardia, depression, myxoedema, delayed reflexes',
        'Myxoedema coma (severe): Hypothermia, coma, hyponatraemia → IV T3/T4 + steroids',
        'Treatment: Levothyroxine (T4). Target TSH 0.4-4.0 mU/L',
      ]},
      { t: 'Hyperthyroidism', type: 'b', items: [
        "Graves' disease: TSH receptor antibodies (TRAb). Exophthalmos, pretibial myxoedema, thyroid bruit",
        'Toxic nodular goitre (Plummer)',
        'Features: Weight loss, heat intolerance, diarrhoea, tachycardia/AF, tremor, sweating',
        'Thyroid storm: fever, tachycardia, confusion, vomiting → Propranolol + Carbimazole + Lugol iodine + Hydrocortisone',
        'Treatment: Carbimazole (anti-thyroid) → Radioiodine → Surgery',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // SURGERY (3 topics)
  // ══════════════════════════════════════════
  appendicitis: {
    title: 'Acute Appendicitis',
    sub: 'Clinical Assessment and Surgical Management',
    imp: 'must',
    week: 3,
    day: 21,
    blocks: [
      { t: 'Alvarado Score (MANTRELS)', type: 'm', letters: 'M·A·N·T·R·E·L·S',
        meaning: 'Migration(1) · Anorexia(1) · Nausea(1) · Tenderness RLQ(2) · Rebound(1) · Elevated temp(1) · Leukocytosis(2) · Shift left(1)' },
      { t: 'Score Interpretation', type: 'b', items: [
        '1-4: Low probability → observe/discharge',
        '5-6: Equivocal → CT abdomen/pelvis',
        '7-10: High probability → surgical consultation',
        'Perforation risk: 15% at 24h, 30% at 36h, 70% at 48h — do NOT delay',
      ]},
      { t: 'Clinical Signs', type: 'b', items: [
        "McBurney's point: 2/3 from umbilicus to right ASIS — maximum tenderness",
        "Rovsing's sign: LLQ palpation causes RLQ pain (peritoneal irritation)",
        "Psoas sign: hip extension causes pain (retrocecal appendix)",
        "Obturator sign: internal rotation of flexed hip (pelvic appendix)",
      ]},
      { t: 'Treatment', type: 'b', items: [
        'NBM + IV fluids + analgesia (do NOT withhold — does not mask signs)',
        'IV Co-amoxiclav + Metronidazole (or Cefuroxime + Metronidazole)',
        'Laparoscopic appendectomy: gold standard (faster recovery, lower wound infection)',
        'Perforated appendicitis: IV Pip-Tazo (Piperacillin-Tazobactam) post-op',
        'Histology: always sent — exclude carcinoid (>2cm at base → right hemicolectomy)',
      ]},
    ]
  },

  fractures: {
    title: 'Fractures & Orthopaedic Emergencies',
    sub: 'Classification, Complications, Management',
    imp: 'important',
    week: 4,
    day: 26,
    blocks: [
      { t: 'Fracture Classification', type: 'b', items: [
        'Open (compound): skin breach over fracture — high infection risk, URGENT washout + surgery',
        'Closed: skin intact',
        'Pathological: through abnormal bone (tumour, osteoporosis, Pagets)',
        'Stress: cumulative overload. Common in metatarsals, tibia, femoral neck',
        'Salter-Harris (paediatric): I-V based on growth plate involvement. V = worst prognosis',
      ]},
      { t: 'Complications (FAT EMBOLI, etc)', type: 'b', items: [
        'Fat embolism syndrome: long bone or pelvic fracture → respiratory failure + petechiae + confusion',
        'Compartment syndrome: pain out of proportion, pain on passive stretch, tense compartment → URGENT fasciotomy',
        'Avascular necrosis: femoral head/scaphoid most common. MRI gold standard',
        'DVT/PE: fracture + immobility. LMWH prophylaxis',
        'Nerve injury: classify Seddon (neuropraxia, axonotmesis, neurotmesis)',
      ]},
      { t: 'Common Fractures', type: 'b', items: [
        'NOF (neck of femur): elderly + osteoporosis. Dynamic Hip Screw (DHS) vs hemiarthroplasty. THA if active',
        'Colles fracture: FOOSH, distal radius, dinner-fork deformity',
        "Scaphoid fracture: FOOSH, anatomical snuffbox tenderness. X-ray may miss → MRI if high suspicion (10 days). Risk: AVN",
        'Supracondylar: common in children. Check radial pulse (risk: anterior interosseous nerve + brachial artery)',
      ]},
    ]
  },

  perioperative: {
    title: 'Perioperative Care',
    sub: 'Pre-op Assessment, Consent, Post-op Complications',
    imp: 'important',
    week: 4,
    day: 27,
    blocks: [
      { t: 'Pre-op Assessment', type: 'b', items: [
        'ASA Classification: I (healthy) → V (moribund). VI = brain-dead for organ donation',
        'Investigations: ECG (>45y or cardiac hx), Echo (dyspnoea/murmur), CXR (cardiac/respiratory)',
        'Blood tests: FBC, U&E, Coag (if on anticoagulants or liver disease), G&S',
        'Anticoagulant management: Warfarin stop 5 days pre-op (bridge with LMWH if high risk); DOAC stop 24-48h',
      ]},
      { t: 'Post-operative Complications', type: 'b', items: [
        '24h: Primary haemorrhage, reactionary haemorrhage, respiratory failure',
        '24-72h: Secondary haemorrhage (infection), chest infection, DVT (VTE prophylaxis: LMWH + TED stockings)',
        '3-10 days: DVT/PE, wound infection, anastomotic leak (bowel surgery)',
        'Late: Incisional hernia, adhesion obstruction, stump neuroma',
      ]},
      { t: 'Consent Principles', type: 'b', items: [
        'Valid consent: INFORMED (all risks/benefits/alternatives), VOLUNTARY (no coercion), CAPACITY (Mental Capacity Act)',
        'Mental Capacity Act 2005: 4-stage test — understand, retain, weigh up, communicate decision',
        'Gillick competence: under 16 if sufficient maturity and understanding',
        'Montgomery ruling: disclose any risk the patient would consider significant',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // RENAL & UROLOGY (2 topics)
  // ══════════════════════════════════════════
  aki: {
    title: 'Acute Kidney Injury (AKI)',
    sub: 'KDIGO Staging and Management',
    imp: 'must',
    week: 4,
    day: 28,
    blocks: [
      { t: 'KDIGO Staging', type: 'b', items: [
        'Stage 1: Creatinine ×1.5-1.9 baseline OR rise ≥26.5 μmol/L in 48h OR urine <0.5mL/kg/h for 6-12h',
        'Stage 2: Creatinine ×2-2.9 baseline OR urine <0.5mL/kg/h for ≥12h',
        'Stage 3: Creatinine ×3+ OR ≥354 μmol/L OR start RRT OR urine <0.3mL/kg/h for ≥24h',
      ]},
      { t: 'Causes (PRERENAL/RENAL/POSTRENAL)', type: 'b', items: [
        'PRE-RENAL (60-70%): Hypovolaemia (haemorrhage, dehydration), sepsis, hepatorenal syndrome, cardiorenal',
        'INTRINSIC RENAL (25-30%): ATN (ischaemia, nephrotoxins — contrast, aminoglycosides, NSAIDs), glomerulonephritis',
        'POST-RENAL (5-10%): Obstruction — BPH, stones, malignancy. Renal US urgently',
        'Mnemonic: Pre = plumbing before, Post = plumbing after',
      ]},
      { t: 'Hyperkalaemia Emergency', type: 'b', items: [
        'K+ >6.5 or ECG changes (peaked T waves, wide QRS, sinusoidal) = EMERGENCY',
        '1. IV Calcium gluconate 10% 10mL over 2-3 min: MEMBRANE STABILISATION (not actually lowering K+)',
        '2. IV Insulin (10 units) + 50mL 50% Dextrose: shifts K+ into cells (within 15-30 min)',
        '3. Nebulised Salbutamol 10-20mg: shifts K+ into cells',
        '4. IV Sodium bicarbonate (if metabolic acidosis)',
        '5. Calcium resonium (removes K+ from body) or Patiromer/Sodium Zirconium',
        '6. Dialysis if refractory/severe',
      ]},
    ]
  },

  uti: {
    title: 'UTI & Pyelonephritis',
    sub: 'Diagnosis and Antibiotic Management',
    imp: 'important',
    week: 4,
    day: 29,
    blocks: [
      { t: 'Classification', type: 'b', items: [
        'Uncomplicated lower UTI: dysuria, frequency, urgency, suprapubic pain. Urine dip: nitrites + leucocytes',
        'Complicated UTI: pregnancy, male, catheter-associated, structural abnormality, immunocompromised',
        'Pyelonephritis: loin pain, fever, rigors, nausea/vomiting, CVA tenderness (upper tract infection)',
        'Urosepsis: pyelonephritis + systemic sepsis criteria',
      ]},
      { t: 'Treatment', type: 'b', items: [
        'Uncomplicated female UTI: Nitrofurantoin 100mg MR BD × 3 days OR Trimethoprim 200mg BD × 3 days',
        'Pyelonephritis (outpatient): Cefalexin 500mg QDS × 7-10 days OR Ciprofloxacin 500mg BD × 7 days',
        'Pyelonephritis (inpatient): IV Cefuroxime or IV Gentamicin',
        'Urosepsis: IV Co-amoxiclav + Gentamicin (or Pip-Tazo)',
        'Catheter UTI: Change catheter, targeted antibiotics per sensitivities',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // HAEMATOLOGY (2 topics)
  // ══════════════════════════════════════════
  anaemia: {
    title: 'Anaemia — Classification & Management',
    sub: 'MCV-based approach',
    imp: 'important',
    week: 4,
    day: 30,
    blocks: [
      { t: 'Classification by MCV', type: 'b', items: [
        'MICROCYTIC (MCV <80): Iron deficiency (most common), thalassaemia, anaemia of chronic disease (can be normocytic), sideroblastic',
        'NORMOCYTIC (MCV 80-100): Acute blood loss, haemolysis, anaemia of chronic disease, renal failure (low EPO)',
        'MACROCYTIC (MCV >100): Megaloblastic (B12 deficiency — subacute combined degeneration of cord; Folate deficiency), Hypothyroidism, Liver disease, Alcohol, Drugs (Methotrexate, Hydroxyurea)',
      ]},
      { t: 'Iron Deficiency Anaemia', type: 'b', items: [
        'Features: pallor, fatigue, PICA (craving non-food), koilonychia (spoon nails), angular stomatitis, glossitis',
        'Bloods: Low Hb, MCV, serum ferritin, serum iron. HIGH TIBC, transferrin',
        'ALWAYS find cause: premenopausal women (menorrhagia), men/post-menopausal (GI bleed → colonoscopy)',
        'Treatment: Ferrous sulphate 200mg TDS × 3 months (correct Hb then replete stores)',
      ]},
      { t: 'B12 Deficiency', type: 'b', items: [
        'Causes: Pernicious anaemia (anti-intrinsic factor antibodies), veganism, Crohn\'s, gastrectomy, metformin',
        'Features: Macrocytic anaemia + subacute combined degeneration of spinal cord (dorsal columns + corticospinal tracts)',
        'Neuro: peripheral neuropathy, ataxia, memory loss, depression',
        'Treatment: IM Hydroxocobalamin 1mg every 2-3 days × 2 weeks → every 3 months',
      ]},
    ]
  },

  // ══════════════════════════════════════════
  // PHARMACOLOGY (2 topics)
  // ══════════════════════════════════════════
  antibiotics: {
    title: 'Antibiotic Guide',
    sub: 'Mechanism, Coverage, Indications',
    imp: 'must',
    week: 2,
    day: 14,
    blocks: [
      { t: 'Beta-Lactams', type: 'b', items: [
        'Penicillins: Amoxicillin (gram+, H.influenzae), Co-amoxiclav (+ beta-lactamase inhibitor)',
        'Cephalosporins: Cefalexin (1st, UTI), Cefuroxime (2nd, pneumonia), Ceftriaxone (3rd, meningitis), Ceftazidime (3rd, pseudomonas)',
        'Carbapenems: Meropenem, Imipenem — broadest spectrum, reserve for MDR organisms',
        'Mechanism: Inhibit cell wall synthesis (PBP binding)',
      ]},
      { t: 'Other Classes', type: 'b', items: [
        'Macrolides (Azithromycin, Clarithromycin): Atypicals, respiratory. 50S ribosome',
        'Fluoroquinolones (Ciprofloxacin, Levofloxacin): UTI, respiratory, enteric. DNA gyrase. Risk: tendon rupture, QT prolongation',
        'Metronidazole: Anaerobes, C.diff, H.pylori triple therapy, protozoal',
        'Vancomycin: MRSA, C.diff (oral for C.diff only). Renal toxicity. Trough monitoring',
        'Gentamicin (aminoglycoside): Gram-negative, sepsis. Nephrotoxic + ototoxic. Trough monitoring',
      ]},
      { t: 'Antibiotic Stewardship', type: 'b', items: [
        'ESKAPE organisms: Enterococcus, S.aureus (MRSA), Klebsiella (ESBL), Acinetobacter, Pseudomonas, Enterobacter',
        'De-escalation: Start broad → narrow based on sensitivities',
        'Duration: Shorter courses reduce resistance (3-5 days for most infections)',
        'Allergy documentation: True penicillin allergy <10%. Cross-reactivity with cephalosporins: 1-2%',
      ]},
    ]
  },

  analgesics: {
    title: 'Analgesia — WHO Pain Ladder',
    sub: 'Pain Management and Opioid Safety',
    imp: 'important',
    week: 4,
    day: 27,
    blocks: [
      { t: 'WHO Pain Ladder', type: 'b', items: [
        'Step 1 (Mild): Paracetamol 1g QDS ± NSAIDs (Ibuprofen, Naproxen) ± Adjuvants',
        'Step 2 (Moderate): Weak opioids — Codeine, Tramadol, Dihydrocodeine + Step 1',
        'Step 3 (Severe): Strong opioids — Morphine, Oxycodone, Fentanyl + Step 1 ± adjuvants',
        'Give analgesia around the clock, not PRN (for chronic pain)',
      ]},
      { t: 'NSAIDs — Cautions', type: 'b', items: [
        'Contraindications: AKI/CKD, peptic ulcer, GI bleed, CVD, last trimester pregnancy',
        'Add PPI (Omeprazole) if NSAIDs prescribed long-term',
        'Avoid in asthma if NSAID-sensitive',
      ]},
      { t: 'Opioids — Side Effects & Reversal', type: 'b', items: [
        'Side effects: Constipation (always give laxative!), nausea, sedation, respiratory depression, urinary retention',
        'Opioid toxicity: Pin-point pupils + respiratory depression + drowsiness',
        'Reversal: Naloxone 0.4-2mg IV/IM/SC (half life shorter than morphine — may need repeated doses)',
        'Morphine Equivalents: Codeine 10mg = Morphine 1mg. Tramadol 100mg = Morphine 10mg',
      ]},
    ]
  },

};

export const NOTE_LIST = [
  // Week 1
  { key: 'stemi',        icon: '❤️',  label: 'STEMI',              week: 1, imp: 'must' },
  { key: 'nstemi',       icon: '🫀',  label: 'NSTEMI/ACS',         week: 1, imp: 'must' },
  { key: 'heartfailure', icon: '💙',  label: 'Heart Failure',      week: 1, imp: 'must' },
  { key: 'arrhythmia',   icon: '⚡',  label: 'Arrhythmias',        week: 1, imp: 'must' },
  { key: 'hypertension', icon: '💉',  label: 'Hypertension',       week: 1, imp: 'important' },
  { key: 'diabetes',     icon: '🩸',  label: 'Diabetes',           week: 1, imp: 'must' },
  { key: 'sepsis',       icon: '🦠',  label: 'Sepsis Bundle',      week: 1, imp: 'must' },
  // Week 2
  { key: 'pneumonia',    icon: '🫁',  label: 'Pneumonia (CAP)',    week: 2, imp: 'must' },
  { key: 'copd',         icon: '😮‍💨', label: 'COPD',               week: 2, imp: 'must' },
  { key: 'asthma',       icon: '🌬️', label: 'Asthma',             week: 2, imp: 'must' },
  { key: 'pe',           icon: '🩸',  label: 'Pulmonary Embolism', week: 2, imp: 'must' },
  { key: 'pleural',      icon: '🫁',  label: 'Pleural/Pneumothorax', week: 2, imp: 'important' },
  { key: 'stroke',       icon: '🧠',  label: 'Stroke/tPA',         week: 2, imp: 'must' },
  { key: 'epilepsy',     icon: '⚡',  label: 'Epilepsy/Status',    week: 2, imp: 'must' },
  { key: 'antibiotics',  icon: '💊',  label: 'Antibiotic Guide',   week: 2, imp: 'must' },
  // Week 3
  { key: 'gib',          icon: '🩸',  label: 'GI Bleeding',        week: 3, imp: 'must' },
  { key: 'ibd',          icon: '🟡',  label: 'IBD (Crohns/UC)',    week: 3, imp: 'important' },
  { key: 'liver',        icon: '🟤',  label: 'Liver/Cirrhosis',    week: 3, imp: 'must' },
  { key: 'pancreatitis', icon: '🟣',  label: 'Acute Pancreatitis', week: 3, imp: 'must' },
  { key: 'appendicitis', icon: '🩺',  label: 'Appendicitis',       week: 3, imp: 'must' },
  { key: 'meningitis',   icon: '🧠',  label: 'Meningitis',         week: 3, imp: 'must' },
  { key: 'hiv',          icon: '🔴',  label: 'HIV & AIDS',         week: 3, imp: 'important' },
  // Week 4
  { key: 'headache',     icon: '🤕',  label: 'Headache/SAH',       week: 4, imp: 'important' },
  { key: 'dementia',     icon: '🧩',  label: 'Dementia/Delirium',  week: 4, imp: 'important' },
  { key: 'dka',          icon: '💉',  label: 'DKA Protocol',       week: 4, imp: 'must' },
  { key: 'thyroid',      icon: '🦋',  label: 'Thyroid Disease',    week: 4, imp: 'important' },
  { key: 'fractures',    icon: '🦴',  label: 'Fractures',          week: 4, imp: 'important' },
  { key: 'perioperative',icon: '🏥',  label: 'Perioperative Care', week: 4, imp: 'important' },
  { key: 'aki',          icon: '🫘',  label: 'AKI & Hyperkalaemia', week: 4, imp: 'must' },
  { key: 'uti',          icon: '🔵',  label: 'UTI & Pyelonephritis', week: 4, imp: 'important' },
  { key: 'anaemia',      icon: '🔴',  label: 'Anaemia',            week: 4, imp: 'important' },
  { key: 'analgesics',   icon: '💊',  label: 'Analgesia/Opioids',  week: 4, imp: 'important' },
];
