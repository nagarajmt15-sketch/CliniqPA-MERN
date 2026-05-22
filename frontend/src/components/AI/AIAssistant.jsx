// frontend/src/components/AI/AIAssistant.jsx
// Smart AI with notes upload + comprehensive medical knowledge base

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

// ── COMPREHENSIVE MEDICAL KNOWLEDGE BASE ──────────────────────
const KB = {
  // CARDIOLOGY
  'stemi': `🫀 STEMI — Complete Guide

DEFINITION: ST elevation MI = complete occlusion of coronary artery
ECG CRITERIA: ST elevation >1mm in ≥2 contiguous leads (or ≥2mm in V1-V3)

LOCATIONS:
• V1-V4 → Anterior MI (LAD — "widow maker")
• II, III, aVF → Inferior MI (RCA)
• I, aVL, V5-V6 → Lateral MI (LCx)
• Posterior → reciprocal changes V1-V3 (ST depression + tall R)

MANAGEMENT — MONA + Reperfusion:
• M — Morphine 2-4mg IV (pain)
• O — Oxygen ONLY if SpO2 <94%
• N — Nitrate SL (AVOID if inferior MI + RV involvement, hypotension, PDE5i use)
• A — Aspirin 300-325mg STAT (chewed)
• REPERFUSION: Primary PCI preferred (door-to-balloon <90 min)
• If PCI unavailable: Fibrinolysis within 30 min (door-to-needle <30 min)

POST-MI MEDICATIONS (ABCDE):
A — Aspirin lifelong + P2Y12 inhibitor (Ticagrelor/Clopidogrel) 12 months
B — Beta-blocker (reduces mortality — Metoprolol/Bisoprolol)
C — ACE inhibitor or ARB (reduces remodeling — Ramipril/Lisinopril)
D — statin (high intensity — Atorvastatin 40-80mg)
E — Education + Lifestyle + Cardiac Rehab

💎 PEARL: Inferior STEMI — ALWAYS check V4R for RV infarction before giving nitrates!`,

  'nstemi': `🫀 NSTEMI/ACS — Management

NSTEMI = Troponin rise + chest pain WITHOUT ST elevation
UA = No troponin rise, ST changes or symptoms at rest

WORKUP:
• Serial ECGs (changes may evolve)
• Troponin at 0h and 3h (or hs-Troponin 0h/1h protocol)
• CXR, Echo (if available)
• Risk stratify: GRACE score or TIMI score

IMMEDIATE TREATMENT:
• Aspirin 300mg + P2Y12 inhibitor (Ticagrelor preferred: 180mg loading)
• Anticoagulation: LMWH (Enoxaparin 1mg/kg BD) or UFH
• Beta-blocker if no contraindications
• Nitrates for symptom relief

INVASIVE STRATEGY (Coronary Angiography):
• High risk (GRACE >140, positive troponin, dynamic ECG changes): within 24 hours
• Intermediate risk: within 72 hours
• Low risk: can discharge and arrange outpatient

💎 PEARL: Ticagrelor superior to Clopidogrel (PLATO trial). Give loading dose before cath lab.`,

  'heart failure': `💙 Heart Failure — Guide

TYPES:
• HFrEF: EF <40% (systolic dysfunction) — most common, more treatments available
• HFpEF: EF >50% (diastolic dysfunction) — harder to treat, often elderly + HTN + AF

ACUTE DECOMPENSATED HF — TREATMENT:
Position: Sit upright (reduces preload)
O2: Target SpO2 >95%
Diuretics: IV Furosemide 40-80mg (reduces preload)
Nitrates: GTN infusion (reduces preload + afterload) — if BP >100
Morphine: 2-4mg IV (reduces anxiety, preload — controversial)
NIV (BiPAP/CPAP): If cardiogenic pulmonary oedema

CHRONIC HFrEF MEDICATIONS (QUADRUPLE THERAPY 2023):
1. ACE-I / ARB / ARNI (Sacubitril-Valsartan) — reduces mortality
2. Beta-blocker (Bisoprolol/Carvedilol) — reduces mortality
3. MRA/Spironolactone — reduces mortality
4. SGLT2 inhibitor (Dapagliflozin/Empagliflozin) — reduces hospitalisation

💎 PEARL: SGLT2 inhibitors now indicated in HF regardless of diabetes status. Huge mortality benefit.`,

  // RESPIRATORY
  'pneumonia': `🫁 Pneumonia — Complete Guide

COMMON ORGANISMS — CAP:
• Most common: Streptococcus pneumoniae (lobar consolidation, rust sputum)
• Atypicals: Mycoplasma (walking pneumonia, young adults), Chlamydophila, Legionella (air conditioning, hyponatraemia)
• Viral: Influenza, SARS-CoV-2, RSV

SEVERITY — CURB-65:
C — Confusion (new onset)
U — Urea >7 mmol/L
R — RR ≥30 /min
B — BP <90 systolic or <60 diastolic
65 — Age ≥65

Score 0-1: Low severity → outpatient
Score 2: Moderate → hospital admission
Score 3-5: Severe → consider HDU/ICU

TREATMENT:
• Mild (CURB 0-1): Oral Amoxicillin 500mg TDS × 5 days
• Moderate (CURB 2): IV Co-amoxiclav + Oral Clarithromycin
• Severe (CURB 3+): IV Co-amoxiclav + IV Clarithromycin/Azithromycin (or IV Levofloxacin monotherapy)
• Legionella/Atypicals: Macrolide or Fluoroquinolone

💎 PEARL: Legionella urine antigen test! Hyponatraemia in pneumonia = think Legionella.`,

  'pe': `🫁 Pulmonary Embolism (PE)

RISK FACTORS (Virchow's Triad):
• Hypercoagulability: malignancy, OCP, thrombophilia, pregnancy
• Stasis: immobility, long-haul flights, heart failure
• Vessel wall: trauma, surgery, vasculitis

WELLS SCORE (Pre-test probability):
• DVT symptoms (3 points)
• Alternative diagnosis less likely (3 points)
• HR >100 (1.5 points)
• Immobile/surgery in 4 weeks (1.5 points)
• Previous DVT/PE (1.5 points)
• Haemoptysis (1 point)
• Active malignancy (1 point)
Low <2 | Moderate 2-6 | High >6

INVESTIGATIONS:
• D-dimer: if low probability + D-dimer negative = PE excluded
• CTPA: gold standard imaging
• V/Q scan: if renal impairment or contrast allergy
• Echo: if massive PE (RV strain, McConnell's sign)

TREATMENT:
• Anticoagulation: LMWH (Enoxaparin) or DOAC (Rivaroxaban/Apixaban — now first line)
• Massive PE (haemodynamically unstable): Thrombolysis (Alteplase 100mg)
• Surgical embolectomy: if thrombolysis contraindicated

💎 PEARL: DOAC (Rivaroxaban/Apixaban) first line now — no INR monitoring needed, non-inferior to Warfarin.`,

  // NEUROLOGY
  'stroke': `🧠 Ischemic Stroke — Complete Guide

FAST RECOGNITION:
F — Face drooping (asymmetrical smile)
A — Arm weakness (can't raise both arms equally)
S — Speech difficulty (slurred or can't find words)
T — Time to call 108/999

IMMEDIATE WORKUP (Time = Brain):
1. Non-contrast CT head — rule out hemorrhage FIRST (thrombolysis contraindicated in hemorrhage)
2. Blood glucose — hypoglycaemia mimics stroke! (most common stroke mimic)
3. BP, ECG (look for AF as source)
4. FBC, PT/INR, metabolic panel
5. CT angiogram if large vessel occlusion suspected

THROMBOLYSIS — IV ALTEPLASE (tPA):
• Window: 3 to 4.5 hours from symptom onset (LAST SEEN NORMAL)
• Dose: 0.9 mg/kg (max 90mg), 10% bolus then 90% over 60 min
• BP must be <185/110 before giving
• Door-to-needle: <60 minutes
• NIHSS score to grade severity

CONTRAINDICATIONS to tPA:
• Haemorrhagic stroke / intracranial bleed
• Recent major surgery <14 days
• Active internal bleeding
• INR >1.7, platelet <100,000
• BP uncontrolled >185/110

MECHANICAL THROMBECTOMY:
• Large vessel occlusion (M1/M2, ICA, basilar)
• Window: up to 24 hours (selected cases)
• Door-to-groin: <90 minutes

💎 PEARL: WAKE-UP strokes — MRI DWI/FLAIR mismatch guides thrombolysis decision even beyond 4.5h window.`,

  // SEPSIS
  'sepsis': `🦠 Sepsis — Hour-1 Bundle

SEPSIS-3 DEFINITIONS:
• Sepsis: Life-threatening organ dysfunction caused by dysregulated host response to infection (SOFA ≥2)
• Septic Shock: Sepsis + vasopressors needed (MAP <65) + Lactate >2 mmol/L
• qSOFA (bedside): RR ≥22 + AMS + SBP ≤100 (≥2 = high risk)

HOUR-1 BUNDLE (Surviving Sepsis Campaign 2018):
1. Measure LACTATE — if >2, treat as septic shock; if >4, high mortality
2. Blood cultures x2 sets BEFORE antibiotics
3. Broad-spectrum ANTIBIOTICS within 1 HOUR
4. 30 mL/kg IV crystalloid for hypotension or lactate ≥4
5. VASOPRESSORS if MAP <65 despite fluids → Norepinephrine FIRST LINE

ANTIBIOTIC CHOICE:
• Unknown source: Piperacillin-Tazobactam (Tazocin) ± Gentamicin
• Urosepsis: Co-amoxiclav or Gentamicin
• Community pneumonia: Co-amoxiclav + Azithromycin
• Meningitis: Ceftriaxone + Dexamethasone
• Neutropenic sepsis: Piperacillin-Tazobactam ± Gentamicin

VASOPRESSORS:
• 1st line: Norepinephrine (0.01-3 mcg/kg/min)
• 2nd line: Vasopressin (0.03 units/min) if norepinephrine >0.25 mcg/kg/min
• 3rd line: Epinephrine (adrenaline)
• Cardiogenic component: Dobutamine

STEROIDS: Hydrocortisone 200mg/day if vasopressor-dependent (not responsive to fluids)

💎 PEARL: Procalcitonin (PCT) useful for antibiotic de-escalation. If PCT falls >80% or <0.5 = consider stopping.`,

  // DKA
  'dka': `🩸 DKA Management — Complete Guide

DIAGNOSTIC CRITERIA:
• Blood glucose >11 mmol/L (200 mg/dL)
• Ketonaemia ≥3 mmol/L OR Ketonuria 2+ or more
• Acidosis: pH <7.3 or HCO3 <15 mmol/L

SEVERITY:
• Mild: pH 7.25-7.30, HCO3 15-18
• Moderate: pH 7.00-7.25, HCO3 10-15
• Severe: pH <7.00, HCO3 <10

TREATMENT PROTOCOL:
STEP 1: IV FLUIDS (ALWAYS FIRST)
• 1L 0.9% NaCl over 1 hour (bolus)
• Then 1L over 2 hours × 2
• Then 1L over 4 hours
• When BGL <14 mmol/L: add 10% Dextrose alongside saline

STEP 2: POTASSIUM REPLACEMENT
• CRITICAL: Do NOT start insulin if K+ <3.5 mmol/L!
• K+ 3.5-5.5: Add 40mmol KCl to each litre
• K+ >5.5: No K+ supplementation (check hourly)

STEP 3: FIXED RATE IV INSULIN (FRIII)
• 0.1 units/kg/hour (e.g., 50 units Actrapid in 50mL NaCl)
• Target BGL fall: 3-4 mmol/L/hour
• Do NOT stop insulin until ketones cleared (even if BGL normal)
• Add 10% Dextrose when BGL <14 to prevent hypoglycaemia

RESOLUTION CRITERIA:
• pH >7.3 AND HCO3 >15 AND ketones <0.6 mmol/L (NOT just BGL)

💎 PEARL: Most common triggers: Infections (especially UTI, pneumonia), missed insulin, new diagnosis. Always identify and treat the precipitant!`,

  // APPENDICITIS
  'appendicitis': `🩺 Appendicitis — Complete Guide

ALVARADO SCORE (MANTRELS):
M — Migration of pain to RLQ (1)
A — Anorexia (1)
N — Nausea/Vomiting (1)
T — Tenderness RLQ (2)
R — Rebound tenderness (1)
E — Elevated temperature >37.3°C (1)
L — Leukocytosis >10,000 (2)
S — Shift to left/neutrophilia (1)
TOTAL: 10 points

INTERPRETATION:
• 1-4: Low probability — observe/discharge
• 5-6: Equivocal — CT scan abdomen/pelvis
• 7-10: High probability — surgical consult

CLINICAL SIGNS:
• McBurney's point: 2/3 from umbilicus to right ASIS (maximum tenderness)
• Rovsing's sign: LLQ palpation causes RLQ pain
• Psoas sign: Hip extension causes pain (retrocecal appendix)
• Obturator sign: Internal rotation of flexed hip (pelvic appendix)

INVESTIGATIONS:
• CBC: WBC >11,000 (neutrophilia)
• CRP: elevated
• Ultrasound: first line (no radiation) — dilated appendix >6mm, fat stranding
• CT abdomen/pelvis: best sensitivity/specificity (if US inconclusive)
• MRI: preferred in pregnancy

TREATMENT:
• Nil by mouth + IV fluids + analgesia (do NOT withhold analgesia!)
• IV antibiotics: Co-amoxiclav or Cefuroxime + Metronidazole
• Laparoscopic appendectomy (gold standard)
• Conservative (antibiotics alone): possible for uncomplicated — 30% recurrence at 5 years

💎 PEARL: Perforation risk = 15% at 24h, 30% at 36h, 70% at 48h. Do NOT delay surgery unnecessarily!`,

  // DIABETES
  'diabetes': `🩸 Diabetes Mellitus — Key Points

DIAGNOSTIC CRITERIA:
• FPG ≥7.0 mmol/L (126 mg/dL) — fasting ≥8 hours
• Random glucose ≥11.1 mmol/L (200 mg/dL) WITH symptoms
• HbA1c ≥48 mmol/mol (6.5%)
• 2h OGTT ≥11.1 mmol/L

PRE-DIABETES:
• IFG (Impaired Fasting Glucose): FPG 6.1-6.9 mmol/L
• IGT: 2h OGTT 7.8-11.0 mmol/L
• HbA1c 42-47 mmol/mol (5.7-6.4%)

TYPE 1 vs TYPE 2:
• T1DM: Young, thin, autoimmune, absolute insulin deficiency, prone to DKA
• T2DM: Older, overweight, insulin resistance + relative deficiency, prone to HHS

TYPE 2 MANAGEMENT:
Step 1: Lifestyle + Metformin
Step 2: Add SGLT2i (Dapagliflozin) or GLP-1 agonist (Liraglutide) — if HF or CKD: SGLT2i preferred
Step 3: Add DPP-4 inhibitor or sulfonylurea
Step 4: Insulin

HbA1c TARGETS:
• Most T2DM: <53 mmol/mol (7%)
• Elderly/frail: <58 mmol/mol (7.5%)
• T1DM: <48 mmol/mol (6.5%)

COMPLICATIONS (SWEET mnemonic):
• S — Stroke/cardiovascular disease
• W — Wound healing poor/neuropathy
• E — Eye (retinopathy → blindness)
• E — End-stage renal disease
• T — Toes/feet (peripheral vascular disease, amputation)

💎 PEARL: Metformin contraindicated if eGFR <30. SGLT2i now first-line if HF or proteinuric CKD — independent of glucose control.`,

  // HYPERTENSION
  'hypertension': `💉 Hypertension — Management

CLASSIFICATION (NICE/ESC):
• Optimal: <120/<80 mmHg
• Normal: 120-129/<80
• Grade 1 HTN: 130-139/80-89
• Grade 2 HTN: 140-159/90-99
• Grade 3 HTN: ≥160/≥100
• Hypertensive Urgency: >180/120 (no organ damage)
• Hypertensive Emergency: >180/120 + organ damage

HYPERTENSIVE EMERGENCY — Organ Damage:
• Hypertensive encephalopathy (headache, confusion)
• Acute MI or ACS
• Acute pulmonary oedema
• Aortic dissection
• Acute kidney injury
• Retinal haemorrhages (grade III-IV Keith-Wagener)

TREATMENT (NICE Guidelines):
Step 1: ACE-I (Amlodipine if >55 or Black African)
Step 2: Add CCB (Amlodipine) + ACE-I
Step 3: Add Thiazide-like diuretic (Indapamide)
Step 4: Low K+: Spironolactone. Normal/High K+: Beta-blocker or alpha-blocker

SPECIAL SITUATIONS:
• Aortic dissection: IV Labetalol (rate + pressure control)
• Hypertensive encephalopathy: IV Labetalol or GTN infusion
• Eclampsia: IV Labetalol or Hydralazine
• AVOID rapid reduction in most emergencies (cerebral autoregulation)

💎 PEARL: AVOID ACE-I + ARB combination (dual RAAS blockade) — increases AKI, hyperkalaemia risk. ONTARGET trial showed no benefit.`
};

export default function AIAssistant() {
  const { user } = useAuth();
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState('');
  const [typing,    setTyping]    = useState(false);
  const [uploadedNotes, setUploadedNotes] = useState([]);
  const [activeView, setActiveView] = useState('chat'); // chat | upload | topics
  const fileRef  = useRef(null);
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  const initials = user
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'PA';

  useEffect(() => {
    // Welcome message
    addAI(`Hello ${user?.name?.split(' ')[0] || 'PA Student'}! 👋

I'm CliniqAI — your clinical study assistant.

I can help you with:
📚 Clinical decision-making steps
💊 Drug mechanisms and dosages  
🔍 Diagnosis criteria and differentials
💎 Mnemonics and exam pearls
📄 Explain your uploaded notes

Try asking:
• "Explain STEMI management"
• "CURB-65 score for pneumonia"
• "DKA vs HHS difference"
• "Sepsis Hour-1 bundle"

Or upload your class notes using the 📎 Upload button!`);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function addAI(text) {
    setMessages(p => [...p, { role: 'ai', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  }

  function addUser(text) {
    setMessages(p => [...p, { role: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  }

  function getAnswer(q) {
    const ql = q.toLowerCase();

    // Check knowledge base
    const kbKeys = Object.keys(KB);
    for (const key of kbKeys) {
      if (ql.includes(key)) return KB[key];
    }

    // Additional keyword matching
    if (ql.includes('heart attack') || ql.includes('mi ') || ql.includes('infarct')) return KB['stemi'];
    if (ql.includes('chest pain')) return KB['stemi'];
    if (ql.includes('clot') || ql.includes('embol') || ql.includes('dvt')) return KB['pe'];
    if (ql.includes('infect') || ql.includes('septic') || ql.includes('bacteremi')) return KB['sepsis'];
    if (ql.includes('sugar') || ql.includes('insulin') || ql.includes('diabetic keto') || ql.includes('ketoacid')) return KB['dka'];
    if (ql.includes('type 1') || ql.includes('type 2') || ql.includes('diabete') || ql.includes('hba1c') || ql.includes('metformin')) return KB['diabetes'];
    if (ql.includes('blood pressure') || ql.includes('hypertens') || ql.includes('bp high')) return KB['hypertension'];
    if (ql.includes('cough') || ql.includes('consolidat') || ql.includes('lobar')) return KB['pneumonia'];
    if (ql.includes('brain') || ql.includes('tpa') || ql.includes('thrombol') || ql.includes('tia')) return KB['stroke'];
    if (ql.includes('append') || ql.includes('mcburney') || ql.includes('alvarado') || ql.includes('rlq pain')) return KB['appendicitis'];
    if (ql.includes('failure') || ql.includes('oedema') || ql.includes('edema') || ql.includes('furosemide')) return KB['heart failure'];
    if (ql.includes('nstemi') || ql.includes('unstable angina') || ql.includes('acs')) return KB['nstemi'];

    // Check uploaded notes
    const noteMatch = uploadedNotes.find(n =>
      n.content.toLowerCase().includes(ql.slice(0, 20))
    );
    if (noteMatch) {
      return `From your uploaded notes (${noteMatch.name}):\n\n${noteMatch.content.slice(0, 800)}...\n\n💡 Note: This is from your uploaded material. For more details, I recommend reviewing the full notes.`;
    }

    // Fallback
    return `I don't have a specific answer for "${q}" in my knowledge base yet.

Here's what I CAN help with right now:
❤️ STEMI/NSTEMI/ACS management
🫁 Pneumonia (CAP) — CURB-65
🦠 Sepsis — Hour-1 Bundle
🩸 DKA management protocol
🧠 Ischemic Stroke — tPA protocol
🩺 Appendicitis — Alvarado score
💉 Hypertension management
🩸 Diabetes management

📎 You can also UPLOAD your notes and I'll help explain them!

Try asking: "Explain STEMI" or "Tell me about sepsis management"`;
  }

  function sendMessage() {
    const q = input.trim();
    if (!q) return;
    addUser(q);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addAI(getAnswer(q));
    }, 1000 + Math.random() * 800);
  }

  // File upload handler
  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target.result;
        const newNote = { name: file.name, content, uploadedAt: new Date().toLocaleDateString() };
        setUploadedNotes(p => [...p, newNote]);
        addAI(`📄 I've received your notes: "${file.name}"

I've added this to my knowledge base. You can now ask me questions about its content!

For example, try asking:
• "What does my note say about [topic]?"
• "Summarize my uploaded notes"
• "Quiz me on my uploaded notes"

💡 Note: I can read text files (.txt) and will do my best to understand your notes format.`);
        setActiveView('chat');
      };
      reader.readAsText(file);
    });
    e.target.value = '';
  }

  const QUICK_QUESTIONS = [
    { q: 'Explain STEMI management', icon: '❤️' },
    { q: 'CURB-65 for pneumonia', icon: '🫁' },
    { q: 'Sepsis Hour-1 bundle', icon: '🦠' },
    { q: 'DKA management protocol', icon: '🩸' },
    { q: 'Stroke tPA protocol', icon: '🧠' },
    { q: 'Appendicitis Alvarado score', icon: '🩺' },
    { q: 'DKA vs HHS difference', icon: '⚡' },
    { q: 'Heart failure management', icon: '💙' },
    { q: 'Hypertension emergency treatment', icon: '💉' },
    { q: 'NSTEMI vs STEMI', icon: '🫀' },
  ];

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerLeft}>
          <div style={S.aiAvatar}>🤖</div>
          <div>
            <div style={S.headerTitle}>CliniqAI Assistant</div>
            <div style={S.headerStatus}>
              <span style={S.statusDot} />
              Online · Instant answers
            </div>
          </div>
        </div>
        <div style={S.headerRight}>
          <button style={Object.assign({}, S.viewBtn, activeView === 'chat'    ? S.viewBtnActive : {})} onClick={() => setActiveView('chat')}>💬 Chat</button>
          <button style={Object.assign({}, S.viewBtn, activeView === 'upload'  ? S.viewBtnActive : {})} onClick={() => setActiveView('upload')}>📎 Notes</button>
          <button style={Object.assign({}, S.viewBtn, activeView === 'topics'  ? S.viewBtnActive : {})} onClick={() => setActiveView('topics')}>📚 Topics</button>
        </div>
      </div>

      <div style={S.body}>
        {/* CHAT VIEW */}
        {activeView === 'chat' && (
          <>
            <div style={S.chatArea}>
              {messages.map((m, i) => (
                <div key={i} style={Object.assign({}, S.msgWrap, m.role === 'user' ? S.msgWrapUser : {})}>
                  <div style={Object.assign({}, S.msgAv, m.role === 'user' ? S.msgAvUser : S.msgAvAI)}>
                    {m.role === 'ai' ? '🤖' : initials}
                  </div>
                  <div>
                    <div style={Object.assign({}, S.bubble, m.role === 'user' ? S.bubbleUser : S.bubbleAI)}>
                      {m.text.split('\n').map((line, j) => (
                        <span key={j}>
                          {line.startsWith('•') ? (
                            <span style={{ display: 'block', paddingLeft: 12 }}>{line}</span>
                          ) : line.startsWith('💎') ? (
                            <span style={{ display: 'block', background: 'rgba(255,217,61,0.1)', borderRadius: 6, padding: '6px 10px', marginTop: 8, color: '#ffd93d' }}>{line}</span>
                          ) : (
                            <span>{line}</span>
                          )}
                          {j < m.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                    <div style={S.msgTime}>{m.time}</div>
                  </div>
                </div>
              ))}
              {typing && (
                <div style={S.msgWrap}>
                  <div style={Object.assign({}, S.msgAv, S.msgAvAI)}>🤖</div>
                  <div style={Object.assign({}, S.bubble, S.bubbleAI, { padding: '12px 16px' })}>
                    <span style={S.dot1}>●</span> <span style={S.dot2}>●</span> <span style={S.dot3}>●</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick questions */}
            <div style={S.quickRow}>
              {QUICK_QUESTIONS.slice(0, 5).map(q => (
                <button key={q.q} style={S.quickBtn}
                  onClick={() => { addUser(q.q); setTyping(true); setTimeout(() => { setTyping(false); addAI(getAnswer(q.q)); }, 1200); }}>
                  {q.icon} {q.q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={S.inputRow}>
              <input ref={inputRef} style={S.input}
                placeholder="Ask any clinical question... (e.g. Fever management steps?)"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              />
              <button style={S.uploadIconBtn} onClick={() => fileRef.current?.click()} title="Upload notes">
                📎
              </button>
              <button style={S.sendBtn} onClick={sendMessage} disabled={!input.trim()}>
                Send ➤
              </button>
              <input ref={fileRef} type="file" accept=".txt,.md,.pdf,.doc,.docx" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
            </div>
          </>
        )}

        {/* UPLOAD VIEW */}
        {activeView === 'upload' && (
          <div style={S.uploadView}>
            <div style={S.uploadHdr}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📎</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#e8f0fe', marginBottom: 8 }}>Upload Your Notes</div>
              <div style={{ fontSize: 14, color: '#5a7a9a', marginBottom: 24 }}>
                Upload your class notes, textbook pages, or study material. <br/>
                AI will help you understand and quiz you on the content.
              </div>
              <button style={S.uploadBtn} onClick={() => fileRef.current?.click()}>
                + Upload Notes (.txt, .md)
              </button>
              <input ref={fileRef} type="file" accept=".txt,.md" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
            </div>

            {uploadedNotes.length > 0 ? (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#5a7a9a', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.5px' }}>
                  Uploaded Notes ({uploadedNotes.length})
                </div>
                {uploadedNotes.map((n, i) => (
                  <div key={i} style={S.noteCard}>
                    <span style={{ fontSize: 24 }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#e8f0fe' }}>{n.name}</div>
                      <div style={{ fontSize: 12, color: '#5a7a9a', marginTop: 2 }}>
                        Uploaded {n.uploadedAt} · {n.content.split(' ').length} words
                      </div>
                      <div style={{ fontSize: 12, color: '#8a9ab5', marginTop: 6, lineHeight: 1.5 }}>
                        {n.content.slice(0, 100)}...
                      </div>
                    </div>
                    <button style={S.askAboutBtn}
                      onClick={() => { setActiveView('chat'); addUser('Explain my uploaded notes: ' + n.name); setTyping(true); setTimeout(() => { setTyping(false); addAI('From your uploaded notes (' + n.name + '):\n\n' + n.content.slice(0, 600) + '\n\n💡 Ask me specific questions about this content!'); }, 1000); }}>
                      Ask AI →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={S.emptyNotes}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
                <div style={{ fontSize: 14, color: '#5a7a9a' }}>No notes uploaded yet</div>
              </div>
            )}
          </div>
        )}

        {/* TOPICS VIEW */}
        {activeView === 'topics' && (
          <div style={S.topicsView}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e8f0fe', marginBottom: 16 }}>
              📚 Available Topics
            </div>
            <div style={S.topicsGrid}>
              {[
                { key: 'stemi', label: 'STEMI', icon: '❤️', cat: 'Cardiology' },
                { key: 'nstemi', label: 'NSTEMI/ACS', icon: '🫀', cat: 'Cardiology' },
                { key: 'heart failure', label: 'Heart Failure', icon: '💙', cat: 'Cardiology' },
                { key: 'pneumonia', label: 'Pneumonia', icon: '🫁', cat: 'Respiratory' },
                { key: 'pe', label: 'Pulmonary Embolism', icon: '🩸', cat: 'Respiratory' },
                { key: 'stroke', label: 'Stroke/tPA', icon: '🧠', cat: 'Neurology' },
                { key: 'sepsis', label: 'Sepsis Bundle', icon: '🦠', cat: 'Infectious' },
                { key: 'dka', label: 'DKA Protocol', icon: '💉', cat: 'Endocrinology' },
                { key: 'diabetes', label: 'Diabetes', icon: '🩸', cat: 'Endocrinology' },
                { key: 'hypertension', label: 'Hypertension', icon: '💉', cat: 'Cardiology' },
                { key: 'appendicitis', label: 'Appendicitis', icon: '🩺', cat: 'Surgery' },
              ].map(t => (
                <div key={t.key} style={S.topicCard}
                  onClick={() => {
                    setActiveView('chat');
                    addUser('Explain ' + t.label);
                    setTyping(true);
                    setTimeout(() => { setTyping(false); addAI(getAnswer(t.key)); }, 1000);
                  }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e8f0fe', marginBottom: 3 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: '#5a7a9a' }}>{t.cat}</div>
                  <div style={{ fontSize: 11, color: '#00d4ff', marginTop: 6 }}>Ask AI →</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const S = {
  page:          { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 0px)', fontFamily: 'Outfit, sans-serif', color: '#e8f0fe', background: '#07090f' },
  header:        { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #1e2d45', background: '#0d1117', flexWrap: 'wrap', gap: 10, flexShrink: 0 },
  headerLeft:    { display: 'flex', alignItems: 'center', gap: 12 },
  aiAvatar:      { width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#00d4ff,#00ff9d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  headerTitle:   { fontSize: 16, fontWeight: 800 },
  headerStatus:  { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#00ff9d', marginTop: 2 },
  statusDot:     { width: 7, height: 7, borderRadius: '50%', background: '#00ff9d', display: 'inline-block' },
  headerRight:   { display: 'flex', gap: 8 },
  viewBtn:       { padding: '7px 14px', border: '1px solid #1e2d45', borderRadius: 8, fontSize: 13, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif' },
  viewBtnActive: { background: '#00d4ff', color: '#000', border: '1px solid #00d4ff' },
  body:          { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 },
  chatArea:      { flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 },
  msgWrap:       { display: 'flex', gap: 10, alignItems: 'flex-start' },
  msgWrapUser:   { flexDirection: 'row-reverse' },
  msgAv:         { width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 },
  msgAvAI:       { background: 'linear-gradient(135deg,#00d4ff,#00ff9d)', color: '#000' },
  msgAvUser:     { background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', color: '#fff' },
  bubble:        { maxWidth: '78%', padding: '12px 16px', borderRadius: 14, fontSize: 13, lineHeight: 1.7 },
  bubbleAI:      { background: '#111827', border: '1px solid #1e2d45', borderBottomLeftRadius: 4 },
  bubbleUser:    { background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', borderBottomRightRadius: 4 },
  msgTime:       { fontSize: 10, color: '#5a7a9a', marginTop: 4 },
  dot1:          { animation: 'blink 1.4s 0s infinite', color: '#5a7a9a' },
  dot2:          { animation: 'blink 1.4s 0.2s infinite', color: '#5a7a9a' },
  dot3:          { animation: 'blink 1.4s 0.4s infinite', color: '#5a7a9a' },
  quickRow:      { display: 'flex', gap: 8, padding: '8px 16px', overflowX: 'auto', borderTop: '1px solid #1e2d45', flexShrink: 0 },
  quickBtn:      { padding: '6px 12px', border: '1px solid #1e2d45', borderRadius: 99, fontSize: 12, color: '#5a7a9a', cursor: 'pointer', background: '#111827', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif', flexShrink: 0 },
  inputRow:      { display: 'flex', gap: 8, padding: '12px 16px', borderTop: '1px solid #1e2d45', flexShrink: 0 },
  input:         { flex: 1, padding: '11px 16px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 10, color: '#e8f0fe', fontSize: 14, outline: 'none', fontFamily: 'Outfit, sans-serif' },
  uploadIconBtn: { width: 44, height: 44, border: '1px solid #1e2d45', borderRadius: 10, fontSize: 18, background: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sendBtn:       { padding: '11px 20px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', flexShrink: 0 },
  uploadView:    { flex: 1, overflowY: 'auto', padding: 24 },
  uploadHdr:     { textAlign: 'center', padding: '24px 0 28px', borderBottom: '1px solid #1e2d45', marginBottom: 20 },
  uploadBtn:     { padding: '12px 28px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  noteCard:      { display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', border: '1px solid #1e2d45', borderRadius: 12, marginBottom: 10 },
  askAboutBtn:   { padding: '8px 14px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 8, color: '#00d4ff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' },
  emptyNotes:    { textAlign: 'center', padding: '40px 0' },
  topicsView:    { flex: 1, overflowY: 'auto', padding: 20 },
  topicsGrid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 },
  topicCard:     { background: '#111827', border: '1px solid #1e2d45', borderRadius: 12, padding: '18px 14px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s' },
};
