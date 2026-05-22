import React from 'react';
import { useAuth } from '../../context/AuthContext';
// Step 1: Import the NotificationBell (As per your instruction)
import { NotificationBell } from '../Notes/Notes'; 

function Sidebar({ active, onNav }) {
  const { user, logout } = useAuth();
  const uid = user?.uid || 'guest';

  const initials = user && user.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'PS';

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'cases',     icon: '🏥', label: 'Patient Cases' },
    { id: 'notes',     icon: '📚', label: 'Smart Notes' },
    { id: 'bodymap',   icon: '🫁', label: 'Body Explorer' },
    { id: 'quiz',      icon: '🎯', label: 'Mock Tests' },
    { id: 'ai',        icon: '🤖', label: 'AI Assistant' },
  ];

  return (
    <nav style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={{ fontSize: 22 }}>🩺</span>
        <span style={styles.logoText}>CliniqPA</span>
      </div>

      <div style={styles.userChip}>
        <div style={styles.avatar}>{initials}</div>
        <div style={{ flex: 1 }}>
          {/* Step 2: Name and Bell icon side-by-side */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={styles.userName}>{user ? user.name : 'PA Student'}</div>
            
            {/* Notification Bell Component */}
            <NotificationBell uid={uid} />
          </div>
          <div style={styles.userRole}>PA-S Year 2</div>
        </div>
      </div>

      <div style={styles.nav}>
        {navItems.map((item) => (
          <div
            key={item.id}
            style={active === item.id ? styles.niActive : styles.ni}
            onClick={() => onNav(item.id)}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={styles.bottom}>
        <div style={styles.streakBox}>
          <div style={{ fontSize: 24 }}>🔥</div>
          <div style={styles.streakVal}>{user?.progress?.streak || 0}</div>
          <div style={styles.streakLbl}>Day Streak</div>
        </div>
        <button style={styles.logoutBtn} onClick={logout}>Logout →</button>
      </div>
    </nav>
  );
}

const styles = {
  sidebar:   { width: 240, minHeight: '100vh', background: '#0d1117', borderRight: '1px solid #1e2d45', display: 'flex', flexDirection: 'column', padding: '20px 0', position: 'sticky', top: 0, height: '100vh' },
  logo:      { display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px 20px', borderBottom: '1px solid #1e2d45', marginBottom: 16 },
  logoText:  { fontSize: 20, fontWeight: 800, color: '#00d4ff', fontFamily: 'Outfit, sans-serif' },
  userChip:  { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', marginBottom: 16 },
  avatar:    { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#00ff9d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#000' },
  userName:  { fontSize: 13, fontWeight: 600, color: '#e8f0fe' },
  userRole:  { fontSize: 11, color: '#5a7a9a' },
  nav:       { flex: 1, padding: '0 10px' },
  ni:        { display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 10, color: '#5a7a9a', fontSize: 13, fontWeight: 500, marginBottom: 4, cursor: 'pointer' },
  niActive:  { display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 10, color: '#00d4ff', fontSize: 13, fontWeight: 500, marginBottom: 4, cursor: 'pointer', background: 'rgba(0,212,255,0.1)', borderLeft: '3px solid #00d4ff' },
  bottom:    { padding: 16, borderTop: '1px solid #1e2d45' },
  streakBox: { background: '#111827', borderRadius: 10, padding: 12, marginBottom: 12, textAlign: 'center' },
  streakVal: { fontSize: 22, fontWeight: 800, color: '#ffd93d', fontFamily: 'Outfit, sans-serif' },
  streakLbl: { fontSize: 11, color: '#5a7a9a' },
  logoutBtn: { width: '100%', padding: 9, borderRadius: 8, border: '1px solid #1e2d45', color: '#5a7a9a', fontSize: 13, cursor: 'pointer', background: 'transparent' }
};

export default Sidebar;