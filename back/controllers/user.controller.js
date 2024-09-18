const User = require("../models/user.model");
const { encryptPassword, decryptPassword } = require("../utils/password");
const generateAuthToken = require("../utils/authToken");
const { sendverificationEmail, verifyEmail } = require("../utils/mail");

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
        msg: "Registration failed. User already exists. Please login.",
      });
    }

    // new user
    if (!existingUser) {
      const newUser = await new User({
        username,
        email,
        password: await encryptPassword(password),
      }).save();

      // generate verification token
      const verficationToken = await generateAuthToken(
        {
          email: newUser.email,
        },
        2 * 24 * 60 * 60
      );

      // generate the email verification link
      const verficationURI = `http://localhost:5173/verify-email?token=${verficationToken}`;

      // Send the verfication link to customer email account
      sendverificationEmail(
        newUser.email,
        "ABS email verfication",
        `${verficationURI}`
      );

      res.status(201).json({
        success: true,
        msg: "Regisration done. Please verify your email to login",
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

      // if user is verified
      if (registeredUser.isVerified === false) {
        return res.status(403).json({
          success: false,
          msg: "Email verification pending",
        });
      }

      // password match
      const authToken = await generateAuthToken(
        {
          username: registeredUser.username,
          email: registeredUser.email,
          role: registeredUser.role,
        },
        "1d"
      );

      // setting the cookie
      res.cookie("authToken", authToken, {
        httpOnly: process.env.COOKIE_HTTPONLY,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day expirty,
        path: "/",
      });

      return res.status(200).json({
        success: true,
        msg: "Login successful!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const userVerficationController = async (req, res) => {
  const { token } = req.params;

  // if token not found
  if (!token) {
    return res.status(404).json({
      success: false,
      msg: "No or invalid token. Verication failed!",
    });
  }

  // if token is there
  const result = await verifyEmail(token);

  // if verification failed
  if (!result) {
    return res.status(403).json({
      success: false,
      msg: "Invalid token!!! Verification failed",
    });
  }

  // if verification successful, update the isVerified flag
  await User.findOneAndUpdate(
    { email: result.email },
    { isVerified: true },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    msg: "Email successfully verified!",
  });
};

const checkAuthController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "You are visit this route",
  });
};

const logoutController = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: process.env.COOKIE_HTTPONLY,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

const updateContactDetailsController = async (req, res) => {
  // get all the details from body
  const {
    name,
    businessName,
    gst,
    contact,
    office,
    floor,
    building,
    street,
    locality,
    district,
    state,
    pinCode,
  } = req.body;

  console.log(req.body);

  // if all the details are not provided
  if (
    !name ||
    !businessName ||
    !gst ||
    !contact ||
    !office ||
    !floor ||
    !building ||
    !street ||
    !locality ||
    !district ||
    !state ||
    !pinCode
  ) {
    return res.status(400).json({
      success: false,
      msg: "Please provide all the details!",
    });
  }

  // find the user using email
  const updatedUser = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      name,
      businessName,
      gst,
      contact,
      office,
      floor,
      building,
      street,
      locality,
      district,
      state,
      pinCode,
    },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    msg: "Contact details updation successful",
  });
};

const updateAboutDetailsController = async (req, res) => {
  try {
    // getting data from body
    const { about } = req.body;

    // if detail is not available
    if (!about) {
      return res.status(400).json({
        success: true,
        msg: "Please provide about details",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { about },
      { new: true }
    );

    // if not updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "About details updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerController,
  loginController,
  userVerficationController,
  checkAuthController,
  logoutController,
  updateContactDetailsController,
  updateAboutDetailsController,
};
