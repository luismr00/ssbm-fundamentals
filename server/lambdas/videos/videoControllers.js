const dynamoDb = require('../db/dynamodb');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const getMetadata = async (req, res) => {
    // console.log('getMetadata............');
    // console.log(req.params);
    let { category } = req.params;

    category = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // console.log('category: ', category);

    const params = {
        TableName: process.env.VIDEOS_TABLE,
        FilterExpression: 'category = :categoryValue',
        ExpressionAttributeNames: {
            '#ID': 'id',
            '#NAME': 'name',
            '#SR': 'subscription_requirement',
            '#URI': 'uri',
            '#CATEGORY': 'category'
        },
        ExpressionAttributeValues: {
            ':categoryValue': category, // Directly provide the value
        },
        ProjectionExpression: '#ID, #NAME, #SR, #URI, #CATEGORY'
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        // console.log(data);
        res.status(200).json(data.Items);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get video metadata', error: err.message });
    }
}

const getVideo = async (req, res) => {

    const { id } = req.params;

    const params = {
        TableName: process.env.VIDEOS_TABLE,
        Key: {
            id: id
        }
    };

    try {
        const data = await dynamoDb.get(params).promise();
        const video = data.Item;

        // console.log(video);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // generate presigned url but parse the video object uri to get the s3 bucket name and key
        const { uri } = video;
        const uriParts = uri.split('/');
        const bucketName = uriParts[2].split('.')[0];
        const objectKey = uriParts.slice(3).join('/');
        const url = generatePresignedUrl(bucketName, objectKey, 60 * 3); // 3 minutes expiration

        res.status(200).json({ message: 'Video found', video_link: url });

    } catch (err) {
        res.status(500).json({ message: 'Failed to...', error: err.message });
    }
}

const generatePresignedUrl = (bucketName, objectKey, expiresInSeconds) => {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: expiresInSeconds
    };
  
    return s3.getSignedUrl('getObject', params);
};

const test = async (req, res) => {
    //get all params
    const params = req.params;
    console.log(params);
    res.status(200).json({ message: 'Test successful' });
}

// module.exports = { getMetadata };
module.exports = { getMetadata, getVideo };
// module.exports = { test };
