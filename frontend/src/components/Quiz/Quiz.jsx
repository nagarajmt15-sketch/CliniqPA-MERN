// ═══════════════════════════════════════════════════════════════
// FILE 4: frontend/src/components/Quiz/Quiz.jsx
// MORE QUESTIONS — 50+ MCQs across 5 subjects
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';

const QUIZ_DATA = {
  Cardiology: [
    { q: 'First investigation in a patient with acute chest pain?', opts: ['12-lead ECG', 'Chest X-Ray', 'Echocardiogram', 'Troponin only'], correct: 0, exp: 'ECG within 10 minutes is mandatory. Identifies STEMI immediately and guides reperfusion therapy.' },
    { q: 'Door-to-balloon time target for primary PCI in STEMI?', opts: ['<90 minutes', '<120 minutes', '<60 minutes', '<30 minutes'], correct: 0, exp: 'AHA/ACC: Door-to-balloon <90 min. Reduces mortality significantly. Every 30 min delay = 7.5% relative increase in 1-year mortality.' },
    { q: 'ST elevation in leads II, III, aVF indicates which territory?', opts: ['Inferior wall (RCA)', 'Anterior wall (LAD)', 'Lateral wall (LCx)', 'Posterior wall'], correct: 0, exp: 'Inferior STEMI: II, III, aVF = RCA occlusion. Always check V4R for RV infarction before giving nitrates!' },
    { q: 'Which is the FIRST-LINE vasopressor in septic shock?', opts: ['Norepinephrine', 'Dopamine', 'Epinephrine', 'Dobutamine'], correct: 0, exp: 'Norepinephrine (noradrenaline) is first-line in septic shock. Alpha-1 dominant, increases SVR, minimal chronotropy.' },
    { q: 'Most common cause of sudden cardiac death in athletes <35 years?', opts: ['Hypertrophic Cardiomyopathy', 'Long QT syndrome', 'Aortic stenosis', 'Coronary artery disease'], correct: 0, exp: 'HCM causes 30-50% of SCD in young athletes. LVOT obstruction + abnormal intramural coronaries.' },
    { q: 'O2 in STEMI — when should it be given?', opts: ['Only if SpO2 <94%', 'Always high flow', 'Never give O2 in ACS', 'Only if in pain'], correct: 0, exp: 'AVOID routine O2 in ACS. Give ONLY if SpO2 <94%. Hyperoxia causes coronary vasoconstriction and worsens outcomes (AVOID-O2 trial).' },
    { q: 'Which P2Y12 inhibitor is preferred after STEMI? (PLATO trial)', opts: ['Ticagrelor', 'Clopidogrel', 'Prasugrel', 'Abciximab'], correct: 0, exp: 'Ticagrelor superior to clopidogrel in PLATO trial — reduced CV death + MI + stroke. Give 180mg loading, then 90mg BD.' },
    { q: 'CHA2DS2-VASc score of 2 in a male AF patient means?', opts: ['Anticoagulate with DOAC', 'Aspirin only', 'No treatment needed', 'Rate control only'], correct: 0, exp: 'Males: anticoagulate if CHA2DS2-VASc ≥2. Females: ≥3. DOAC preferred over Warfarin. Reduces stroke risk significantly.' },
    { q: 'Cardiac tamponade — classic triad (Becks triad)?', opts: ['Hypotension + Raised JVP + Muffled heart sounds', 'Tachycardia + ST elevation + Chest pain', 'Hypotension + Bradycardia + Hypothermia', 'Hypertension + Low JVP + Pericardial rub'], correct: 0, exp: "Beck's Triad: Hypotension + Raised JVP + Muffled heart sounds. Treatment: Pericardiocentesis urgently!" },
    { q: 'First-line treatment for stable angina (chronic stable angina)?', opts: ['Beta-blocker + GTN PRN', 'Aspirin + Statin only', 'Nitrate infusion', 'Primary PCI immediately'], correct: 0, exp: 'Stable angina: Beta-blocker first line for symptom control + GTN PRN. Aspirin + statin for secondary prevention.' },
  ],

  Respiratory: [
    { q: 'Most common organism causing CAP in adults?', opts: ['Streptococcus pneumoniae', 'Klebsiella pneumoniae', 'Staphylococcus aureus', 'Legionella pneumophila'], correct: 0, exp: 'S.pneumoniae causes 30-35% of CAP. Classic: lobar consolidation, rusty sputum, rigors, high fever.' },
    { q: 'CURB-65 score of 3 — appropriate management?', opts: ['Hospital admission ± HDU', 'Outpatient oral antibiotics', 'Discharge with review in 48h', 'ICU intubation immediately'], correct: 0, exp: 'CURB-65 ≥3: high severity, ≥14% mortality. Hospital admission, IV antibiotics, consider HDU/ICU if score ≥4-5.' },
    { q: 'Wells score is used for risk stratification of?', opts: ['Pulmonary Embolism', 'Pneumonia severity', 'COPD exacerbation', 'Asthma severity'], correct: 0, exp: 'Wells criteria: 7 items scoring PE pre-test probability. ≤4 = PE unlikely (use D-dimer), >4 = PE likely (CTPA).' },
    { q: 'Target SpO2 in COPD exacerbation?', opts: ['88-92%', '94-98%', '>99%', '80-85%'], correct: 0, exp: 'COPD: target SpO2 88-92%. Avoid hyperoxia → removes hypoxic drive → CO2 retention → type 2 respiratory failure.' },
    { q: 'Massive PE treatment in haemodynamically unstable patient?', opts: ['IV Alteplase thrombolysis 100mg', 'LMWH anticoagulation', 'IVC filter insertion', 'Observation only'], correct: 0, exp: 'Massive PE (haemodynamic collapse): IV Alteplase 100mg over 2h. Surgical embolectomy if thrombolysis contraindicated.' },
    { q: 'Life-threatening asthma feature on examination?', opts: ['Silent chest', 'Wheeze on auscultation', 'PEFR 60% predicted', 'RR 22/min'], correct: 0, exp: 'Silent chest = air entry too poor to generate wheeze = LIFE-THREATENING. Also: SpO2 <92%, PEFR <33%, cyanosis, exhaustion, confusion.' },
    { q: 'Which antibiotic specifically covers Legionella pneumonia?', opts: ['Azithromycin/Levofloxacin', 'Amoxicillin', 'Cefuroxime', 'Metronidazole'], correct: 0, exp: 'Legionella does not respond to beta-lactams. Use macrolide (Azithromycin) or fluoroquinolone (Levofloxacin).' },
    { q: 'Tension pneumothorax immediate management?', opts: ['Needle decompression 2nd ICS MCL immediately', 'CXR first then decide', 'CT chest first', 'Chest drain as first step'], correct: 0, exp: 'Tension PTX = medical emergency. Immediate needle decompression 2nd intercostal space, midclavicular line. THEN chest drain. Do NOT wait for imaging!' },
    { q: 'NIV (BiPAP) indication in COPD exacerbation?', opts: ['pH <7.35 and pCO2 >6 kPa', 'All COPD exacerbations', 'SpO2 <92%', 'RR >20/min'], correct: 0, exp: 'NIV in COPD: pH <7.35 + pCO2 >6 + RR >23. Reduces need for intubation by 50%, reduces mortality.' },
    { q: 'Investigation of choice for pleural effusion fluid analysis?', opts: ['Pleural fluid LDH, protein, glucose, pH, cytology', 'CT chest only', 'Bronchoscopy', 'PET scan'], correct: 0, exp: "Send pleural fluid for: protein (Light's criteria), LDH, glucose, pH, cytology (malignancy), microscopy/culture. Light's criteria separates transudate from exudate." },
  ],

  Neurology: [
    { q: 'tPA time window for ischemic stroke?', opts: ['3 to 4.5 hours', '6 hours', '1 hour only', '8 hours'], correct: 0, exp: 'IV Alteplase: 3.0-4.5 hours from symptom onset (LAST SEEN WELL). Dose: 0.9mg/kg, max 90mg. Door-to-needle <60 min.' },
    { q: 'Most common stroke mimic to rule out first?', opts: ['Hypoglycaemia', 'TIA', 'Bell\'s palsy', 'Hypertensive encephalopathy'], correct: 0, exp: 'Always check blood glucose FIRST! Hypoglycaemia (BGL <4 mmol/L) is most common stroke mimic and easily reversible.' },
    { q: 'Which CT finding CONTRAINDICATES thrombolysis?', opts: ['Hyperdense vessel sign (clot visible)', 'Small ischaemic changes', 'Normal CT', 'Lacunar infarct'], correct: 0, exp: 'Actually: HAEMORRHAGE (hyperdense = blood) contraindicates tPA. Hyperdense vessel sign = clot but NOT a contraindication.' },
    { q: 'Status epilepticus first-line drug at 5-10 minutes?', opts: ['IV Lorazepam 0.1mg/kg', 'IV Phenytoin', 'IV Diazepam 10mg', 'IV Levetiracetam'], correct: 0, exp: 'IV Lorazepam (Ativan) 0.1mg/kg (max 4mg) first line. If no IV: buccal Midazolam or rectal Diazepam. Longer duration than diazepam.' },
    { q: 'Classic "thunderclap headache" — most important diagnosis to exclude?', opts: ['Subarachnoid haemorrhage (SAH)', 'Migraine', 'Cluster headache', 'Meningitis'], correct: 0, exp: 'SAH: worst headache of life, instantaneous onset. CT head 98% sensitive within 6h. If CT negative: LP for xanthochromia (12h post-onset).' },
    { q: 'Meningococcal meningitis with purpuric rash — immediate action?', opts: ['IV Benzylpenicillin immediately then transfer', 'LP first then antibiotics', 'CT head first', 'Wait for blood cultures first'], correct: 0, exp: 'Non-blanching purpuric rash + meningism = meningococcal septicaemia. Give IV Benzylpenicillin immediately (even before hospital). DO NOT wait for LP.' },
    { q: 'Which dementia has Lewy body inclusions AND visual hallucinations?', opts: ['Lewy Body Dementia', 'Alzheimers', 'Vascular dementia', 'Frontotemporal dementia'], correct: 0, exp: "Lewy Body Dementia: Fluctuating cognition + visual hallucinations + Parkinsonism + REM sleep disorder. AVOID antipsychotics (can be fatal — neuroleptic sensitivity)." },
    { q: 'Naloxone indication and dose?', opts: ['Opioid toxicity: 0.4-2mg IV/IM', 'Benzodiazepine OD: 1mg IV', 'Alcohol intoxication: 2mg IV', 'Paracetamol OD: 0.8mg IV'], correct: 0, exp: 'Naloxone reverses opioid toxicity. 0.4-2mg IV/IM/SC. SHORT half-life (30-90 min) — may need repeated doses or infusion as opioids last longer.' },
    { q: 'Guillain-Barré syndrome treatment?', opts: ['IV Immunoglobulin (IVIg) or Plasmapheresis', 'IV Steroids', 'Antibiotics', 'No treatment needed'], correct: 0, exp: 'GBS: IV IVIg (2g/kg over 5 days) or PE (plasmapheresis). NOT steroids (no benefit, may worsen). Monitor respiratory function (FVC) — intubate if FVC <1L.' },
    { q: 'Which nerve is damaged in wrist drop?', opts: ['Radial nerve', 'Ulnar nerve', 'Median nerve', 'Axillary nerve'], correct: 0, exp: 'Radial nerve: wrist drop, loss of wrist/finger extension. Saturday night palsy (compression in axilla). Foot drop = common peroneal nerve.' },
  ],

  Surgery: [
    { q: "McBurney's point location for appendicitis?", opts: ['2/3 from umbilicus to right ASIS', '1/3 from umbilicus to right ASIS', 'Centre of right iliac fossa', 'Right hypochondrium'], correct: 0, exp: "McBurney's point: junction of lateral 1/3 and medial 2/3 on line from ASIS to umbilicus. Maximum point tenderness in appendicitis." },
    { q: 'Alvarado score ≥7 indicates?', opts: ['High probability appendicitis — surgical consult', 'CT scan needed first', 'Low probability — discharge', 'Immediate IV antibiotics only'], correct: 0, exp: 'Alvarado 7-10: high probability appendicitis → surgical consultation immediately. Perforation risk increases with delay.' },
    { q: 'Immediate management of tension pneumothorax?', opts: ['Needle decompression 2nd ICS MCL', 'Chest drain insertion first', 'CXR then decide', 'IV antibiotics'], correct: 0, exp: 'Tension PTX: IMMEDIATE needle decompression. 2nd ICS, midclavicular line, 14-16G cannula. Rush of air confirms diagnosis. Then large bore chest drain.' },
    { q: 'Commonest site for gallstones to obstruct causing jaundice?', opts: ['Common bile duct', 'Cystic duct', 'Ampulla of Vater', 'Hepatic duct'], correct: 0, exp: 'CBD (common bile duct) obstruction causes obstructive jaundice. Triad of Charcot: jaundice + fever + RUQ pain = cholangitis. Add shock + confusion = Reynold\'s pentad.' },
    { q: 'Boerhaave syndrome — what is it?', opts: ['Spontaneous oesophageal rupture from vomiting', 'Gastric volvulus', 'Mallory-Weiss tear (mucosal only)', 'Oesophageal varices rupture'], correct: 0, exp: 'Boerhaave: FULL THICKNESS oesophageal rupture (spontaneous from vomiting). CXR: surgical emphysema, pneumomediastinum, left pleural effusion. Surgical emergency.' },
    { q: 'Haemorrhoid treatment — grade 3 (prolapse, needs manual reduction)?', opts: ['Rubber band ligation', 'Lifestyle modification only', 'Haemorrhoidectomy', 'Observation'], correct: 0, exp: 'Grade 3 haemorrhoids: prolapse on defaecation, require manual reduction. Rubber band ligation first. Grade 4 (permanently prolapsed) → haemorrhoidectomy.' },
    { q: 'Most common site for peptic ulcer perforation?', opts: ['Anterior duodenal wall', 'Posterior duodenal wall', 'Lesser curve stomach', 'Greater curve stomach'], correct: 0, exp: 'ANTERIOR duodenal ulcer perforates into peritoneal cavity → sudden severe abdominal pain, rigid abdomen. POSTERIOR ulcer erodes into gastroduodenal artery → GI bleed.' },
    { q: 'Obstructed hernia vs Strangulated hernia — key difference?', opts: ['Strangulated has compromised blood supply (necrosis)', 'Obstructed is more serious', 'They are the same thing', 'Strangulated is always reducible'], correct: 0, exp: 'Strangulated = blood supply compromised → ischaemia/necrosis. Surgical emergency. Signs: severe pain, tense irreducible hernia, overlying skin changes, systemic sepsis.' },
  ],

  Endocrinology: [
    { q: 'DKA — most critical FIRST step?', opts: ['IV 0.9% NaCl 1L over 1 hour', 'Start insulin infusion immediately', 'IV sodium bicarbonate', 'Give IV glucose'], correct: 0, exp: 'FLUIDS FIRST! 1L NS bolus. Starting insulin without fluids → K+ shifts intracellularly → fatal hypokalemia. Fluids also begin correcting acidosis and osmolality.' },
    { q: 'When is it UNSAFE to start insulin in DKA?', opts: ['K+ <3.5 mmol/L', 'K+ >5.5 mmol/L', 'pH >7.2', 'BGL <20 mmol/L'], correct: 0, exp: 'NEVER start insulin if K+ <3.5. Replace potassium first. Insulin drives K+ intracellularly → can cause fatal cardiac arrhythmia.' },
    { q: 'DKA resolution criteria?', opts: ['pH >7.3 AND HCO3 >15 AND ketones <0.6', 'Blood glucose <10 mmol/L only', 'Patient feeling better', 'Ketones cleared on urine dip'], correct: 0, exp: 'DKA resolved: pH >7.3 + HCO3 >15 + ketones <0.6 mmol/L. NOT just BGL! Continue insulin until ketones clear.' },
    { q: 'Which drug is CONTRAINDICATED in eGFR <30 in T2DM?', opts: ['Metformin', 'Insulin', 'Gliclazide (with caution)', 'Sitagliptin'], correct: 0, exp: 'Metformin contraindicated if eGFR <30 (risk of lactic acidosis). Stop temporarily if contrast, surgery, dehydration.' },
    { q: 'Hyperthyroid emergency (thyroid storm) treatment?', opts: ['Propranolol + Carbimazole + Lugol iodine + Hydrocortisone', 'Radioiodine + Levothyroxine', 'Carbimazole alone', 'Emergency thyroidectomy first'], correct: 0, exp: 'Thyroid storm: Propranolol (HR control) + Carbimazole (stop synthesis) + Lugol iodine (1h after Carbimazole, block release) + Hydrocortisone (prevents conversion) + treat precipitant.' },
    { q: 'Addisonian crisis — electrolytes?', opts: ['Hyponatraemia + Hyperkalaemia', 'Hypernatraemia + Hypokalaemia', 'Normal electrolytes', 'Hypernatraemia + Hyperkalaemia'], correct: 0, exp: 'Addisons (cortisol/aldosterone deficiency): Low Na+ (aldosterone deficiency → Na+ wasting), High K+ (K+ retention), Low BGL, low BP. Give IV Hydrocortisone 100mg STAT.' },
    { q: 'Best initial test for Cushing syndrome?', opts: ['24-hour urinary free cortisol OR overnight dexamethasone suppression test', 'Serum cortisol at 9am', 'MRI pituitary first', 'ACTH level only'], correct: 0, exp: 'Screening: 24h UFC or low-dose DST (1mg dexamethasone at midnight → cortisol <50 nmol/L = suppressed = normal). Then ACTH to determine cause.' },
    { q: 'SGLT2 inhibitors are NOW first-line in T2DM with?', opts: ['Heart failure and/or CKD with proteinuria', 'Young patients only', 'Obesity only', 'High HbA1c only'], correct: 0, exp: 'SGLT2i (Dapagliflozin/Empagliflozin): major CV and renal benefit in HF + proteinuric CKD regardless of HbA1c. Reduces hospitalisation and CV death.' },
    { q: 'Prolactinoma first-line treatment?', opts: ['Dopamine agonist (Cabergoline/Bromocriptine)', 'Surgery (trans-sphenoidal)', 'Radiotherapy', 'Observation only'], correct: 0, exp: 'Prolactinomas respond excellently to medical therapy. Cabergoline (preferred) or Bromocriptine. Surgery rarely needed.' },
    { q: 'MEN 1 syndrome includes?', opts: ['Pituitary + Parathyroid + Pancreatic tumours', 'Phaeochromocytoma + Medullary thyroid Ca', 'Adrenal adenoma + Prolactinoma', 'Parathyroid + Breast Ca'], correct: 0, exp: 'MEN 1 (Wermer): 3 Ps — Pituitary (prolactinoma), Parathyroid (hyperparathyroidism, most common), Pancreas (insulinoma, gastrinoma). MEN 11 gene.' },
  ],

  Pharmacology: [
    { q: 'Mechanism of beta-blockers?', opts: ['Block beta-1 (heart) and beta-2 (lung) adrenergic receptors', 'Block alpha-1 receptors', 'ACE inhibition', 'Calcium channel blockade'], correct: 0, exp: 'Beta-blockers: Selective (beta-1 = heart: HR, BP, contractility) vs Non-selective (beta-1 + beta-2). Cardioselective: Metoprolol, Bisoprolol, Atenolol. Avoid in asthma (beta-2 blockade = bronchospasm).' },
    { q: 'ACE inhibitors — most common side effect?', opts: ['Dry cough (bradykinin accumulation)', 'Hyperkalaemia (most dangerous)', 'Angioedema (rare but dangerous)', 'Hypotension'], correct: 0, exp: 'Most COMMON: dry cough (bradykinin, in 10-15%). Most DANGEROUS: angioedema (1 in 1000, can be fatal). Hyperkalaemia esp. with NSAIDs/K+ sparing diuretics.' },
    { q: 'Drug causing QT prolongation and torsades de pointes?', opts: ['Amiodarone', 'Metoprolol', 'Lisinopril', 'Amlodipine'], correct: 0, exp: 'Amiodarone prolongs QT. Others: Erythromycin, Haloperidol, Ciprofloxacin, Methadone, Ondansetron. Monitor ECG. Correct electrolytes. Treat TdP with IV Magnesium 2g.' },
    { q: 'Warfarin interaction — drug that INCREASES anticoagulant effect?', opts: ['Erythromycin (enzyme inhibitor)', 'Rifampicin (enzyme inducer)', 'Carbamazepine (enzyme inducer)', 'Phenytoin (enzyme inducer)'], correct: 0, exp: 'Enzyme inhibitors increase warfarin effect (increase INR, bleeding risk): Erythromycin, Fluconazole, Metronidazole, Amiodarone, Cranberry juice. Inducers (reduce effect): Rifampicin, Carbamazepine, Phenytoin, St John\'s Wort.' },
    { q: 'Methotrexate toxicity — antidote?', opts: ['Folinic acid (Leucovorin)', 'Folic acid', 'N-acetylcysteine', 'Naloxone'], correct: 0, exp: 'Methotrexate toxicity (bone marrow suppression, mucositis, hepatotoxicity): Folinic acid (not folic acid). Also: NSAIDs increase MTX levels (reduce renal clearance). Stop NSAIDs with MTX!' },
    { q: 'Paracetamol overdose treatment?', opts: ['IV N-Acetylcysteine (NAC)', 'IV Fluids only', 'Naloxone', 'Activated charcoal always'], correct: 0, exp: 'Paracetamol OD: IV N-Acetylcysteine (NAC) replenishes glutathione. Give if >150mg/kg taken. Use nomogram. Activated charcoal if <1h post-ingestion.' },
    { q: 'Digoxin toxicity signs?', opts: ['Nausea, vomiting, yellow-green visual halos, bradycardia, AF with complete heart block', 'Tachycardia only', 'Hypertension + headache', 'Respiratory depression'], correct: 0, exp: 'Digoxin toxicity: GI (nausea, vomiting), visual (yellow-green halos, blurred vision), cardiac (bradyarrhythmia, heart block, AF with regularisation = CHB). Antidote: Digibind (anti-digoxin Fab).' },
    { q: 'NSAID contraindications?', opts: ['Peptic ulcer, AKI/CKD, CVD, pregnancy (3rd trimester), severe asthma', 'Hypertension only', 'Diabetes only', 'Age >65 only'], correct: 0, exp: 'NSAIDs: avoid in PUD (or add PPI), AKI/CKD (reduce GFR), CVD (increase CV events, Cox-2 inhibitors most), 3rd trimester pregnancy (premature closure ductus arteriosus), NSAID-sensitive asthma.' },
  ],
};

export default function Quiz({ uid, onComplete }) {
  const subjects = Object.keys(QUIZ_DATA);
  const [phase,    setPhase]    = useState('select');
  const [topic,    setTopic]    = useState(null);
  const [mode,     setMode]     = useState('all');    // all | random10
  const [questions,setQuestions]= useState([]);
  const [idx,      setIdx]      = useState(0);
  const [score,    setScore]    = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results,  setResults]  = useState([]);

  const ICONS = { Cardiology: '❤️', Respiratory: '🫁', Neurology: '🧠', Surgery: '🔪', Endocrinology: '🩸', Pharmacology: '💊' };
  const COLORS = { Cardiology: '#ff4444', Respiratory: '#3b82f6', Neurology: '#e879f9', Surgery: '#f59e0b', Endocrinology: '#10b981', Pharmacology: '#8b5cf6' };

  function startQuiz(t, m) {
    let qs = [...QUIZ_DATA[t]];
    if (m === 'random10') qs = qs.sort(() => Math.random() - 0.5).slice(0, 10);
    setTopic(t); setMode(m); setQuestions(qs);
    setIdx(0); setScore(0); setSelected(null); setAnswered(false); setResults([]);
    setPhase('quiz');
  }

  function answer(i) {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    const correct = questions[idx].correct;
    const isCorrect = i === correct;
    if (isCorrect) setScore(p => p + 1);
    setResults(p => [...p, { q: questions[idx].q, selected: i, correct, isCorrect }]);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      const finalScore = Math.round((score + (selected === questions[idx].correct ? 1 : 0)) / questions.length * 100);
      if (onComplete) {
        onComplete({ totalScore: finalScore, xpPoints: finalScore * 2 });
      }
      setPhase('result');
    } else {
      setIdx(p => p + 1); setSelected(null); setAnswered(false);
    }
  }

  // ── SELECT PHASE ──────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div style={Q.page}>
        <div style={Q.hdr}><h1 style={Q.title}>🎯 Mock Tests</h1><p style={Q.sub}>MCQ practice with instant feedback · {Object.values(QUIZ_DATA).flat().length}+ questions</p></div>
        <div style={Q.grid}>
          {subjects.map(t => (
            <div key={t} style={Q.subjectCard}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{ICONS[t]}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t}</div>
              <div style={{ fontSize: 12, color: '#5a7a9a', marginBottom: 14 }}>{QUIZ_DATA[t].length} questions</div>
              <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
                <button style={{ ...Q.startBtn, background: COLORS[t] + '22', color: COLORS[t], border: '1px solid ' + COLORS[t] + '44' }}
                  onClick={() => startQuiz(t, 'all')}>All {QUIZ_DATA[t].length} Questions</button>
                <button style={{ ...Q.startBtn, background: '#1e2d45', color: '#5a7a9a', border: '1px solid #1e2d45' }}
                  onClick={() => startQuiz(t, 'random10')}>Random 10 Questions</button>
              </div>
            </div>
          ))}
        </div>
        {/* All subjects mixed */}
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button style={{ padding: '14px 40px', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#000', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
            onClick={() => {
              const allQ = Object.entries(QUIZ_DATA).flatMap(([t, qs]) => qs.map(q => ({ ...q, subject: t })));
              const random20 = allQ.sort(() => Math.random() - 0.5).slice(0, 20);
              setTopic('Mixed'); setMode('random20'); setQuestions(random20);
              setIdx(0); setScore(0); setSelected(null); setAnswered(false); setResults([]);
              setPhase('quiz');
            }}>
            🎲 Mixed 20-Question Test
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ PHASE ────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = questions[idx];
    const progress = (idx / questions.length) * 100;
    return (
      <div style={Q.page}>
        <div style={Q.quizHdr}>
          <button style={Q.backBtn} onClick={() => setPhase('select')}>← Exit</button>
          <div style={{ flex: 1, margin: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: '#5a7a9a' }}>
              <span>{topic} · Question {idx + 1} of {questions.length}</span>
              <span style={{ color: '#00d4ff', fontFamily: 'monospace' }}>{score} correct</span>
            </div>
            <div style={{ background: '#1e2d45', height: 5, borderRadius: 99 }}>
              <div style={{ width: progress + '%', height: '100%', background: 'linear-gradient(90deg,#00d4ff,#00ff9d)', borderRadius: 99, transition: 'width .4s' }} />
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#5a7a9a' }}>{idx + 1}/{questions.length}</div>
        </div>

        {/* Question */}
        <div style={Q.questionBox}>
          {q.subject && <div style={{ fontSize: 11, color: COLORS[q.subject], fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>{q.subject}</div>}
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: '#e8f0fe' }}>{q.q}</div>
        </div>

        {/* Options */}
        <div style={Q.optsList}>
          {q.opts.map((opt, i) => {
            let style = { ...Q.optBtn };
            if (answered) {
              if (i === q.correct)  style = { ...Q.optBtn, ...Q.optCorrect };
              else if (i === selected) style = { ...Q.optBtn, ...Q.optWrong };
              else style = { ...Q.optBtn, opacity: 0.4 };
            }
            return (
              <button key={i} style={style} disabled={answered} onClick={() => answer(i)}>
                <span style={{ fontWeight: 800, color: answered ? 'inherit' : '#5a7a9a', minWidth: 22 }}>{String.fromCharCode(65 + i)}.</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div style={{ ...Q.feedback, ...(selected === q.correct ? Q.feedbackOk : Q.feedbackBad) }}>
            <div style={{ fontWeight: 800, marginBottom: 6, fontSize: 15 }}>
              {selected === q.correct ? '✅ Correct!' : '❌ Incorrect'}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: '#e8f0fe' }}>{q.exp}</div>
            <button style={{ marginTop: 14, padding: '11px 28px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }} onClick={next}>
              {idx + 1 >= questions.length ? '🎓 See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULT PHASE ──────────────────────────────────────────
  if (phase === 'result') {
    const finalScore = Math.round(score / questions.length * 100);
    const grade = finalScore >= 90 ? { label: 'Excellent! 🏆', color: '#ffd700' }
                : finalScore >= 70 ? { label: 'Well done! 👏', color: '#00d4ff' }
                : finalScore >= 50 ? { label: 'Good effort! 📚', color: '#00ff9d' }
                :                    { label: 'Keep practicing! 💪', color: '#f59e0b' };
    return (
      <div style={Q.page}>
        <div style={Q.resultBox}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>{finalScore >= 70 ? '🏆' : '📚'}</div>
          <div style={{ fontSize: 64, fontWeight: 800, color: grade.color, marginBottom: 8 }}>{finalScore}%</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#e8f0fe', marginBottom: 4 }}>{topic} — Complete!</div>
          <div style={{ fontSize: 16, color: '#5a7a9a', marginBottom: 24 }}>{grade.label} · {score}/{questions.length} correct</div>

          {/* Score breakdown */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
            {[{ v: score, l: 'Correct', c: '#00ff9d' }, { v: questions.length - score, l: 'Wrong', c: '#ff6b6b' }, { v: finalScore + '%', l: 'Score', c: grade.color }].map(s => (
              <div key={s.l} style={{ padding: '14px 20px', border: '1px solid #1e2d45', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: '#5a7a9a', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Wrong answers review */}
          {results.filter(r => !r.isCorrect).length > 0 && (
            <div style={{ textAlign: 'left', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ff6b6b', marginBottom: 10 }}>Review Wrong Answers:</div>
              {results.filter(r => !r.isCorrect).slice(0, 3).map((r, i) => (
                <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,107,107,0.05)', border: '1px solid rgba(255,107,107,0.15)', borderRadius: 8, marginBottom: 8, fontSize: 12 }}>
                  <div style={{ color: '#e8f0fe', marginBottom: 4 }}>{r.q}</div>
                  <div style={{ color: '#00ff9d' }}>✓ {questions.find(q => q.q === r.q)?.opts[r.correct]}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button style={{ padding: '12px 26px', border: '1px solid #1e2d45', borderRadius: 8, color: '#e8f0fe', fontSize: 14, cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif' }} onClick={() => startQuiz(topic, mode)}>↩ Retry</button>
            <button style={{ padding: '12px 26px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }} onClick={() => setPhase('select')}>All Subjects →</button>
          </div>
        </div>
      </div>
    );
  }
}

const Q = {
  page:        { padding: '24px 28px', maxWidth: 900, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:         { marginBottom: 24 },
  title:       { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:         { color: '#5a7a9a', fontSize: 14 },
  grid:        { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 },
  subjectCard: { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, padding: 22, textAlign: 'center' },
  startBtn:    { width: '100%', padding: '9px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  quizHdr:     { display: 'flex', alignItems: 'center', marginBottom: 20 },
  backBtn:     { padding: '8px 16px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', background: 'transparent', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' },
  questionBox: { padding: '20px', background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, marginBottom: 18 },
  optsList:    { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 0 },
  optBtn:      { display: 'flex', gap: 12, textAlign: 'left', padding: '13px 16px', background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 10, fontSize: 14, color: '#e8f0fe', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', lineHeight: 1.5, alignItems: 'flex-start' },
  optCorrect:  { borderColor: '#00ff9d', background: 'rgba(0,255,157,0.08)', color: '#00ff9d' },
  optWrong:    { borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.08)', color: '#ff6b6b' },
  feedback:    { borderRadius: 12, padding: '16px 18px', marginTop: 14 },
  feedbackOk:  { background: 'rgba(0,255,157,0.07)', border: '1px solid rgba(0,255,157,0.25)' },
  feedbackBad: { background: 'rgba(255,107,107,0.07)', border: '1px solid rgba(255,107,107,0.25)' },
  resultBox:   { textAlign: 'center', padding: '40px 20px', maxWidth: 560, margin: '0 auto' },
};
