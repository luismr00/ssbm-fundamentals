const awsConfig = {
    region: process.env.REACT_APP_AWS_PROJECT_REGION,
    cognitoRegion: process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,
    clientId: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    oauth: {},
};

export default awsConfig;