const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

//Require the CRUD operations from the controller
const authController = require("../controllers/auth");

// import joi validations to add to routes
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validations/authValidation");

// Name: Login
// Path: /api/auth/login
// Request: POST: create jwt for logging in user
// Type: Public
// Description: This route allows a user to login
router.post("/login", validate(loginSchema), authController.login);

// Register Route
// Name: Register/ create user account
// Path: /api/auth/register
// Request: POST
// Type: Public
// Description: This route allows a user to register
router.post("/register", validate(registerSchema), authController.register);

// name: loadUser / get the user who is currently logged into the app 
// path: /api/auth
// Request: GET
// Type: private route (requires the user to be logged in)
// Description: This route will return the current logged in user.
router.get("/", auth, authController.loggedInUser);


module.exports = router;
