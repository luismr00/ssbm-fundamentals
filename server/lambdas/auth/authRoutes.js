const express = require('express');
const router = express.Router();
const authControllers = require('./authControllers');

// router.post('/refresh-tokens', authControllers.refreshTokens);
router.post('/set-cookies', authControllers.setCookies);
router.get('/remove-cookies', authControllers.removeCookies);
router.get('/check-session', authControllers.checkSession);
router.get('/refresh', authControllers.refreshCookies);

module.exports = router;

