// frontend/src/components/Dashboard/Dashboard.jsx
// COMPLETE — All features integrated, individual per student

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

// ── Import all section components ────────────────────────────
import CaseRunner    from '../Cases/CaseRunner';
import Notes         from '../Notes/Notes';
import BodyMap       from '../BodyMap/BodyMap';
import Quiz          from '../Quiz/Quiz';
import AIAssistant   from '../AI/AIAssistant';
import { NotificationBell } from '../Notes/Notes';

// ── Utility: per-student localStorage ────────────────────────
function sk(userId, key) { return 'cpa_' + userId + '_' + key; }
function load(userId, key, def) {
  try { const v = localStorage.getItem(sk(userId, key)); return v ? JSON.parse(v) : def; }
  catch { return def; }
}
function save(userId, key, val) {
  localStorage.setItem(sk(userId, key), JSON.stringify(val));
}

// ── Shared storage (all students see same data) ───────────────
function loadShared(key, def) {
  try { const v = localStorage.getItem('cpa_shared_' + key); return v ? JSON.parse(v) : def; }
  catch { return def; }
}
function saveShared(key, val) {
  localStorage.setItem('cpa_shared_' + key, JSON.stringify(val));
}

// ═══════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════
export default function Dashboard() {
  const { user, logout } = useAuth();
  const uid = user?._id || user?.email || 'guest';
  const [active, setActive] = useState('dashboard');

  // Per-student progress state
  const [progress, setProgress] = useState(() => load(uid, 'progress', {
    casesCompleted: 0, totalScore: 0, streak: 0, xpPoints: 0, lastActive: null
  }));

  // Update progress from cases
  function updateProgress(newProg) {
    const merged = { ...progress, ...newProg };
    setProgress(merged);
    save(uid, 'progress', merged);
  }

  // Streak logic
  useEffect(() => {
    const today = new Date().toDateString();
    const last  = progress.lastActive;
    if (last !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = last === yesterday ? (progress.streak || 0) + 1 : 1;
      updateProgress({ streak: newStreak, lastActive: today });
    }
  }, []);

  const sections = [
    { id: 'dashboard',    label: 'Dashboard',        icon: '🏠', group: 'main' },
    { id: 'cases',        label: 'Patient Cases',     icon: '🏥', group: 'practice' },
    { id: 'notes',        label: 'Smart Notes',       icon: '📚', group: 'practice' },
    { id: 'bodymap',      label: 'Body Explorer',     icon: '🧬', group: 'practice' },
    { id: 'quiz',         label: 'Mock Tests',        icon: '🎯', group: 'practice' },
    { id: 'pyq',          label: 'Prev Year Qs',      icon: '📄', group: 'practice' },
    { id: 'skills',       label: 'Clinical Skills',   icon: '🎥', group: 'practice' },
    { id: 'planner',      label: 'Study Planner',     icon: '📅', group: 'practice' },
    { id: 'discuss',      label: 'Discussion',        icon: '💬', group: 'community', badge: true },
    { id: 'leaderboard',  label: 'Leaderboard',       icon: '🏆', group: 'community' },
    { id: 'ai',           label: 'AI Assistant',      icon: '🤖', group: 'tools' },
    { id: 'progress',     label: 'My Progress',       icon: '📊', group: 'tools' },
    { id: 'notifications',label: 'Notifications',     icon: '🔔', group: 'tools', badge: true },
    { id: 'profile',      label: 'Profile',           icon: '⚙️', group: 'tools' },
  ];

  const groups = [
    { key: 'practice',  label: 'Practice' },
    { key: 'community', label: 'Community' },
    { key: 'tools',     label: 'Tools' },
  ];

  const name     = user?.name || 'PA Student';
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  function renderSection() {
    switch(active) {
      case 'cases':         return <CaseRunner uid={uid} onComplete={updateProgress} />;
      case 'notes':         return <Notes />;
      case 'bodymap':       return <BodyMap />;
      case 'quiz':          return <Quiz uid={uid} onComplete={updateProgress} />;
      case 'pyq':           return <PYQSection uid={uid} userName={name} userInitials={initials} />;
      case 'skills':        return <SkillsSection uid={uid} />;
      case 'planner':       return <PlannerSection uid={uid} />;
      case 'discuss':       return <DiscussSection uid={uid} userName={name} userInitials={initials} />;
      case 'leaderboard':   return <LeaderboardSection uid={uid} userName={name} progress={progress} />;
      case 'ai':            return <AIAssistant />;
      case 'progress':      return <ProgressSection uid={uid} progress={progress} />;
      case 'notifications': return <NotificationsSection uid={uid} />;
      case 'profile':       return <ProfileSection uid={uid} user={user} progress={progress} logout={logout} />;
      default:              return <DashboardHome uid={uid} user={user} progress={progress} onNav={setActive} />;
    }
  }

  return (
    <div style={S.app}>
      {/* ── SIDEBAR ── */}
      <nav style={S.sidebar}>
        <div style={S.sbLogo}>
          <div style={S.sbLogoIcon}>🩺</div>
          <span style={S.sbLogoText}>CliniqPA</span>
        </div>
        <div style={S.sbUser}>
          <div style={S.sbAv}>{initials}</div>
          <div>
            <div style={S.sbName}>{name.split(' ')[0]}</div>
            <div style={S.sbRole}>Year 2 · PA-S</div>
          </div>
        </div>

        <div style={S.sbNav}>
          {/* Dashboard first */}
          <div style={Object.assign({}, S.ni, active === 'dashboard' ? S.niActive : {})}
            onClick={() => setActive('dashboard')}>
            <span style={S.niIcon}>🏠</span> Dashboard
          </div>

          {groups.map(g => (
            <div key={g.key}>
              <div style={S.navGrpTitle}>{g.label}</div>
              {sections.filter(s => s.group === g.key).map(s => (
                <div key={s.id} style={Object.assign({}, S.ni, active === s.id ? S.niActive : {})}
                  onClick={() => setActive(s.id)}>
                  <span style={S.niIcon}>{s.icon}</span>
                  {s.label}
                  {s.badge && <span style={S.niBadge}>●</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={S.sbBottom}>
          <div style={S.streakBox}>
            <div style={{ fontSize: 22 }}>🔥</div>
            <div style={S.streakVal}>{progress.streak || 0}</div>
            <div style={S.streakLbl}>Day Streak</div>
          </div>
          <button style={S.logoutBtn} onClick={logout}>← Logout</button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main style={S.main}>
        {renderSection()}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD HOME
// ═══════════════════════════════════════════════════════════
function DashboardHome({ uid, user, progress, onNav }) {
  const tips = [
    'In STEMI, door-to-balloon time must be <90 minutes — TIME = MUSCLE!',
    'DKA: Always give IV fluids FIRST before insulin to prevent fatal hypokalemia.',
    'CURB-65 score ≥3 in pneumonia = severe, consider ICU.',
    'Stroke: Check blood glucose first — hypoglycemia mimics stroke!',
    'qSOFA ≥2 = high sepsis risk: RR≥22, AMS, SBP≤100.',
    'Appendicitis: McBurney\'s point = 2/3 from umbilicus to right ASIS.',
    'Inferior STEMI: ALWAYS check V4R for RV infarction before giving nitrates!',
    'In DKA, do NOT start insulin if K+ <3.5 mmol/L — replace potassium first.',
  ];
  const todayTip = tips[new Date().getDate() % tips.length];
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const firstName = user?.name?.split(' ')[0] || 'PA Student';

  const stats = [
    { icon: '🏥', val: progress.casesCompleted || 0, label: 'Cases Done',   pct: Math.min((progress.casesCompleted || 0) * 20, 100), color: '#00d4ff' },
    { icon: '🎯', val: (progress.totalScore || 0) + '%', label: 'Accuracy', pct: progress.totalScore || 0, color: '#00ff9d' },
    { icon: '🔥', val: progress.streak || 0, label: 'Day Streak',           pct: Math.min((progress.streak || 0) * 10, 100), color: '#ffd93d' },
    { icon: '⭐', val: progress.xpPoints || 0, label: 'XP Points',          pct: Math.min((progress.xpPoints || 0) / 10, 100), color: '#f59e0b' },
  ];

  const quickNav = [
    { id: 'cases',   icon: '🏥', label: 'Patient Cases',   desc: 'Start simulation' },
    { id: 'notes',   icon: '📚', label: 'Smart Notes',     desc: 'Study notes' },
    { id: 'quiz',    icon: '🎯', label: 'Mock Test',       desc: 'Test yourself' },
    { id: 'bodymap', icon: '🧬', label: 'Body Explorer',   desc: '3D anatomy' },
    { id: 'ai',      icon: '🤖', label: 'AI Assistant',    desc: 'Ask anything' },
    { id: 'discuss', icon: '💬', label: 'Discussion',      desc: 'Community' },
  ];

  return (
    <div style={DS.page}>
      {/* Welcome */}
      <div style={DS.welcome}>
        <div style={DS.welcomeLeft}>
          <div style={DS.greet}>{greet} 👋</div>
          <h1 style={DS.welcomeName}>Welcome back, <span style={{ color: '#00d4ff' }}>{firstName}</span>!</h1>
          <p style={DS.welcomeQuote}>"Every patient is a story. Your job is to listen carefully."</p>
          <div style={DS.tipBadge}>💡 {todayTip}</div>
        </div>
        <div style={DS.welcomeStats}>
          <div style={DS.miniStat}><span style={{ fontSize: 24 }}>🏥</span><div style={{ fontSize: 22, fontWeight: 800 }}>{progress.casesCompleted || 0}</div><div style={DS.miniLbl}>Cases</div></div>
          <div style={DS.miniStat}><span style={{ fontSize: 24 }}>⭐</span><div style={{ fontSize: 22, fontWeight: 800 }}>{progress.xpPoints || 0}</div><div style={DS.miniLbl}>XP</div></div>
          <div style={DS.miniStat}><span style={{ fontSize: 24 }}>🔥</span><div style={{ fontSize: 22, fontWeight: 800 }}>{progress.streak || 0}</div><div style={DS.miniLbl}>Streak</div></div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={DS.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} style={DS.statCard}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{s.val}</div>
            <div style={DS.statLbl}>{s.label}</div>
            <div style={DS.progTrack}><div style={{ ...DS.progFill, width: s.pct + '%', background: s.color }} /></div>
          </div>
        ))}
      </div>

      {/* Quick navigation */}
      <div style={DS.sectionHdr}>
        <span style={DS.sectionTitle}>🚀 Quick Access</span>
      </div>
      <div style={DS.quickGrid}>
        {quickNav.map(n => (
          <div key={n.id} style={DS.quickCard} onClick={() => onNav(n.id)}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>{n.icon}</div>
            <div style={DS.quickName}>{n.label}</div>
            <div style={DS.quickDesc}>{n.desc}</div>
          </div>
        ))}
      </div>

      {/* Today's tip */}
      <div style={DS.fullTipCard}>
        <div style={DS.tipHdr}>
          <span style={{ fontSize: 20 }}>💡</span>
          <span style={DS.tipTitle}>Today's Clinical Tip</span>
          <span style={DS.tipDate}>Day #{new Date().getDate()}</span>
        </div>
        <div style={DS.tipText}>{todayTip}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STUDY PLANNER — Individual per student
// ═══════════════════════════════════════════════════════════
function PlannerSection({ uid }) {
  const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date().getDay(); // 0=Sun, 1=Mon...
  const todayIdx = today === 0 ? 6 : today - 1; // Convert to Mon=0

  const [tasks, setTasks] = useState(() => load(uid, 'planner_tasks', {
    0: [{ id: 1, text: 'Cardiology Notes', color: '#00d4ff', done: false }],
    1: [{ id: 2, text: 'Fever Case', color: '#ff6b6b', done: false }],
    2: [{ id: 3, text: 'Pneumonia', color: '#3b82f6', done: false }],
    3: [{ id: 4, text: 'Surgery Review', color: '#10b981', done: false }],
    4: [{ id: 5, text: 'Chest Pain Case', color: '#ffd93d', done: false }],
    5: [{ id: 6, text: 'Abdomen Case', color: '#f59e0b', done: false }],
    6: [{ id: 7, text: 'Full Mock Test', color: '#8b5cf6', done: false }],
  }));

  const [addingDay, setAddingDay] = useState(null);
  const [newTask, setNewTask]     = useState('');
  const [goals, setGoals]         = useState(() => load(uid, 'planner_goals', [
    { text: 'Complete 2 Patient Cases', done: false, total: 2 },
    { text: 'Study 5 Clinical Notes',   done: false, total: 5 },
    { text: 'Take 1 Mock Test',         done: false, total: 1 },
    { text: 'Review 10 PYQs',           done: false, total: 10 },
  ]));

  function toggleTask(dayIdx, taskId) {
    const updated = { ...tasks };
    updated[dayIdx] = updated[dayIdx].map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    setTasks(updated);
    save(uid, 'planner_tasks', updated);
  }

  function addTask(dayIdx) {
    if (!newTask.trim()) return;
    const colors = ['#00d4ff','#ff6b6b','#00ff9d','#ffd93d','#8b5cf6','#f59e0b'];
    const updated = { ...tasks };
    const id = Date.now();
    updated[dayIdx] = [...(updated[dayIdx] || []), {
      id, text: newTask.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      done: false
    }];
    setTasks(updated);
    save(uid, 'planner_tasks', updated);
    setNewTask('');
    setAddingDay(null);
  }

  function deleteTask(dayIdx, taskId) {
    const updated = { ...tasks };
    updated[dayIdx] = updated[dayIdx].filter(t => t.id !== taskId);
    setTasks(updated);
    save(uid, 'planner_tasks', updated);
  }

  const totalTasks = Object.values(tasks).flat().length;
  const doneTasks  = Object.values(tasks).flat().filter(t => t.done).length;

  return (
    <div style={P.page}>
      <div style={P.hdr}>
        <div>
          <h1 style={P.title}>📅 Study Planner</h1>
          <p style={P.sub}>Your personal daily plan · Track progress · Stay consistent</p>
        </div>
        <div style={P.weekSummary}>
          <div style={P.wsBig}>{doneTasks}/{totalTasks}</div>
          <div style={P.wsLbl}>Tasks this week</div>
          <div style={P.wsBar}><div style={{ ...P.wsFill, width: totalTasks ? (doneTasks/totalTasks*100)+'%' : '0%' }} /></div>
        </div>
      </div>

      {/* Week grid */}
      <div style={P.grid}>
        {DAYS.map((day, i) => (
          <div key={i} style={Object.assign({}, P.dayCol, i === todayIdx ? P.dayColToday : {})}>
            <div style={Object.assign({}, P.dayHdr, i === todayIdx ? P.dayHdrToday : {})}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{day}</div>
              {i === todayIdx && <div style={P.todayDot}>TODAY</div>}
            </div>
            <div style={P.dayBody}>
              {(tasks[i] || []).map(task => (
                <div key={task.id} style={Object.assign({}, P.taskItem, { background: task.color + '22', borderColor: task.color + '55' })}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" checked={task.done} onChange={() => toggleTask(i, task.id)}
                      style={{ width: 13, height: 13, accentColor: task.color }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: task.color, flex: 1, textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 }}>
                      {task.text}
                    </span>
                    <button onClick={() => deleteTask(i, task.id)} style={{ background: 'none', border: 'none', color: '#5a7a9a', fontSize: 12, cursor: 'pointer', padding: 0 }}>×</button>
                  </div>
                </div>
              ))}

              {addingDay === i ? (
                <div style={{ marginTop: 4 }}>
                  <input style={P.addInput} placeholder="Task name..." value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addTask(i); if (e.key === 'Escape') setAddingDay(null); }}
                    autoFocus />
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    <button style={P.addConfirmBtn} onClick={() => addTask(i)}>✓</button>
                    <button style={P.addCancelBtn} onClick={() => setAddingDay(null)}>✕</button>
                  </div>
                </div>
              ) : (
                <button style={P.addBtn} onClick={() => setAddingDay(i)}>+ Add</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Goals */}
      <div style={P.goalsCard}>
        <div style={P.goalsTitle}>📈 Weekly Goals</div>
        {goals.map((g, i) => (
          <div key={i} style={P.goalRow}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13 }}>
                <input type="checkbox" checked={g.done} onChange={() => {
                  const u = goals.map((x, j) => j === i ? { ...x, done: !x.done } : x);
                  setGoals(u); save(uid, 'planner_goals', u);
                }} style={{ marginRight: 8, accentColor: '#00d4ff' }} />
                {g.text}
              </span>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#00d4ff' }}>
                {g.done ? g.total : '—'}/{g.total}
              </span>
            </div>
            <div style={P.goalTrack}><div style={{ ...P.goalFill, width: g.done ? '100%' : '0%' }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PYQ — File + Image sharing between students
// ═══════════════════════════════════════════════════════════
function PYQSection({ uid, userName, userInitials }) {
  const BUILTIN_PYQ = [
    { year: 2024, topic: 'Cardiology',    tags: ['STEMI','PCI'],         q: 'A 55-year-old man presents with 30-min chest pain, ST elevation in V1-V4. Most appropriate immediate management?', a: '12-lead ECG → Aspirin 300mg → Activate cath lab for primary PCI. Door-to-balloon <90 min. MONA protocol while waiting.', author: 'Faculty', type: 'text' },
    { year: 2024, topic: 'Pulmonology',   tags: ['CAP','CURB-65'],       q: 'CURB-65 score of 3 in a CAP patient indicates what level of care?', a: 'Score 3-5 = severe CAP → hospital/ICU admission. IV beta-lactam + macrolide combination. Consider ICU if score ≥4.', author: 'Faculty', type: 'text' },
    { year: 2023, topic: 'Surgery',       tags: ['Appendicitis','Signs'],q: "Classic triad of acute appendicitis? McBurney's point location?", a: "Triad: RLQ pain + fever + leukocytosis. McBurney's point = 2/3 from umbilicus to right ASIS.", author: 'Faculty', type: 'text' },
    { year: 2023, topic: 'Endocrinology', tags: ['DKA','HHS'],           q: 'Difference between DKA and Hyperosmolar Hyperglycemic State (HHS)?', a: 'DKA: T1DM, glucose 250-600, ketones +++, pH <7.3. HHS: T2DM, glucose >600, minimal ketones, hyperosmolarity >320, pH normal. Both: IV fluids FIRST.', author: 'Faculty', type: 'text' },
    { year: 2022, topic: 'Neurology',     tags: ['Stroke','tPA'],        q: 'tPA in ischemic stroke: time window, contraindications, BP threshold?', a: 'Window: 3-4.5 hours from onset. BP must be <185/110 before giving. Contraindications: hemorrhagic stroke, recent major surgery, active bleeding, INR>1.7.', author: 'Faculty', type: 'text' },
    { year: 2022, topic: 'Cardiology',    tags: ['MONA','ACS'],          q: 'Name the 5 components of the MONA protocol for ACS management.', a: 'M-Morphine (2-4mg IV). O-Oxygen (only if SpO2 <94%). N-Nitrates (SL GTN). A-Aspirin (325mg stat). Also add P2Y12 inhibitor.', author: 'Faculty', type: 'text' },
    { year: 2021, topic: 'Sepsis',        tags: ['Bundle','Vasopressors'],q: 'Surviving Sepsis Hour-1 bundle — 5 components?', a: '(1) Lactate (2) Blood cultures x2 before ABx (3) Broad-spectrum ABx within 1h (4) 30mL/kg crystalloid (5) Vasopressors (norepinephrine) if MAP<65.', author: 'Faculty', type: 'text' },
    { year: 2021, topic: 'Pulmonology',   tags: ['CAP','Organisms'],     q: 'Most common cause of CAP in healthy adults under 40?', a: 'Mycoplasma pneumoniae (atypical). Gradual onset, dry cough, low-grade fever. Treat with macrolide or doxycycline.', author: 'Faculty', type: 'text' },
  ];

  const [sharedFiles, setSharedFiles] = useState(() => loadShared('pyq_files', []));
  const [filter, setFilter]   = useState('All');
  const [yearFilter, setYear] = useState('All');
  const [openAns, setOpenAns] = useState({});
  const fileRef = useRef(null);

  const topics  = ['All', ...new Set(BUILTIN_PYQ.map(q => q.topic))];
  const years   = ['All', ...new Set(BUILTIN_PYQ.map(q => q.year).sort((a,b) => b-a))];

  function handleUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      const isImg  = file.type.startsWith('image/');
      reader.onload = ev => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: isImg ? 'image' : 'file',
          data: ev.target.result,
          uploadedBy: userName,
          uploadedAt: new Date().toLocaleDateString(),
          uid: uid,
          likes: [],
          comments: [],
        };
        const updated = [newFile, ...sharedFiles];
        setSharedFiles(updated);
        saveShared('pyq_files', updated);
      };
      if (isImg) reader.readAsDataURL(file);
      else reader.readAsText(file);
    });
    e.target.value = '';
  }

  function toggleLike(fileId) {
    const updated = sharedFiles.map(f => {
      if (f.id !== fileId) return f;
      const likes = f.likes || [];
      const hasLiked = likes.includes(uid);
      return { ...f, likes: hasLiked ? likes.filter(l => l !== uid) : [...likes, uid] };
    });
    setSharedFiles(updated);
    saveShared('pyq_files', updated);
  }

  const filteredQ = BUILTIN_PYQ.filter(q =>
    (filter === 'All' || q.topic === filter) &&
    (yearFilter === 'All' || q.year == yearFilter)
  );

  return (
    <div style={Q.page}>
      <div style={Q.hdr}>
        <div><h1 style={Q.title}>📄 Previous Year Questions</h1><p style={Q.sub}>Topic-wise & Year-wise · Share files & images with classmates</p></div>
        <button style={Q.uploadBtn} onClick={() => fileRef.current?.click()}>
          📎 Share File / Image
        </button>
        <input ref={fileRef} type="file" accept="image/*,.pdf,.txt,.doc,.docx" multiple style={{ display: 'none' }} onChange={handleUpload} />
      </div>

      {/* Shared files section */}
      {sharedFiles.length > 0 && (
        <div style={Q.sharedSection}>
          <div style={Q.sharedTitle}>📁 Shared by Students ({sharedFiles.length})</div>
          <div style={Q.sharedGrid}>
            {sharedFiles.map(f => (
              <div key={f.id} style={Q.sharedCard}>
                {f.type === 'image' ? (
                  <img src={f.data} alt={f.name} style={Q.sharedImg} />
                ) : (
                  <div style={Q.sharedFileIcon}>
                    <span style={{ fontSize: 32 }}>📄</span>
                    <div style={{ fontSize: 11, color: '#5a7a9a', marginTop: 4, wordBreak: 'break-word' }}>{f.name}</div>
                  </div>
                )}
                <div style={Q.sharedCardFooter}>
                  <div style={{ fontSize: 11, color: '#5a7a9a' }}>By {f.uploadedBy} · {f.uploadedAt}</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                    <button style={Q.likeBtn} onClick={() => toggleLike(f.id)}>
                      {(f.likes || []).includes(uid) ? '❤️' : '🤍'} {(f.likes || []).length}
                    </button>
                    {f.type !== 'image' && (
                      <a href={f.data} download={f.name} style={Q.downloadBtn}>⬇ Download</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={Q.filters}>
        {topics.map(t => <button key={t} style={Object.assign({}, Q.filterBtn, filter === t ? Q.filterActive : {})} onClick={() => setFilter(t)}>{t}</button>)}
      </div>
      <div style={Q.filters}>
        {years.map(y => <button key={y} style={Object.assign({}, Q.filterBtn, yearFilter == y ? Q.filterActive : {})} onClick={() => setYear(y)}>{y}</button>)}
      </div>

      {/* Questions */}
      {filteredQ.map((q, i) => (
        <div key={i} style={Q.qCard}>
          <div style={Q.qMeta}>
            <span style={Q.qYear}>{q.year}</span>
            <span style={Q.qTopic}>{q.topic}</span>
            {q.tags.map(t => <span key={t} style={Q.qTag}>{t}</span>)}
          </div>
          <div style={Q.qText}>Q: {q.q}</div>
          <button style={Q.ansBtn} onClick={() => setOpenAns(p => ({ ...p, [i]: !p[i] }))}>
            {openAns[i] ? 'Hide Answer ▲' : 'Show Answer ▼'}
          </button>
          {openAns[i] && <div style={Q.ansBox}>✅ {q.a}</div>}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CLINICAL SKILLS — Expanded
// ═══════════════════════════════════════════════════════════
const ALL_SKILLS = [
  { id: 'bp',      icon: '🩺', name: 'BP Measurement',         desc: 'Auscultatory method — gold standard for clinical BP assessment.', steps: 6, category: 'Cardiovascular' },
  { id: 'iv',      icon: '💉', name: 'IV Line Insertion',       desc: 'Peripheral IV cannulation — essential for fluids and medications.', steps: 8, category: 'Vascular Access' },
  { id: 'im',      icon: '🪡', name: 'IM Injection',            desc: 'Intramuscular injection — deltoid, vastus lateralis, ventrogluteal.', steps: 7, category: 'Injection' },
  { id: 'ecg',     icon: '📈', name: 'ECG Recording',           desc: '12-lead ECG placement and basic interpretation for PA students.', steps: 6, category: 'Cardiovascular' },
  { id: 'wound',   icon: '🩹', name: 'Wound Suturing',          desc: 'Simple interrupted suture technique for laceration repair.', steps: 9, category: 'Surgical' },
  { id: 'foley',   icon: '🫀', name: 'Foley Catheter',          desc: 'Urinary catheterization — male and female technique.', steps: 7, category: 'Urology' },
  { id: 'sc',      icon: '💊', name: 'SC Injection',            desc: 'Subcutaneous injection — insulin, LMWH, vaccines.', steps: 6, category: 'Injection' },
  { id: 'nasogastric', icon: '🟡', name: 'NG Tube Insertion',   desc: 'Nasogastric tube placement — feeding and gastric decompression.', steps: 8, category: 'Gastrointestinal' },
  { id: 'abg',     icon: '🩸', name: 'Arterial Blood Gas',      desc: 'Radial artery puncture for ABG sampling — technique and interpretation.', steps: 7, category: 'Respiratory' },
  { id: 'cpr',     icon: '❤️', name: 'Basic Life Support',      desc: 'CPR, AED use, and BLS algorithm — every PA must know this.', steps: 10, category: 'Emergency' },
  { id: 'chest_drain', icon: '🫁', name: 'Chest Drain',         desc: 'Intercostal chest drain — pneumothorax and pleural effusion.', steps: 9, category: 'Thoracic' },
  { id: 'lumbar',  icon: '🦴', name: 'Lumbar Puncture',         desc: 'LP technique — CSF collection for meningitis diagnosis.', steps: 8, category: 'Neurology' },
];

const SKILL_STEPS_DATA = {
  bp: [
    { t: 'Patient Preparation', d: 'Seat patient comfortably, arm at heart level, back supported. Rest 5 min. No caffeine, smoking or exercise in prior 30 min.', n: 'Right arm preferred for standard readings.' },
    { t: 'Cuff Selection', d: 'Bladder should encircle 80% of arm. Too small = falsely HIGH. Too large = falsely LOW. Use appropriate size.', n: 'Pediatric, regular, large adult, thigh cuffs available.' },
    { t: 'Cuff Placement', d: 'Place cuff 2-3 cm above antecubital fossa. Align artery marker over brachial artery. Snug but 1 finger fits under.', n: '' },
    { t: 'Palpatory Estimation', d: 'Inflate to 70mmHg, then 10mmHg increments palpating radial. Note pressure when pulse disappears = estimated SBP. Prevents auscultatory gap.', n: 'This step prevents missing auscultatory gap.' },
    { t: 'Auscultatory Measurement', d: 'Place stethoscope BELL (not diaphragm) over brachial artery. Inflate 20-30mmHg above palpated SBP. Deflate at 2-3mmHg/sec. Record: SBP = Korotkoff I (first sound), DBP = Korotkoff V (silence).', n: 'Korotkoff sounds: I-tapping, II-whooshing, III-crisp, IV-muffled, V-silence.' },
    { t: 'Recording', d: 'Record both arms on first visit. Repeat after 1-2 min. Average two readings. Document: position (sitting/standing), arm used, cuff size, time.', n: 'Orthostatic hypotension: drop >20 SBP or >10 DBP on standing.' },
  ],
  iv: [
    { t: 'Gather Equipment', d: 'IV cannula (18G green for adults, 20G pink for general), tourniquet, alcohol swab, tegaderm dressing, 10mL flush syringe, extension set.', n: '' },
    { t: 'Select Site', d: 'Antecubital fossa for emergency. Routine: cephalic vein, basilic, or dorsal hand. Avoid bruised, infected, or post-mastectomy arm.', n: 'Warm patient to dilate veins if difficult access.' },
    { t: 'Apply Tourniquet', d: 'Apply 10cm above intended site. Patient makes fist. Palpate for best vein — bouncy, straight, not rolling.', n: 'Do NOT leave tourniquet >2 minutes.' },
    { t: 'Skin Preparation', d: 'Clean with 70% alcohol in circular motion. Allow 30 seconds to dry completely. Do NOT re-palpate after cleaning.', n: '' },
    { t: 'Needle Insertion', d: 'Bevel UP, 10-30° angle. Advance through skin. Watch for flashback (blood in chamber). Lower angle, advance 2-3mm. Advance cannula while withdrawing needle.', n: 'NEVER recap needle — use sharps bin immediately.' },
    { t: 'Secure Cannula', d: 'Release tourniquet. Pressure proximal to tip. Remove needle fully. Attach extension set or cap. Flush 5-10mL NS — check resistance and swelling.', n: '' },
    { t: 'Dress Site', d: 'Apply tegaderm over cannula. Label with: date, time, initials, gauge.', n: '' },
    { t: 'Documentation', d: 'Document: date, time, site, gauge, attempts, who performed, patient tolerance.', n: 'Change IV sites every 72-96 hours per protocol.' },
  ],
  cpr: [
    { t: 'Scene Safety', d: 'Ensure scene is safe. Don PPE if available. Approach patient only when safe.', n: 'Your safety FIRST.' },
    { t: 'Check Responsiveness', d: 'Tap shoulders and shout "Are you OK?" Look for breathing — no more than 10 seconds. If unresponsive + not breathing normally → cardiac arrest.', n: 'Agonal breathing (gasping) = treat as cardiac arrest.' },
    { t: 'Call for Help', d: 'Shout for help. Get someone to call 108/999. Send someone for AED. Do NOT leave patient alone if possible.', n: '' },
    { t: 'Chest Compressions', d: 'Place heel of hand on lower half of sternum. Lock hands. Arms straight. Compress 5-6cm depth. Rate 100-120/min. Allow full recoil.', n: '"Staying Alive" tempo = 103 BPM — perfect rate!' },
    { t: 'Open Airway', d: 'Head-tilt chin-lift. Look-listen-feel for breathing. If suspected cervical injury: jaw thrust only.', n: '' },
    { t: 'Rescue Breaths', d: 'Pinch nose. Seal over mouth. Give 2 breaths over 1 second each. See chest rise. 30 compressions : 2 breaths ratio.', n: 'If not trained: compression-only CPR is acceptable.' },
    { t: 'AED Arrival', d: 'Power on AED. Attach pads as shown (right sub-clavicular, left lateral chest wall). Stop CPR for rhythm analysis.', n: 'Continue CPR until AED fully charged.' },
    { t: 'Shock Delivery', d: 'If advised: ensure everyone clear ("Stand clear!"). Press shock button. Immediately resume CPR for 2 minutes.', n: '' },
    { t: 'Post-ROSC Care', d: 'Once ROSC: Recovery position if breathing normally. Continue monitoring. Target SpO2 94-98%, SBP >100. Identify and treat cause (4Hs and 4Ts).', n: '4Hs: Hypoxia, Hypovolemia, Hypo/Hyperkalemia, Hypothermia. 4Ts: Tension pneumothorax, Tamponade, Toxins, Thromboembolism.' },
    { t: 'Post-Resuscitation', d: 'Targeted temperature management (32-36°C) for comatose survivors. Transfer to ICU/cath lab. PCI if STEMI pattern on ECG post-ROSC.', n: '' },
  ],
  abg: [
    { t: 'Indication & Consent', d: 'Indications: respiratory failure, acid-base disturbance, monitoring ventilation. Explain procedure, obtain consent. Allen\'s test to confirm ulnar collateral flow.', n: 'Allen\'s test: compress both radial and ulnar arteries, patient opens fist — release ulnar artery, hand should flush pink within 5-7 seconds.' },
    { t: 'Equipment', d: 'Pre-heparinised ABG syringe, alcohol swab, gauze, gloves.', n: '' },
    { t: 'Position', d: 'Wrist hyperextended 45° over rolled towel. Patient comfortable.', n: '' },
    { t: 'Site Identification', d: 'Palpate radial artery 2-3cm proximal to wrist crease, just lateral to flexor carpi radialis tendon.', n: '' },
    { t: 'Arterial Puncture', d: 'Clean site. Insert needle at 30-45° angle, bevel up. Pulsatile blood = arterial (bright red, fills syringe spontaneously). Collect 1-2mL.', n: 'If venous (dark, non-pulsatile) — withdraw and re-attempt.' },
    { t: 'Post-procedure', d: 'Remove needle. Apply firm pressure for minimum 5 minutes (longer if anticoagulated). Expel air bubbles immediately. Cap syringe.', n: 'Analyse within 15-30 minutes or keep on ice.' },
    { t: 'Interpretation', d: 'Normal: pH 7.35-7.45, PaO2 10-13 kPa, PaCO2 4.7-6.0 kPa, HCO3 22-28, BE ±2. Step-by-step: (1) pH, (2) CO2, (3) HCO3, (4) Compensation, (5) Oxygenation.', n: 'ROME: Respiratory Opposite (pH up, CO2 down), Metabolic Equal (pH up, HCO3 up).' },
  ],
};

function SkillsSection({ uid }) {
  const [view,         setView]         = useState('grid'); // grid | detail
  const [activeSkill,  setActiveSkill]  = useState(null);
  const [filterCat,    setFilterCat]    = useState('All');
  const [completed,    setCompleted]    = useState(() => load(uid, 'skills_completed', []));

  const cats = ['All', ...new Set(ALL_SKILLS.map(s => s.category))];
  const filtered = ALL_SKILLS.filter(s => filterCat === 'All' || s.category === filterCat);

  function markDone(id) {
    const updated = completed.includes(id) ? completed.filter(c => c !== id) : [...completed, id];
    setCompleted(updated);
    save(uid, 'skills_completed', updated);
  }

  if (view === 'detail' && activeSkill) {
    const steps = SKILL_STEPS_DATA[activeSkill.id] || [];
    return (
      <div style={SK.page}>
        <button style={SK.backBtn} onClick={() => setView('grid')}>← Back to Skills</button>
        <div style={SK.detailHdr}>
          <div style={{ fontSize: 48 }}>{activeSkill.icon}</div>
          <div>
            <h1 style={SK.detailTitle}>{activeSkill.name}</h1>
            <p style={SK.detailSub}>{activeSkill.desc}</p>
            <span style={SK.catBadge}>{activeSkill.category}</span>
          </div>
          <button style={Object.assign({}, SK.doneBtn, completed.includes(activeSkill.id) ? SK.doneBtnActive : {})}
            onClick={() => markDone(activeSkill.id)}>
            {completed.includes(activeSkill.id) ? '✅ Completed' : 'Mark Complete'}
          </button>
        </div>

        {steps.length > 0 ? (
          steps.map((s, i) => (
            <div key={i} style={SK.stepCard}>
              <div style={SK.stepNum}>{i + 1}</div>
              <div style={SK.stepContent}>
                <div style={SK.stepTitle}>{s.t}</div>
                <div style={SK.stepDesc}>{s.d}</div>
                {s.n && <div style={SK.stepNote}>📌 {s.n}</div>}
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: '#5a7a9a', textAlign: 'center', padding: '40px 0', fontSize: 14 }}>
            Detailed steps for this skill coming soon!
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={SK.page}>
      <div style={SK.hdr}>
        <div><h1 style={SK.title}>🎥 Clinical Skills</h1><p style={SK.sub}>Step-by-step procedures · {completed.length}/{ALL_SKILLS.length} completed</p></div>
        <div style={{ fontSize: 13, color: '#00ff9d' }}>{completed.length}/{ALL_SKILLS.length} Done</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {cats.map(c => (
          <button key={c} style={Object.assign({}, SK.filterBtn, filterCat === c ? SK.filterActive : {})} onClick={() => setFilterCat(c)}>{c}</button>
        ))}
      </div>
      <div style={SK.grid}>
        {filtered.map(skill => (
          <div key={skill.id} style={SK.skillCard} onClick={() => { setActiveSkill(skill); setView('detail'); }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ fontSize: 36 }}>{skill.icon}</div>
              {completed.includes(skill.id) && <span style={{ fontSize: 18 }}>✅</span>}
            </div>
            <div style={SK.skillName}>{skill.name}</div>
            <div style={SK.skillDesc}>{skill.desc}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span style={SK.catBadge2}>{skill.category}</span>
              <span style={{ fontSize: 12, color: '#00d4ff', fontFamily: 'monospace' }}>{skill.steps} steps</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DISCUSSION — Shared between all students
// ═══════════════════════════════════════════════════════════
function DiscussSection({ uid, userName, userInitials }) {
  const [posts, setPosts]   = useState(() => loadShared('discussion_posts', []));
  const [input,      setInput]      = useState('');
  const [topic,      setTopic]      = useState('General');
  const [replyId,    setReplyId]    = useState(null);
  const [replyText,  setReplyText]  = useState('');
  const [openReplies, setOpenReplies] = useState({});
  const fileRef = useRef(null);
  const [attachment, setAttachment] = useState(null);

  const TOPICS = ['General','Cardiology','Respiratory','Neurology','Surgery','Endocrinology','Emergency'];
  const AV_COLORS = ['#00d4ff','#00ff9d','#ffd93d','#ff6b6b','#8b5cf6','#f59e0b','#e879f9'];
  const myColor   = AV_COLORS[uid.charCodeAt(0) % AV_COLORS.length];

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    const isImg  = file.type.startsWith('image/');
    reader.onload = ev => setAttachment({ name: file.name, data: ev.target.result, type: isImg ? 'image' : 'file' });
    if (isImg) reader.readAsDataURL(file);
    else reader.readAsText(file);
    e.target.value = '';
  }

  function postMessage() {
    if (!input.trim() && !attachment) return;
    const newPost = {
      id: Date.now(),
      uid, name: userName, initials: userInitials,
      color: myColor,
      time: 'Just now',
      text: input.trim(),
      topic,
      attachment: attachment || null,
      likes: [],
      replies: [],
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    saveShared('discussion_posts', updated);
    setInput('');
    setAttachment(null);
  }

  function toggleLike(postId) {
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      const likes   = p.likes || [];
      const hasLiked = likes.includes(uid);
      return { ...p, likes: hasLiked ? likes.filter(l => l !== uid) : [...likes, uid] };
    });
    setPosts(updated);
    saveShared('discussion_posts', updated);
  }

  function postReply(postId) {
    if (!replyText.trim()) return;
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      return { ...p, replies: [...(p.replies || []), { id: Date.now(), uid, name: userName, initials: userInitials, color: myColor, text: replyText, time: 'Just now' }] };
    });
    setPosts(updated);
    saveShared('discussion_posts', updated);
    setReplyText('');
    setReplyId(null);
  }

  function deletePost(postId) {
    const updated = posts.filter(p => !(p.id === postId && p.uid === uid));
    setPosts(updated);
    saveShared('discussion_posts', updated);
  }

  return (
    <div style={D.page}>
      <div style={D.hdr}><h1 style={D.title}>💬 Discussion</h1><p style={D.sub}>Ask doubts · Share answers · Build community</p></div>

      {/* Compose */}
      <div style={D.compose}>
        <div style={D.composeTop}>
          <div style={{ ...D.av, background: myColor }}>{userInitials}</div>
          <div style={{ flex: 1 }}>
            <textarea style={D.textarea} placeholder="Ask a clinical question or share a tip..."
              value={input} onChange={e => setInput(e.target.value)} />
            {attachment && (
              <div style={D.attachPreview}>
                {attachment.type === 'image' ? <img src={attachment.data} alt="" style={{ height: 60, borderRadius: 6 }} /> : <span>📄 {attachment.name}</span>}
                <button style={D.removeAttach} onClick={() => setAttachment(null)}>✕</button>
              </div>
            )}
          </div>
        </div>
        <div style={D.composeBottom}>
          <select style={D.topicSelect} value={topic} onChange={e => setTopic(e.target.value)}>
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select>
          <button style={D.attachBtn} onClick={() => fileRef.current?.click()}>📎 Attach</button>
          <input ref={fileRef} type="file" accept="image/*,.pdf,.txt" style={{ display: 'none' }} onChange={handleFile} />
          <button style={D.postBtn} onClick={postMessage} disabled={!input.trim() && !attachment}>Post →</button>
        </div>
      </div>

      {/* Posts */}
      {posts.map(p => (
        <div key={p.id} style={D.post}>
          <div style={D.postHdr}>
            <div style={{ ...D.av, background: p.color }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={D.postName}>{p.name}</div>
              <div style={D.postTime}>{p.time}</div>
            </div>
            <span style={D.topicBadge}>{p.topic}</span>
            {p.uid === uid && <button style={D.deleteBtn} onClick={() => deletePost(p.id)}>🗑</button>}
          </div>
          {p.text && <div style={D.postText}>{p.text}</div>}
          {p.attachment && (
            <div style={{ marginBottom: 10 }}>
              {p.attachment.type === 'image' ? <img src={p.attachment.data} alt="" style={{ maxWidth: '100%', borderRadius: 8, maxHeight: 200 }} /> : <span style={{ fontSize: 13, color: '#00d4ff' }}>📄 {p.attachment.name}</span>}
            </div>
          )}
          <div style={D.postActions}>
            <button style={D.actionBtn} onClick={() => toggleLike(p.id)}>
              {(p.likes || []).includes(uid) ? '❤️' : '🤍'} {(p.likes || []).length}
            </button>
            <button style={D.actionBtn} onClick={() => setOpenReplies(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>
              💬 {(p.replies || []).length} replies
            </button>
            <button style={D.actionBtn} onClick={() => setReplyId(replyId === p.id ? null : p.id)}>↩ Reply</button>
          </div>

          {/* Replies */}
          {openReplies[p.id] && (p.replies || []).map(r => (
            <div key={r.id} style={D.replyItem}>
              <div style={{ ...D.avSm, background: r.color }}>{r.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{r.name} <span style={{ fontWeight: 400, color: '#5a7a9a' }}>· {r.time}</span></div>
                <div style={{ fontSize: 13, color: '#e8f0fe', marginTop: 2 }}>{r.text}</div>
              </div>
            </div>
          ))}

          {/* Reply input */}
          {replyId === p.id && (
            <div style={D.replyInput}>
              <div style={{ ...D.avSm, background: myColor }}>{userInitials}</div>
              <input style={D.replyField} placeholder="Write a reply..." value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') postReply(p.id); }} />
              <button style={D.replyPost} onClick={() => postReply(p.id)}>→</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LEADERBOARD SECTION — FIXED & OPTIMIZED
// ═══════════════════════════════════════════════════════════
function LeaderboardSection({ uid, userName, progress }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // 1. Load existing shared leaderboard or defaults
    const stored = loadShared('leaderboard', []);

    // 2. Prepare current user's entry
    const userEntry = { 
      uid, 
      name: userName || 'PA Student', 
      xp: progress?.xpPoints || 0, 
      acc: progress?.totalScore || 0, 
      streak: progress?.streak || 0, 
      cases: progress?.casesCompleted || 0 
    };

    // 3. Update if exists, otherwise add
    const existingIdx = stored.findIndex(s => s.uid === uid);
    let newBoard = [...stored];
    if (existingIdx >= 0) {
      newBoard[existingIdx] = userEntry;
    } else {
      newBoard.push(userEntry);
    }

    // 4. Sort by XP and save
    const sorted = newBoard.sort((a, b) => b.xp - a.xp);
    saveShared('leaderboard', sorted);
    setBoard(sorted);
  }, [uid, userName, progress]); // Re-run when progress updates

  const medals = ['🥇', '🥈', '🥉'];
  const podiumColors = ['#ffd700', '#c0c0c0', '#cd7f32'];
  const AV_COLORS = ['#00d4ff', '#00ff9d', '#ffd93d', '#ff6b6b', '#8b5cf6'];

  // Get Top 3 for Podium
  const top3 = board.slice(0, 3);
  // Reorder for Podium Display: [Rank 2, Rank 1, Rank 3]
  const displayPodium = [top3[1], top3[0], top3[2]];

  return (
    <div style={LB.page}>
      <div style={LB.hdr}>
        <h1 style={LB.title}>🏆 Leaderboard</h1>
        <p style={LB.sub}>Top PA students · Monthly ranking · Keep pushing!</p>
      </div>

      {/* Podium */}
      <div style={LB.podium}>
        {displayPodium.map((u, i) => {
          if (!u) return <div key={i} style={{ flex: 1 }} />;
          
          const realRank = i === 0 ? 1 : i === 1 ? 0 : 2; // Maps index back to rank (0, 1, 2)
          const heights = [90, 120, 70];
          const avColor = AV_COLORS[(u.uid || 'x').charCodeAt(0) % AV_COLORS.length];
          const initials = u.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

          return (
            <div key={u.uid} style={LB.podiumPlace}>
              <div style={LB.podiumInfo}>
                <div style={{ ...LB.podiumAv, background: avColor }}>{initials}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#e8f0fe' }}>{u.name.split(' ')[0]}</div>
                <div style={{ fontSize: 11, color: '#5a7a9a' }}>{u.xp} XP</div>
              </div>
              <div style={{ 
                ...LB.podiumBlock, 
                height: heights[i], 
                borderColor: podiumColors[realRank] + '44', 
                background: podiumColors[realRank] + '11',
                borderWidth: '1px 1px 0 1px',
                borderStyle: 'solid'
              }}>
                <div style={{ fontSize: 28 }}>{medals[realRank]}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: podiumColors[realRank] }}>{realRank + 1}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full List Table */}
      <div style={LB.table}>
        <div style={LB.tableHdr}>
          <span>Rank</span>
          <span>Student</span>
          <span>XP</span>
          <span>Accuracy</span>
          <span>Streak</span>
        </div>
        {board.map((u, i) => {
          const isMe = u.uid === uid;
          const avColor = AV_COLORS[(u.uid || 'x').charCodeAt(0) % AV_COLORS.length];
          const initials = u.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
          
          return (
            <div key={u.uid} style={{ ...LB.tableRow, ...(isMe ? LB.tableRowMe : {}) }}>
              <span style={{ fontFamily: 'monospace', color: i < 3 ? podiumColors[i] : '#5a7a9a', fontWeight: 700 }}>
                {i + 1}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ ...LB.avSm, background: avColor }}>{initials}</span>
                <span style={{ fontSize: 13, fontWeight: isMe ? 700 : 500 }}>
                  {u.name}{isMe ? ' (You)' : ''}
                </span>
              </span>
              <span style={{ fontFamily: 'monospace', color: '#ffd93d', fontWeight: 700 }}>{u.xp}</span>
              <span style={{ fontFamily: 'monospace', color: '#00ff9d' }}>{u.acc}%</span>
              <span>🔥 {u.streak}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROGRESS SECTION — REAL DATA TRACKING
// ═══════════════════════════════════════════════════════════
function ProgressSection({ uid, progress }) {
  // 1. Load Real Case History
  const caseHistory = load(uid, 'case_history', []);

  // 2. Calculate Subject Performance (Based on real scores or default baselines)
  const subjects = [
    { name: 'Cardiology',    pct: Math.min(Math.max(progress.totalScore || 0, 40) + (progress.casesCompleted || 0), 100), color: '#ff3333' },
    { name: 'Pulmonology',   pct: Math.min(Math.max(progress.totalScore || 0, 35) + (progress.casesCompleted || 0), 100), color: '#3b82f6' },
    { name: 'Surgery',       pct: Math.min(Math.max(progress.totalScore || 0, 30) + (progress.casesCompleted || 0), 100), color: '#f59e0b' },
    { name: 'Endocrinology', pct: Math.min(Math.max(progress.totalScore || 0, 45) + (progress.casesCompleted || 0), 100), color: '#10b981' },
    { name: 'Neurology',     pct: Math.min(Math.max(progress.totalScore || 0, 25) + (progress.casesCompleted || 0), 100), color: '#8b5cf6' },
    { name: 'Infectious Dis.',pct: Math.min(Math.max(progress.totalScore || 0, 38) + (progress.casesCompleted || 0), 100), color: '#e879f9' },
  ];

  // 3. Real Activity Heatmap Logic (Last 28 Days)
  const getHeatmapData = () => {
    const cells = Array(28).fill(0);
    const today = new Date();
    
    caseHistory.forEach(record => {
      const caseDate = new Date(record.completedAt);
      const diffTime = Math.abs(today - caseDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 28) {
        // Reverse index so last cell is today
        const index = 27 - diffDays;
        if (index >= 0) cells[index] += 1; 
      }
    });
    // Cap intensity at 4
    return cells.map(v => Math.min(v, 4));
  };

  const heatmapCells = getHeatmapData();
  const heatColors = ['#1e2d45', 'rgba(0,212,255,0.2)', 'rgba(0,212,255,0.45)', 'rgba(0,212,255,0.7)', 'rgba(0,212,255,0.95)'];

  return (
    <div style={PR.page}>
      <div style={PR.hdr}>
        <h1 style={PR.title}>📊 My Progress</h1>
        <p style={PR.sub}>Track your performance · Identify weak areas</p>
      </div>

      <div style={PR.grid}>
        {/* Subject performance */}
        <div style={PR.card}>
          <div style={PR.cardTitle}>Subject Performance</div>
          {subjects.map(s => (
            <div key={s.name} style={PR.subjRow}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13 }}>{s.name}</span>
                <span style={{ fontSize: 13, fontFamily: 'monospace', color: s.color }}>{s.pct}%</span>
              </div>
              <div style={PR.pTrack}>
                <div style={{ ...PR.pFill, width: s.pct + '%', background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Activity heatmap */}
        <div style={PR.card}>
          <div style={PR.cardTitle}>Activity Heatmap (Last 28 Days)</div>
          <div style={PR.heatGrid}>
            {heatmapCells.map((c, i) => (
              <div 
                key={i} 
                title={c > 0 ? `${c} cases completed` : 'No activity'} 
                style={{ ...PR.heatCell, background: heatColors[c] }} 
              />
            ))}
          </div>
          <div style={{ ...PR.sub, marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            Less 
            {heatColors.map((col, idx) => (
              <div key={idx} style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
            ))} 
            More
          </div>
        </div>

        {/* Overall stats */}
        <div style={PR.card}>
          <div style={PR.cardTitle}>Overall Statistics</div>
          {[
            { label: 'Cases Completed', val: progress.casesCompleted || 0, icon: '🏥' },
            { label: 'Average Score',   val: (progress.totalScore || 0) + '%', icon: '🎯' },
            { label: 'XP Points',       val: progress.xpPoints || 0, icon: '⭐' },
            { label: 'Day Streak',      val: progress.streak || 0, icon: '🔥' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#5a7a9a', textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'monospace', color: '#00d4ff' }}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Case history */}
        <div style={PR.card}>
          <div style={PR.cardTitle}>Recent Case History</div>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {caseHistory.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #1e2d45' }}>
                    <th style={{ ...PR.th, padding: '8px 4px' }}>Case</th>
                    <th style={{ ...PR.th, padding: '8px 4px' }}>Date</th>
                    <th style={{ ...PR.th, padding: '8px 4px' }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {[...caseHistory].reverse().slice(0, 10).map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #1e2d45' }}>
                      <td style={{ ...PR.td, padding: '10px 4px', fontSize: 12 }}>{r.caseTitle || `Case ${r.caseId}`}</td>
                      <td style={{ ...PR.td, padding: '10px 4px', fontSize: 11, color: '#5a7a9a' }}>
                        {r.completedAt ? new Date(r.completedAt).toLocaleDateString() : '—'}
                      </td>
                      <td style={{ ...PR.td, padding: '10px 4px', color: '#00ff9d', fontFamily: 'monospace', fontWeight: 700 }}>
                        {r.score}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ color: '#5a7a9a', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
                Complete patient cases to see history here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════
function NotificationsSection({ uid }) {
  const [notifs, setNotifs] = useState([
    { id: 1, icon: '🆕', title: 'New Case Unlocked', body: 'Diabetic Ketoacidosis case is now available!', time: '2h ago', read: false },
    { id: 2, icon: '🏆', title: 'Leaderboard Update', body: 'You moved up to rank #5 this week!', time: '5h ago', read: false },
    { id: 3, icon: '💡', title: 'Daily Clinical Tip', body: "Today's tip: FAST acronym for stroke recognition.", time: '8h ago', read: true },
    { id: 4, icon: '📝', title: 'Quiz Results', body: 'Your Cardiology mock test: 82% — Good effort!', time: '1d ago', read: true },
    { id: 5, icon: '💬', title: 'New Reply', body: 'Priya replied to your question about fever management.', time: '1d ago', read: true },
  ]);

  function markRead(id) {
    setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  }
  function markAllRead() {
    setNotifs(p => p.map(n => ({ ...n, read: true })));
  }

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div style={{ padding: '28px 32px', maxWidth: 700, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>🔔 Notifications</h1>
          <p style={{ color: '#5a7a9a', fontSize: 14 }}>{unread} unread</p>
        </div>
        {unread > 0 && <button style={{ padding: '8px 16px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', background: 'transparent', fontSize: 13, cursor: 'pointer' }} onClick={markAllRead}>Mark all read</button>}
      </div>
      {notifs.map(n => (
        <div key={n.id} style={{ display: 'flex', gap: 14, padding: '16px', border: '1px solid ' + (n.read ? '#1e2d45' : 'rgba(0,212,255,0.3)'), borderRadius: 12, marginBottom: 10, background: n.read ? 'transparent' : 'rgba(0,212,255,0.03)', cursor: 'pointer', borderLeft: n.read ? '' : '3px solid #00d4ff' }} onClick={() => markRead(n.id)}>
          <span style={{ fontSize: 28 }}>{n.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: '#5a7a9a', marginBottom: 5 }}>{n.body}</div>
            <div style={{ fontSize: 11, color: '#3a5a7a', fontFamily: 'monospace' }}>{n.time}</div>
          </div>
          {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0, marginTop: 6 }} />}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROFILE & SETTINGS — Individual per student
// ═══════════════════════════════════════════════════════════
function ProfileSection({ uid, user, progress, logout }) {
  const [editing,  setEditing]  = useState(false);
  const [name,     setName]     = useState(user?.name || 'PA Student');
  const [email,    setEmail]    = useState(user?.email || '');
  const [year,     setYear]     = useState(() => load(uid, 'profile_year', 'Year 2'));
  const [inst,     setInst]     = useState(() => load(uid, 'profile_inst', 'Medical University'));
  const [settings, setSettings] = useState(() => load(uid, 'profile_settings', { darkMode: true, reminder: true, sound: false }));

  function savePref() {
    save(uid, 'profile_year', year);
    save(uid, 'profile_inst', inst);
    setEditing(false);
  }
  function toggleSetting(key) {
    const u = { ...settings, [key]: !settings[key] };
    setSettings(u);
    save(uid, 'profile_settings', u);
  }

  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const AV_COLORS = ['#00d4ff','#00ff9d','#ffd93d','#ff6b6b','#8b5cf6'];
  const myColor   = AV_COLORS[uid.charCodeAt(0) % AV_COLORS.length];

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>⚙️ Profile & Settings</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, alignItems: 'start' }}>

        {/* Profile card */}
        <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: myColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#000', margin: '0 auto 14px', boxShadow: '0 0 20px ' + myColor + '44' }}>{initials}</div>
          {editing ? (
            <input style={{ width: '100%', padding: '8px 12px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 8, color: '#e8f0fe', fontSize: 16, fontWeight: 700, textAlign: 'center', marginBottom: 8, boxSizing: 'border-box', fontFamily: 'Outfit, sans-serif', outline: 'none' }} value={name} onChange={e => setName(e.target.value)} />
          ) : (
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{name}</div>
          )}
          <div style={{ fontSize: 13, color: '#5a7a9a', marginBottom: 16 }}>{email}</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '14px', background: '#111827', borderRadius: 10, marginBottom: 16 }}>
            {[{ v: progress.casesCompleted || 0, l: 'Cases' }, { v: (progress.totalScore || 0)+'%', l: 'Accuracy' }, { v: progress.streak || 0, l: 'Streak' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#00d4ff' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: '#5a7a9a' }}>{s.l}</div>
              </div>
            ))}
          </div>
          {editing ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '10px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }} onClick={savePref}>Save</button>
              <button style={{ flex: 1, padding: '10px', border: '1px solid #1e2d45', color: '#5a7a9a', background: 'transparent', borderRadius: 8, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }} onClick={() => setEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button style={{ width: '100%', padding: '10px', border: '1px solid #1e2d45', color: '#e8f0fe', background: 'transparent', borderRadius: 8, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: 13 }} onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          )}
          <button style={{ width: '100%', marginTop: 10, padding: '11px', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', background: 'transparent', borderRadius: 8, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 700 }} onClick={logout}>Logout →</button>
        </div>

        {/* Settings */}
        <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #1e2d45' }}>Account Details</div>
          {[
            { label: 'Year of Study', val: year, edit: editing, onChange: setYear, options: ['Year 1','Year 2','Year 3','Intern'] },
            { label: 'Institution',   val: inst, edit: editing, onChange: setInst, options: null },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1e2d45' }}>
              <span style={{ fontSize: 13, color: '#5a7a9a' }}>{f.label}</span>
              {f.edit && f.options ? (
                <select style={{ padding: '6px 10px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 6, color: '#e8f0fe', fontFamily: 'Outfit, sans-serif', fontSize: 13 }} value={f.val} onChange={e => f.onChange(e.target.value)}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : f.edit ? (
                <input style={{ padding: '6px 10px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 6, color: '#e8f0fe', fontFamily: 'Outfit, sans-serif', fontSize: 13, width: 200 }} value={f.val} onChange={e => f.onChange(e.target.value)} />
              ) : (
                <span style={{ fontSize: 13, color: '#00d4ff', fontWeight: 600 }}>{f.val}</span>
              )}
            </div>
          ))}

          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 20, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #1e2d45' }}>Preferences</div>
          {[
            { key: 'darkMode',  label: 'Dark Mode',       sub: 'Always on — optimised for study' },
            { key: 'reminder',  label: 'Daily Reminder',  sub: 'Notification at 8:00 AM' },
            { key: 'sound',     label: 'Sound Effects',   sub: 'Quiz answer sounds' },
          ].map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1e2d45' }}>
              <div><div style={{ fontSize: 13 }}>{s.label}</div><div style={{ fontSize: 11, color: '#5a7a9a' }}>{s.sub}</div></div>
              <div style={{ width: 44, height: 24, borderRadius: 99, background: settings[s.key] ? '#00d4ff' : '#1e2d45', position: 'relative', cursor: 'pointer', transition: 'background .2s' }} onClick={() => toggleSetting(s.key)}>
                <div style={{ position: 'absolute', top: 3, left: settings[s.key] ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 20, padding: '14px', background: 'rgba(255,107,107,0.05)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff6b6b', marginBottom: 6 }}>Danger Zone</div>
            <div style={{ fontSize: 12, color: '#5a7a9a', marginBottom: 10 }}>This will clear all your progress, case history, and settings.</div>
            <button style={{ padding: '8px 18px', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', background: 'transparent', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
              onClick={() => { if (window.confirm('Reset all your progress? This cannot be undone.')) { ['progress','planner_tasks','planner_goals','skills_completed','case_history','profile_year','profile_inst','profile_settings'].forEach(k => localStorage.removeItem(sk(uid, k))); window.location.reload(); } }}>
              Reset My Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
const S = {
  app: { display: 'flex', minHeight: '100vh', background: 'radial-gradient(circle at top left, rgba(0,212,255,0.14), transparent 28%), linear-gradient(180deg,#07090f 0%,#020409 100%)', fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  sidebar: { width: 220, minHeight: '100vh', background: 'rgba(13,17,23,0.96)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', padding: '22px 0', position: 'sticky', top: 0, height: '100vh', flexShrink: 0, boxShadow: '2px 0 30px rgba(0,0,0,0.25)' },
  sbLogo: { display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 16 },
  sbLogoIcon: { fontSize: 22 },
  sbLogoText: { fontSize: 18, fontWeight: 800, color: '#00d4ff' },
  sbUser: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', marginBottom: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' },
  sbAv: { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#00ff9d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#000', flexShrink: 0 },
  sbName: { fontSize: 13, fontWeight: 700, color: '#f7fbff' },
  sbRole: { fontSize: 10, color: '#7a98c6' },
  sbNav: { flex: 1, padding: '0 10px', overflowY: 'auto' },
  navGrpTitle: { fontSize: 10, fontWeight: 700, color: '#7a98c6', textTransform: 'uppercase', letterSpacing: 1, padding: '12px 8px 4px', marginTop: 10 },
  ni: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, color: '#8aa3c5', fontSize: 12, fontWeight: 500, cursor: 'pointer', marginBottom: 6, borderLeft: '3px solid transparent', transition: 'background .2s, color .2s, border-color .2s' },
  niActive: { background: 'rgba(0,212,255,0.12)', color: '#00d4ff', borderLeft: '3px solid #00d4ff' },
  niIcon: { fontSize: 15, width: 24, textAlign: 'center' },
  niBadge: { marginLeft: 'auto', color: '#ff6b6b', fontSize: 10 },
  sbBottom: { padding: '18px 18px 0', borderTop: '1px solid rgba(255,255,255,0.05)' },
  streakBox: { background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: '14px 12px', marginBottom: 14, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' },
  streakVal: { fontSize: 21, fontWeight: 800, color: '#ffd93d' },
  streakLbl: { fontSize: 10, color: '#7a98c6', marginTop: 2 },
  logoutBtn: { width: '100%', padding: '10px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, color: '#c4d2ea', background: 'rgba(255,255,255,0.03)', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'background .2s' },
  main: { flex: 1, overflowY: 'auto', maxHeight: '100vh', padding: '28px' },
};

const DS = {
  page: { padding: '24px', maxWidth: 1200, margin: '0 auto' },
  welcome: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '30px 32px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' },
  welcomeLeft: { flex: '1 1 420px', minWidth: 260 },
  greet: { fontSize: 12, color: '#7a98c6', marginBottom: 6, letterSpacing: '.12em', textTransform: 'uppercase' },
  welcomeName: { fontSize: 32, fontWeight: 800, marginBottom: 10, lineHeight: 1.05 },
  welcomeQuote: { color: '#9fb6d4', fontSize: 14, marginBottom: 18, maxWidth: 520, lineHeight: 1.6 },
  tipBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.18)', borderRadius: 999, fontSize: 13, color: '#e8f0fe' },
  welcomeStats: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  miniStat: { textAlign: 'center', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, minWidth: 110, border: '1px solid rgba(255,255,255,0.06)' },
  miniLbl: { fontSize: 10, color: '#7a98c6', marginTop: 4 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 24 },
  statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: 20, boxShadow: '0 18px 45px rgba(0,0,0,0.14)' },
  statLbl: { fontSize: 11, color: '#7a98c6', marginTop: 6, letterSpacing: '.02em' },
  progTrack: { background: '#11203d', height: 6, borderRadius: 99, marginTop: 14 },
  progFill: { height: '100%', borderRadius: 99, transition: 'width 1s ease' },
  sectionHdr: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 700, letterSpacing: '.01em' },
  quickGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginBottom: 24 },
  quickCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '22px 18px', textAlign: 'center', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s, border-color .2s', boxShadow: '0 16px 40px rgba(0,0,0,0.14)' },
  quickName: { fontSize: 13, fontWeight: 700, marginBottom: 8 },
  quickDesc: { fontSize: 11, color: '#7a98c6', lineHeight: 1.6 },
  fullTipCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '22px 24px' },
  tipHdr: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  tipTitle: { fontSize: 12, fontWeight: 700, color: '#ffd93d', textTransform: 'uppercase', letterSpacing: '.12em' },
  tipDate: { marginLeft: 'auto', fontSize: 11, color: '#7a98c6', fontFamily: 'monospace' },
  tipText: { fontSize: 14, color: '#b7c8e7', lineHeight: 1.8 },
};

const P = {
  page:         { padding: '24px 28px', maxWidth: 1100, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:          { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 },
  title:        { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:          { color: '#5a7a9a', fontSize: 14 },
  weekSummary:  { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 12, padding: '14px 20px', textAlign: 'center', minWidth: 140 },
  wsBig:        { fontSize: 28, fontWeight: 800, color: '#00d4ff' },
  wsLbl:        { fontSize: 11, color: '#5a7a9a', margin: '2px 0 8px' },
  wsBar:        { background: '#1e2d45', height: 5, borderRadius: 99 },
  wsFill:       { height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#00d4ff,#00ff9d)', transition: 'width 1s' },
  grid:         { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 10, marginBottom: 20 },
  dayCol:       { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 10, overflow: 'hidden', minHeight: 140 },
  dayColToday:  { border: '1px solid rgba(0,212,255,0.4)' },
  dayHdr:       { padding: '8px', textAlign: 'center', borderBottom: '1px solid #1e2d45', background: '#111827' },
  dayHdrToday:  { background: 'rgba(0,212,255,0.1)', color: '#00d4ff' },
  todayDot:     { fontSize: 8, fontWeight: 700, color: '#00d4ff', letterSpacing: '.5px' },
  dayBody:      { padding: 6 },
  taskItem:     { borderRadius: 5, padding: '5px 7px', marginBottom: 4, border: '1px solid' },
  addInput:     { width: '100%', padding: '5px 7px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 5, color: '#e8f0fe', fontSize: 11, outline: 'none', boxSizing: 'border-box', fontFamily: 'Outfit, sans-serif' },
  addConfirmBtn:{ flex: 1, padding: '4px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer' },
  addCancelBtn: { flex: 1, padding: '4px', background: 'transparent', color: '#5a7a9a', border: '1px solid #1e2d45', borderRadius: 4, fontSize: 11, cursor: 'pointer' },
  addBtn:       { width: '100%', padding: '5px', border: '1px dashed #1e2d45', borderRadius: 5, fontSize: 10, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif', marginTop: 4 },
  goalsCard:    { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 12, padding: '20px 24px' },
  goalsTitle:   { fontSize: 14, fontWeight: 700, marginBottom: 16 },
  goalRow:      { marginBottom: 14 },
  goalTrack:    { background: '#1e2d45', height: 5, borderRadius: 99 },
  goalFill:     { height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#00d4ff,#00ff9d)', transition: 'width .8s' },
};

const Q = {
  page:         { padding: '24px 28px', maxWidth: 1000, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:          { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 },
  title:        { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:          { color: '#5a7a9a', fontSize: 14 },
  uploadBtn:    { padding: '10px 20px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  sharedSection:{ marginBottom: 20, padding: '16px', background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 12 },
  sharedTitle:  { fontSize: 13, fontWeight: 700, marginBottom: 12 },
  sharedGrid:   { display: 'flex', gap: 12, flexWrap: 'wrap' },
  sharedCard:   { background: '#111827', border: '1px solid #1e2d45', borderRadius: 10, overflow: 'hidden', width: 160 },
  sharedImg:    { width: '100%', height: 110, objectFit: 'cover' },
  sharedFileIcon:{ height: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, background: '#1e2d45' },
  sharedCardFooter:{ padding: '8px 10px' },
  likeBtn:      { background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#e8f0fe', padding: 0 },
  downloadBtn:  { fontSize: 12, color: '#00d4ff' },
  filters:      { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 },
  filterBtn:    { padding: '6px 14px', border: '1px solid #1e2d45', borderRadius: 99, fontSize: 12, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif' },
  filterActive: { border: '1px solid #00d4ff', color: '#00d4ff', background: 'rgba(0,212,255,0.07)' },
  qCard:        { padding: '16px 18px', border: '1px solid #1e2d45', borderRadius: 12, marginBottom: 10 },
  qMeta:        { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8, alignItems: 'center' },
  qYear:        { fontSize: 12, fontFamily: 'monospace', color: '#00d4ff', fontWeight: 700 },
  qTopic:       { fontSize: 11, color: '#5a7a9a' },
  qTag:         { fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(0,212,255,0.1)', color: '#00d4ff' },
  qText:        { fontSize: 14, fontWeight: 500, marginBottom: 8, lineHeight: 1.6 },
  ansBtn:       { background: 'none', border: 'none', color: '#00d4ff', fontSize: 12, cursor: 'pointer', padding: '4px 0', fontFamily: 'Outfit, sans-serif' },
  ansBox:       { marginTop: 10, padding: '12px 14px', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: 8, fontSize: 13, lineHeight: 1.6 },
};

const SK = {
  page:         { padding: '24px 28px', maxWidth: 1100, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:          { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  title:        { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:          { color: '#5a7a9a', fontSize: 14 },
  filterBtn:    { padding: '6px 14px', border: '1px solid #1e2d45', borderRadius: 99, fontSize: 11, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif' },
  filterActive: { border: '1px solid #00d4ff', color: '#00d4ff', background: 'rgba(0,212,255,0.07)' },
  grid:         { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 16 },
  skillCard:    { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'border-color .2s' },
  skillName:    { fontSize: 16, fontWeight: 700, marginBottom: 6 },
  skillDesc:    { fontSize: 12, color: '#5a7a9a', lineHeight: 1.5, marginBottom: 6 },
  catBadge:     { fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'rgba(0,212,255,0.1)', color: '#00d4ff' },
  catBadge2:    { fontSize: 10, padding: '3px 8px', borderRadius: 99, background: 'rgba(0,212,255,0.1)', color: '#00d4ff' },
  backBtn:      { padding: '8px 16px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', background: 'transparent', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginBottom: 20 },
  detailHdr:    { display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24, padding: 20, background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14 },
  detailTitle:  { fontSize: 22, fontWeight: 800, marginBottom: 4 },
  detailSub:    { fontSize: 13, color: '#5a7a9a', marginBottom: 10 },
  doneBtn:      { padding: '10px 18px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', background: 'transparent', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginLeft: 'auto', whiteSpace: 'nowrap' },
  doneBtnActive:{ background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.4)', color: '#00ff9d' },
  stepCard:     { display: 'flex', gap: 14, padding: '16px', border: '1px solid #1e2d45', borderRadius: 10, marginBottom: 10 },
  stepNum:      { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#000', flexShrink: 0 },
  stepContent:  { flex: 1 },
  stepTitle:    { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  stepDesc:     { fontSize: 13, color: '#8a9ab5', lineHeight: 1.6 },
  stepNote:     { fontSize: 12, color: '#ffd93d', marginTop: 6 },
};

const D = {
  page:         { padding: '24px 28px', maxWidth: 900, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:          { marginBottom: 20 },
  title:        { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:          { color: '#5a7a9a', fontSize: 14 },
  compose:      { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, padding: 18, marginBottom: 18 },
  composeTop:   { display: 'flex', gap: 12, marginBottom: 12 },
  av:           { width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#000', flexShrink: 0 },
  avSm:         { width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: '#000', flexShrink: 0 },
  textarea:     { flex: 1, width: '100%', padding: '10px 14px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 10, color: '#e8f0fe', fontSize: 14, resize: 'vertical', minHeight: 70, outline: 'none', fontFamily: 'Outfit, sans-serif' },
  attachPreview:{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, padding: '6px 10px', background: '#111827', borderRadius: 8, fontSize: 13, color: '#5a7a9a' },
  removeAttach: { background: 'none', border: 'none', color: '#5a7a9a', cursor: 'pointer', fontSize: 14, marginLeft: 'auto' },
  composeBottom:{ display: 'flex', gap: 10, alignItems: 'center' },
  topicSelect:  { padding: '8px 12px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 8, color: '#e8f0fe', fontSize: 12, fontFamily: 'Outfit, sans-serif', outline: 'none' },
  attachBtn:    { padding: '8px 14px', border: '1px solid #1e2d45', borderRadius: 8, color: '#5a7a9a', background: 'transparent', fontSize: 12, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  postBtn:      { marginLeft: 'auto', padding: '9px 22px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  post:         { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 12, padding: '16px 18px', marginBottom: 12 },
  postHdr:      { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  postName:     { fontSize: 14, fontWeight: 700 },
  postTime:     { fontSize: 11, color: '#5a7a9a' },
  topicBadge:   { fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'rgba(0,212,255,0.1)', color: '#00d4ff', marginLeft: 'auto' },
  deleteBtn:    { background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#5a7a9a', padding: '0 4px' },
  postText:     { fontSize: 14, color: '#e8f0fe', lineHeight: 1.7, marginBottom: 12 },
  postActions:  { display: 'flex', gap: 14 },
  actionBtn:    { background: 'none', border: 'none', color: '#5a7a9a', fontSize: 12, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  replyItem:    { display: 'flex', gap: 8, padding: '8px 10px', background: '#111827', borderRadius: 8, marginTop: 8 },
  replyInput:   { display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 },
  replyField:   { flex: 1, padding: '8px 12px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 8, color: '#e8f0fe', fontSize: 13, outline: 'none', fontFamily: 'Outfit, sans-serif' },
  replyPost:    { padding: '8px 14px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' },
};

const LB = {
  page:         { padding: '24px 28px', maxWidth: 900, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:          { marginBottom: 24 },
  title:        { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:          { color: '#5a7a9a', fontSize: 14 },
  podium:       { display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, marginBottom: 32 },
  podiumPlace:  { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  podiumInfo:   { textAlign: 'center' },
  podiumAv:     { width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#000', margin: '0 auto 6px' },
  podiumBlock:  { width: 110, borderRadius: '8px 8px 0 0', border: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 },
  table:        { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, overflow: 'hidden' },
  tableHdr:     { display: 'grid', gridTemplateColumns: '50px 1fr 80px 90px 70px', gap: 10, padding: '12px 16px', background: '#111827', fontSize: 11, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px', borderBottom: '1px solid #1e2d45' },
  tableRow:     { display: 'grid', gridTemplateColumns: '50px 1fr 80px 90px 70px', gap: 10, padding: '12px 16px', alignItems: 'center', borderBottom: '1px solid #1e2d45', fontSize: 13 },
  tableRowMe:   { background: 'rgba(0,212,255,0.04)', borderLeft: '2px solid #00d4ff' },
  avSm:         { width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: '#000', flexShrink: 0 },
};

const PR = {
  page:       { padding: '24px 28px', maxWidth: 1100, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:        { marginBottom: 24 },
  title:      { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:        { color: '#5a7a9a', fontSize: 14 },
  grid:       { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  card:       { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, padding: 22 },
  cardTitle:  { fontSize: 14, fontWeight: 700, marginBottom: 16 },
  subjRow:    { marginBottom: 14 },
  pTrack:     { background: '#1e2d45', height: 6, borderRadius: 99 },
  pFill:      { height: '100%', borderRadius: 99, transition: 'width 1s' },
  heatGrid:   { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginTop: 8 },
  heatCell:   { aspectRatio: '1', borderRadius: 3 },
  heatLegend: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 11, color: '#5a7a9a' },
  heatLegCell:{ width: 14, height: 14, borderRadius: 3 },
  statRow:    { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1e2d45' },
  th:         { textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: '.5px' },
  td:         { padding: '10px 12px', fontSize: 13, color: '#e8f0fe' },
};
