/*
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")

//require the CRUD operations from the controller
const controller = require("../controllers/favourites")

//DEFINE ENDPOINTS: URL routes in an API
//POST: create a new favourite notes
//admin only access
router.post("/", [auth], controller.postFavourite)

//GET: favourite notes by id
router.get("/:id", controller.getFavouriteById)

//PUT: update favourite notes by Id
//admin only access
router.put("/:id", [auth], controller.putFavourite)

//DELETE favourite notes by id
//admin only access
router.delete("/:id", [auth], controller.deleteFavourite)

module.exports = router
//require in server.js
*/