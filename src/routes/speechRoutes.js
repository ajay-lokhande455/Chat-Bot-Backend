const express = require('express');
const { transcribeSpeech } = require('../controllers/speechController');
const router = express.Router();

router.post('/transcribe', transcribeSpeech);

module.exports = router;