// File: src/middleware/admin.js
// Middleware file to test for admin users.
// This will help secure routes for admin only access.

// Create our middleware function.
// Remember we need, req, res and next.

function admin(req, res, next){
  // Check to see if the user is an admin
  // Check req.user.
  // This was set by the auth middleware using the decoded token.
  // This middleware need to run after the auth middle.
  console.log(req.user);
  if(!req.user.isAdmin){
    return res.status(403).json({ msg: 'Access Denied'});
    // 401 = unauthorized - No valid token
    // 403 = forbidden- valid token, insufficient privileges
  }
  // Run the next piece of middleware
  next();
}

// Export the admin middleware.
module.exports = admin;