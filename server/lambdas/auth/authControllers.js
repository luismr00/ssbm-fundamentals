const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
// const jwt = require('jsonwebtoken');
// const { parse } = require('cookie');

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
        maxAge: 300000,           // 5 minutes for idToken and accessToken
    };

    res.cookie('UID', idToken, cookieOptions);
    res.cookie('ATK', accessToken, cookieOptions);
    res.cookie('RTK', refreshToken, { ...cookieOptions, maxAge: 3600000 }); // 1 hour for refreshToken
    
    res.status(200).json({ message: 'Cookies set successfully' });
}

const checkSession = async (req, res) => {
    const refreshToken = req.cookies.RTK;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    } else {
        return res.status(200).json({ message: 'Session active' });
    }
}

const removeCookies = async (req, res) => {
    res.clearCookie('UID');
    res.clearCookie('ATK');
    res.clearCookie('RTK');
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

const refreshCookies = async (req, res) => {
    const refreshToken = req.cookies.RTK;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided or possibly expired. Sign in back again.' });
    }

    const retryDelay = 1000; // 1 second delay
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            console.log(`Attempt ${attempt + 1} to refresh tokens`);

            // Add a delay before the first attempt (after group changes)
            if (attempt > 0) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }

            const params = {
                AuthFlow: 'REFRESH_TOKEN_AUTH',
                ClientId: process.env.COGNITO_CLIENT_ID,
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken
                }
            };

            const newTokens = await cognito.initiateAuth(params).promise();

            // Set the new tokens in cookies
            res.cookie('ATK', newTokens.AuthenticationResult.AccessToken, {
                httpOnly: true,
                path: '/',
                maxAge: 300000,  // 5 minutes
            });

            res.cookie('UID', newTokens.AuthenticationResult.IdToken, {
                httpOnly: true,
                path: '/',
                maxAge: 300000,  // 5 minutes
            });

            console.log('Tokens refreshed successfully');
            return res.status(200).json({ message: 'Tokens refreshed successfully' });

        } catch (err) {
            console.log(`Failed to refresh tokens on attempt ${attempt + 1}: `, err);

            // If max retries reached, return an error
            if (attempt + 1 === maxRetries) {
                return res.status(500).json({ message: 'Failed to refresh tokens after multiple attempts' });
            }
        }

        attempt++;
    }
};


module.exports = {
    setCookies,
    removeCookies,
    checkSession,
    refreshCookies
};