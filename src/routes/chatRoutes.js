const express = require('express');
const { chatWithGemini } = require('../controllers/chatControllers');
const router = express.Router();

router.post('/', chatWithGemini);

module.exports = router;
