const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const verifySubscriptionMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const category = req.params.category;
        const allowedBasicSubCategories = ['punish-game', 'neutral-game', 'edgeguard-game'];

        const subscriptionDetails = await getSubscriptionDetails(userId);
        if (!subscriptionDetails) {
            return res.status(403).json({ message: 'Unauthorized access. No subscription found.' });
        }

        const { subscriptionStatus, subscriptionTier, subscriptionType, expirationDate } = subscriptionDetails;
        const expirationDateObj = new Date(expirationDate);
        const currentDate = new Date();

        if (subscriptionStatus === 'CANCELLED' && currentDate < expirationDateObj) {
            return next();
        }

        if (subscriptionStatus === 'CANCELLED' && currentDate > expirationDateObj) {
            await updateSubscriptionStatus(userId, 'EXPIRED');
            return res.status(403).json({ message: 'Unauthorized access. Subscription expired.' });
        }

        if (subscriptionStatus === 'EXPIRED' || subscriptionStatus === 'SUSPENDED') {
            return res.status(403).json({ message: 'Unauthorized access. Subscription expired or suspended.' });
        }

        if (subscriptionStatus === 'ACTIVE' && subscriptionType === 'ONE-TIME' && currentDate > expirationDateObj) {
            await updateSubscriptionStatus(userId, 'EXPIRED');
            return res.status(403).json({ message: 'Unauthorized access. One-time subscription expired.' });
        }

        if (category === 'introduction') {
            return next();
        }

        if (subscriptionTier === 'Guest') {
            return res.status(403).json({ message: 'Unauthorized access. Upgrade your subscription to view this content.' });
        }

        if (subscriptionTier === 'Basic' && !allowedBasicSubCategories.includes(category)) {
            return res.status(403).json({ message: 'Unauthorized access. Subscription tier does not allow this content.' });
        }

        next();
    } catch (error) {
        console.error('Error verifying subscription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch subscription details from DynamoDB
const getSubscriptionDetails = async (userId) => {
    const params = {
        TableName: 'SSBMF_UserSubscriptions',
        Key: { userId },
    };

    try {
        const result = await dynamoDb.get(params).promise();
        return result.Item;
    } catch (error) {
        console.error('Error fetching subscription details:', error);
        throw new Error('Failed to retrieve subscription data.');
    }
};

// Update subscription status in DynamoDB
const updateSubscriptionStatus = async (userId, newStatus) => {
    const params = {
        TableName: 'SSBMF_UserSubscriptions',
        Key: { userId },
        UpdateExpression: 'set subscriptionStatus = :s',
        ExpressionAttributeValues: { ':s': newStatus },
    };

    try {
        await dynamoDb.update(params).promise();
        console.log(`Updated subscription status to ${newStatus} for user ${userId}.`);
    } catch (error) {
        console.error('Error updating subscription status:', error);
        throw new Error('Failed to update subscription status.');
    }
};

module.exports = verifySubscriptionMiddleware;
