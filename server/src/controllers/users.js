const { User } = require("../models/models");

module.exports = {
  async createUser(req, res) {
    try {
      // destructure body
      const { firstName, lastName, email, image, password, isAdmin } = req.body;
      // Server-side validation goes here

      // encrypt password
      const hashedPassword = await User.prototype.hashPwd(password);
      console.log(hashedPassword);

      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        email,
        image,
        password: hashedPassword,
        isAdmin,
      });

      console.log(user.toJSON());
      res.status(200).send(user);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  async getAllUsers(req, res) {
    try {
      // set up options to exclude passwords
      const options = {
        attributes: { exclude: ["password"] },
      };
      const userList = await User.findAll(options);
      // log out the response
      console.log(userList);
      // Send the response
      res.status(200).send(userList);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  async getUserById(req, res) {
    try {
      // Get the id(string) from params and typecast to number in db
      let id = Number(req.params.id);
      console.log(id);
      // To user by id we use the findByPk() method
      // pass through the id we wish to find and exclude the password
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] }
      });
      // check our destination.
      console.log(user);
      // send response
      res.status(200).send(user);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //PUT: update product by Id
  //route: /api/products/:id
  async updateUser(req, res) {
    try {
      // Get the id from params
      const id = Number(req.params.id);
      console.log(id);

      // destructure req.body.
      const { firstName, lastName, email, image, isAdmin, password } = req.body;
    
      // find user by primary key, id
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      // Update user details
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.image = image;
      user.isAdmin = isAdmin;

      // Only hash password if a new password is provided
      if (password) {
        user.password = await User.hashPwd(password);
      }

      // save user details. .save is a sequelize function 
      await user.save()

      res.status(200).json(user);
    } catch (error) {
      internalServerError(error, res);
    }
  },

  //DELETE user by id
  async deleteUser(req, res) {
    try {
      //turn the id into a number to match the db
      let id = Number(req.params.id);
      console.log(id);
      //deleted destination that matches the id
      const deleted = await User.destroy({
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
