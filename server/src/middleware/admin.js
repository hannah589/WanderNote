// Middleware file to test if user is an admin
// This will help secure routes for admin only access.

function admin(req, res, next){
  //check if user is logged in
  console.log(req.user);

  if(!req.user.isAdmin){
    return res.status(403).json({ msg: 'Access Denied'});//return error if not admin
  }
  next();//continue to next middleware
}

// Export the admin middleware.
module.exports = admin;