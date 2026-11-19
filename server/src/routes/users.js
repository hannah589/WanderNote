// File: src/routers/user.js
// This file will hold the routes for users
// These routes will be used by admin
// IT holds the routes for
// Get all users
// Get by id
// Edit users
// Delete users

const express = require("express");
const router = express.Router();

// middlewares
// auth: logged in user
const auth = require("../middleware/auth");
// admin: admin user
const admin = require("../middleware/admin");

//Require the CRUD operations from the controller
const usersController = require("../controllers/users");

// name: Add user
// path: /api/users/add
// Request: POST
// Type: Admin route.
// Description: This route allows the admin to add new users.
router.post("/add", auth, admin, usersController.createUser);

// name: Get All Users
// path: /api/users/
// Request: GET
// Type: Admin route.
// Description: This route allows an admin to see all users
router.get("/", auth, admin, usersController.getAllUsers);

// name: Get All Users
// path: /api/users/:id
// get by id
router.get("/:id", auth, admin, usersController.getUserById);

// name: Edit users
// path: /api/users/edit/:id
// Request: Put
// Type: Admin route.
// Description: This route allows the admin to edit a user.
router.put("/edit/:id", auth, admin, usersController.updateUser);

// name: Delete users
// path: /api/users/delete/:id
// Request: POST
// Type: Admin route.
// Description: This route allows the admin to delete a user.
router.delete("/delete/:id", auth, admin, usersController.deleteUser);

module.exports = router;
