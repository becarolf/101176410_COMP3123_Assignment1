const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/employeeController");

const {
  employeeValidation,
  validateEmployee,
} = require("../validators/employeeValidator");


router.use(authMiddleware); // require authentication for all employee routes
router.get("/employees", getAllEmployees); // get employees belonging to the logged-in user
router.get("/employees/:eid", getEmployeeById); // get a specific employee by ID

// validate employee data before creating
router.post("/employees", employeeValidation, validateEmployee, createEmployee);

module.exports = router;
