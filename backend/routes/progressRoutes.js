const express = require('express');
const router = express.Router();
const { saveCaseResult, getProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.post('/save', protect, saveCaseResult);
router.get('/', protect, getProgress);

module.exports = router;