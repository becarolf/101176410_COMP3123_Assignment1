require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// the middleware
app.use(helmet());
app.use(express.json());
app.use("/api/v1/user", userRoutes); // User routes
app.use("/api/v1/emp", employeeRoutes); // Employee routes

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Employee Management API is running",
  });
});

// handle routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// handle application errors
app.use(errorMiddleware);

// start application
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
