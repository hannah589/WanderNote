// src/models/index.js
//This file holds sequelize connection and defining the model for each table. The server will also create the tables in the db if they do not exist
//Note: db must exist before we can create the tables.

//import Sequelize and DataTypes from the sequelize package
// Sequelize is the ORM(object relational mapping) package, which uses functions to call the SQL and talk with the db
//DataTypes to define datatype in each column/field in db
const { Sequelize, DataTypes } = require('sequelize')
//Import JWT:auth token, Bcrypt: hash pw, db config file
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

//Create db object to store Sequelize connection, class and db models
const db = {};
console.log(config.db.options);

//create a single instance of the sequelize connection, to connect sequelize with the db
//this will initialize our db with configuration options in config
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
);
//log out sequelize object
//console.log(sequelize)

//Define model/table structure with their fields, constraints and validation rules.
const User = sequelize.define("User", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image:{
    type: DataTypes.STRING,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default user is not an admin
  }
});

// Database functions - set as follows:
// ModelName.prototype.FunctionName = function() { place you code here}
User.prototype.signToken = function(payload){
  // Message signing
  console.log('Signing token....');
  // Test payload
  console.log(payload);
  // Sign the token with the payload and our secret
  // expires in 7 days
  const token = jwt.sign(payload, config.auth.jwtSecret, {
    expiresIn: "7d",
    algorithm: "HS512"
  });
  // return the token
  return token;
}

// Create a function to hash client passwords
// take in a plaintext password and return the hashed and salted password
User.prototype.hashPwd = async function (password) {
  console.log('Hashing password....');
  console.log(password);
  // Generate salt
  const salt = await bcrypt.genSalt(12);
  // hash password
  const hashedPassword = await bcrypt.hash(password, salt);
  // return the hashedPassword
  return hashedPassword;
}

//Define model structure with sequelize.define.('TableName, {fields}')
const Destination = sequelize.define('Destination', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },  
  city:{
    type: DataTypes.STRING,
    allowNull: false, //required
    unique: true, //no duplicate values
  },
  country:{
    type: DataTypes.STRING,
    allowNull: false, //required
  },
  continent:{
    type: DataTypes.ENUM("Asia", "Australia", "Europe", "Africa", "North America", "South America", "Antarctica"),
  },
  category:{
    type: DataTypes.ENUM("Beach", "Adventure", "City", "Culture", "Nature"),
  },
  description:{
    type: DataTypes.TEXT("long"),
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: "https://images.pexels.com/photos/102159/pexels-photo-102159.jpeg",
  },
  tourismUrls: {
    type: DataTypes.JSON, 
    //to set an array data type in MySQL, SQLite, PostgreSQL, MariaDB
  },
}, {
  //set the same data in the Destinations table
    tableName: 'Destinations',
    timestamps: true
});

/*
const Favourite = sequelize.define('Favourite', {
  travelNotes:{
    type: DataTypes.STRING, 
  }, 
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "User", // model/table name
      key: "id",
    },
    onDelete: "CASCADE", //If a user is deleted, all their connected data is also deleted automatically
    onUpdate: "CASCADE", //If a user’s id changes, all related userId fields in other tables will automatically update.       
  },
  destinationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Destination", // model/table name
      key: "id",
    },
    onDelete: "CASCADE", 
    onUpdate: "CASCADE",       
  },
});

//Define table relationships
//User has many favourites
//one to many 
User.hasMany(Favourite, {
  foreignKey: "userId",
});

//Favourite belongs to one user
//one to one
Favourite.belongsTo(User, {
  foreignKey: "userId",
});

//Destination has many favourites
//one to many 
Destination.hasMany(Favourite, {
  foreignKey: "destinationId",
});

//Favourite belongs to one destination
//one to one
Favourite.belongsTo(Destination, {
  foreignKey: "destinationId", 
});
*/

//Set up access variables
//add sequelize to our db object, to access sequelize connection
db.sequelize = sequelize;
//add Sequelize class to db object, to use Sequelize class and functions
db.Sequelize = Sequelize;

//add models to the db object
db.User = User;
db.Destination = Destination;
//db.Favourite = Favourite;

//Export db models
module.exports = db;
//to allow to use db operations (like, and, or etc)
module.exports.Op = Sequelize.Op;