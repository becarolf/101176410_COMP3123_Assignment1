const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/userController");

const {
  signupValidation,
  loginValidation,
  validate,
} = require("../validators/userValidator");

const authLimiter = require("../middleware/rateLimiter");

// signup
router.post("/signup", authLimiter, signupValidation, validate, signup);

// user login
router.post("/login", authLimiter, loginValidation, validate, login);

module.exports = router;
