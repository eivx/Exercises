require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URL = process.env.MONGODB_URL1;

module.exports = {
  MONGODB_URL,
  PORT,
};
