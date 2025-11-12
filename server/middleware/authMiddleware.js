const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('=== Auth Middleware ===');
  console.log('Request path:', req.path);
  console.log('Request method:', req.method);
  console.log('Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
  
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Auth middleware: No authorization header found');
    console.log('All headers:', Object.keys(req.headers));
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    console.error('Auth middleware: Authorization header does not start with "Bearer "');
    console.log('Header value:', authHeader.substring(0, 20) + '...');
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token extracted:', token ? `${token.substring(0, 20)}...` : 'Empty');
  console.log('Token length:', token?.length || 0);

  if (!process.env.JWT_SECRET) {
    console.error('Auth middleware: JWT_SECRET is not configured');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  console.log('JWT_SECRET present:', process.env.JWT_SECRET ? 'Yes' : 'No');
  console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length || 0);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified successfully');
    console.log('Decoded user ID:', decoded.id);
    console.log('Decoded user email:', decoded.email);
    req.user = decoded;
    return next();
  } catch (error) {
    console.error('=== Token Verification Failed ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.name === 'JsonWebTokenError') {
      console.error('JWT Error: Token is malformed or signature is invalid');
    } else if (error.name === 'TokenExpiredError') {
      console.error('JWT Error: Token has expired');
      console.error('Expired at:', error.expiredAt);
    } else if (error.name === 'NotBeforeError') {
      console.error('JWT Error: Token not active yet');
    }
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

