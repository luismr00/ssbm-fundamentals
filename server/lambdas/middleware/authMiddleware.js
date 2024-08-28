const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const parts = authHeader.split(' ');
  const bearerIndex = parts.findIndex(part => part === 'Bearer');
  const token = parts[bearerIndex + 1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
