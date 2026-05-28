const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= GENERATE JWT TOKEN ================= */

const generateToken = (id) => {

  if (!process.env.JWT_SECRET) {

    throw new Error(
      "JWT_SECRET missing in .env"
    );

  }

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "30d"
    }

  );

};

/* ================= REGISTER USER ================= */

const registerUser = async (req, res) => {

  try {

    let {
      name,
      email,
      password,
      role
    } = req.body;

    /* Validate Input */
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all fields"

      });

    }

    /* Clean Data */
    name = name.trim();

    email = email
      .toLowerCase()
      .trim();

    password = password.trim();

    /* Check Existing User */
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists"

      });

    }

    /* Hash Password */
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /* Create User */
    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      role

    });

    /* Response */
    res.status(201).json({

      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(
        user._id
      )

    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Registration failed"

    });

  }

};

/* ================= LOGIN USER ================= */

const loginUser = async (req, res) => {

  try {

    let {
      email,
      password
    } = req.body;

    /* Validate */
    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password required"

      });

    }

    /* Clean Input */
    email = email
      .toLowerCase()
      .trim();

    password = password.trim();

    /* Find User */
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "User not found"

      });

    }

    /* Compare Password */
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid password"

      });

    }

    /* Success */
    res.status(200).json({

      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(
        user._id
      )

    });

  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Login failed"

    });

  }

};

module.exports = {

  registerUser,

  loginUser

};