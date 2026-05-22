const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
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

// Pre-save Middleware: Password Hashing & Name Professionalism
userSchema.pre('save', async function(next) {
  // 1. Name-la "PA-S" suffix add pannum logic (Physician Assistant Student)
  // Student register pannum pothu name-la PA-S illana, ithu auto-ah add pannidum
  if (this.isNew || this.isModified('name')) {
    const suffix = ", PA-S";
    if (!this.name.includes(suffix)) {
      this.name = this.name + suffix;
    }
  }

  // 2. Password Hashing Logic
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password Match check seiyum method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);