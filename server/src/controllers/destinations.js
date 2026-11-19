//import and destructure the destination model from our data so we can use them with our logic
//nts: use .json return messages
const { Destination, Op } = require("../models/models");
//import when need to use the or or like operations in sequelize

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
      res.status(201).json(destination);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //GET: all products
  //route: api/products
  async getAllDestinations(req, res) {
    try {
      console.log("/api/destinations - GET ALL called");
      // To get all data from a table in the database we use the findAll() method
      // The model used tells the database which table we are getting data from
      const list = await Destination.findAll();
      // log out the response
      console.log("Destinations:", list);
      // Send the response
      res.status(200).json(list);
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
      console.log("GetDestinationById: ", id);
      // To get a destination by id we use. the findByPk() method
      // pass through the id we wish to find.
      const destination = await Destination.findByPk(id);
      // check destination exists
      if (!destination) {
        return res.status(404).json({
          message: "Destination not found"
        });
      }
      // check our destination.
      console.log(destination);
      // send response
      res.status(200).json(destination);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //PUT: update/edit product by Id
  //route: /api/products/:id
  async putDestination(req, res) {
    try {
      // Get the id from params
      let id = Number(req.params.id);
      console.log("/api/destinations/edit/:id - PUT", id);
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
      // New code to send back an updated destination if there was a successful update, check 1 row has been updated
      if (updated[0] > 0) {
        console.log("destination updated...");
        // get the updated destination.
        const destination = await Destination.findByPk(id);
        // send the updated destination to the client.
        res.status(200).json(destination);
      } else {
        // No destination matched the id
        res.status(404).json({
          message: "Destination not found",
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
      console.log("API Deleting destination:", id);
      //deleted destination that matches the id
      const deleted = await Destination.destroy({
        where: { id: id },
      });

        // Check whether a destination was deleted
      if (deleted === 0) {
        return res.status(404).json({
          message: "Destination not found"
        });
      }

      //send deleted destination msg to frontend
      return res.status(200).json({
        id: id,
        message: "Destination deleted",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  },

  // Thinking beyond CRUD Operations
  async searchDestinations(req, res) {
    // get the search input from the URL,query string
    // E.g.: /api/destinations?search=italy
      let search = req.query.search;
      //print the search input to the console for debugging
      console.log(search); 
    
    //try and catch block, to handle potential errors
    try{
      //where query and filter the Destination table
      const list = await Destination.findAll({ 
          //filter the destinations from any of the these columns contain the search term
          where: {
            [Op.or]: [
              { city: { [Op.like]: `%${search.trim()}%` } },
              { country: { [Op.like]: `%${search.trim()}%` } },
              { continent: { [Op.like]: `%${search.trim()}%` } }
            ]
          }
        });
      // print the matching destinations to the console for debugging 
      console.log(list);
      // return the matching destinations and response status 200
      res.status(200).json(list);  
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //sort route: will send back the db data ordering results in order by
  async sortDestinations(req, res) {
    //get the sort field values from the URL field and direction
    let field = req.params.field;
    let direction = req.params.direction;
    console.log(`Field: ${field}, Direction ${direction}`);
    // ASC or DESC
    try {
      //await to retrieve all the data from the db, destination table and sort in order
      const list = await Destination.findAll({
        order: [[`${field}`, `${direction}` ]]
      });
      //log the retrieved list to the console
      console.log(list);
      //send successful res and sorted list
      res.status(200).send(list);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
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
