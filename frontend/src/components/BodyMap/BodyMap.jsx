import React, { useState } from 'react';

// ================================================================
// BIODIGITAL STYLE — 3D Model Embed + Interactive Info Panel
// Real medical 3D via Sketchfab embed + Custom click info panel
// ================================================================

const CATEGORIES = {
  organs: {
    label: 'Organs',
    icon: '🫀',
    color: '#ff4444',
    parts: {
      heart: {
        name: 'Heart',
        emoji: '❤️',
        color: '#ff3333',
        desc: 'Four-chambered muscular pump. Beats 100,000 times/day, pumping 5L blood/min at rest.',
        details: {
          location: 'Mediastinum, slightly left of midline',
          size: 'Fist-sized, ~300g',
          function: 'Pumps oxygenated blood to body, deoxygenated blood to lungs',
          bloodSupply: 'Left & Right Coronary Arteries',
          innervation: 'Vagus nerve (parasympathetic), Cardiac accelerator nerves (sympathetic)'
        },
        symptoms: ['Chest pain', 'Dyspnea', 'Palpitations', 'Syncope', 'Edema', 'Fatigue'],
        diseases: ['Acute MI / STEMI', 'Heart Failure', 'Arrhythmia', 'Endocarditis', 'Pericarditis', 'Cardiomyopathy'],
        tx: ['Aspirin', 'Beta-blockers', 'ACE-I', 'Diuretics', 'Primary PCI', 'Defibrillation'],
        facts: ['Beats 60-100 times per minute', 'Pumps 5-6 liters per minute at rest', 'Has its own electrical system (SA node)', 'Right side pumps to lungs, left to body']
      },
      lung: {
        name: 'Lungs',
        emoji: '🫁',
        color: '#3b82f6',
        desc: 'Primary gas exchange organs. Right lung has 3 lobes, left has 2 (cardiac notch). Total capacity ~6L.',
        details: {
          location: 'Thoracic cavity, bilateral',
          size: 'Right: 3 lobes, Left: 2 lobes',
          function: 'O2-CO2 gas exchange via 300 million alveoli',
          bloodSupply: 'Pulmonary arteries and veins',
          innervation: 'Phrenic nerve, Vagus nerve, Sympathetic trunk'
        },
        symptoms: ['Dyspnea', 'Cough', 'Hemoptysis', 'Pleuritic pain', 'Wheezing', 'Cyanosis'],
        diseases: ['Pneumonia', 'COPD', 'Asthma', 'Pulmonary Embolism', 'Lung Cancer', 'TB', 'Pleural Effusion'],
        tx: ['Antibiotics', 'Bronchodilators', 'Steroids', 'O2 therapy', 'Anticoagulants', 'Chest drain'],
        facts: ['Surface area of tennis court (70m²)', 'Right lung is larger than left', '300 million alveoli total', 'Breathe 20,000 times per day']
      },
      liver: {
        name: 'Liver',
        emoji: '🟤',
        color: '#d97706',
        desc: 'Largest solid organ (1.5kg). Over 500 functions including detoxification, protein synthesis, bile production.',
        details: {
          location: 'Right upper quadrant (RUQ)',
          size: '1.2-1.5 kg, 4 lobes',
          function: 'Detox, protein synthesis, bile production, glycogen storage, clotting factors',
          bloodSupply: 'Hepatic artery (25%), Portal vein (75%)',
          innervation: 'Hepatic plexus (sympathetic + vagus)'
        },
        symptoms: ['Jaundice', 'RUQ pain', 'Hepatomegaly', 'Ascites', 'Dark urine', 'Asterixis'],
        diseases: ['Hepatitis A/B/C', 'Cirrhosis', 'NAFLD', 'Hepatocellular Ca', 'Acute liver failure', 'Cholestasis'],
        tx: ['Antivirals', 'Lactulose', 'Diuretics', 'TIPS procedure', 'Liver transplant', 'Lifestyle modification'],
        facts: ['Only organ that can regenerate', 'Produces 800-1000ml bile daily', 'Stores glycogen for energy', 'Makes all clotting factors except VIII']
      },
      kidney: {
        name: 'Kidneys',
        emoji: '🫘',
        color: '#06b6d4',
        desc: 'Filter 180L blood/day. Regulate BP, electrolytes, acid-base balance, erythropoietin, Vitamin D.',
        details: {
          location: 'Retroperitoneal, T12-L3 level',
          size: '10-12cm each, bean-shaped',
          function: 'Filtration, BP regulation, electrolyte balance, EPO production',
          bloodSupply: 'Renal arteries (branch of aorta)',
          innervation: 'Renal plexus (sympathetic T10-L1)'
        },
        symptoms: ['Flank pain', 'Hematuria', 'Oliguria', 'Edema', 'Hypertension', 'Uremia'],
        diseases: ['AKI', 'CKD', 'Nephrolithiasis', 'Pyelonephritis', 'Nephrotic Syndrome', 'RCC'],
        tx: ['IV Fluids', 'Dialysis', 'ACE-I', 'Lithotripsy', 'Antibiotics', 'Transplant'],
        facts: ['Filter 180L blood per day', 'Right kidney slightly lower than left', '1 million nephrons each', 'Produce EPO for red blood cell production']
      },
      brain: {
        name: 'Brain',
        emoji: '🧠',
        color: '#e879f9',
        desc: 'Command center. 86 billion neurons, 100 trillion synapses. Uses 20% of body oxygen despite being 2% of body weight.',
        details: {
          location: 'Cranial cavity',
          size: '1.3-1.4 kg, 4 lobes + cerebellum + brainstem',
          function: 'Cognition, motor control, sensory processing, autonomic regulation',
          bloodSupply: 'Circle of Willis (ICA + vertebrobasilar)',
          innervation: '12 pairs of cranial nerves'
        },
        symptoms: ['Headache', 'Altered consciousness', 'Focal deficit', 'Seizure', 'Vision changes', 'Aphasia'],
        diseases: ['Ischemic Stroke', 'Hemorrhagic Stroke', 'Meningitis', 'Encephalitis', 'Brain tumor', 'Epilepsy'],
        tx: ['tPA (4.5h window)', 'Mannitol', 'Antibiotics', 'Anticonvulsants', 'Neurosurgery', 'Rehab'],
        facts: ['20% of cardiac output goes to brain', 'No pain receptors in brain tissue', 'Cerebellum has 80% of neurons', 'Blood-brain barrier protects it']
      },
      stomach: {
        name: 'Stomach',
        emoji: '🟣',
        color: '#8b5cf6',
        desc: 'J-shaped muscular organ. Secretes HCl (pH 1.5-3.5), pepsinogen, intrinsic factor. Stores 1-1.5L food.',
        details: {
          location: 'Left upper quadrant (LUQ)',
          size: 'Empty: 75ml, Full: 1-1.5L',
          function: 'Mechanical digestion, HCl secretion, intrinsic factor production',
          bloodSupply: 'Celiac artery branches',
          innervation: 'Vagus nerve (X), Celiac plexus'
        },
        symptoms: ['Epigastric pain', 'Nausea', 'Vomiting', 'Hematemesis', 'Bloating', 'Early satiety'],
        diseases: ['PUD', 'GERD', 'Gastritis', 'Gastric Cancer', 'H. pylori', 'Gastroparesis'],
        tx: ['PPIs', 'H2-blockers', 'H. pylori triple therapy', 'Antacids', 'Endoscopy', 'Surgery'],
        facts: ['HCl strong enough to dissolve metal', 'Stomach lining replaced every 3-5 days', 'Churning 3x/min when full', 'Intrinsic factor needed for B12 absorption']
      },
      intestine: {
        name: 'Intestines',
        emoji: '🟢',
        color: '#10b981',
        desc: 'Small intestine (6-7m): absorbs nutrients. Large intestine (1.5m): absorbs water, forms stool.',
        details: {
          location: 'Abdomen, peritoneal cavity',
          size: 'Small: 6-7m, Large: 1.5m',
          function: 'Nutrient absorption (small), water reabsorption (large)',
          bloodSupply: 'Superior & Inferior Mesenteric Arteries',
          innervation: 'Enteric nervous system (second brain), Vagus, Splanchnic nerves'
        },
        symptoms: ['Crampy pain', 'Diarrhea', 'Constipation', 'PR bleeding', 'Distension', 'Tenesmus'],
        diseases: ['Appendicitis', 'IBD (Crohns/UC)', 'IBS', 'Colorectal Cancer', 'Obstruction', 'Ischemia'],
        tx: ['Antibiotics', 'Steroids', 'Biologics', 'Surgery', 'Dietary changes', 'Mesalamine'],
        facts: ['Surface area of a studio apartment', 'Contains 100 trillion bacteria', 'Enteric NS has 500 million neurons', 'Appendix is in right iliac fossa']
      }
    }
  },
  bones: {
    label: 'Bones & Skeleton',
    icon: '🦴',
    color: '#e2d5b0',
    parts: {
      skull: {
        name: 'Skull',
        emoji: '💀',
        color: '#e2d5b0',
        desc: 'Protects brain and sensory organs. 22 bones: 8 cranial + 14 facial. Sutures fuse by age 2.',
        details: {
          location: 'Head',
          bones: '22 total (8 cranial, 14 facial)',
          function: 'Brain protection, houses sensory organs, speech/chewing',
          landmarks: 'Foramen magnum, sella turcica, mastoid process, zygomatic arch'
        },
        symptoms: ['Headache', 'Scalp laceration', 'CSF leak', 'Battle sign', 'Raccoon eyes'],
        diseases: ['Skull fracture', 'Epidural hematoma', 'Subdural hematoma', 'Osteomyelitis', 'Paget disease'],
        tx: ['Observation', 'Neurosurgery', 'ICP monitoring', 'Antibiotics'],
        facts: ['Hardest bone in body: temporal bone', 'Sutures close by age 2', 'Mandible is only movable skull bone', 'Houses smallest bones: ossicles in ear']
      },
      spine: {
        name: 'Vertebral Column',
        emoji: '🦴',
        color: '#d4c5a0',
        desc: '33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), 4 coccygeal (fused). Protects spinal cord.',
        details: {
          location: 'Posterior midline, neck to pelvis',
          structure: 'C1-C7, T1-T12, L1-L5, Sacrum, Coccyx',
          function: 'Spinal cord protection, weight bearing, movement, attachment',
          curves: 'Lordosis (cervical/lumbar), Kyphosis (thoracic/sacral)'
        },
        symptoms: ['Back pain', 'Radiculopathy', 'Weakness', 'Numbness', 'Bowel/bladder dysfunction'],
        diseases: ['Disc herniation', 'Spinal stenosis', 'Scoliosis', 'Vertebral fracture', 'Cauda equina syndrome'],
        tx: ['Physiotherapy', 'NSAIDs', 'Epidural steroids', 'Surgery', 'Bracing'],
        facts: ['L4-L5 most common disc herniation level', 'Cauda equina = surgical emergency', 'Atlas (C1) has no body', 'Axis (C2) has dens for rotation']
      },
      ribcage: {
        name: 'Rib Cage',
        emoji: '🦴',
        color: '#d4c5a0',
        desc: '12 pairs of ribs. True ribs (1-7): costal cartilage to sternum. False ribs (8-10). Floating ribs (11-12).',
        details: {
          location: 'Thoracic cage',
          structure: '12 pairs + sternum + costal cartilages',
          function: 'Heart and lung protection, breathing mechanics',
          landmarks: 'Angle of Louis (T4/T5), Sternal notch, Xiphoid process'
        },
        symptoms: ['Chest pain', 'Tenderness', 'Crepitus', 'Paradoxical breathing'],
        diseases: ['Rib fracture', 'Flail chest', 'Costochondritis', 'Pneumothorax', 'Hemothorax'],
        tx: ['Analgesia', 'Chest drain', 'ORIF', 'Respiratory support'],
        facts: ['Rib 1 fracture = great vessel injury risk', 'Flail chest = 3+ consecutive rib fractures', 'Women have slightly smaller rib cage', 'Sternum has 3 parts: manubrium, body, xiphoid']
      },
      pelvis: {
        name: 'Pelvis',
        emoji: '🦴',
        color: '#d4c5a0',
        desc: 'Ring of bones: ilium, ischium, pubis (fused = os coxae) + sacrum + coccyx. Supports weight, protects pelvic organs.',
        details: {
          location: 'Between lumbar spine and femurs',
          structure: 'Ilium + Ischium + Pubis = Innominate bone, x2 + Sacrum',
          function: 'Weight transmission, pelvic organ protection, childbirth',
          landmarks: 'ASIS, PSIS, ischial spine, pubic symphysis, sacroiliac joint'
        },
        symptoms: ['Pelvic pain', 'Hip pain', 'Instability', 'Urinary symptoms'],
        diseases: ['Pelvic fracture', 'Sacroiliitis', 'AVN femoral head', 'Pelvic inflammatory disease'],
        tx: ['External fixation', 'ORIF', 'Analgesia', 'Physiotherapy'],
        facts: ['Female pelvis wider (gynecoid)', 'Pelvic fracture can cause massive hemorrhage', 'ASIS = attachment for inguinal ligament', 'Pubic symphysis separates in pregnancy']
      }
    }
  },
  nerves: {
    label: 'Nervous System',
    icon: '⚡',
    color: '#ffd93d',
    parts: {
      cns: {
        name: 'Central Nervous System',
        emoji: '🧠',
        color: '#ffd93d',
        desc: 'Brain + Spinal cord. Protected by skull and vertebral column. Covered by 3 meninges: dura, arachnoid, pia mater.',
        details: {
          components: 'Brain (cerebrum, cerebellum, brainstem) + Spinal cord',
          protection: 'Skull + Vertebral column + 3 Meninges + CSF + Blood-Brain Barrier',
          function: 'Receives, processes, and coordinates all nervous system signals',
          csf: '150ml CSF, produced by choroid plexus, reabsorbed by arachnoid granulations'
        },
        symptoms: ['Altered consciousness', 'Seizures', 'Focal deficits', 'Headache', 'Neck stiffness'],
        diseases: ['Meningitis', 'Encephalitis', 'MS', 'MND/ALS', 'Hydrocephalus', 'Brain abscess'],
        tx: ['Antibiotics/Antivirals', 'Steroids', 'Anti-epileptics', 'Immunotherapy', 'Shunt'],
        facts: ['Brain uses 20% of body oxygen', 'Spinal cord ends at L1-L2', 'CSF replaced 4x daily', 'Cerebellum has 80% of all neurons']
      },
      cranialNerves: {
        name: 'Cranial Nerves',
        emoji: '⚡',
        color: '#fbbf24',
        desc: '12 pairs of cranial nerves. Mixed sensory/motor/autonomic. Exit directly from brain, not spinal cord.',
        details: {
          mnemonic: 'Oh Oh Oh To Touch And Feel Very Good Velvet Ah Heaven',
          types: 'Sensory only: I, II, VIII. Motor only: III, IV, VI, XI, XII. Mixed: V, VII, IX, X',
          testing: 'Each CN tested separately in clinical exam',
          important: 'CN X (Vagus) most important — heart, lungs, gut'
        },
        symptoms: ['Diplopia', 'Facial weakness', 'Hearing loss', 'Dysphagia', 'Hoarseness', 'Anosmia'],
        diseases: ['Bells palsy (CN VII)', 'Trigeminal neuralgia (CN V)', 'Oculomotor palsy (CN III)', 'Horner syndrome'],
        tx: ['Steroids (Bell\'s palsy)', 'Carbamazepine (trigeminal neuralgia)', 'Eye patch', 'Physiotherapy'],
        facts: ['CN I — Olfactory (smell)', 'CN II — Optic (vision)', 'CN III — Oculomotor (eye movement)', 'CN X — Vagus (heart, lungs, gut)', 'CN VII — Facial (smile, UMN vs LMN lesion difference)']
      },
      autonomic: {
        name: 'Autonomic Nervous System',
        emoji: '⚡',
        color: '#f59e0b',
        desc: 'Controls involuntary functions. Sympathetic (fight/flight) vs Parasympathetic (rest/digest). Always in balance.',
        details: {
          sympathetic: 'T1-L2 outflow, noradrenaline/adrenaline, fight-or-flight',
          parasympathetic: 'CN III, VII, IX, X + S2-S4, acetylcholine, rest-and-digest',
          enteric: 'Second brain in gut wall, 500 million neurons',
          balance: 'Sympathetic and parasympathetic usually oppose each other'
        },
        symptoms: ['Tachycardia', 'Hypertension', 'Sweating', 'Dry mouth', 'Urinary retention', 'Constipation'],
        diseases: ['Autonomic neuropathy', 'POTS', 'Horner syndrome', 'Raynauds', 'Phaeochromocytoma'],
        tx: ['Beta-blockers', 'Alpha-blockers', 'Anticholinergics', 'Fludrocortisone (POTS)'],
        facts: ['Sympathetic: HR up, pupils dilate, bronchodilate, decrease gut motility', 'Parasympathetic: HR down, pupils constrict, increase gut motility', 'Adrenaline = epinephrine', 'Pupils — CN III parasympathetic, if blown pupil = CN III compression']
      },
      peripheral: {
        name: 'Peripheral Nerves',
        emoji: '⚡',
        color: '#f97316',
        desc: '31 pairs of spinal nerves (8C, 12T, 5L, 5S, 1Co). Each has anterior (motor) and posterior (sensory) root.',
        details: {
          structure: 'Dorsal root (sensory) + Ventral root (motor) = Spinal nerve',
          plexuses: 'Cervical (C1-C4), Brachial (C5-T1), Lumbar (L1-L4), Sacral (L4-S3)',
          important: 'Sciatic nerve = largest nerve in body',
          dermatomes: 'C5-T1 arm, T4 nipple, T10 umbilicus, L4 knee, S1 heel'
        },
        symptoms: ['Weakness', 'Numbness/tingling', 'Pain', 'Areflexia', 'Muscle wasting', 'Foot drop'],
        diseases: ['Carpal tunnel', 'Sciatica', 'Guillain-Barre', 'Diabetic neuropathy', 'Radiculopathy'],
        tx: ['Physiotherapy', 'Splinting', 'Nerve block', 'Surgery', 'Gabapentin', 'IVIG (GBS)'],
        facts: ['Sciatic nerve from L4-S3', 'Common peroneal = most commonly injured nerve', 'Median nerve through carpal tunnel', 'Wrist drop = radial nerve', 'Foot drop = common peroneal nerve']
      }
    }
  },
  muscles: {
    label: 'Muscles',
    icon: '💪',
    color: '#ef4444',
    parts: {
      cardiac: {
        name: 'Cardiac Muscle',
        emoji: '💪',
        color: '#ef4444',
        desc: 'Involuntary striated muscle found only in heart. Intercalated discs allow coordinated contraction.',
        details: {
          type: 'Involuntary, striated',
          special: 'Intercalated discs, gap junctions, branched fibers',
          energy: 'Primarily fatty acids and lactate',
          refractory: 'Long absolute refractory period prevents tetanus'
        },
        symptoms: ['Chest pain', 'Palpitations', 'Dyspnea', 'Edema'],
        diseases: ['Myocardial infarction', 'Myocarditis', 'Cardiomyopathy', 'Heart failure'],
        tx: ['Reperfusion therapy', 'ACE-I', 'Beta-blockers', 'Diuretics'],
        facts: ['Cannot tetanize (unlike skeletal muscle)', 'Uses aerobic metabolism almost exclusively', 'Intercalated discs = unique to cardiac muscle', 'SA node is the pacemaker (60-100 bpm)']
      },
      respiratory: {
        name: 'Respiratory Muscles',
        emoji: '💪',
        color: '#f87171',
        desc: 'Diaphragm (primary), External intercostals (inspiration). Internal intercostals, abdominals (forced expiration).',
        details: {
          primary: 'Diaphragm — supplied by phrenic nerve (C3,4,5)',
          accessory: 'SCM, scalenes, pectoralis minor',
          expiration: 'Normally passive, active in forced expiration',
          mnemonic: 'C3,4,5 keeps the diaphragm alive'
        },
        symptoms: ['Dyspnea', 'Paradoxical breathing', 'Orthopnea', 'Respiratory failure'],
        diseases: ['Phrenic nerve palsy', 'COPD', 'Flail chest', 'Guillain-Barre'],
        tx: ['Mechanical ventilation', 'NIV/BiPAP', 'Physiotherapy'],
        facts: ['Diaphragm = most important breathing muscle', 'Phrenic nerve from C3-C5', 'Normal expiration is passive (elastic recoil)', 'Accessory muscles in respiratory distress = severe']
      }
    }
  },
  vessels: {
    label: 'Blood Vessels',
    icon: '🩸',
    color: '#dc2626',
    parts: {
      aorta: {
        name: 'Aorta',
        emoji: '🩸',
        color: '#dc2626',
        desc: 'Largest artery. Ascending aorta → Aortic arch → Descending thoracic → Abdominal aorta → Bifurcates at L4.',
        details: {
          diameter: 'Ascending: 3-3.5cm, Descending: 2-2.5cm',
          branches: 'Coronaries, Brachiocephalic, LCCA, LSA, Celiac, SMA, Renal, IMA, Iliacs',
          layers: 'Tunica intima, media (elastin), adventitia',
          pressure: 'Systolic ~120mmHg, Diastolic ~80mmHg'
        },
        symptoms: ['Tearing chest/back pain', 'BP difference arms', 'Pulse deficit', 'Aortic regurgitation'],
        diseases: ['Aortic dissection', 'Aortic aneurysm', 'Aortic stenosis', 'Coarctation', 'Atherosclerosis'],
        tx: ['Emergency surgery (dissection)', 'EVAR (aneurysm)', 'BP control', 'Beta-blockers'],
        facts: ['Bifurcates at L4 (umbilicus level)', 'Stanford A dissection = surgical emergency', 'AAA normal <3cm, repair if >5.5cm', 'Marfan syndrome = aortic root dilation']
      },
      coronary: {
        name: 'Coronary Arteries',
        emoji: '🩸',
        color: '#b91c1c',
        desc: 'Left Main → LAD + LCx. Right Coronary Artery (RCA). Fill during diastole. Any occlusion = MI.',
        details: {
          LCA: 'Left main → LAD (anterior wall, septum) + LCx (lateral wall)',
          RCA: 'Right coronary → Inferior wall + SA node (55%) + AV node (90%)',
          dominance: 'Right dominant in 85% (RCA gives posterior descending)',
          filling: 'Coronaries fill in DIASTOLE (unlike other arteries)'
        },
        symptoms: ['Chest pain', 'ST changes', 'Troponin rise', 'Dyspnea', 'Diaphoresis'],
        diseases: ['Stable angina', 'ACS/NSTEMI', 'STEMI', 'Coronary spasm', 'Coronary anomaly'],
        tx: ['Aspirin', 'Nitrates', 'PCI', 'CABG', 'Thrombolysis'],
        facts: ['LAD = widow-maker (most common STEMI)', 'Coronaries fill in diastole', 'RCA → inferior MI (II, III, aVF)', 'LAD → anterior MI (V1-V4)', 'LCx → lateral MI (I, aVL, V5-V6)']
      }
    }
  }
};

// Sketchfab 3D model embed IDs (free, public medical models)
const MODEL_IDS = {
  organs: 'c53e1d6e2bfc48d48de09cf71c77ba78',
  bones: '0b7b12b7e5e54a0e960e7b8c0faf3a05',
  nerves: 'e1bfd8e3fbc14c5888bf3f82d43b0a6f',
  muscles: 'aeef556f6cf54b89a87c3e0f6c4e0a76',
  vessels: 'f8c2d1b4e3a54f8ba5d2e1c0b4f3a2e1'
};

export default function BodyMap() {
  const [activeCategory, setActiveCategory] = useState('organs');
  const [selectedPart, setSelectedPart] = useState(null);
  const [activeLayer, setActiveLayer] = useState('organs');
  const [tab, setTab] = useState('info');
  const [searchQuery, setSearchQuery] = useState('');

  const category = CATEGORIES[activeCategory];
  const part = selectedPart ? category?.parts?.[selectedPart] : null;

  // Search across all categories
  const searchResults = searchQuery.length > 1
    ? Object.entries(CATEGORIES).flatMap(([catKey, cat]) =>
        Object.entries(cat.parts).filter(([, p]) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.diseases || []).some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.symptoms || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        ).map(([partKey, p]) => ({ catKey, partKey, ...p }))
      )
    : [];

  return (
    <div style={s.page}>
      {/* TOP HEADER */}
      <div style={s.topBar}>
        <div style={s.topLeft}>
          <span style={s.topTitle}>🧬 BioDigital Body Explorer</span>
          <span style={s.topSub}>Medical 3D · Anatomy · Clinical Reference</span>
        </div>
        <div style={s.searchWrap}>
          <input
            style={s.searchInput}
            placeholder="Search organ, disease, symptom..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); }}
          />
          {searchQuery && (
            <button style={s.clearBtn} onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* SEARCH RESULTS */}
      {searchResults.length > 0 && (
        <div style={s.searchResults}>
          <div style={s.searchResultsTitle}>Search Results ({searchResults.length})</div>
          <div style={s.searchResultsGrid}>
            {searchResults.map(r => (
              <div key={r.catKey + r.partKey} style={s.searchResultItem}
                onClick={() => { setActiveCategory(r.catKey); setSelectedPart(r.partKey); setSearchQuery(''); }}>
                <span style={{ fontSize: 20 }}>{r.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e8f0fe' }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: '#5a7a9a' }}>{CATEGORIES[r.catKey].label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={s.mainLayout}>
        {/* LEFT SIDEBAR — Categories */}
        <div style={s.leftSidebar}>
          <div style={s.sideTitle}>Categories</div>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <div key={key}
              style={Object.assign({}, s.catItem, activeCategory === key ? { background: 'rgba(0,212,255,0.1)', color: cat.color, borderLeft: '3px solid ' + cat.color } : {})}
              onClick={() => { setActiveCategory(key); setSelectedPart(null); }}>
              <span style={{ fontSize: 18 }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.label}</span>
            </div>
          ))}

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #1e2d45' }}>
            <div style={s.sideTitle}>Parts</div>
            {Object.entries(category.parts).map(([key, p]) => (
              <div key={key}
                style={Object.assign({}, s.partItem, selectedPart === key ? { background: 'rgba(0,212,255,0.08)', color: p.color || '#00d4ff' } : {})}
                onClick={() => setSelectedPart(key)}>
                <span style={{ fontSize: 16 }}>{p.emoji}</span>
                <span style={{ fontSize: 12 }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER — 3D Viewer */}
        <div style={s.viewer}>
          {/* Layer toggle */}
          <div style={s.layerBar}>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button key={key}
                style={Object.assign({}, s.layerBtn, activeLayer === key ? { background: cat.color + '33', color: cat.color, border: '1px solid ' + cat.color } : {})}
                onClick={() => setActiveLayer(key)}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* 3D Iframe */}
          <div style={s.iframeWrap}>
            <iframe
              key={activeLayer}
              title="3D Body Model"
              style={s.iframe}
              src={
                activeLayer === 'organs'
                  ? 'https://sketchfab.com/models/8a43f3a308994699a4000b17004d5220/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0'
                  : activeLayer === 'bones'
                  ? 'https://sketchfab.com/models/071ecfa34d904c9b99b816b9509124b5/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0'
                  : activeLayer === 'nerves'
                  ? 'https://sketchfab.com/models/c6bde6cd35764f108dde933ad2c34142/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0'
                  : activeLayer === 'muscles'
                  ? 'https://sketchfab.com/models/7ea21567ff9942bf9511e2d99efe85d9/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0'
                  : 'https://sketchfab.com/models/e7abdabd3a6d422cb25e6e63b45b1ab0/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0'
              }
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
            {/* Overlay buttons on 3D model */}
            <div style={s.modelOverlay}>
              <div style={s.overlayTitle}>
                {category.icon} {category.label}
                {selectedPart && part && (
                  <span style={{ color: part.color, marginLeft: 8 }}>→ {part.name}</span>
                )}
              </div>
              <div style={s.quickPartBtns}>
                {Object.entries(category.parts).map(([key, p]) => (
                  <button key={key}
                    style={Object.assign({}, s.quickPartBtn, selectedPart === key ? { background: (p.color || '#00d4ff') + '44', borderColor: p.color || '#00d4ff', color: p.color || '#00d4ff' } : {})}
                    onClick={() => setSelectedPart(key)}>
                    {p.emoji} {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Clinical Info */}
        <div style={s.rightPanel}>
          {!part ? (
            <div style={s.noSelect}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{category.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#e8f0fe', marginBottom: 8 }}>{category.label}</div>
              <div style={{ fontSize: 13, color: '#5a7a9a', lineHeight: 1.7 }}>
                Select a part from the list or click quick buttons on the model to view clinical details.
              </div>
              <div style={{ marginTop: 20 }}>
                {Object.entries(category.parts).map(([key, p]) => (
                  <div key={key} style={s.partCard} onClick={() => setSelectedPart(key)}>
                    <span style={{ fontSize: 22 }}>{p.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#e8f0fe' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#5a7a9a' }}>{p.desc.slice(0, 50)}...</div>
                    </div>
                    <span style={{ color: '#5a7a9a', marginLeft: 'auto' }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Part header */}
              <div style={s.partHdr}>
                <div style={{ fontSize: 40 }}>{part.emoji}</div>
                <div>
                  <div style={Object.assign({}, s.partName, { color: part.color })}>{part.name}</div>
                  <div style={s.partDesc}>{part.desc}</div>
                </div>
              </div>

              {/* Tabs */}
              <div style={s.tabs}>
                {['info', 'clinical', 'facts'].map(t => (
                  <button key={t} style={Object.assign({}, s.tabBtn, tab === t ? { background: '#00d4ff', color: '#000' } : {})}
                    onClick={() => setTab(t)}>
                    {t === 'info' ? 'Details' : t === 'clinical' ? 'Clinical' : 'Key Facts'}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {tab === 'info' && part.details && (
                <div>
                  {Object.entries(part.details).map(([k, v]) => (
                    <div key={k} style={s.detailRow}>
                      <div style={s.detailKey}>{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</div>
                      <div style={s.detailVal}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'clinical' && (
                <div>
                  <div style={s.clinSection}>
                    <div style={s.clinTitle}>🔴 Symptoms</div>
                    <div style={s.tagWrap}>
                      {(part.symptoms || []).map(t => <span key={t} style={s.tagR}>{t}</span>)}
                    </div>
                  </div>
                  <div style={s.clinSection}>
                    <div style={s.clinTitle}>⚠️ Diseases</div>
                    <div style={s.tagWrap}>
                      {(part.diseases || []).map(t => <span key={t} style={s.tagY}>{t}</span>)}
                    </div>
                  </div>
                  <div style={s.clinSection}>
                    <div style={s.clinTitle}>💊 Treatment</div>
                    <div style={s.tagWrap}>
                      {(part.tx || []).map(t => <span key={t} style={s.tagG}>{t}</span>)}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'facts' && (
                <div>
                  {(part.facts || []).map((f, i) => (
                    <div key={i} style={s.factItem}>
                      <span style={s.factNum}>{i + 1}</span>
                      <span style={{ fontSize: 13, color: '#e8f0fe', lineHeight: 1.6 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              <button style={s.backBtn} onClick={() => setSelectedPart(null)}>← Back to {category.label}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  page:              { background: '#07090f', minHeight: '100vh', fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  topBar:            { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #1e2d45', background: '#0d1117', flexWrap: 'wrap', gap: 12 },
  topLeft:           { display: 'flex', flexDirection: 'column' },
  topTitle:          { fontSize: 18, fontWeight: 800, color: '#e8f0fe' },
  topSub:            { fontSize: 12, color: '#5a7a9a', marginTop: 2 },
  searchWrap:        { display: 'flex', alignItems: 'center', gap: 8 },
  searchInput:       { padding: '9px 16px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 99, color: '#e8f0fe', fontSize: 13, outline: 'none', width: 280 },
  clearBtn:          { background: 'none', border: 'none', color: '#5a7a9a', cursor: 'pointer', fontSize: 14 },
  searchResults:     { padding: '12px 24px', borderBottom: '1px solid #1e2d45', background: '#0d1117' },
  searchResultsTitle:{ fontSize: 11, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 },
  searchResultsGrid: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  searchResultItem:  { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', border: '1px solid #1e2d45', borderRadius: 10, cursor: 'pointer', background: '#111827' },
  mainLayout:        { display: 'grid', gridTemplateColumns: '200px 1fr 320px', height: 'calc(100vh - 70px)', overflow: 'hidden' },
  leftSidebar:       { borderRight: '1px solid #1e2d45', padding: '16px 0', overflowY: 'auto', background: '#0a0e1a' },
  sideTitle:         { fontSize: 10, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: 1, padding: '0 16px', marginBottom: 8 },
  catItem:           { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', color: '#5a7a9a', transition: 'all .15s', borderLeft: '3px solid transparent' },
  partItem:          { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', cursor: 'pointer', color: '#5a7a9a', fontSize: 12, borderBottom: '1px solid #0f1a2e' },
  viewer:            { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  layerBar:          { display: 'flex', gap: 8, padding: '10px 16px', borderBottom: '1px solid #1e2d45', background: '#0d1117', flexWrap: 'wrap' },
  layerBtn:          { padding: '6px 12px', border: '1px solid #1e2d45', borderRadius: 99, fontSize: 11, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif', transition: 'all .2s' },
  iframeWrap:        { flex: 1, position: 'relative' },
  iframe:            { width: '100%', height: '100%', border: 'none', background: '#07090f' },
  modelOverlay:      { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(0deg,rgba(7,9,15,0.95) 0%,transparent 100%)' },
  overlayTitle:      { fontSize: 13, fontWeight: 700, color: '#e8f0fe', marginBottom: 8 },
  quickPartBtns:     { display: 'flex', gap: 6, flexWrap: 'wrap' },
  quickPartBtn:      { padding: '5px 12px', border: '1px solid #1e2d45', borderRadius: 99, fontSize: 11, color: '#5a7a9a', cursor: 'pointer', background: 'rgba(13,17,23,0.8)', fontFamily: 'Outfit, sans-serif', transition: 'all .2s' },
  rightPanel:        { borderLeft: '1px solid #1e2d45', overflowY: 'auto', padding: 20, background: '#0a0e1a' },
  noSelect:          { textAlign: 'center', paddingTop: 30 },
  partCard:          { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid #1e2d45', borderRadius: 10, marginBottom: 8, cursor: 'pointer', textAlign: 'left' },
  partHdr:           { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #1e2d45' },
  partName:          { fontSize: 20, fontWeight: 800, marginBottom: 4 },
  partDesc:          { fontSize: 12, color: '#5a7a9a', lineHeight: 1.6 },
  tabs:              { display: 'flex', gap: 6, marginBottom: 16 },
  tabBtn:            { flex: 1, padding: '8px', border: '1px solid #1e2d45', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif', transition: 'all .2s' },
  detailRow:         { marginBottom: 12, padding: '10px 12px', background: '#111827', borderRadius: 8 },
  detailKey:         { fontSize: 10, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 },
  detailVal:         { fontSize: 13, color: '#e8f0fe', lineHeight: 1.5 },
  clinSection:       { marginBottom: 16 },
  clinTitle:         { fontSize: 11, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #1e2d45' },
  tagWrap:           { display: 'flex', flexWrap: 'wrap', gap: 6 },
  tagR:              { fontSize: 11, padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(255,107,107,0.4)', color: '#fca5a5' },
  tagY:              { fontSize: 11, padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(255,217,61,0.4)', color: '#fde047' },
  tagG:              { fontSize: 11, padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(0,255,157,0.4)', color: '#00ff9d' },
  factItem:          { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, padding: '10px 12px', background: '#111827', borderRadius: 8 },
  factNum:           { width: 22, height: 22, borderRadius: '50%', background: '#00d4ff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 },
  backBtn:           { marginTop: 20, width: '100%', padding: '10px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', fontSize: 13, cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif' }
};
