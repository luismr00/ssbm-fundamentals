const express = require('express');
const router = express.Router();
const videoControllers = require('./videoControllers');
const authMiddleware = require('../middleware/authMiddleware');
const subscriptionMiddleware = require('../middleware/subscriptionMiddleware');

console.log(typeof authMiddleware);
console.log(typeof subscriptionMiddleware);

// router.use(authMiddleware);

router.get('/:category/video-info', videoControllers.getMetadata);
router.get('/:category/video/:id', authMiddleware, subscriptionMiddleware, videoControllers.getVideo);
router.get('/:category/video-exception/:id', videoControllers.getVideo); // for free videos in case user hasn't logged in or registered
// router.get('/introduction/video-test', videoControllers.test);

module.exports = router;