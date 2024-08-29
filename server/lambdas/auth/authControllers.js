const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

// Refresh idToken and accessToken using refreshToken
const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body;
    const params = {
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: process.env.CLIENT_ID,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken
        }
    };

    try {
        const data = await cognito.initiateAuth(params).promise();
        res.status(200).json(data.AuthenticationResult);
    } catch (err) {
        res.status(500).json({ message: 'Failed to refresh tokens', error: err.message });
    }
}

module.exports = {
    refreshTokens
};