//Note: Must create db in MySQL first
//import express, helmet, cors library
const express = require("express");

// Import db configurations
const config = require("./config/config");
//bring in sequelize and db from models folder
//do not need to include file name with the folder, as it will automatically load in index.js
const db = require("./models/models");

const helmet = require("helmet"); //require and use
const cors = require("cors");
//bring in morgan for logger
const morgan = require('./middleware/logger')

//import routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const destinationsRoutes = require("./routes/destinations");
const adminRoutes = require('./routes/admin');
//const favouritesRoutes = require("./routes/favourites");

//initialize express app
const app = express();
//secure cross-origin requests and data transfers between browsers and servers
app.use(cors());
//helmet: It sets HTTP response headers to secure node/express apps.
app.use(helmet());
// This will allow the server to 'serve' the images
app.use('/uploads', express.static('uploads'));
//use morgan logger
app.use(morgan);

//turn json response data into javascript object. Readable data, to read requests.
//set up the server to handle json data
app.use(express.json());
//set up the server to handle urlencoded data
app.use(express.urlencoded({ extended: true }));

//test: http://localhost:3001/
app.get("/", (req, res) => {
  res.status(200).send("WanderNote API is working!");
});

//routes
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/destinations", destinationsRoutes);

//app.use("/api/favourites", favouritesRoutes);

//sequelize.sync() tells sequelize to create the tables, if they doesn't exist.
//start server
db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
