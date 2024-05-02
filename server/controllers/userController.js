// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const asyncHandler = require('express-async-handler')
const User = require('../models/users');

// // @desc    Register new user
// // @route   POST /api/users
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body

//   if (!name || !email || !password) {
//     res.status(400)
//     throw new Error('Please add all fields')
//   }

// // Check if user exists
// const userExists = await User.findOne({ email })

//   if (userExists) {
//     res.status(400)
//     throw new Error('User already exists')
// }

// // Hash password
// const salt = await bcrypt.genSalt(10)
// const hashedPassword = await bcrypt.hash(password, salt)

// // Create user
// const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
// })

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid user data')
//   }
// })

// // @desc    Authenticate a user
// // @route   POST /api/users/login
// // @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body

//   // Check for user email
//   const user = await User.findOne({ email })

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid credentials')
//   }
// })

// // @desc    Get user data
// // @route   GET /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user)
// })

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   })
// }

//--------------------------------------------

// Write a post request to register a new user based on the user schema above.
const registerUser = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        profilePicture,
        plan,
        subscription,
        subscriptionStartDate,
        subscriptionEndDate,
        subscriptionStatus,
        subscriptionPaymentGateway,
        subscriptionPaymentId,
        emailVerified,
        deviceIdentifiers,
        accountActivated,
        accountLocked,
        securityQuestions,
        promotion,
        promotionType,
        promotionDuration,
        promotionExpirationDate,
        promotionPromoCode
    } = req.body;

    try {
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            profilePicture,
            plan,
            subscription,
            emailVerified,
            deviceIdentifiers,
            accountActivated,
            accountLocked,
            securityQuestions,
            promotion,
        });

        res.status(201).json({success: true, data: user});
    } catch (error) {
        res.status(400).json({success: false, message: error.message });
    }
}

module.exports = {
    registerUser,
};





const getUserSubscriptions = async (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    try {
        // Retrieve the user document from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the subscription details from the user document
        const subscriptions = user.subscription;

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    registerUser,
    getUserSubscriptions,
    // loginUser,
    // getMe,

}