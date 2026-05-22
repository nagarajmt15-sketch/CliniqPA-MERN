// backend/server.js — COMPLETE FIXED VERSION
// Ctrl+A → Delete → Paste this entire file

const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

dotenv.config();

const app = express();

// 🔥 FIXED: Allowed all origins to fix Vercel Frontend to Render Backend connection issue
app.use(cors());
app.use(express.json());

// ── MongoDB Connect ──────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(function() { console.log('MongoDB Connected'); })
  .catch(function(err) { console.log('MongoDB Error:', err.message); });

// ── User Schema ──────────────────────────────────────────────
var userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  progress: {
    casesCompleted: { type: Number, default: 0 },
    totalScore:     { type: Number, default: 0 },
    streak:         { type: Number, default: 0 },
    xpPoints:       { type: Number, default: 0 },
    lastActive:     { type: Date, default: Date.now }
  },
  caseHistory: [{
    caseId:      String,
    caseTitle:   String,
    score:       Number,
    totalSteps:  Number,
    completedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// ── Password hash — NO 'next' parameter (Mongoose 7+ style) ──
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// ── Compare password ─────────────────────────────────────────
userSchema.methods.matchPassword = async function(entered) {
  return bcrypt.compare(entered, this.password);
};

var User = mongoose.model('User', userSchema);

// ── Generate JWT ─────────────────────────────────────────────
function generateToken(id) {
  return jwt.sign(
    { id: id },
    process.env.JWT_SECRET || 'cliniqpa_secret_2024',
    { expiresIn: '30d' }
  );
}

// ── Auth Middleware ──────────────────────────────────────────
function protect(req, res, next) {
  var auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized — no token' });
  }
  try {
    var decoded = jwt.verify(
      auth.split(' ')[1],
      process.env.JWT_SECRET || 'cliniqpa_secret_2024'
    );
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized — invalid token' });
  }
}

// ══════════════════════════════════════════════════════════════
// AUTH ROUTES
// ══════════════════════════════════════════════════════════════

// ── REGISTER ─────────────────────────────────────────────────
app.post('/api/auth/register', async function(req, res) {
  var name     = (req.body.name     || '').trim();
  var email    = (req.body.email    || '').trim().toLowerCase();
  var password = (req.body.password || '');

  // Validation
  if (!name)              return res.status(400).json({ message: 'Name is required.' });
  if (!email)             return res.status(400).json({ message: 'Email is required.' });
  if (!email.includes('@')) return res.status(400).json({ message: 'Enter a valid email address.' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });

  try {
    var exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ message: 'This email is already registered. Please sign in.' });
    }

    var user = await User.create({ name, email, password });

    res.status(201).json({
      _id:         user._id,
      name:        user.name,
      email:       user.email,
      progress:    user.progress,
      caseHistory: [],
      token:       generateToken(user._id)
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'This email is already registered. Please sign in.' });
    }
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ── LOGIN ─────────────────────────────────────────────────────
app.post('/api/auth/login', async function(req, res) {
  var email    = (req.body.email    || '').trim().toLowerCase();
  var password = (req.body.password || '');

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'No account found with this email. Please sign up first.' });
    }

    var match = await user.matchPassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Wrong password. Please try again.' });
    }

    res.json({
      _id:         user._id,
      name:        user.name,
      email:       user.email,
      progress:    user.progress,
      caseHistory: user.caseHistory,
      token:       generateToken(user._id)
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ── GET MY PROFILE ────────────────────────────────────────────
app.get('/api/auth/me', protect, async function(req, res) {
  try {
    var user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── SAVE PROGRESS ─────────────────────────────────────────────
app.post('/api/progress/save', protect, async function(req, res) {
  try {
    var user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.caseHistory.push({
      caseId:      req.body.caseId,
      caseTitle:   req.body.caseTitle,
      score:       req.body.score,
      totalSteps:  req.body.totalSteps
    });

    user.progress.casesCompleted += 1;
    user.progress.xpPoints += Math.round((req.body.score || 0) * 10);
    user.progress.lastActive = Date.now();

    var total = user.caseHistory.reduce(function(sum, c) { return sum + c.score; }, 0);
    user.progress.totalScore = Math.round(total / user.caseHistory.length);

    await user.save();
    res.json({ message: 'Progress saved!', progress: user.progress });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET PROGRESS ──────────────────────────────────────────────
app.get('/api/progress', protect, async function(req, res) {
  try {
    var user = await User.findById(req.userId).select('progress caseHistory');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── LEADERBOARD ───────────────────────────────────────────────
app.get('/api/users/leaderboard', async function(req, res) {
  try {
    var users = await User.find({})
      .select('name progress')
      .sort({ 'progress.xpPoints': -1 })
      .limit(50);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE USER (admin use) ───────────────────────────────────
app.delete('/api/users/:email', async function(req, res) {
  try {
    var result = await User.deleteOne({ email: req.params.email.toLowerCase() });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'User deleted: ' + req.params.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── HEALTH CHECK ──────────────────────────────────────────────
app.get('/', function(req, res) {
  res.json({
    status: 'CliniqPA API Running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    time: new Date().toISOString()
  });
});

// Temporary OTP store
var otpStore = {};

// ── SEND OTP (Forgot Password Step 1) ────────────────────────
app.post('/api/auth/forgot-password', async function(req, res) {
  var email = (req.body.email || '').trim().toLowerCase();
  console.log('📧 Forgot password request for:', email);
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email.' });
    }

    var otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('✅ Generated OTP for', email, ':', otp);

    otpStore[email] = {
      otp:     otp,
      expires: Date.now() + 10 * 60 * 1000
    };

    res.json({
      message: 'OTP generated',
      otp:     otp,
      name:    user.name
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ── VERIFY OTP (Step 2) ─────────────────────────────────────
app.post('/api/auth/verify-otp', async function(req, res) {
  var email = (req.body.email || '').trim().toLowerCase();
  var otp   = (req.body.otp   || '').trim();

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  var stored = otpStore[email];
  if (!stored) {
    return res.status(400).json({ message: 'OTP not found. Please request a new one.' });
  }

  if (Date.now() > stored.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }

  res.json({ message: 'OTP verified successfully!' });
});

// ── VERIFY OTP + RESET PASSWORD (Step 2+3) ───────────────────
app.post('/api/auth/reset-password', async function(req, res) {
  var email       = (req.body.email       || '').trim().toLowerCase();
  var otp         = (req.body.otp         || '').trim();
  var newPassword = (req.body.newPassword || '');

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'All fields required.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  var stored = otpStore[email];
  if (!stored) {
    return res.status(400).json({ message: 'OTP expired or not found. Please request a new one.' });
  }

  if (Date.now() > stored.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }

  try {
    var user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.password = newPassword;
    await user.save();

    delete otpStore[email];
    res.json({ message: 'Password reset successfully! Please sign in.' });

  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ── START ─────────────────────────────────────────────────────
var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('Server running → http://localhost:' + PORT);
});
