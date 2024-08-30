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
              return reject(err);
          }
          resolve(decoded);
      });
  });
};

// Function to refresh tokens using Cognito's refresh token
const refreshTokens = async (refreshToken) => {
  const client = new CognitoIdentityProviderClient({ region: 'your-region' });

  const params = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: 'your-client-id', // Your Cognito App Client ID
      AuthParameters: {
          'REFRESH_TOKEN': refreshToken
      }
  };

  const command = new InitiateAuthCommand(params);

  try {
      const response = await client.send(command);
      const newAccessToken = response.AuthenticationResult.AccessToken;
      const newIdToken = response.AuthenticationResult.IdToken;

      return { accessToken: newAccessToken, idToken: newIdToken };
  } catch (error) {
      throw new Error('Refresh token expired or invalid');
  }
};

// Middleware to verify the access token and refresh if necessary
const verifyTokenMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
      return res.status(401).json({ message: 'Access token not found' });
  }

  try {
      // Verify the access token
      const decoded = await verifyToken(accessToken);
      req.user = decoded;
      next();
  } catch (err) {
      if (err.name === 'TokenExpiredError' && refreshToken) {
          // If access token expired, try to refresh it
          try {
              const newTokens = await refreshTokens(refreshToken);

              // Set new tokens as cookies
              res.cookie('accessToken', newTokens.accessToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Strict',
              });

              res.cookie('idToken', newTokens.idToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'Strict',
              });

              // Proceed with the original request
              req.user = jwt.decode(newTokens.accessToken); // No need to verify again; decode is sufficient here
              next();
          } catch (refreshError) {
              return res.status(401).json({ message: 'Refresh token expired, please log in again' });
          }
      } else {
          return res.status(401).json({ message: 'Invalid token, please log in again' });
      }
  }
};

module.exports = verifyTokenMiddleware;