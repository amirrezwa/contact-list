const jwt = require('jsonwebtoken');
const { configHelper } = require('../helpers');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    {
       return res.status(401).json({ message: 'No token provided' });
    }

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, configHelper.jwt.secrets);
    
    if (decoded.type === 'refresh') {
      return res.status(401).json({ message: 'Invalid token type. Use access token.' });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = auth;
