/*
const express = require("express")
const router = express.Router()

//all endpoints, auth users only access
const auth = require("../middleware/auth")

//require the CRUD operations from the controller
const controller = require("../controllers/favourites")

//DEFINE ENDPOINTS: URL routes in an API
//POST: create a new favourite notes
//auth users only access
router.post("/", auth, controller.postFavourite)

//GET: favourite notes by id
router.get("/:id", auth, controller.getFavouriteById)

//PUT: update favourite notes by Id
//auth only access
router.put("/:id", auth, controller.putFavourite)

//DELETE favourite notes by id
//admin only access
router.delete("/:id", auth, controller.deleteFavourite)

module.exports = router
//require in server.js
*/