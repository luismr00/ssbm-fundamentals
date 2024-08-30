// const AWS = require('aws-sdk');
// const cognito = new AWS.CognitoIdentityServiceProvider();
// const jwt = require('jsonwebtoken');
const { parse } = require('cookie');

const isDevelopment = process.env.NODE_ENV !== 'production';
// console.log('isDevelopment:', isDevelopment);

// Set cookies with idToken, accessToken, and refreshToken
const setCookies = async (req, res) => {
    const { idToken, accessToken, refreshToken } = req.body;

    console.log('isDevelopment:', isDevelopment);

    if(!idToken || !accessToken || !refreshToken) {
        return res.status(400).json({ message: 'Missing tokens' });
    }

    // res.cookie('idToken', idToken, { 
    //     // set maxAge to 5 minutes for testing purposes
    //     maxAge: 300000,
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: 'None',
    //     path: '/'
    // });

    // res.cookie('accessToken', accessToken, { 
    //     maxAge: 300000,
    //     httpOnly: true,
    //     secure: !isDevelopment,
    //     sameSite: !isDevelopment ? 'lax' : 'strict',
    //     path: '/'
    // });

    // res.cookie('refreshToken', refreshToken, { 
    //     //set maxAge to 1 hour
    //     maxAge: 3600000,
    //     httpOnly: true,
    //     secure: !isDevelopment,
    //     sameSite: !isDevelopment ? 'lax' : 'strict',
    //     path: '/'
    // });

    // Consistent cookie settings
    const cookieOptions = {
        httpOnly: true,
        path: '/',                // Ensures cookie is available site-wide
        maxAge: 300000            // 5 minutes for testing purposes
    };

    res.cookie('idToken', idToken, cookieOptions);
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 3600000 }); // 1 hour for refreshToken
    
    res.status(200).json({ message: 'Cookies set successfully' });
}

const checkSession = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    } else {
        return res.status(200).json({ message: 'Session active' });
    }
}


const refreshTokens = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const newTokens = await refreshTokens(refreshToken);

        // Set new tokens as cookies
        res.cookie('accessToken', newTokens.accessToken, {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: !isDevelopment ? 'lax' : 'strict'
        });

        res.cookie('idToken', newTokens.idToken, {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: !isDevelopment ? 'lax' : 'strict'
        });

        return res.status(200).json({ message: 'Token refreshed' });
    } catch (err) {
        return res.status(401).json({ message: 'Refresh token expired, please log in again' });
    }
}

const removeCookies = async (req, res) => {
    res.clearCookie('idToken');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Cookies removed successfully' });
}

// // Refresh idToken and accessToken using refreshToken
// const refreshTokens = async (req, res) => {
//     const { refreshToken } = req.body;
//     const params = {
//         AuthFlow: 'REFRESH_TOKEN_AUTH',
//         ClientId: process.env.CLIENT_ID,
//         AuthParameters: {
//             REFRESH_TOKEN: refreshToken
//         }
//     };

//     try {
//         const data = await cognito.initiateAuth(params).promise();
//         res.status(200).json(data.AuthenticationResult);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to refresh tokens', error: err.message });
//     }
// }

module.exports = {
    refreshTokens,
    setCookies,
    removeCookies,
    checkSession
};