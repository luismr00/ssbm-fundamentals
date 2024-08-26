import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";
// import config from "./config.json";
import awsConfig from "./aws-exports";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: awsConfig.region,
});

export const signIn = async (username, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: awsConfig.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
      sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
      sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const signOut = async () => {
    try {
        sessionStorage.clear();
        console.log("Sign out success");
        return true;
    } catch (error) {
        console.error("Error signing out: ", error);
        throw error;
    }
};

export const signUp = async (username, email, password, firstName, lastName) => {
  console.log(awsConfig.clientId);
  console.log('REACT_APP_AWS_PROJECT_REGION:', process.env.REACT_APP_AWS_PROJECT_REGION);
  console.log('REACT_APP_AWS_COGNITO_REGION:', process.env.REACT_APP_AWS_COGNITO_REGION);
  console.log('REACT_APP_AWS_USER_POOLS_ID:', process.env.REACT_APP_AWS_USER_POOLS_ID);
  console.log('REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID:', process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID);
  const params = {
    ClientId: awsConfig.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "given_name",
        Value: firstName,
      },
      {
        Name: "family_name",
        Value: lastName,
      },
      {
        Name: "preferred_username",
        Value: username,
      }
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export const confirmSignUp = async (username, code) => {
  const params = {
    ClientId: awsConfig.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};

export const resendConfirmationCode = async (username) => {
    const client = new CognitoIdentityProviderClient({
        region: awsConfig.region,
    });
  
    const command = new ResendConfirmationCodeCommand({
      ClientId: awsConfig.clientId,
      Username: username,
    });
  
    return client.send(command);
};

// export const parseJwt = (token) => {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// }