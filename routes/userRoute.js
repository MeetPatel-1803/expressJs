const express = require("express");
const router = require("express");

router.route("/register").post(registerUser);
