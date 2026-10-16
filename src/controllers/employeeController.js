const Employee = require("../models/Employee");
const mongoose = require("mongoose");

// create a new employee
const createEmployee = async (req, res, next) => {
  try {
    // get employee info from the request body
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    } = req.body;

    // create employee using the authenticated user's ID
    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      user: req.userId,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};



 // get all employees created by the logged-in user
const getAllEmployees = async (req, res, next) => {
  try {
    // find only employees that belong to the logged-in user
    const employees = await Employee.find({
      user: req.userId,
    });

    // return the employee list
    res.status(200).json({
      message: "Employees retrieved successfully",
      employees,
    });
  } catch (error) {
    // pass errors to the error middleware
    next(error);
  }
};


// get an employee by ID
const getEmployeeById = async (req, res, next) => {
  try {
    const { eid } = req.params;

    // check if the employee ID is valid
    if (!mongoose.isObjectIdOrHexString(eid)) {
      return res.status(400).json({
        message: "Invalid employee ID",
      });
    }

    // find the employee belonging to the logged-in user
    const employee = await Employee.findOne({
      _id: eid,
      user: req.userId,
    });

    // check if the employee exists
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // return the employee
    res.status(200).json({
      message: "Employee retrieved successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};


 // UPDATE an employee by ID (PUT)
const updateEmployee = async (req, res, next) => {
  try {
    const { eid } = req.params;

    // check if the employee ID is valid
    if (!mongoose.isObjectIdOrHexString(eid)) {
      return res.status(400).json({
        message: "Invalid employee ID",
      });
    }

    // get employee information from the request body
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    } = req.body;

    // update only an employee belonging to the logged-in user
    const employee = await Employee.findOneAndUpdate(
      {
        _id: eid,
        user: req.userId,
      },
      {
        $set: {
          first_name,
          last_name,
          email,
          position,
          salary,
          date_of_joining,
          department,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // check if the employee exists or belongs to the user
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // return the updated employee
    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};


 // Delete an employee by ID
const deleteEmployee = async (req, res, next) => {
  try {
    // get employee ID from the query parameter
    const { eid } = req.query;

    // check if the employee ID is valid
    if (!mongoose.isObjectIdOrHexString(eid)) {
      return res.status(400).json({
        message: "Invalid employee ID",
      });
    }

    // delete only if the employee belongs to the logged-in user
    const employee = await Employee.findOneAndDelete({
      _id: eid,
      user: req.userId,
    });

    // check if the employee was found
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // return success without a response body
    res.status(204).send();
  } catch (error) {
    // pass errors to the error middleware
    next(error);
  }
};


module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };