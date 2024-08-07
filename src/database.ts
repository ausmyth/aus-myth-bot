const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err: { stack: any }) => console.error("Connection error", err.stack));

module.exports = client;
