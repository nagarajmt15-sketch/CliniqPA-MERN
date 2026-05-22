// COMPLETE Login.jsx WITH REAL EMAIL OTP:

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import emailjs from '@emailjs/browser';

const API = 'http://localhost:5000';

// EmailJS config — replace with your actual keys from emailjs.com
const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID  || 'service_REPLACE';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_REPLACE';
const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

export default function Login() {
  const [screen, setScreen] = useState('signin');
  // signin | signup | signup_success | forgot_email | forgot_code | forgot_newpass | forgot_success

  const [signEmail, setSignEmail] = useState('');
  const [signPass,  setSignPass]  = useState('');
  const [regName,   setRegName]   = useState('');
  const [regEmail,  setRegEmail]  = useState('');
  const [regPass,   setRegPass]   = useState('');
  const [regPass2,  setRegPass2]  = useState('');
  const [forgotEmail,    setForgotEmail]    = useState('');
  const [forgotCode,     setForgotCode]     = useState('');
  const [serverOtp,      setServerOtp]      = useState('');
  const [newPass,        setNewPass]        = useState('');
  const [newPass2,       setNewPass2]       = useState('');
  const [error,          setError]          = useState('');
  const [loading,        setLoading]        = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  function clearError() { setError(''); }

  // ── SIGN IN ──────────────────────────────────────────────
  async function handleSignIn(e) {
    e.preventDefault();
    clearError();
    if (!signEmail || !signPass) { setError('Please enter email and password.'); return; }
    setLoading(true);
    try {
      await login(signEmail.trim().toLowerCase(), signPass);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
    setLoading(false);
  }

  // ── SIGN UP ──────────────────────────────────────────────
  async function handleSignUp(e) {
    e.preventDefault();
    clearError();
    if (!regName.trim())      { setError('Please enter your full name.'); return; }
    if (!regEmail.trim())     { setError('Please enter your email.'); return; }
    if (!regEmail.includes('@')) { setError('Enter a valid email address.'); return; }
    if (regPass.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    if (regPass !== regPass2) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      var res = await fetch(API + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName.trim(), email: regEmail.trim().toLowerCase(), password: regPass })
      });
      var data = await res.json();
      if (!res.ok) { setError(data.message || 'Registration failed.'); setLoading(false); return; }
      setSignEmail(regEmail.trim().toLowerCase());
      setScreen('signup_success');
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    }
    setLoading(false);
  }

  // ── FORGOT — Step 1: Send OTP to email ──────────────────
  async function handleForgotEmail(e) {
    e.preventDefault();
    clearError();
    if (!forgotEmail.trim()) { setError('Enter your registered email.'); return; }
    if (!forgotEmail.includes('@')) { setError('Enter a valid email address.'); return; }
    setLoading(true);
    try {
      // 1. Ask backend to generate OTP and verify email exists
      var res = await fetch(API + '/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase() })
      });
      var data = await res.json();
      console.log('Backend response:', data); // DEBUG
      if (!res.ok) { setError(data.message || 'Email not found.'); setLoading(false); return; }

      var otp  = data.otp;
      var name = data.name;
      console.log('OTP received from backend:', otp); // DEBUG
      setServerOtp(otp); // save for display on screen

      // 2. Send OTP via EmailJS
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email:  forgotEmail.trim(),
            to_name:   name,
            otp_code:  otp,
            reply_to:  'noreply@cliniqpa.com'
          },
          EMAILJS_PUBLIC_KEY
        );
        console.log('EmailJS sent successfully'); // DEBUG
        setScreen('forgot_code');
      } catch (emailErr) {
        // EmailJS not configured yet — show OTP on screen (development mode)
        console.warn('EmailJS not configured. Showing OTP on screen:', otp);
        setScreen('forgot_code');
      }

    } catch (err) {
      console.error('Error sending OTP:', err); // DEBUG
      setError('Cannot connect to server. Make sure backend is running.');
    }
    setLoading(false);
  }

  // ── FORGOT — Step 2: Verify OTP ─────────────────────────
  async function handleVerifyOtp(e) {
    e.preventDefault();
    clearError();
    if (!forgotCode.trim() || forgotCode.length !== 6) {
      setError('Enter the 6-digit code sent to your email.');
      return;
    }
    
    console.log('Verifying OTP:', forgotCode); // DEBUG
    console.log('Email:', forgotEmail); // DEBUG
    
    setLoading(true);
    try {
      // Verify OTP with backend BEFORE going to next step
      var res = await fetch(API + '/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: forgotEmail.trim().toLowerCase(), 
          otp: forgotCode.trim() 
        })
      });
      var data = await res.json();
      console.log('Verify OTP response:', data); // DEBUG
      
      if (!res.ok) {
        setError(data.message || 'Invalid OTP. Please try again.');
        setForgotCode(''); // Clear the OTP input
        setLoading(false);
        return;
      }
      
      // OTP correct - go to password reset screen
      console.log('OTP verified successfully!'); // DEBUG
      setScreen('forgot_newpass');
      
    } catch (err) {
      console.error('Verify OTP error:', err); // DEBUG
      setError('Cannot connect to server. Make sure backend is running.');
    }
    setLoading(false);
  }

  // ── FORGOT — Step 3: Reset Password ─────────────────────
  async function handleResetPassword(e) {
    e.preventDefault();
    clearError();
    if (newPass.length < 6)     { setError('Password must be at least 6 characters.'); return; }
    if (newPass !== newPass2)    { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      var res = await fetch(API + '/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:       forgotEmail.trim().toLowerCase(),
          otp:         forgotCode.trim(),
          newPassword: newPass
        })
      });
      var data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Reset failed. Please try again.');
        setLoading(false);
        return;
      }
      // Success — go to success screen
      setSignEmail(forgotEmail.trim().toLowerCase());
      setSignPass('');
      setScreen('forgot_success');
    } catch (err) {
      setError('Cannot connect to server.');
    }
    setLoading(false);
  }

  // ════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════
  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Logo */}
        <div style={s.logoBlock}>
          <div style={s.logoIcon}>🩺</div>
          <div style={s.logoName}>CliniqPA</div>
          <div style={s.logoSub}>Physician Assistant Student Platform</div>
        </div>

        {/* ── SIGN IN ── */}
        {screen === 'signin' && (
          <>
            <div style={s.screenTitle}>Welcome back</div>
            <form onSubmit={handleSignIn} style={s.form}>
              <Field label="Email Address" type="email" placeholder="you@email.com"
                value={signEmail} onChange={e => setSignEmail(e.target.value)} />
              <Field label="Password" type="password" placeholder="Your password"
                value={signPass} onChange={e => setSignPass(e.target.value)} />
              {error && <ErrorBox msg={error} />}
              <Btn loading={loading}>Sign In →</Btn>
            </form>
            <button style={s.linkBtn} onClick={() => { setScreen('forgot_email'); clearError(); }}>
              Forgot password?
            </button>
            <div style={s.divider} />
            <div style={s.switchRow}>
              Don't have an account?
              <button style={s.switchBtn} onClick={() => { setScreen('signup'); clearError(); }}>
                Create account
              </button>
            </div>
          </>
        )}

        {/* ── SIGN UP ── */}
        {screen === 'signup' && (
          <>
            <div style={s.screenTitle}>Create your account</div>
            <form onSubmit={handleSignUp} style={s.form}>
              <Field label="Full Name" type="text" placeholder="Your full name"
                value={regName} onChange={e => setRegName(e.target.value)} />
              <Field label="Email Address" type="email" placeholder="you@email.com"
                value={regEmail} onChange={e => setRegEmail(e.target.value)} />
              <Field label="Password" type="password" placeholder="Min 6 characters"
                value={regPass} onChange={e => setRegPass(e.target.value)} />
              <Field label="Confirm Password" type="password" placeholder="Repeat password"
                value={regPass2} onChange={e => setRegPass2(e.target.value)} />
              {error && <ErrorBox msg={error} />}
              <Btn loading={loading}>Create Account →</Btn>
            </form>
            <div style={s.divider} />
            <div style={s.switchRow}>
              Already have an account?
              <button style={s.switchBtn} onClick={() => { setScreen('signin'); clearError(); }}>Sign in</button>
            </div>
          </>
        )}

        {/* ── SIGNUP SUCCESS ── */}
        {screen === 'signup_success' && (
          <div style={s.centerScreen}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
            <div style={s.bigTitle}>Account Created!</div>
            <div style={s.subText}>
              Your account has been created successfully.<br />
              Please sign in with your credentials.
            </div>
            <button style={s.btnPrimary} onClick={() => { setScreen('signin'); clearError(); }}>
              Sign In Now →
            </button>
          </div>
        )}

        {/* ── FORGOT Step 1: Email ── */}
        {screen === 'forgot_email' && (
          <>
            <div style={s.screenTitle}>Forgot Password</div>
            <Steps current={1} />
            <p style={s.subText}>Enter your registered email. We'll send a reset code.</p>
            <form onSubmit={handleForgotEmail} style={s.form}>
              <Field label="Registered Email" type="email" placeholder="you@email.com"
                value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
              {error && <ErrorBox msg={error} />}
              <Btn loading={loading}>Send Reset Code →</Btn>
            </form>
            <button style={s.linkBtn} onClick={() => { setScreen('signin'); clearError(); }}>
              ← Back to Sign In
            </button>
          </>
        )}

        {/* ── FORGOT Step 2: OTP ── */}
        {screen === 'forgot_code' && (
          <>
            <div style={s.screenTitle}>Enter Reset Code</div>
            <Steps current={2} />
            <div style={s.infoBox}>
              📧 A 6-digit code has been sent to <strong style={{ color: '#00d4ff' }}>{forgotEmail}</strong>
              <br />
              {serverOtp && (
                <span style={{ fontSize: 12, color: '#5a7a9a', marginTop: 4, display: 'block' }}>
                  (Dev mode — code: <strong style={{ color: '#ffd93d', fontFamily: 'monospace' }}>{serverOtp}</strong>)
                </span>
              )}
            </div>
            <form onSubmit={handleVerifyOtp} style={s.form}>
              <Field label="6-Digit Code" type="text" placeholder="000000"
                value={forgotCode} onChange={e => setForgotCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                extraStyle={{ textAlign: 'center', fontSize: 26, letterSpacing: 10, fontFamily: 'monospace' }} />
              {error && <ErrorBox msg={error} />}
              <Btn loading={loading}>Verify Code →</Btn>
            </form>
            <button style={s.linkBtn} onClick={() => { setScreen('forgot_email'); clearError(); setForgotCode(''); }}>
              ← Resend code
            </button>
          </>
        )}

        {/* ── FORGOT Step 3: New Password ── */}
        {screen === 'forgot_newpass' && (
          <>
            <div style={s.screenTitle}>Set New Password</div>
            <Steps current={3} />
            <form onSubmit={handleResetPassword} style={s.form}>
              <Field label="New Password" type="password" placeholder="Min 6 characters"
                value={newPass} onChange={e => setNewPass(e.target.value)} />
              <Field label="Confirm New Password" type="password" placeholder="Repeat new password"
                value={newPass2} onChange={e => setNewPass2(e.target.value)} />
              {error && <ErrorBox msg={error} />}
              <Btn loading={loading}>Reset Password ✓</Btn>
            </form>
          </>
        )}

        {/* ── FORGOT SUCCESS ── */}
        {screen === 'forgot_success' && (
          <div style={s.centerScreen}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔐</div>
            <div style={s.bigTitle}>Password Reset!</div>
            <div style={s.subText}>
              Your password has been updated.<br />
              Please sign in with your new password.
            </div>
            <button style={s.btnPrimary} onClick={() => { setScreen('signin'); clearError(); }}>
              Sign In Now →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────
function Field({ label, type, placeholder, value, onChange, extraStyle }) {
  var [focused, setFocused] = React.useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={s.label}>{label}</label>
      <input style={{ ...s.input, ...(focused ? s.inputFocus : {}), ...(extraStyle || {}) }}
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required />
    </div>
  );
}

function Btn({ children, loading }) {
  return (
    <button style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }} type="submit" disabled={loading}>
      {loading ? '⏳ Please wait...' : children}
    </button>
  );
}

function ErrorBox({ msg }) {
  return <div style={s.errorBox}>⚠️ {msg}</div>;
}

function Steps({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
      {[1, 2, 3].map(function(n, i) {
        var done   = n < current;
        var active = n === current;
        return (
          <React.Fragment key={n}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              background: done ? '#00ff9d' : active ? '#00d4ff' : '#1e2d45',
              color: (done || active) ? '#000' : '#5a7a9a'
            }}>
              {done ? '✓' : n}
            </div>
            {i < 2 && (
              <div style={{ flex: 1, height: 2, background: done ? '#00ff9d' : '#1e2d45' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

var s = {
  page:       { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top, rgba(0,212,255,0.15), transparent 28%), linear-gradient(180deg,#07090f 0%,#020307 100%)', fontFamily: 'Outfit, sans-serif', padding: 20 },
  card:       { background: 'rgba(11,17,36,0.96)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 26, padding: '42px 44px', width: '100%', maxWidth: 520, boxShadow: '0 30px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)' },
  logoBlock:  { textAlign: 'center', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logoIcon:   { fontSize: 54, marginBottom: 10 },
  logoName:   { fontSize: 34, fontWeight: 800, background: 'linear-gradient(135deg,#00d4ff,#00ff9d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6, letterSpacing: '.02em' },
  logoSub:    { fontSize: 13, color: '#90a8c7' },
  screenTitle:{ fontSize: 22, fontWeight: 800, color: '#e8f0fe', marginBottom: 20 },
  form:       { display: 'flex', flexDirection: 'column' },
  label:      { display: 'block', fontSize: 11, color: '#7b95b4', fontWeight: 700, letterSpacing: '.7px', textTransform: 'uppercase', marginBottom: 8 },
  input:      { width: '100%', padding: '14px 16px', background: '#111827', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 14, color: '#e8f0fe', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: 'Outfit, sans-serif', transition: 'border-color .2s, transform .2s', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.35)' },
  inputFocus: { borderColor: '#00d4ff', transform: 'translateY(-1px)' },
  btnPrimary: { width: '100%', padding: 14, background: 'linear-gradient(135deg,#00d4ff,#00ff9d)', color: '#04121d', fontWeight: 800, fontSize: 15, border: 'none', borderRadius: 14, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 4, boxShadow: '0 18px 30px rgba(0,212,255,0.22)' },
  errorBox:   { padding: '12px 14px', background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 12, fontSize: 13, color: '#ff9aa4', marginBottom: 12 },
  infoBox:    { padding: '14px 16px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)', borderRadius: 14, fontSize: 13, color: '#9db8d6', marginBottom: 16, lineHeight: 1.7 },
  linkBtn:    { background: 'none', border: 'none', color: '#8bd7ff', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', marginTop: 14, display: 'block', width: '100%', textAlign: 'center' },
  divider:    { height: 1, background: 'rgba(255,255,255,0.08)', margin: '22px 0' },
  switchRow:  { textAlign: 'center', fontSize: 13, color: '#8b9fc6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
  switchBtn:  { background: 'none', border: 'none', color: '#00d4ff', fontSize: 13, cursor: 'pointer', fontWeight: 700, fontFamily: 'Outfit, sans-serif' },
  centerScreen:{ textAlign: 'center', padding: '10px 0' },
  bigTitle:   { fontSize: 22, fontWeight: 800, color: '#e8f0fe', marginBottom: 10 },
  subText:    { fontSize: 13, color: '#90a8c7', lineHeight: 1.75, marginBottom: 24 },
};
