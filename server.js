const app = require("./app");
const dotenv = require("dotenv");
const DB_connection = require("./config/database");

dotenv.config({ path: "config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port : ${process.env.PORT}`);
});

DB_connection;  