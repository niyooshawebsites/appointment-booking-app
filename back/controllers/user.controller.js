const User = require("../models/user.model");
const moment = require("moment");
const { encryptPassword, decryptPassword } = require("../utils/password");
const generateAuthToken = require("../utils/authToken");
const {
  sendverificationEmail,
  verifyEmail,
  forgotPasswordEmail,
} = require("../utils/mail");

const { generateUniqueUserID } = require("../utils/uniqueID");

// register controller...
const registerController = async (req, res) => {
  const { role, specialization, username, email, password } = req.body;

  try {
    // check for all the details:
    if (!role) {
      return res.status(400).json({
        success: false,
        msg: "Role is required",
      });
    }

    if (!specialization) {
      return res.status(400).json({
        success: false,
        msg: "Specialization is required",
      });
    }

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
        msg: "Registration failed. Account already exists.",
      });
    }

    // new user
    if (!existingUser) {
      const newUser = await new User({
        role,
        specialization,
        username,
        email,
        password: await encryptPassword(password),
        userID: await generateUniqueUserID(),
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
      await sendverificationEmail(
        newUser.email,
        "ABS email verfication",
        `${verficationURI}`
      );

      return res.status(201).json({
        success: true,
        msg: "Please verify your email to login",
        newUser: newUser.email,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// login controller...
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // if email does not exisit
    if (!username) {
      return res.status(400).json({
        success: false,
        msg: "Username is required!",
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
    const registeredUser = await User.findOne({ username });

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
          role: registeredUser.role,
          isAdmin: registeredUser.isAdmin,
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
        username: registeredUser.username,
        userID: registeredUser.userID,
        isVerified: registeredUser.isVerified,
        role: registeredUser.role,
        email: registeredUser.email,
        isAdmin: registeredUser.isAdmin,
        userId: registeredUser._id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// user verfication after signup controller...
const userVerficationController = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// reset password controller...
const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "No token found",
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

    // if verification successful, update the password
    await User.findOneAndUpdate(
      { email: result.email },
      { password: await encryptPassword(newPassword) },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Password reset successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// check auth controller...
const checkAuthController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "You are visit this route",
  });
};

// logout controller...
const logoutController = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: process.env.COOKIE_HTTPONLY,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      msg: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// update contact details controller...
const updateContactDetailsController = async (req, res) => {
  try {
    // get all the details from body
    const {
      name,
      businessName,
      gst,
      contactNo,
      office,
      floor,
      building,
      street,
      locality,
      district,
      state,
      pinCode,
    } = req.body;

    // if all the details are not provided
    if (
      !name ||
      !businessName ||
      !gst ||
      !contactNo ||
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
      { username: req.user.username },
      {
        name,
        businessName,
        gst,
        contactNo,
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// update about details controller...
const updateAboutDetailsController = async (req, res) => {
  try {
    // getting data from body
    const { about } = req.body;

    // if detail is not available
    if (!about) {
      return res.status(400).json({
        success: false,
        msg: "Please provide about details",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      { about },
      { new: true }
    );

    // if not updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "user count not be updated",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "About details updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// update social media controller...
const updateSocialProfilesController = async (req, res) => {
  try {
    const { facebookUrl, xUrl, instagramUrl, linkedInUrl, youtubeUrl } =
      req.body;

    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      {
        socialProfiles: {
          facebookUrl,
          xUrl,
          instagramUrl,
          linkedInUrl,
          youtubeUrl,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "Service updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// udpate password controller...
const updatePasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        msg: "New password is required",
      });
    }

    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "No user found",
      });
    }

    await User.findOneAndUpdate(
      {
        username: req.user.username,
      },
      {
        password: await encryptPassword(newPassword),
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "Password updation successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// GET about details controller...
const getAboutDetailsController = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "No user found",
      });
    }

    if (user) {
      return res.status(200).json({
        success: true,
        msg: "user found successfully",
        about: user.about,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// forgot password controller....
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.params;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // generate verification token
    const verficationToken = await generateAuthToken(
      {
        email: existingUser.email,
      },
      1 * 24 * 60 * 60
    );

    // generate the password reset link
    const resetPassordURI = `http://localhost:5173/reset-password?token=${verficationToken}`;

    await forgotPasswordEmail(
      existingUser.email,
      "ABS Reset Password",
      `${resetPassordURI}`
    );

    return res.status(200).json({
      success: true,
      msg: "Reset password email sent",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// GET contact details controller...
const getContactDetailsController = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    // if user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }

    if (user) {
      return res.staus(200).json({
        success: true,
        msg: "User found successfully",
        contact: {
          name: user.name,
          businessName: user.businessName,
          gst: user.gst,
          contactNo: user.contactNo,
          office: user.office,
          floor: user.floor,
          building: user.building,
          street: user.street,
          locality: user.locality,
          district: user.district,
          state: user.state,
          pinCode: user.pinCode,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// check user controller...
const checkUserController = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user does not exist",
      });
    }

    if (user) {
      return res.status(200).json({
        success: true,
        email: user.email,
        contactNo: user.contactNo,
        about: user.about,
        services: user.services,
        isVerified: user.isVerified,
        announcement: user.announcement,
        timings: user.timings,
        contact: {
          businessName: user.businessName,
          gst: user.gst,
          email: user.email,
          contactNo: user.contactNo,
          office: user.office,
          floor: user.floor,
          building: user.building,
          street: user.street,
          locality: user.locality,
          district: user.district,
          state: user.state,
          pinCode: user.pinCode,
        },
        socialProfiles: {
          facebookUrl: user.socialProfiles.facebookUrl,
          xUrl: user.socialProfiles.xUrl,
          instagramUrl: user.socialProfiles.instagramUrl,
          linkedInUrl: user.socialProfiles.linkedInUrl,
          youtubeUrl: user.socialProfiles.youtubeUrl,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// get all users controller...
const getAllUsersController = async (req, res) => {
  try {
    const { currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    // find all users whose username is not equal to abs
    const users = await User.find({ username: { $ne: "abs" }, role: 1 })
      .select(
        "-password -about -building -district -floor -gst -isAdmin -locality -office -role -services -state -street -updatedAt -pincode"
      )
      .skip(skip)
      .limit(limit);

    // calc total users to find total number of pages (total users/limit)
    const totalUsers = await User.countDocuments({
      username: { $ne: "abs" },
      role: 1,
    });

    if (!users) {
      return res.status(404).json({
        success: false,
        msg: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "All users found",
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get all verified users controller...
const getAllVerifiedUsersController = async (req, res) => {
  try {
    const { currentPage, userId } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    const users = await User.find({
      isVerified: true,
      _id: { $ne: userId },
      role: 1,
    })
      .select(
        "-password -about -building -district -floor -gst -isAdmin -locality -office -role -services -state -street -updatedAt -pincode"
      )
      .skip(skip)
      .limit(limit);

    // calc total users to find total number of pages (total users/limit)
    const totalUsers = await User.countDocuments({
      username: { $ne: "abs" },
      isVerified: true,
      role: 1,
    });

    if (!users) {
      return res.status(404).json({
        success: true,
        msg: "No verified users",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Verified users fetched successfully",
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get all unverified users controller...
const getAllUnverifiedUsersController = async (req, res) => {
  try {
    const { currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    const users = await User.find({ isVerified: false, role: 1 })
      .select(
        "-password -about -building -district -floor -gst -isAdmin -locality -office -role -services -state -street -updatedAt -pincode"
      )
      .skip(skip)
      .limit(limit);

    // calc total users to find total number of pages (total users/limit)
    const totalUsers = await User.countDocuments({
      isVerified: false,
      role: 1,
    });

    if (!users) {
      return res.status(404).json({
        success: true,
        msg: "No unverified users",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Unverified users fetched successfully",
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// delete user controller
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "No ID provided",
      });
    }

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(501).json({
        success: false,
        msg: "Deletion failed. Please try again",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get todays users controller
const getUsersByDateController = async (req, res) => {
  try {
    const { currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    // getting todays start time using moment js
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // getting todays end time using moment js
    const endOfDay = moment().endOf("day").toDate().toISOString();

    // querying on the basis of createdAt
    const users = await User.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      role: 1,
    })
      .select(
        "-password -about -building -district -floor -gst -isAdmin -locality -office -role -services -state -street -updatedAt -pincode"
      )
      .skip(skip)
      .limit(limit);

    // calc total users to find total number of pages (total users/limit)
    const totalUsers = await User.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      role: 1,
    });

    if (!users) {
      return res.status(404).json({
        success: false,
        msg: "No users registered today",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Today's users found successfully",
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get today's verified users controller
const getTodayVerifiedUsersController = async (req, res) => {
  try {
    const { currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    // getting todays start time using moment js
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // getting todays end time using moment js
    const endOfDay = moment().endOf("day").toDate().toISOString();

    // querying on the basis of createdAt
    const users = await User.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isVerified: true,
      role: 1,
    })
      .select(
        "-password -about -building -district -floor -gst -isAdmin -locality -office -role -services -state -street -updatedAt -pincode"
      )
      .skip(skip)
      .limit(limit);

    // calc total users to find total number of pages (total users/limit)
    const totalUsers = await User.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isVerified: true,
      role: 1,
    });

    if (!users) {
      return res.status(404).json({
        success: false,
        msg: "No users registered today",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Today's users found successfully",
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get today's unverified users controller
const getTodayUnverifiedUsersController = async (req, res) => {
  try {
    const { currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    // getting todays start time using moment js
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // getting todays end time using moment js
    const endOfDay = moment().endOf("day").toDate().toISOString();

    // querying on the basis of createdAt
    const users = await User.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isVerified: false,
      role: 1,
    })
      .select(
        "-password -about -building -district -floor -gst -isAdmin -locality -office -role -services -state -street -updatedAt -pincode"
      )
      .skip(skip)
      .limit(limit);

    // calc total users to find total number of pages (total users/limit)
    const totalUsers = await User.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isVerified: false,
      role: 1,
    });

    if (!users) {
      return res.status(404).json({
        success: false,
        msg: "No users registered today",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Today's users found successfully",
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get total users/service providers count controller
const getTotalUsersCountController = async (req, res) => {
  try {
    const { userId } = req.params;

    const totalUsersCount = await User.countDocuments({
      _id: { $ne: userId },
      role: 1,
    });

    return res.status(200).json({
      success: true,
      msg: "Total number of users found",
      totalUsersCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get total verified users count controller
const getTotalVerifiedUsersCountController = async (req, res) => {
  try {
    const { userId } = req.params;

    const totalVerifiedUsersCount = await User.countDocuments({
      isVerified: true,
      _id: { $ne: userId },
      role: 1,
    });

    return res.status(200).json({
      success: true,
      msg: "Successfully counted the verified users",
      totalVerifiedUsersCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get total unverified users count controller
const getTotalUnverifiedUsersCountController = async (req, res) => {
  try {
    const { userId } = req.params;

    const totalUnverifiedUsersCount = await User.countDocuments({
      isVerified: false,
      _id: { $ne: userId },
      role: 1,
    });

    return res.status(200).json({
      success: true,
      msg: "Successfully counted the verified users",
      totalUnverifiedUsersCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get today's total users count controller
const getTodayTotalUsersCountController = async (req, res) => {
  try {
    // start of the day
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // end of the day
    const endOfDay = moment().endOf("day").toDate().toISOString();

    const todayTotalUsersCount = await User.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      role: 1,
    });

    return res.status(200).json({
      success: true,
      msg: "Total number of users found for today",
      todayTotalUsersCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get today's total verifed users count controller
const getTodayTotalVerifiedUsersCountController = async (req, res) => {
  try {
    // start of the day
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // end of the day
    const endOfDay = moment().endOf("day").toDate().toISOString();

    const todayTotalVerifiedUsersCount = await User.countDocuments({
      isVerified: true,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      role: 1,
    });

    return res.status(200).json({
      success: true,
      msg: "Total number of verified users found for today",
      todayTotalVerifiedUsersCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get today's total verifed users count controller
const getTodayTotalUnverifiedUsersCountController = async (req, res) => {
  try {
    // start of the day
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // end of the day
    const endOfDay = moment().endOf("day").toDate().toISOString();

    const todayTotalUnverifiedUsersCount = await User.countDocuments({
      isVerified: false,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      role: 1,
    });

    return res.status(200).json({
      success: true,
      msg: "Total number of unverified users found for today",
      todayTotalUnverifiedUsersCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get All users by Specialization - for client
const getAllUsersBySpecificSpecializationController = async (req, res) => {
  try {
    const { specialization, currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    const users = await User.find({
      specialization,
      isVerified: true,
      role: 1,
    })
      .select(
        "-password -socialProfiles -firstName -lastName -gender -address -city -paymentMethod -email -role -isVerified -isAdmin -office -floor -building -street -locality -district -state -pinCode -about -services -gst -createdAt -updatedAt -contactNo"
      )
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({
      specialization,
      isVerified: true,
      role: 1,
    });

    if (!users) {
      return res.status(204).json({
        success: false,
        msg: "No users found with specialization",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "All users found with specialization",
      users,
      currentPageNo,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// update client details after login booking done
const updateClientDetailsController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contactNo,
      age,
      gender,
      address,
      city,
      state,
      pinCode,
    } = req.body;

    const { userId } = req.params;

    // if firstname is not provided
    if (!firstName) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your first name",
      });
    }

    // if lastName is not provided
    if (!lastName) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your last name",
      });
    }

    // if email is not provided
    if (!email) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your email",
      });
    }

    // if contactNo is not provided
    if (!contactNo) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your contact number",
      });
    }

    // if age is not provided
    if (!age) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your age",
      });
    }

    // if gender is not selected
    if (!gender) {
      return res.status(401).json({
        succss: false,
        msg: "Please select your gender",
      });
    }

    // if address is not provided
    if (!address) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your address",
      });
    }

    // if city is not provided
    if (!city) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your city",
      });
    }

    // if state is not provided
    if (!state) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your state",
      });
    }

    // if pinCode is not provided
    if (!pinCode) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your pincode",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(204).json({
        success: false,
        msg: "No such client to update",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        firstName,
        lastName,
        email,
        contactNo,
        gender,
        address,
        city,
        state,
        pinCode,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Data updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get client data by userId
const getParticularClientDataByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId }).select(
      "-password -socialProfiles -name -businessName -office -floor -building -street -locality -district -about -services -gst -createdAt -updatedAt"
    );

    if (!user) {
      return res.status(204).json({
        success: false,
        msg: "No such client",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Client found",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get a particular service Provider for printing purpose
const getUserDetailsForPrintController = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        msg: "No username to search",
      });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(204).json({
        success: false,
        msg: "Could not find the user",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "user found successfully",
      user: {
        businessName: user.businessName,
        contactNo: user.contactNo,
        email: user.email,
        timings: "6 PM to 9 PM",
        qualifications: user.qualifications,
        office: user.office,
        floor: user.floor,
        building: user.building,
        street: user.street,
        locality: user.locality,
        district: user.district,
        state: user.state,
        pinCode: user.pinCode,
        gst: user.gst,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// update service provider qualification controller
const updateUserQualificationController = async (req, res) => {
  try {
    const { qualifications } = req.body;

    if (!qualifications) {
      return res.status(400).json({
        success: false,
        msg: "Please provide qualifications",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        username: req.user.username,
      },
      { qualifications },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(304).json({
        success: false,
        msg: "user count not be updated",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Qualifications updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// update service provider timings controller
const updateUserTimingsController = async (req, res) => {
  try {
    const { days } = req.body;

    if (!days) {
      return res.status(400).json({
        success: false,
        msg: "Please provide timings",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      { timings: { days } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "user count not be updated",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Timings updated successfully",
      timings: updatedUser.timings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// update announcements
const updateAnnouncementController = async (req, res) => {
  try {
    const { announcement } = req.body;

    if (!announcement) {
      return res.status(400).json({
        success: false,
        msg: "Announcement is missing",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      { announcement },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(304).json({
        success: false,
        msg: "user could not be updated",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Announcement udpated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// WALK INS.......

// check users for walkin clients
const checkWalkinClientAvailabilityController = async (req, res) => {
  try {
    const { searchUser } = req.params;

    if (!searchUser) {
      return res.status(400).json({
        success: false,
        msg: "contact number not provided",
      });
    }

    const existingUser = await User.findOne({ contactNo: searchUser });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Client found successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// update walkin clients data
const getParticularClientDataByContactNoContoller = async (req, res) => {
  try {
    const { searchUser } = req.params;

    if (!searchUser) {
      return res.status(400).json({
        success: false,
        msg: "contact number is missing",
      });
    }

    const existingUser = await User.findOne({ contactNo: searchUser }).select(
      "-password"
    );

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "No such user",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "User already exists",
      user: existingUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
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
  getAboutDetailsController,
  getContactDetailsController,
  checkUserController,
  checkUserController,
  updateSocialProfilesController,
  updatePasswordController,
  forgotPasswordController,
  resetPasswordController,
  getAllUsersController,
  deleteUserController,
  getUsersByDateController,
  getTotalUsersCountController,
  getTotalVerifiedUsersCountController,
  getTotalUnverifiedUsersCountController,
  getTodayTotalUsersCountController,
  getTodayTotalVerifiedUsersCountController,
  getTodayTotalUnverifiedUsersCountController,
  getAllVerifiedUsersController,
  getAllUnverifiedUsersController,
  getTodayVerifiedUsersController,
  getTodayUnverifiedUsersController,
  getAllUsersBySpecificSpecializationController,
  updateClientDetailsController,
  getParticularClientDataByUserIdController,
  getUserDetailsForPrintController,
  updateUserQualificationController,
  updateUserTimingsController,
  updateAnnouncementController,
  checkWalkinClientAvailabilityController,
  getParticularClientDataByContactNoContoller,
};
