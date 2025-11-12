const express = require('express');
const { generateImage } = require('../controllers/imageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', authMiddleware, generateImage);

module.exports = router;

