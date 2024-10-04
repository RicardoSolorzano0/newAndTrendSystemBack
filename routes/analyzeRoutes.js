const express = require('express');
const { analyzeSentiment } = require('../controllers/analyzeController');
// const { protect } = require('../middleware/authMiddleware'); // Middleware de autenticación
const router = express.Router();

router.post('/', analyzeSentiment);

module.exports = router;