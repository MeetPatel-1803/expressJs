const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });
require("./config/database");

 

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port : ${process.env.PORT}`);
  });