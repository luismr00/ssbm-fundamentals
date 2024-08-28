const dynamoDb = require('../db/dynamodb');
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const ses = new AWS.SES();
// const crypto = require('crypto');

// PLEASE NOTE: The username is the user's email address

// Add user to cognito user pool group
const addUserToGroup = async (req, res) => {
    const { username, groupName } = req.body;
    const params = {
        GroupName: groupName,
        UserPoolId: process.env.USER_POOL_ID,
        Username: username
    };
    
    try {
        await cognito.adminAddUserToGroup(params).promise();
        res.status(200).json({ message: 'User added to group' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add user to group', error: err.message });
    }
};    

// Remove user from cognito user pool group
const removeUserFromGroup = async (req, res) => {
    const { username, groupName } = req.body;
    const params = {
        GroupName: groupName,
        UserPoolId: process.env.USER_POOL_ID,
        Username: username
    };
    
    try {
        await cognito.adminRemoveUserFromGroup(params).promise();
        res.status(200).json({ message: 'User removed from group' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove user from group' });
    }
};

// Get user data from cognito user pool (first name, last name, email, and username)
const getUserData = async (req, res) => {
    const { username } = req.body;
    const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: username
    };
    
    try {
        const data = await cognito.adminGetUser(params).promise();
        const user = {
            firstName: data.UserAttributes.find(attr => attr.Name === 'given_name').Value,
            lastName: data.UserAttributes.find(attr => attr.Name === 'family_name').Value,
            email: data.UserAttributes.find(attr => attr.Name === 'email').Value,
            username: data.UserAttributes.find(attr => attr.Name === 'preferred_username').Value
        };
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get user data' });
    }
};

// Edit user data in cognito user pool (first name, last name, and username)
const editUserData = async (req, res) => {
    const { username, firstName, lastName } = req.body;
    const params = {
        UserAttributes: [
            { Name: 'given_name', Value: firstName },
            { Name: 'family_name', Value: lastName },
        ],
        UserPoolId: process.env.USER_POOL_ID,
        Username: username
    };
    
    try {
        await cognito.adminUpdateUserAttributes(params).promise();
        res.status(200).json({ message: 'User data updated' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user data' });
    }
};

// Edit user email in cognito user pool
const editUserEmail = async (req, res) => {
    const { username, email } = req.body;
    const params = {
        UserAttributes: [
            { Name: 'email', Value: email },
        ],
        UserPoolId: process.env.USER_POOL_ID,
        Username: username
    };
    
    try {
        await cognito.adminUpdateUserAttributes(params).promise();
        res.status(200).json({ message: 'User email updated' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user email' });
    }
};

// Send verification code to new user email for email confirmation received from request body
const sendVerificationCode = async (req, res) => {
    const { newEmail, code } = req.body;

    const params = {
        Destination: {
            ToAddresses: [newEmail], // The email address to send to
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `Your verification code is: ${code}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Your Verification Code',
            },
        },
        Source: process.env.SES_VERIFIED_EMAIL, // Your verified SES email address
    };

    try {
        await ses.sendEmail(params).promise();
        res.status(200).json({ message: 'Verification code sent' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send verification code', error: err.message });
    }
};

// Change user password in cognito user pool
const changeUserPassword = async (req, res) => {
    const { username, password } = req.body;
    const params = {
        Password: password,
        UserPoolId: process.env.USER_POOL_ID,
        Username: username
    };
    
    try {
        await cognito.adminSetUserPassword(params).promise();
        res.status(200).json({ message: 'User password changed' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to change user password' });
    }
};

// send email to user with link to reset for forgot password
const forgotPassword = async (req, res) => {
    const { username } = req.body;
    const params = {
        ClientId: process.env.CLIENT_ID,
        Username: username
    };
    
    try {
        await cognito.forgotPassword(params).promise();
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send password reset email' });
    }
};

// confirm forgot password with code and new password
const confirmForgotPassword = async (req, res) => {
    const { username, code, password } = req.body;
    const params = {
        ClientId: process.env.CLIENT_ID,
        ConfirmationCode: code,
        Password: password,
        Username: username
    };
    
    try {
        await cognito.confirmForgotPassword(params).promise();
        res.status(200).json({ message: 'Password reset confirmed' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to confirm password reset' });
    }
};

module.exports = {
    addUserToGroup,
    removeUserFromGroup,
    getUserData,
    editUserData,
    changeUserPassword,
    forgotPassword,
    confirmForgotPassword,
    editUserEmail,
    sendVerificationCode
};
    
