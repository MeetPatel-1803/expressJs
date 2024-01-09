const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

const DB_connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// console.log(process.env.PORT);
// console.log(process.env.PORT);
// console.log(process.env.PORT);
DB_connection.connect((err, data) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(data);
    return console.log("connected to the Database");
  }
});

module.exports = DB_connection;
