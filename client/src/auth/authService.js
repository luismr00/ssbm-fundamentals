import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, ResendConfirmationCodeCommand, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
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
      sessionStorage.setItem("UID", AuthenticationResult.IdToken || '');
      sessionStorage.setItem("ATK", AuthenticationResult.AccessToken || '');
      sessionStorage.setItem("NXT", AuthenticationResult.RefreshToken || '');
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

// assign the user to a group after sign up
// export const addUserToGuestGroup = async (username) => {
//     console.log("Adding user to group");
//     console.log("Username: ", username);
//     console.log("User pool ID: ", awsConfig.userPoolId);
//     const params = {
//       GroupName: "Guest",
//       UserPoolId: awsConfig.userPoolId,
//       Username: username,
//     };

//     try {
//       const command = new AdminAddUserToGroupCommand(params);
//       const response = await cognitoClient.send(command);
//       console.log("User added to group successfully");
//       return response;
//     } catch (error) {
//       console.error("Error adding user to group: ", error);
//       throw error;
//     }

// };

export const resendConfirmationCode = async (username) => {
    
    const command = new ResendConfirmationCodeCommand({
      ClientId: awsConfig.clientId,
      Username: username,
    });

    try {
      await cognitoClient.send(command);
      console.log("Confirmation code resent successfully");
      return true;
    } catch (error) {
      console.error("Error resending confirmation code: ", error);
      throw error;
    }
    
};

// export const parseJwt = (token) => {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// }