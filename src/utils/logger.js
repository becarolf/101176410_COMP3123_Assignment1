const winston = require("winston");

// create a logger to save application events and errors
const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),

  transports: [
    // save errors in a separate file
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // save all application logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

module.exports = logger;