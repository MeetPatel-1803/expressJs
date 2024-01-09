const express = require("express");
const router = express.Router();
const { registerUser, logInUser } = require("../controllers/userController");

router.route("/registerUser").post(registerUser);
router.route("/login").post(logInUser);

module.exports = router