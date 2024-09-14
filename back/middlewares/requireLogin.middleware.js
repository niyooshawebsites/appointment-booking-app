const jwt = require("jsonwebtoken");

const requrieLogin = async (req, res, next) => {
  const token = req.cookie.authToken;

  if (token) {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      return next();
    }
    if (!user) {
      return res.status(409).json({
        success: false,
        msg: "Invalid token. Unauthorized access!",
      });
    }
  }

  if (!token) {
    return res.status(409).json({
      success: false,
      msg: "No token. No access.",
    });
  }
};

module.exports = requrieLogin;
