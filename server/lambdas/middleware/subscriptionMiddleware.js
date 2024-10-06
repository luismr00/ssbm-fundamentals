const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const verifySubscriptionMiddleware = async (req, res, next) => {
    console.log('Testing serverless changes');
    try {
        const userId = req.user.sub;
        const category = req.params.category;
        const allowedBasicSubCategories = ['punish-game', 'neutral-game', 'edgeguard-game'];

        console.log('userId: ', userId);
        // console.log(typeof userId);
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
        if (subscriptionStatus === 'ACTIVE' && subscriptionType === 'ONE-TIME' && isExpired) {
            console.log('One-time subscription expired');
            await updateSubscriptionStatus(userId, 'EXPIRED');
            return res.status(403).json({ message: 'Unauthorized access. Subscription expired.' });
        }
        
        if (subscriptionStatus === 'ACTIVE' && subscriptionType === 'RECURRING' && isExpired) {
            console.log('Recurring subscription did not renew on time and is now suspended. Must cancel this subscription ASAP.'); 
            await updateSubscriptionStatus(userId, 'SUSPENDED');
            // Cancel subscription with PayPal but need to check status of cancellation with PayPal first to avoid bugs, errors, double charges, etc.
            await cancelSubscriptionWithPayPal(subscriptionDetails.paypalId);
            return res.status(403).json({ message: 'Unauthorized access. Subscription suspended. Check invoices to learn more.' });
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

const getAuthHeader = async () => {

    const BASE64_ENCODED_CLIENT_ID_AND_SECRET = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
  
    const request = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${BASE64_ENCODED_CLIENT_ID_AND_SECRET}`,
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                response_type: "id_token",
                intent: "sdk_init",
            }),
        }
    );
    const json = await request.json();
    console.log("token: ", json.access_token);
    return json.access_token;
  }

// Cancel subscription with PayPal
const cancelSubscriptionWithPayPal = async (paypalId) => {
    console.log('Cancelling subscription with PayPal:', paypalId);
    // Implement PayPal cancellation logic here
    // Check if subscription is already cancelled with PayPal before cancelling again

        try {
            // Make a GET request to the PayPal API to get subscription details
            const accessToken = await getAuthHeader();
            const response = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${paypalId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Ensure you have a valid access token
                }
            });
    
            const subscription = await response.json();
    
            // Check if the subscription is already cancelled
            if (subscription.status === 'CANCELLED') {
                console.log(`Subscription ${paypalId} is already cancelled. Status: ${subscription.status}`);
                return;
            }
            
            console.log('Subscription details:');
            console.log(subscription);
    
            // If not cancelled, proceed with cancellation logic
            // Implement PayPal cancellation logic here
    
            switch (subscription.status) {
                case 'CANCELLED':
                    console.log(`Subscription ${paypalId} is already cancelled.`);
                    // No need to cancel, proceed with the new subscription process
                    break;
                case 'EXPIRED':
                    console.log(`Subscription ${paypalId} is expired.`);
                    // No need to cancel, proceed with the new subscription process
                    break;
                default:
                    console.log(`Subscription ${paypalId} is ${subscription.status}. Cancelling...`);
                    // Proceed with cancellation logic
                    const response2 = await fetch(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${paypalId}/cancel`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    // Check if the response is not successful
                    if (!response2.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    console.log(`Subscription ${paypalId} has been cancelled.`);
                    break;
            }

        } catch (error) {
            console.error('Error checking subscription status with PayPal:', error);
            throw new Error('Failed to check subscription status with PayPal.');
        }
};

module.exports = verifySubscriptionMiddleware;
