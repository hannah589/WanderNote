// File: /src/routes/auth.js
// This file holds the routes for authentication
// It holds the routes for:
// LOGIN: /api/auth/login
// Type: public
// Allows users to login
// REGISTER: /api/auth/register
// type: public
// Allows new users to register
// LOGGED IN USERS: /api/auth
// private
// returns the details of the logged in user

// require all our needed modules
const express = require("express");
// We are not using all of the express library here, we just need to import the router.
// This will allows us to use just the router pare of express to do our routing.
const router = express.Router();

const auth = require("../middleware/auth");

//Require the CRUD operations from the controller
const authController = require("../controllers/auth");

// Name: Login
// Path: /api/auth/login
// Request: POST: create jwt for logging in user
// Type: Public
// Description: This route allows a user to login
router.post("/login", authController.login);

// Register Route
// Name: Register/ create user account
// Path: /api/auth/register
// Request: POST
// Type: Public
// Description: This route allows a user to register
router.post("/register", authController.register);

// name: loadUser / get all users
// path: /api/auth
// Request: GET
// Type: private route (requires the user to be logged in)
// Description: This route will return the current logged in user.
router.get("/", authController.loggedInUser);

// We now need to export the router so we can use these routes in server.js
module.exports = router;
