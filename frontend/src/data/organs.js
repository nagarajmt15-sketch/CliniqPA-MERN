const ORGANS = {
  heart: {
    emoji: 'heart',
    name: 'Heart',
    desc: 'Pumps oxygenated blood to systemic circulation via left ventricle. Normal BP: 120/80 mmHg.',
    color: '#ff4444',
    symp: ['Chest pain', 'Dyspnea', 'Palpitations', 'Syncope', 'Edema', 'Fatigue'],
    dis: ['Acute MI', 'Heart Failure', 'Arrhythmia', 'Endocarditis', 'Pericarditis'],
    tx: ['Aspirin', 'Beta-blockers', 'ACE-I/ARB', 'Diuretics', 'Primary PCI']
  },
  lung: {
    emoji: 'lungs',
    name: 'Lungs',
    desc: 'Gas exchange organ. O2 absorption and CO2 elimination. Total lung capacity approximately 6L.',
    color: '#3b82f6',
    symp: ['Dyspnea', 'Cough', 'Hemoptysis', 'Pleuritic pain', 'Wheezing', 'Cyanosis'],
    dis: ['Pneumonia', 'COPD', 'Asthma', 'Pulmonary Embolism', 'Lung Cancer', 'TB'],
    tx: ['Antibiotics', 'Bronchodilators', 'Steroids', 'O2 therapy', 'Anticoagulants']
  },
  brain: {
    emoji: 'brain',
    name: 'Brain',
    desc: 'Central nervous system command center. 100 billion neurons, 20% of body oxygen consumption.',
    color: '#e879f9',
    symp: ['Headache', 'Altered consciousness', 'Focal deficit', 'Seizure', 'Vision changes'],
    dis: ['Ischemic Stroke', 'Hemorrhagic Stroke', 'Meningitis', 'Encephalitis', 'Epilepsy'],
    tx: ['tPA (4.5h window)', 'Mannitol', 'Antibiotics', 'Anticonvulsants', 'Neurosurgery']
  },
  liver: {
    emoji: 'liver',
    name: 'Liver',
    desc: 'Largest solid organ (1.5 kg). Detoxification, protein synthesis, bile production.',
    color: '#d97706',
    symp: ['Jaundice', 'RUQ pain', 'Hepatomegaly', 'Ascites', 'Dark urine', 'Asterixis'],
    dis: ['Hepatitis A/B/C', 'Cirrhosis', 'NAFLD', 'Hepatocellular Carcinoma', 'Acute liver failure'],
    tx: ['Antivirals', 'Lactulose', 'Diuretics', 'TIPS procedure', 'Liver transplant']
  },
  stomach: {
    emoji: 'stomach',
    name: 'Stomach',
    desc: 'J-shaped muscular organ. Stores food, secretes HCl (pH 1.5-3.5), intrinsic factor.',
    color: '#8b5cf6',
    symp: ['Epigastric pain', 'Nausea', 'Vomiting', 'Hematemesis', 'Bloating', 'Early satiety'],
    dis: ['Peptic Ulcer Disease', 'GERD', 'Gastritis', 'Gastric Cancer', 'H. pylori'],
    tx: ['PPIs', 'H2-blockers', 'H. pylori triple therapy', 'Antacids', 'Endoscopy']
  },
  kidney: {
    emoji: 'kidney',
    name: 'Kidneys',
    desc: 'Filter 180L blood/day. Regulate BP, electrolytes, erythropoietin, Vitamin D activation.',
    color: '#06b6d4',
    symp: ['Flank pain', 'Hematuria', 'Oliguria', 'Edema', 'Hypertension', 'Uremia'],
    dis: ['Acute Kidney Injury', 'CKD', 'Nephrolithiasis', 'UTI/Pyelonephritis', 'Nephrotic Syndrome'],
    tx: ['IV Fluids', 'Dialysis', 'ACE-I', 'Lithotripsy', 'Antibiotics', 'Transplant']
  },
  intestine: {
    emoji: 'intestine',
    name: 'Intestines',
    desc: 'Small intestine (6m): nutrient absorption. Large intestine (1.5m): water reabsorption.',
    color: '#10b981',
    symp: ['Crampy pain', 'Diarrhea', 'Constipation', 'PR bleeding', 'Distension', 'Tenesmus'],
    dis: ['Appendicitis', 'IBD (Crohns/UC)', 'IBS', 'Colorectal Cancer', 'Obstruction'],
    tx: ['Antibiotics', 'Steroids', 'Biologics', 'Surgery', 'Dietary changes']
  }
};

export default ORGANS;
