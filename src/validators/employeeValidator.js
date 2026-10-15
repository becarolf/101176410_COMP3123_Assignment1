const { body, validationResult } = require("express-validator");

// validation rules for creating an employee
const employeeValidation = [
  body("first_name")
    .isString()
    .withMessage("First name must be a string")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 50 })
    .withMessage("First name cannot exceed 50 characters"),

  body("last_name")
    .isString()
    .withMessage("Last name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("position")
    .isString()
    .withMessage("Position must be a string")
    .trim()
    .notEmpty()
    .withMessage("Position is required")
    .isLength({ max: 100 })
    .withMessage("Position cannot exceed 100 characters"),

  body("salary")
    .isFloat({ gt: 0 })
    .withMessage("Salary must be a positive number"),

  body("date_of_joining")
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Please provide a valid date"),

  body("department")
    .isString()
    .withMessage("Department must be a string")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .isLength({ max: 100 })
    .withMessage("Department cannot exceed 100 characters"),
];

// return validation errors
const validateEmployee = (req, res, next) => {
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
  employeeValidation,
  validateEmployee,
};
