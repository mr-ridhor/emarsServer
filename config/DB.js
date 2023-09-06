require('dotenv').config();
module.exports= {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    port:process.env.DB_PORT      
   
  }

