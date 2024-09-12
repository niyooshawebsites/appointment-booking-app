const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  // get the token from req header
  const token = req.headers["authorization"];

  // if token is available in the header
  if (token) {
    // get the user details fromt the token
    const userDetails = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userDetails);

    // incorrect user details
    if (userDetails == "undefined") {
      return res.status(403).json({
        success: false,
        msg: "Invalid token",
      });
    }

    // check if the userdetails are correct and is admin or not
    if (userDetails && userDetails.role === 1) {
      return next();
    } else {
      return res.status(409).json({
        success: false,
        msg: "Only admin is allowed!",
      });
    }
  }

  // if token is not available in the header
  if (!token) {
    return res.status(409).json({
      success: false,
      msg: "No token. No access",
    });
  }
};

module.exports = isAdmin;
