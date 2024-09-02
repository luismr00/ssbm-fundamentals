const express = require('express');
const router = express.Router();
const userControllers = require('./userControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/subscribe', userControllers.addUserToGroup);
router.delete('/unsubscribe', userControllers.removeUserFromGroup);
router.get('/getuser', userControllers.getUserData);
router.post('/edituser', userControllers.editUserData);
router.put('/change-password', userControllers.changeUserPassword);
router.post('/forgot-password', userControllers.forgotPassword);
router.put('/confirm-forgot-password', userControllers.confirmForgotPassword);
router.put('/editemail', userControllers.editUserEmail);
router.post('/verify-confirmation-code', userControllers.sendVerificationCode);

module.exports = router;