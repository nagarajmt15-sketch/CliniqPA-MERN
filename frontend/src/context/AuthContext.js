// ═══════════════════════════════════════════════════════════════
// FILE 2: frontend/src/context/AuthContext.js
// FIXED — Register → auto login → dashboard directly
// ═══════════════════════════════════════════════════════════════

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'https://cliniqpa-mern.onrender.com';

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load — restore session
  useEffect(() => {
    const stored = localStorage.getItem('cliniqpa_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + parsed.token;
      } catch {
        localStorage.removeItem('cliniqpa_user');
      }
    }
    setLoading(false);
  }, []);

  // ── LOGIN ─────────────────────────────────────────────────
  async function login(email, password) {
    const res = await axios.post(API_URL + '/api/auth/login', { email, password });
    _setUser(res.data);
    return res.data;
  }

  // ── REGISTER → auto login (no separate email verify step) ─
  async function register(name, email, password) {
    const res = await axios.post(API_URL + '/api/auth/register', { name, email, password });
    // Register returns user + token → auto login
    _setUser(res.data);
    return res.data;
  }

  function _setUser(data) {
    setUser(data);
    localStorage.setItem('cliniqpa_user', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
    // Store uid for localStorage per-user keys
    localStorage.setItem('cliniqpa_current_uid', data._id || data.email);
  }

  // ── LOGOUT ───────────────────────────────────────────────
  function logout() {
    setUser(null);
    localStorage.removeItem('cliniqpa_user');
    localStorage.removeItem('cliniqpa_current_uid');
    delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

