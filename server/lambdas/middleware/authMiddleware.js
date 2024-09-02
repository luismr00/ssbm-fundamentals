const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Configure JWKS client
const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`
});

// Function to get the signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err); // Log the error for debugging
      return callback(err);
    }
    const signingKey = key.getPublicKey() || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Helper function to check if the token is expired
// function isTokenExpired(decodedToken) {
//   const now = Math.floor(Date.now() / 1000);
//   return decodedToken.exp < now;
// }

// Function to verify the token
// function verifyToken(token, callback) {
//   jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
//     if (err) {
//       console.error('Token verification failed:', err);
//       callback(err);
//       return;
//     }
//     if (isTokenExpired(decoded)) {
//       const error = new Error('Token expired');
//       console.error('Token is expired:', error);
//       callback(error);
//       return;
//     }
//     console.log('Token is valid:', decoded);
//     callback(null, decoded);
//   });
// }

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const parts = authHeader.split(' ');
//   if (parts.length !== 2 || parts[0] !== 'Bearer') {
//     return res.status(401).json({ message: 'Invalid authorization header format' });
//   }

//   const token = parts[1];
  
//   verifyToken(token, (err, decoded) => {
//     if (err) {
//       const status = err.message === 'Token expired' ? 401 : 403; // 403 for tampering
//       return res.status(status).json({ message: err.message || 'Failed to authenticate token' });
//     }
    
//     req.user = decoded;
//     next();
//   });
// };

// Function to verify JWT using Cognito's public keys
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, {
          algorithms: ['RS256'], // Cognito uses RS256 to sign JWTs
      }, (err, decoded) => {
          if (err) {
              console.error('Token verification failed:', err); // Log the error for better visibility
              return reject(err);
          }
          resolve(decoded);
      });
  });
};

// Function to refresh tokens using Cognito's refresh token
const refreshTokens = async (refreshToken) => {
    // const refreshToken = req.cookies.refreshToken;
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    // console.log('refresh token: ', refreshToken);
    console.log('client id: ', process.env.COGNITO_CLIENT_ID);

    try {
        // const newTokens = await refreshTokens(refreshToken);
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken
            }
        };

        const newTokens = await cognito.initiateAuth(params).promise();

        console.log('Sending back tokens...')
        return newTokens;
    } catch (err) {
        console.log('failed to refresh tokens');
        console.log(err);
        return err;
    }
};

const refreshAndProceed = async (req, res, next, refreshToken) => {
    try {
      const newTokens = await refreshTokens(refreshToken);
  
      // Set the new tokens in cookies
      res.cookie('ATK', newTokens.AuthenticationResult.AccessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 300000,  // 5 minutes
      });
  
      res.cookie('UID', newTokens.AuthenticationResult.IdToken, {
        httpOnly: true,
        path: '/',
        maxAge: 300000,  // 5 minutes
      });
  
      // Proceed with the original request
      req.user = jwt.decode(newTokens.AuthenticationResult.IdToken);
      next();
    } catch (refreshError) {
      return res.status(401).json({ message: 'Session expired, please log in again' });
    }
};
  
  const verifyTokenMiddleware = async (req, res, next) => {
    const idToken = req.cookies.UID;
    const refreshToken = req.cookies.RTK;
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token found, please log in' });
    }
  
    if (!idToken) {
      // Attempt to refresh the tokens if idToken is missing
      console.log("Id token not found, attempting to refresh tokens");
      return refreshAndProceed(req, res, next, refreshToken);
    }
  
    try {
      // Attempt to verify the ID token
      const decoded = await verifyToken(idToken);
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // If the ID token is expired, attempt to refresh it
        console.log("Id token expired, attempting to refresh tokens");
        return refreshAndProceed(req, res, next, refreshToken);
      } else {
        return res.status(401).json({ message: 'Invalid token, please log in again' });
      }
    }
  };
  

// // Middleware to verify the access token and refresh if necessary
// const verifyTokenMiddleware = async (req, res, next) => {
//   const idToken = req.cookies.UID;
//   const refreshToken = req.cookies.RTK;

//   console.log('idToken: ', idToken)

//   if (!idToken) {
//       return res.status(401).json({ message: 'Id token not found' });
//   }

//   try {
//       // Verify the access token
//       const decoded = await verifyToken(idToken);
//       req.user = decoded;
//       console.log('token verified. Proceeding with the request');
//       next();
//   } catch (err) {
//       console.log('failed to verify token:', err);
//       console.log('error name:', err.name);
//       console.log("refreshing tokens now");
//       if (err.name === 'TokenExpiredError' && refreshToken) {
//           // If access token expired, try to refresh it
//           try {
//               const newTokens = await refreshTokens(refreshToken);
//             //   console.log('access token:', newTokens.AuthenticationResult.AccessToken);
//             //   console.log('id token:', newTokens.AuthenticationResult.IdToken);

//               // Set new tokens as cookies
//                 res.cookie('ATK', newTokens.AuthenticationResult.AccessToken, {
//                     httpOnly: true,
//                     path: '/',                // Ensures cookie is available site-wide
//                     maxAge: 300000,           // 5 minutes for idToken and accessToken
//                 });

//                 res.cookie('UID', newTokens.AuthenticationResult.IdToken, {
//                     httpOnly: true,
//                     path: '/',                // Ensures cookie is available site-wide
//                     maxAge: 300000,           // 5 minutes for idToken and accessToken
//                 });

//               // Proceed with the original request
//               req.user = jwt.decode(newTokens.AuthenticationResult.IdToken); // No need to verify again; decode is sufficient here
//               console.log('token verified. Proceeding with the request');
//               next();
//           } catch (refreshError) {
//               return res.status(401).json({ message: 'Refresh token expired, please log in again' });
//           }
//       } else {
//           return res.status(401).json({ message: 'Invalid token, please log in again' });
//       }
//   }
// };

module.exports = verifyTokenMiddleware;