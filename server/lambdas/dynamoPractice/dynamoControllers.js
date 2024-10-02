const dynamoDB = require('../db/dynamodb');
const AWS = require('aws-sdk');
const TABLE_NAME = process.env.DYNAMODB_PRACTICE_TABLE;

// Create item
const createItem = async (req, res) => {
    const { id, name, age } = req.body;
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: id,
            name: name,
            age: age
        }
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(200).json({ message: 'Item created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get item
const getItem = async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
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
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #name = :name, age = :age',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: { ':name': name, ':age': age },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const result = await dynamoDB.update(params).promise();
        res.status(200).json({ message: 'Item updated', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

// Delete item
const deleteItem = async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    };

    try {
        await dynamoDB.delete(params).promise();
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter items by exact attribute value (using Scan with Filters)
// const filterItems = async (req, res) => {
//     const { age } = req.body;
//     const params = {
//         TableName: TABLE_NAME,
//         FilterExpression: '#age = :age',
//         ExpressionAttributeNames: { '#age': 'age' },
//         ExpressionAttributeValues: { ':age': age }
//     };

//     try {
//         const data = await dynamoDB.scan(params).promise();
//         res.status(200).json(data.Items);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Filter items by more than attribute value (using Scan with Filters)
const filterItems = async (req, res) => {
    const { age } = req.body;
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: '#age > :age',
        ExpressionAttributeNames: { '#age': 'age' },
        ExpressionAttributeValues: { ':age': age }
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    filterItems
};