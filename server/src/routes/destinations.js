const express = require("express");
// Set up the express router
const router = express.Router();

//auth middleware always comes first, to check if they have a jwt token
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Require the CRUD operations from the controller
const destinationsController = require("../controllers/destinations");

//POST: Create a new product
//type: admin only access
router.post("/add", auth, admin, destinationsController.postDestination);

// Get all destinations
// request: GET
// path: /api/destinations
// type: public route
// Description: This route returns all destinations from the database (destinations table)
router.get("/", destinationsController.getAllDestinations);

// GET Single destination
// name: Get destination by id
// path: /api/destination/:id
// Request: GET
// Type: public.
router.get("/:id", destinationsController.getDestinationById);

router.put("/edit/:id", auth, admin, destinationsController.putDestination);

router.delete("/delete/:id", auth, admin, destinationsController.deleteDestination);

//BEYOND CRUD OPERATIONS
// GET /api/destinations/search?destination=italy
// public 
router.get("/search/:search", destinationsController.searchDestinations);

//Sort route
// GET /api/destinations/sort/country/ASC
// public 
router.get('/sort/:field/:direction', destinationsController.sortDestinations);

// export the router so we can use the routes in server.js
module.exports = router;
