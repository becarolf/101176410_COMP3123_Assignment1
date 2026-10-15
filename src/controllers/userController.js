const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register a new user
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // check if required fields are missing
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    // check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // return user info without password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


// login user
const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // check if password and username/email were provided
    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "Username or email and password are required",
      });
    }

    // find the user by username or email
    const user = await User.findOne(
      username ? { username } : { email: email.toLowerCase() },
    ).select("+password");

    // check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // compare password w/ stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // generate JWT
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // return token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { signup, login };
