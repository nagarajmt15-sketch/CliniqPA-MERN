import React, { useState } from 'react';
import CASES from '../../data/cases';

function CaseRunner() {
  const [activeCase, setActiveCase] = useState(null);
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // 🎯 Database progress cloud synchronization logic
  async function saveProgressToDB(finalScore) {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) return;

      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://cliniqpa-mern.onrender.com';

      await fetch(`${API_URL}/api/progress/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          caseId: activeCase.id,
          caseTitle: activeCase.title,
          score: finalScore,
          totalSteps: activeCase.steps.length
        })
      });
      console.log('🎯 Progress saved to cloud DB successfully!');
    } catch (err) {
      console.error('Error saving progress:', err.message);
    }
  }

  function startCase(c) {
    setActiveCase(c);
    setStep(0);
    setAnswered(false);
    setCorrect(0);
    setSelected(null);
    setShowResult(false);
  }

  function pickAnswer(i) {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    
    var currentStep = activeCase.steps[step];
    var correctIndex = currentStep.correct !== undefined ? currentStep.correct : currentStep.correctAnswer;
    
    if (i === correctIndex) {
      setCorrect(function(p) { return p + 1; });
    }
  }

  function nextStep() {
    var currentStep = activeCase.steps[step];
    var correctIndex = currentStep.correct !== undefined ? currentStep.correct : currentStep.correctAnswer;

    if (step + 1 >= activeCase.steps.length) {
      setShowResult(true);
      const isCurrentCorrect = selected === correctIndex;
      const finalScore = isCurrentCorrect ? correct + 1 : correct;
      saveProgressToDB(finalScore);
    } else {
      setStep(function(p) { return p + 1; });
      setAnswered(false);
      setSelected(null);
    }
  }

  function retry() {
    startCase(activeCase);
  }

  // --- RENDERING ROUTE 1: ALL CASES GRID ---
  if (!activeCase) {
    return React.createElement('div', { style: s.wrap },
      React.createElement('div', { style: s.hdr },
        React.createElement('h1', { style: s.title }, '🏥 Patient Cases'),
        React.createElement('p', { style: s.sub }, 'Step-by-step clinical decision making')
      ),
      React.createElement('div', { style: s.grid },
        CASES && CASES.length > 0 ? (
          CASES.map(function(c) {
            return React.createElement('div', { key: c.id, style: s.card },
              React.createElement('div', { style: { ...s.banner, background: c.color || '#00d4ff' } }),
              React.createElement('div', { style: s.cardBody },
                React.createElement('div', { style: s.diff }, (c.diff || 'Standard') + ' - ' + (c.steps?.length || 0) + ' Steps'),
                React.createElement('div', { style: s.cardTitle }, c.title),
                React.createElement('div', { style: s.cardSub }, c.sub),
                React.createElement('div', { style: s.tags },
                  c.tags?.map(function(t) {
                    return React.createElement('span', { key: t, style: s.tag }, t);
                  })
                ),
                React.createElement('button', { style: s.startBtn, onClick: function() { startCase(c); } }, 'Start Case')
              )
            );
          })
        ) : (
          React.createElement('p', { style: { color: '#5a7a9a', gridColumn: '1/-1', textAlign: 'center' } }, 'No cases found or dataset loading...')
        )
      )
    );
  }

  // --- RENDERING ROUTE 2: SCORE SHEET RESULT ---
  if (showResult) {
    var pct = Math.round((correct / activeCase.steps.length) * 100);
    return React.createElement('div', { style: s.wrap },
      React.createElement('div', { style: s.resultBox },
        React.createElement('div', { style: s.resultMedal }, pct >= 80 ? '🏆' : pct >= 60 ? '👏' : '💪'),
        React.createElement('div', { style: s.resultScore }, pct + '%'),
        React.createElement('div', { style: s.resultTitle }, activeCase.title + ' - Complete!'),
        React.createElement('div', { style: s.resultMsg }, correct + '/' + activeCase.steps.length + ' correct  -  ' + (pct >= 80 ? 'Excellent clinical judgment!' : pct >= 60 ? 'Good effort! Review explanations.' : 'Keep practicing!')),
        React.createElement('div', { style: { marginTop: 20 } },
          React.createElement('button', { style: s.retryBtn, onClick: retry }, 'Retry'),
          React.createElement('button', { style: s.doneBtn, onClick: function() { setActiveCase(null); } }, 'All Cases')
        )
      )
    );
  }

  // --- RENDERING ROUTE 3: LIVE ACTIVE CASE SYSTEM ---
  var currentStep = activeCase.steps[step];

  return React.createElement('div', { style: s.wrap },
    React.createElement('div', { style: s.caseHdr },
      React.createElement('button', { style: s.backBtn, onClick: function() { setActiveCase(null); } }, 'Back'),
      React.createElement('div', null,
        React.createElement('div', { style: s.caseTitle }, activeCase.title),
        React.createElement('div', { style: s.caseSub }, (activeCase.sub || activeCase.diff || 'Standard') + '  -  Step ' + (step + 1) + ' of ' + activeCase.steps.length)
      )
    ),
    React.createElement('div', { style: s.stepBar },
      activeCase.steps?.map(function(_, i) {
        return React.createElement('div', { key: i, style: { ...s.stepDot, ...(i < step ? s.dotDone : i === step ? s.dotCur : {}) } });
      })
    ),
    React.createElement('div', { style: s.vitalsBox },
      React.createElement('div', { style: s.vitalsTitle }, 'Patient Vitals'),
      React.createElement('div', { style: s.vitalsGrid },
        currentStep.vitals?.map(function(v, i) {
          return React.createElement('div', { key: i, style: s.vit },
            React.createElement('div', { style: { ...s.vitVal, ...(v.c === 'abn' ? s.vitAbn : v.c === 'warn' ? s.vitWarn : s.vitOk) } }, v.v),
            React.createElement('div', { style: s.vitName }, v.n)
          );
        })
      )
    ),
    
    // Scenario Check
    React.createElement('div', { style: s.scenarioBox }, currentStep.sc || currentStep.scenario || 'No scenario details provided.'),
    
    React.createElement('div', { style: s.optsLabel }, 'What will you do next?'),
    React.createElement('div', { style: s.optsList },
      (currentStep.opts || currentStep.options || [])?.map(function(o, i) {
        var btnStyle = { ...s.optBtn };
        var correctIndex = currentStep.correct !== undefined ? currentStep.correct : currentStep.correctAnswer;
        
        if (answered) {
          if (i === correctIndex) btnStyle = { ...s.optBtn, ...s.optCorrect };
          else if (i === selected) btnStyle = { ...s.optBtn, ...s.optWrong };
        }

        // 💡 [object Object] BUG FIX: Safely parse text from object if necessary
        var displayOptionText = '';
        if (typeof o === 'object' && o !== null) {
          displayOptionText = o.text || o.option || o.optionText || o.title || JSON.stringify(o);
        } else {
          displayOptionText = o;
        }

        return React.createElement('button', { key: i, style: btnStyle, disabled: answered, onClick: function() { pickAnswer(i); } },
          String.fromCharCode(65 + i) + '. ' + displayOptionText
        );
      })
    ),
    
    // Explanation Check
    answered && React.createElement('div', { style: { ...s.fbBox, ...(selected === (currentStep.correct !== undefined ? currentStep.correct : currentStep.correctAnswer) ? s.fbOk : s.fbBad) } },
      React.createElement('div', { style: s.fbTitle }, selected === (currentStep.correct !== undefined ? currentStep.correct : currentStep.correctAnswer) ? 'Correct!' : 'Not ideal.'),
      React.createElement('div', { style: s.fbExp }, currentStep.exp || currentStep.explanation || '')
    ),
    answered && React.createElement('button', { style: s.nextBtn, onClick: nextStep },
      step + 1 >= activeCase.steps.length ? 'See Results' : 'Continue'
    )
  );
}

// Global styles definitions
var s = {
  wrap:        { padding: '28px 32px', maxWidth: 900, fontFamily: 'Outfit, sans-serif' },
  hdr:         { marginBottom: 28 },
  title:       { fontSize: 26, fontWeight: 800, color: '#e8f0fe', marginBottom: 6 },
  sub:         { color: '#5a7a9a', fontSize: 14 },
  grid:        { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 },
  card:        { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' },
  banner:      { height: 7 },
  cardBody:    { padding: 20 },
  diff:        { fontSize: 11, color: '#5a7a9a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 },
  cardTitle:   { fontSize: 18, fontWeight: 800, color: '#e8f0fe', marginBottom: 6 },
  cardSub:     { fontSize: 13, color: '#5a7a9a', marginBottom: 14 },
  tags:        { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  tag:         { fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'rgba(0,212,255,0.1)', color: '#00d4ff', fontWeight: 700 },
  startBtn:    { width: '100%', padding: 10, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  caseHdr:     { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 },
  backBtn:     { padding: '8px 16px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', fontSize: 13, cursor: 'pointer', background: 'transparent' },
  caseTitle:   { fontSize: 20, fontWeight: 800, color: '#e8f0fe' },
  caseSub:     { fontSize: 13, color: '#5a7a9a', marginTop: 3 },
  stepBar:     { display: 'flex', gap: 8, marginBottom: 20 },
  stepDot:     { width: 12, height: 12, borderRadius: '50%', background: '#1e2d45' },
  dotDone:     { background: '#00ff9d' },
  dotCur:      { background: '#00d4ff', boxShadow: '0 0 0 3px rgba(0,212,255,0.3)' },
  vitalsBox:   { background: '#111827', border: '1px solid #1e2d45', borderRadius: 10, padding: 16, marginBottom: 16 },
  vitalsTitle: { fontSize: 11, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 12 },
  vitalsGrid:  { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 },
  vit:         { textAlign: 'center' },
  vitVal:      { fontSize: 18, fontWeight: 700, fontFamily: 'monospace' },
  vitAbn:      { color: '#ff6b6b' },
  vitWarn:     { color: '#ffd93d' },
  vitOk:       { color: '#00ff9d' },
  vitName:     { fontSize: 10, color: '#5a7a9a', marginTop: 2 },
  scenarioBox: { background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 10, padding: '14px 18px', marginBottom: 18, fontSize: 14, lineHeight: 1.7, color: '#e8f0fe' },
  optsLabel:   { fontSize: 12, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 },
  optsList:    { display: 'flex', flexDirection: 'column', gap: 8 },
  optBtn:      { textAlign: 'left', padding: '13px 16px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 10, fontSize: 14, color: '#e8f0fe', cursor: 'pointer' },
  optCorrect:  { borderColor: '#00ff9d', background: 'rgba(0,255,157,0.08)', color: '#00ff9d' },
  optWrong:    { borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.08)', color: '#ff6b6b' },
  fbBox:       { borderRadius: 10, padding: '14px 16px', marginTop: 14, fontSize: 14, lineHeight: 1.6 },
  fbOk:        { background: 'rgba(0,255,157,0.07)', border: '1px solid rgba(0,255,157,0.25)', color: '#00ff9d' },
  fbBad:       { background: 'rgba(255,107,107,0.07)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b' },
  fbTitle:     { fontWeight: 800, marginBottom: 4 },
  fbExp:       { color: '#e8f0fe', fontSize: 13 },
  nextBtn:     { marginTop: 16, padding: '12px 26px', borderRadius: 8, fontSize: 14, fontWeight: 700, background: '#00d4ff', color: '#000', border: 'none', cursor: 'pointer' },
  resultBox:   { textAlign: 'center', padding: '60px 20px' },
  resultMedal: { fontSize: 72, marginBottom: 14 },
  resultScore: { fontSize: 56, fontWeight: 800, color: '#00d4ff', marginBottom: 8 },
  resultTitle: { fontSize: 18, fontWeight: 700, color: '#e8f0fe', marginBottom: 8 },
  resultMsg:   { fontSize: 14, color: '#5a7a9a', marginBottom: 20 },
  retryBtn:    { padding: '11px 26px', border: '1px solid #1e2d45', borderRadius: 8, color: '#e8f0fe', fontSize: 14, cursor: 'pointer', background: 'transparent', marginRight: 10 },
  doneBtn:     { padding: '11px 26px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }
};

export default CaseRunner;
