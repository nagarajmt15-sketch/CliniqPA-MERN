const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Token Generate seiyum function
const generateToken = function(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Controller
const register = async function(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // User-ai create seiyum pothu model-il ulla 'pre-save' trigger aagum
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      progress: user.progress,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
const login = async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // matchPassword method-ai call seiyum
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        progress: user.progress,
        caseHistory: user.caseHistory,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
const getMe = async function(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe };