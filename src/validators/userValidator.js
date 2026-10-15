const { body, validationResult } = require("express-validator");

// validation rules for signup
const signupValidation = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),
];

// validation rules for login
const loginValidation = [
  body("password").notEmpty().withMessage("Password is required"),

  body().custom((value) => {
    if (!value.username && !value.email) {
      throw new Error("Username or email is required");
    }
    return true;
  }),
];

// handles validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  validate,
};
