//import and destructure the destination model from our data so we can use them with our logic
const { Destination } = require("../models/models");

module.exports = {
  //POST: Create a new destination
  async postDestination(req, res) {
    try {
      // Destructure the request body
      const {
        city,
        country,
        description,
        image,
        continent,
        category,
        tourismUrls,
      } = req.body;

      // .create() method allows us to send/add data to the database.
      // This will be saved to the Model - table in the database
      // The object contains the columns and values needed
      const destination = await Destination.create({
        city,
        country,
        description,
        image,
        continent,
        category,
        tourismUrls,
      });
      // The create method will get a response back from the database
      // IT will either be an error or the record created.
      // log the response from the database
      console.log(destination.toJSON());
      // Send the response from the database to the client
      res.status(201).send(destination);
    } catch (error) {
      console.error("Error creating destination:", error);
      res.status(500).send({ error: "Failed to create destination." });
    }
  },

  //GET: all products
  //route: api/products
  async getAllDestinations(req, res) {
    try {
      // To get all data from a table in the database we use the findAll() method
      // The model used tells the database which table we are getting data from
      const list = await Destination.findAll();
      // log out the response
      console.log(list);
      // Send the response
      res.status(200).send(list);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //GET: Destination by id
  //route: api/products/:id
  async getDestinationById(req, res) {
    try {
      // Get the id(string) from params and typecast to number in db
      let id = Number(req.params.id);
      console.log(id);
      // To get a destination by id we use. the findByPk() method
      // pass through the id we wish to find.
      const destination = await Destination.findByPk(id);
      // check our destination.
      console.log(destination);
      // send response
      res.status(200).send(destination);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //PUT: update product by Id
  //route: /api/products/:id
  async putDestination(req, res) {
    try {
      // Get the id from params
      let id = Number(req.params.id);
      console.log(id);
      // Destructure the req.body
      const {
        city,
        country,
        description,
        image,
        continent,
        category,
        tourismUrls,
      } = req.body;
      // This method take in two objects.
      // The data we wish to save
      // The where object so we know which record/row we are changing
      const updated = await Destination.update(
        {
          city,
          country,
          description,
          image,
          continent,
          category,
          tourismUrls,
        },
        { where: { id: id } },
      );
      // Check to see if we have updated.
      console.log(updated);
      // New code to send back an updated destination if there was a successful update.
      if (updated) {
        console.log("destination updated...");
        // get the updated destination.
        const destination = await Destination.findByPk(id);
        // send the updated destination to the client.
        res.status(200).send(destination);
      } else {
        // No destination matched the id
        res.status(404).send({
          error: "Destination not found",
        });
      }
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //DELETE destination by id
  async deleteDestination(req, res) {
    try {
      //turn the id into a number to match the db
      let id = Number(req.params.id);
      console.log(id);
      //deleted destination that matches the id
      const deleted = await Destination.destroy({
        where: { id: id },
      });
      //send response
      res.status(204).send(`${id} deleted`);
    } catch (error) {
      internalServerError(error, res);
    }
  },
};

//function to reuse error
function internalServerError(error, res) {
  console.log(error);
  return res
    .status(500)
    .send("Internal Server Error - Please try again later.");
}
