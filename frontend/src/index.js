// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * 🔔 Study Reminder Logic
 * User-oda browser-ku notification anupum
 */
const checkReminder = () => {
  const currentUser = localStorage.getItem('cpa_current_uid');
  if (!currentUser) return;

  // Profile settings-la reminder switch 'ON' aagi irukanu check pannuthu
  const settings = JSON.parse(localStorage.getItem('cpa_' + currentUser + '_profile_settings') || '{"reminder": true}');
  if (!settings.reminder) return;

  const lastReminder = localStorage.getItem('cpa_last_reminder_' + currentUser);
  const today = new Date().toDateString();
  
  // Inniku reminder anupiyacha nu check pannuthu
  if (lastReminder === today) return;

  const hour = new Date().getHours();
  
  // Kaalai 8-9 mani window (Testing-ku mathikalaam)
  if (hour >= 8 && hour < 9) { 
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          new Notification('CliniqPA Study Reminder 🩺', {
            body: 'Time to study! Your daily case and notes await.',
            icon: '/favicon.ico'
          });
          localStorage.setItem('cpa_last_reminder_' + currentUser, today);
        }
      });
    }
  }
};

// App load aagum pothu check pannum
checkReminder();

// Oru oru mani nerathukku oru thadava background-la check pannum
setInterval(checkReminder, 60 * 60 * 1000); 

// Main App Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);