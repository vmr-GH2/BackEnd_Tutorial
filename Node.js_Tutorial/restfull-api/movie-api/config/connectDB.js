const mysql = require("mysql2");//mysql is a Node.js driver for MySQL
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // your DB host
  user: process.env.DB_USER, // your DB username
  password: process.env.DB_PASSWORD, // your DB password
  database: process.env.DB_NAME, // your DB name
  waitForConnections: true,
  connectionLimit: 10,// maximum number of connections to create at once
  queueLimit: 0,//
});

module.exports = pool.promise(); // use promises instead of callbacks
//promise() method returns a new pool that uses promises instead of callbacks, allowing for cleaner and more manageable asynchronous code.