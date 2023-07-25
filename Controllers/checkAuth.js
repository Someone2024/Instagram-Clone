// middleware.js
const jwtController = require('./jwtController');

// Middleware function to check if the token is valid
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization; // Assuming you're sending the token in the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  try {
    // Verify the token
    const decodedToken = jwtController.verifyToken(token);

    // Attach the decoded token to the request object for use in other routes
    req.username = decodedToken.username;

    // Move to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Error while verifying token:', error);
    res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

module.exports = checkAuth
