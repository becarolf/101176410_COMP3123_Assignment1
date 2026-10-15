const { rateLimit } = require("express-rate-limit");

// limit authentication requests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // max of 10 requests per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    message: "Too many requests. Please try again later.",
  },
});

module.exports = authLimiter;