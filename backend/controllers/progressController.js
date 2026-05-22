const User = require('../models/User');

const saveCaseResult = async function(req, res) {
  const caseId = req.body.caseId;
  const caseTitle = req.body.caseTitle;
  const score = req.body.score;
  const totalSteps = req.body.totalSteps;
  try {
    const user = await User.findById(req.user._id);
    user.caseHistory.push({
      caseId: caseId,
      caseTitle: caseTitle,
      score: score,
      totalSteps: totalSteps
    });
    user.progress.casesCompleted += 1;
    user.progress.xpPoints += Math.round(score * 10);
    user.progress.lastActive = Date.now();
    const total = user.caseHistory.reduce(function(sum, c) { return sum + c.score; }, 0);
    user.progress.totalScore = Math.round(total / user.caseHistory.length);
    await user.save();
    res.json({ message: 'Saved!', progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgress = async function(req, res) {
  try {
    const user = await User.findById(req.user._id).select('progress caseHistory');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveCaseResult: saveCaseResult, getProgress: getProgress };