const db = require("../models/models");
//get the User model from the database
const { User } = db.sequelize.models;

const bcrypt = require("bcrypt");

module.exports = {
  async login(req, res) {
    try {
      // Destructure req.body.
      const { email, password } = req.body;

      // First thing is we want to see if the user is in the database
      let user = await User.findOne({ where: { email: email } });
      // if the user is not there, send a message back
      // We keep the message general for security reasons
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Use bcrypt to check to see if the entered password matches the password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      // Send back a message if the password does not match
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // After comparing passwords a token can be generated to send to the client.
      // We do this by using the jwt.sign() method
      // WE can use the payload to customize what information we want to save to the token
      // jwt.sign(payload, key, [options, callback]);
      // The key is from out config
      // options is any options we wish to specify
      // callback function is optional as is the options.
      // Create the payload
      const payload = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      };

      // Sign the token
      const token = User.prototype.signToken(payload);
      console.log(token);
      res.json({ token });
    } catch (err) {
      internalServerError(err, res);
    }
  },

  async register(req, res) {
    try {
      // Destructure req.body.
      const { firstName, lastName, email, image, password } = req.body;

      // First thing is we want to see if the user is in the database
      let user = await User.findOne({ where: { email: email } });
      // if the user is not there, send a message back
      // We keep the message general for security reasons
      if (user) {
        return res
          .status(400)
          .json({ msg: "Error occurred while registering this user" });
      }

      // Validation
      // Create an new user object
      const newUser = {
        firstName,
        lastName,
        email,
        image,
        password,
      };

      // Use bcrypt to hash and salt our passwords.
      const hashedPassword = await User.prototype.hashPwd(password);
      newUser.password = hashedPassword;
      // log out the new password
      console.log(newUser);

      // Save to database
      const userRes = await User.create(newUser);
      // Create payload: package to send details
      const payload = {
        user: {
          id: userRes.id,
          firstName: userRes.firstName,
          lastName: userRes.lastName,
          email: userRes.email,
          isAdmin: userRes.isAdmin,
        },
      };

      // Sign the token
      const token = User.prototype.signToken(payload);
      console.log(token);
      res.status(200).json({ token });
    } catch (err) {
      internalServerError(err, res);
    }
  },

  async loggedInUser(req, res) {
    try {
      // Set up options to remove the password when sending back the logged in user data
      const options = {
        attributes: { exclude: ["password"] },
      };

      // Find the user from the id in req.user and pass in options to remove the password
      const user = await User.findByPk(req.user.id, options);
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({msg: 'server error', error: err.message})
    }
  },
};

//function to reuse error
function internalServerError(err, res) {
  console.log(err);
  return res
    .status(500)
    .json({
      msg: "Internal Server Error - Please try again later.",
      error: err.message,
    });
}
