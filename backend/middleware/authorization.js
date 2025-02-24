// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  // Get the token from the Authorization header or cookies
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    // If token verification fails, return an unauthorized response
    return res.status(401).json({ message: 'Token is not valid' });
  }
};