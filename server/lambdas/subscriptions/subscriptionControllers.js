const e = require('express');
const dynamoDB = require('../db/dynamodb');
const TABLE_NAME = process.env.USERSUBSCRIPTIONS_TABLE;

// Create item
const createSubscription = async (req, res) => {
    const id = req.user.sub;
    const { createdDate, expirationDate, paypalId, paymentSource, subscriptionStatus, subscriptionTier, subscriptionType } = req.body;

    const params = {
        TableName: TABLE_NAME,
        Item: {
            userId: id,
            createdDate,
            expirationDate,
            paypalId,
            paymentSource,
            subscriptionStatus,
            subscriptionTier,
            subscriptionType
        }
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(200).json({ message: 'Item created successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get item
const getSubscription = async (req, res) => {
    const userId = req.user.sub;
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId: userId
        }
    };

    try {
        const data = await dynamoDB.get(params).promise();
        if (!data.Item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(data.Item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Updates item on all attributes you pass in the request body
// const updateItem = async (req, res) => {
//     const userId = req.user.sub;
//     const { id } = req.params;
//     const { name, age } = req.body;

//     const params = {
//         TableName: TABLE_NAME,
//         Key: { id },
//         UpdateExpression: 'set #name = :name, age = :age',
//         ExpressionAttributeNames: { '#name': 'name' },
//         ExpressionAttributeValues: { ':name': name, ':age': age },
//         ReturnValues: 'UPDATED_NEW'
//     };

//     try {
//         const result = await dynamoDB.update(params).promise();
//         res.status(200).json({ message: 'Item updated', result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Update item with conditional expressions
// const updateItem = async (req, res) => {
//     const { id } = req.params;
//     const { name, age } = req.body;

//     let UpdateExpression = 'set';
//     const ExpressionAttributeNames = {};
//     const ExpressionAttributeValues = {};

//     if (name !== undefined) {
//         UpdateExpression += ' #name = :name,';
//         ExpressionAttributeNames['#name'] = 'name';
//         ExpressionAttributeValues[':name'] = name;
//     }

//     if (age !== undefined) {
//         UpdateExpression += ' age = :age,';
//         ExpressionAttributeValues[':age'] = age;
//     }

//     // Remove trailing comma from UpdateExpression
//     UpdateExpression = UpdateExpression.slice(0, -1);

//     const params = {
//         TableName: TABLE_NAME,
//         Key: { id },
//         UpdateExpression,
//         ExpressionAttributeValues,
//         ReturnValues: 'UPDATED_NEW'
//     };

//     // Conditionally add ExpressionAttributeNames if it is not empty
//     if (Object.keys(ExpressionAttributeNames).length > 0) {
//         params.ExpressionAttributeNames = ExpressionAttributeNames;
//     }

//     try {
//         const result = await dynamoDB.update(params).promise();
//         res.status(200).json({ message: 'Item updated', result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const getAuthHeader = async () => {
    // console.log(process.env.PAYPAL_CLIENT_ID);
    // console.log(process.env.PAYPAL_CLIENT_SECRET);
    // To base64 encode your client id and secret using NodeJs
    const BASE64_ENCODED_CLIENT_ID_AND_SECRET = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
  
    // console.log(BASE64_ENCODED_CLIENT_ID_AND_SECRET);
  
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
    return json.access_token;
  }

const cancelPaypalSubscription = async (req, res) => {
    const { subscriptionId } = req.body;
  
    try {
        const accessToken = await getAuthHeader();
        const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
  
        console.log("Cancellation initiated");
  
        // Keeping this as a reference just in case
        // Check if the response body is empty
        // const text = await response.text();
        // if (!text) {
        //     console.log("Empty response body");
        //     return res.status(200).json({ status: 'Cancellation initiated' });
        // }
  
        // const data = await response.json();
        // console.log(data);
        // res.status(200).json({ status: data.status });

        // Check if the response is not successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
    } catch (error) {
        throw new Error("Failed to cancel PayPal subscription: " + error.message);
    }
  }

  const setDatabaseAttrToCancel = async (req, res) => {
    // Set the subscriptionStatus to CANCELLED on dynamoDB
    const userId = req.user.sub;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId
        },
        UpdateExpression: 'set subscriptionStatus = :status',
        ExpressionAttributeValues: {
            ':status': 'CANCELLED'
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        await dynamoDB.update(params).promise();
        // res.status(200).json({ message: 'Subscription cancelled' });
    } catch (error) {
        throw new Error("Failed to set subscription status in DynamoDB: " + error.message);
    }
}

const cancelSubscription = async (req, res) => {

    try {
        // Cancel the subscription on PayPal first
        await cancelPaypalSubscription(req, res);
        console.log("Paypal subscription cancelled");
        // Set the subscriptionStatus to CANCELLED on dynamoDB
        await setDatabaseAttrToCancel(req, res);
        console.log("Database attribute set to CANCELLED");
    
        // Send a response to the client
        res.status(200).json({ message: 'Subscription cancelled' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    createSubscription,
    getSubscription,
    cancelSubscription,
    // updateItem,
    // filterItems
};