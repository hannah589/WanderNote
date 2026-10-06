const express = require("express");
// Set up the express router
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Require the CRUD operations from the controller
const destinationsController = require("../controllers/destinations");

//POST: Create a new product
//type: admin only access
router.post("/add", [auth, admin], destinationsController.postDestination);

// Get all destinations
// request: GET
// path: /api/destinations
// type: public route
// Description: This route returns all destinations from the database (destinations table)
router.get("/", destinationsController.getAllDestinations);

// Get Single destination
// name: Get destination by id
// path: /api/destination/:id
// Request: GET
// Type: public.
router.get("/:id", destinationsController.getDestinationById);

router.put("/edit/:id", admin, destinationsController.putDestination);

router.delete(
  "/delete/:id",
  [auth, admin],
  destinationsController.deleteDestination,
);

// export the router so we can use the routes in server.js
module.exports = router;
