const User = require("../models/user.model");
const encryptPassword = require("../utils/encryptPassword");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check for all the details:
    if (!username) {
      return res.status(400).json({
        success: false,
        msg: "Username is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        msg: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        msg: "Password is required",
      });
    }

    // try of find existing user
    const existingUser = await User.findOne({ username, email });

    // user already exists
    if (existingUser) {
      return res.status(409).json({
        success: false,
        msg: "Registration failed. User already exists",
      });
    }

    // new user
    if (!existingUser) {
      const newUser = await new User({
        username,
        email,
        password: encryptPassword(password),
      }).save();
      res.status(201).json({
        success: true,
        msg: "Regisration successful",
        newUser,
      });
    }
  } catch (err) {
    console.log(err?.message);
  }
};

module.exports = { registerController };
