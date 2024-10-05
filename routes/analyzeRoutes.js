const express = require('express');
const { analyzeSentiment } = require('../controllers/analyzeController');
const router = express.Router();

router.post('/', analyzeSentiment);

module.exports = router;