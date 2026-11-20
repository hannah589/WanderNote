//holds all db config options for our MySQL server
//require the .env var from .env file
require('dotenv').config();

module.exports = {
  port: process.env.PORT,

  db:{
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    //db options
     //dialect - tell sequelize what db you are using 
    options: {
      host: process.env.HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DIALECT,

      dialectOptions: {
      ssl: process.env.TIDB_ENABLE_SSL === 'true'
        ? {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
          }
        : null
    }
    } 
  },
  
  auth: {
    jwtSecret: process.env.JWT_SECRET
  }
}

/* note we should store secrets and other sensitive info in .env */