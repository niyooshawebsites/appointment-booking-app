const User = require("../models/user.model");
const { encryptPassword, decryptPassword } = require("../utils/password");
const generateAuthToken = require("../utils/authToken");

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
        password: await encryptPassword(password),
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

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if email does not exisit
    if (!email) {
      return res.status(400).json({
        success: false,
        msg: "Email is required!",
      });
    }

    // if password does not exist
    if (!password) {
      return res.status(400).json({
        success: false,
        msg: "Password is required!",
      });
    }

    // check for registered user
    const registeredUser = await User.findOne({ email });

    // registered user not found
    if (!registeredUser) {
      return res.status(404).json({
        success: false,
        msg: "Invalid credetails!",
      });
    }

    // registered user is found
    if (registeredUser) {
      // check for the password
      const passwordMatch = await decryptPassword(
        password,
        registeredUser.password
      );

      // password mismatch
      if (!passwordMatch) {
        return res.status(409).json({
          success: false,
          msg: "Invalid credentials!",
        });
      }

      // password match
      const authToken = await generateAuthToken({
        username: registeredUser.username,
        email: registeredUser.email,
        role: registeredUser.role,
      });

      return res.status(200).json({
        success: true,
        msg: "Login successful!",
        authToken,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerController, loginController };
