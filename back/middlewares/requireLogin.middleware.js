const jwt = require("jsonwebtoken");

const requrieLogin = async (req, res, next) => {
  const token = req.cookies?.authToken;

  console.log(token);

  if (token) {
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(409).json({
          success: false,
          msg: "Token Error!",
        });
      }
      req.user = user;
      return next();
    });
  }

  if (!token) {
    return res.status(409).json({
      success: false,
      msg: "No token. No access.",
    });
  }
};

module.exports = requrieLogin;
