// File: src/middleware/auth.js
// This file will check if we have a token or not, and pass back messages based on this
// We require jsonwebtoken and our JWT secret for this to work

// import JWT and our config
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// create our export function.
// NOTE: that unlike our endpoints, our function here has 3 parameters.
// Request, response and next
// All middle must have the next parameter
module.exports = function (req, res, next ) {
  // Get the token from the header.
  const token = req.header('x-auth-token');
  // log out the token
  console.log(`Token in middleware: ${token}`);
  // Check to see if we have a token or not
  if(!token) {
    // if there is no token, send that the user is not authorized for this route
    return res.status(401).json({ msg: 'No token! Authorization is denied'});
  }

  // If we have a token, we want to use the jwt.verify() method.
  // This method take in 2 parameters. Token, the secret.

  try {
    console.log('Decoding token....');
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    req.user = decoded.user;
    // Call the next piece of middleware.
    // Middleware can be chained and we can call as many pieces of middleware as we need.
    next();
  } catch (err) {
    // Catch any errors
    res.status(401).json({ msg: 'Invalid Token'});
    
  }
}
// NOTE: status 401 = unauthorized
// Status  418.