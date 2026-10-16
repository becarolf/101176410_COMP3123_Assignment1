const winston = require("winston");

// create a logger to save application events and errors
const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),

  transports: [
    // show logs in the Vercel console
    new winston.transports.Console(),

    // save logs in files when running locally
    ...(!process.env.VERCEL
      ? [
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),

          new winston.transports.File({
            filename: "logs/combined.log",
          }),
        ]
      : []),
  ],
});

module.exports = logger;
