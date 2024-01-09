const DB_connection = require("../config/database");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  DB_connection.query(
    "SELECT email FROM User WHERE email = ?",
    [email],
    (err, data) => {
      const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/.test(
        email
      ); // EMAIL VALIDATION
      const isValidPassword =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          // PASSWORD VALIDATION
          password
        );

      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Internal Server Error !" }));
      } else if (data.length === 0 && isValidEmail && isValidPassword) {
        bcrypt.hash(password, 5, (err, hash) => {
          // HASHING A PASSWORD
          console.log(hash);
          console.log(hash.length);
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error !!" }));
          } else {
            DB_connection.query(
              "INSERT INTO User (name,email,password) VALUES (?,?,?)", // STORE INTO A DB
              [name, email, hash],
              (err, data) => {
                if (err) {
                  console.log(err);
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(
                    JSON.stringify({ error: "Internal Server Error !!!" })
                  );
                } else {
                  console.log(data);
                  res.writeHead(201, { "Content-Type": "application/json" });
                  res.end(
                    JSON.stringify({
                      message: "User Registered Successfully",
                    })
                  );
                }
              }
            );
          }
        });
      } else if (!isValidEmail) {
        res.writeHead(400, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Email must be satisfy the condition !!!" })
        );
      } else if (!isValidPassword) {
        res.writeHead(400, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({
            error: "Password must be satisfy the condition !!!",
          })
        );
      } else {
        res.writeHead(304, { "content-type": "application/json" });
        return res.end(JSON.stringify({ error: "Email is already taken" }));
      }
    }
  );
};

exports.logInUser = (req, res) => {
  const { email, password } = req.body;

  DB_connection.query(
    "SELECT * FROM User WHERE email = ?",
    [email],
    (err, data) => {
      console.log(data, "?????????????????????????????????????????????");
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server error !!!!" }));
      } else if (data.length === 0) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unauthorized - User not found" }));
      } else {
        const user = data[0];

        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err || !isValid) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid password" }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Login successful" }));
          }
        });
      }
    }
  );
};
