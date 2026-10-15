const errorMiddleware = (err, req, res, next) => {
  // log the error in the terminal
  console.error(err.message);

  // handle invalid JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }

  // handle duplicate username or email
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Username or email already exists",
    });
  }

  // handle unexpected errors
  return res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;
