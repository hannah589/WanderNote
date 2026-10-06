//Note: Must create db in MySQL first
//import express, helmet, cors library
const express = require("express");
const helmet = require("helmet"); //require and use
const cors = require("cors");

// Import db configurations
const config = require("./config/config");

//bring in sequelize and db from models folder
//do not need to include file name with the folder, as it will automatically load in index.js
const db = require("./models/models");

//initialize express app
const app = express();

//import routes
const destinationsRoutes = require("./routes/destinations");
//const favouritesRoutes = require("./routes/favourites");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// Connect to MIDDLEWARE
// Import CORS options
const corsOptions = require("./middleware/corsOptions");
//const logging = require("./middlewares/logging");
//helmet: It sets HTTP response headers to secure node/express apps.
app.use(helmet());
//cors: protect from cross-origin resources
app.use(cors(corsOptions));
//pre-flight safety check on all paths/requests to check the other server app is on
app.options("/{*path}", cors(corsOptions));

//turn json response data into javascript object. Readable data, to read requests.
//set up the server to handle json data
app.use(express.json());
//set up the server to handle urlencoded data
app.use(express.urlencoded({ extended: true }));

//test: http://localhost:3001/
app.get("/", (res) => {
  res.status(200).send("Hello World! API is working!");
});

//routes
app.use("/api/destinations", destinationsRoutes);
//app.use("/api/favourites", favouritesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

//sequelize.sync() tells sequelize to create the tables, if they doesn't exist.
//start server
db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
