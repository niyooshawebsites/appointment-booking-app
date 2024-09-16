const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const userDetails = req.user;

  // check if the userdetails are correct and is admin or not
  if (userDetails && userDetails.role === 1) {
    return next();
  } else {
    return res.status(401).json({
      success: false,
      msg: "Only admin is allowed!",
    });
  }
};

module.exports = isAdmin;
