require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// the middleware
app.use(helmet());
app.use(express.json());

// health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Employee Management API is running",
  });
});

// start application
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
