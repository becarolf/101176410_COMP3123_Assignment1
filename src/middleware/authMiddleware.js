const jwt = require("jsonwebtoken");
const User = require("../models/User");

// verify JWT before accessing protected routes
const authMiddleware = async (req, res, next) => {
  try {
    // get token from Authorization header
    const authHeader = req.headers.authorization;

    // check if token was provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // verify if the token is authentic and is still valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the authenticated user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found or no longer exists",
      });
    }

    // store authenticated user ID in request
    req.userId = user._id;

    // continue to the next middleware or controller
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    next(error);
  }
};

module.exports = authMiddleware;