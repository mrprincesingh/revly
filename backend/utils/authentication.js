const jwt = require('jsonwebtoken');

const invalidatedTokens = [];
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded User:', decoded);
    next();
  } catch (error) {
    console.error('Token Verification Failed:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }

    return res.status(401).json({ error: 'Token is not valid' });
  }
};



module.exports = { authenticate, invalidatedTokens };

