const User = require('../models/users');
const crypto = require('crypto');

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

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isPasswordMatch = user.password === password;
        
//         if (!isPasswordMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const tempToken = crypto.randomBytes(20).toString('hex');

//         // Set the token as the userToken cookie
//         res.cookie('userToken', tempToken, {
//             maxAge: 900000, // Adjust cookie maxAge to your needs
//             httpOnly: true,
//             sameSite: 'None', // Set SameSite attribute to None
//             secure: true // Require secure connections (HTTPS)
//         });
        

//         res.status(200).json({ success: true, data: user });
//     } catch (error) {
//         res.status(500).json({ sucess: false, message: error.message });
//     }
// }

// const checkSignInStatus = (req, res) => {
//     // Check if the userToken cookie is present
//     const userToken = req.cookies.userToken;
//     try {
//         if (userToken) {
//             // User is signed in
//             res.status(200).json({ success: true, signedIn: true });
//         } else {
//             // User is not signed in
//             res.status(200).json({ success: true, signedIn: false });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// checkSignInStatus = async (req, res) => {
//     const signedIn = req.session.userId ? true : false;
//     res.json({ signedIn });
// };

// const logoutUser = async (req, res) => {
//     try {
//         // Perform any necessary logic to invalidate the user token
//         res.clearCookie('userToken');
//         res.status(200).json({success: true, message: 'User logged out successfully' });
//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = user.password === password;

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set userId in session
        req.session.userId = user._id;
        req.session.subscription = user.subscription;
        req.session.role = user.role;
        // req.session.cookie = {
        //     maxAge: 900000, // Adjust cookie maxAge to your needs
        //     httpOnly: true,
        //     sameSite: 'None', // Set SameSite attribute to None
        //     secure: true // Require secure connections (HTTPS)
        // }

        // Generate session token
        // const tempToken = crypto.randomBytes(20).toString('hex');

        // Set the session token as a cookie
        // res.cookie('sessionToken', tempToken, {
        //     maxAge: 900000, // Adjust cookie maxAge to your needs
        //     httpOnly: true,
        //     sameSite: 'None', // Set SameSite attribute to None
        //     secure: true // Require secure connections (HTTPS)
        // });

        res.status(200).json({ success: true, data: user, session: req.session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout user
const logoutUser = async (req, res) => {
    try {
        // Clear userId from session
        delete req.session.userId;

        // Clear session token cookie
        res.clearCookie('sessionToken');

        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Check user session information
const getUserSessionInfo = async (req, res) => {
    // const signedIn = await req.session.userId ? true : false;
    const session = await req.session;
    console.log(session);
    res.json({ session });
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
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getUserSessionInfo,
    logoutUser,
    getUserSubscriptions,
    // loginUser,
    // getMe,

}