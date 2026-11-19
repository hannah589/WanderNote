// File: src/middleware/auth.js
// this  will check if we have a token in the header or not, pass back messages 
// We require jsonwebtoken and our JWT secret for this to work

// import JWT and our config
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// create our export function.
// middleware functions has 3 parameters.
// Request, response and next
// All middleware must have the next parameter
module.exports = function (req, res, next ) {
  // Get the token from the header.
  const token = req.header('x-auth-token');
  // log out the token
  console.log(`Token in middleware: ${token}`);
  // if no token, send user is not authorized = 401 error
  if(!token) {
    // if there is no token, send that the user is not authorized for this route
    return res.status(401).json({ msg: 'No token! Authorization is denied'});
  }

  // If we have a token, verify with jwt.verify() method.
  // This method take in 2 parameters. Token & secret.

  try {
    console.log('Decoding token....');
    //decode token
    const decoded = jwt.verify(token, config.auth.jwtSecret);
    console.log("DECODED TOKEN:", decoded);
    req.user = decoded.user;
    console.log("REQ.USER:", req.user);
    //call the next middleware
    // if missing will terminate here
    next();
  } catch (err) {
    // Catch any errors
    res.status(401).json({ msg: 'Invalid Token'});
  }
}
// NOTE: status 401 = unauthorized
// Status  418.