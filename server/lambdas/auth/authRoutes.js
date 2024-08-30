const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');

// router.post('/refresh-tokens', authControllers.refreshTokens);
router.post('/set-cookies', authControllers.setCookies);
router.get('/refresh-tokens', authControllers.refreshTokens);
router.get('/remove-cookies', authControllers.removeCookies);
router.get('/check-session', authControllers.checkSession);

module.exports = router;

