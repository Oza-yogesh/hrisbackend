const express = require("express");
const router = express.Router();
const { authenticateUser, signupUser } = require("../controllers/user");

router.post("/login", authenticateUser);

router.post("/signup", signupUser);

module.exports = router;
