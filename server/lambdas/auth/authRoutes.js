const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');

router.post('/refresh-tokens', authControllers.refreshTokens);

module.exports = router;

