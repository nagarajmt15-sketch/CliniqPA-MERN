// frontend/src/components/Notes/Notes.jsx
// 30+ topics with Week filter, Importance filter, Search

import React, { useState } from 'react';
import { NOTES, NOTE_LIST } from '../../data/notes';

const IMP_COLORS = {
  must:      { bg: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: 'rgba(255,107,107,0.3)', label: '⭐⭐⭐ Must Know' },
  important: { bg: 'rgba(255,217,61,0.15)',  color: '#ffd93d', border: 'rgba(255,217,61,0.3)',  label: '⭐⭐ Important' },
  basic:     { bg: 'rgba(0,212,255,0.1)',    color: '#00d4ff', border: 'rgba(0,212,255,0.2)',    label: '⭐ Basic' },
};

export default function Notes() {
  const [active,    setActive]    = useState('stemi');
  const [weekFilter, setWeekFilter] = useState('All');
  const [impFilter,  setImpFilter]  = useState('All');
  const [search,     setSearch]     = useState('');

  const note = NOTES[active];

  const filtered = NOTE_LIST.filter(n => {
    const matchWeek = weekFilter === 'All' || n.week == weekFilter;
    const matchImp  = impFilter === 'All' || n.imp === impFilter;
    const matchSrch = !search || n.label.toLowerCase().includes(search.toLowerCase());
    return matchWeek && matchImp && matchSrch;
  });

  const weeks = [1,2,3,4];

  return (
    <div style={S.page}>
      <div style={S.hdr}>
        <h1 style={S.title}>📚 Smart Notes</h1>
        <p style={S.sub}>1 Month PA Study Plan · {NOTE_LIST.length} Topics · Must Know → Important → Basic</p>
      </div>

      <div style={S.layout}>
        {/* LEFT — Sidebar */}
        <div style={S.sidebar}>
          {/* Search */}
          <div style={S.searchWrap}>
            <input style={S.searchInput} placeholder="Search topic..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Week filter */}
          <div style={S.filterRow}>
            <button style={Object.assign({}, S.filterBtn, weekFilter === 'All' ? S.filterActive : {})} onClick={() => setWeekFilter('All')}>All</button>
            {weeks.map(w => (
              <button key={w} style={Object.assign({}, S.filterBtn, weekFilter == w ? S.filterActive : {})} onClick={() => setWeekFilter(w)}>W{w}</button>
            ))}
          </div>

          {/* Importance filter */}
          <div style={S.filterRow}>
            <button style={Object.assign({}, S.filterBtn, impFilter === 'All' ? S.filterActive : {})} onClick={() => setImpFilter('All')}>All</button>
            <button style={Object.assign({}, S.filterBtn, impFilter === 'must' ? { ...S.filterActive, color: '#ff6b6b', borderColor: '#ff6b6b' } : {})} onClick={() => setImpFilter('must')}>⭐⭐⭐</button>
            <button style={Object.assign({}, S.filterBtn, impFilter === 'important' ? { ...S.filterActive, color: '#ffd93d', borderColor: '#ffd93d' } : {})} onClick={() => setImpFilter('important')}>⭐⭐</button>
            <button style={Object.assign({}, S.filterBtn, impFilter === 'basic' ? { ...S.filterActive, color: '#00d4ff', borderColor: '#00d4ff' } : {})} onClick={() => setImpFilter('basic')}>⭐</button>
          </div>

          {/* Topic list */}
          <div style={S.topicList}>
            {filtered.length === 0 && <div style={{ color: '#5a7a9a', fontSize: 12, padding: '10px 0', textAlign: 'center' }}>No topics found</div>}
            {weeks.filter(w => weekFilter === 'All' || weekFilter == w).map(w => {
              const weekTopics = filtered.filter(n => n.week === w);
              if (weekTopics.length === 0) return null;
              return (
                <div key={w}>
                  {weekFilter === 'All' && (
                    <div style={S.weekLabel}>Week {w}</div>
                  )}
                  {weekTopics.map(n => (
                    <div key={n.key}
                      style={Object.assign({}, S.navItem, active === n.key ? S.navItemActive : {})}
                      onClick={() => setActive(n.key)}>
                      <span style={{ fontSize: 15 }}>{n.icon}</span>
                      <span style={S.navLabel}>{n.label}</span>
                      <span style={Object.assign({}, S.impDot, { background: IMP_COLORS[n.imp]?.color })} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={S.legend}>
            <div style={S.legendRow}><span style={{ ...S.legendDot, background: '#ff6b6b' }} />Must Know</div>
            <div style={S.legendRow}><span style={{ ...S.legendDot, background: '#ffd93d' }} />Important</div>
            <div style={S.legendRow}><span style={{ ...S.legendDot, background: '#00d4ff' }} />Basic</div>
          </div>
        </div>

        {/* RIGHT — Note content */}
        <div style={S.content}>
          {note ? (
            <>
              {/* Header */}
              <div style={S.noteHdr}>
                <div style={{ flex: 1 }}>
                  <div style={S.noteMeta}>
                    <span style={Object.assign({}, S.impBadge, { background: IMP_COLORS[note.imp]?.bg, color: IMP_COLORS[note.imp]?.color, border: '1px solid ' + IMP_COLORS[note.imp]?.border })}>
                      {IMP_COLORS[note.imp]?.label}
                    </span>
                    {note.week && <span style={S.weekBadge}>Week {note.week} · Day {note.day}</span>}
                  </div>
                  <h2 style={S.noteTitle}>{note.title}</h2>
                  <p style={S.noteSub}>{note.sub}</p>
                </div>
              </div>

              {/* Blocks */}
              {note.blocks?.map((block, i) => (
                <div key={i} style={S.block}>
                  <div style={S.blockTitle}>{block.t}</div>
                  {block.type === 'b' ? (
                    <ul style={S.ul}>
                      {block.items.map((item, j) => (
                        <li key={j} style={S.li}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={S.mnemBox}>
                      <div style={S.mnemLetters}>{block.letters}</div>
                      <div style={S.mnemMeaning}>{block.meaning}</div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#5a7a9a' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
              <div>Select a topic from the sidebar</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const S = {
  page:        { padding: '24px 28px', maxWidth: 1200, fontFamily: 'Outfit, sans-serif', color: '#e8f0fe' },
  hdr:         { marginBottom: 20 },
  title:       { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  sub:         { color: '#5a7a9a', fontSize: 14 },
  layout:      { display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'start' },
  sidebar:     { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 24 },
  searchWrap:  { padding: '10px 12px', borderBottom: '1px solid #1e2d45' },
  searchInput: { width: '100%', padding: '8px 12px', background: '#111827', border: '1px solid #1e2d45', borderRadius: 8, color: '#e8f0fe', fontSize: 12, outline: 'none', boxSizing: 'border-box', fontFamily: 'Outfit, sans-serif' },
  filterRow:   { display: 'flex', gap: 4, padding: '8px 10px', borderBottom: '1px solid #1e2d45', flexWrap: 'wrap' },
  filterBtn:   { padding: '4px 8px', border: '1px solid #1e2d45', borderRadius: 6, fontSize: 11, color: '#5a7a9a', cursor: 'pointer', background: 'transparent', fontFamily: 'Outfit, sans-serif' },
  filterActive:{ background: 'rgba(0,212,255,0.1)', border: '1px solid #00d4ff', color: '#00d4ff' },
  topicList:   { maxHeight: 480, overflowY: 'auto', padding: '4px 0' },
  weekLabel:   { fontSize: 10, fontWeight: 700, color: '#5a7a9a', textTransform: 'uppercase', letterSpacing: 1, padding: '8px 14px 4px' },
  navItem:     { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', cursor: 'pointer', color: '#5a7a9a', fontSize: 12, borderLeft: '2px solid transparent' },
  navItemActive:{ background: 'rgba(0,212,255,0.08)', color: '#00d4ff', borderLeft: '2px solid #00d4ff' },
  navLabel:    { flex: 1 },
  impDot:      { width: 6, height: 6, borderRadius: '50%', flexShrink: 0 },
  legend:      { padding: '10px 14px', borderTop: '1px solid #1e2d45' },
  legendRow:   { display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#5a7a9a', marginBottom: 3 },
  legendDot:   { width: 7, height: 7, borderRadius: '50%' },
  content:     { background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, padding: 28, minHeight: 500 },
  noteHdr:     { marginBottom: 22, paddingBottom: 18, borderBottom: '1px solid #1e2d45' },
  noteMeta:    { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' },
  impBadge:    { fontSize: 12, padding: '5px 12px', borderRadius: 99, fontWeight: 700 },
  weekBadge:   { fontSize: 11, color: '#5a7a9a', fontFamily: 'monospace' },
  noteTitle:   { fontSize: 22, fontWeight: 800, marginBottom: 4 },
  noteSub:     { fontSize: 13, color: '#5a7a9a' },
  block:       { marginBottom: 22 },
  blockTitle:  { fontSize: 12, fontWeight: 700, color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 },
  ul:          { paddingLeft: 18 },
  li:          { fontSize: 14, lineHeight: 1.75, color: '#e8f0fe', marginBottom: 4 },
  mnemBox:     { background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 10, padding: '14px 18px' },
  mnemLetters: { fontSize: 20, color: '#00d4ff', fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 },
  mnemMeaning: { fontSize: 13, color: '#5a7a9a', lineHeight: 1.7 },
};


// ════════════════════════════════════════════════════════════════════
// NOTIFICATION BELL — top-right dropdown
// Place this in your Dashboard layout (top bar)
// ════════════════════════════════════════════════════════════════════

export function NotificationBell({ uid }) {
  const [open,   setOpen]   = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, icon: '🆕', title: 'New Case Unlocked',    body: 'Diabetic Ketoacidosis case is now available!',      time: '2h ago', read: false },
    { id: 2, icon: '🏆', title: 'Leaderboard Update',   body: 'You moved up in the rankings this week!',           time: '5h ago', read: false },
    { id: 3, icon: '💡', title: 'Daily Clinical Tip',   body: 'FAST: Face, Arm, Speech, Time — for stroke.',       time: '8h ago', read: true  },
    { id: 4, icon: '📝', title: 'Quiz Results Ready',   body: 'Your Cardiology mock test: 82% — Good effort!',     time: '1d ago', read: true  },
    { id: 5, icon: '💬', title: 'New Reply',            body: 'Someone replied to your discussion post.',          time: '1d ago', read: true  },
  ]);

  const unread = notifs.filter(n => !n.read).length;

  function markAllRead() {
    setNotifs(p => p.map(n => ({ ...n, read: true })));
  }

  function markOneRead(id) {
    setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return (
    <div style={NB.wrap}>
      {/* Bell button */}
      <button style={NB.bell} onClick={() => { setOpen(o => !o); if (!open) markAllRead(); }}>
        🔔
        {unread > 0 && <span style={NB.badge}>{unread}</span>}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div style={NB.backdrop} onClick={() => setOpen(false)} />
          <div style={NB.dropdown}>
            <div style={NB.dropHdr}>
              <span style={NB.dropTitle}>Notifications</span>
              <button style={NB.markAllBtn} onClick={markAllRead}>Mark all read</button>
            </div>
            <div style={NB.list}>
              {notifs.map(n => (
                <div key={n.id} style={Object.assign({}, NB.item, !n.read ? NB.itemUnread : {})}
                  onClick={() => markOneRead(n.id)}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={NB.itemTitle}>{n.title}</div>
                    <div style={NB.itemBody}>{n.body}</div>
                    <div style={NB.itemTime}>{n.time}</div>
                  </div>
                  {!n.read && <div style={NB.unreadDot} />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const NB = {
  wrap:       { position: 'relative' },
  bell:       { position: 'relative', width: 38, height: 38, borderRadius: 10, background: '#111827', border: '1px solid #1e2d45', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badge:      { position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#ff6b6b', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' },
  backdrop:   { position: 'fixed', inset: 0, zIndex: 99 },
  dropdown:   { position: 'absolute', top: 46, right: 0, width: 320, background: '#0d1117', border: '1px solid #1e2d45', borderRadius: 14, boxShadow: '0 16px 50px rgba(0,0,0,0.6)', zIndex: 100, overflow: 'hidden' },
  dropHdr:    { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #1e2d45' },
  dropTitle:  { fontSize: 14, fontWeight: 700, color: '#e8f0fe', fontFamily: 'Outfit, sans-serif' },
  markAllBtn: { fontSize: 11, color: '#00d4ff', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' },
  list:       { maxHeight: 360, overflowY: 'auto' },
  item:       { display: 'flex', gap: 10, padding: '12px 14px', borderBottom: '1px solid #1e2d45', cursor: 'pointer', alignItems: 'flex-start', transition: 'background .15s' },
  itemUnread: { background: 'rgba(0,212,255,0.04)', borderLeft: '3px solid #00d4ff' },
  itemTitle:  { fontSize: 13, fontWeight: 700, color: '#e8f0fe', fontFamily: 'Outfit, sans-serif', marginBottom: 2 },
  itemBody:   { fontSize: 11, color: '#5a7a9a', fontFamily: 'Outfit, sans-serif', lineHeight: 1.5 },
  itemTime:   { fontSize: 10, color: '#3a5a7a', fontFamily: 'monospace', marginTop: 4 },
  unreadDot:  { width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0, marginTop: 4 },
};
