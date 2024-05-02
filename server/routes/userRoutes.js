const express = require('express')
const router = express.Router()
const {
  registerUser,
  getUserSubscriptions,
//   loginUser,
//   getMe,
} = require('../controllers/userController')

router.post('/register', registerUser)
router.get('/subscription/:userId', getUserSubscriptions)
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)

module.exports = router