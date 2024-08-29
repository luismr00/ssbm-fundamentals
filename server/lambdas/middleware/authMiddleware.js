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
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Helper function to check if the token is expired
function isTokenExpired(decodedToken) {
  const now = Math.floor(Date.now() / 1000);
  return decodedToken.exp < now;
}

// Function to verify the token
function verifyToken(token, callback) {
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      callback(err);
      return;
    }
    if (isTokenExpired(decoded)) {
      const error = new Error('Token expired');
      console.error('Token is expired:', error);
      callback(error);
      return;
    }
    console.log('Token is valid:', decoded);
    callback(null, decoded);
  });
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization header format' });
  }

  const token = parts[1];
  
  verifyToken(token, (err, decoded) => {
    if (err) {
      const status = err.message === 'Token expired' ? 401 : 403; // 403 for tampering
      return res.status(status).json({ message: err.message || 'Failed to authenticate token' });
    }
    
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;