const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const verifySubscriptionMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const category = req.params.category;
        const allowedBasicSubCategories = ['punish-game', 'neutral-game', 'edgeguard-game'];

        console.log('userId: ', userId);
        console.log(typeof userId);
        console.log('category: ', category);

        if (category === 'introduction') {
            return next();
        }

        const subscriptionDetails = await getSubscriptionDetails(userId);
        if (!subscriptionDetails) {
            return res.status(403).json({ message: 'Unauthorized access. No subscription found.' });
        }

        const { subscriptionStatus, subscriptionTier, subscriptionType, expirationDate } = subscriptionDetails;
        // const expirationDateObj = new Date(expirationDate);
        // const currentDate = new Date();

        const isExpired = checkExpiration(expirationDate);        

        if (subscriptionStatus === 'CANCELLED' && !isExpired) {
            return next();
        }   

        if (subscriptionStatus === 'CANCELLED' && isExpired) {
            await updateSubscriptionStatus(userId, 'EXPIRED');
            return res.status(403).json({ message: 'Unauthorized access. Subscription expired.' });
        }

        if (subscriptionStatus === 'EXPIRED' || subscriptionStatus === 'SUSPENDED') {
            return res.status(403).json({ message: 'Unauthorized access. Subscription expired or suspended.' });
        }

        // Keep this commented out for now in case its needed later
        // if (subscriptionStatus === 'ACTIVE' && subscriptionType === 'ONE-TIME' && isExpired) {
        if (subscriptionStatus === 'ACTIVE' && isExpired) {
            await updateSubscriptionStatus(userId, 'EXPIRED');
            return res.status(403).json({ message: 'Unauthorized access. Subscription expired. Check your invoices to learn more.' });
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

// Check if subscription has expired
// Giving a grace period of 1 day after expiration for paypal to process the payment before updating status to EXPIRED or CANCELLED
const checkExpiration = (exp) => {
    const currentDate = new Date();
    const [year2, month2, day2] = exp.split('-').map(Number);
    let expirationDate = new Date(year2, month2 - 1, day2);
    expirationDate.setDate(expirationDate.getDate() + 1);
    console.log(currentDate, expirationDate);
    return currentDate > expirationDate;
}

// Fetch subscription details from DynamoDB
const getSubscriptionDetails = async (userId) => {
    const params = {
        TableName: 'SSBMF_UserSubscriptions',
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    console.log("Checking subscription details for user: ", userId);

    try {
        const result = await dynamoDb.scan(params).promise();
        if (result.Items.length === 0) {
            throw new Error(`No subscription found for user ${userId}.`);
        }
        return result.Items[0];
    } catch (error) {
        console.error('Error fetching subscription details:', error);
        throw new Error('Failed to retrieve subscription data.');
    }
};

// Update subscription status in DynamoDB
const updateSubscriptionStatus = async (userId, newStatus) => {
    const params = {
        TableName: 'SSBMF_UserSubscriptions',
        Key: { 
            userId: userId 
        },
        UpdateExpression: 'SET subscriptionStatus = :s',
        ExpressionAttributeValues: { 
            ':s': newStatus 
        },
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
