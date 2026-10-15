const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/userController");

const {
  signupValidation,
  loginValidation,
  validate,
} = require("../validators/userValidator");

// signup
router.post("/signup", signupValidation, validate, signup);

// user login
router.post("/login", loginValidation, validate, login);

module.exports = router;