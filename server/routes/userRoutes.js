const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware');

const {
  registerUser,
  getUserSubscriptions,
  loginUser,
  getUserSessionInfo,
  logoutUser,
//   getMe,
} = require('../controllers/userController')

router.get('/checkSignInStatus', getUserSessionInfo);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/subscription/:userId', protect, getUserSubscriptions);
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)

module.exports = router